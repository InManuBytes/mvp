module.exports = {
  getHaiku(req, res, next) {
    const user = req.params.user;
    console.log('getting haiku');
  }
}