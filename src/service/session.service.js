"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSessions = exports.updateSession = exports.reIssueAccessToken = exports.createAccessToken = exports.createSession = void 0;
const session_model_1 = __importDefault(require("../model/session.model"));
const default_1 = __importDefault(require("../../config/default"));
const jwt_utils_1 = require("../utils/jwt.utils");
const lodash_1 = require("lodash");
const user_service_1 = require("./user.service");
async function createSession(userId, userAgent) {
    const session = await session_model_1.default.create({ user: userId, userAgent });
    return session.toJSON();
}
exports.createSession = createSession;
async function createAccessToken({ user, session, }) {
    // Build and return the new access token
    const accessToken = await (0, jwt_utils_1.sign)(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: default_1.default["accessTokenTtl"] } // 15 minutes
    );
    return accessToken;
}
exports.createAccessToken = createAccessToken;
async function reIssueAccessToken({ refreshToken, }) {
    //decode the refresh token
    const { decoded } = await (0, jwt_utils_1.decode)(refreshToken);
    if (!decoded || !(0, lodash_1.get)(decoded, "_id"))
        return false;
    //get the session
    const session = await session_model_1.default.findById((0, lodash_1.get)(decoded, "_id"));
    //make sure the session is still valid
    if (!session || !(session === null || session === void 0 ? void 0 : session.valid))
        return false;
    const user = await (0, user_service_1.findUser)({ _id: session.user });
    if (!user)
        return false;
    const accessToken = createAccessToken({ user, session });
    return accessToken;
}
exports.reIssueAccessToken = reIssueAccessToken;
async function updateSession(query, update) {
    return session_model_1.default.updateOne(query, update);
}
exports.updateSession = updateSession;
async function findSessions(query) {
    return session_model_1.default.find(query).lean();
}
exports.findSessions = findSessions;
//# sourceMappingURL=session.service.js.map