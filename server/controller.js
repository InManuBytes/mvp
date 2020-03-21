const _ = require('lodash');

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
    const firstLine = _.sample(objects);
    const firstObjIdx = objects.indexOf(firstLine);
    // make sure the first object can't be repeated
    objects.splice(firstObjIdx, 1);
    const secondLine = `${_.sample(subjects)} ${_.sample(actions)}`;
    const lastLine = _.sample(objects);
    const haiku = [firstLine, secondLine, lastLine];
    const randomHaiku = {
      user: req.params.user,
      haiku
    };
    res.status(200).json(randomHaiku);
    next();
  }
}