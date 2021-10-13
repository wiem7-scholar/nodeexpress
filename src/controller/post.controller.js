"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostHandler = exports.getPostHandler = exports.updatePostHandler = exports.createPostHandler = void 0;
const lodash_1 = require("lodash");
const post_service_1 = require("../service/post.service");
async function createPostHandler(req, res) {
    const userId = (0, lodash_1.get)(req, "user._id");
    const body = req.body;
    const post = await (0, post_service_1.createPost)(Object.assign(Object.assign({}, body), { user: userId }));
    return res.send(post);
}
exports.createPostHandler = createPostHandler;
async function updatePostHandler(req, res) {
    const userId = (0, lodash_1.get)(req, "user._id");
    const postId = (0, lodash_1.get)(req, "params.postId");
    const update = req.body;
    const post = await (0, post_service_1.findPost)({ postId });
    if (!post) {
        return res.sendStatus(404);
    }
    if (String(post.user) !== userId) {
        return res.sendStatus(401);
    }
    const updatedPost = await (0, post_service_1.findAndUpdate)({ postId }, update, { new: true });
    return res.send(updatedPost);
}
exports.updatePostHandler = updatePostHandler;
async function getPostHandler(req, res) {
    const postId = (0, lodash_1.get)(req, "params.postId");
    const post = await (0, post_service_1.findPost)({ postId });
    if (!post) {
        return res.sendStatus(404);
    }
    return res.send(post);
}
exports.getPostHandler = getPostHandler;
async function deletePostHandler(req, res) {
    const userId = (0, lodash_1.get)(req, "user._id");
    const postId = (0, lodash_1.get)(req, "params.postId");
    const post = await (0, post_service_1.findPost)({ postId });
    if (!post) {
        return res.sendStatus(404);
    }
    if (String(post.user) !== String(userId)) {
        return res.sendStatus(401);
    }
    await (0, post_service_1.deletePost)({ postId });
    return res.sendStatus(200);
}
exports.deletePostHandler = deletePostHandler;
//# sourceMappingURL=post.controller.js.map