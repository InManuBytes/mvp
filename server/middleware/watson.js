const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const _ = require('lodash');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({ version: '2019-07-12' });

const analyzeTweets = (req, res, next) => {
  // the tweets come in at req.tweets
  const analyzeParams = {
    'features': {
      'semantic_roles': {}
    },
    'text': req.tweets
  };
  naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    const sentences = analysisResults.result.semantic_roles;
    const allSubjects = sentences.map(sentence => {
      return _.toLower(sentence.subject.text);
    });
    // const uniqueSubjects = allSubjects.
    console.log(JSON.stringify(allSubjects));
    next();
  })
  .catch(err => {
    console.log(err);
    res.status(404).send(err);
  });
}

module.exports = { analyzeTweets };
