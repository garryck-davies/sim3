import React, { Component } from "react";
import axios from 'axios';
import './Auth.css';
import {connect} from 'react-redux';
class Auth extends Component {

    state = {
        username: '',
        password: ''
    }

    updateUsername(e) {
        this.setState({ username: e.target.value })
      }
    
      updatePassword(e) {
        this.setState({ password: e.target.value })
      }
    
      async login() {
        if (!this.state.username || !this.state.password) return alert('Please fill out username and password.')
        let res = await axios.post('/auth/login', {
          username: this.state.username,
          password: this.state.password
        })
        console.log(res)
        if (res.data.message === 'logged in') {
            this.props.history.push('/dashboard')
        } else {
            alert(res.data.message)
        }
      }
    
      async register() {
        if (!this.state.username || !this.state.password) return alert('Please fill out username and password.')
        let res = await axios.post('/auth/register', {
          username: this.state.username,
          password: this.state.password
        })
        console.log(res)
        if (res.data.message === 'logged in') {
            this.props.history.push('/dashboard')
        }else {
            alert(res.data.message)
        }
      }


  render() {
    return (
      <div className="auth-container">
        <form>
          <div>
            <label>Username:</label>
            <br />
            <input onChange={e => this.updateUsername(e)} type="text" />
          </div>
          <div>
            <label>Password:</label>
            <br />
            <input onChange={e => this.updatePassword(e)} type="text" />
          </div>
          <button onClick={() => this.login()} type="button">
            Login
          </button>
          <button onClick={() => this.register()} type="button">
            Signup
          </button>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
    console.log('redux store state: ', state)
    return state
}


export default connect(mapStateToProps, {})(Auth)