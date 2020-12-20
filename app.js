const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const favicon = require("serve-favicon");

const app = express();

// whitelist
const whitelist = ['http://localhost:4001','http://localhost:4000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// Ratelimit
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 2 requests per windowMs
    message: "Too many requests created from this IP, please try again after a minute"
  });

// Middleware
app.use(morgan("common"));
app.use(helmet());
app.use(cors(corsOptions));
app.use(limiter); //  apply to all requests

// Serve Favicon
app.use(favicon('favicon.ico'));

// Port
const port = 4001;

app.get("/", (req, res) => {
  res.json({
    message: "Hello! How are you?",
  });
});

// Listen
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});