import * as validation from '.'

describe('validation', () => {
  describe('when fields do not exist', () => {
    it('requires email', () => {
      expect(
        validation.validateSignOn({
          password: 'password1!',
          name: 'name',
          email: '',
          viaFacebook: false,
        }),
      ).toStrictEqual({
        email: 'emailRequired',
      })
    })

    it('requires name', () => {
      expect(
        validation.validateSignOn({
          password: 'password1!',
          email: 'email@bla.com',
          name: '',
          viaFacebook: false,
        }),
      ).toStrictEqual({
        name: 'nameRequired',
      })
    })

    it('requires password', () => {
      expect(
        validation.validateSignOn({
          name: 'name',
          email: 'email@bla.com',
          password: '',
          viaFacebook: false,
        }),
      ).toStrictEqual({
        password: 'passwordRequired',
      })
    })

    it('requires all', () => {
      expect(
        validation.validateSignOn({
          email: '',
          password: null,
          name: undefined,
          viaFacebook: false,
        }),
      ).toStrictEqual({
        name: 'nameRequired',
        email: 'emailRequired',
        password: 'passwordRequired',
      })
    })
  })

  describe('validate fields by pattern', () => {
    describe('test invalid emails', () => {
      const emailsToTest = [
        'someemail',
        'incorrect@incorrect',
        'has space@email.com',
        '!!!!!@!!!!.com',
        '43243@344343com',
        'hasOneCharTDL@gmail.c',
      ]
      emailsToTest.forEach((email: string) => {
        it(`throws error for invalid email '${email}'`, () => {
          expect(
            validation.validateSignOn({
              email,
              name: 'name',
              password: 'password1!',
              viaFacebook: false,
            }),
          ).toStrictEqual({
            email: 'emailInvalid',
          })
        })
      })
    })

    describe('test valid emails', () => {
      const emailsToTest = [
        'correct@correct.com',
        'hasCountrySpecificDomain@mail.co.uk',
        'has_underscore@email.com',
        'has-dashes@gmail.com',
        'has.dots@gmail.com',
      ]
      emailsToTest.forEach((email: string) => {
        it(`passes with valid email '${email}'`, () => {
          expect(
            validation.validateSignOn({
              email,
              name: 'name',
              password: 'password1!',
              viaFacebook: false,
            }),
          ).toStrictEqual({})
        })
      })
    })
  })

  describe('test incorrect passwords', () => {
    const passwordsToTest = [
      'Ca1', // too short
      'sh$r1', // too short
      'qwerty', // contains no numbers
      '123456', // contains no letters
      '!!!!!', // contains no numbers or letters
      'Th1$I$TooLong!!!!!!', // more than 18
    ]
    passwordsToTest.forEach((password: string) => {
      it(`returns passwordInvalid for '${password}'`, () => {
        expect(
          validation.validateSignOn({
            password,
            email: 'correct@correct.com',
            name: 'name',
            viaFacebook: false,
          }),
        ).toStrictEqual({
          password: 'passwordInvalid',
        })
      })
    })
  })

  describe('test correct passwords', () => {
    const passwordsToTest = [
      '6Char$', // exactly 6
      'Th1$I$TheMaxLength', // exactly 18
      'th1$i$themaxlength', // no need for capitals
      'ܡܠܬܳܐ1!', // psasword in Syriac
      'كلمة1!',
    ]

    passwordsToTest.forEach((password: string) => {
      it(`passes with valid password '${password}'`, () => {
        expect(
          validation.validateSignOn({
            password,
            email: 'correct@correct.com',
            name: 'name',
            viaFacebook: false,
          }),
        ).toStrictEqual({})
      })
    })
  })

  describe('test invalid names', () => {
    const namesToTest = [
      'nameW1thNumber',
      'nameWith$pecialChar',
      '13132',
      '!!!!!',
      'a',
      'sh',
      'asdشسي', // Mixing two languages
      'Thisis tooooooo looooooooong',
    ]
    namesToTest.forEach((name: string) => {
      it(`throws error for invalid name '${name}'`, () => {
        expect(
          validation.validateSignOn({
            name,
            email: 'correct@correct.com',
            password: 'password1!',
            viaFacebook: false,
          }),
        ).toStrictEqual({
          name: 'nameInvalid',
        })
      })
    })
  })

  describe('test valid names', () => {
    const namesToTest = [
      'This name is valid',
      'هذا الاسم متاح',
      'عبد الله',
      'عمر', // minimum arabic chars
      'Dan', // minimum latin chars
      'عبد المسيح القرهباشي', // maximum arabic chars
      'Abd Almasih Qrabashi', // maximum latin chars
    ]
    namesToTest.forEach((name: string) => {
      it(`throws error for invalid name '${name}'`, () => {
        expect(
          validation.validateSignOn({
            name,
            email: 'correct@correct.com',
            password: 'password1!',
            viaFacebook: false,
          }),
        ).toStrictEqual({})
      })
    })
  })
})
