import 'materialize-css/dist/css/materialize.min.css';
import React,{Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Routes } from './router/routes';
import  Header  from './elements/header';
import {connect} from 'react-redux';
import * as actions from './actions'
import '../app.css'

class App extends Component { 
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        this.props.fetchUser();
        
    }

    render(){
        return(
            <BrowserRouter>
                <div className='container'>
                    <Header></Header>
                    <Routes></Routes>
                </div>
            </BrowserRouter>
                
        )	} 
 } 
function mapStateToProps(state){
    return {
        auth:state.auth
    }
}
 export default connect(mapStateToProps,actions)(App);