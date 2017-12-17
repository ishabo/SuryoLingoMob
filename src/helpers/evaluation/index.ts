const stringToCharArray = (str: string, filterLetters: string[]): string[] => {
  try {
    const stringArr = str.split('');

    const rex = new RegExp(`${filterLetters.join('|')}`);
    return stringArr.filter(rex.test.bind(rex));
  } catch (error) {
    console.error(str);
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

  return true;
};

export const evalAgainstAllAnswers = (
  answers: string[], correctAnswers: string[], filterLetters,
): boolean => {

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
