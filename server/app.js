const express = require("express");
const app = express();
const { PORT, mongoURI } = require("./constants");
const {
  webpackHotMiddleware,
  webpackDevMiddleware,
  expressStaticGzipMiddleware,
} = require("./middlewares");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { signIn, users } = require("./routes");

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);
app.use(expressStaticGzipMiddleware);

mongoose
  .connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use("/api/signin", signIn);
app.use("/api/users", users);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});