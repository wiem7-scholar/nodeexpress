"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("./controller/user.controller");
var validateRequest_1 = __importDefault(require("./middleware/validateRequest"));
var user_schema_1 = require("./schema/user.schema");
function default_1(app) {
    app.get("/healthcheck", function (req, res) { return res.sendStatus(200); });
    // user registration because rest performs crud operations n uses http methods we create
    //post/api/user
    //we built´d the handler for this route
    app.post("/api/users", (0, validateRequest_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    // route to login
    // POST/api/sessions
    // get user s sessions
    // GET/api/sessions
    // logout
    // DELETE/api/sessions
    //GET  /api/posts  /api/posts/postId
}
exports.default = default_1;
