const express = require("express");
const path = require('path');

const app = express();
app.use(express.static("public"));

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running on http://localhost:3000/"));
