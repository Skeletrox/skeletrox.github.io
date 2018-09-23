import React, { Component } from 'react'
import { Container, Segment, Header } from 'semantic-ui-react'
import SideNav from './SideNav'

class NoMatch extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title='404';
  }

  render() {
    return (
      <SideNav>
        <Container>
          <Segment>
            <Header as={'h1'}>Page Not Found.</Header>
            <Header as={'h3'}>Fooling around with the URL again?</Header>
          </Segment>
        </Container>
      </SideNav>
    )
  }
}

export default NoMatch;
