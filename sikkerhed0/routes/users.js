var express = require('express');
var router = express.Router();
const modGover = require("../models/handleUsers");
const { body,validationResult,sanitizeBody,check } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', async function(req, res, next) {    // display register route
  res.render('register', {                    // display register form view
      title: 'nodeAuthDemo Register User'     // input data to view
  });
});
router.post('/register', function(req, res) {   // new user post route
  userHandler.upsertUser(req);
  return res.redirect('/');                   // skip the receipt, return to fp
});
module.exports = router;
