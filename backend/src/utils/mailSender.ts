const NodeMailer = require('nodemailer');
const { google } = require('googleapis');

const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const oauth2client = new google.auth.OAuth2(process.env.API_CLIENT_ID, process.env.API_CLIENT_SECRET, REDIRECT_URI);
oauth2client.setCredentials({ refresh_token: process.env.API_REFRESH_TOKEN });

const mailSender = async (email: string, title: string, textBody: string, htmlBody: string) => {
  try {
    const ACCESS_TOKEN = await oauth2client.getAccessToken();
    const transporter = NodeMailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        clientId: process.env.API_CLIENT_ID,
        clientSecret: process.env.API_CLIENT_SECRET,
        refreshToken: process.env.API_REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN,
      },
    });
    const mail = {
      from: 'Kaktus Indonesia Bersih <kaktus.test.mail@gmail.com>',
      to: email,
      subject: title,
      text: textBody,
      html: htmlBody,
    };

    let result = await transporter.sendMail(mail);
    console.log('email has been sent');
    console.log('Email info:', result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default mailSender;
