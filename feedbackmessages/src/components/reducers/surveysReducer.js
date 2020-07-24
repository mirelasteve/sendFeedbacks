import {FETCH_SURVEYS,REMOVE_SURVEY} from '../actions/types';

export default function surveyReducer(state=[],action){
    
    switch(action.type){
        case FETCH_SURVEYS: return action.payload
        case REMOVE_SURVEY: return state.filter(el => el._id !== action.surveyId)
        default: return state
    }
    
}