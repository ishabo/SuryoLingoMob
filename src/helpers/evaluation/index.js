// import { playAudio } from 'helpers/audio';
// import audioFiles from 'assets/audio';
const stringToCharArray = (str, allowedLetters) => {
    try {
        const stringArr = str.split('');
        const rex = new RegExp(`${allowedLetters.join('|')}`);
        return stringArr.filter(rex.test.bind(rex));
    }
    catch (error) {
        console.warn(str);
    }
    return [];
};
export const evalAgainstAllAnswers = (answer, correctAnswers, options) => {
    if (Array.isArray(answer)) {
        return matchAllAnswers(answer, correctAnswers, options);
    }
    else {
        return matchOneOfTheCorrectAnswers(answer, correctAnswers, options);
    }
};
const matchAllAnswers = (answers, correctAnswers, options) => {
    if (answers.length === correctAnswers.length) {
        const evaluations = answers.map((answer) => matchOneOfTheCorrectAnswers(answer, correctAnswers, options));
        return evaluations.indexOf(false) === -1;
    }
    return false;
};
const matchOneOfTheCorrectAnswers = (answer, correctAnswers, options) => {
    for (let correctAnswer of correctAnswers) {
        if (evaluateAnswer(answer, correctAnswer, options)) {
            return true;
        }
    }
    return false;
};
export const overlook = (letter, letters = {}) => (letters[letter] ? letters[letter] : letter);
export const evaluateAnswer = (answer, correctAnswer, options) => {
    const { allowedLetters, overlookLetters } = options;
    const answerArr = stringToCharArray(answer, allowedLetters);
    const correctAnswerArr = stringToCharArray(correctAnswer, allowedLetters);
    let i;
    for (i in correctAnswerArr) {
        if (overlook(answerArr[i], overlookLetters) !== overlook(correctAnswerArr[i], overlookLetters)) {
            return false;
        }
    }
    // playAudio(audioFiles.questionPassSound, null);
    return true;
};
//# sourceMappingURL=index.js.map