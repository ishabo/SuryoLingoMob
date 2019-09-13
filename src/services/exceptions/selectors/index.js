export const getApplicationExceptions = (state) => state.filter((exception) => {
    const { name, response } = exception;
    if (['TIMEOUT_ERROR', 'NETWORK_ERROR', 'CONNECTION_ERROR'].includes(name)) {
        return true;
    }
    if ([401, 403, 500].includes(response.status)) {
        return true;
    }
    return false;
});
export const getInvalidExceptions = (state) => state.filter((exception) => {
    const { response } = exception;
    if (response.status === 400) {
        return true;
    }
    return false;
});
export const getLatestException = (state) => state[state.length - 1];
export const hasNetworkError = (state) => {
    const exception = getLatestException(state);
    return exception && exception.name === 'NETWORK_ERROR';
};
//# sourceMappingURL=index.js.map