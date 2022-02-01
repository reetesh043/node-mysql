const express = require('express');
const router = express.Router();
const controller = require('../controllers/user')
const checkResgistro = require('../middleware/verifySignUp')
const verifyJwtToken = require('../middleware/verifyJwtToken')
const auth = require('../middleware/auth');
const verifyToken = require('../middleware/auth');



router.post("/signup", checkResgistro.checkDuplicateUserNameOrEmail, function(req, res, next) {
    console.log('initial route')
    controller.signup(req, res, next);

});

router.post("/signin", function(req, res, next) {
    controller.signin(req, res, next);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

});

// Welcome user
router.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

//logout user
router.get('/logout', auth, function(req, res) {
    try {
      res.cookie('jwt', '', { maxAge: 1 });
      res.status(200).send("User Logged Out ");
    } catch (error) {
        res.status(500).send()
    }
});


module.exports = router;
