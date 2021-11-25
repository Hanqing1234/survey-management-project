"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const Schema = mongoose_1.default.Schema;
const OptionSchema = new Schema({
    optionText: String,
    survey_id: String,
    created: {
        type: String,
        default: (0, moment_1.default)(new Date(Date.now())).format('YYYY-MM-DD HH:mm:ss')
    }
}, {
    collection: "option"
});
const Model = mongoose_1.default.model("OptionList", OptionSchema);
exports.default = Model;
//# sourceMappingURL=option.js.map