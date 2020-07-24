import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './payments';
import Loader from './loader/loader';


class Header extends Component { 
    constructor(props){
        super(props);
        this.state={}
    }
    renderContent(){
        
        switch(this.props.auth){
            case null :return  <li><Loader></Loader></li>
            case false:return [<li className='right' key='google'><a href='/auth/google'><i className="fa fa-google right small"></i></a></li>,
                               <li className='right' key='linkedin'><a href='/auth/linkedin'><i className="fa fa-linkedin-square right small"></i></a></li>,
                               <li className='right' key='gitb'><a href='/auth/github'><i className="fa fa-github right small"></i></a></li>,
                               
                            ]
            default: return [
                                
                                <li className='text-light-app ml-1' key ='credits'>Credits: {this.props.auth.credits}</li>,
                                <li className='text-light-app ml-1' key ='surveys'><Link to='/surveys'><span className='text-light-app'> Surveys</span></Link></li>,
                                <li className='text-light-app ml-1' key ='payments'><Payments/></li> ,
                                <li className='text-light-app right ml-1 logOut' key ='logout'><a href='/api/logout'>Log out</a></li>,
                	        ]
        }
    }
    
    render(){
        return(
            <nav className='transparent no-shadows' >
            <div className='nav-wrapper '>
            
            
                <ul className=" text-light-app">
                {
                this.props.auth
                ?<li className='mr-5'>Welcome, {this.props.auth.displayName}</li>
                : <span></span>
            }
                    {this.renderContent()}
                </ul>
            </div>
        </nav>
        )	} 
 } 
function mapStateToProps(auth){
    return auth
    
}
 export default connect(mapStateToProps)(Header);
