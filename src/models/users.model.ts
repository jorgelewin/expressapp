import { Document, Schema, model } from "mongoose";

interface User extends Document {

    idUser: number;
    name: string;
    email: string

}

const userSchema = new Schema<User>({

    idUser: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
});

const UserModel = model<User>('User', userSchema);

export default UserModel;