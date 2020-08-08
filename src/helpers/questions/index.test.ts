import * as h from '.'
jest.mock('@sl/helpers/logging', () => ({
  logError: jest.fn(),
}))

describe('questions', () => {
  describe('hintify', () => {
    it('breaks a sentence to an array of object with translations from provided dictionary', () => {
      const hintified = h.hintify(
        'This sentence will be hintified',
        [
          { id: '1', word: 'This', translations: 'هذه' },
          { id: '2', word: 'sentence', translations: 'الجملة' },
          { id: '3', word: 'hintified', translations: 'مهنتفة' },
        ],
        'cl-ara',
      )

      expect(hintified).toStrictEqual([
        { key: hintified[0].key, word: 'This', translations: 'هذه' },
        { key: hintified[1].key, word: 'sentence', translations: 'الجملة' },
        { key: hintified[2].key, word: 'will', translations: null },
        { key: hintified[3].key, word: 'be', translations: null },
        { key: hintified[4].key, word: 'hintified', translations: 'مهنتفة' },
      ])
    })
  })

  describe('isReverseQuestion', () => {
    it('returns true if question type contains REVERSE or equals DICTATION', () => {
      expect(h.isReverseQuestion('BLABLA_REVERSE')).toStrictEqual(true)
      expect(h.isReverseQuestion('DICTATION')).toStrictEqual(true)
    })

    it('returns false if question type contains REVERSE and not DICTATION', () => {
      expect(h.isReverseQuestion('BLABLA_REVERSES')).toStrictEqual(false)
      expect(h.isReverseQuestion('DICTATIONS')).toStrictEqual(false)
      expect(h.isReverseQuestion('TRANSLATION')).toStrictEqual(false)
    })
  })

  describe('clearAnswer', () => {
    it('trimps answer', () => {
      expect(h.cleanAnswer(' this should be trimmed ')).toStrictEqual(
        'this should be trimmed',
      )
    })

    it('clears answers from commas and fullstops', () => {
      expect(
        h.cleanAnswer('there should be no commans, and fullstops.'),
      ).toStrictEqual('there should be no commans and fullstops')
    })

    it('clears answers from question or exclamation marks', () => {
      expect(h.cleanAnswer('!does it have a question mark?؟')).toStrictEqual(
        'does it have a question mark',
      )
    })

    it('clears answers from special chars', () => {
      expect(
        h.cleanAnswer('<th!is -is$_ gonna@ be clear from=: special chars/%;>'),
      ).toStrictEqual('this is gonna be clear from special chars')
    })
  })
})
