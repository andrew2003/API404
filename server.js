require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const { initSimple404APIRoutes } = require("./routes/Simple404API");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setTimeout(1000 * 45, () => {
    res.status(200).json(helper.APIReturn(1, "timeout"));
  });
  next();
});

//config routes
initSimple404APIRoutes(app);

app.listen(port);
console.log("API started on port " + port);
