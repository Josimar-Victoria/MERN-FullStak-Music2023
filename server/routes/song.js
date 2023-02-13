const router = require('express').Router()
const Song = require('../models/song')


// Crear una canción
router.post('/save', async (req, res) => {
  const newSong = Song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songUrl: req.body.songUrl,
    artist: req.body.artist,
    album: req.body.album,
    language: req.body.language,
    category: req.body.category
  })
  try {
    const savedSong = await newSong.save()
    return res.status(200).send({ success: true, Song: savedSong })
  } catch (error) {
    return res.status(400).send({ success: false, msg: error })
  }
})

// Obtener una canción por ID
router.get('/getOne/:id', async (req, res) => {
  const filterSong = { _id: req.params.id }

  const song = await Song.findOne(filterSong)

  if (song) {
    return res.status(200).send({ success: true, Song: song })
  } else {
    return res.status(400).send({ success: false, msg: 'Song not found' })
  }
})

// Obtener todas las canciones
router.get('/getAll', async (req, res) => {
//   const options = {
//     sort: { createdAt: 1 }
//   }

  const songs = await Song.find()

  if (songs) {
    return res.status(200).send({ success: true, songs: songs })
  } else {
    return res.status(400).send({ success: false, msg: 'No songs found' })
  }
})

// Eliminar una canción
router.delete('/delete/:id', async (req, res) => {
  const filter = { _id: req.params.id }

  const result = await Song.deleteOne(filter)
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: 'Data Deleted' })
  } else {
    res.status(200).send({ success: false, msg: 'Data Not Found' })
  }
})

// Atualizar una canción
router.put('/update/:updateId', async (req, res) => {
  const filter = { _id: req.params.updateId }
  const options = {
    upsert: true,
    new: true
  }
  try {
    const result = await Song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category
      },
      options
    )
    res.status(200).send({ artist: result })
  } catch (error) {
    res.status(400).send({ success: false, msg: error })
  }
})

module.exports = router
