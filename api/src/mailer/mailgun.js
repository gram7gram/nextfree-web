const mailgun = require("mailgun-js");
const parameters = require("../../parameters");

let mg = null

if (parameters.mail.apiKey && parameters.mail.domain) {
  mg = mailgun({
    apiKey: parameters.mail.apiKey,
    domain: parameters.mail.domain
  });
}

const send = async (to, subject, html) => {

  if (!mg) return

  to = 'gram7gram@gmail.com'

  const data = {
    from: parameters.mail.senderName,
    to,
    subject,
    html,
  };

  try {
    await mg.messages().send(data);
  } catch (e) {
    console.error(e);
  }
}

module.exports = send