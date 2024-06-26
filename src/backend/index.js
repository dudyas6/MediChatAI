const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3001; // Choose a port number


// Server uses
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routes
const authsRoute = require("./routes/auth");
const contactRoute = require("./routes/contact");

// // App Uses
app.use("/api/auth", authsRoute);
app.use("/api/contact", contactRoute);

const MONGODB_URI =
  "mongodb+srv://root:root@medichatdb.ut4vxly.mongodb.net/MediChatDB";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

