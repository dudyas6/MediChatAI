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
const usersRoute = require("./routes/users");

// // App Uses
app.use("/users", usersRoute);

const MONGODB_URI =
  "mongodb+srv://root:root@medichatdb.ut4vxly.mongodb.net/MediChatDB";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

