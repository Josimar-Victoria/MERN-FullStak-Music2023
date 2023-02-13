const router = require('express').Router()

// our artist model
const Artist = require('../models/artist')

// Crear un artista
router.post('/save', async (req, res) => {
  const newArtist = Artist({
    name: req.body.name,
    imageURL: req.body.imageURL,
    twitter: req.body.twitter,
    instagram: req.body.instagram
  })
  try {
    const savedArtist = await newArtist.save()
    return res.status(200).send({ success: true, Artist: savedArtist })
  } catch (error) {
    return res.status(400).send({ success: false, msg: error })
  }
})

// Obtener los artistas por ID
router.get('/getOne/:id', async (req, res) => {
  const filterArtist = { _id: req.params.id }

  const artist = await Artist.findOne(filterArtist)

  if (artist) {
    return res.status(200).send({ success: true, Artist: artist })
  } else {
    return res.status(400).send({ success: false, msg: 'Artist not found' })
  }
})

// Obtener todos los artistas
router.get('/getAll', async (req, res) => {
//   const options = {
//     sort: { createdAt: -1 }
//   }

  const artists = await Artist.find()

  if (artists) {
    return res.status(200).send({ success: true, artists: artists })
  } else {
    return res.status(400).send({ success: false, msg: 'No artists found' })
  }
})

// Eliminar un artista
router.delete('/delete/:id', async (req, res) => {
  const filterArtist = { _id: req.params.id }

  const artist = await Artist.deleteOne(filterArtist)

  if (artist) {
    return res
      .status(200)
      .send({ success: true, msg: 'Artist deleted', Artist: artist })
  }
  if (!artist) {
    return res.status(400).send({ success: false, msg: 'Artist not found' })
  }
})

// Atualizar un artista
router.put('/update/:id', async (req, res) => {
  const filterArtist = { _id: req.params.id }

  const options = {
    new: true,
    upsert: true
  }
  const updateArtist = {
    name: req.body.name,
    imageURL: req.body.imageURL,
    twitter: req.body.twitter,
    instagram: req.body.instagram
  }

  try {
    const artist = await Artist.findOneAndUpdate(
      filterArtist,
      updateArtist,
      options
    )
    return res.status(200).send({ success: true, Artist: artist })
  } catch (error) {
    return res.status(400).send({ success: false, msg: error })
  }
})

module.exports = router
