import { Document, Schema, model } from "mongoose";


interface Course extends Document {

    title: string;
    description: string;
    studentsNumber: number

}

const courseSchema = new Schema<Course>({

    title: { type: String, required: true },
    description: { type: String, required: true },
    studentsNumber: { type: Number, required: true}

});

const CourseModel = model<Course>("Course", courseSchema);

export default CourseModel;