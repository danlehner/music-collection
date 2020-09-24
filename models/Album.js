const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
  name: { type: String, required: [true, "You must provide an album name"] }, 
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: [true, "You must provide an album name"]}, 
  art: { type: String, required: [true, "You must provide an album name"] }, 
  testimony: { type: String }
})

const Album = mongoose.model('Album', albumSchema)

module.exports = Album