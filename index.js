// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const PORT = 3001;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/date", function(req, res){

  const inputDate = req.params.date;

  let date;

  // check if input is not provided and set date to current time
  if (!inputDate){
    date = new Date();
  }

  // check if input is a unix timestamp which is only digit
  else if (/^\d+$/.test(inputDate)){
    date = new Date(parseInt(inputDate));
  }
    // if not, we assume it is a srting
  else
  {
    // check if input date is valid
    if (isNaN(Date.parse(inputDate))){
      res.status(400).json({
        error: "Invalid Date"
      })
    }

    date = new Date(inputDate);
  }

  // convert the date to unix timestamp and utc string
  let unixTimestamp = date.getTime();
  let utcDate = date.toUTCString()

  // return a JSON object with unix timestamp and utc date string
  res.json({
    unix: unixTimestamp,
    utc: utcDate
  })
})

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
app.listen(PORT, function () {
  console.log(`Your app is listening on https://localhost:${PORT}`);
});
