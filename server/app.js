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
const cors = require("cors");
const { auth, users, profile, files } = require("./routes");
const { last_seen } = require("./middlewares");

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);
app.use(expressStaticGzipMiddleware);

mongoose
  .connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(last_seen);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profiles", profile);
app.use("/api/files", files);

app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
