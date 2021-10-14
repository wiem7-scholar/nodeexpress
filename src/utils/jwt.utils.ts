import jwt from "jsonwebtoken";
import config from "../../config/default";
import {reject} from "lodash";
import log from "../logger/index";


const privateKey = config["privateKey"] as string;


//export function sign(object:Object): Promise<{object:any, privateKey: string, options?: jwt.SignOptions | undefined}> {
 //   return new Promise((resolve, reject) => {

  //      jwt.sign(object) =>{

 //       });
 //   });
//}
export function sign( object: Object, options?: jwt.SignOptions | undefined): Promise<string |undefined> {
    return new Promise((resolve, reject)=>{
        jwt.sign(object, privateKey,options, (err, signed) =>{
            if(err){
                reject(err);
            }
            resolve(signed);// what is it supposed to promise ?
        });
    })

}

          export function decode(token: string): Promise<{valid: boolean, expired: boolean, decoded: any}> {
              return new Promise((resolve, reject) => {
                  jwt.verify(token, privateKey, null, (err, decoded) => {
                      if (err) {
                          reject(err);
                          return;
                      }

                      resolve({valid :true, expired: false, decoded: decoded})
                      return;
                  });
              })
          }

