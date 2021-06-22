const { model, Schema } = require('mongoose')

const betSchema = new Schema({
  number: {
    type: Number,
    min: 0,
    max: 36,
    required: true,
  },
  color: {
    type: String,
    enum: ['rojo', 'negro'],
    required: true,
  },
  roulette: {
    type: Schema.Types.ObjectId,
    ref: 'Roulette',
    required: true,
  },
  amount: {
    type: Number,
    min: 1,
    max: 10000,
    required: true,
  },
  user: {
    type: String,
    required: true,
  }
})

const Bet = model('Bet', betSchema)

module.exports = Bet