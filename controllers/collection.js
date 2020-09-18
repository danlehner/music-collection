const express = require('express')
const router = express.Router() 

const db = require('../models')

// homepage route
router.get('/', (req, res) => {
  res.render('collection/index')
})

// artist show page
router.get('/:artistID', (req, res) => {
  res.send('This is the artist show page')
})

// artist edit page
router.get('/:artistID/edit', (req, res) => {
  res.send('This is the artist edit page')
})

// album show page
router.get('/:albumID', (req, res) => {
  res.send('This is the album show page')
})

// album edit page
router.get('/:albumID/edit', (req, res) => {
  res.send('This is the album edit page')
})


module.exports = router