var express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const db = require('./app/database/db.js');

var cors = require('cors');

// Then use it before your routes are set up:
app.use(cors());

//Parse Params
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
const userRoutes = require('./app/routes/user');
app.use("/user", userRoutes);


// Create a Server
var server = app.listen(9000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
})


//DB
// force: true will drop the table if it already exists
db.sequelize.sync().then(() => { // db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});


//REQUESTS
app.use((req, res, next) => {
  console.log(req.body)
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  console.log(req.body)
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(req.body);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;