import express from 'express';

const router = express.Router();
export default router;

//instantiate an object of type index controller
import { DisplayHomePage, DisplaySurveyListPage, 
    DisplayAddSurveyPage, ProcessAddSurveyPage, DisplayUpdateSurveyPage, 
    ProcessUpdateSurveyPage, ProcessDeleteSurveyPage, DisplayQuestionPage,
    DisplayAddMCQuestionPage, ProcessAddMCQuestionPage, DisplayUpdateQuestionPage,
    ProcessUpdateQuestionPage, ProcessDeleteQuestionPage, DisplayAddTFQuestionPage,
    ProcessAddTFQuestionPage, DisplayAddSAQuestionPage, ProcessAddSAQuestionPage
    } from '../Controller/index';

/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET contact list page. */
router.get('/survey-list',  DisplaySurveyListPage);

/*GET display /survey-list/add page */
router.get('/add-survey', DisplayAddSurveyPage);

/*POST process /survey-list/add page */
router.post('/add-survey',  ProcessAddSurveyPage);

/*GET display update/:id page - with /contacts-list/update:id */
router.get('/update-survey/:id', DisplayUpdateSurveyPage);

/*POST process /contacts-list/update/:id page */
router.post('/update-survey/:id',  ProcessUpdateSurveyPage);

/*GET Process /contacts-list/delete/:id */
router.get('/delete-survey/:id',  ProcessDeleteSurveyPage);

/*GET question page */
router.get('/question/:id', DisplayQuestionPage);

/*GET display /add-question-mc/:id page */
router.get('/add-question-mc/:id', DisplayAddMCQuestionPage);

/*Post display /add-question-mc/:id page */
router.post('/add-question-mc/:id', ProcessAddMCQuestionPage);

/*GET display /add-question-tf/:id page */
router.get('/add-question-tf/:id', DisplayAddTFQuestionPage);

/*Post display /add-question-tf/:id page */
router.post('/add-question-tf/:id', ProcessAddTFQuestionPage);

/*GET display /add-question-sa/:id page */
router.get('/add-question-sa/:id', DisplayAddSAQuestionPage);

/*Post display /add-question-sa/:id page */
router.post('/add-question-sa/:id', ProcessAddSAQuestionPage);

/*GET display /edit-question/:id page */
router.get('/update-question/:id', DisplayUpdateQuestionPage);

/*Post display /edit-question/:id page */
router.post('/update-question/:id', ProcessUpdateQuestionPage);

/*GET Process /question/delete/:id */
router.get('/delete-question/:id',  ProcessDeleteQuestionPage);

module.exports = router;
