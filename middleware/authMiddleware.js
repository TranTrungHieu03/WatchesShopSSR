class AuthMiddleWare {
  async ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  async isAdmin(req, res, next) {
    if (req.user.isAdmin) {
      return next();
    } else {
      res.redirect('/forbidden');
    }
  }

}

module.exports = new AuthMiddleWare