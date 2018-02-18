import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Education from './components/Education'
import Programming from './components/Programming'
import SocialMedia from './components/SocialMedia'

class App extends Component {
  render() {
    return (
      <div className="App" style={{ height : '100%' }}>
        <BrowserRouter>
          <div style={{ height : '100%' }}>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/about'} component={About} />
            <Route exact path={'/projects'} component={Projects} />
            <Route exact path={'/education'} component={Education} />
            <Route exact path={'/programming'} component={Programming} />
            <Route exact path={'/socialmedia'} component={SocialMedia} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
