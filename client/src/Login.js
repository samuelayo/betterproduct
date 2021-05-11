import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Field from './Field';

import { formStyle, submitStyle } from './Form.css';

const Form = ({onSubmit}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={usernameRef} label="Username:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <div>
          <button style={submitStyle} type="submit">Submit</button>
        </div>
      </form>
    );
};

const appStyle = {
    height: '250px',
    display: 'flex'
};


class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {

      axios.post(`http://localhost:8000/user/login`, data)
      .then(res => {
        const response = res.data;
        sessionStorage.setItem('better-token', response.token);
        sessionStorage.setItem('better-userDetails', JSON.stringify(response.userDetails))
        this.props.history.push('/');
      })
      .catch( err => {
          console.log(err)
          const errResponse = err && err.response && err.response.data;
          if(errResponse && errResponse.message.includes('Username or Password incorrect')){
            alert(`Username or Password is incorrect`);
          }else{
            alert(`We're sorry, we were unable to log you in, please try again later`);
          }
      })
    };
    render(){
        return (
            <div style={appStyle}>
              <Form onSubmit={this.handleSubmit} />
            </div>
          );
    }
  }

export default withRouter(Login);