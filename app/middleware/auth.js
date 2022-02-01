const jwt = require("jsonwebtoken");
const config = require('../config/config.js');

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({
					auth: false,
					message: 'Fail to Authentication. Error -> ' + err
				});
		}
		req.userId = decoded.id;
		next();
	});
};

module.exports = verifyToken;
