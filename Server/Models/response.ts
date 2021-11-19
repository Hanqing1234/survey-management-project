import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema; // alias for mongoose Schema

const ResponseSchema = new Schema
({   
    responseText: String,
    survey_id: String,
    
    created: 
    {
        type: String,
        default: moment(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    }
},
{
    collection: "response"
});

const Model = mongoose.model("ResponseList", ResponseSchema);

export default Model;