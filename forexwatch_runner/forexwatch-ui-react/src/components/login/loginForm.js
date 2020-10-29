import React from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { connect } from "react-redux";
import { LOGIN } from '../../sagas/actionTypes'
import {  Redirect } from 'react-router-dom';
export class LoginFormComponent extends React.Component {
    
  constructor() {
      super();
      this.state = {
          username: '',
          password: ''
      };
      this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    
    
    this.props.dispatch({
      type : LOGIN,
      data : this.state
    });
  }

    render() {
      if(this.props.auth.authenticated) {
        console.log('Login successful...');
        return <Redirect to='/dashboard' />
      }
        return (
            <div>
           
              <div className="content-section introduction">
                    <div className="feature-intro">
                    <h1>Login to Forexwatch</h1>
                        
                    </div>
                </div>

                <div className="content-section implementation">
                    <div className="content-section implementation">
                        <span className="p-float-label">
                            <InputText id="float-input" type="text" size="30" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                            <label htmlFor="float-input">Username</label>
                        </span>
                        <br/>
                           <span className="p-float-label">
                            <InputText id="float-input" type="password" size="30" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} />
                            <label htmlFor="float-input">Password</label>
                        </span>
                    </div>
                    <br/>
                    <div className="content-section implementation">
                      <Button label="Login"  onClick={this.handleLogin}/>
                    </div>
                </div>
            </div>
        );  
    }
}

function mapStateToProps(state) {


  return {

    auth: state.authStatus
  };
}

LoginFormComponent =  connect(mapStateToProps)(LoginFormComponent)
export default LoginFormComponent;