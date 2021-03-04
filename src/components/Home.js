import React, { Component, createRef } from 'react'
import {Header, Divider, Segment, Card, Container, Statistic, Message, Grid, Image, Menu, Sticky, Tab} from 'semantic-ui-react'
import SideNav from './SideNav'
import About from './About'
import Contact from './Contact'
import Education from './Education'
import Programming from './Programming'
import Projects from "./Projects";
import { getVisitorCount } from '../actions/actions'

class Home extends Component {
  contextRef = createRef();
  constructor(props) {
    super(props);
    this.state = {
      visitorCount : "Loading",
      activeIndex: -1
    }
  }

  handleTitleClick = (e, titleProps) => {
    const { index } = titleProps;
    const activeIndex = this.state.activeIndex;
    const newIndex = (activeIndex === index ? -1 : index);
    this.setState({activeIndex : newIndex})
  }

  componentDidMount() {
    document.title="Home";
    getVisitorCount(res => {
      this.setState({visitorCount: res})
      });
  }

  panes = [
    {
      menuItem: "About",
      render: () => <Tab.Pane><About /></Tab.Pane>
    },
    {
      menuItem: "Education",
      render: () => <Tab.Pane><Education /></Tab.Pane>
    },
    {
      menuItem: "Code",
      render: () => <Tab.Pane><Programming /></Tab.Pane>
    },
    {
      menuItem: "Projects",
      render: () => <Tab.Pane><Projects /></Tab.Pane>
    },
    {
      menuItem: "Contact",
      render: () => <Tab.Pane><Contact /></Tab.Pane>
    },
  ]

  render() {
    let name = "Sriram's Website";
    return (
        <Segment>
        <Container>
          <Tab panes={this.panes} />
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
        </Segment>
    )
  }
}

export default Home;
