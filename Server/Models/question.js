"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const QuestionSchema = new Schema({
    questionText: String,
    questionType: String,
    survey_id: String,
    first_Choice: String,
    second_Choice: String,
    third_Choice: String,
    fourth_Choice: String,
    created: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "question"
});
const Model = mongoose_1.default.model("QuestionList", QuestionSchema);
exports.default = Model;
//# sourceMappingURL=question.js.map