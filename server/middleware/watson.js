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
      const users = /@.+(?= |\b)/g;
      const link = /http.+(?= |\b)/g;
      const nonsense = /…|&amp|in the|as a/g;
      const currentSubject = sentence.subject ? _.toLower(sentence.subject.text) : null;
      const subHasUser = users.test(currentSubject);
      if (_.indexOf(subjects, currentSubject) === -1 && !subHasUser) {
        // get rid of nonsense
        const noNonsenseSub = _.replace(currentSubject, nonsense, '');
        const cleanSubject = _.replace(noNonsenseSub, link, '');
        subjects.push(cleanSubject);
      }
      const currentObject = sentence.object ? _.toLower(sentence.object.text) : null;
      const objHasUser = users.test(currentObject);
      if (_.indexOf(objects, currentObject) === -1 && !objHasUser) {
        // make sure we don't add links or nonsense
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
    res.status(404).json(err);
  });
}

module.exports = { analyzeTweets };
