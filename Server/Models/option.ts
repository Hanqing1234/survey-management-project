import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema; // alias for mongoose Schema

const OptionSchema = new Schema
({   
    optionText: String,
    survey_id: String,
    
    created: 
    {
        type: String,
        default: moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    }
},
{
    collection: "option"
});

const Model = mongoose.model("OptionList", OptionSchema);


export default Model;