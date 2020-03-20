const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({ version: '2019-07-12' });

const analyzeTweets = (req, res, next) => {
  console.log('analyzing tweets for ', req.tweets);
  const analyzeParams = {
    'features': {
      'semantic_roles': {}
    },
    'text': 'This is a tweet'
  };
  next();
  // naturalLanguageUnderstanding.analyze(analyzeParams)
  // .then(analysisResults => {
  //   console.log(JSON.stringify(analysisResults, null, 2));
  // })
  // .catch(err => {
  //   console.log('error:', err);
  // });
}

module.exports = { analyzeTweets };
