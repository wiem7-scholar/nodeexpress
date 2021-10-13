"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const default_1 = __importDefault(require("../../config/default"));
const privateKey = default_1.default["privateKey"];
async function sign(object, options) {
    return jsonwebtoken_1.default.sign(object, privateKey, options);
}
exports.sign = sign;
//export function sign(object:Object): Promise<{object:any, privateKey: string, options?: jwt.SignOptions | undefined}> {
//   return new Promise((resolve, reject) => {
//      jwt.sign(object, privateKey, null,( err, encoded) =>{
//       });
//   });
//}
function decode(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, privateKey, null, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({ valid: true, expired: false, decoded: decoded });
            return;
        });
    });
}
exports.decode = decode;
//# sourceMappingURL=jwt.utils.js.map