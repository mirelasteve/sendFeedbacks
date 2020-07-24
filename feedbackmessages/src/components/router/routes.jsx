import React from 'react'
import { Route, Switch} from 'react-router-dom'
import { Landing } from '../elements/landing';
import  SurveyList  from '../elements/surveys/surveyList';
import  SurveyNew  from '../elements/surveys/surveyNew';
 
 export const Routes = () => {
     return (
        <div>
            <Switch>
                <Route exact path='/' component= {Landing}></Route>
                <Route exact path='/surveys' render={()=><SurveyList></SurveyList>}></Route>
                <Route exact path='/surveys/new' component={SurveyNew}></Route>
             </Switch>
        </div>
            
        
     )
 }
 

 