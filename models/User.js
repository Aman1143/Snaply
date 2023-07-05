import mongoose from "mongoose";
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a name"],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  bio: {
    type: String,
  },
  fblink: {
    type: String,
  },
  ytlink: {
    type: String,
  },
  image: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.methods.getResetPasswordToken=function(){
  const resetToken=crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken=crypto
                          .createHash("sha256")
                          .update(resetToken)
                          .digest("hex");
  this.resetPasswordExpire=Date.now()+15*60*1000;
  return resetToken;
}
const User = new mongoose.model("User", userSchema);
export default User;