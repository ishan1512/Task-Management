import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        fullName:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
            minLength:6,
        },
        profilePic:{
            type:String,
            default:""
        }  
    },
    {
        timestamps:true
    }
)

//pre save hhook to hash pw before saving to db
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password= await bcrypt.hash(this.password,salt);
        next();
    } catch (error) {
        next(error);
    }
})

//to compare user entered pw with pw in db
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;