import React, { Component } from 'react'
import { Grid, Container, Header, Divider, List, Table, Accordion, Icon, Label, Card, Tab, Statistic, Segment } from 'semantic-ui-react'
import SideNav from './SideNav'


let greScores = [
  ['325', '340', '90th+', 'Total'],
  ['166', '170', '91st ', 'Quantitative'],
  ['159', '170', '83rd', 'Verbal Ability'],
  ['5.5', '6', '98th', 'Analytical Writing']
]

let toeflScores = [
  ['115', '120', 'Total'],
  ['30', '30', 'Reading'],
  ['29', '30', 'Listening'],
  ['27', '30', 'Speaking'],
  ['29', '30', 'Writing']
]


class Education extends Component {


  constructor(props) {
    super(props);
    this.state = {
      activeIndex : -1
    }
  }

  handleClick = (e,  titleProps) => {
    const { index } = titleProps;
    const activeIndex  = this.state.activeIndex;
    const newIndex = (activeIndex === index ? -1 : index);
    this.setState({activeIndex : newIndex});
  }

  navigateTo = (e, titleProps) => {
    const target = titleProps.target;
     this.refs[target].scrollIntoView();
  }

  componentDidMount() {
    document.title="Education";
  }

  panes = [
    {menuItem : 'Education & Experience', render : () => <Tab.Pane>{this.renderEducationDetails()}</Tab.Pane>},
    {menuItem : 'Others', render : () => <Tab.Pane style={{minHeight:'100%'}}>{this.renderTestScoreDetails()}</Tab.Pane>}
  ]

  renderTestScoreDetails() {
    let greGrid = greScores.map((score, index) =>
      <Grid.Column>
        <Grid columns = {2} divided centered verticalAlign='middle'>
          <Grid.Column>
            <Statistic>
              <Statistic.Value>
                {score[0]}
              </Statistic.Value>
              <Statistic.Label>Out of {score[1]}</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column>
          <Header as={'h4'}>{score[3]} Score</Header>
          <div><Divider></Divider><Header as={'h4'}>{score[2]} Percentile</Header></div>
          </Grid.Column>
        </Grid>
      </Grid.Column>)

    let toeflGrid = toeflScores.map((score, index) =>
    <Grid.Column>
      <Grid columns = {2} divided centered verticalAlign='middle'>
        <Grid.Column width={9}>
          <Statistic>
            <Statistic.Value>
              {score[0]}
            </Statistic.Value>
            <Statistic.Label>Out of {score[1]}</Statistic.Label>
          </Statistic>
        </Grid.Column>
        <Grid.Column width={7}>
          <Header as={'h4'}>{score[2]}</Header>
        </Grid.Column>
      </Grid>
    </Grid.Column>)
    return (
      <Container>
        <Segment raised>
          <Header as={'h1'}>Test Scores</Header>
          <Divider></Divider>
          <Header as={'h2'}>Graduate Record Examination[GRE]</Header>
          <Divider></Divider>
          <Grid columns = {4} stackable divided verticalAlign='middle' textAlign='center' relaxed>
            <Grid.Row>
              {greGrid}
            </Grid.Row>
            </Grid>
            <Divider></Divider>
            <Header as={'h2'}>Test Of English as a Foreign Language [TOEFL]</Header>
            <Divider></Divider>
            <Grid columns = {5} stackable divided verticalAlign='middle' textAlign='center' >
            <Grid.Row>
              {toeflGrid}
            </Grid.Row>
          </Grid>
        </Segment>
        <Divider></Divider>
        <Segment raised>
          <Header as={'h1'}>Certifications</Header>
          <Card.Group stackable>
              <Card
                href='https://www.youracclaim.com/badges/f2fa6ea5-64d6-4c84-92d8-457b78cacf25'
                target='_blank'
                header =  'Oracle Certified Associate in Java Programming SE8'
                description = 'Core Java Exam including OOP, Interfaces and Lambda Functions'
                meta = '68%'
                color = 'red'/>
            <Card
              color = 'orange'
              meta = '83.75%'
              header = 'NASSCOM Certified Software Professional'
              description = 'Industry-Grade certification involving ethical corporate practices'/>
          </Card.Group>
        </Segment>
        <Segment raised>
            <Header as={'h1'}>Publications</Header>
        <Card.Group stackable>
            <Card
            href={require('../pdf/openrap_paper.pdf')}
            target='_blank'
            color = 'orange'
            meta = 'PDF'
            header = 'Paper Publication'
            description = 'Paper on OpenRAP published in IJACSR'/>
        </Card.Group>
        </Segment>
        <Segment raised>
          <Header as={'h1'}>Resources</Header>
          <Divider></Divider>
          <Card.Group stackable>
              <Card
                href={require('../pdf/CV_Masters_common.pdf')}
                target='_blank'
                header =  'CV'
                description = 'Curriculum Vitae'
                meta = 'PDF'
                color = 'blue'/>
              <Card
                href={require('../pdf/ICAECC_-_2018_paper_70.pdf')}
                target='_blank'
                color = 'teal'
                meta = 'PDF'
                header = 'ICAECC 2018 Paper Submission'
                description = 'Paper Submitted for ICAECC 2018, REVA University'/>

                <Card
                  href={require('../pdf/openrap_acit.pdf')}
                  target='_blank'
                  color = 'green'
                  meta = 'PDF'
                  header = 'ACIT 2018 Conference Paper'
                  description = 'Conference paper for ACIT 2018'/>
          </Card.Group>
        </Segment>

      </Container>
    )
  }

