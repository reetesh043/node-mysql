const express = require('express');
const router = express.Router();
const controller = require('../controllers/user')
const checkResgistro = require('../middleware/verifySignUp')
const verifyJwtToken = require('../middleware/verifyJwtToken')


router.post("/signup", checkResgistro.checkDuplicateUserNameOrEmail, function(req, res, next){
     console.log('initial route')
 controller.signup(req, res, next);

});

router.post("/signin", function(req, res, next){
 controller.signin(req, res, next);

   res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

});


router.delete("/:userId", verifyJwtToken.verifyToken, controller.user_delete);

module.exports = router;