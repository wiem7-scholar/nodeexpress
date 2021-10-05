import User, {UserDocument} from '../model/user.model'
import {DocumentDefinition, Error} from "mongoose";
import {string} from "yup";

export async function createUser(input: DocumentDefinition<UserDocument>){
try {
    return await User.create(input);
}catch(error:any){
    throw new Error(error);
}
}
function findUser(){

}