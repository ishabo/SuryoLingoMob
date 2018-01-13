// import { playAudio } from 'helpers/audio';

const stringToCharArray = (str: string, filterLetters: string[]): string[] => {
  try {
    const stringArr = str.split('');

    const rex = new RegExp(`${filterLetters.join('|')}`);
    return stringArr.filter(rex.test.bind(rex));
  } catch (error) {
    console.warn(str);
  }
  return [];
};

export const evaluateAnswer = (answer: string, correctAnswer: string, filterLetters): boolean => {
  const answerArr = stringToCharArray(answer, filterLetters);
  const correctAnswerArr = stringToCharArray(correctAnswer, filterLetters);

  let i;

  for (i in correctAnswerArr) {
    if (answerArr[i] !== correctAnswerArr[i]) {
      return false;
    }
  }

  // playAudio(require('../../../src/assets/audio/saggishappi.mp4'), '');

  return true;
};

export const evalAgainstAllAnswers = (
  answers: string[], correctAnswers: string[], filterLetters,
): boolean => {

  console.log(`Evaluating ${answers.join(', ')} against ${correctAnswers.join(', ')} `);

  let correctAnswer: string;
  let answer: string;

  for (correctAnswer of correctAnswers) {
    for (answer of answers) {
      if (evaluateAnswer(answer, correctAnswer, filterLetters)) {
        return true;
      }
    }
  }

  return false;
};
