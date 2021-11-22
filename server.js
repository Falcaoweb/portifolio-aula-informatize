const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

app.use("/assets",express.static(path.join(__dirname, "assests")));

app.get("*", function (req, res) {
  const page = req.params[0].substr(1) || 'index';
  const file = path.join(__dirname, "public", `${page}.html`);
  res.sendFile(file);
});
app.listen(port);
