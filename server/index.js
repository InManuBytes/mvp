const express = require('express');
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
app.use(express.static(__dirname + '/../public'));

app.get('/haikus/:user', twitter.getTweets, watson.analyzeTweets, controller.getHaiku);
// when a user wants to share a tweet-ku we have to process the file first
app.post('/haikus/share', upload.single('haikuCard'), twitter.uploadHaikuImage, twitter.postHaiku)

app.listen(8080, function() {
  console.log('listening on port 8080!');
});