"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./controller/user.controller");
const session_controller_1 = require("./controller/session.controller");
const middleware_1 = require("./middleware");
const user_schema_1 = require("./schema/user.schema");
const post_controller_1 = require("./controller/post.controller");
const post_schema_1 = require("./schema/post.schema");
function default_1(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    // user registration because rest performs crud operations n uses http methods we create
    //post/api/user
    //we build the handler for this route
    app.post("/api/users", (0, middleware_1.validateRequest)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    // route to login
    // POST/api/sessions
    app.post("/api/sessions", (0, middleware_1.validateRequest)(user_schema_1.createUserSessionSchema), session_controller_1.createUserSessionHandler);
    // get user s sessions
    // GET/api/sessions
    app.get("/api/sessions", middleware_1.requiresUser, session_controller_1.getUserSessionHandler);
    // logout
    // DELETE/api/sessions
    app.delete("/api/sessions", middleware_1.requiresUser, session_controller_1.invalidateUserSessionHandler);
    //create a post
    app.post("/api/posts", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.createPostSchema), post_controller_1.createPostHandler]);
    //update a post
    app.put("/api/posts/:postId", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.updatePostSchema)], post_controller_1.updatePostHandler);
    //GET  /api/posts  /api/posts/:postId
    app.get("/api/posts/:postId", post_controller_1.getPostHandler);
    //delete a post
    app.delete("/api/posts/:postId", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.deletePostSchema)], post_controller_1.deletePostHandler);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map