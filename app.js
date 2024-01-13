const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const contactsRouter = require("./routes/contacts");
const authRouter = require("./routes/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
// app.use(cors());
// const corsOption = {
//   credentials: true,
//   origin: [
//     "https://jazzy-smakager-bb31ad.netlify.app/users/current",
//     "https://jazzy-smakager-bb31ad.netlify.app/",
//     "https://vernihoraivan.github.io",
//     "http:/localhost:3000/",
//   ],
// };
// const corsOptions = {
//   origin: [
//     "http://localhost:3000/",
//     "https://vernihoraivan.github.io/MyPhonebook/",
//   ],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Origin, X-Requested-With, Content-Type, Accept"
//   // );
//   next();
// });
const corsOptions = {
  origin: "https://vernihoraivan.github.io/MyPhonebook/",
  optionsSuccessStatus: 200,
};
// app.use(cors(corsOption));
app.use(express.json());
app.use(express.static("public"));

app.use("/contacts", contactsRouter);
app.use("/users", cors(corsOptions), authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
