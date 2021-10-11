"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(400).send(e);
    }
};
exports.default = validate;
//# sourceMappingURL=validateRequest.js.map