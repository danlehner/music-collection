const express = require('express')
const router = express.Router() 

const db = require('../models')

/* TO-DO's with "*" in the code blocks */

// homepage route
router.get('/', (req, res) => {
  // * query all docuents from database
  // * store queried documents in a "context variable"
  res.render('collection/index')
  // * include context in render
})

// homepage new route 
router.get('/new', (req, res) => {
  res.render('collection/new.ejs')
})

// homepage post route
router.post('/', async (req, res) => {
  try {
    const createdAlbum = await db.Album.create(req.body)
    console.log(req.body)
    // const createdArtist = await db.Artist.findById(req.body.artist)

    // createdArtist.albums.push(createdAlbum)
    // await createdArtist.save()

    res.redirect('/collection')

  } catch (error) {
    console.log(error)
    res.send({ message: 'Internal Server Error'} )
  }
})

// artist show page
router.get('/:artistID', (req, res) => {
  // * query data from given artist id 
  // * store queried document in a "context" variable
  res.send('This is the artist show page')
  // * use res.render for show artist page with context
})

// artist edit page
router.get('/:artistID/edit', (req, res) => {
  // * query data from given artist id 
  // * store queried document in a "context" variable
  res.send('This is the artist edit page')
  // * use res.render for artist edit page with context
})

// artist delete

// album show page
router.get('/:albumID', (req, res) => {
  res.send('This is the album show page')
})

// album edit page
router.get('/:albumID/edit', (req, res) => {
  res.send('This is the album edit page')
})

// album delete


module.exports = router