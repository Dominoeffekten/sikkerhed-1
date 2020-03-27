var express = require('express');
var router = express.Router();
const userHandler = require("../models/handleUsers");
const { body,validationResult,sanitizeBody,check } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', async function(req, res, next) {    // display register route
  res.render('register', {                    // display register form view
      subtitle: 'Register User'     // input data to view
  });
});
router.post('/register',  [
  check('email', 'email is empty').isLength({ min: 1 }),
  check('password', 'password is to short').isLength({ min: 6}),
  ], function(req, res) {   // new user post route

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log("not there");
    return res.render('register', {                       // display register form view
      subtitle: 'Register User',     // input data to view
      wrong: 'email or password is to short'        // input data to view
    });
  }
  userHandler.upsertUser(req);
  console.log(req.body)
  return res.redirect('/');                   // skip the receipt, return to fp
});

/* Login. */
router.get('/login', function(req, res) {       // display register route
  res.render('login', {                       // display register form view
      subtitle: 'User Login'        // input data to view
  });
});
router.post('/login', async function(req, res) {// new user post route
  console.log(rc);
  if (rc) {
    console.log("you have login");
      res.render('index', {                   // find the view 'index'
        subtitle: 'Home',         // input data to 'index'
          loggedin: true,
          who: "Hello" + req.session.user               // using session var(s)
      });
  } else {
      res.render('login', {                   // find the view 'login'
        subtitle: 'User Login',   // input data to 'login'
          loggedin: false
      });
  }
});
module.exports = router;
