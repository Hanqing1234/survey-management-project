"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplaySurveyListPage = exports.DisplayHomePage = void 0;
const surveys_1 = __importDefault(require("../Models/surveys"));
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}
exports.DisplayHomePage = DisplayHomePage;
function DisplaySurveyListPage(req, res, next) {
    surveys_1.default.find((err, surveyCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection });
    });
}
exports.DisplaySurveyListPage = DisplaySurveyListPage;
//# sourceMappingURL=index.js.map