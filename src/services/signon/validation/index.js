import Config from 'config/';
import { isEmpty } from 'lodash';
const validateField = (func, fields, fieldName, errors = {}) => {
    if (Object.keys(fields).indexOf(fieldName) !== -1) {
        if (isEmpty(fields[fieldName]))
            errors[fieldName] = `${fieldName}Required`;
        else if (!func(fields[fieldName]))
            errors[fieldName] = `${fieldName}Invalid`;
    }
};
export const validateSigon = (fields) => {
    const errors = {};
    validateField(validateName, fields, 'name', errors);
    validateField(validateEmail, fields, 'email', errors);
    validateField(validatePassword, fields, 'password', errors);
    return errors;
};
const validateEmail = (email) => testWithPatterns(Config.validation.emailPatterns, email);
const validateName = (name) => testWithPatterns(Config.validation.namePatterns, name);
const validatePassword = (password) => testWithPatterns(Config.validation.passwordPatterns, password);
const testWithPatterns = (patterns, str) => {
    let pattern;
    for (pattern of patterns) {
        if (pattern.test(str)) {
            return true;
        }
    }
    return false;
};
//# sourceMappingURL=index.js.map