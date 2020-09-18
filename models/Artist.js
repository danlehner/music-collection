const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
  name: { type: String, required: [true, "You must provide an artist name"] }, 
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Album"
    }
  ]
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist