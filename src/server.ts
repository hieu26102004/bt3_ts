


import express, { Application } from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/configdb";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port : " + port);
});
