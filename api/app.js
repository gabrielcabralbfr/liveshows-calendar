const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

app.listen(3000, () =>{
    console.log("Server started.");
    
})