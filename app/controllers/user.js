const db = require('../database/db.js');
const config = require('../config/config.js');
const bodyParser = require("body-parser");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const maxAge = 3 * 24 * 60 * 60;

exports.signup = (req, res, next) => {
	// Save User to Database
	console.log("Processing func -> SignUp");

	User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
		if (!user) {
			return res.send('User No created.');
		}
		res.send(user);
	}).catch(err => {
		res.status(500).send("Fail! Error -> " + err);
	})
}

exports.signin = (req, res, next) => {
	console.log("Sign-In");

	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('User Not Found.');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		const token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: maxAge
		})
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).send({ auth: true, accessToken: token });

	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}
