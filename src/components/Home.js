import React, { Component } from 'react'
import { Grid, Header, Divider, Segment , Card, Container } from 'semantic-ui-react'
import SideNav from './SideNav'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let name = "Sriram's Website"
    return (
      <SideNav>
        <Container>
          <Segment>
          <Header as='h1'> Welcome to {name}! </Header>
          <Divider></Divider>
          <Header as='h3'>Feel free to use the sidebar or click on any of the below cards to visit!</Header>

          <br />
          <br />
            <Card.Group stackable centered itemsPerRow={3}>
                  <Card
                    href = '/about'
                    image = {require('../img/about.jpg')}
                    color = 'blue'
                    header = 'Who am I?'
                    meta = 'Introduction'
                    description = 'What I think of myself'/>

                  <Card
                    href = '/education'
                    image = {require('../img/education.jpg')}
                    color = 'blue'
                    header = 'Where did I study?'
                    meta = 'Educational Details'
                    description = 'High School, Undergrad and Certifications'/>

                  <Card
                    href = '/programming'
                    image = {require('../img/programming.jpg')}
                    color = 'blue'
                    header = 'What can I do?'
                    meta = 'Coding skills'
                    description = 'Breakdown of what and how I code'/>

                  <Card
                    href = '/projects'
                    image = {require('../img/projects.jpg')}
                    color = 'blue'
                    header = 'What have I made?'
                    meta = 'Projects'
                    description = 'Whatever I have built'/>

                  <Card
                    href='/socialmedia'
                    image = {require('../img/socialmedia.jpg')}
                    color = 'blue'
                    header = 'Why am I always online?'
                    meta = 'Social Media'
                    description = 'Links to my various social media profiles' />
            </Card.Group>
          </Segment>
          </Container>
      </SideNav>
    )
  }
}

export default Home;
