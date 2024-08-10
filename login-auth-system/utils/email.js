const nodemailer = require("nodemailer");
const ejs = require("ejs");
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Login Auth System <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: "service@portfolio.orionstechelite.com",
        pass: "Hdafdj#$#@432",
      },
    });
  }

  async send(template, subject) {
    try {
      // 1) Render HTML based on an ejs template
      const html = await ejs.renderFile(
        `${__dirname}/../views/email/${template}.ejs`,
        {
          firstName: this.firstName,
          url: this.url,
          subject,
        },
      );

      // 2) Define email options
      const options = {
        wordwrap: 130,
      };
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: convert(html, options),
      };

      // 3) Create a transport and send email
      await this.newTransport().sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the Shapet!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)",
    );
  }
};
