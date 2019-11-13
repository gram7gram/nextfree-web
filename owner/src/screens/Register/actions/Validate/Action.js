import i18n from '../../../../i18n'
import {validate} from 'email-validator'
import password from "../../../../utils/password";

export default (model, changes) => {

  const validator = {
    total: 0,
    errors: {}
  }

  const {owner, company} = model

  if (!owner.user.email) {
    ++validator.total

    if (changes['owner.user.email'])
      validator.errors['owner.user.email'] = i18n.t('validation.required')
  } else if (!validate(owner.user.email)) {
    ++validator.total

    if (changes['owner.user.email'])
      validator.errors['owner.user.email'] = i18n.t('validation.invalid_email')
  }

  if (!owner.user.firstName) {
    ++validator.total

    if (changes['owner.user.firstName'])
      validator.errors['owner.user.firstName'] = i18n.t('validation.required')
  }

  if (!owner.user.lastName) {
    ++validator.total

    if (changes['owner.user.lastName'])
      validator.errors['owner.user.lastName'] = i18n.t('validation.required')
  }

  if (!company.name) {
    ++validator.total

    if (changes['company.name'])
      validator.errors['company.name'] = i18n.t('validation.required')
  }

  if (!owner.hasAccepted) {
    ++validator.total

    if (changes['owner.hasAccepted'])
      validator.errors['owner.hasAccepted'] = i18n.t('validation.required')
  }

  if (owner.password1 && !password.validate(owner.password1)) {
    ++validator.total

    if (changes['owner.password1']) {
      validator.errors['owner.password1'] = i18n.t('validation.weak_password1')
    }
  }

  if (owner.password1 && owner.password2) {
    if (owner.password1 !== owner.password2) {
      ++validator.total

      if (changes['owner.password2']) {
        validator.errors['owner.password2'] = i18n.t('validation.password_mismatch')
      }
    }
  }

  return validator
}
