import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import _ from "lodash";
import M from 'materialize-css'; 
import Loader from '../loader/loader';

class SurveyList  extends Component { 
    state = {
        surveys:this.props.surveys,
        workSurveys:this.props.surveys,
        factor:'',
        rise:true,
        buttonsFlags :{
            title:true,
            subject:true,
            body:true
            
        }
    }
    componentDidMount(){
      this.props.fetchSurveys().then(()=>{
        this.setState({
            surveys: this.props.surveys,
            workSurveys: this.props.surveys
        })
      });
      let elems = document.querySelectorAll('.dropdown-trigger');
     
      M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});
      M.Dropdown.init(elems,{coverTrigger:false,constrainWidth:false})
      
    }
    
    sortSurveys(e,factor){
        
        
        if(this.state.rise){
            const deepCopySurveys = _.cloneDeep(this.state.surveys);
            const changeButton = {...this.state.buttonsFlags};
            changeButton[factor]=!changeButton[factor]
            
           this.setState({
                workSurveys:deepCopySurveys.sort((a,b)=>(a[factor]).localeCompare(b[factor])),
                rise:false,
                buttonsFlags:changeButton
            })
        } else {
            const deepCopySurveys = _.cloneDeep(this.state.surveys);
            const changeButton = {...this.state.buttonsFlags};
            changeButton[factor]=!changeButton[factor]
             this.setState({
                workSurveys:deepCopySurveys.sort((a,b)=>(b[factor]).localeCompare(a[factor])),
                rise:true,
                buttonsFlags:!changeButton
            })
        }
    }
    filterSurveys(e){
        let search = e.target.value;
        const copySurveys = [...this.state.surveys];
        const filterSurveys = copySurveys.filter(x=>x.title.includes(search));
        
        this.setState({
            workSurveys:filterSurveys
        })
    }
    removeSurveys(surveyId){
        this.props.removeSurvey(surveyId);
        const deepCopySurveys = _.cloneDeep(this.state.surveys);
        let newSurveys = deepCopySurveys.filter(x=>x._id !== surveyId);
        
        this.setState({
            surveys:newSurveys
        })
    }
    render() {
        
        
        
        if(this.state.surveys){
            return (
            <div className='row mt-5'>

                    <div className='row'>
                        <div className='col s4'>
                        <a href='/#'className='dropdown-trigger btn transparent text-light-app'  data-target='dropdown1'>Sort by</a>

                        <ul id='dropdown1' className='dropdown-content'>
                            <li><button className='btn btn-small transparent text-darken-app' onClick={(e)=>this.sortSurveys(e,'title')}>Campaign Name{this.state.buttonsFlags.title ? <i className="material-icons right">arrow_upward</i>:<i className="material-icons">arrow_downward</i>}</button></li>
                            <li><button className='btn btn-small ml-1 transparent text-darken-app' onClick={(e)=>this.sortSurveys(e,'subject')}>Subject{this.state.buttonsFlags.subject ? <i className="material-icons right">arrow_upward</i>:<i className="material-icons">arrow_downward</i>}</button></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><button className='btn btn-small ml-1 transparent text-darken-app' onClick={(e)=>this.sortSurveys(e,'body')}>Content{this.state.buttonsFlags.body ? <i className="material-icons right">arrow_upward</i>:<i className="material-icons">arrow_downward</i>}</button></li>
                        
                        </ul>
                        </div>
                        <div className='col s6'>
                            <label>Find a campaign</label>
                            <input onInput={(e)=>this.filterSurveys(e)} type='text'/>
                        </div>
                    </div>
                
                {this.state.workSurveys.map((survey,index)=>
                <div className='' key={index}>
                <div className='col xs12 m6'>
                    <div className='card ' key = {index}>
                    <div className='card-content'>
                    <div>
                        <span className='card-title'>
                        {new Date(survey.dateSent).toLocaleDateString()}
                        <button className='btn-small right red' onClick={()=>this.removeSurveys(survey._id)}>X</button>
                        
                        </span>
                        
                    </div>
                    
                            <div>
                                <span className='bold col xs12 m5' >Campaign name</span>
                                <span className='subject col xs12 m7'> {survey.title}</span>
                            </div>
                            <div>
                                <span className='bold col xs12 m5' >Subject</span>
                                <span className='subject col xs12 m7'> {survey.subject}</span>
                            </div>
                            <div>
                                <span className='bold col xs12 m5'>Content</span> 
                                <span className='subject col xs12 m7'>{survey.body}</span>
                            </div>
                            <div>
                                <span className='bold col xs12 m5 red-text'>Yes {survey.yes}</span>
                            </div>
                            <div className='row'>
                                <span className='bold col xs12 m4 red-text'>No {survey.no}</span>
                            </div>
                        
                        <div className='card-action'>
                            {/* <button className='btn-floating wave left yellow'><i className='material-icons'>edit</i></button> */}
                        </div>

                    </div>
                    </div>
                </div>
                </div>
                )}
                
                
                <div className="fixed-action-btn">
                    <Link to='/surveys/new'className="btn-floating btn-large red">
                        <i className="large material-icons red">add</i>
                    </Link>
                </div>
            </div>
        )}
        else{
               return (             
                <Loader></Loader>
               )
        }
    }
    
}

function mapStateToProps(state){
    
    return{
        surveys:state.surveys,
        auth:state.auth
    }
}
export default connect(mapStateToProps,actions)(SurveyList);