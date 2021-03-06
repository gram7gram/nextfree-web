import i18n from '../../../../i18n'

export default (model, changes) => {

  const validator = {
    total: 0,
    errors: {}
  }

  if (!model.name) {
    ++validator.total

    if (changes['name'])
      validator.errors['name'] = i18n.t('validation.required')
  }

  if (!model.ownerId) {
    ++validator.total

    if (changes['ownerId'])
      validator.errors['ownerId'] = i18n.t('validation.required')
  }

  return validator
}