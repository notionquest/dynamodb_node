var LocalStrategy = require("passport-local").Strategy,
 bCrypt = require("bcrypt-nodejs"),
 express = require("express"),
 passport = require('passport'),
 flash = require("connect-flash"),
 session = require('express-session');

app = express();
app.use(flash());
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));


passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
passport.use(new LocalStrategy({passReqToCallBack : true},
  function(req, username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
}

app.listen(3000);