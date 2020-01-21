const nodemailer = require("nodemailer");
const parameters = require("../../parameters");

let mailer = null

if (parameters.gmail.user && parameters.gmail.pass) {
  mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: parameters.gmail.user,
      pass: parameters.gmail.pass
    }
  });
}

const send = async (to, subject, html) => {

  if (!mailer) return

  const data = {
    from: parameters.gmail.senderName,
    to,
    subject,
    html,
  };

  try {
    await mailer.sendMail(data);
  } catch (e) {
    console.error('send error', e);
  }
}

module.exports = send