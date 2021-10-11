"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const default_1 = require("../../config/default");
const logger_1 = require("../logger");
function connect() {
    const dbUri = default_1.default["dbUri"];
    return mongoose_1.default
        .connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
        logger_1.default.info("Database connected");
    })
        .catch((error) => {
        logger_1.default.error("db error", error);
        process.exit(1);
    });
}
exports.default = connect;
//# sourceMappingURL=connect.js.map