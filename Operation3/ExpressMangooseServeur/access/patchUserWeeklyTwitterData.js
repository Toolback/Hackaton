const getUserTweets = require("./twitterApi/getUserTweets");
const getUserInfoByUserName = require("./twitterApi/getUserInfoByUserName");

async function patchUserWeeklyTwitterData(userName) {
    let newUserData = await getUserInfoByUserName(userName);
    // console.log("Hmm 1?", newUserData.id)


    const FromPeriod = new Date();
    FromPeriod.setDate(FromPeriod.getDate() - 7);
    let oneWeek = FromPeriod;

    let params = {
        "start_time": FromPeriod.toISOString(),
        // "since_id": "1537877003847749632",
        // "max_results": 20,
        "tweet.fields": "created_at",
        "expansions": "author_id",
        "tweet.fields": "created_at"
    }
    console.log("TEST TEMPO 1 : ", FromPeriod.toISOString())
    console.log("TEST TEMPO 1.5 oneWeek : ", oneWeek)
    console.log("TEST TEMPO 2 actual : ", new Date().toISOString())
    console.log("TEST newUserData : ",newUserData )



    const fetchTweetsData = await getUserTweets(newUserData.id, params);
    // console.log("Fetched tweet data ?", fetchTweetsData)

    newUserData.tweetsData = fetchTweetsData

    // console.log("Hmm ?", newUserData)

    return newUserData;
}

module.exports = patchUserWeeklyTwitterData;