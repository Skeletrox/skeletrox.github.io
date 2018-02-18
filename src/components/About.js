import React, { Component } from 'react'
import { Grid, Header, Container, Divider, List, Segment, Image } from 'semantic-ui-react'
import SideNav from './SideNav'

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

  render() {
    let something = `I dread this question not because I fear it, but because I wonder what angle I need to approach this from, and what this person wants from this answer. Does he want to know if I'm a team player? Does she want to know my tastes in music? Does the panel want my autobiography?`
    let somethingPt2 = `Since you've taken the trouble of opening my website, I'll explain everything.`
    return (
        <SideNav>
          <Container>
            <Header as='h1'>About Me</Header>
            <Divider></Divider>
            <p style = {styles.quoteStyle}> "The greatest happiness for the thinking man is to have fathomed the fathomable, and to quietly revere the unfathomable."<div style={styles.quoteAuthor}>-Johann Wolfgang von Goethe</div></p>
            <Divider horizontal>End obligatory quote</Divider><br /><br />
            <p>
              <List bulleted>
                <List.Item>
                  Eight Semester CSE Student at REVA University, Bangalore.
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
                {`Eighth semester CSE Student. Writes code like calligraphy. Creatively inspired by video game soundtracks. Builds whatever catches his liking.`}
              </p>
              <Divider horizontal>{`Coding Prowess Aside:`}</Divider>
              <p>
                <Grid stackable divided columns={2} verticalAlign='middle'>
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <Header as={'h3'}>{`Civilization V Fanatic`}</Header>
                      <p>
                        {`I'm yet to play a game where my ideology is Freedom and the rest don't look to impose an embargo on me.`}
                      </p>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Segment raised><Image src={require('../img/civ.jpg')} /></Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Segment raised><Image src={require('../img/minecraft.jpg')} /></Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                    <Header as={'h3'}>{`Minecraft Civil Engineer`}</Header>
                    <p>
                      {`Nothing is more relaxing than building whatever your mind dreams of. Or riding your horse across the plain and slaying zombies while listening to Urtiin Duu [The Mongol War Theme]. Sometimes, I build contraptions and traps or maybe just some logic gates. While listening to music. Obviously.`}
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
                      <Segment raised><Image src={require('../img/about.jpg')} /></Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Segment raised><Image src={require('../img/csgo.jpg')} /></Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                    <Header as={'h3'}>{`CS:GO Bot Dominator`}</Header>
                    <p>
                      {`Not many of my friends play CS:GO. If you do, add me on Steam!`}
                    </p>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <Grid.Column width={12}>
                    <Header as={'h3'}>{`Ethical Hacker`}</Header>
                    <p>
                      {`You can call yourself one if you can kick your friends out of their Mini Militia hotspot because they're being annoying. Or because you're just trying to be evil.`}
                    </p>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Segment raised><Image src={require('../img/hacking.jpg')} /></Segment>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider></Divider>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Segment raised><Image src={require('../img/music.jpg')} /></Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                    <Header as={'h3'}>{`Musician`}</Header>
                    <p>
                      {`When your entire family is arguing over whether it is Karaharapriya or Shanmukhapriya and you're wondering whether to use Poizone or Harmor`}
                    </p>
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
