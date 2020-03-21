require('dotenv').config();
var Twitter = require('twitter');

var auth = {
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  bearer_token: process.env.BEARER_TOKEN
}

var client = new Twitter(auth);

const getTweets = (req, res, next) => {
  const twitterHandle = req.params.user
  console.log('getting tweets for', twitterHandle);
  const params = {
    screen_name: twitterHandle,
    count: 50
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
