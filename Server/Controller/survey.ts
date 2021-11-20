import express, {Request, Response, NextFunction} from 'express';

//get a reference to the Model Class
import SurveyList from '../Models/surveys';
import QuestionList from '../Models/question';
import ResponseList from '../Models/response';

import { NativeError } from 'mongoose';
import { UserDisplayName } from '../Controller/user';

export function DisplaySurveyListPage(req: Request | any, res: Response, next: NextFunction): void
{
    if(!req.user) 
    {     
      SurveyList.find((err, surveyCollection) =>
      {
         res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, displayName: ''});      
      }
  )} 
    else
    {
    //db.list.find()
      if(req.user.username === 'admin')
      {
        SurveyList.find((err, surveyCollection) =>
      {
        if(err)
        {
          console.error(err);
          res.end(err);
        }
        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, displayName: UserDisplayName(req)});      
      });
      } else{
      SurveyList.find({user_id: req.user.id}, {}, {}, (err, surveyCollection) =>
      {
        if(err)
        {
          console.error(err);
          res.end(err);
        }
        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, displayName: UserDisplayName(req)});      
      });
    }
  }
}

// Display Create page
export function DisplayAddSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    
    res.render('index', { title: 'Add Survey', page: 'update-survey', list: '', displayName: UserDisplayName(req)});
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

// Display take-survey page
export function DisplayTakeSurveyPage(req: Request, res: Response, next: NextFunction): void
{
  let id = req.params.id;
  QuestionList.find({survey_id: id}, {}, {}, (err, questionToAdd) =>
        {
          if(err)
          {
              console.error(err);
              res.end(err);          
          }
          res.render('index', { title: 'Take Survey', page: 'take-survey', list: questionToAdd, displayName: UserDisplayName(req)}); 
        });
}

// Process take-survey page
export function ProcessTakeSurveyPage(req: Request, res: Response, next: NextFunction): void
{
  let responseJson = JSON.stringify(req.body, null, 2);

  console.log(responseJson);
  console.log("Thanks for taking survey");

  //let newResponse = new ResponseList(responseJson);
  let newResponse = new ResponseList
  ({
    responseText: responseJson,
    survey_id: req.params.id
  });

  ResponseList.create(newResponse , (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
  });
}