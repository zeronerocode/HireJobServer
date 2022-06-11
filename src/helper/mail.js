require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const sendEmail = async (email) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "hasbipijarcamp@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    const mailOptions = {
      from: "Nocturnal <hasbipijarcamp@gmail.com>",
      to: email,
      subject: "Verify your email",
      html: `<h1>Verify your email</h1>
      <p>Please click the link below to verify your email</p>
      <a href="http://localhost:5000/recruiter/verify/${token}">Verify</a>`,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };
