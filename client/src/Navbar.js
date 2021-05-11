import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';


class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    onClickLogin(e){
        e.preventDefault()
        this.props.history.push('/login');
    }

    onClickEdit(e){
        e.preventDefault();
        this.props.history.push('/edit-profile');
    }

    onClickLogout(username){
        axios.post(`http://localhost:8000/user/logout`, { username })
      .then(res => {
        sessionStorage.removeItem('better-token');
        sessionStorage.removeItem('better-userDetails');
        this.props.history.push('/');
      })
      .catch( err => {
            alert(`We're sorry, we were unable to log you in, please try again later`);
      })
    }


    render(){
        const isLoggedIn = sessionStorage.getItem('better-token');
        let userDetails = sessionStorage.getItem('better-userDetails');
        if(userDetails){
            userDetails = JSON.parse(userDetails);
        }
        return (
            <div className="w3-top">
                <div className="w3-bar w3-white w3-padding w3-card" style={{letterSpacing: '4px'}}>
                  <a href="/" className="w3-bar-item w3-button">Better product</a>
                  {/* Right-sided navbar links. Hide them on small screens */}
                  <div className="w3-right w3-hide-small">
                    { !isLoggedIn ? 
                        <a  className="w3-bar-item w3-button" onClick={this.onClickLogin}>Login</a>
                    : 
                    <div>
                    <span className="w3-bar-item ">Hello {userDetails.username}</span>
                    <a className="w3-bar-item w3-button" onClick={this.onClickEdit}>Edit profile</a>
                    <a className="w3-bar-item w3-button" onClick={() => this.onClickLogout(userDetails.username)}>Logout</a>

                    </div>
                     }
                    
                  </div>
                </div>
              </div>
        )
    }
  }



export default  withRouter(Navbar)