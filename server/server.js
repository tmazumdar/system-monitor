import express from "express";
import cors from "cors";
import api from "./routes/api.js";

// reference:
// https://www.mongodb.com/resources/languages/mern-stack-tutorial

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", api);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});