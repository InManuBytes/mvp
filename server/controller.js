const _ = require('lodash');
const spelling = require('spelling');
const USdictionary = require('spelling/dictionaries/en_US.js');

const dictionary = new spelling(USdictionary);

const cleanText = (text) => {
  return text.split(" ").map(word => {
    // remove plural and punctuation
    const punct = /(#)|((\?|\!|\.|\,|\;|\:)$)/g;
    const cleanWord = word.replace(punct, '');
    return searchDictionary(cleanWord);
  }).join(" ");
}

const searchDictionary = (word) => {
  // exceptions
  const exceptions = ['❤️', 'coronavirus'];
  // lookup the word in the dictionary
  const options = {
    depth: 8
  }
  const lookup = dictionary.lookup(cleanWord, options);
  // make sure if it is modified with suffix it's not being excluded
  const suffix = /(s|ing|ed|ly)$/g;
  const singularWord = cleanWord.replace(suffix, '');
  const singularLookup = dictionary.lookup(singularWord);
  if (lookup.found || singularLookup.found || (exceptions.indexOf(word) > -1)) {
    // if it's found just return the original word
    return word;
  } else {
    // return the top suggestion
    const suggestions = lookup.suggestions;
    const topSuggestion = (suggestions.length > 0) ? suggestions[0].word : '';
    return topSuggestion;
  }
}

module.exports = {
  getHaiku(req, res, next) {
    console.log('generating haiku');
    const { analysis } = req;
    const { subjects, objects, actions } = analysis;
    /**
     * our naive haiku will be made up of
     *            object
     *          subject action
     *            object
     */
    let firstLine = _.sample(objects);
    const firstObjIdx = objects.indexOf(firstLine);
    // make sure the first object can't be repeated
    objects.splice(firstObjIdx, 1);
    const secondLine = `${_.sample(subjects)} ${_.sample(actions)}`;
    const lastLine = _.sample(objects);
    // generate haiku
    let haiku = [firstLine, secondLine, lastLine];
    // clean up the text
    haiku = haiku.map(line => cleanText(line));
    const randomHaiku = {
      user: req.params.user,
      haiku
    };
    res.status(200).json(randomHaiku);
    next();
  }
}