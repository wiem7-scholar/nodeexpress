import jwt from "jsonwebtoken";
import config from "../../config/default";



const privateKey = config["privateKey"] as string;

export function sign( object: any, options: any){
    return jwt.sign(object, privateKey, options);
}

export function decode(token: string){
    try{
        const decoded = jwt.verify(token, privateKey);
         return {valid :true, expired: false, decoded};
    }catch(error:any){
        console.log({error});
        return{
            valid:false,
            expired: error.message==="jwt expired",
            decoded:null,
        };
    }
}