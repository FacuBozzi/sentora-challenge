import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
app.use(cors());
app.use("/api", routes);

const PORT = 4000;
app.listen(PORT, () => console.log("API on :%d", PORT));
