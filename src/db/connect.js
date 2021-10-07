"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var default_1 = __importDefault(require("../../config/default"));
var logger_1 = __importDefault(require("../logger"));
function connect() {
    var dbUri = default_1.default["dbUri"];
    return mongoose_1.default
        .connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(function () {
        logger_1.default.info("Database connected");
    })
        .catch(function (error) {
        logger_1.default.error("db error", error);
        process.exit(1);
    });
}
exports.default = connect;
