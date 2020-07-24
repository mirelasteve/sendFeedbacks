import axios from 'axios';
import {FETCH_USER,FETCH_SURVEYS, REMOVE_SURVEY} from './types';

export const fetchUser = ()=>{
    
    return async function (dispatch){
        
        const res= await axios.get('/api/current_user');
        dispatch({
            type:FETCH_USER,
            payload:res.data
        })
    }
   
}
export const handleStripeToken = (token)=> async (dispatch)=>{
 
    const res = await axios.post('/api/stripepayments',token);
    dispatch({
        type:FETCH_USER,
        payload:res.data
        
    })  
}

export const submitSurvey = ( values,history ) => async(dispatch) => {
    const res = await axios.post('/api/surveys',values);
    
    history.push('/surveys');
    
    dispatch({
        type:FETCH_USER,
        payload:res.data
    })
}
export const fetchSurveys = ()=>{
    return async (dispatch)=>{
        const res = await axios.get('/api/surveys');
     
        dispatch({
            type:FETCH_SURVEYS,
            payload:res.data
        })
    }
}

export const removeSurvey = (surveyId)=>{
   
    return async (dispatch)=>{
        await axios.get(`/api/surveys/remove/${surveyId}`);
    
    dispatch({
        type:REMOVE_SURVEY,
        surveyId
    })
}
}