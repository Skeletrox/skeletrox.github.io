import React, { Component } from 'react'
import {Grid, Header, Container, Divider, List, Segment, Image, Menu, Button} from 'semantic-ui-react'
import SideNav from './SideNav'
import SpotifyPlayer from "react-spotify-player";

const styles = {
  quoteStyle : {
    textAlign : 'center',
    fontStyle : 'italic',
    fontSize : '20px'
  },
  quoteAuthor : {
    textAlign : 'right',
  }
}

class About extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title="About";
  }

  render() {
    let something = `I dread this question not because I fear it, but because I wonder what angle I need to approach this from, and what this person wants from this answer. Does he want to know if I'm a team player? Does she want to know my tastes in music? Does the panel want my autobiography?`
    let somethingPt2 = `Since you've taken the trouble of opening my website, I'll explain everything.`
    return (
        <SideNav>
          <Container>
            <Header as='h1'>About Me</Header>
            <Divider></Divider>
            <p style = {styles.quoteStyle}> "L'uomo vera portato dalla sua creazione, Come gli uccelli verso il cielo, Riempendo l'universo di stupore e gloria."<div style={styles.quoteAuthor}>-Leonardo da Vinci</div></p>
            <Divider horizontal>End obligatory quote</Divider><br />
            <div align="center">
              <Button basic color={"blue"} href={require('../pdf/CV_Masters_common.pdf')}>Skip to CV</Button>
            </div><br />
            <Divider horizontal>Summary</Divider>
            <p>
              <List bulleted>
                <List.Item>
                  Digital Development Lead, USC Annenberg Media
                </List.Item>
                <List.Item>
                  SDE Intern, AWS Redshift
                </List.Item>
                <List.Item>
                  Graduate Student pursuing Master of Science in Computer Science (Data Science) at the USC Viterbi School of Engineering
                </List.Item>
                <List.Item>
                  Computer Science and Engineering Graduate
                </List.Item>
                <List.Item>
                  Mr. Fresher 2014, Mr. RACIT 2015
                </List.Item>
                <List.Item>
                  Co-Founder of GLUG-REVA, Oracle Certified Associate in Java Programming.
                </List.Item>
              </List>
            </p>
            <p style={styles.quoteStyle}> <br />
              "Tell me something about yourself."
            </p>
            <p>
              {something}<br /><br />{somethingPt2}
            </p>
            <Segment stacked>
              <Header as='h2'>Who am I?</Header>
              <p>
                { `Grad Student. Writes code like calligraphy. Creatively inspired by video game soundtracks. Builds whatever catches his liking.`}
              </p>
              <Divider horizontal>{`Coding Prowess Aside:`}</Divider>
              <p>
                <Grid stackable divided columns={2} verticalAlign='middle'>
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <Segment raised><SpotifyPlayer uri={"spotify:playlist:5nnhRf4wfc69giaL5eQX0D"}
                                                     size={"compact"}
                                                     view={"list"}
                                                     theme={"black"}
                      /></Segment>
                    </Grid.Column>
                    <Grid.Column width={11}>
                      <Header as={'h3'}>{`Music Enthusiast`}</Header>
                      <p>
                        {`I'm exploiting my Spotify Premium as much as possible.`}
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <Header as={'h3'}>{`Civilization VI Fanatic`}</Header>
                      <p>
                        {`I won't invade you. I'll just enforce attrition to your loyalty. Please safeguard your great works too!`}
                      </p>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Segment raised><Image src={require('../img/civ.jpg')} /></Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Segment raised><Image src={require('../img/minecraft.png')} /></Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                    <Header as={'h3'}>{`Minecraft Civil Engineer`}</Header>
                    <p>
                      {`Ever heard of builder's block?`}
                    </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <Grid.Column width={12}>
                    <Header as={'h3'}>{`Mr. Fresher 2014, REVA University`}</Header>
                    <p>
                      {`What happens when you try something out just for the sake of it, and then ace it?`}
                    </p>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Segment raised><Image src={require('../img/fresher.jpg')} /></Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Segment raised><Image src={require('../img/halo.jpg')} /></Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                    <Header as={'h3'}>{`Halo Fan`}</Header>
                    <p>
                      {`From loving the music to loving the game, this is one of my favorite games, and something I `}<i>{`urge`}</i>{` everyone to try!`}
                    </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <Grid.Column width={12}>
                    <Header as={'h3'}>{`Musician`}</Header>
                    <p>
                      {`When your entire family is arguing over whether it is Karaharapriya or Shanmukhapriya and you're wondering whether to use Poizone or Harmor`}
                    </p>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Segment raised><Image src={require('../img/music.jpg')} /></Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>
                </Grid>
              </p>
            </Segment>
          </Container>
        </SideNav>
    )
  }
}

export default About;