  renderEducationDetails() {
    let activeIndex = this.state.activeIndex;
    return (
        <Container>
          <Header as={'h1'}>Education</Header>
          <Divider></Divider>
          <Grid stackable columns={4}>
            <Grid.Row>
              <Grid.Column>
                <Card
                  image={require('../img/school_image.jpg')}
                  header={<Header as={'h5'}>KV MG Railway Colony</Header>}
                  meta='High School'
                  description='Graduated 2012'/>
              </Grid.Column>
              <Grid.Column>
              <Card
                image={require('../img/high_school_image.jpg')}
                header= {<Header as={'h5'}>St. Joseph's PU College</Header>}
                meta='Senior Secondary School'
                description='Graduated 2014'/>
              </Grid.Column>
              <Grid.Column>
              <Card
                image={require('../img/ug_image.jpg')}
                header={<Header as={'h5'}>REVA University</Header>}
                meta='Undergraduate'
                description='Graduated 2018'/>
              </Grid.Column>
              <Grid.Column>
                <Card
                  image={require('../img/gs_image.png')}
                  header={<Header as={'h5'}>University of Southern California</Header>}
                  meta='Grad School'
                  description='Graduating 2021'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider></Divider>
          <div ref='gs'>
              <Header as={'h2'}>Graduate School</Header>
              <List bulleted>
                <List.Item>
                  {`University of Southern California, Los Angeles`}
                </List.Item>
                <List.Item>
                  {'2019-2021'}
                </List.Item>
                <List.Item>
                  {'Degree : Master of Science in Computer Science'}
                </List.Item>
              </List>
          </div>
          <Divider></Divider>
          <div ref='ug'>
          <Header as={'h2'}>Undergraduate</Header>
          <List bulleted>
            <List.Item>
              {`REVA University, Bengaluru`}
            </List.Item>
            <List.Item>
              {`2014-2018`}
            </List.Item>
            <List.Item>
              {`Degree : Bachelor of Technology`}
            </List.Item>
            <List.Item>
              {`Major : Computer Science and Engineering`}
            </List.Item>
          </List>
              <Accordion>
                <Accordion.Title active={activeIndex === 0} index={0} onClick = {this.handleClick}>
                <Icon name='dropdown' />{`Semester-wise breakup of scores`}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Semester</Table.HeaderCell>
                      <Table.HeaderCell>GPA</Table.HeaderCell>
                      <Table.HeaderCell>{`GPA Adjusted to 4.0`}</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon><Header as={'h3'}>1</Header></Label>
                      </Table.Cell>
                      <Table.Cell>
                      <Header as={'h3'}>8.82</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>3.75</Header>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon><Header as={'h3'}>2</Header></Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>9.45</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>3.94</Header>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon><Header as={'h3'}>3</Header></Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>9.04</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>3.84</Header>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon><Header as={'h3'}>4</Header></Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>8.64</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>3.62</Header>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon><Header as={'h3'}>5</Header></Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>8.46</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>3.52</Header>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon><Header as={'h3'}>6</Header></Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>8.68</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>3.66</Header>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon><Header as={'h3'}>7</Header></Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>9.38</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>3.89</Header>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon><Header as={'h3'}>8</Header></Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>10.0</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h3'}>4.0</Header>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon color='teal'><Header as={'h3'}>Cumulative</Header></Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h2'}>9.03</Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as={'h2'}>3.76</Header>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                </Accordion.Content>
              </Accordion>
              </div>
              <Divider></Divider>
              <div ref='ssschool'>
                <Header as={'h2'}>{`Senior Secondary School`}</Header>
                <List bulleted>
                  <List.Item> {`St. Joseph's Pre-University College`} </List.Item>
                  <List.Item> {`2012-2014`} </List.Item>
                  <List.Item> {`Combination: Physics, Chemistry, Mathematics, Computer Science`} </List.Item>
                  <List.Item> {`Language: French`} </List.Item>
                  <List.Item> {`92.16%`} </List.Item>
                </List>
              </div>
              <Divider></Divider>
              <div ref='hschool'>
                <Header as={'h2'}>{`High School`}</Header>

                <List bulleted>
                  <List.Item> {`Kendriya Vidyalaya MG Railway Colony`} </List.Item>
                  <List.Item> {`2002-2012`} </List.Item>
                  <List.Item> {`Combination: Science, Social Studies, Mathematics, English`} </List.Item>
                  <List.Item> {`Language: Sanskrit`} </List.Item>
                  <List.Item> {`CGPA 10/10`} </List.Item>
                </List>
              </div>
              <Divider></Divider>
                <Header as={'h1'}>Experience</Header>
                <Divider></Divider>
                <Segment raised>
                  <Header as={'h2'}>Professional</Header>
                  <Divider></Divider>
                  <Header as={'h3'}>Oracle UI/UX Tester</Header>
                  <List bulleted>
                    <List.Item><p>{`March 2017`}</p></List.Item>
                    <List.Item><p>{`Tested Oracle University's Online Learning System`}</p></List.Item>
                  </List>
                  <Header as={'h3'}>Intern, Pinut</Header>
                  <List bulleted>
                    <List.Item><p>{`June 2017 - August 2017`}</p></List.Item>
                    <List.Item><p>{`Worked on OpenRAP v1, built using Django`}</p></List.Item>
                  </List>
                  <Header as={'h3'}>Development Intern, Pinut</Header>
                  <List bulleted>
                    <List.Item><p>{`January 2018 - June 2018`}</p></List.Item>
                    <List.Item><p>{`Worked on OpenRAP v2, built using NodeJS and ReactJS`}</p></List.Item>
                  </List>
                  <Header as={'h3'}>Intern, AiKaan labs</Header>
                  <List bulleted>
                    <List.Item><p>{`March 2018 - June 2018`}</p></List.Item>
                    <List.Item><p>{`Worked on Packet Flow Analytics for anomaly detection`}</p></List.Item>
                  </List>
                  <Header as={'h3'}>Network Analytics Engineer, AiKaan labs</Header>
                  <List bulleted>
                    <List.Item><p>{`July 2018 - June 2019`}</p></List.Item>
                    <List.Item><p>{`Extracting, analyzing and training models built using TensorFlow on network-based data from a variety of sources, including FreeRadius, InfluxDB and Packetflow`}</p></List.Item>
                  </List>
                </Segment>
                <Divider></Divider>
                <Segment raised>
                  <Header as={'h2'}>{`Extracurricular`}</Header>
                  <Divider></Divider>
                  <Header as={'h3'}>Co-Founder, GLUG-REVA </Header>
                  <List bulleted>
                    <List.Item><p>{`October 2016`}</p></List.Item>
                    <List.Item><p>{`GNU-Linux User Group of REVA University`}</p></List.Item>
                    <List.Item><p>{`Have taken sessions on Python and git, and prepare assessments.`}</p></List.Item>
                  </List>
                  <Header as={'h3'}>REVA University Skill Development Program</Header>
                  <List bulleted>
                    <List.Item><p>{`November 2017`}</p></List.Item>
                    <List.Item><p>{`Took Sessions on Shell Scripting and Linux fundamentals`}</p></List.Item>
                  </List>
                  <Header as={'h3'}>Vice Chairperson, REVA Association for Computing and Information Technology</Header>
                  <List bulleted>

                    <List.Item><p>{`August 2016 - May 2017`}</p></List.Item>
                    <List.Item><p>{`Helped organize the Interschool fest and coordinated the Coding Contest`}</p></List.Item>
                  </List>
                </Segment>
                <Divider></Divider>
                <Segment raised>
                  <Header as={'h2'}>{`Hackathons`}</Header>
                  <Divider></Divider>
                  <Header as={'h3'}>{`AWS Deep Learning Hackathon, IIT Madras`}</Header>
                  <List bulleted>
                  <List.Item><p>{`Top 6`}</p></List.Item>
                    <List.Item><p>{`January 2018`}</p></List.Item>
                    <List.Item><p>{`Object detection using transfer learning`}</p></List.Item>
                  </List>
                  <Header as={'h3'}>{'Smart India Hackathon'}</Header>
                  <List bulleted>
                  <List.Item><p>{`7th Place`}</p></List.Item>
                    <List.Item><p>{`March 2018`}</p></List.Item>
                    <List.Item><p>{`Smart home analytics using statistical machine learning`}</p></List.Item>
                  </List>
                </Segment>
        </Container>

    )
  }

  render() {
    return (
      <SideNav>
        <Container>
          <Tab panes = {this.panes}/>
        </Container>
      </SideNav>
    )
  }
}

export default Education;
