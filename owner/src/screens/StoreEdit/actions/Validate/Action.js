import i18n from '../../../../i18n'

export default (model, changes) => {

  const validator = {
    total: 0,
    errors: {}
  }

  if (!model.companyId) {
    ++validator.total

    if (changes['companyId'])
      validator.errors['companyId'] = i18n.t('validation.required')
  }

  if (!model.city) {
    ++validator.total

    if (changes['city'])
      validator.errors['city'] = i18n.t('validation.required')
  }

  if (!model.address) {
    ++validator.total

    if (changes['address'])
      validator.errors['address'] = i18n.t('validation.required')
  }


  return validator
}