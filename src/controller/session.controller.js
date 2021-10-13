"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSessionHandler = exports.invalidateUserSessionHandler = exports.createUserSessionHandler = void 0;
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
const default_1 = __importDefault(require("../../config/default"));
const jwt_utils_1 = require("../utils/jwt.utils");
const lodash_1 = require("lodash");
const mongodb_1 = require("mongodb");
async function createUserSessionHandler(req, res) {
    //Validate the email and password
    const user = await (0, user_service_1.validatePassword)(req.body);
    if (!user) {
        return res.status(401).send("invalid username or password");
    }
    //Create a session
    const session = await (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
    //Create access token
    const accessToken = (0, session_service_1.createAccessToken)({
        user,
        session,
    });
    //Create refresh token
    const refreshToken = (0, jwt_utils_1.sign)(session, {
        expiresIn: default_1.default["refreshTokenTtl"],
    });
    // Send refresh & access token back
    return res.send({ accessToken, refreshToken });
}
exports.createUserSessionHandler = createUserSessionHandler;
async function invalidateUserSessionHandler(req, res) {
    const sessionId = (0, lodash_1.get)(req, "user.session");
    await (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
    return res.sendStatus(200);
}
exports.invalidateUserSessionHandler = invalidateUserSessionHandler;
async function getUserSessionHandler(req, res) {
    let userId = (0, lodash_1.get)(req, "user._id");
    userId = new mongodb_1.ObjectId(userId);
    const sessions = await (0, session_service_1.findSessions)({ user: userId, valid: true });
    return res.send(sessions);
}
exports.getUserSessionHandler = getUserSessionHandler;
//export async function getUserSessionsHandler(req: Request, res: Response) {
//   const userId = get(req, "user._id");
//
//   const sessions = await findSessions({ user: userId, valid: true });
//
//   return res.send(sessions);
//# sourceMappingURL=session.controller.js.map