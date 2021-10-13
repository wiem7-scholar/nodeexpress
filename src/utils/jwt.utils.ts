import jwt from "jsonwebtoken";
import config from "../../config/default";
import {reject} from "lodash";



const privateKey = config["privateKey"] as string;

export async function sign( object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, options);
}
//export function sign(object:Object): Promise<{object:any, privateKey: string, options?: jwt.SignOptions | undefined}> {
 //   return new Promise((resolve, reject) => {

  //      jwt.sign(object, privateKey, null,( err, encoded) =>{

 //       });
 //   });
//}




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

