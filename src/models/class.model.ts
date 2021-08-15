import { Document, Schema, model } from "mongoose";

interface Class extends Document {

    number: number;
    date: Date;
    presents: [number]

}

const classSchema = new Schema<Class>({

    number: { type: Number, required: true },
    date: { type: Date, required: true },
    presents: { type: [Number], required: true }

});

const ClassModel = model<Class>("Class", classSchema);

export default ClassModel;