"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeleteQuestionPage = exports.ProcessUpdateQuestionPage = exports.DisplayUpdateQuestionPage = exports.ProcessAddQuestionPage = exports.DisplayAddQuestionPage = exports.DisplayQuestionPage = exports.ProcessUpdateSurveyPage = exports.DisplayUpdateSurveyPage = exports.ProcessDeleteSurveyPage = exports.ProcessAddSurveyPage = exports.DisplayAddSurveyPage = exports.DisplaySurveyListPage = exports.DisplayHomePage = void 0;
const surveys_1 = __importDefault(require("../Models/surveys"));
const question_1 = __importDefault(require("../Models/question"));
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
        console.log(surveyCollection);
        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection });
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
    });
    surveys_1.default.create(newSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-list');
    });
}
exports.ProcessAddSurveyPage = ProcessAddSurveyPage;
function ProcessDeleteSurveyPage(req, res, next) {
    let id = req.params.id;
    surveys_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-list');
    });
}
exports.ProcessDeleteSurveyPage = ProcessDeleteSurveyPage;
function DisplayUpdateSurveyPage(req, res, next) {
    let id = req.params.id;
    surveys_1.default.findById(id, {}, {}, (err, surveyToUpdate) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(surveyToUpdate);
        res.render('index', { title: 'Update Survey', page: 'update-survey', list: surveyToUpdate });
    });
}
exports.DisplayUpdateSurveyPage = DisplayUpdateSurveyPage;
function ProcessUpdateSurveyPage(req, res, next) {
    let id = req.params.id;
    let updatedSurveyList = new surveys_1.default({
        "_id": id,
        "title": req.body.name,
        "author": req.body.author
    });
    surveys_1.default.updateOne({ _id: id }, updatedSurveyList, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-list');
    });
}
exports.ProcessUpdateSurveyPage = ProcessUpdateSurveyPage;
function DisplayQuestionPage(req, res, next) {
    let id = req.params.id;
    console.log(id);
    surveys_1.default.findById(id, {}, {}, (err, questionToAdd) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(question_1.default);
        console.log(questionToAdd);
        console.log("2");
        question_1.default.find({ survey_id: id }, {}, {}, (err, questionToAdd2) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.render('index', { title: 'Question', page: 'question', list: questionToAdd, list2: questionToAdd2 });
            console.log(questionToAdd2);
            console.log("good");
        });
    });
}
exports.DisplayQuestionPage = DisplayQuestionPage;
function DisplayAddQuestionPage(req, res, next) {
    let id = req.params.id;
    console.log(id);
    console.log("DisplayAddQuestionPage");
    surveys_1.default.findById(id, {}, {}, (err, questionToAdd) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(questionToAdd);
        question_1.default.find({ survey_id: id }, {}, {}, (err, questionToAdd2) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.render('index', { title: 'Add-Question', page: 'update-question', list: questionToAdd, list2: '' });
        });
    });
}
exports.DisplayAddQuestionPage = DisplayAddQuestionPage;
function ProcessAddQuestionPage(req, res, next) {
    let id = req.params.id;
    let newQuestion = new question_1.default({
        "questionText": req.body.questionText,
        "survey_id": req.params.id,
        "first_Choice": req.body.firstChoice,
        "second_Choice": req.body.secondChoice,
        "third_Choice": req.body.thirdChoice,
        "fourth_Choice": req.body.fourthChoice
    });
    console.log(id);
    question_1.default.create(newQuestion, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/question/' + req.params.id);
    });
}
exports.ProcessAddQuestionPage = ProcessAddQuestionPage;
function DisplayUpdateQuestionPage(req, res, next) {
    let id = req.params.id;
    question_1.default.findById(id, {}, {}, (err, questionToUpdate) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        console.log(questionToUpdate);
        res.render('index', { title: 'Update Question', page: 'update-question', list2: questionToUpdate });
    });
}
exports.DisplayUpdateQuestionPage = DisplayUpdateQuestionPage;
function ProcessUpdateQuestionPage(req, res, next) {
    let id = req.params.id;
    let updatedQuestionList = new question_1.default({
        "_id": id,
        "questionText": req.body.questionText,
        "first_Choice": req.body.firstChoice,
        "second_Choice": req.body.secondChoice,
        "third_Choice": req.body.thirdChoice,
        "fourth_Choice": req.body.fourthChoice,
    });
    question_1.default.updateOne({ _id: id }, updatedQuestionList, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        question_1.default.findById(id, {}, {}, (err, questionToUpdate) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            let surveyId = JSON.stringify(questionToUpdate, ['survey_id']).substr(14, 24);
            console.log(surveyId);
            res.redirect('/question/' + surveyId);
        });
    });
}
exports.ProcessUpdateQuestionPage = ProcessUpdateQuestionPage;
function ProcessDeleteQuestionPage(req, res, next) {
    let id = req.params.id;
    question_1.default.findById(id, {}, {}, (err, questionToDelete) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        let surveyId = JSON.stringify(questionToDelete, ['survey_id']).substr(14, 24);
        console.log(surveyId);
        question_1.default.remove({ _id: id }, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.redirect('/question/' + surveyId);
        });
    });
}
exports.ProcessDeleteQuestionPage = ProcessDeleteQuestionPage;
//# sourceMappingURL=index.js.map