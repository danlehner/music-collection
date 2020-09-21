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
    res.send({ message: 'Internal Service Error'})
  }
})

// album edit page
router.get('/:albumID/edit', (req, res) => {
  res.send('This is the album edit page')
})


module.exports = router