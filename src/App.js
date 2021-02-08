import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Education from './components/Education'
import Programming from './components/Programming'
import Contact from './components/Contact'
import NoMatch from './components/NoMatch'

let allowedPaths = [
  '/',
  '/about',
  '/projects',
  '/education',
  '/programming',
  '/contact',
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
            <Route path={'/about'} component={About} />
            <Route path={'/projects'} component={Projects} />
            <Route path={'/education'} component={Education} />
            <Route path={'/programming'} component={Programming} />
            <Route path={'/contact'} component={Contact} /></div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
