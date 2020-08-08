import { types, TQuestionType } from '../actions'
import { IQuestions, IQuestion, IQuestionsAction } from '../'

export const initialState: IQuestions = {
  all: [],
  onGoing: [],
  pending: [],
  passed: [],
  failed: [],
}

const filterOut = (array: string[], element: string) =>
  array.filter((id: string) => id !== element)

const updateQuestionStatusState = (
  state: IQuestions,
  status: TQuestionType,
  questionId: string,
) => {
  const pending = filterOut(state.pending, questionId)
  const failed = filterOut(state.failed, questionId)
  const passed = [...state.passed]
  switch (status) {
    case 'passed':
      passed.push(questionId)
      break
    case 'failed':
      failed.push(questionId)
      pending.push(questionId)
      break
  }

  const newState = { ...state, passed, pending, failed }
  return newState
}

const splitStringToArray = (str: string | string[]) => {
  if (typeof str === 'string') {
    return str.length > 0 ? str.split('|') : []
  }
  return str
}

export const reducer = (
  state: IQuestions = initialState,
  action: IQuestionsAction,
) => {
  switch (action.type) {
    case types.SAVE_QUESTIONS:
      const freshState = { ...initialState }
      const { payload } = action

      payload.map((question: IQuestion) => {
        question.otherCorrectAnswers = splitStringToArray(
          question.otherCorrectAnswers,
        )
        question.incorrectChoices = splitStringToArray(
          question.incorrectChoices,
        )
        return question
      })

      freshState.onGoing = payload
      freshState.pending = payload.map((question: IQuestion) => question.id)
      return freshState
    case types.UPDATE_QUESTION_STATUS:
      return updateQuestionStatusState(
        { ...state },
        action.status,
        action.questionId,
      )
    case types.RESET_QUESTIONS:
      return initialState
    default:
      return state
  }
}
