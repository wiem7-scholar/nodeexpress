"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const jwt_utils_1 = require("../utils/jwt.utils");
const session_service_1 = require("../service/session.service");
const deserializeUser = async (req, res, next) => {
    try {
        console.log("deserialize222");
        const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
        const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
        if (!accessToken)
            return next();
        const { decoded, expired } = await (0, jwt_utils_1.decode)(accessToken);
        if (decoded) {
            // @ts-ignore
            req.user = decoded;
            return next();
        }
        if (expired && refreshToken) {
            const newAccessToken = await (0, session_service_1.reIssueAccessToken)({ refreshToken });
            if (newAccessToken) {
                // add the access token to the header
                res.setHeader("x-access-token", newAccessToken);
                const { decoded } = await (0, jwt_utils_1.decode)(newAccessToken);
                // @ts-ignore
                req.user = decoded;
            }
            return next();
        }
        return next();
    }
    catch (e) {
        console.error(e);
        return res.status(403).send(e);
    }
};
exports.default = deserializeUser;
//# sourceMappingURL=deserializeUser.js.map