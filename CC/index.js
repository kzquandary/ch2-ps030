var express = require("express");
var app = express();
var routes = require("./Routes"); 
const bodyParser = require("body-parser");
const { Limiter } = require("./Middleware/Limiter");
require("dotenv").config();
const PORT = 8080;

app.use(bodyParser.json());
app.use(Limiter);
app.use(routes);
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.timeout = 60000;
