import express from "express";
import expressLayouts from "express-ejs-layouts";
import { Application } from "express";
const configViewEngine = (app: Application) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    app.use(expressLayouts);
    app.set('layout', 'layout');
};
export default configViewEngine;
