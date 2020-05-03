import React, { Component } from 'react'
import { Grid, Header, Divider, Segment , Card, Container, Statistic } from 'semantic-ui-react'
import SideNav from './SideNav'
import { getVisitorCount } from '../actions/actions'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitorCount : 0
    }
  }

  componentDidMount() {
    document.title="Home";
    getVisitorCount(res => {
      this.setState({visitorCount: res})
      })

  }

  render() {
    let name = "Sriram's Website"
    return (
      <SideNav>
        <Container>
          <Segment>
          <Header as='h1'> Welcome to {name} </Header>
          <Divider></Divider>
          <Header as='h3'>Use the sidebar or click on any of the below cards to visit individual pages.</Header>

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
                    description = 'High School, Tertiary Education and Certifications'/>

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
                    href='/contact'
                    image = {require('../img/socialmedia.jpg')}
                    color = 'blue'
                    header = 'Contact'
                    meta = 'Contact Me'
                    description = 'Ways to contact me and find me on Social Media' />
            </Card.Group>
          </Segment>
          <Segment>
            <Header as='h2'> You are visitor number: </Header>
              <Card.Group
                centered
              >
                <Card
                  color="olive"
                >
                  <Statistic>
                    <Statistic.Value>
                      {this.state.visitorCount}
                    </Statistic.Value>
                    <Divider> 
                    </Divider>
                    <Statistic.Label>Built using my first ever Heroku app</Statistic.Label>
                  </Statistic>
                </Card>
              </Card.Group>
          </Segment>
          </Container>
      </SideNav>
    )
  }
}

export default Home;
