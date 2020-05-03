import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Sidebar, Menu, Icon, Header, Container, Responsive, Divider} from 'semantic-ui-react'

let pageNames = {
  '/' : "Home",
  '/about' : 'About',
  '/education' : 'Education',
  '/projects' : 'Projects',
  '/programming' : 'Programming',
  '/contact' : 'Contact'
}

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible : false
    }
  }

  toggleSideBarVisibility(){
        this.setState({
            visible : !this.state.visible
        })
  }

  render() {
    let activeColor = 'blue';
    let passiveColor = 'black';
    return (
      <Sidebar.Pushable style={{ height : '100%' }}>
        <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical style={{ height : '100%' }}>
            <Menu.Item name='home' as={Link} to={'/'}>
              <Icon name='home' color={window.location.pathname === '/' ? activeColor : passiveColor}/>
              Home
            </Menu.Item>
            <Menu.Item name='about' as={Link} to={'/about'}>
              <Icon name='user' color={window.location.pathname === '/about' ? activeColor : passiveColor} />
              About
            </Menu.Item>
            <Menu.Item name='education' as={Link} to={'/education'}>
              <Icon name='student' color={window.location.pathname === '/education' ? activeColor : passiveColor}/>
              Education
            </Menu.Item>
            <Menu.Item name='projects' as={Link} to={'/projects'}>
              <Icon name='code' color={window.location.pathname === '/projects' ? activeColor : passiveColor}/>
              Projects
            </Menu.Item>
            <Menu.Item name='programming' as={Link} to={'/programming'}>
              <Icon name='terminal' color={window.location.pathname === '/programming' ? activeColor : passiveColor}/>
              Programming Skills
            </Menu.Item>
            <Menu.Item name='contact' as={Link} to={'/contact'}>
              <Icon name='address card outline' color={window.location.pathname === '/contact' ? activeColor : passiveColor}/>
              Contact
            </Menu.Item>
            <Divider></Divider>
            <Divider></Divider>
            <Divider></Divider>
            <Menu.Item name='repo' href='https://github.com/Skeletrox/skeletrox.github.io' target='_blank'>
              <Icon name='github' color='green'/>
              View Page Source
            </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher style={{ height : '100%' }}>
          <Menu fixed='top' color={'black'} tabular>
              <Menu.Item name='bars' onClick={this.toggleSideBarVisibility.bind(this)}>
                  <Icon name='bars' />
              </Menu.Item>
              <Menu.Item name='heading'>
                <Header as='h3' >{pageNames[window.location.pathname]}</Header>
              </Menu.Item>
          </Menu>
          <Responsive as={Container} style={{paddingTop : '5%', paddingBottom : '5%'}} minWidth={640}>
            {this.props.children}
          </Responsive>
          <Responsive as={Container} style={{paddingTop : '15%', paddingBottom : '5%'}} maxWidth={640}>
            {this.props.children}
          </Responsive>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );

  }

}

export default SideNav;
