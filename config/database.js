const mongoose = require("mongoose");
//////////////////////////////////////////
//CONNECTING TO ONLINE DATABASE
//=======================================
const connect = () =>
  mongoose
    .connect(process.env.URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DATABASE CONNECTED..."))
    .catch((err) => console.log(err));
//=======================================
//////////////////////////////////////////
module.exports = connect;
