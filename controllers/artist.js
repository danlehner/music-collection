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
router.put("/:artistID", async (req, res) => {
  try {

    const artistData = {
      $set: {
        name: req.body.name, 
      }
    }

    const updatedArtist = await db.Artist.findByIdAndUpdate(req.params.artistID, artistData, { new: true })
    res.redirect(`/artist/${updatedArtist._id}`)

  }
   catch (error) {
    console.log(error)
    res.send(error)
}
})

//artist delete
router.delete("/:artistID", async (req, res) => {
  try {
    const deletedArtist = await db.Artist.findByIdAndDelete(req.params.artistID) 
    await db.Album.remove({artist: deletedArtist._id})

    res.redirect("/collection")
  
  } catch (error) {
    console.log(error)
    res.send({ message: "Internal Service Error"})
  }
})



module.exports = router