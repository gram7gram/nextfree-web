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

  if (!model.content || model.content === '<p><br></p>') {
    ++validator.total

    if (changes['content'])
      validator.errors['content'] = i18n.t('validation.required')
  }

  return validator
}