import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Segment, Menu, Icon, Header } from 'semantic-ui-react'

let pageNames = {
  '/' : "Sriram's Website",
  '/about' : 'About',
  '/education' : 'Education',
  '/projects' : 'Projects',
  '/programming' : 'Programming',
  '/socialmedia' : 'Social Media'
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
    let name = "Sriram's Website";
    return (
      <Sidebar.Pushable style={{ height : '100%' }}>
        <Sidebar as={Menu} animation='push' width='thin' visible={this.state.visible} icon='labeled' vertical inverted style={{ height : '100%' }}>
            <Menu.Item name='home' as={Link} to={'/'}>
              <Icon name='home'  color={window.location.pathname === '/' ? 'teal' : ''}/>
              Home
            </Menu.Item>
            <Menu.Item name='about' as={Link} to={'/about'}>
              <Icon name='user' color={window.location.pathname === '/about' ? 'teal' : ''} />
              About
            </Menu.Item>
            <Menu.Item name='education' as={Link} to={'/education'}>
              <Icon name='student' color={window.location.pathname === '/education' ? 'teal' : ''}/>
              Education
            </Menu.Item>
            <Menu.Item name='projects' as={Link} to={'/projects'}>
              <Icon name='code' color={window.location.pathname === '/projects' ? 'teal' : ''}/>
              Projects
            </Menu.Item>
            <Menu.Item name='programming' as={Link} to={'/programming'}>
              <Icon name='terminal' color={window.location.pathname === '/programming' ? 'teal' : ''}/>
              Programming Skills
            </Menu.Item>
            <Menu.Item name='socialmedia' as={Link} to={'/socialmedia'}>
              <Icon name='world' color={window.location.pathname === '/socialmedia' ? 'teal' : ''}/>
              Social Media
            </Menu.Item>
            <Menu.Item name='repo' href='https://www.github.com'>
              <Icon name='github' color='red'/>
              View Page Source
            </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher style={{ height : '100%' }}>
          <Menu fixed='top' inverted>
              <Menu.Item name='bars' onClick={this.toggleSideBarVisibility.bind(this)}>
                  <Icon name='bars' />
              </Menu.Item>
              <Menu.Item name='heading'>
                <Header as='h3' inverted>{pageNames[window.location.pathname]}</Header>
              </Menu.Item>
          </Menu>
          <div style={{paddingTop : '5%', paddingBottom : '5%'}}>
            {this.props.children}
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );

  }

}

export default SideNav;
