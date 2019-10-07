import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    match: /^[a-z]+$/i
  },
  lastName: {
    type: String,
    match: /^[a-z]+$/i
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  passwordHash: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ["MASTER", "USER", "MANAGER"],
    required: true
  }
});

const User = model("User", userSchema);

export default User;
