import React, { Component } from 'react'
import { Container, Header, Divider, Image, Icon, Button, Segment, Card, Input, TextArea, Form, Label, Modal, Popup} from 'semantic-ui-react'
import SideNav from './SideNav'

let sms = [
  ["https://www.facebook.com/Chaosbane", "facebook", "blue"],
  ["https://www.instagram.com/sriram.rmswmy/", "instagram", "purple"],
  ["https://www.github.com/Skeletrox", "github", "black"],
  ["https://medium.com/@skeletrox", "medium", "black"],
  ["https://www.linkedin.com/in/sriramvera/", "linkedin", "blue"],
  ["http://steamcommunity.com/id/skeletrox/home", "steam", "black"],
  ["https://soundcloud.com/sriram-ramaswamy", "soundcloud", "orange"],

  // <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-buddha" title="Pixel Buddha">Pixel Buddha</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
  ["https://twitter.com/SkeletroxVR", "twitter", "teal"]
]
class Contact extends Component {
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

  componentDidMount() {
    document.title="Contact";
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
    let smIcons = sms.map((site, _) =>
     <Segment href={site[0]} textAlign={'center'}><Icon
        name={site[1]}
        target='_blank'
        size={'large'}
        color={site[2]}
     /></Segment>)
    return (
      <SideNav>
        <Container>
          <Divider></Divider>
          <Header as={'h1'}>
            Contact Me!
          </Header>
          <Segment raised>
            <Header as={'h2'}>
              Reach me at:
            </Header>
            <Segment >
              <Icon name={'phone'} color={'teal'} size={'large'}/>{'+{USA Country Code} ({Los Angeles Area Code}) 453-2725'} <br />
              <Divider />
              <Popup content={"Use the form below to send a quick email"}
                     trigger={<div><Icon
                                name={'mail outline'}
                                color={'teal'}
                                size={'large'}/> {'sriram fullstop rmswmy (shift+2) gmail fullstop com'}</div>} />
              <Divider />
              <Header as={'h3'}>
                Social Media
              </Header>
              <Divider></Divider>
              <Segment.Group horizontal>
                {smIcons}
              </Segment.Group>
            </Segment>
          </Segment>
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

export default Contact;
