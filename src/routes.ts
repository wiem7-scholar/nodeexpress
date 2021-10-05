import {Express,Request,Response }from "express";
import {createUserHandler} from "./controller/user.controller";
import validateRequest from './middleware/validateRequest';
import {createUserSchema} from './schema/user.schema';

export default function (app:Express){
 app.get("/healthcheck",(req:Request, res:Response) => res.sendStatus(200));

 // user registration because rest performs crud operations n uses http methods we create
 //post/api/user
 //we built´d the handler for this route
app.post("/api/users",validateRequest(createUserSchema), createUserHandler);


 // route to login
 // POST/api/sessions



 // get user s sessions
 // GET/api/sessions




 // logout
 // DELETE/api/sessions


 //GET  /api/posts  /api/posts/postId

}