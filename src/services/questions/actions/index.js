const namespace = 'SuryoLingo/Questions';
export const types = {
    SAVE_QUESTIONS: `${namespace}/SAVE_QUESTIONS`,
    FETCH_QUESTIONS: `${namespace}/FETCH_QUESTIONS`,
    UPDATE_QUESTION_STATUS: `${namespace}/UPDATE_QUESTION_STATUS`,
    RESET_QUESTIONS: `${namespace}/RESET_QUESTIONS`,
    NEXT_QUESTION_OR_FINISH: `${namespace}/NEXT_QUESTION_OR_FINISH`
};
export const saveQuestions = (payload) => ({
    payload,
    type: types.SAVE_QUESTIONS
});
export const fetchQuestionsForLesson = (lessonId, destination) => ({
    lessonId,
    destination,
    type: types.FETCH_QUESTIONS
});
export const updateQuestionStatus = (questionId, status) => ({
    status,
    questionId,
    type: types.UPDATE_QUESTION_STATUS
});
export const nextQuestionOrFinish = (questionId, status) => ({
    status,
    questionId,
    type: types.NEXT_QUESTION_OR_FINISH
});
export const resetQuestions = () => ({
    type: types.RESET_QUESTIONS
});
//# sourceMappingURL=index.js.map