import {Express,Request,Response }from "express";
import {createUserHandler} from "./controller/user.controller";
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionHandler} from "./controller/session.controller";
import {validateRequest, requiresUser} from './middleware';
import {createUserSchema, createUserSessionSchema} from './schema/user.schema';

export default function (app:Express){
 app.get("/healthcheck",(req:Request, res:Response) => res.sendStatus(200));

 // user registration because rest performs crud operations n uses http methods we create
 //post/api/user
 //we build the handler for this route
app.post("/api/users",validateRequest(createUserSchema), createUserHandler);


 // route to login
 // POST/api/sessions
app.post("/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler);


 // get user s sessions
 // GET/api/sessions

app.get("/api/sessions", requiresUser, getUserSessionHandler);


 // logout
 // DELETE/api/sessions
app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

 //GET  /api/posts  /api/posts/postId

}