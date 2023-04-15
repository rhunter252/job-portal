const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

const authRoutes = require("./routes/authRoutes");

// port
const port = process.env.PORT || 8000;

// database connection
mongoose
  .connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo"))
  .catch((err) => console.log(err));

// middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb" }));
app.use(cookieParser());
app.use(cors());

// error middleware
app.use(errorHandler);

// routes middleware
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
