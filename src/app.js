"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const default_1 = __importDefault(require("../config/default"));
const logger_1 = __importDefault(require("./logger"));
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = require("./middleware");
const port = default_1.default["port"];
const host = default_1.default["host"];
const app = (0, express_1.default)();
app.use(middleware_1.deserializeUser);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.listen(port, host, () => {
    logger_1.default.info(`Server listening at http://${host}:${port}`);
    const cnx = (0, connect_1.default)();
    (0, routes_1.default)(app);
});
//# sourceMappingURL=app.js.map