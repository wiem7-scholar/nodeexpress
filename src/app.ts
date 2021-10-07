import express from "express";
import config from "../config/default";
import log from "./logger";
import  connect from "./db/connect";
import routes from "./routes";
import {deserializeUser } from "./middleware";

const port = config["port"] as number;
const host = config["host"] as string;

const app = express();
app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

app.listen(port, host,()=>{
    log.info(`Server listening at http://${host}:${port}`);
    const cnx = connect();
    routes(app);
});
