const express = require('express')
const router = express.Router()
const User = require('../models/user')

const getUserInfoByUserName = require('../access/twitterApi/getUserInfoByUserName')
const getInitialUserTwitterData = require('../access/getUserTwitterData')
const libBc = require("../blockchain/libBc");
const patchUserWeeklyTwitterData = require('../access/patchUserWeeklyTwitterData')

// // Getting all
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find()
//     res.json(users)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })



// Getting user Infos (name/username/id) by UserName
router.get('/:userName/userId', getUserInfo, (req, res) => {
  // res.json(res.user)
  try {
    res.status(201).json(res.user)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// trynna update smart contract data w db user twitter stats
router.get('/TUSD', updateUserSMData, (req, res) => {
  // res.json(res.user)
  try {
    console.log("/! FINAL RESULTS HERE :", res.retrievedData)

    res.status(201).json(res.retrievedData)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Initialize User Twitter Data - 6months
router.patch('/:userAddress/initializeTwitterData', getUserInitialData, async (req, res) => {
  // res.json(res.user)
  
    // console.log("/! FINAL USER :", res.user)

    // console.log("/! FINAL UPDATED DATA :", res.updatedData)

    if (res.updatedData.name != null) {
      res.user.twitter.twitterName = res.updatedData.name
    }
    if (res.updatedData.id != null) {
      res.user.twitter.userId = res.updatedData.id
    }
    if (res.updatedData.age != null) {
      res.user.twitter.twitterAccountAge = res.updatedData.age
    }
    if (res.updatedData.tweetsData != null) {
      res.user.twitter.tweetsList = res.updatedData.tweetsData
    //  let tweetList = res.user.twitter.tweetsList
    //  tweetList.push(res.updatedData.tweetsData) 

    }
    console.log("/! FINAL USER :", res.user.twitter)

  try {
    const updatedUser = await res.user.save()
    res.status(201).json(updatedUser)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// Update User Weekly Twitter Data
router.get('/:userAddress/WUTD', updateWeeklyTwitterData, async (req, res) => {
  // res.json(res.user)
  
    // console.log("/! FINAL USER :", res.user)

    // console.log("/! FINAL UPDATED DATA :", res.updatedData)

    if (res.updatedData.name != null) {
      res.user.twitter.twitterName = res.updatedData.name
    }
    if (res.updatedData.id != null) {
      res.user.twitter.userId = res.updatedData.id
    }
    if (res.updatedData.age != null) {
      res.user.twitter.twitterAccountAge = res.updatedData.age
    }
    if (res.updatedData.tweetsData != null) {
      res.user.twitter.tweetsList = res.updatedData.tweetsData
    //  let tweetList = res.user.twitter.tweetsList
    //  tweetList.push(res.updatedData.tweetsData) 

    }
    console.log("/! FINAL USER :", res.user.twitter)

  try {
    // const updatedUser = await res.user.save()
    res.status(201).json(res.updatedData) // updatedUser
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})





async function getUserInfo(req, res, next) {
  let user
  try {

    user = await getUserInfoByUserName(req.params.userName)


    // if (user == null) {
    //   console.log("User Null")

    //   return res.status(404).json({ message: 'Cannot find user' })
    // }
  } catch (err) {
    console.log("BD / getUserId() : Error Catched :", err.message)
    return res.json({ message: err.message })
  }

  res.user = user
  next()
}

async function getUserInitialData(req, res, next) {
  let user
  let updatedData
  let twitterUserName
  try {
    // console.log("DB1: :", req.params.userAddress);
 
    // find person with the matching name
    user = await User.findOne({ publicAddress: req.params.userAddress });
    // Retrieve Twitter UserName
    twitterUserName = user.twitter.twitterUserName
    // console.log("DB4: :", twitterUserName)
    
    // Retrieve Twitter User Datas
    updatedData = await getInitialUserTwitterData(twitterUserName)

    // if (user == null) {
    //   console.log("User Null")

    //   return res.status(404).json({ message: 'Cannot find user' })
    // }
  } catch (err) {
    console.log("BD / getUserId() : Error Catched :", err.message)
    return res.json({ message: err.message })
  }

  res.user = user
  res.updatedData = updatedData
  next()
}



async function updateWeeklyTwitterData(req, res, next) {
  let user
  let updatedData
  let twitterUserName
  try { 
    // find person with the matching name
    user = await User.findOne({ publicAddress: req.params.userAddress });
    // Retrieve Twitter UserName
    twitterUserName = user.twitter.twitterUserName
    
    // Retrieve Twitter User Datas
    updatedData = await patchUserWeeklyTwitterData(twitterUserName)

    // if (user == null) {
    //   console.log("User Null")

    //   return res.status(404).json({ message: 'Cannot find user' })
    // }
  } catch (err) {
    console.log("BD / getUserId() : Error Catched :", err.message)
    return res.json({ message: err.message })
  }

  res.user = user
  res.updatedData = updatedData
  next()
}

async function updateUserSMData(req, res, next) {
  let retrievedData;
  try { 
    retrievedData = await libBc.updateBCData();
    res.status(201)
   } catch (e) {
    return res.json({message: e.message})
  }
  res.retrievedData = retrievedData
  next()}

// getUserByAddress({publicAddress : "0x921b472E9cD709B8a754cA84c241C7ad61fFB80d"});

module.exports = router