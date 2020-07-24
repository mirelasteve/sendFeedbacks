import React from 'react'

 const surveyField = ({input,label,placeholder, meta:{error,touched}}) => {
     
    return (
        <div className='col m11'>
            <label className='text-light-app fontSize-1rem'>{label}</label>
            <input className='input-field' {...input} placeholder={placeholder}/>

            
            <span className='red-text'>
                {touched && error}
            </span>
            
        </div>
    )
}
 export default surveyField;