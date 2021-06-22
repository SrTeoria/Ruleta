const express = require('express')
require('dotenv').config()
const { connect } = require('./db')
const router = require('express').Router()
const Roulette = require("./models/roulette")

const port = process.env.PORT
const app = express()
connect()

app.use(express.json())

router.route('/createroulette').post(async (request, response) => {
  try{
    const roulette = await Roulette.create({})
    response.status(201).json(roulette._id)
  } catch(error){
    response.status(400).json({error: error.message})
  }
})

app.use(router)


app.listen(port, () =>{
  console.log(`App running at http://localhost:${port}`)
})