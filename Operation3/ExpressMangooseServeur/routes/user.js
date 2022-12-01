const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Getting all
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// // Getting One by Id
// router.get('/:id', getUser, (req, res) => {
//   res.json(res.user)
// })

// // Getting One by Address
// router.get('/:publicAddress', getUserByAddress, (req, res) => {
//   try {
//     console.log("Arrived in DB")
//     res.json(res.user)
//   } catch (e) {
//     console.log("DB : Get By Address", e.message)
//     res.status(500).json({ message: err.message })
//   }
// })

// Getting One by Address
router.get('/:publicAddress/publicAddress', getUserByAddress, (req, res) => {
  // res.json(res.user)
  try {
    res.status(201).json(res.user)
  } catch (e) {
    console.log("DB : Get By Address", e.message)
    res.status(500).json({ message: e.message })
  }
})


// Creating one
router.post('/', async (req, res) => {
  // Or const user = await User.create({id: req.body.id}, etc);
  const user = new User({
    id: req.body.id,
    name: req.body.name,
    publicAddress: req.body.publicAddress,
    email: req.body.email,
  })
  user.twitter.twitterUserName= req.body.twitterUserName
  try {
    const newUser = await user.save()
    res.status(201).json({newUser})
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.publicAddress != null) {
    res.user.publicAddress = req.body.publicAddress
  }
  if (req.body.name != null) {
    res.user.name = req.body.name
  }
  if (req.body.email != null) {
    res.user.email = req.body.email
  }
  if (req.body.id != null) {
    res.user.id = req.body.id
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'User Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}

async function getUserByAddress(req, res, next) {
  let user
  try {
    // console.log("DB : user.js : getUserByAddress() : ", req.params.publicAddress)
    // user = await User.find({ publicAddress : "0x921b472E9cD709B8a754cA84c241C7ad61fFB80d"})
    //               .exists({}) ?

    // Custom Query 
    // user = await User.where("publicAddress").equals("0x921b472E9cD709B8a754cA84c241C7ad61fFB80d")
    
    // Regex
    // user = await User.findByAddr("0x921b472E9cD709B8a754cA84c241C7ad61fFB80d")

    // methods
    user = await User.find({ publicAddress: req.params.publicAddress})


    if (user == null) {
      console.log("User Null")

      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.json({ message: err.message })
  }

  res.user = user
  next()
}

// getUserByAddress({publicAddress : "0x921b472E9cD709B8a754cA84c241C7ad61fFB80d"});

module.exports = router