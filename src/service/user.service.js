"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.findUser = exports.createUser = void 0;
const user_model_1 = require("../model/user.model");
const mongoose_1 = require("mongoose");
const lodash_1 = require("lodash");
async function createUser(input) {
    try {
        return await user_model_1.default.create(input);
    }
    catch (e) {
        throw new mongoose_1.Error(e);
    }
}
exports.createUser = createUser;
async function findUser(query) {
    return user_model_1.default.findOne(query).lean();
}
exports.findUser = findUser;
// validate the password
async function validatePassword({ email, password, }) {
    const user = await user_model_1.default.findOne({ email }); //if we add .lean(); we will have no access to comparePassword()
    if (!user) {
        return false;
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return false;
    }
    return (0, lodash_1.omit)(user.toJSON(), "password");
}
exports.validatePassword = validatePassword;
//# sourceMappingURL=user.service.js.map