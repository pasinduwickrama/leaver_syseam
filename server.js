const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const leaveRoute = require("./routes/leaverRoute");

const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);




app.use("/api/users", userRoute);
app.use("/api/leaves", leaveRoute);



app.get("/", (req, res) => {
  res.send("Home Page");
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
