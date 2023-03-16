import { React, useState, useEffect,useRef } from 'react'
import './App.css'
import Process from './components/Proceso.jsx'
import { getCPU, getRAM } from './api/getmodules';

import { Col, Nav, Row, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import react-circular-progressbar module and styles
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export default function App() {
  const delay = 5;
  const [info_cpu, setCPU] = useState([]);
  const timer = useRef(null);
  const [info_ram, setRAM] = useState({
    RAM: 16112712,
    FREE: 2637416,
    USADA: 83,
    Cores: 7,
    Threads: 24,
    Actual_thread: 8
  });
  var usada = (info_ram.Utilizada) / (1024 * 1024)
  const fGetCPU = async () => {
    try {
      var query = await getCPU();
      var result = await query.json();
      //console.log(result.Procesos)
      setCPU(result.Procesos);
    } catch (e) {
      console.log(e)
    }
  }

  const fGetRAM = async () => {
    try {
      var query = await getRAM();
      var result = await query.json();
      //console.log(result)
      setRAM(result);
    } catch (e) {
      console.log(e)
    }
  }

  const fgetInfo = async ()=>{
    try {
      var query = await getRAM();
      var result = await query.json();
      setRAM(result);

      query = await getCPU();
      result = await query.json();
      setCPU(result.Procesos);
    } catch (e) {
      console.log(e)
    }
  }

useEffect(()=>{
  //let timer1 = setTimeout(() => , delay * 1000);
  timer.current = setInterval(fgetInfo, delay * 1000);

  return () => {
    clearTimeout(timer.current);
  };
},[]);

  /*useEffect(function () {
    //fGetCPU();
    setTimeout(fGetRAM, 10000)
    //setTimeout(fGetCPU, 10000)
  })*/




  return (
    <div>
      <div id='Encabezado'>
        <h1>Task Management</h1>
      </div>
      <div id='Graficas'>
        <div id="Contenedor_grafica">
          <center><h3>RAM</h3></center>
          <CircularProgressbar className='tam_grafica'
            value={info_ram.USADA}
            text={`${info_ram.USADA}%`}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              pathColor: "#23d2dd", //circulo
              strokeLinecap: "butt",
              trailColor: "#eee" //fondo
            })} />
          <center>
            <h4>{usada.toFixed(2) + "Gb/" + (info_ram.RAM / (1024 * 1024)).toFixed(2) + "Gb"}</h4>
            <h4>{"Libre: " + (info_ram.FREE / (1024 * 1024)).toFixed(2) + "Gb"}</h4>
          </center>
        </div >

        <div id="Contenedor_grafica">
          <center><h3>CPU</h3></center>
          <CircularProgressbar className='tam_grafica'
            value={(info_ram.Actual_thread).toFixed(1)}
            text={`${(info_ram.Actual_thread).toFixed(1)}%`}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              pathColor: "#dc2d22", //circulo
              strokeLinecap: "butt",
              trailColor: "#eee" //fondo
            })} />
            <center>
            <h4>{"Cores: "+info_ram.Cores}</h4>
            <h4>{"Total Threads: "+info_ram.Threads}</h4>
          </center>
        </div >
      </div>
      <br />
      <br />
      <div id='Procesos'>
        <div id='P_execute' className='Tipe_process'>
          <center><h4>En ejecucion</h4></center>
          {//running, zombie, stoped, sleep
          }
          {
            info_cpu.map((process, index) => {
              if (process.statep === "0") {
                return (
                  <Process key={process.idp} type="running" idp={process.idp} name={process.nproceso} ram={process.ramp} userp={process.userp} />
                )
              }
            })
          }

        </div>
        <div id='P_zombie' className='Tipe_process'>
          <center><h4>Zombie</h4></center>
          {
            info_cpu.map((process, index) => {
              if (process.statep === "4") {
                return (
                  <Process key={process.idp} type="zombie" idp={process.idp} name={process.nproceso} ram={process.ramp} userp={process.userp} />
                )
              }
            })
          }
        </div>
        <div id='P_stoped' className='Tipe_process'>
          <center><h4>Detenido</h4></center>
          {
            info_cpu.map((process, index) => {
              if (process.statep === "8") {
                return (
                  <Process key={process.idp} type="stoped" idp={process.idp} name={process.nproceso} ram={process.ramp} userp={process.userp} />
                )
              }
            })
          }
        </div>
        <div id='P_sleep' className='Tipe_process'>
          <center><h4>Suspendido</h4></center>
          {
            info_cpu.map((process, index) => {
              if (process.statep === "1" || process.statep === "1026") {
                return (
                  <Process key={process.idp} type="sleep" idp={process.idp} name={process.nproceso} ram={process.ramp} userp={process.userp} />
                )
              }
            })
          }
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
                {
                  info_cpu.map((process, index) => {
                    if (process.hijos != "") {
                      return (
                        <Nav.Item key={process.idp}>
                          <Nav.Link key={process.idp} eventKey={process.nproceso + process.idp}>{process.nproceso + process.idp}</Nav.Link>
                        </Nav.Item>
                      )
                    }
                  })
                }
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {
                  info_cpu.map((process, index) => {
                    if (process.hijos !== "") {
                      return (
                        <Tab.Pane key={index} eventKey={process.nproceso + process.idp}>
                          <div id='Process_child_space'>
                            {process.hijos.map((hijos, indexx) => {
                              switch (hijos.hestado) {
                                case "1":
                                  return (
                                    <Process key={hijos.hid} type="sleep" idp={hijos.hid} name={hijos.hnombre} ram={hijos.hram} userp={process.userp} />
                                  )
                                case "1026":
                                  return (
                                    <Process key={hijos.hid} type="sleep" idp={hijos.hid} name={hijos.hnombre} ram={hijos.hram} userp={process.userp} />
                                  )
                                case "0":
                                  return (
                                    <Process key={hijos.hid} type="running" idp={hijos.hid} name={hijos.hnombre} ram={hijos.hram} userp={process.userp} />
                                  )
                                case "4":
                                  return (
                                    <Process key={hijos.hid} type="zombie" idp={hijos.hid} name={hijos.hnombre} ram={hijos.hram} userp={process.userp} />
                                  )
                                case "8":
                                  return (
                                    <Process key={hijos.hid} type="stoped" idp={hijos.hid} name={hijos.hnombre} ram={hijos.hram} userp={process.userp} />
                                  )
                              }
                            })}
                          </div>
                        </Tab.Pane>
                      )
                    }
                  })
                }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>


      </div>

    </div>
  )
}

