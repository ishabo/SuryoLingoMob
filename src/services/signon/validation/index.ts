import { ISignonFormData, ISignonFormErrors } from '@sl/services/signon'
import Config from '@sl/config'
import { isEmpty } from 'lodash'

const validateField = (
  func: (value?: string) => boolean,
  fields: ISignonFormData,
  fieldName: string,
  errors: IDictionary<string> = {},
) => {
  if (Object.keys(fields).indexOf(fieldName) !== -1) {
    if (isEmpty(fields[fieldName])) errors[fieldName] = `${fieldName}Required`
    else if (!func(fields[fieldName])) errors[fieldName] = `${fieldName}Invalid`
  }
}

export const validateSignOn = (fields: ISignonFormData): ISignonFormErrors => {
  const errors = {}

  validateField(validateName, fields, 'name', errors)
  validateField(validateEmail, fields, 'email', errors)
  validateField(validatePassword, fields, 'password', errors)

  return errors
}

const validateEmail = (email: string) =>
  testWithPatterns(Config.validation.emailPatterns, email)

const validateName = (name: string) =>
  testWithPatterns(Config.validation.namePatterns, name)

const validatePassword = (password: string) =>
  testWithPatterns(Config.validation.passwordPatterns, password)

const testWithPatterns = (patterns: RegExp[], str: string) => {
  let pattern: RegExp
  for (pattern of patterns) {
    if (pattern.test(str)) {
      return true
    }
  }

  return false
}
