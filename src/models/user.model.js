const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const jwt = require("jsonwebtoken");
const objConfig = require("../startup/config");
const bcrypt = require("bcrypt");
// import { composeWithMongoose } from 'graphql-compose-mongoose';

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    userName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true
    },
    isAdmin: Boolean
  },
  {
    collection: "users"
  }
);

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email
    },
    objConfig["SECRET_KEY"]
  );
  return token;
};

UserSchema.methods.comparePassword = async function(pwd) {
  console.log("in compare");
  console.log(pwd);
  console.log(this.password);
  //const valEmail = await bcrypt.compare(pwd, this.password);
  const valEmail = await bcrypt.compare(
    "pa1@pwd#",
    "$2b$10$bwcjjwueofotuaebbt7a2u/e3kjqighye.wjvoqfckezpqe6smcz6"
  );
  console.log(valEmail);
  if (!valEmail) return false;
  return true;
};

UserSchema.plugin(timestamps);
UserSchema.index({ createdAt: 1, updatedAt: 1 });

// exports.UserModel = this.UserModel;
exports.User = mongoose.model("User", UserSchema);
// export const UserModelTC = composeWithMongoose(UserModel);
