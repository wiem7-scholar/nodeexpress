"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var default_1 = __importDefault(require("../config/default"));
var logger_1 = __importDefault(require("./logger"));
var connect_1 = __importDefault(require("./db/connect"));
var routes_1 = __importDefault(require("./routes"));
var middleware_1 = require("./middleware");
var port = default_1.default["port"];
var host = default_1.default["host"];
var app = (0, express_1.default)();
app.use(middleware_1.deserializeUser);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, host, function () {
    logger_1.default.info("Server listening at http://" + host + ":" + port);
    var cnx = (0, connect_1.default)();
    (0, routes_1.default)(app);
});
