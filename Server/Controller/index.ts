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
   
    SurveyList.findById(id, {}, {}, (err, questionToAdd) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
 
        QuestionList.find({survey_id: id}, {}, {}, (err, questionToAdd2) =>
        {
          if(err)
          {
              console.error(err);
              res.end(err);
            
          }

          console.log(questionToAdd);
          console.log(questionToAdd2);
          
          res.render('index', { title: 'Question', page: 'question', list: questionToAdd, list2: questionToAdd2});
       
        });
    });   
}

//Display add MC question page
export function DisplayAddMCQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    let id = req.params.id;

    console.log(id);
    console.log("DisplayAddQuestionPage")

    SurveyList.findById(id, {}, {}, (err, questionToAdd) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        console.log(questionToAdd);

        QuestionList.find({survey_id: id}, {}, {}, (err, questionToAdd2) =>
        {
          if(err)
          {
              console.error(err);
              res.end(err);         
          }
          //show the update view
        res.render('index', { title: 'Add Multiple Choice Question', page: 'update-question-mc', list: questionToAdd, list2: questionToAdd2});
        });               
    }); 
}


// Process Create page
export function ProcessAddMCQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
    
    let id = req.params.id;
    let newQuestion = new QuestionList
  ({
    "questionText": req.body.questionText,
    "questionType": "Multiple Choice",
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

//Display add MC question page
export function DisplayAddTFQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    let id = req.params.id;

    console.log(id);

    SurveyList.findById(id, {}, {}, (err, questionToAdd) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        console.log(questionToAdd);

        QuestionList.find({survey_id: id}, {}, {}, (err, questionToAdd2) =>
        {
          if(err)
          {
              console.error(err);
              res.end(err);         
          }
          //show the update view
        res.render('index', { title: 'Add True or False Question', page: 'update-question-tf', list: questionToAdd, list2: questionToAdd2});
        });               
    }); 
}

// Process Create page
export function ProcessAddTFQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
    
    let id = req.params.id;
    let newQuestion = new QuestionList
  ({
    "questionText": req.body.questionText,
    "questionType": "True/False",
    "survey_id": req.params.id
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

//Display add MC question page
export function DisplayAddSAQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    let id = req.params.id;

    console.log(id);


    SurveyList.findById(id, {}, {}, (err, questionToAdd) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        console.log(questionToAdd);

        QuestionList.find({survey_id: id}, {}, {}, (err, questionToAdd2) =>
        {
          if(err)
          {
              console.error(err);
              res.end(err);         
          }
          //show the update view
        res.render('index', { title: 'Add Short Answer Question', page: 'update-question-sa', list: questionToAdd, list2: questionToAdd2});
        });               
    }); 
}

// Process Create page
export function ProcessAddSAQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Survey List
    
    let id = req.params.id;
    let newQuestion = new QuestionList
  ({
    "questionText": req.body.questionText,
    "questionType": "Short Answer",
    "survey_id": req.params.id,
    "option_Text" : req.body.optionText
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

//Display Update Page
export function DisplayUpdateQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    //pass the id to the db 

    //db.list.find({"_id": id})
    QuestionList.findById(id, {}, {}, (err, questionToUpdate) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        console.log(questionToUpdate)
     
        //show the update view
        res.render('index', { title: 'Update Question', page: 'update-question-mc', list2: questionToUpdate })
       
    }); 
}

// Process Update page
export function ProcessUpdateQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Contact Item
    let updatedQuestionList = new QuestionList
    ({
      "_id": id,
      "questionText": req.body.questionText,
      "first_Choice": req.body.firstChoice,
      "second_Choice": req.body.secondChoice,
      "third_Choice": req.body.thirdChoice,
      "fourth_Choice": req.body.fourthChoice,
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    QuestionList.updateOne({_id: id}, updatedQuestionList, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }

      QuestionList.findById(id, {}, {}, (err, questionToUpdate) =>
      {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

      //get the survey_id
       let surveyId = JSON.stringify(questionToUpdate, ['survey_id']).substr(14,24);
       console.log(surveyId);
  
       res.redirect('/question/' + surveyId);
      });
    });
}


// Process Delete page
export function ProcessDeleteQuestionPage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    QuestionList.findById(id, {}, {}, (err, questionToDelete) =>
      {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //get the survey_id
        let surveyId = JSON.stringify(questionToDelete, ['survey_id']).substr(14,24);
        console.log(surveyId);
        
        // db.clothing.remove({"_id: id"})
        QuestionList.remove({_id: id}, (err) => {
          if(err)
          {
            console.error(err);
            res.end(err);
          }
    
        res.redirect('/question/' + surveyId);
      });
  });
}
