"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessTakeSurveyPage = exports.DisplayTakeSurveyPage = exports.ProcessDeleteSurveyPage = exports.ProcessAddSurveyPage = exports.DisplayAddSurveyPage = exports.DisplaySurveyListPage = void 0;
const surveys_1 = __importDefault(require("../Models/surveys"));
const question_1 = __importDefault(require("../Models/question"));
const response_1 = __importDefault(require("../Models/response"));
const user_1 = require("../Controller/user");
function DisplaySurveyListPage(req, res, next) {
    if (!req.user) {
        surveys_1.default.find((err, surveyCollection) => {
            res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, displayName: '' });
        });
    }
    else {
        if (req.user.username === 'admin') {
            surveys_1.default.find((err, surveyCollection) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, displayName: (0, user_1.UserDisplayName)(req) });
            });
        }
        else {
            surveys_1.default.find({ user_id: req.user.id }, {}, {}, (err, surveyCollection) => {
                if (err) {
                    console.error(err);
                    res.end(err);
                }
                res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, displayName: (0, user_1.UserDisplayName)(req) });
            });
        }
    }
}
exports.DisplaySurveyListPage = DisplaySurveyListPage;
function DisplayAddSurveyPage(req, res, next) {
    res.render('index', { title: 'Add Survey', page: 'update-survey', list: '', displayName: (0, user_1.UserDisplayName)(req) });
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
function DisplayTakeSurveyPage(req, res, next) {
    let id = req.params.id;
    question_1.default.find({ survey_id: id }, {}, {}, (err, questionToAdd) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Take Survey', page: 'take-survey', list: questionToAdd, displayName: (0, user_1.UserDisplayName)(req) });
    });
}
exports.DisplayTakeSurveyPage = DisplayTakeSurveyPage;
function ProcessTakeSurveyPage(req, res, next) {
    let responseJson = JSON.stringify(req.body, null, 2);
    console.log(responseJson);
    console.log("Thanks for taking survey");
    let newResponse = new response_1.default({
        responseText: responseJson,
        survey_id: req.params.id
    });
    response_1.default.create(newResponse, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessTakeSurveyPage = ProcessTakeSurveyPage;
//# sourceMappingURL=survey.js.map