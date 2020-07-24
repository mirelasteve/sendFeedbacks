const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../../middlewares/requireLogIn');
const requireCredits = require('../../middlewares/requireCredits');
const Survey = require('../../models/survey');
const Mailer = require('../../services/Mailer');
const surveyTemplate = require('../../services/templates/surveyTemplate');
const surveyTemplateModern = require('../../services/templates/surveyTemplateModern');
const Surveys = mongoose.model('surveys');
const gratitudeOnFeedback = require('./surveyTemplate/gratitudeOnFeedback');

module.exports = app =>{

    app.get('/api/surveys',requireLogin, async (req,res)=>{
      
        const surveys = await Surveys
            .find({ _user:req.user.id })
            .select({recipients:false})
            
        res.send(surveys);
    });
    app.get('/api/surveys/remove/:surveyId',requireLogin,async (req,res)=>{
        const surveyId = req.params.surveyId;
        const surveys = await Surveys
            .find({ _user:req.user.id })
            .deleteOne({_id:surveyId})
            .exec();
            res.send(surveys);
           
        
    })

    app.get('/api/surveys/:surveyId/:choice',(req,res)=>
        res.send(gratitudeOnFeedback)
    );

    app.post('/api/surveys/webhooks',(req,res)=>{
        const p = new Path('/api/surveys/:surveyId/:choice');
        
        _.chain(req.body)
            .map( ({email,url})=>{

            const match = p.test(new URL(url).pathname);
            if(match){
                return {email,
                surveyId:match.surveyId,
                choice:match.choice
                    };
            }
            })
            .compact()
            .uniqBy('email','surveyId')
            .each( ({email,surveyId,choice})=>{
                // console.log(email,surveyId,choice)
                Surveys.updateOne({
                    _id:surveyId,
                    recipients:{
                        $elemMatch:{
                            email:email,
                            responded:false
                        }
                    }
                },{
                    $inc:{[choice]:1},
                    $set:{'recipients.$.responded':true},
                    lastResponded: new Date()
                }).exec()
            })
            .value()
            
        
        res.send({})
    });
    app.post('/api/surveys',requireLogin,requireCredits, async (req,res,next)=>{
        // console.log(req.body);
        const {title, subject,body,recipients,fromEmail } = req.body;
        const survey = await new Surveys({
            title,
            subject,
            body,
            fromEmail,
            recipients:recipients.split(',').map(email=> ({email : email.trim()}) ),
            _user:req.user.id,
            dateSent:Date.now()
        });
        // console.log(survey)
        const mailer = new Mailer(survey, surveyTemplateModern(survey));
        try{
           
            await mailer.send();
            await survey.save();
            req.user.credits-=1;
            const user = await req.user.save();
            res.send(user);
        }
        catch(error){
           
            res.send(422).send(error)
        }
    });

    

}