import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './authReducer';
import surveyReducer from './surveysReducer';

export default combineReducers({
    auth:auth,
    form:formReducer,
    surveys:surveyReducer
})