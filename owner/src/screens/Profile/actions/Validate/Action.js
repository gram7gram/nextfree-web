import i18n from '../../../../i18n'
import EmailValidator from 'email-validator'
import password from '../../../../utils/password'

export default (model, changes) => {
  const validator = {
    total: 0,
    messages: [],
    errors: {}
  }

  if (!model.email) {
    ++validator.total
    if (changes.email) {
      validator.errors.email = i18n.t('validation.required')
    }
  } else if (!EmailValidator.validate(model.email)) {
    ++validator.total
    if (changes.email) {
      validator.errors.email = i18n.t('validation.invalid_email')
    }
  }

  if (model.password1 && !password.validate(model.password1)) {
    ++validator.total

    if (changes.password1) {
      validator.errors.password1 = i18n.t('validation.weak_password1')
    }
  }

  if (model.password1 && model.password2) {
    if (model.password1 !== model.password2) {
      ++validator.total

      if (changes.password2) {
        validator.errors.password2 = i18n.t('validation.password_mismatch')
      }
    }
  }

  return validator
}