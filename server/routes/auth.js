const router = require('express').Router()
const admin = require('../config/firebase.config')
const user = require('../models/user')

// Login Users
router.get('/login', async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: 'Invalid Token' })
  }

  const token = req.headers.authorization.split(' ')[1]

  try {
    const decodeValue = await admin.auth().verifyIdToken(token)
    if (!decodeValue) {
      return res.status(500).json({ message: 'Un Authorized' })
    } else {
      // Ckecking user exists or not
      const userExists = await user.findOne({ user_id: decodeValue.user_id })
      if (!userExists) {
        newUserData(decodeValue, req, res)
      } else {
        updateNewUserData(decodeValue, req, res)
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// Create
const newUserData = async (decodeValue, req, res) => {
  const newUser = new user({
    name: decodeValue.name,
    email: decodeValue.email,
    imageUrl: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: 'menber',
    auth_time: decodeValue.auth_time
  })

  try {
    const savedUser = await newUser.save()
    return res.status(200).json({ user: savedUser, success: true })
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false })
  }
}

// Atualizar user
const updateNewUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id }

  const option = {
    new: true,
    upsert: true
  }
  try {
    const resul = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      option
    )
    res.status(200).json({ user: resul, success: true })
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false })
  }
}

// Obter todos los users
router.get('/getUsers', async (req, res) => {
  // const options = {
  //   sort: { createdAt: -1 }
  // }
  try {
    const users = await user.find()
    if (users) {
      return res.status(200).send({ success: true, users: users })
    }
  } catch (error) {
    return res.status(400).send({ message: error.message, success: false })
  }
})

router.put('/updateRole/:userId', async (req, res) => {
  // console.log(req.body.data.role, req.params.userId);
  const filter = { _id: req.params.userId }
  // console.log(filter);
  const role = req.body.role
  // console.log(role);

  const options = {
    upsert: true,
    new: true
  }

  try {
    const result = await user.findOneAndUpdate(filter, { role: role }, options)
    res.status(200).send({ user: result })
  } catch (err) {
    res.status(400).send({ success: false, msg: err })
  }
})

// Elimninar user
router.delete('/delete/:userId', async (req, res) => {
  const filter = { _id: req.params.userId }

  const userDelete = await user.deleteOne(filter)
  if (userDelete.deletedCount === 1) {
    res.status(200).send({ success: true, msg: 'User deleted successfully' })
  } else {
    res.status(400).send({ success: false, msg: 'User Not Found' })
  }

  return res
})

module.exports = router
