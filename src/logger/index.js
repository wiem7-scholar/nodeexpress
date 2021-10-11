"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = require("pino");
const dayjs_1 = require("dayjs");
const log = (0, pino_1.default)({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${(0, dayjs_1.default)().format()}"`,
});
exports.default = log;
//# sourceMappingURL=index.js.map