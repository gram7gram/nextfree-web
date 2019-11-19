const mailer = require('../../mailer/mailgun')
const parameters = require('../../../parameters')
const templating = require('../../templating')

const onPasswordReset = async entity => {

  const title = 'Відновлення паролю'

  const body = templating.render('staff-reset-password-ua.html.twig', {
    title,
    link: parameters.staffHost + '/password-set/' + entity.user.accessToken
  })

  await mailer(entity.user.email, title, body)

}

module.exports = {
  onPasswordReset
}