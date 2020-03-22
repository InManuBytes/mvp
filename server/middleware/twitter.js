require('dotenv').config();
var Twitter = require('twitter');

var appAuth = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
};

var userAuth = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

var appClient = new Twitter(appAuth);
var userClient = new Twitter(userAuth);

const getTweets = (req, res, next) => {
  const twitterHandle = req.params.user
  console.log('getting tweets for', twitterHandle);
  const params = {
    screen_name: twitterHandle,
    count: 200
  };
  appClient.get('statuses/user_timeline', params, function(error, tweets, response) {
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

const postHaiku = (req, res, next) => {
  console.log('posting to twitter')
  userClient.post('statuses/update', {status: 'Hello World'}, function(error, tweet, response) {
    if (!error) {
      console.log(tweet);
      res.status(201).json(tweet);
    } else {
      console.log(error)
    }
  });
}

module.exports = { getTweets, postHaiku };
