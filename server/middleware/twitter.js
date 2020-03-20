require('dotenv').config();
var Twitter = require('twitter');

var auth = {
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  bearer_token: process.env.BEARER_TOKEN
}

var client = new Twitter(auth);

const getTweets = (req, res, next) => {
  console.log('getting tweets');
  const params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    } else {
      req.tweets = tweets;
      next();
    }
  });
}

module.exports = { getTweets };
