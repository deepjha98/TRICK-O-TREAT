require("dotenv").config();
const express = require("express"),
  connect = require("./config/database"),
  bodyparser = require("body-parser"),
  cors = require("cors");
///////////////////////////////////////////////////
const app = express();
connect();
app.use(bodyparser.json());

//-----PAGES ROUTES AND MODELS-------
var UserRoutes = require("./routes/userRoutes");
//-----------------------------------

app.use(UserRoutes);

//////////////////////////////////////////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("SERVER HAS STARTED...");
});
