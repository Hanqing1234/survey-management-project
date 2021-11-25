import express, {Request, Response, NextFunction} from 'express';

//get a reference to the Model Class
import SurveyList from '../Models/surveys';
import QuestionList from '../Models/question';
import OptionList from '../Models/option';
import ResponseList from '../Models/response';

import { NativeError } from 'mongoose';
import { UserDisplayName } from './user';
import moment from 'moment';



export function DisplaySurveyListPage(req: Request | any, res: Response, next: NextFunction): void
{
    if(!req.user) 
    {     
      SurveyList.find((err, surveyCollection) =>
      {
         res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection});      
      }
  )} 
    else
    {
    //db.list.find()
      if(req.user.username === 'admin')
      {
        SurveyList.find((err, surveyCollection) =>
      {
       
        // console.log(surveyCollection[0].id);
        // let surveyID = surveyCollection[0].id;
        // console.log("--------------------");      

        QuestionList.find(/*{survey_id: surveyID},{},{},*/ (err, questionCollection: any) => 
        {             
          res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection, list2:questionCollection ,displayName: UserDisplayName(req)});
        })
              
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

export function DisplayAllSurveyListPage(req: Request | any, res: Response, next: NextFunction): void
{
  OptionList.find((err, surveyCollection: any) =>
    {
      // console.log(2);
      // let temp = JSON.parse(surveyCollection[surveyCollection.length - 1].optionText);
      // console.log(temp);
      // //console.log(surveyCollection[surveyCollection.length - 1].optionText.);
      // console.log(temp.q1);
      // console.log(Object.keys(temp).length);

    });
  
  SurveyList.find((err, surveyCollection) =>
      {
        let dateNow = moment(new Date(Date.now())).format('YYYY-MM-DD');
         res.render('index', { title: 'All Survey List', page: 'survey-list-all', list: surveyCollection, displayName:UserDisplayName(req), dateNow: dateNow });      
      });
};

// Display Create page
export function DisplayAddSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    
    res.render('index', { title: 'Create Survey', page: 'update-survey', list: '', displayName: UserDisplayName(req)});
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
  
  // console.log((req.body.q1));
  console.log(responseJson);
  console.log("Thanks for taking survey");
  console.log(typeof responseJson);
  //let newResponse = new OptionList(responseJson);
  let newResponse = new ResponseList
  ({
    response_value: responseJson,
    survey_ID: req.params.id
  });

  console.log(newResponse);
 console.log("---------------------------------")
  ResponseList.create(newResponse , (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }
    
    // OptionList.find((err, ResponseCollection: any) =>
    // {
    //   console.log(2);
    //   let temp = JSON.parse(ResponseCollection[ResponseCollection.length - 1].optionText);
    //   console.log(temp);
    //   //console.log(surveyCollection[surveyCollection.length - 1].optionText.);
    //   console.log(temp.q1);
    //   console.log(Object.keys(temp).length);

    // });
  });

}