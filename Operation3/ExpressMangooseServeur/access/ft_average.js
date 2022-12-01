const getTweet = require("./twitterApi/getTweet");

async function ft_average(userName, goal) 
{
    const one_month = new Date();
    one_month.setMonth(one_month.getMonth() - 1);
    const user_twitter_data = await getTweet(userName, one_month);

}