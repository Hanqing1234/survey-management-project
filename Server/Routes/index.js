"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const index_1 = require("../Controller/index");
router.get('/', index_1.DisplayHomePage);
router.get('/home', index_1.DisplayHomePage);
router.get('/survey-list', index_1.DisplaySurveyListPage);
router.get('/add-survey', index_1.DisplayAddSurveyPage);
router.post('/add-survey', index_1.ProcessAddSurveyPage);
router.get('/update-survey/:id', index_1.DisplayUpdateSurveyPage);
router.post('/update-survey/:id', index_1.ProcessUpdateSurveyPage);
router.get('/delete-survey/:id', index_1.ProcessDeleteSurveyPage);
router.get('/question/:id', index_1.DisplayQuestionPage);
router.get('/add-question-mc/:id', index_1.DisplayAddMCQuestionPage);
router.post('/add-question-mc/:id', index_1.ProcessAddMCQuestionPage);
router.get('/add-question-tf/:id', index_1.DisplayAddTFQuestionPage);
router.post('/add-question-tf/:id', index_1.ProcessAddTFQuestionPage);
router.get('/add-question-sa/:id', index_1.DisplayAddSAQuestionPage);
router.post('/add-question-sa/:id', index_1.ProcessAddSAQuestionPage);
router.get('/update-question/:id', index_1.DisplayUpdateQuestionPage);
router.post('/update-question/:id', index_1.ProcessUpdateQuestionPage);
router.get('/delete-question/:id', index_1.ProcessDeleteQuestionPage);
module.exports = router;
//# sourceMappingURL=index.js.map