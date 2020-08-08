import { types } from '../actions'
import cloneDeep from 'clone-deep'
import { ICourse, ICourseAction } from '../'

export const initialState: ICourse[] = []

export const reducer = (
  state: ICourse[] = initialState,
  action: ICourseAction,
) => {
  switch (action.type) {
    case types.SAVE_COURSES:
      return action.courses

    case types.ENROLL_IN_COURSE:
      return cloneDeep(state).map((course: ICourse) => {
        if (course.id === action.courseId) {
          course.enrolled = true
        }
        return course
      })

    case types.SET_COURSE_ACTIVE:
      return cloneDeep(state).map((course: ICourse) => {
        course.active = course.id === action.courseId
        return course
      })
    case types.RESET_COURSES:
      return initialState
    default:
      return state
  }
}
