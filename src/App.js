import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Education from './components/Education'
import Programming from './components/Programming'
import SocialMedia from './components/SocialMedia'
import NoMatch from './components/NoMatch'

let allowedPaths = [
  '/',
  '/about',
  '/projects',
  '/education',
  '/programming',
  '/socialmedia',
]



class App extends Component {

  componentWillMount() {
    if (allowedPaths.indexOf(window.location.pathname) === -1) {
      window.location.href = 'http://' + window.location.host + '/';
    }
  }
  render() {
    return (
     <div className="App" style={{ height : '100%' }}>
        <BrowserRouter>
          <div style={{ height : '100%' }}>
            <div><Route exact path={'/'} component={Home} />
            <Route exact path={'/about'} component={About} />
            <Route exact path={'/projects'} component={Projects} />
            <Route exact path={'/education'} component={Education} />
            <Route exact path={'/programming'} component={Programming} />
            <Route exact path={'/socialmedia'} component={SocialMedia} /></div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
