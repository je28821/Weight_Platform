require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailer = async ({ to, subject, text, html }) => {
  try {
    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM, // Make sure this env var name is correct
      subject,
      html,
    });

    return { success: true };
  } catch (err) {
    throw err;
  }
};

module.exports = mailer;
