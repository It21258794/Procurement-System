import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    fname: {
      type: String,
      require: true,
    },
    lname: {
      type: String,
      require: true,
    },
    mobile: {
      type: Number,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
    profileImage: {
      type: String, // Store the path to the image file on your server
    },
  },
  { timestamps: true },
);

const Account = mongoose.model('Account', AccountSchema);
export default Account;
