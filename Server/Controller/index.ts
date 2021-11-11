import express, {Request, Response, NextFunction} from 'express';

//get a reference to the Contact Model Class
import SurveyList from '../Models/surveys';
import QuestionList from '../Models/question';

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

        console.log(surveyCollection);
        res.render('index', { title: 'Survey List', page: 'survey-list', list: surveyCollection });      
    });
}

// Display Create page
export function DisplayAddSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    
    res.render('index', { title: 'Add Survey', page: 'update-survey', list: ''});
}

// Process Create page
export function ProcessAddSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
  let newSurvey = new SurveyList
  ({
    "title": req.body.name,
    "author": req.body.author,
  });

  // db.list.insert({list data is here...})
  SurveyList.create(newSurvey, (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/survey-list');
  });
}

// Process Delete page
export function ProcessDeleteSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.clothing.remove({"_id: id"})
  SurveyList.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/survey-list');
  });
}

//Display Update Page
export function DisplayUpdateSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    //pass the id to the db 

    //db.list.find({"_id": id})
    SurveyList.findById(id, {}, {}, (err, surveyToUpdate) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        console.log(surveyToUpdate);
        //show the update view
        res.render('index', { title: 'Update Survey', page: 'update-survey', list: surveyToUpdate })
    }); 
}

// Process Update page
export function ProcessUpdateSurveyPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Contact Item
    let updatedSurveyList = new SurveyList
    ({
      "_id": id,
      "title": req.body.name,
      "author": req.body.author
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    SurveyList.updateOne({_id: id}, updatedSurveyList, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/survey-list');
    });
}

// Display question page
export function DisplayQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    
    let id = req.params.id;
    console.log(id);

    // QuestionList.find({survey_id: id}, {}, {}, (err, questionToUpdate) =>
    // {
    //     if(err)
    //     {
    //         console.error(err);
    //         res.end(err);
    //         res.render('index', { title: 'Question', page: 'question', list: questionToUpdate});
    //     }

    //     console.log(questionToUpdate);
    //     console.log("good");
    // });
    
    SurveyList.findOne({survey_id: id}, {}, {}, (err, questionToUpdate) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        console.log(QuestionList);
        console.log(questionToUpdate);
        console.log("2");

          QuestionList.find({survey_id: id}, {}, {}, (err, questionToUpdate2) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
           
        }

        res.render('index', { title: 'Question', page: 'question', list: questionToUpdate, list2: questionToUpdate2});
        console.log(questionToUpdate2);
        console.log("good");
    });
        //show the update view
        
        // res.render('index', { title: 'Question', page: 'question', list: questionToUpdate});
    }); 
    
    // QuestionList.findOne({survey_id: id}, {}, {}, (err, questionToUpdate) =>
    // {
    //     if(err)
    //     {
    //         console.error(err);
    //         res.end(err);
    //         res.render('index', { title: 'Question', page: 'question', list: questionToUpdate});
    //     }

    //     console.log(questionToUpdate);
    //     console.log("good");

    //     if(questionToUpdate === null){
            
    //         SurveyList.findById(id, {}, {}, (err, questionToUpdate) =>
    //         {
    //             if(err)
    //             {
    //                 console.error(err);
    //                 res.end(err);
    //             }

    //             console.log(questionToUpdate);
    //             //show the update view
    //             res.render('index', { title: 'Question', page: 'question', list: questionToUpdate});
    //         }); 
    //             }

    //     //show the update view
    //     else
    //     {
    //         console.log("This is else")
    //         console.log(questionToUpdate);
    //         res.render('index', { title: 'Question', page: 'question', list: questionToUpdate});
    //     }
    // }); 
}

//Display add question page
export function DisplayAddQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    let id = req.params.id;

    console.log(id);
    console.log("DisplayAddQuestionPage")

    SurveyList.findById(id, {}, {}, (err, questionToUpdate) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        console.log(questionToUpdate);
       
        //show the update view
        res.render('index', { title: 'Add-Question', page: 'update-question', list: questionToUpdate});
    }); 
    
}

// Process Create page
export function ProcessAddQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
    let id = req.params.id;
    let newQuestion = new QuestionList
  ({
    "questionText": req.body.questionText,
    "survey_id": req.params.id,
    "first_Choice": req.body.firstChoice,
    "second_Choice": req.body.secondChoice,
    "third_Choice": req.body.thirdChoice,
    "fourth_Choice": req.body.fourthChoice
  });

  console.log(id);

  // db.list.insert({list data is here...})
  QuestionList.create(newQuestion, (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/question/'+ req.params.id);
  });
}