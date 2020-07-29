import React, { Component } from 'react'
import { Grid, Container, Divider, Header, Segment, Card, Button, Icon } from 'semantic-ui-react'
import SideNav from './SideNav'
import openrap from '../img/openrap.jpg'
import vasscrypt from '../img/vasscrypt.jpg'
import cryptopass from '../img/cryptopass.jpg'
import btpp from '../img/btpp.jpg'
import bella from '../img/analytics.jpg'
import bfinterpreter from '../img/bfinterpreter.jpg'
import resqos from '../img/resqos.png'
import appliances from '../img/appliances.png'
import hussar from '../img/hussar.png'
import geforce from '../img/nvidia-geforce-gtx-logo.png'
import blackjack from '../img/blackjack.png'
import torcs from '../img/torcs.png'

let projectArray = [
    ['Docker-TORCS', 'Distributed RL System', 'Distributed System that runs TORCS on headless docker for RL applications', 'https://github.com/Skeletrox/docker-torcs', torcs],
    ['Blackjack Bot', 'Explorations into Reinforcement Learning', 'Adversarial AI that uses Q-Learning to effectively strategize Blackjack', 'https://github.com/Skeletrox/blackjackbot', blackjack],
    ['Halma Hussar', 'Grad School Assignment','C++ based agent that plays Halma (a variation of checkers) featuring a custom scoring function',  'https://github.com/Skeletrox/halma-hussar', hussar],
    ['SMI Reporter', 'Side Project', 'Polls the NVIDIA-SMI tool in order to get GPU usage stats and alerts the user through a bot', 'https://github.com/Skeletrox/smi_reporter', geforce],
    ['ResQoS', 'Resource-centric QoS', 'QoS alloactor based on content accessed', 'https://github.com/Skeletrox/ResQoS', resqos],
    ['Appliance Simulator', 'Simulator for Appliance use', 'Simulates usage of appliances across different rooms', 'https://github.com/Skeletrox/appliance-generator', appliances],
    ['OpenRAP', 'Offline CDN for Low-Power Devices', 'Open-Source framework for low-powered IoT servers useful in areas with minimal connectivity', 'https://github.com/projectOpenRAP/OpenRAP', openrap],
    ['Bella-Middleware', 'Analytics engine for Bella, a smart home assistant', 'Smart India Hackathon 2018 Entry', 'https://github.com/NullPointersInc/Bella-Middleware', bella],
    ['VASSCrypt', 'Mini-Project on Cryptography', 'System independent Encrypted File Transfer System', 'https://github.com/Skeletrox/FileTransfer', vasscrypt],
    ['CryptoPass', 'Mini Project for Saviskara', 'Localized secure Password Storage System', 'https://github.com/Skeletrox/PassGenJava', cryptopass],
    ['BrainFuck Interpreter', 'Finals Week "Project"', 'BrainFuck interpreter built in Python.', 'https://github.com/Skeletrox/BrainfuckInterpreter', bfinterpreter],
    ['Bass and Treble: Peaks and Plains', 'High School Project', 'Thinkquest International Competition 2011 Entry', 'https://btpp.github.io', btpp],
]


let subProjectArray = [
  ['DFA Verifier', 'Automata Theory', 'Verifies whether a state transition table is correct for a given input of states', 'https://github.com/Skeletrox/college-stuff/blob/master/fafl.c'],
  ['Matrix Generator', 'Engineering Mathematics', 'Generates a matrix using eigenvalues supplied by the user', 'https://github.com/Skeletrox/college-stuff/blob/master/EigenMat.c'],
  ['Matrix Inverter', 'Engineering Mathematics', 'Calculates the inverse of a nxn matrix', 'https://github.com/Skeletrox/college-stuff/blob/master/MatrixInv.c'],
  ['Task Scheduler','Software Engineering and Testing','Calculates the different task parameters for a software project', 'https://github.com/Skeletrox/college-stuff/blob/master/Task.java'],
  ['Net Present Value generator','Software Ethics and Project Management','Calculates the NPV of an investment after deprecation','https://github.com/Skeletrox/college-stuff/blob/master/npv.cc'],
  ['Hand Cricket','First Game','Command-Line Hand Cricket where the computer plays with you','https://github.com/Skeletrox/self-expansion/blob/master/handcricket.java'],
    ['Slots Machine', 'Reinforcement Learning','Simulates slot machine(s) and gets the best possible reward through Reinforcement Learning', 'https://gist.github.com/Skeletrox/fd812a33ad1300e3f1fb42ee086e8486']]
class Projects extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title="Projects";
  }

  render() {
    let projectCards = projectArray.map((item, index) =>
      <Card
      key={index}
      image = {item[4]}
      href={item[3]}
      target='_blank'
      header={item[0]}
      meta={item[1]}
      description={item[2]}
      />
    )

    let subProjectCards = subProjectArray.map((item, index) =>
      <Card
        key={index}
        href={item[3]}
        target='_blank'
        header={item[0]}
        meta={item[1]}
        description={item[2]}
        />
    )

    return (
      <SideNav>
        <Container>
          <Header as={'h1'}>Projects</Header>
          <Divider></Divider>
          <p>{`Whatever I have built and contributed to till date.`}</p>
          <Divider></Divider>
          <Segment raised>
            <Card.Group stackable centered itemsPerRow={2}>
              {projectCards}
            </Card.Group>
          </Segment>
          <Divider></Divider>
          <Header as={'h1'}>SubProjects</Header>
          <Divider></Divider>
          <p>{`Smaller, single-module projects`}</p>
          <Segment raised>
            <Card.Group stackable centered>
              {subProjectCards}
            </Card.Group>
          </Segment>
        </Container>
      </SideNav>
    )
  }
}

export default Projects;
