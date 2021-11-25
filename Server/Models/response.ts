import mongoose from "mongoose";
import moment from "moment";
import question from "./question";
const Schema = mongoose.Schema; // alias for mongoose Schema

const ResponseSchema = new Schema
({   
    survey_ID: 
    { 
        type: Schema.Types.ObjectId, 
        ref: "SurveyList"
    },

    question_ID: 
    { 
        type: Schema.Types.ObjectId, 
        ref: "questionList"
    },

    option_ID: 
    { 
        type: Schema.Types.ObjectId, 
        ref: "optionList"
    },

    response_value: String

},
{
    collection: "response"
});

const Model = mongoose.model("ResponseList", ResponseSchema);


export default Model;