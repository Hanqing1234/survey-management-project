"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeleteSurveyPage = exports.ProcessAddSurveyPage = exports.DisplayAddSurveyPage = exports.DisplaySurveyListPage = void 0;
const surveys_1 = __importDefault(require("../Models/surveys"));
const question_1 = __importDefault(require("../Models/question"));
function DisplaySurveyListPage(req, res, next) {
    if (!req.user) {
        surveys_1.default.find((err, surveyCollection) => {
            res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, displayName: req.user });
        });
    }
    ;
    surveys_1.default.find({ user_id: req.user.id }, {}, {}, (err, surveyCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, displayName: req.user ? req.user.displayName : '' });
    });
}
exports.DisplaySurveyListPage = DisplaySurveyListPage;
function DisplayAddSurveyPage(req, res, next) {
    res.render('index', { title: 'Add Survey', page: 'update-survey', list: '' });
}
exports.DisplayAddSurveyPage = DisplayAddSurveyPage;
function ProcessAddSurveyPage(req, res, next) {
    let newSurvey = new surveys_1.default({
        "title": req.body.name,
        "author": req.body.author,
        "user_id": req.user.id
    });
    console.log(newSurvey);
    surveys_1.default.create(newSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    });
    res.redirect('/date');
}
exports.ProcessAddSurveyPage = ProcessAddSurveyPage;
function ProcessDeleteSurveyPage(req, res, next) {
    let id = req.params.id;
    question_1.default.deleteMany({ survey_id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    });
    surveys_1.default.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-list');
    });
}
exports.ProcessDeleteSurveyPage = ProcessDeleteSurveyPage;
//# sourceMappingURL=survey.js.map