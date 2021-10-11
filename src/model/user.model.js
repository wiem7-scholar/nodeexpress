"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose"); // mongoose is an Object Data Modeling lib for MongoDB
const bcrypt_1 = require("bcrypt"); // we are storing hashes of passwords not plain text
const default_1 = require("../../config/default");
//create a mongoose schema where we
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });
// get a user password in hash
UserSchema.pre("save", async function (next) {
    let user = this;
    //only hash the password  if it is modified or new
    if (!user.isModified("password"))
        return next();
    //salt and hash random additional data
    const salt = await bcrypt_1.default.genSalt(default_1.default["saltWorkFactor"]); //adds a random number to the password hash
    const hash = bcrypt_1.default.hashSync(user.password, salt);
    // replace password with hash
    user.password = hash;
    return next();
});
// comparePassword method used for logging in
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    return bcrypt_1.default.compare(candidatePassword, user.password).catch((e) => false);
};
const User = mongoose_1.default.model("User", UserSchema); // if we dont pass the interface UserDocument , we get an empty schema
exports.default = User;
//# sourceMappingURL=user.model.js.map