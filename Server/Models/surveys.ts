import mongoose from "mongoose";
const Schema = mongoose.Schema; // alias for mongoose Schema

const SurveySchema = new Schema
({
    title: String,
    author: String,
    created: 
    {
        type: Date,
        default: Date.now()
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "survey"
});

const Model = mongoose.model("SurveyList", SurveySchema);

export default Model;