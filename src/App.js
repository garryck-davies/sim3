import React, { Component } from 'react';
import Nav from './component/Nav/Nav';
import './App.css';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
      {routes}
      </div>
    );
  }
}

export default App;
