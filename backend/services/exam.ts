import { Exam } from "../../api-types/exam";
import DB from "./db";

const examSchema = new DB.Schema<Exam>({
     
     _id: String,
     name: String,
     created_at: Date,
     updated_at: Date,
     created_by: String,
     classes: [String],
     max_time: String,
     domande: { type: [{ question: String, options: [String], answer: String }], default: [] },
});

const ExamModel = DB.model("exam", examSchema);

//get all exams
export const index = async () => {
    return ExamModel.find({});
};


// prendo un esame per id
export const view = async (_id: string) => {
    return ExamModel.findById(_id);
};

//take exam by class
export const getExamByClass = async ( className : string ) => {
    return await ExamModel.find( {classes : className });
};

//prendo gli esami creati da un singolo docente
/* export const  getExamByTeacher = (){}; */

//add exam
export const add = async (exam : Exam) => {
    const examData = new ExamModel( exam);
    return examData.save();
};

export const edit = async (_id: string, exam : Exam) => {
    const ExamDocument = await ExamModel.findById(_id);

    if(!ExamDocument){
        throw new Error(`Can't find exam by id: ${exam._id}`)
    }

    ExamDocument.set(exam);
    return ExamDocument.save();
}

export const remove = async (_id: string) => {
    return ExamModel.deleteOne({ _id : _id});
};

