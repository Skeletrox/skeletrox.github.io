import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Container, Header, Divider, Icon, Button, Segment, Card, Input, TextArea, Form, Label, Popup } from 'semantic-ui-react'
import SideNav from './SideNav'
import facebook from '../img/facebook.png'
import soundcloud from '../img/soundcloud.png'
import medium from '../img/medium.svg'
import linkedin from '../img/linkedin.png'
import steam from '../img/steam.jpg'
import github from '../img/github.jpg'

let sms = [
  ["Facebook", "https://www.facebook.com/Chaosbane", facebook],
  ["GitHub", "https://www.github.com/Skeletrox", github],
  ["Medium", "https://medium.com/@skeletrox", medium],
  ["LinkedIn", "https://www.linkedin.com/in/sriram-ramaswamy-5584a3137/", linkedin],
  ["Steam", "http://steamcommunity.com/id/skeletrox/home", steam],
  ["Soundcloud", "https://soundcloud.com/sriram-ramaswamy", soundcloud],
]
class SocialMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from : '',
      subject : '',
      body : '',
      fromError : false,
      subjectError : false,
    }
  }

  handleFromChange(e) {
    this.setState({from : e.target.value})
  }

  handleSubjectChange(e) {
    this.setState({subject : e.target.value})
  }

  handleBodyChange(e) {
    this.setState({body : e.target.value})
  }

  handleEmailSubmit() {
    let fromError = this.state.from.length < 1;
    let subjectError = this.state.subject.length < 1;
    if (!(fromError || subjectError)) {
      let from = this.state.from;
      let body = this.state.body;
      let subject = this.state.subject;
      let string = 'mailto:sriram.rmswmy@gmail.com';
      let emailBody1 = "Email from " + from + " with message:\n\n";
      let emailBody2 = body;
      let emailBody = encodeURIComponent(emailBody1+emailBody2);
      let preparedEmailString = (string+'?subject='+subject+"&body="+emailBody);
      window.open(preparedEmailString);
    } else {
      alert('Cannot send email!');
    }
    this.setState({fromError, subjectError});
  }

  render() {
    let smCards = sms.map((site, index) =>
      <Card
        href={site[1]}
        target='_blank'
        image={site[2]}
        header={site[0]}
        />)
    return (
      <SideNav>
        <Container>
          <Header as={'h1'}>
            Social Media
          </Header>
          <Divider></Divider>
          <Card.Group itemsPerRow={sms.length} stackable>
              {smCards}
          </Card.Group>
          <Header as={'h1'}>
            Contact Me!
          </Header>
          <Segment raised>
            <Label ribbon color='teal'><p>{`Your name:`}</p></Label><br /><br />
            <Input onChange = {this.handleFromChange.bind(this)} fluid placeholder={this.state.fromError ? "This field is required." : "From"} error={this.state.fromError}/>
            <Divider></Divider>
            <Label ribbon color='blue'><p>{`Subject:`}</p></Label><br /><br />
            <Input onChange = {this.handleSubjectChange.bind(this)} fluid placeholder={this.state.fromError ? "This field is required." : "Subject"} error={this.state.subjectError}/>
            <Divider></Divider>
            <Form>
            <Label ribbon color='teal'><p>{`Email Body:`}</p></Label><br /><br />
            <TextArea onChange = {this.handleBodyChange.bind(this)} placeholder='Body' /><br /><br />
            <div style={{textAlign:'center'}}>
              <Button basic color='blue' animated onClick={this.handleEmailSubmit.bind(this)}>
                <Button.Content visible>
                  <p as={'h3'}>{`Send mail!`}</p>
                </Button.Content>
                <Button.Content hidden>
                  <Icon name='send outline' size='large'/>
                </Button.Content>
              </Button>
            </div>
            </Form>
          </Segment>
        </Container>
      </SideNav>
    )
  }
}

export default SocialMedia;
