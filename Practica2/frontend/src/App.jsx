import React from 'react'
import './App.css'
import {Col, Nav, Row, Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import react-circular-progressbar module and styles
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Process from './components/Proceso.jsx'

export default function App() {
  return (
    <div>
      <div id='Encabezado'>
        <h1>Task Management</h1>
      </div>
      <div id='Graficas'>
        <div id="Contenedor_grafica">
          <CircularProgressbar className='tam_grafica'
            value={10}
            text={`${10}%`}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              pathColor: "#23d2dd", //circulo
              strokeLinecap: "butt",
              trailColor: "#eee" //fondo
            })} />
          <center><h3>RAM</h3></center>
        </div >
        <div id="Contenedor_grafica">
          <CircularProgressbar className='tam_grafica'
            value={10}
            text={`${10}%`}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              pathColor: "#dc2d22", //circulo
              strokeLinecap: "butt",
              trailColor: "#eee" //fondo
            })} />
          <center><h3>CPU</h3></center>
        </div >
      </div>

      <div id='Procesos'>
        <div id='P_execute' className='Tipe_process'>
          <center><h4>En ejecucion</h4></center>
          {//running, zombie, stoped, sleep
          }
          <Process type="running" idp='1234' name='Proceso 1' ram='13' userp='0' />
          <Process type="zombie" idp='6765' name='Proceso 2' ram='123' userp='1000' />
          <Process type="stoped" idp='45' name='Proceso 3' ram='1453' userp='0' />
          <Process type="sleep" idp='45' name='Proceso 3' ram='1453' userp='1000' />
        </div>
        <div id='P_zombie' className='Tipe_process'>
          <center><h4>Zombie</h4></center>
        </div>
        <div id='P_stoped' className='Tipe_process'>
          <center><h4>Detenido</h4></center>
        </div>
        <div id='P_sleep' className='Tipe_process'>
          <center><h4>Suspendido</h4></center>
        </div>
      </div>
      <br />
      <br />
      <br />
      <center><h1>Procesos hijo</h1></center>
      <div id='Procesos_hijo'>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Tab 1</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>


      </div>

    </div>
  )
}

