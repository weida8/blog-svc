const express = require('express')
const mongoose = require('mongoose')
const bodyParser  = require('body-parser')
import {dbName} from './constants'
const app = express()
const port = 5000

mongoose.connect(dbName, {useNewUrlParser: true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get('/health', (req, res) => res.send('Application Healthy!'))

app.use('/', require('./routes'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))