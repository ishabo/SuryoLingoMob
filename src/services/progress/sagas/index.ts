import { put, select, call, delay } from 'redux-saga/effects'
import * as progress from '@sl/services/progress'
import * as questions from '@sl/services/questions'
import {
  getLessonInProgress,
  getSkillsByUnit,
  getSkillInProgress,
  getActiveCourse,
  getLessonsToSync,
  numOfTimesLessonInProgressPassed,
  calcTotaluserXp,
} from '@sl/services/selectors'
import config from '@sl/config'
import { setLessonInProgress } from '@sl/services/progress/actions'
import { actions, ILesson, ISkill } from '@sl/services/skills'
import { ISagasFunctions } from '@sl/services/sagas'
import { saveProfile } from '@sl/services/profile/actions'
import { IInitialState } from '@sl/services/reducers'
import { setLoadingOn } from '@sl/services/api/actions'
import { ICourse } from '@sl/services/courses'

export function* enterLesson(
  action: progress.IProgressAction,
): IterableIterator<any> {
  yield put(setLoadingOn())
  yield put(setLessonInProgress(action.lessonId))
  yield put(
    questions.actions.fetchQuestionsForLesson(action.lessonId, 'Questions'),
  )
}

export function* overviewLesson(
  action: progress.IProgressAction,
): IterableIterator<any> {
  yield put(setLessonInProgress(action.lessonId))
  yield put(
    questions.actions.fetchQuestionsForLesson(
      action.lessonId,
      'LessonOverview',
    ),
  )
}

const calcLessonXp = (lessonXp: number, timesLessonPassed: number) => {
  let newLessonXp = lessonXp

  switch (timesLessonPassed) {
    case 0:
      newLessonXp = lessonXp
      break
    case 1:
      newLessonXp = lessonXp / 2
      break
    case 2:
      newLessonXp = lessonXp / 4
      break
    default:
      newLessonXp = lessonXp / 10
      break
  }
  return Math.ceil(newLessonXp)
}

export function* finishLesson(): IterableIterator<any> {
  let { lessonXP } = config
  const numOfTimesLessonPassed = yield select(numOfTimesLessonInProgressPassed)
  lessonXP = calcLessonXp(lessonXP, numOfTimesLessonPassed)
  const { id: lessonId }: ILesson = yield select(getLessonInProgress)
  const course: ICourse = yield select(getActiveCourse)
  const skillInProgress: ISkill = yield select(getSkillInProgress)
  const timestamp = new Date()
  yield put(actions.markLessonFinished(lessonId, lessonXP, timestamp))

  yield put(
    progress.actions.setLessonToSync({
      lessonId,
      lessonXP,
      skillId: skillInProgress.id,
      courseId: course.id,
      createdAt: timestamp,
    }),
  )

  yield delay(200)

  const skillsOfUnit = yield select(getSkillsByUnit(skillInProgress.unit))
  const userXp = yield select(calcTotaluserXp)
  const profile = yield select((state: IInitialState) => state.profile)
  yield put(saveProfile({ ...(profile || {}), userXp }))

  if (isUnitFinished(skillsOfUnit)) {
    const nextUnit = skillInProgress.unit + 1
    yield put(actions.activateUnit(nextUnit))
  }

  yield delay(200)
  yield put(progress.actions.syncFinishedLessons())
}

export function* syncFinishedLessons(): IterableIterator<any> {
  const lessonsToSync: progress.ILessonToSync[] = yield select(getLessonsToSync)
  if (lessonsToSync.length > 0) {
    try {
      yield call(progress.api.syncFinishedLessons, lessonsToSync)
      yield put(progress.actions.resetLessonsToSync())
    } catch (error) {
      console.warn(error)
    }
  }
}

const isUnitFinished = (skills: ISkill[]): boolean => {
  let skill: ISkill
  for (skill of skills) {
    if (skill.progress !== 1) {
      // progress 1 means all lessons are passed.
      return false
    }
  }
  return true
}

export const functions = (): ISagasFunctions[] => [
  { action: progress.actions.types.ENTER_LESSON, func: enterLesson },
  { action: progress.actions.types.FINISH_LESSON, func: finishLesson },
  {
    action: progress.actions.types.SYNC_FINISHED_LESSONS,
    func: syncFinishedLessons,
  },
  { action: progress.actions.types.OVERVIEW_LESSON, func: overviewLesson },
]
