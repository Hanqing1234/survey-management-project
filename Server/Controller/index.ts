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

// Display Create page
export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    res.render('index', { title: 'Add', page: 'update', list: ''});
}

// Process Create page
export function ProcessAddPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Contact List
  let newContact = new SurveyList
  ({
    "title": req.body.name,
    "author": req.body.author,
  });

  // db.list.insert({list data is here...})
  SurveyList.create(newContact, (err: NativeError) => 
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
export function ProcessDeletePage(req: Request, res: Response, next: NextFunction): void
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
