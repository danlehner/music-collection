const express = require('express')
const { Artist } = require('../models')
const router = express.Router() 

const db = require('../models')

// album show page
router.get('/:albumID', async (req, res) => {
  try {
    const foundAlbum = await db.Album.findById(req.params.albumID)

    const context = {
      album: foundAlbum 
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
    const foundArtist = await db.Artist.find({ 
      albums: 
      { $in: [req.params.albumID] } 
    })

    const context = {
      album: foundAlbum, 
      artist: foundArtist[0]
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
    const foundArtist = await db.Artist.findOne({ name: req.body.artist})

    console.log(foundArtist)

    if (foundArtist) {

      req.body.artist = foundArtist._id
      const updatedAlbum = await db.Album.findByIdAndUpdate(req.params.albumID,req.body, { new: true })
     
      res.redirect(`/album/${updatedAlbum._id}`)

    } 

  } catch (error) {
    if (error) {
      console.log(error)
      res.send(error)
    }
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