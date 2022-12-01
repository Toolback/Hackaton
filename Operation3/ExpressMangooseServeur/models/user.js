// const mongoose = require('mongoose')

const mongoose = require('mongoose')
const { Schema } = mongoose;

const friends = new mongoose.Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
    // default: 0
  },
  // ref: "User"
})

const community = new mongoose.Schema({
  friends: [friends],
  // challengedFriends: []
})

const twitter = new mongoose.Schema({
  lastUpdate: {
    type: Date,
    default: () => Date.now(),
  },
  twitterName: {
    type: String,
    default: "Enter Twitter Name"
  },
  twitterUserName: {
    type: String, 
    default: "Enter Twitter UserName"
  },
  userId: {
    type: Number, 
    default: -1
  },
  oauthToken: {
    type: String,
    default: "N/A"
  },
  oauthTokenSecret: {
    type: String,
    default: "N/A"
  },
  twitterAccountAge: {
    type: Date, 
    default: -1 // /! Or date.now() ?
  },
  // userCreatedAt: {
  //   type: Date, 
  //   default: -1
  // },
  followingNumber: {
    type: Number, 
    default: -1
  },
  followersNumber: {
    type: Number, 
    default: -1
  },
  tweetsNumber: {
    type: Number, 
    default: -1
  },
  tweetsId: [{
    type: Number, 
    default: -1
  }],
  retweetsId: [{
    type: Number, 
    default: -1
  }],
  tweetsList: [{
    // created_at: Date,
    // id: Number,
    // author_id: Number,
    // text: String
  }],
})

const youtube = new mongoose.Schema({
  lastUpdate: {
    type: Date,
    default: () => Date.now(),
  },
  timeWatch: {
    type: Number, 
    default: 0
  },
})

const mobile = new mongoose.Schema({
  lastUpdate: {
    type: Date,
    default: () => Date.now(),
  },
  timeScreen: {
    type: Number, 
    default: 0
  },
})

const socialMetrics = new mongoose.Schema({
  // lastUpdate: {
  //   type: Date,
  //   default: Date.now
  // }, // regroup all subclass update time ?
  twitter: {type: twitter, default: {}},
  youtube: {type: youtube},
  mobile: {type: mobile},
})

const statistics = new mongoose.Schema({
  experience: {
    type: Number, 
    default: 0
  },
  questAccepted: {
    type: Number, 
    default: 0
  },
  questCompleted: {
    type: Number, 
    default: 0
    // required: true
  },
  daoProposalCreated: {
    type: Number, 
    default: 0
  },
  daoProposalCreatedAccepted: {
    type: Number, 
    default: 0
  },
  daoProposalVoted: {
    type: Number, 
    default: 0
  },
  challengeReceived: {
    type: Number, 
    default: 0
  },
  challengeCompleted: {
    type: Number, 
    default: 0
  },
  friendChallenged: {
    type: Number, 
    default: 0
  }
  
})

const weeklyRewards = new mongoose.Schema({
  date: {
    type: Date,
    default: () => Date.now(),
  },
  amount: {
    type: Number,
    default: 0
  }
})

const earnings = new mongoose.Schema({
  totalEarnings: {
    type: Number, 
    default: 0
  },
  lastWithdrawAmount: {
    type: Number, 
    default: 0
  },
  lastWithdrawDate: {
    type: Date, 
    default: () => Date.now(),
  },

  weeklyRewards: [weeklyRewards],
})



const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0
  }, 
  userName: {
    type: String,
    default: "New User"
    // minLength: 1,
    // validate: {
    //   validator: v => v % 2 === 0,
    //   message: props => `${props.value} is not an even number`
    // }
  },
  publicAddress: {
    type: String,
    default: "0"
  },
  email: {
    type: String,
    default: "0"
  },
  registeredAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  tokenId: {
    type: Number,
    default: 0
  },
  // linkToIpfs: {
  //   type: String,
  //   default: "#"
  // },
  twitter: {
    type: twitter,
    default: {}
  }

  // statistics: {type: statistics, default: {}},
  // earnings: {type: earnings, default: {}},
  // socialMetrics: {type: socialMetrics, default: {}},
  // community: {type: community, default: {}}



}, { strict: false })

// userSchema.statics.findByAddr = function (address) {
//   return this.find({publicAddress: new RegExp(address, "i") })
// }

// // userQuery to specify
// userSchema.query.ByName = function (name) {
//   return this.where({ tokenId: new RegExp(name, "i") })
// }

// // custom specific query on db
// userSchema.virtual("namedEmail").get(function () {
//   return `${this.name} <${this.email}`
// })

// // custom action before action 
// userSchema.pre('save', function (next) {
//   this.socialMetrics.lastUpdate = Date.now()
//   next()
// })

userSchema.methods.findUserByAddress = function (params) {
  console.log("UserSchema : methods.findUserByAddress() : ", params)
  try {
    return mongoose.model('User').find({ publicAddress: this.type }, params);
  } catch (e) {
    console.log("DB : UserSchema : methods.findUserByAddress():", e.message)
    return e.message
  }
                        // or User ? 
};

module.exports = mongoose.model('User', userSchema)