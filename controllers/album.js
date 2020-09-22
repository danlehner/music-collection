const express = require('express')
const { Artist } = require('../models')
const router = express.Router() 

const db = require('../models')

// album show page
router.get('/:albumID', async (req, res) => {
  try {
    const foundAlbum = await db.Album.findById(req.params.albumID)
    const foundArtist = await db.Artist.findById(foundAlbum.artist)

    const context = {
      album: foundAlbum, 
      artist: foundArtist
    } 

    res.render('collection/album/album-show', context)

  } catch (error) {
    console.log(error)
    res.send({ message: 'Internal Service Error' })
  }
})

// album edit (form) page
router.get('/:albumID/edit', async (req, res) => {

  try {

    const foundAlbum = await db.Album.findById(req.params.albumID)
    const foundArtist = await db.Artist.findOne({ 
      albums: 
      { $in: [req.params.albumID] } 
    })

    const context = {
      album: foundAlbum, 
      artist: foundArtist
    } 

    res.render('collection/edit', context)
   
  } catch (error) {
    console.log(error)
    res.send({ message: 'Internal Service Error' })
  }
})

// album update 
router.put('/:albumID', async (req, res) => {
  try {

      const albumData = {
        $set: {
          name: req.body.name, 
          art: req.body.art
        }
      }

      const updatedAlbum = await db.Album.findByIdAndUpdate(req.params.albumID, albumData, { new: true })
      res.redirect(`/album/${updatedAlbum._id}`)

    }
     catch (error) {
      console.log(error)
      res.send(error)
  }
})

// album delete
router.delete('/:albumID', async (req, res) => {
  try {
    const deletedAlbum = await db.Album.findByIdAndDelete(req.params.albumID)
    await db.Artist.findById(deletedAlbum.artist)
    
    res.redirect('/collection')

  } catch (error) {
    console.log(error)
    res.send({ message: "Internal Service Error"})
  }
})


module.exports = router