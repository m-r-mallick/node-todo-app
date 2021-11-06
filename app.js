const express = require("express");
const server = express();
const { tasks } = require("./routes/tasks");
const { connectDB } = require("./db/connect");
require("dotenv").config();

server.use(express.json());

server.use("/api/v1/tasks", tasks);

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      server.listen(5000, () => {
         console.log("Server listening on port 5000...");
      });
   } catch (error) {
      console.log(`Error - `, error);
   }
};

start();
