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
    const uniqueSubjects = _.uniq(allSubjects);
    console.log(JSON.stringify(uniqueSubjects));
    next();
  })
  .catch(err => {
    console.log(err);
    res.status(404).send(err);
  });
}

module.exports = { analyzeTweets };
