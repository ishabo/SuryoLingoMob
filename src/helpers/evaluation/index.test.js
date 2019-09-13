import * as h from './index';
describe('evaluation', () => {
    const correctAnswers = 'this 15 the answer';
    const options = {
        allowedLetters: ['5', '1', '!', 't', 'h', 'i', 's', 'a', 'n', 'w', 'e', 'r', 'm', 'o']
    };
    describe('evaluateAnswer', () => {
        it('returns true if string passed matches exactly the correct answer', () => {
            expect(h.evaluateAnswer('this 15 the answer', correctAnswers, options)).toEqual(true);
        });
        it('returns true if string passed matches the correct ' + 'answer after filtering out allowed characters', () => {
            const answer = 'this$ 1%5 the answer-';
            const correctAnswer = 'this 15 the answer';
            expect(h.evaluateAnswer(answer, correctAnswer, options)).toEqual(true);
        });
        it('fails if the two strings have 1 string difference', () => {
            expect(h.evaluateAnswer('this 15 the answe', correctAnswers, options)).toEqual(false);
            expect(h.evaluateAnswer('this 15 th answer', correctAnswers, options)).toEqual(false);
            expect(h.evaluateAnswer('ths 15 the answer', correctAnswers, options)).toEqual(false);
        });
    });
    describe('evalAgainstAllAnswers', () => {
        const answer = 'this 15 the answer';
        it('returns true if answer matches at least one of the correct answers', () => {
            const correctAnswers = ['this 15 some answer', 'this 15 the answer'];
            expect(h.evalAgainstAllAnswers(answer, correctAnswers, options)).toEqual(true);
        });
        it('returns true if an array of answers match with an array of the correct answers', () => {
            const answers = ['this 15 some answer', 'this 15 the answer'];
            const correctAnswers = ['this 15 some answer', 'this 15 the answer'];
            expect(h.evalAgainstAllAnswers(answers, correctAnswers, options)).toEqual(true);
        });
        it('returns false if an array of answers partially matches with some of the correct answers', () => {
            const correctAnswers = ['this 15 some answer', 'this 15 the answer'];
            const answers = ['this 15 some answer', 'this 15 wrong answer'];
            expect(h.evalAgainstAllAnswers(answers, correctAnswers, options)).toEqual(false);
        });
        it("returns false if answer doesn't match any of the correct answers", () => {
            const correctAnswers = ['this 15 some answer', 'this 15 an answer'];
            expect(h.evalAgainstAllAnswers([answer], correctAnswers, options)).toEqual(false);
        });
        it('returns true if string passed matches one of the ' + 'correct answers after filtering out allowed characters', () => {
            const correctAnswers = ['this 15 some answer', 'this 15 an answer'];
            expect(h.evalAgainstAllAnswers('this$ 15 s-ome answer', correctAnswers, options)).toEqual(true);
        });
        it('overlooks a hash of letters to ease the match of all answers', () => {
            const correctAnswers = ['this is some answer', 'this is an answer'];
            const overlookLetters = { 1: 'i', 5: 's', '!': 'i' };
            options['overlookLetters'] = overlookLetters;
            expect(h.evalAgainstAllAnswers('th1s$ i5 5-ome an5wer', correctAnswers, options)).toEqual(true);
        });
    });
});
//# sourceMappingURL=index.test.js.map