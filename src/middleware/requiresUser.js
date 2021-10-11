"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const requiresUser = async (req, res, next) => {
    const user = (0, lodash_1.get)(req, "user");
    console.log(user);
    if (!user) {
        return res.sendStatus(403);
    }
    return next();
};
exports.default = requiresUser;
//# sourceMappingURL=requiresUser.js.map