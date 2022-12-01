
// Get User Tweet timeline by user ID
// https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/quick-start

const needle = require('needle');
const bearerToken = process.env.BEARER_TOKEN;

const getUserTweets = async (fetchedUserId, params) => {
    console.log("Retrieving Tweets...");

    let userTweets = [];

    let url = `https://api.twitter.com/2/users/${fetchedUserId}/tweets`;
    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }
    let hasNextPage = true;
    let nextToken = null;
    let userName;

    console.log("Retrieving Tweets...");

    while (hasNextPage) {
        let newUrl = url;
        let resp = await getPage(params, options, nextToken, newUrl);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            userName = resp.includes.users[0].username;
            if (resp.data) {
                userTweets.push.apply(userTweets, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }

    // console.dir(userTweets, {
    //     depth: null
    // });
    console.log(`Got ${userTweets.length} Tweets from ${userName} (user ID ${fetchedUserId})!`);
    return userTweets;
}

const getPage = async (params, options, nextToken, newUrl) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', newUrl, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}

module.exports = getUserTweets;