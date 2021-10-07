import User, {UserDocument} from '../model/user.model'
import {DocumentDefinition, Error, FilterQuery} from "mongoose";
import {omit} from 'lodash';


export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input);
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();

}
// validate the password
export async function validatePassword(
    {
        email,
        password,
    }: {
        email: UserDocument["email"];
        password: string;
    }){
    const user= await User.findOne({ email });//if we add .lean(); we will have no access to comparePassword()

    if (!user){
        return false;

}
    const isValid = await user.comparePassword(password);
    if(!isValid) {
        return false;
    }
    return omit(user.toJSON(), "password");

}