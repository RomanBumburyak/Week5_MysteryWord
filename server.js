const express = require("express");
	const path = require("path");
	const mustacheExpress = require("mustache-express");
	const bodyParser = require("body-parser");
	const morgan = require("morgan");
	const session = require("express-session");
	const routes = require("./routes/index");
	const expressValidator = require("express-validator");
	const app = express();


	app.engine("mustache", mustacheExpress());
	app.set("views", path.join(__dirname, "./views"));
	app.set("view engine", "mustache");
	app.set("layout", "home");


	app.use(express.static(path.join(__dirname, "./public")));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(expressValidator());


	app.use(morgan("dev"));


	app.use(session({
	  secret: "Shawty",
	  resave: false,
	  saveUninitialized: false
	}));


	app.use(routes);


	app.listen(3001, function() {
	  console.log("Ballin Login on localhost: 3001");
	});
