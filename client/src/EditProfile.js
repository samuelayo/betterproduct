import React from 'react';
import { withRouter } from 'react-router-dom';
import { formStyle, submitStyle } from './Form.css';
import Navbar from './Navbar';

const appStyle = {
    height: '250px',
    display: 'flex',
    marginTop: '6em'
};


const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px', 
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};


const Field = React.forwardRef(({label, type, defaultValue}, ref) => {
    return (
      <div>
        <label style={labelStyle} >{label}</label>
        <input ref={ref} value = {defaultValue} type={type} style={inputStyle} />
      </div>
    );
});

const Form = ({onSubmit, details}) => {
    const usernameRef = React.useRef();
    const userGroupRef = React.useRef();
    const passwordRef = React.useRef();
    const confirmPasswordRef = React.useRef();
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: usernameRef.current.value,
            userGroup: userGroupRef.current.value, 
            password: passwordRef.current.value
        };
        onSubmit(data);
    };
    return (
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={usernameRef} defaultValue={ details.username} label="Username:" type="text" />
        <Field ref={userGroupRef} defaultValue={details.user_group} label="User Group:" type="text" />
        <Field ref={passwordRef} defaultValue={"xxxxxxx"} label="Password:" type="password" />
        <Field ref={confirmPasswordRef} label="confirm Password:" type="password" />
        <div>
          <button style={submitStyle} type="submit">Submit</button>
        </div>
      </form>
    );
};




class UpdateProfile extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
      const isloggedIn  = sessionStorage.getItem('better-token');
      if(!isloggedIn) this.history.push('/');
      let userDetails = sessionStorage.getItem('better-userDetails')
      userDetails = JSON.parse(userDetails);
      this.setState({userDetails})
    }

    handleSubmit(data) {
      console.log(data)
    };
    render(){
        return (
            <div>
              <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
              <style dangerouslySetInnerHTML={{__html: "\nbody {font-family: \"Times New Roman\", Georgia, Serif;}\nh1, h2, h3, h4, h5, h6 {\n  font-family: \"Playfair Display\";\n  letter-spacing: 5px;\n}\n" }} />
              <Navbar/>
              <div style={appStyle}>
              <br/>
              <br/>
              <br/>
              <Form onSubmit={this.handleSubmit} details={this.state.userDetails} />
              </div>
            </div>
            
          );
    }
  }

export default withRouter(UpdateProfile);