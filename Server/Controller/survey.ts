import express, {Request, Response, NextFunction} from 'express';

//get a reference to the Model Class
import SurveyList from '../Models/surveys';
import QuestionList from '../Models/question';

import { NativeError } from 'mongoose';

export function DisplaySurveyListPage(req: Request | any, res: Response, next: NextFunction): void
{
    if(!req.user) 
  {
    SurveyList.find((err, surveyCollection) =>
    {
    res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, displayName: req.user});      
  })};

    //db.list.find()
    SurveyList.find({user_id: req.user.id}, {}, {}, (err, surveyCollection) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, displayName: req.user });      
    });
}

// Display Create page
export function DisplayAddSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    
    res.render('index', { title: 'Add Survey', page: 'update-survey', list: ''});
}

// Process Create page
export function ProcessAddSurveyPage(req: Request | any, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
  let newSurvey = new SurveyList
  ({
    "title": req.body.name,
    "author": req.body.author,
    "user_id": req.user.id
  });
  console.log(newSurvey);
  // db.list.insert({list data is here...})
  SurveyList.create(newSurvey, (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    
  });
  res.redirect('/date');
}

// Process Delete page
export function ProcessDeleteSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.question.remove({"_id: id"})
  QuestionList.deleteMany({survey_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
  });
  // db.survey.remove({"_id: id"})
  SurveyList.deleteOne({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/survey-list');
  });
}

