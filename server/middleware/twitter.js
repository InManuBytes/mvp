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
  appClient.get('statuses/user_timeline', params, (error, tweets, response) => {
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
};

const uploadHaikuImage = (req, res, next) => {
  // in order to share an image we have to save it in twitters servers
  console.log('uploading image to twitter');
  // the raw binary file is in the buffer
  const rawImage = req.file.buffer;
  // upload media to twitter
  const params = {
    media: rawImage,
    total_bytes: req.file.size,
  };
  userClient.post('media/upload', params, (error, media, response) => {
    if (!error) {
      const mediaId = media.media_id_string;
      req.media_id = mediaId;
      next();
    } else {
      res.status(404).send(new Error('Could not upload media to twitter'));
    }
  })
};

const postHaiku = (req, res, next) => {
  console.log('posting tweet with media_id: ', req.media_id);
  const params = {
    status: 'Newest shared #haiku',
    media_ids: req.media_id,
  }
  userClient.post('statuses/update', params, function(error, tweet, response) {
    if (!error) {
      res.status(201).json(tweet);
    } else {
      res.status(404).send(new Error('Could not tweet image'));
    }
  });
};

module.exports = { getTweets, uploadHaikuImage, postHaiku };
