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

// 


module.exports = router