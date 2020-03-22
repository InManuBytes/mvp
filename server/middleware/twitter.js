require('dotenv').config();
var Twitter = require('twitter');

var auth = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

var client = new Twitter(auth);

const getTweets = (req, res, next) => {
  const twitterHandle = req.params.user
  console.log('getting tweets for', twitterHandle);
  const params = {
    screen_name: twitterHandle,
    count: 200
  };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      // send back in the response and don't process req
      res.status(404).send(new Error('Could not get tweets for twitterHandle'));
    } else {
      // tweets come back in an array, so we want to filter out for text
      const tweetTexts = tweets.map((tweetObj) => {
        return tweetObj.text
      })
      // attach them to the request for the next step
      req.tweets = tweetTexts.join('. ');
      next();
    }
  });
}

module.exports = { getTweets };
