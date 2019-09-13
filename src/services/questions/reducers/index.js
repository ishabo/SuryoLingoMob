import { types } from '../actions';
export const initialState = {
    all: [],
    onGoing: [],
    pending: [],
    passed: [],
    failed: [],
};
const filterOut = (array, element) => array.filter((id) => id !== element);
const updateQuestionStatusState = (state, status, questionId) => {
    const pending = filterOut(state.pending, questionId);
    const failed = filterOut(state.failed, questionId);
    const passed = [...state.passed];
    switch (status) {
        case 'passed':
            passed.push(questionId);
            break;
        case 'failed':
            failed.push(questionId);
            pending.push(questionId);
            break;
    }
    const newState = Object.assign({}, state, { passed, pending, failed });
    return newState;
};
const splitStringToArray = (str) => {
    if (typeof str === 'string') {
        return str.length > 0 ? str.split('|') : [];
    }
    return str;
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_QUESTIONS:
            const freshState = Object.assign({}, initialState);
            const { payload } = action;
            payload.map((question) => {
                question.otherCorrectAnswers = splitStringToArray(question.otherCorrectAnswers);
                question.incorrectChoices = splitStringToArray(question.incorrectChoices);
                return question;
            });
            freshState.onGoing = payload;
            freshState.pending = payload.map((question) => question.id);
            return freshState;
        case types.UPDATE_QUESTION_STATUS:
            return updateQuestionStatusState(Object.assign({}, state), action.status, action.questionId);
        case types.RESET_QUESTIONS:
            return initialState;
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map