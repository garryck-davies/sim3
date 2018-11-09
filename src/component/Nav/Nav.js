import React from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import './Nav.css';


function Nav() {

    return(
        <div className="nav-container">
            <div className="nav-links">
            <Link to='/dashboard'>
               <button>Home</button>
            </Link>
            <Link to='/new'>
                <button>New Post</button>
            </Link>
            <Link to='/' >
            <button>Logout</button>
            </Link>
            </div>
        </div>
    )
}

export default withRouter(Nav)