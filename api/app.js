require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { google } = require('googleapis')

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({ type: 'application/*+json' }))

app.listen(3000, () => {
    console.log("Server started.");
})

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:3000/oauth2/callback'
);


app.get('/oauth2/url', (req, res) => {
    const scopes = [
        'https://www.googleapis.com/auth/youtube'
    ];

    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: scopes
    });
    return res.json({ url })

})

app.get('/oauth2/callback', async (req, res, next) => {
    const { code } = req.query
    const { tokens } = await oauth2Client.getToken(code)
    req.tok = tokens
    oauth2Client.setCredentials(tokens);
    res.send(tokens)
})