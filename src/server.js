const express = require('express')
require('dotenv').config()
const { connect } = require('./db')
const router = require('express').Router()
const Roulette = require('./models/roulette')
const Bet = require('./models/bet')

const port = process.env.PORT
const app = express()
connect()

app.use(express.json())

router.route('/roulette/create').post(async (request, response) => {
  try{
    const roulette = await Roulette.create({})
    response.status(200).json(roulette._id)
  } catch(error){
    response.status(500).json({error: error.message})
  }
})

router.route('/roulette/open').put(async (request, response) => {
  try{
    const { id } = request.body
    await Roulette.findByIdAndUpdate(id, { open: true })
    response.status(201).json({message: 'La operacion fue exitosa'})
  } catch(error){
    response.status(406).json({message: 'Operacion denegada'})
  }
})

router.route('/bet').post(async (request, response)=>{
  try{
    const { number, color, roulette, amount } = request.body
    const { user } = request.headers
    const rouletteData = await Roulette.findById(roulette)
    if(rouletteData && rouletteData.open){
      const bet = await Bet.create({ number, color, roulette, amount, user })
      response.status(201).json(bet)
    } else {
      throw new Error('Ruleta cerrada')
    }

  }catch(error){
    response.status(406).json({message: error.message})
  }
})

app.use(router)


app.listen(port, () =>{
  console.log(`App running at http://localhost:${port}`)
})