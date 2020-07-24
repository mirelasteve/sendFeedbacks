import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {withRouter} from 'react-router';
const SurveyFormReview = ({ onCancel,formValues,submitSurvey, history,credits}) => {
    
    
    
    const reviewForm = <div  className='text-light-app ml-5'>
                            <h5>{formValues.title}</h5>
                            <h6>{formValues.subject}</h6>
                            <h6>{formValues.body}</h6>
                             <div className='displayInline mt-15'>
                                <a  href="/yes"><button className='yesButton'>Yes</button></a>
                            </div>
                            <div className='displayInline ml-1'>
                                <a  href="/no"><button 
                                className='noButton'>No</button></a>
                            </div>
                        </div>
                      
    return (
        <div className='row'>
        
            <h6>This is how your customers will see the survey in their mail</h6>
            <div className='col m8 mt-5'>
                {reviewForm}
            </div>
            <div className='col m12 mt-5'>
                <button className='orange btn-flat left' onClick={onCancel}>Back</button>
                <button className='green accent-4 btn-flat right pointer' onClick={()=>submitSurvey(formValues, history)}>
                    Send
                    <i className="large material-icons">email</i>
                </button>
                
            </div>
            <div className='col s-4 right'>
            {credits<1
            ?<span className='red-text '>You dont have enough credits</span>
            :<span></span>}
            </div>
        </div>
    )
}
function mapStateToProps(state){

    
    return {
        formValues:state.form.surveyForm.values
        
    };
}
export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview))