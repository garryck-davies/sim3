import React, { Component } from "react";
import {updateUser} from './../../dux/reducer';
import { connect } from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {

    async componentDidMount() {
        let res = await axios.get('/api/user-data');
        console.log(res);
        this.props.updateUser(res.data)
    }

    render() {
        let {user}= this.props;
        return(
            <div>
                Dashboard
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('redux store state: ', state)
    return state
}


export default connect(mapStateToProps, {updateUser})(Dashboard)