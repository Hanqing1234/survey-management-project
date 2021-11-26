"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ResponseSchema = new Schema({
    survey_id: String,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String,
    question: {
        option: Array
    }
}, {
    collection: "response"
});
const Model = mongoose_1.default.model("ResponseList", ResponseSchema);
exports.default = Model;
//# sourceMappingURL=response.js.map