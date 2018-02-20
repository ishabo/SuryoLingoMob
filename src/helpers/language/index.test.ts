import * as h from './index';

describe('common', () => {
  describe('toGarshoni', () => {
    it('converts syriac to arabic letters', () => {
      const sentenceLang = 'cl-syr';
      const targetLang = 'cl-ara';
      const sentence = 'ܐܒܓܕ ܗܘܙ ܚܛܝ ܟܠܡܢ ܣܥܦܨ ܩܪܫܬ';
      const garshoni = 'ابجد هوز حطي كلمن سعفص قرشت';
      const garshoniAdvanced = 'ابجد هوز حطي كلمن سعفص قرشت';

      expect(h.toGarshoni({ sentence, targetLang, sentenceLang }))
        .toEqual(garshoni);

      expect(h.toGarshoni({ sentence, targetLang, sentenceLang, advanced: true }))
        .toEqual(garshoniAdvanced);
    });

    it('converts arabic to syriac letters', () => {
      const targetLang = 'cl-syr';
      const sentenceLang = 'cl-ara';
      const garshoni = 'ܐܒܓܕ ܗܘܙ ܚܛܝ ܟܠܡܢ ܣܥܦܨ ܩܪܫܬ';
      const sentence = 'ابجد هوز حطي كلمن سعفص قرشت';

      expect(h.toGarshoni({ sentence, targetLang, sentenceLang })).toEqual(garshoni);
    });

    it('converts taskhil', () => {
      const sentenceLang = 'cl-syr';
      const targetLang = 'cl-ara';
      const sentence = 'ܐܶܢܳܐ ܪܳܚܶܡ ܐ̱ܢܳܐ ܠܐܶܡܳܐ ܕܝܠܝ̱';
      const garshoni = 'اِنُا رُحِم ا̱نُا لاِمُا ديلي̱';
      const garshoniAdvanced = 'إِنُا رُحِم-نُا لإِمُا ديل';

      expect(h.toGarshoni({ sentence, targetLang, sentenceLang }))
        .toEqual(garshoni);

      expect(h.toGarshoni({ sentence, targetLang, sentenceLang, advanced: true }))
        .toEqual(garshoniAdvanced);
    });

    it('converts combos', () => {
      const sentenceLang = 'cl-syr';
      const targetLang = 'cl-ara';
      const sentence =
        'ܒ̥ܪܻܫܺܝܬ̥ ܐܻܝܬ݂ܱܘܗ̄ܝ ܗ̄ܘܳܐ ܡܶܠܬ̥ܳܐ ܘܗܽܘ ܡܶܠܬ̥ܴܐ' +
        'ܐܻܝܬ݂ܱܘܗ̄ܝ ܗ̄ܘܳܐ ܠܘܳܬ̥ ܐܱܠܴܗܳܐ ' +
        'ܘܰܐܠܴܗܳܐ ܐܻܝܬ݂ܱܘܗ̄ܝ ܗ̄ܘܳܐ ܗܽܘ ܡܶܠܬ݂ܴܐ';

      const garshoni =
        'برٍشٍيث إٍيثَو وُا مِلثُا وهٌو مِلثُا' +
        'إٍيثَو وُا لوُث آلُهُا ' +
        'وَالُهُا إٍيثَو وُا هٌو مِلثُا';

      const garshoniOptions = { sentence, targetLang, sentenceLang, advanced: true };
      expect(h.toGarshoni(garshoniOptions)).toEqual(garshoni);
    });
  });
});