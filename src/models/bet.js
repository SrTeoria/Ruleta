const { model, Schema } = require('mongoose')

const betSchema = new Schema({
  number: {
    type: Number,
    require: true,
  }
  // color
  // roulette
    // id
})

const Bet = model('Bet', betSchema)

module.exports = Bet