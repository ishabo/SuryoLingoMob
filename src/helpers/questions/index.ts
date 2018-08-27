import { TQuestionType } from 'services/questions/actions/index';
import { IDictionary, IWordHint } from 'services/dictionaries';
import shortid from 'shortid';
import { Linking } from 'react-native';
import config from '../../config';

export const isReverseQuestion = (questionType: TQuestionType) =>
  /_REVERSE$/.test(questionType) || questionType === 'DICTATION';

export const hintify = (sentence: string, dictionary: IDictionary[]): IWordHint[] => {
  const words = sentence.replace(/[؟]/g, '').split(' ');
  return words.map((word: string) => {
    const hint = dictionary.find((d: IDictionary) => d.word === word);
    const key = shortid.generate();
    return hint ? { word: hint.word, translations: hint.translations, key } : { word, translations: null, key };
  });
};

export const cleanAnswer = (answer: string) => {
  const cleanned = answer.trim();
  return cleanned.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/؟܀٬]/gi, '');
};

export const openPhraseInAdmin = (phrase: string) => {
  const url = `${config.adminHost()}/phrases?q[by_phrase]=${phrase}`;
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.warn("Don't know how to open URI: " + url);
    }
  });
};
