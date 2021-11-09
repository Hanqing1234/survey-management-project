import express, {Request, Response, NextFunction} from 'express';

//get a reference to the Contact Model Class
import SurveyList from '../Models/surveys';

import { NativeError } from 'mongoose';

export function DisplayHomePage(req: Request, res: Response, next: NextFunction):void
{
    res.render('index', { title: 'Home', page: 'home' });
}

export function DisplaySurveyListPage(req: Request, res: Response, next: NextFunction): void
{
    //db.list.find()
    SurveyList.find((err, surveyCollection) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        } 

        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection });      
    });
}