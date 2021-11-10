import express from 'express';

const router = express.Router();
export default router;

//instantiate an object of type index controller
import { DisplayHomePage, DisplaySurveyListPage, 
    DisplayAddPage, ProcessAddPage, DisplayUpdatePage, 
    ProcessUpdatePage, ProcessDeletePage } from '../Controller/index';

/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET contact list page. */
router.get('/survey-list',  DisplaySurveyListPage);

/*GET display /survey-list/add page */
router.get('/add', DisplayAddPage);

/*POST process /survey-list/add page */
router.post('/add',  ProcessAddPage);

/*GET display update/:id page - with /contacts-list/update:id */
router.get('/update/:id', DisplayUpdatePage);

/*POST process /contacts-list/update/:id page */
router.post('/update/:id',  ProcessUpdatePage);

/*GET Process /contacts-list/delete/:id */
router.get('/delete/:id',  ProcessDeletePage);

module.exports = router;
