import courses from '@sl/data/dummy/courses'
import { reducer as courseReducer } from './index'
import { types } from '../actions'

describe('course reducer', () => {
  it('saves courses', () => {
    const action = {
      courses: [...courses],
      type: types.SAVE_COURSES,
    }

    const state = []
    const updatedState = courseReducer(state, action)

    expect(
      JSON.stringify(updatedState) === JSON.stringify(courses),
    ).toStrictEqual(true)
  })

  it('enroll in course', () => {
    const action = {
      courseId: 'course-1',
      type: types.ENROLL_IN_COURSE,
    }
    const state = [...courses]
    state[1].enrolled = true // second course is already enrolled
    const newState = [...state]
    newState[0].enrolled = true // first course will also be enrolled
    const updatedState = courseReducer(state, action)

    expect(
      JSON.stringify(updatedState) === JSON.stringify(newState),
    ).toStrictEqual(true)
  })

  it('set course as active and sets others as inactive', () => {
    const action = {
      courseId: 'course-1',
      type: types.SET_COURSE_ACTIVE,
    }
    const state = [...courses]
    state[1].active = true // second course is active
    const afterState = [...state]
    afterState[0].active = true // first course should be active
    afterState[1].active = false // second course should be inactive

    expect(courseReducer(state, action)).toStrictEqual(afterState)
  })
})
