import * as h from './index';

describe('evaluation', () => {
  const correctAnswers = 'this is the answer';
  const filterLetters = ['t', 'h', 'i', 's', 'a', 'n', 'w', 'e', 'r', 'm', 'o'];

  describe('evaluateAnswer', () => {
    it('returns true if string passed matches exactly the correct answer', () => {
      expect(h.evaluateAnswer('this is the answer', correctAnswers, filterLetters)).toEqual(true);
    });

    it('returns true if string passed matches the correct ' +
      'answer after filtering out allowed characters',
      () => {
        const answer = 'this$ i%s the answer-';
        const correctAnswer = 'this is the answer';
        expect(h.evaluateAnswer(answer, correctAnswer, filterLetters))
          .toEqual(true);
      }
    );

    it('fails if the two strings have 1 string difference', () => {
      expect(h.evaluateAnswer('this is the answe', correctAnswers, filterLetters)).toEqual(false);
      expect(h.evaluateAnswer('this is th answer', correctAnswers, filterLetters)).toEqual(false);
      expect(h.evaluateAnswer('ths is the answer', correctAnswers, filterLetters)).toEqual(false);
    });
  });

  describe('evalAgainstAllAnswers', () => {

    const answer = 'this is the answer';

    it('returns true if answer matches at least one of the correct answers', () => {
      const correctAnswers = ['this is some answer', 'this is the answer'];
      expect(
        h.evalAgainstAllAnswers([answer], correctAnswers, filterLetters),
      ).toEqual(true);
    });

    it('returns false if answer doesn\'t match any of the correct answers', () => {
      const correctAnswers = ['this is some answer', 'this is an answer'];
      expect(
        h.evalAgainstAllAnswers([answer], correctAnswers, filterLetters),
      ).toEqual(false);
    });

    it('returns true if string passed matches one of the ' +
      'correct answers after filtering out allowed characters'
      , () => {
        const correctAnswers = ['this is some answer', 'this is an answer'];
        expect(
          h.evalAgainstAllAnswers(['this$ is s-ome answer'], correctAnswers, filterLetters),
        ).toEqual(true);
      });
  });
});
