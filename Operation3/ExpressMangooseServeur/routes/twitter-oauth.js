const express = require('express')
const router = express.Router()
const User = require('../models/user')

const oauthCallback=process.env.FRONTEND_URL;
const oauth = require('./lib/oauth-promise')(oauthCallback);
const COOKIE_NAME = 'oauth_token';

//OAuth Step 1
router.post('/twitter/request_token', async (req, res) => {
  
    const {oauth_token, oauth_token_secret} = await oauth.getOAuthRequestToken();
    
    res.cookie(COOKIE_NAME, oauth_token , {
      maxAge: 15 * 60 * 1000, // 15 minutes
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    
    tokens[oauth_token] = { oauth_token_secret };
    res.json({ oauth_token });
    
  });
    
  
  //OAuth Step 3
  router.post('/twitter/access_token', async (req, res) => {
    
    
    try {
      const {oauth_token: req_oauth_token, oauth_verifier} = req.body;
      const oauth_token = req.cookies[COOKIE_NAME];
      const oauth_token_secret = tokens[oauth_token].oauth_token_secret;
      
      if (oauth_token !== req_oauth_token) {
        res.status(403).json({message: "Request tokens do not match"});
        return;
      }
      
      const {oauth_access_token, oauth_access_token_secret} = await oauth.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier);
      tokens[oauth_token] = { ...tokens[oauth_token], oauth_access_token, oauth_access_token_secret };
      res.json({success: true});
      
    } catch(error) {
      res.status(403).json({message: "Missing access token"});
    } 
     
});

//Authenticated resource access
router.get("/twitter/users/profile_banner", async (req, res) => {
  
  try {
    const oauth_token = req.cookies[COOKIE_NAME];
    const { oauth_access_token, oauth_access_token_secret } = tokens[oauth_token]; 
    const response = await oauth.getProtectedResource("https://api.twitter.com/1.1/account/verify_credentials.json", "GET", oauth_access_token, oauth_access_token_secret);
    res.json(JSON.parse(response.data));
  } catch(error) {
    res.status(403).json({message: "Missing, invalid, or expired tokens"});
  } 
  
});

router.post("/twitter/logout", async (req, res) => {
  
  try {
    const oauth_token = req.cookies[COOKIE_NAME];
    delete tokens[oauth_token];
    res.cookie(COOKIE_NAME, {}, {maxAge: -1});
    res.json({success: true});
  } catch(error) {
    res.status(403).json({message: "Missing, invalid, or expired tokens"});
  } 
  
});

async function getUserData(req, res, next) {
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