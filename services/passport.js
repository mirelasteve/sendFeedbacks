const passport =  require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const keys = require('../config/config') ;
const mongoose = require('mongoose');
const User = mongoose.model('users');

// console.log('passport')

passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
});


passport.use(new GoogleStrategy({
    clientID:keys.googleClientId,
    clientSecret:keys.googleClientSecret,
    callbackURL:'/auth/google/callback',
    proxy:true
 },
 async (accessToken,refreshToken,profile,done)=>{
     
     const existingUser = await User.findOne({googleId:profile.id})
     
            if(existingUser){
                
             return done(null,existingUser)
            } 
     
            const user = await new User({ 
                googleId:profile.id,
                displayName:profile.displayName,
                userEmails:profile.emails
            }).save()
            done(null,user)
            
  



 }
))

passport.use(new LinkedInStrategy({
    clientID: keys.linkedinClientId,
    clientSecret: keys.linkedinClientSecret,
    callbackURL: '/auth/linkedin/callback',
    proxy:true
  },(token, tokenSecret, profile, done)=> {
    
    User.findOne({linkedinId: profile.id}).then((existingUser)=>{
        if(existingUser){
            done(null,existingUser)
        } else {
 
            new User({
                linkedinId:profile.id,
                displayName:profile.displayName,
                userEmails:profile.emails
            }).save()
                .then(user=> done(null,user))
        }
    })
  }
));

passport.use(new GitHubStrategy({
    clientID: keys.githubClientId,
    clientSecret: keys.githubClientSecret,
    callbackURL:'/auth/github/callback',
    proxy:true
  },
  (token, tokenSecret, profile, done)=> {
    
    User.findOne({ githubId: profile.id }).then((existingUser)=>{
        if(existingUser){
            done(null,existingUser)
        } else {
            let displayName = profile.displayName !== null ? profile.displayName: profile.username;
            new User({
                githubId:profile.id,
                displayName:displayName,
                userEmails:profile.emails
            }).save()
                .then(user=> done(null,user))
        }
    })
  }
));

