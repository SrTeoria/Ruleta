const mongoose = require('mongoose')

function connect(){
  const MongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/roulette'
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }

  mongoose.connect(MongoURI, options)

  const { connection } = mongoose

  connection.once('open', () =>
    console.log('Connection established successfully')
  )

  connection.on('error', error => {
    console.log('Connection error', error)
  })
  return connection
}

module.exports = {connect}

