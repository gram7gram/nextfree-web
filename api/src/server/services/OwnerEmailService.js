const mailer = require('../../mailer/mailgun')
const parameters = require('../../../parameters')
const templating = require('../../templating')

const onAccountActivation = async entity => {

  const title = 'Реєстрація на сайті nextfree.com.ua'

  const body = templating.render('owner-activation-ua.html.twig', {
    title,
    link: parameters.ownerHost + '/activation/' + entity.user.activationToken
  })

  await mailer(entity.user.email, title, body)

}

const onPasswordReset = async entity => {

  const title = 'Відновлення паролю'

  const body = templating.render('owner-reset-password-ua.html.twig', {
    title,
    link: parameters.ownerHost + '/password-set/' + entity.user.emailResetToken
  })

  await mailer(entity.user.email, title, body)

}

module.exports = {
  onPasswordReset,
  onAccountActivation,
}