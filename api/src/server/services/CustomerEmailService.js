const mailer = require('../../mailer/gmail')
const parameters = require('../../../parameters')
const templating = require('../../templating')
const i18n = require('../../i18n').i18n
const moment = require('moment')

const onBonusPurchase = async entity => {

  const title = 'Вітаємо! Цей товар Ви отримуєте безкоштовно!'

  const body = templating.render('customer-bonus-ua.html.twig', {
    i18n,
    moment,
    entity,
    title,
  })

  await mailer(entity.buyer.user.email, title, body)

}

const onAccountActivation = async entity => {

  console.log('/activation/' + entity.user.activationToken);

  const title = 'Реєстрація на сайті nextfree.com.ua'

  const body = templating.render('customer-activation-ua.html.twig', {
    title,
    link: parameters.customerHost + '/activation/' + entity.user.activationToken
  })

  await mailer(entity.user.email, title, body)

}

const onPasswordReset = async entity => {

  console.log('/password-set/' + entity.user.emailResetToken);

  const title = 'Відновлення паролю'

  const body = templating.render('customer-reset-password-ua.html.twig', {
    title,
    link: parameters.customerHost + '/password-set/' + entity.user.emailResetToken
  })

  await mailer(entity.user.email, title, body)

}

module.exports = {
  onBonusPurchase,
  onPasswordReset,
  onAccountActivation,
}