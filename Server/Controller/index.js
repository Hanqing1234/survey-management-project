"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessUpdatePage = exports.DisplayUpdatePage = exports.ProcessDeletePage = exports.ProcessAddPage = exports.DisplayAddPage = exports.DisplaySurveyListPage = exports.DisplayHomePage = void 0;
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
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'update', list: '' });
}
exports.DisplayAddPage = DisplayAddPage;
function ProcessAddPage(req, res, next) {
    let newContact = new surveys_1.default({
        "title": req.body.name,
        "author": req.body.author,
    });
    surveys_1.default.create(newContact, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-list');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    surveys_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey-list');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
function DisplayUpdatePage(req, res, next) {
    let id = req.params.id;
    surveys_1.default.findById(id, {}, {}, (err, surveyToUpdate) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Update', page: 'update', list: surveyToUpdate });
    });
}
exports.DisplayUpdatePage = DisplayUpdatePage;
function ProcessUpdatePage(req, res, next) {
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
exports.ProcessUpdatePage = ProcessUpdatePage;
//# sourceMappingURL=index.js.map