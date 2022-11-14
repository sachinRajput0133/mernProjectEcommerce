const nodeMailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const sendEmail = async (options, res) => {
  const transporter = nodeMailer.createTransport(smtpTransport({

    host: process.env.SMPT_HOST,
    // port:process.env.SMPT_PORT,

    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  }));
  // console.log(process.env.SMPT_MAIL)
  // console.log(process.env.SMPT_PASSWORD)
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //   await transporter.sendMail(mailOptions);
  await transporter.sendMail(mailOptions, (err) => {
    if (err) {

      return console.log(err)
    } else {
      console.log("email sent")
    }
  });
};

module.exports = sendEmail;

