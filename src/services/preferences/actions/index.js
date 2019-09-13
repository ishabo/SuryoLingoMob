const namespace = 'SuryoLingo/preferences';
export const types = {
    SET_PREFERENCES: `${namespace}/SET_PREFERENCES`,
    TOGGLE_CUSTOM_KEYBOARD: `${namespace}/TOGGLE_CUSTOM_KEYBOARD`
};
export const toggleCustomKeyboard = () => ({
    type: types.TOGGLE_CUSTOM_KEYBOARD
});
export const setPreferences = (preferences) => ({
    preferences,
    type: types.SET_PREFERENCES
});
//# sourceMappingURL=index.js.map