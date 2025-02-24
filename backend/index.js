const express = require("express");
const mongoose = require("mongoose");
const quizRouter = require("./routes/Questions");
const AuthRoute= require("./routes/AuthRoute")
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser= require("cookie-parser")
dotenv.config()
const app = express();

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use("/api", quizRouter);
app.use("/api", AuthRoute)


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected succesfully");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
