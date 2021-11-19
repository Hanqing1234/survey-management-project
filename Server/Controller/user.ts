import express, {Request, Response, NextFunction} from 'express';

import { NativeError } from 'mongoose';
import passport from 'passport';
import { OutgoingMessage } from 'http';
import { UnavailableForLegalReasons } from 'http-errors';

import User from '../Models/user';

// Init auth check for protected pages - John
export function requireAuth(req: Request, res: Response, next: NextFunction)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/sign-in')
    }
    next();
}

// display sign-in page
export function DisplaySignInPage(req: Request, res: Response, next: NextFunction): void
{
  res.render('index', {title: 'Sign In', page: 'sign-in'});
}

export function ProcessSignInPage(req: Request, res: Response, next: NextFunction): void
{
  passport.authenticate('local', (err, user, info) =>
  {
    if(err)
    {
      console.error(err);
      return next(err);
    }
    if(!user)
    {
      req.flash('signInMessage', 'Authentication Error');
      return res.redirect('/sign-in');
    }

    req.login(user, (err: any) => 
    {
      if(err)
      {
        console.error(err);
        return next(err);
      }

      console.log("Sign In Success");

      return res.redirect('/survey-list');
    });
  })(req, res, next);
}

// sign-out function
export function ProcessSignOutPage(req: Request, res: Response, next: NextFunction): void
{
  req.logOut();

  res.redirect('/sign-in');
}

// displays registration page 
export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Register', page: 'register'  });
}

// processes creation of new user into users db collection
export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
  let newUser = new User
  ({
    username: req.body.username,
    emailAddress: req.body.emailAddress,
    displayName: req.body.firstName + " " + req.body.lastName
  });

  User.register(newUser, req.body.password, (err) => 
  {
    if(err)
    {
      console.error('Error: Inserting New User');
      if(err.name == "UserExistsError")
      {
        console.error('Error: User Already Exists');
      }
      req.flash('registerMessage', 'Registration Error');

      return res.redirect('/register');
    }
    return passport.authenticate('local')(req, res, () =>
    {
      return res.redirect('/survey-list');
    });
  });
}