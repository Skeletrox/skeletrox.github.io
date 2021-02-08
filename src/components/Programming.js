import React, { Component } from 'react'
import { Grid, Container, Header, Divider, Table, List, Label, Progress, Image, Popup, Segment } from 'semantic-ui-react'
import SideNav from './SideNav'
import c from '../img/c.svg'
import cpp from '../img/c++.png'
import java from '../img/java.png'
import python from '../img/python.png'
import js from '../img/js.png'
import sql from '../img/mysql.png'
import golang from '../img/golang.png'
import nodejs from '../img/nodejs.png'
import reactjs from '../img/reactjs.png'
import django from '../img/django.png'
import tensorflow from '../img/tensorflow.png'
import influx from '../img/influx.svg'
import pytorch from '../img/pytorch-logo.png'
import spark from '../img/spark.svg'

let languages = [
    ['C', 8, 7, 'teal', c],
    ['C++', 8.5, 9.5, 'blue', cpp],
    ['Java', 8, 7, 'orange', java],
    ['Python', 9, 9.5, 'yellow', python],
    ['JavaScript', 8, 5, 'grey', js],
    ['SQL', 7, 8, 'green', sql],
    ['goLang', 8, 9, 'teal', golang],
]

let testedWaters = ['PHP', 'C#', 'Perl', 'Actionscript 2.0', 'NS']

class Programming extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title="Programming";
  }

  render() {
    let skillsTable = languages.map((lang, index) =>
      <Table.Row>
        <Table.Cell collapsing>
          <Popup trigger = {<Label ribbon>
          <Image
            src={lang[4]} size='medium'/>
          </Label>}
          content = {lang[0]}/>
        </Table.Cell>
        <Table.Cell><Progress as={'h3'} percent={lang[1]*100/10} color={lang[3]} /></Table.Cell>
        <Table.Cell ><Progress as={'h3'} percent={lang[2]*100/10} inverted color='violet' /></Table.Cell>
      </Table.Row>)

    let testedList = testedWaters.map((lang, index) => <List.Item><p>{lang}</p></List.Item>)

    return (
        <Container>
            <Grid stackable divided columns={2} verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Segment raised><Image size='large' src={require('../img/programming.jpg')} /></Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Header as={'h1'}>{`Code`}</Header>
                        <p>
                            {`Breakdown of what and how I code`}
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
          <Header as={'h2'}>{`Performance Metrics`}</Header>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Header as={'h3'}>Competence</Header>
                  <List bulleted><List.Item><p>{`Knowledge of basics`}</p></List.Item>
                        <List.Item><p>{`Competency with language-specific features`}</p></List.Item>
                        <List.Item><p>{`Debugging Capability`}</p></List.Item>
                        <List.Item><p>{`Program Understandability`}</p></List.Item>
                  </List>
              </Grid.Column>
              <Grid.Column>
                <Header as={'h3'}>Affinity</Header>
                  <List bulleted><List.Item><p>{`Language Understandability`}</p></List.Item>
                        <List.Item><p>{`Ease of Program Execution`}</p></List.Item>
                        <List.Item><p>{`Environment Setup and IDE Support`}</p></List.Item>
                        <List.Item><p>{`Documentation and Community`}</p></List.Item>
                  </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider></Divider>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Language</Table.HeaderCell>
                <Table.HeaderCell>Competence</Table.HeaderCell>
                <Table.HeaderCell>Affinity</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
              <Table.Body>
                {skillsTable}
              </Table.Body>
          </Table>
          <Divider></Divider>
          <Header as={'h2'}>{`Frameworks I'm comfortable with`}</Header>
          <Divider></Divider><br />
          <Grid stackable columns={4} textAlign='center' relaxed>
            <Grid.Row>
              <Grid.Column>
                <Segment raised circular>
                  <Image src={nodejs} circular size='large'/>
                </Segment>
                <Header as={'h3'}>{`NodeJS`}</Header>
                <div>{`JavaScript based framework for backend server code`}</div>
              </Grid.Column>
              <Grid.Column>
                <Segment raised circular>
                  <Image src={reactjs} circular size='large'/>
                </Segment>
                <Header as={'h3'}>{`ReactJS + Redux`}</Header>
                <div>{`JavaScript based framework for front-end design and global state management system`}</div>
              </Grid.Column>
              <Grid.Column>
                <Segment raised circular>
                  <Image src={django} circular size='large'/>
                </Segment>
                <Header as={'h3'}>{`Django Framework`}</Header>
                <div>{`Python based full stack web server framework`}</div>
              </Grid.Column>
              <Grid.Column>
                <Segment raised circular>
                  <Image src={tensorflow} circular size='large'/>
                </Segment>
                <Header as={'h3'}>{`TensorFlow`}</Header>
                <div>{`Python based neural network framework`}</div>
              </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Segment raised circular>
                    <Image src={influx} circular size='large'/>
                  </Segment>
                  <Header as={'h3'}>{`TICK Stack`}</Header>
                  <div>{`Golang-based timeseries data ETL framework`}</div>
                </Grid.Column>
                <Grid.Column>
                  <Segment raised circular>
                    <Image src={pytorch} circular size='large'/>
                  </Segment>
                  <Header as={'h3'}>{`Pytorch`}</Header>
                  <div>{`Python-based neural net framework`}</div>
                </Grid.Column>
                <Grid.Column>
                  <Segment raised circular>
                    <Image src={spark} circular size='large'/>
                  </Segment>
                  <Header as={'h3'}>{`Spark`}</Header>
                  <div>{`Distributed Data Processing Pipeline`}</div>
                </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider></Divider>
          <Header as={'h2'}>{`I've tested the waters of`}</Header>
          <Divider></Divider>
          <List bulleted>
            {testedList}
          </List>
        </Container>
    )
  }
}

export default Programming;
