// import { playAudio } from '@sl/helpers/audio';
// import audioFiles from '@sl/assets/audio';

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
  answer: string | string[],
  correctAnswers: string[],
  options: IEvalOptions,
): boolean => {
  if (Array.isArray(answer)) {
    return matchAllAnswers(answer, correctAnswers, options);
  } 
    return matchOneOfTheCorrectAnswers(answer, correctAnswers, options);
  
};

const matchAllAnswers = (
  answers: string[],
  correctAnswers: string[],
  options,
) => {
  if (answers.length === correctAnswers.length) {
    const evaluations = answers.map((answer: string) =>
      matchOneOfTheCorrectAnswers(answer, correctAnswers, options),
    );
    return evaluations.indexOf(false) === -1;
  }
  return false;
};

const matchOneOfTheCorrectAnswers = (
  answer: string,
  correctAnswers: string[],
  options,
) => {
  for (const correctAnswer of correctAnswers) {
    if (evaluateAnswer(answer, correctAnswer, options)) {
      return true;
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
    if (
      overlook(answerArr[i], overlookLetters) !==
      overlook(correctAnswerArr[i], overlookLetters)
    ) {
      return false;
    }
  }

  // playAudio(audioFiles.questionPassSound, null);

  return true;
};
