import React, {Component} from 'react';
import {reduxForm , Field} from 'redux-form';

import surveyField from './surveyField.jsx';
import {Link} from 'react-router-dom';
import validations from '../../utils/validations';
import formFields from './formField';

class SurveyForm extends Component { 
    constructor(props){
        super(props);
        this.state={
     
        }
    }
   
    renderFields(){
       return formFields.map(({label,name,placeholder})=>{
           return <Field className='text-light-app' key={name} component={surveyField} type='text' label={label} name={name} placeholder={placeholder}></Field>
       }
    )
    }
    render(){
      
        
         return(
         <div className='mt-5 row'>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                
                <div className='col m9 xs12'>
                    
                    {this.renderFields()}
            </div> 
                <div className='col m12 '>
                <Link className='btn-flat left red ' to='/surveys'>Cancel</Link>
                <button className='green btn-flat right white-text' type='submit'>
                    Preview
                    <i className='material-icons right'>done</i>
                </button>
                </div>
            </form>
            
        </div>
        )} 
 } 
 function validate(values){
     
     const errors={};
     errors.recipients = validations(values.recipients || '') 
     errors.fromEmail =  validations(values.fromEmail || '')
     if(!values.title){
         errors.title = 'You must provide a title';
     }
     if(!values.subject){
        errors.subject ='You must provide a subject';
    }
    if(!values.body){
        errors.body = 'You must provide an email body';
    }
    if(!values.recipients){
        errors.recipients = 'Invalid email';
    }
    
    
     return errors;
 }
 export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount:false
 })(SurveyForm);