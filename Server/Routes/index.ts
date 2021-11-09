import express from 'express';

const router = express.Router();
export default router;

//instantiate an object of type index controller
import { DisplayHomePage, DisplaySurveyListPage } from '../Controller/index';

/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET contact list page. */
router.get('/survey-list',  DisplaySurveyListPage);
module.exports = router;
