const stringToCharArray = (string: string, filterLetters: string[]): string[] => {
    let stringArr = string.split('');

    const rex = new RegExp(`${filterLetters.join('|')}`);
    return stringArr.filter(rex.test.bind(rex));
}

export const evaluateAnswer = (answer: string, correctAnswer: string, filterLetters): boolean => {
    const answerArr = stringToCharArray(answer, filterLetters);
    const correctAnswerArr = stringToCharArray(correctAnswer, filterLetters);

    let i;
    for (i in correctAnswerArr) {
        if (answerArr[i] !== correctAnswerArr[i]) {
            return false
        }
    }

    return true;
}

export const evalAgainstAllAnswers = (answer: string,
    correctAnswers: string[],
    filterLetters
): boolean => {

    let correctAnswer: string;

    for (correctAnswer of correctAnswers) {
        if (evaluateAnswer(answer, correctAnswer, filterLetters)) {
            return true;
        }
    }

    return false;
}