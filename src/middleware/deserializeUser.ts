import {Request, Response, NextFunction} from "express";
import {get} from "lodash";
import {decode} from "../utils/jwt.utils";
import {reIssueAccessToken} from "../service/session.service";


const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction

) => {
 try {
     console.log("deserialize222");
     const accessToken =get(req, "headers.authorization","").replace(
         /^Bearer\s/,
         ""
     );
     const refreshToken = get(req,"headers.x-refresh");
     if (!accessToken) return next();
     const {decoded, expired}= await decode(accessToken);
     if(decoded){
         // @ts-ignore
         req.user = decoded;
         return next();
     }
     if(expired && refreshToken){
         const newAccessToken = await reIssueAccessToken({ refreshToken});
         if(newAccessToken){
             // add the access token to the header
             res.setHeader("x-access-token", newAccessToken);
             const { decoded } = await decode(newAccessToken);
             // @ts-ignore
             req.user =decoded;
         }
         return next();
     }
     return next();
 } catch (e) {
     console.error(e);
     return res.status(403).send(e);
 }

};
export default deserializeUser;