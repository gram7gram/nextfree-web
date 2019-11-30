import i18n from '../../../../i18n'

export default (model, changes) => {
  const validator = {
    total: 0,
    errors: {}
  }

  if (!model.user.firstName) {
    ++validator.total

    if (changes['user.firstName']) {
      validator.errors['user.firstName'] = i18n.t('validation.required')
    }
  }

  if (!model.user.lastName) {
    ++validator.total

    if (changes['user.lastName']) {
      validator.errors['user.lastName'] = i18n.t('validation.required')
    }
  }

  return validator
}