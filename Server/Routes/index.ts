import express from 'express';

const router = express.Router();
export default router;

//instantiate an object of type index controller
import { DisplayHomePage, DisplaySurveyListPage, 
    DisplayAddPage, ProcessAddPage } from '../Controller/index';

/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET contact list page. */
router.get('/survey-list',  DisplaySurveyListPage);
module.exports = router;

/*GET display /survey-list/add page */
router.get('/add', DisplayAddPage);

/*POST process /survey-list/add page */
router.post('/add',  ProcessAddPage);

