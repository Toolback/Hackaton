const getUserTweets = require("./twitterApi/getUserTweets");
const getUserInfoByUserName = require("./twitterApi/getUserInfoByUserName");

async function getUserTwitterData(userName, start, end) {
    let newUserData = await getUserInfoByUserName(userName);
    // console.log("Hmm 1?", newUserData.id)


    const FromPeriod = new Date();
    FromPeriod.setMonth(FromPeriod.getMonth() - 6);
    // try = 
    console.log("Hmm 1?", FromPeriod.toISOString())
    console.log("Hmm 1?", Date(Number(start)))


    let params = {
        "start_time": FromPeriod.toISOString(),
        // "since_id": "1537877003847749632",
        // "max_results": 20,
        "tweet.fields": "created_at",
        "expansions": "author_id",
        "tweet.fields": "created_at"
    }

    const fetchTweetsData = await getUserTweets(newUserData.id, params);
    // console.log("Fetched tweet data ?", fetchTweetsData)

    newUserData.tweetsData = fetchTweetsData

    // console.log("Hmm ?", newUserData)

    return newUserData;
}

module.exports = getUserTwitterData;