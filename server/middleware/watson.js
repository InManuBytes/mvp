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
    // get the array of sentences
    const sentences = analysisResults.result.semantic_roles;
    // initialize storage for our roles
    const subjects = [];
    const objects = [];
    const actions = [];
    // filter and sort unique roles
    sentences.forEach(sentence => {
      const currentSubject = sentence.subject ? _.toLower(sentence.subject.text) : null;
      if (_.indexOf(subjects, currentSubject) === -1) {
        subjects.push(currentSubject);
      }
      const currentObject = sentence.object ? _.toLower(sentence.object.text) : null;
      if (_.indexOf(objects, currentObject) === -1) {
        // make sure we don't add links
        const link = /https.+(?= |\b)/g;
        const nonsense = /…|&amp|@|#/g;
        const noNonsense = _.replace(currentObject, nonsense, '');
        const cleanObject = _.replace(noNonsense, link, '');
        if (cleanObject.length > 1) {
          objects.push(cleanObject);
        }
      }
      const currentAction = sentence.action ? _.toLower(sentence.action.text) : null;
      if (_.indexOf(actions, currentAction) === -1) {
        actions.push(currentAction);
      }
    });
    const analysis = {
      subjects,
      objects,
      actions
    }
    // add the anaylsis to the req for further processing
    req.analysis = analysis
    next();
  })
  .catch(err => {
    console.log(err);
    res.status(404).send(err);
  });
}

module.exports = { analyzeTweets };
