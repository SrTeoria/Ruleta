const { model, Schema } = require('mongoose')
const rouletteSchema = new Schema({
  open: {
    type: Boolean,
    default: false,
  },
})
const Roulette = model('Roulette', rouletteSchema)
module.exports = Roulette
