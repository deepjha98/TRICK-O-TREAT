require("dotenv").config();
const express = require("express"),
  connect = require("./config/database"),
  bodyparser = require("body-parser");
///////////////////////////////////////////////////
const app = express();
connect();
app.use(bodyparser.json());
//-----PAGES ROUTES AND MODELS-------
var UserRoutes = require("./routes/userRoutes");
//-----------------------------------

app.use(UserRoutes);

//////////////////////////////////////////////
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log("SERVER HAS STARTED...");
});
