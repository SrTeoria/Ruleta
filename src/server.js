const express = require('express')
require('dotenv').config()
const router = require('express').Router()

const port = process.env.PORT
const app = express()

app.use(express.json())

router.route('/createroulette').post((request, response) => {console.log('hola mundo')})

app.use(router)


app.listen(port, () =>{
  console.log(`App running at http://localhost:${port}`)
})