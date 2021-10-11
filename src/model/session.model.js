"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
}, { timestamps: true });
const Session = mongoose_1.default.model("Session", SessionSchema);
exports.default = Session;
//# sourceMappingURL=session.model.js.map