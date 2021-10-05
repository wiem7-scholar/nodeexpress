import mongoose from "mongoose";// mongoose is an Object Data Modeling lib for MongoDB
import bcrypt from "bcrypt";// we are storing hashes of passwords not plain text
import config from "config";

//create interface for user
export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}


//create a mongoose schema where we
const UserSchema = new mongoose.Schema({
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: {type: String, required: true},
    },
    {timestamps: true}
);



// get a user password in hash
UserSchema.pre("save", async function (next: mongoose.HookNextFunction){ //middleware function//If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging
    let user = this as UserDocument ;
    //only hash the password  if it is modified or new
    if(!user.isModified("password")) return next();
    //salt and hash
    const salt =await bcrypt.genSalt(config.get("saltWorkFactor"));//adds a random number to the password hash
    const hash= await bcrypt.hashSync(user.password, salt);
    // replace password with hash
    user.password = hash;

    return next();
});





// comparePassword method
UserSchema.methods.comparePassword = async function(
    candidatePassword:string
){
    const user = this as UserDocument ;
    return bcrypt.compare(candidatePassword, user.password).catch((e)=>false);
};





const User = mongoose.model<UserDocument>("User",UserSchema);// if we dont pass the interface UserDocumet , we get an empty schema
export default User;
