const express = require('express')
const { Artist } = require('../models')
const router = express.Router() 

const db = require('../models')

// artist show page
router.get('/:artistID', async (req, res) => {

  try {
    
    const foundArtist = await db.Artist.findById(req.params.artistID)
    console.log(foundArtist)
    const context = {
      artist: foundArtist,
    }

    res.render("collection/artist/artist-show.ejs", context);
} catch (error) {
    console.log(error);
    res.send({message: "Internal Server Error"});
}
})

module.exports = router