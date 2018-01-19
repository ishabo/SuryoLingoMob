import * as validation from './';

describe('validation', () => {

  describe('when fields do not exist', () => {
    it('requires email', () => {
      expect(validation.validateSigon({
        password: 'password1!',
        name: 'name',
        email: '',
      })).toEqual({
        email: 'email_required',
      });
    });

    it('requires name', () => {
      expect(validation.validateSigon({
        password: 'password1!',
        email: 'email@bla.com',
        name: '',
      })).toEqual({
        name: 'name_required',
      });
    });

    it('requires password', () => {
      expect(validation.validateSigon({
        name: 'name',
        email: 'email@bla.com',
        password: '',
      })).toEqual({
        password: 'password_required',
      });
    });

    it('requires all', () => {
      expect(validation.validateSigon({ email: '', password: null, name: undefined })).toEqual({
        name: 'name_required',
        email: 'email_required',
        password: 'password_required',
      });
    });
  });

  describe('validate fields by pattern', () => {

    describe('test invalid emails', () => {
      const emailsToTest = [
        'someemail', 'incorrect@incorrect', 'has space@email.com',
        '!!!!!@!!!!.com', '43243@344343com', 'hasOneCharTDL@gmail.c',
      ];
      emailsToTest.forEach((email: string) => {
        it(`throws error for invalid email '${email}'`, () => {
          expect(validation.validateSigon({
            email,
            name: 'name',
            password: 'password1!',
          })).toEqual({
            email: 'email_invalid',
          });
        });
      });
    });

    describe('test valid emails', () => {
      const emailsToTest = [
        'correct@correct.com', 'hasCountrySpecificDomain@mail.co.uk',
        'has_underscore@email.com', 'has-dashes@gmail.com',
        'has.dots@gmail.com',
      ];
      emailsToTest.forEach((email: string) => {
        it(`passes with valid email '${email}'`, () => {
          expect(validation.validateSigon({
            email,
            name: 'name',
            password: 'password1!',
          })).toEqual({});
        });
      });
    });
  });

  describe('test incorrect passwords', () => {
    const passwordsToTest = [
      'Ca1', // too short
      'sh$r1', // too short
      'qwerty', // contains no numbers
      '123456', // contains no letters
      'm1ssingSpecialChar', // missing a special char
      '!!!!!', // contains no numbers or letters
      'Th1$I$TooLong!!!!!!', // more than 18
    ];
    passwordsToTest.forEach((password: string) => {
      it(`throws error for invalid password '${password}'`, () => {

        expect(validation.validateSigon({
          password,
          email: 'correct@correct.com',
          name: 'name',
        })).toEqual({
          password: 'password_invalid',
        });
      });
    });
  });

  describe('test correct passwords', () => {

    const passwordsToTest = [
      '6Char$', // exactly 6
      'Th1$I$TheMaxLength', // exactly 18
      'th1$i$themaxlength', // no need for capitals
      'ܡܠܬܳܐ1!', // psasword in Syriac
      'كلمة1!',
    ];

    passwordsToTest.forEach((password: string) => {

      it(`passes with valid password '${password}'`, () => {

        expect(validation.validateSigon({
          password,
          email: 'correct@correct.com',
          name: 'name',
        })).toEqual({});
      });
    });
  });

  describe('test invalid names', () => {
    const namesToTest = [
      'nameW1thNumber', 'nameWith$pecialChar', '13132',
      '!!!!!', 'a', 'sh',
      'asdشسي', // Mixing two languages
      'Thisis tooooooo looooooooong',
    ];
    namesToTest.forEach((name: string) => {
      it(`throws error for invalid name '${name}'`, () => {
        expect(validation.validateSigon({
          name,
          email: 'correct@correct.com',
          password: 'password1!',
        })).toEqual({
          name: 'name_invalid',
        });
      });
    });
  });

  describe('test valid names', () => {
    const namesToTest = [
      'This name is valid', 'هذا الاسم متاح', 'عبد الله',
      'عمر', // minimum arabic chars
      'Dan', // minimum latin chars
      'عبد المسيح القرهباشي',// maximum arabic chars
      'Abd Almasih Qrabashi', // maximum latin chars

    ];
    namesToTest.forEach((name: string) => {
      it(`throws error for invalid name '${name}'`, () => {
        expect(validation.validateSigon({
          name,
          email: 'correct@correct.com',
          password: 'password1!',
        })).toEqual({});
      });
    });
  });
});
