//THIS IS STEP 6. ONCE YOU HAVE THE ROUTING DONE YOU MAKE THE SERVER.JS FILE. HERE YOU BRING IN THE DEPENDENCIES, THE MIDDLEWARE.
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const routes = require('./routes');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//BECAUSE WE ARE IN DEVELOPMENT, WE ARE RUNNING ON 2 SERVERS. HERE THIS SAYS IF ITS IN PRODUCTION, BUILD OUT WHAT'S IN THE CLIENT FOLDER AND USE.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//GRAB ALL TEH ROUTES IVE IMPORTED AND SET THEM UP
app.use(routes);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//THIS IS TO TURN ON MONGOOSE
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooksmern", {useNewUrlParser: true});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
