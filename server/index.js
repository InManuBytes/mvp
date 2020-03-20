const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller.js');
const { twitter, watson } = require('./middleware/index.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

app.get('/haikus/:user', twitter.getTweets, watson.analyzeTweets, controller.getHaiku);


app.listen(8080, function() {
  console.log('listening on port 8080!');
});