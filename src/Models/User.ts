import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  age: number;
}

const UserSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, 
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

mongoose.models={}

const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
