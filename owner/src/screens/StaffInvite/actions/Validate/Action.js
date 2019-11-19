import i18n from '../../../../i18n'
import {validate} from 'email-validator'

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

  if (!model.companyId) {
    ++validator.total

    if (changes['companyId'])
      validator.errors['companyId'] = i18n.t('validation.required')
  }

  if (!model.storeId) {
    ++validator.total

    if (changes['storeId'])
      validator.errors['storeId'] = i18n.t('validation.required')
  }

  if (!model.position) {
    ++validator.total

    if (changes['position'])
      validator.errors['position'] = i18n.t('validation.required')
  }

  return validator
}