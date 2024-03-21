const nodemailer = require('nodemailer');
const pug = require('pug');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.from = 'TechMERN Company <jcemerikic@gmail.com>';
    this.username = user.username;
    this.url = url;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return;
    } else {
      return nodemailer.createTransport({
        host: process.env.MAILTRAP_EMAIL_HOST,
        port: process.env.MAILTRAP_EMAIL_PORT,
        auth: {
          user: process.env.MAILTRAP_EMAIL_USERNAME,
          pass: process.env.MAILTRAP_EMAIL_PASSWORD,
        },
      });
    }
  }

  async sendWelcome() {
    await this.send('welcome', 'Dobrodošli na TECH Mern');
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      email: this.to,
      username: this.username,
      url: this.url,
    });

    const mailOptions = {
      to: this.to,
      from: this.from,
      subject,
      html,
    };

    await this.newTransport().sendMail(mailOptions);
  }
};
