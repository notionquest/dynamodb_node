const LocalStrategy = require("passport-local").Strategy;
const bCrypt = require("bcrypt-nodejs");
const express = require("express");
const passport = require('passport');
const flash = require("connect-flash");
const session = require('express-session');

const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
    //testing purposes
    "region": "us-west-2",
    "accessKeyId": "abcde",
    "secretAccessKey": "abcde",
    "endpoint": "http://localhost:8001"
});

app = express();
app.use(flash());
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    saveUninitialized: false
}));


passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
passport.use(new LocalStrategy({
    passReqToCallback : true
},
    function (req, username, password, done) {
        var queryParams = {
            TableName: "users",
            KeyConditionExpression: "email = :user",
            ExpressionAttributeValues: {
                //username entered in jade form
                ":user": { "S": username }
            }
        };
        //querying dynamodb for username
        dynamodb.query(queryParams,
            function (err, user) {
                if (err) {
                    console.error(username);
                    console.error(err);
                    return done(err);
                }
                //if no users with said username in db
                if (user.Count < 1) {
                    console.error("user: " + username + " not found in db");
                    return done(null, false, req.flash("message", "user not found"));
                }
                //too many entries (admin's fault)
                if (user.Count > 1) {
                    console.error("error, more than one user with " + username + " in db");
                    return done(null, false, req.flash("message", "more than version of the username in the db"));
                } else {
                    //only one user exists in db, query for username was successful
                    user.Items.forEach(function (item) {

                        //checking if entered password is wrong
                        if (!isValidPassword(item.username, item.password)) {
                            console.error("invalid username - password combination");
                            return done(null, false, req.flash("message", "invalid user-password combination"));
                        }


                        //passwortcheck wird gar nicht ausgeführt - query returnt noch nicht die richtigen Ergebnisse
                        //successful login - user and password match
                        console.log("login successful");
                        console.log(user.username); //undefined
                        console.log(user.password); //undefined
                        console.log(user);
                        //return user object for serialization
                        return done(null, user);
                    });
                }
            });

        //passport serialization to support persitent login sessions
        passport.serializeUser(function (user, done) {
            console.log("serializing user: " + user);
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                console.log("deserializing user: " + user);
                done(err, user);
            });
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