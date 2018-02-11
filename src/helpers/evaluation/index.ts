import { playAudio } from 'helpers/audio';
import audioFiles from 'assets/audio';

const stringToCharArray = (str: string, allowedLetters: string[]): string[] => {
  try {
    const stringArr = str.split('');

    const rex = new RegExp(`${allowedLetters.join('|')}`);
    return stringArr.filter(rex.test.bind(rex));
  } catch (error) {
    console.warn(str);
  }
  return [];
};

interface IEvalOptions {
  allowedLetters: string[];
  overlookLetters?: IDictionary<string>;
}
export const evalAgainstAllAnswers = (
  answers: string[],
  correctAnswers: string[],
  options: IEvalOptions,
): boolean => {

  console.log(`Evaluating ${answers.join(', ')} against ${correctAnswers.join(', ')} `);

  let correctAnswer: string;
  let answer: string;

  for (correctAnswer of correctAnswers) {
    for (answer of answers) {
      if (evaluateAnswer(answer, correctAnswer, options)) {
        return true;
      }
    }
  }

  return false;
};

export const overlook = (letter, letters: IDictionary<string> = {}) =>
  letters[letter] ? letters[letter] : letter;

export const evaluateAnswer = (
  answer: string,
  correctAnswer: string,
  options: IEvalOptions,
): boolean => {

  const { allowedLetters, overlookLetters } = options;
  const answerArr = stringToCharArray(answer, allowedLetters);
  const correctAnswerArr = stringToCharArray(correctAnswer, allowedLetters);

  let i;

  for (i in correctAnswerArr) {
    if (overlook(answerArr[i], overlookLetters)
      !== overlook(correctAnswerArr[i], overlookLetters)) {
      return false;
    }
  }

  playAudio(audioFiles.questionPassSound, null);

  return true;
};
