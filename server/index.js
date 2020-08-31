const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT, mongoURI } = require("./constants");
const { signIn, signUp } = require("./routes");
const app = express();

mongoose
  .connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use("/api/signin", signIn);
app.use("/api/signup", signUp);

app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
