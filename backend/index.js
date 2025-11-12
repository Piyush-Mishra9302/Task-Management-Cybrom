const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const adminRoute = require("./routes/adminRoutes")

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "https://task-management-cybrom-2.onrender.com", // your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // only if you’re using cookies or auth headers
  })
);

 app.options(/.*/, cors());

//DB connection
mongoose.connect(process.env.DBCONN).then(() => {
    console.log("DB SUccessfully connected");
})

//body-parser middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.use("/admin", adminRoute);



app.listen(port, () => {
    console.log(`app is listening at ${port} port`);
})