const needle = require('needle');



const getUserInfoByUserName = async (username) => {
    const bearerToken = process.env.BEARER_TOKEN;
    const url = `https://api.twitter.com/2/users/by/username/${username}`;
    let userData;

    // we request the author_id expansion so that we can print out the user name later
    let params = {
        "user.fields": "created_at"
    }

    const options = {
        headers: {
            // "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }

    console.log("Retrieving userId...");

    try { 
        const resp = await needle('get', url, params, options);
        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        console.log(`Got U ${resp}`);

        let newData = {
            name: resp.body.data.name,
            id: resp.body.data.id,
            age: resp.body.data.created_at
        }
        console.log(`Got U ${newData}`);

        
        return newData;

    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}

module.exports = getUserInfoByUserName;