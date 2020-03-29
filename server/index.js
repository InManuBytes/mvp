const express = require('express');
const PORT = process.env.PORT || 8080;
const expressStaticGzip = require("express-static-gzip");
const bodyParser = require('body-parser');
const multer = require('multer');
// TODO change image storage to a caching server
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const controller = require('./controller.js');
const { twitter, watson } = require('./middleware/index.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// uncomment for development
app.use(express.static(__dirname + '/../public'));
// app.use('/', expressStaticGzip(__dirname + '/../public'));

app.get('/haikus/:user', twitter.getTweets, watson.analyzeTweets, controller.getHaiku);
// when a user wants to share a tweet-ku we have to process the file first
// TODO save haiku tweet id, image url in server to be the first check
// so no duplicate tweets sent to account
app.post('/haikus/share', upload.single('haikuCard'), twitter.uploadHaikuImage, twitter.postHaiku)

app.listen(PORT, function() {
  console.log('listening on port 8080!');
});