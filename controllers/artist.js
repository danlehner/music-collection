const express = require('express')
const { Artist } = require('../models')
const router = express.Router() 

const db = require('../models')

// artist show page
router.get('/:artistID', (req, res) =>
{
  db.Artist.findById(req.params.artistID)
    .populate("albums")
    .exec(function (err, foundArtist) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      const context = { 
        artist: foundArtist };
      res.render("collection/artist/artist-show", context);
    });
});



//album edit (form) route

router.get("/:artistID/edit", async(req, res) => {
  try {
    const foundArtist = await db.Artist.findById(req.params.artistID)

    const context = {
      artist: foundArtist
    }

    res.render("collection/artist/artist-edit", context)

} catch (error) {
    console.log(error)
    res.send({message: "Internal Server Error"})
}
})
//artist update


//album delete

module.exports = router