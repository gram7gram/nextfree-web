import i18n from '../../../../i18n'

export default (model, changes) => {

  const validator = {
    total: 0,
    errors: {}
  }

  if (!model.title) {
    ++validator.total

    if (changes['title'])
      validator.errors['title'] = i18n.t('validation.required')
  }

  return validator
}