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
router.route('/roulette/close').put(async (request, response) => {
  try{
    const { id } = request.body
    await Roulette.findByIdAndUpdate(id, { open: false })
    const bets = await Bet.find({roulette: id})
    const winningNumberBet = Math.ceil(Math.random() * 36)
    let winnersByColor = []
    if(winningNumberBet % 2 === 0){
      winnersByColor = bets
        .filter( el => el.color === 'rojo')
        .map( ({_id, color, roulette, amount, user}) => {
          let rObj = {
            _id: _id,
            color: color,
            roulette: roulette,
            amount: amount * 1.8,
            user: user
          }
          return rObj
        })
    } else {
      winnersByColor = bets
        .filter( el => el.color === 'negro')
        .map(({_id, color, roulette, amount, user}) => {
          let rObj = {
            _id: _id,
            color: color,
            roulette: roulette,
            amount: amount * 1.8,
            user: user
          }
          return rObj
        })
    }
    const winnersByNumber = bets
      .filter( el => el.number === winningNumberBet )
      .map( ({_id, number, roulette, amount, user}) => {
        let rObj = {
          _id: _id,
          number: number,
          roulette: roulette,
          amount: amount * 5,
          user: user
        }
        return rObj
      })
    const winners =winnersByColor.concat(winnersByNumber)
    response.status(201).json({message: winners})
  } catch(error){
    response.status(406).json({message: 'Operacion denegada'})
  }
})
router.route('/bet').post(async (request, response) => {
  try{
    const { number, color, roulette, amount } = request.body
    const { user } = request.headers
    const rouletteData = await Roulette.findById(roulette)
    if(rouletteData && rouletteData.open && color ){
      const bet = await Bet.create({ color, roulette, amount, user })
      response.status(201).json(bet)
    } else if(rouletteData && rouletteData.open && number){
      const bet = await Bet.create({ number, roulette, amount, user })
      response.status(201).json(bet)
    }
    else {
      throw new Error('Ruleta cerrada')
    }
  }catch(error){
    response.status(406).json({message: error.message})
  }
})
router.route('/roulette/list').get(async (request, response) => {
  try{
    const { query } = request
    const roulettes = await Roulette.find(query)
    response.status(201).json(roulettes)
  }catch(error){
    response.status(400).json({message: 'No se pudo encontrar apuestas'})
  }
})

app.use(router)

app.listen(port, () =>{
  console.log(`App running at http://localhost:${port}`)
})