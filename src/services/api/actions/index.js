const namespace = 'SuryoLingo/api';
export const types = {
    LOADING: `${namespace}/LOADING`,
    SET_SUCCESS_MESSAGE: `${namespace}/SET_SUCCESS_MESSAGE`,
    SET_FAILURE_MESSAGE: `${namespace}/SET_FAILURE_MESSAGE`,
};
export const setLoadingOn = () => ({
    loading: true,
    type: types.LOADING,
});
export const setLoadingOff = () => ({
    loading: false,
    type: types.LOADING,
});
export const setSuccessMessage = (message, alert) => ({
    alert,
    message,
    type: types.SET_SUCCESS_MESSAGE,
});
export const setFailureMessage = (message, alert) => ({
    alert,
    message,
    type: types.SET_FAILURE_MESSAGE,
});
//# sourceMappingURL=index.js.map