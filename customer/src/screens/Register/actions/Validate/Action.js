import i18n from '../../../../i18n'
import {validate} from 'email-validator'
import password from "../../../../utils/password";

export default (model, changes) => {

  const validator = {
    total: 0,
    errors: {}
  }

  if (!model.user.email) {
    ++validator.total

    if (changes['user.email'])
      validator.errors['user.email'] = i18n.t('validation.required')
  } else if (!validate(model.user.email)) {
    ++validator.total

    if (changes['user.email'])
      validator.errors['user.email'] = i18n.t('validation.invalid_email')
  }

  if (!model.user.firstName) {
    ++validator.total

    if (changes['user.firstName'])
      validator.errors['user.firstName'] = i18n.t('validation.required')
  }

  // if (!model.user.lastName) {
  //   ++validator.total
  //
  //   if (changes['user.lastName'])
  //     validator.errors['user.lastName'] = i18n.t('validation.required')
  // }

  if (!model.hasAccepted) {
    ++validator.total

    if (changes['hasAccepted'])
      validator.errors['hasAccepted'] = i18n.t('validation.required')
  }

  if (!model.password1) {
    ++validator.total

    if (changes.password1) {
      validator.errors.password1 = i18n.t('validation.required')
    }
  } else if (!password.validate(model.password1)) {
    ++validator.total

    if (changes['password1']) {
      validator.errors['password1'] = i18n.t('validation.weak_password1')
    }
  }

  if (!model.password2) {
    ++validator.total

    if (changes.password2) {
      validator.errors.password2 = i18n.t('validation.required')
    }
  }

  if (model.password1 && model.password2) {
    if (model.password1 !== model.password2) {
      ++validator.total

      if (changes['password2']) {
        validator.errors['password2'] = i18n.t('validation.password_mismatch')
      }
    }
  }

  return validator
}
