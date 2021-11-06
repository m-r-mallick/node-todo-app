const express = require("express");
const server = express();
const { tasks } = require("./routes/tasks");
const { connectDB } = require("./db/connect");
const notFound = require("./middlewares/not-found");
const { errHandler } = require("./middlewares/error-handler");
require("dotenv").config();

server.use(express.json());

server.use("/api/v1/tasks", tasks);

server.use(notFound);
server.use(errHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      server.listen(PORT, () => {
         console.log(`Server listening on port ${PORT}...`);
      });
   } catch (error) {
      console.log(`Error - `, error);
   }
};

start();
