import mongoose from "mongoose";
import moment from "moment";
import question from "./question";
const Schema = mongoose.Schema; // alias for mongoose Schema

const ResponseSchema = new Schema
({   
    survey_id: String,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String,
    question: 
    {
        option: Array
    } 
},
{
    collection: "response"
});

const Model = mongoose.model("ResponseList", ResponseSchema);


export default Model;