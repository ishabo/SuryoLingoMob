import language from 'config/language';
const isOfLanguage = (arr, text) => {
    const firstLetter = text[0];
    return arr.includes(firstLetter);
};
export const detectLanguage = (text) => {
    const { syriac, arabic } = language;
    if (isOfLanguage(syriac.letters, text)) {
        return syriac.langId;
    }
    else if (isOfLanguage(arabic.letters, text)) {
        return arabic.langId;
    }
    else {
        return arabic.langId;
    }
};
export const getLangConfig = (lang) => language[lang];
export const ignoreByPattern = (word, patterns) => {
    let pattern;
    for (pattern of patterns) {
        word = word.replace(pattern.pattern, pattern.replace);
    }
    return word;
};
//# sourceMappingURL=index.js.map