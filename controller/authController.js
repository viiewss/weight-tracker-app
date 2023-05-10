const passport = require('passport');
const User = require('../models/user');

function loginUser(req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).send('Logged In');
    });
  })(req, res, next);
}

function registerUser(req, res, next) {
  console.log('Register user request received:', req.body);
  User.register(
    new User({
      email: req.body.email,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        return next(err);
      }
      passport.authenticate('local')(req, res, function () {
        //res.cookie('registered', 'true', { maxAge: 900000, httpOnly: false });
        res.redirect('/weight-tracker'); // Redirect the user to '/weight-tracker'
      });
    }
  );
}

function logoutUser(req, res) {
  req.logout(function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: 'Error logging out.', error: err.message });
    }
    res.status(200).send('Logged Out');
  });
}

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
};
