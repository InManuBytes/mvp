const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({ version: '2019-07-12' });

const analyzeParams = {
  'features': {
    'semantic_roles': {}
  },
  'text': 'IBM has one of the largest workforces in the world. Another sentence. This is a test.'
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });