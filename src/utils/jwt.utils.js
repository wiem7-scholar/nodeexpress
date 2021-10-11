"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.sign = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const default_1 = require("../../config/default");
const privateKey = default_1.default["privateKey"];
function sign(object, options) {
    return jsonwebtoken_1.default.sign(object, privateKey, options);
}
exports.sign = sign;
function decode(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, privateKey);
        return { valid: true, expired: false, decoded };
    }
    catch (error) {
        console.log({ error });
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
}
exports.decode = decode;
//# sourceMappingURL=jwt.utils.js.map