const express = require('express')
const { Artist } = require('../models')
const router = express.Router() 

const db = require('../models')

/* TO-DO's with "*" in the code blocks */

// homepage route
router.get('/', async (req, res) => {
  // * query all docuents from database
  try {
    const allAlbums = await db.Album.find({})
    const allArtists = await db.Artist.find({})

    const context = {
      albums: allAlbums,
      artists: allArtists
    }

    console.log('albums', allAlbums, 'artists', allArtists)

    res.render('collection/index', context)

  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})

// homepage new route 
router.get('/new', (req, res) => {
  res.render('collection/new.ejs')
})

// homepage post route
router.post('/', async (req, res) => {
  try {
    // console.log(req.body)

    const foundArtist = await db.Artist.findOne({ name: req.body.artist })

    if (foundArtist) {

      req.body.artist = foundArtist 
      const createdAlbum = await db.Album.create(req.body)
      foundArtist.albums.push(createdAlbum)
      await foundArtist.save()
  
      res.redirect('/collection')

    } else {

      const createdArtist = await db.Artist.create({ name: req.body.artist })

      req.body.artist = createdArtist 
      const createdAlbum = await db.Album.create(req.body)

      createdArtist.albums.push(createdAlbum)
      await createdArtist.save()
  
      res.redirect('/collection')
    }

  } catch (error) {
    console.log(error)
    res.send({ message: 'Internal Server Error'} )
  }
})




module.exports = router