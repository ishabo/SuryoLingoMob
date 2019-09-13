import * as validation from './';
describe('validation', () => {
    describe('when fields do not exist', () => {
        it('requires email', () => {
            expect(validation.validateSigon({
                password: 'password1!',
                name: 'name',
                email: '',
                viaFacebook: false
            })).toEqual({
                email: 'emailRequired'
            });
        });
        it('requires name', () => {
            expect(validation.validateSigon({
                password: 'password1!',
                email: 'email@bla.com',
                name: '',
                viaFacebook: false
            })).toEqual({
                name: 'nameRequired'
            });
        });
        it('requires password', () => {
            expect(validation.validateSigon({
                name: 'name',
                email: 'email@bla.com',
                password: '',
                viaFacebook: false
            })).toEqual({
                password: 'passwordRequired'
            });
        });
        it('requires all', () => {
            expect(validation.validateSigon({
                email: '',
                password: null,
                name: undefined,
                viaFacebook: false
            })).toEqual({
                name: 'nameRequired',
                email: 'emailRequired',
                password: 'passwordRequired'
            });
        });
    });
    describe('validate fields by pattern', () => {
        describe('test invalid emails', () => {
            const emailsToTest = [
                'someemail',
                'incorrect@incorrect',
                'has space@email.com',
                '!!!!!@!!!!.com',
                '43243@344343com',
                'hasOneCharTDL@gmail.c'
            ];
            emailsToTest.forEach((email) => {
                it(`throws error for invalid email '${email}'`, () => {
                    expect(validation.validateSigon({
                        email,
                        name: 'name',
                        password: 'password1!',
                        viaFacebook: false
                    })).toEqual({
                        email: 'emailInvalid'
                    });
                });
            });
        });
        describe('test valid emails', () => {
            const emailsToTest = [
                'correct@correct.com',
                'hasCountrySpecificDomain@mail.co.uk',
                'has_underscore@email.com',
                'has-dashes@gmail.com',
                'has.dots@gmail.com'
            ];
            emailsToTest.forEach((email) => {
                it(`passes with valid email '${email}'`, () => {
                    expect(validation.validateSigon({
                        email,
                        name: 'name',
                        password: 'password1!',
                        viaFacebook: false
                    })).toEqual({});
                });
            });
        });
    });
    describe('test incorrect passwords', () => {
        const passwordsToTest = [
            'Ca1',
            'sh$r1',
            'qwerty',
            '123456',
            '!!!!!',
            'Th1$I$TooLong!!!!!!' // more than 18
        ];
        passwordsToTest.forEach((password) => {
            it(`throws error for invalid password '${password}'`, () => {
                expect(validation.validateSigon({
                    password,
                    email: 'correct@correct.com',
                    name: 'name',
                    viaFacebook: false
                })).toEqual({
                    password: 'passwordInvalid'
                });
            });
        });
    });
    describe('test correct passwords', () => {
        const passwordsToTest = [
            '6Char$',
            'Th1$I$TheMaxLength',
            'th1$i$themaxlength',
            'ܡܠܬܳܐ1!',
            'كلمة1!'
        ];
        passwordsToTest.forEach((password) => {
            it(`passes with valid password '${password}'`, () => {
                expect(validation.validateSigon({
                    password,
                    email: 'correct@correct.com',
                    name: 'name',
                    viaFacebook: false
                })).toEqual({});
            });
        });
    });
    describe('test invalid names', () => {
        const namesToTest = [
            'nameW1thNumber',
            'nameWith$pecialChar',
            '13132',
            '!!!!!',
            'a',
            'sh',
            'asdشسي',
            'Thisis tooooooo looooooooong'
        ];
        namesToTest.forEach((name) => {
            it(`throws error for invalid name '${name}'`, () => {
                expect(validation.validateSigon({
                    name,
                    email: 'correct@correct.com',
                    password: 'password1!',
                    viaFacebook: false
                })).toEqual({
                    name: 'nameInvalid'
                });
            });
        });
    });
    describe('test valid names', () => {
        const namesToTest = [
            'This name is valid',
            'هذا الاسم متاح',
            'عبد الله',
            'عمر',
            'Dan',
            'عبد المسيح القرهباشي',
            'Abd Almasih Qrabashi' // maximum latin chars
        ];
        namesToTest.forEach((name) => {
            it(`throws error for invalid name '${name}'`, () => {
                expect(validation.validateSigon({
                    name,
                    email: 'correct@correct.com',
                    password: 'password1!',
                    viaFacebook: false
                })).toEqual({});
            });
        });
    });
});
//# sourceMappingURL=index.test.js.map