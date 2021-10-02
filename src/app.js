"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("config"));
// import log from "./logger";
// import connect from "./db/connect";
// import routes from "./routes";
// import { deserializeUser } from "./middleware";
var port = config_1.default.get("port");
var host = config_1.default.get("host");
var app = (0, express_1.default)();
// app.use(deserializeUser);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, host, function () {
    console.log("Server listing at http://" + host + ":" + port);
    // connect();
    //
    // routes(app);
});
