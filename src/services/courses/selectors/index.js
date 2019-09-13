export const getActiveCourse = (state) => state.find((course) => course.active && !course.comingSoon);
const getLanguage = (state, lang) => {
    const activeCourse = getActiveCourse(state);
    if (activeCourse) {
        return activeCourse[`${lang}Language`].shortName;
    }
    else {
        return 'cl-ara';
    }
};
export const getTargetLanguage = (state) => getLanguage(state, 'target');
export const getSourceLanguage = (state) => getLanguage(state, 'source');
//# sourceMappingURL=index.js.map