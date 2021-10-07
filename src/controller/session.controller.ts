import { validatePassword } from "../service/user.service";
import { Request, Response } from "express";
import { createSession, createAccessToken ,updateSession, findSessions} from '../service/session.service';
import config from "../../config/default";
import {sign } from "../utils/jwt.utils";
import {get} from "lodash";

export async function createUserSessionHandler(req: Request, res: Response) {

    //Validate the email and password
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("invalid username or password");
    }

    //Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");
    //Create access token
    const accessToken = createAccessToken({
        user,
        session,
    });

    //Create refresh token
    const refreshToken = sign(session,{
    expiresIn: config["refreshTokenTtl"],});

    // Send refresh & access token back
    return res.send({accessToken, refreshToken});

}

export async function invalidateUserSessionHandler(req: Request, res: Response){
const  sessionId = get(req, "user.session");
await updateSession({_id: sessionId}, {valid: false});
return res.sendStatus(200);
}

export async function getUserSessionHandler(req:Request,res:Response){
    const userId= get(req, "user.id");
    const sessions= await findSessions({user: userId, valid: true});
    return res.send(sessions);
}