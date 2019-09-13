import shortid from 'shortid';
import config from '../../config';
import { openUrl } from 'helpers/common';
import { ignoreByPattern, getLangConfig } from 'helpers/language';
export const isReverseQuestion = (questionType) => /_REVERSE$/.test(questionType) || questionType === 'DICTATION';
export const hintify = (sentence, dictionary, targetLanguage) => {
    return sentence.split(' ').map((word) => {
        const patterns = getLangConfig(targetLanguage).hintPatterns;
        const filteredWord = ignoreByPattern(word, patterns);
        const hint = dictionary.find((d) => ignoreByPattern(d.word, patterns) === filteredWord);
        const key = shortid.generate();
        return hint ? { word, translations: hint.translations, key } : { word, translations: null, key };
    });
};
export const cleanAnswer = (answer) => {
    const cleanned = answer.trim();
    return cleanned.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/؟܀٬]/gi, '');
};
export const openPhraseInAdmin = (phrase) => {
    const url = `${config.adminHost}/phrases?q[by_phrase]=${phrase}`;
    openUrl(url);
};
//# sourceMappingURL=index.js.map