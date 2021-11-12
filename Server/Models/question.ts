import mongoose from "mongoose";
const Schema = mongoose.Schema; // alias for mongoose Schema

const QuestionSchema = new Schema
({
    questionText: String,
    questionType: String,
    survey_id: String,
    first_Choice: String,
    second_Choice: String,
    third_Choice: String,
    fourth_Choice: String,
    option_Text: String,
    
    created: 
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "question"
});

const Model = mongoose.model("QuestionList", QuestionSchema);

export default Model;