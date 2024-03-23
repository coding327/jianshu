const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`).then(() => {
    console.log('Connected to MongoDB')
  }).catch((err) => {
    console.log('Failed to connect to MongoDB', err)
  })
}