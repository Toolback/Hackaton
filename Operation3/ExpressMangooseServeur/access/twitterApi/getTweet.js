import { Client } from "twitter-api-sdk";

async function getTweet() {
  const client = new Client(process.env.BEARER_TOKEN);

  const response = await client.tweets.tweetCountsRecentSearch({
    "start_time": "2022-08-30T00:00:00.000Z",
    "granularity": "day",
    "search_count.fields": [
        "end",
        "tweet_count"
    ]
  });
  
  console.log("response", JSON.stringify(response, null, 2));
}
  
module.exports = getTweet;