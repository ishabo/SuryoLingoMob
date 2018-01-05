import { all, takeLatest } from 'redux-saga/effects';

import * as skills from './skills';
import * as progress from './progress';
import * as profile from './profile';
import * as courses from './courses';
import * as dictionaries from './dictionaries';
import * as questions from './questions';

export default function* rootSagas(): IterableIterator<any> {
  yield all([
    takeLatest(
      courses.actions.types.FETCH_COURSES,
      courses.sagas.fetchCourses,
    ),
    takeLatest(
      courses.actions.types.SWITCH_COURSE,
      courses.sagas.switchCourse,
    ),
    takeLatest(
      progress.actions.types.ENTER_LESSON,
      progress.sagas.enterLesson,
    ),
    takeLatest(
      progress.actions.types.FINISH_LESSON,
      progress.sagas.finishLesson,
    ),
    takeLatest(
      skills.actions.types.FETCH_SKILLS,
      skills.sagas.fetchSkills,
    ),
    takeLatest(
      dictionaries.actions.types.FETCH_DICTIONARIES,
      dictionaries.sagas.fetchDictionaries,
    ),
    takeLatest(
      questions.actions.types.FETCH_QUESTIONS,
      questions.sagas.fetchQuestions,
    ),
    takeLatest(
      questions.actions.types.NEXT_QUESTION_OR_FINISH,
      questions.sagas.nextQuestionOrFinish,
    ),
    takeLatest(
      profile.actions.types.CREATE_PROFILE,
      profile.sagas.createProfile,
    ),
    takeLatest(
      profile.actions.types.SAVE_PROFILE_AND_ACCESS_TOKEN,
      profile.sagas.saveProfileAndAccessToken,
    ),
  ]);
}
