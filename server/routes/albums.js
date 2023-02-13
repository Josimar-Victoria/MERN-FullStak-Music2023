const router = require('express').Router()
const Album = require('../models/album')

// Crear un album
router.post('/save', async (req, res) => {
  const newAlbum = Album({
    name: req.body.name,
    imageURL: req.body.imageURL
  })
  try {
    const savedAlbum = await newAlbum.save()
    return res.status(200).send({ success: true, Album: savedAlbum })
  } catch (error) {
    return res.status(400).send({ success: false, msg: error })
  }
})

// Obtener los albums por ID
router.get('/getOne/:id', async (req, res) => {
  const filterAlbum = { _id: req.params.id }

  const album = await Album.findOne(filterAlbum)

  if (album) {
    return res.status(200).send({ success: true, Album: album })
  } else {
    return res.status(400).send({ success: false, msg: 'Album not found' })
  }
})

// Obtener todos los albums
router.get('/getAll', async (req, res) => {
//   const options = {
//     sort: { createdAt: 1 }
//   }

  const albums = await Album.find()

  if (albums) {
    return res.status(200).send({ success: true, albums: albums })
  } else {
    return res.status(400).send({ success: false, msg: 'No albums found' })
  }
})

// Eliminar un album
router.delete('/delete/:id', async (req, res) => {
  const filterAlbum = { _id: req.params.id }

  const album = await Album.deleteOne(filterAlbum)

  if (album) {
    return res
      .status(200)
      .send({ success: true, msg: 'Album deleted', Album: album })
  } else {
    return res.status(400).send({ success: false, msg: 'Album not found' })
  }
})

// Atualizar un album
router.put('/update/:id', async (req, res) => {
  const filterAlbum = { _id: req.params.id }

  const options = {
    new: true,
    upsert: true
  }

  const updateAlbum = {
    name: req.body.name,
    imageURL: req.body.imageURL
  }
  try {
    const savedAlbum = await Album.findOneAndUpdate(
      filterAlbum,
      updateAlbum,
      options
    )
    return res.status(200).send({ success: true, Album: savedAlbum })
  } catch (error) {
    return res.status(400).send({ success: false, msg: error })
  }
})

module.exports = router
