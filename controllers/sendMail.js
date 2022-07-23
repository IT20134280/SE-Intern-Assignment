const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const{
    MALILNG_SERVICE_CLIENT_ID,
    MALILNG_SERVICE_CLIENT_SECRET,
    MALILNG_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MALILNG_SERVICE_CLIENT_ID,
    MALILNG_SERVICE_CLIENT_SECRET,
    MALILNG_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

//Send mail
const sendEmail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: MALILNG_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MALILNG_SERVICE_CLIENT_ID,
            clientSecret: MALILNG_SERVICE_CLIENT_SECRET,
            refreshToken: MALILNG_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "School Management & Learning System",
        html:  `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the School Management & Learning System.</h2>
        <h4 style="text-align: left; color: teal;">The Best Education For Your Bright Future</h4>
        <p>
            Just click the button below to validate your email address.
        </p>
        
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
    
        </div>
    `
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendEmail