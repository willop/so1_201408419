import { React, useState, useEffect } from 'react'
import { Table, Dropdown, ListGroup } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcBarChart } from "react-icons/fc";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2';



//socket
import io from "socket.io-client";
var dir = process.env.REACT_APP_API_URL || "http://localhost" 
const socket = io.connect(dir+":5000");

ChartJS.register(
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ArcElement
);


export default function App() {
  //Inicio
  useEffect(() => {
    function recibir_mensaje(message) {
      //onsole.log(JSON.parse(message))
      if (message != null) {
        //console.log(JSON.parse(message))
        setDataReporte1(JSON.parse(message))
      }

    }
    function reporte2(message2) {
      //console.log(JSON.parse(message2))
      if(message2 != null) {
      setDataGrafica(JSON.parse(message2))
      }
    }

    function reporte3(message3) {
      //console.log(JSON.parse(message3))
      setDataGraficaR3(JSON.parse(message3))
    }

    function reporte4(message4) {
      if (message4 != null) {
        //console.log(JSON.parse(message4))
        setDataGraficaR4(JSON.parse(message4))
      }
    }

    function reporte5(message5) {
      if (message5 != null) {
        setDataGraficaR5(message5)

      }
    }

    function fechaac(messa) {
      if (messa != null) {
        //console.log(messa)
        setFechaActual(messa);
        
      }
    }

    socket.on("receive_message", recibir_mensaje);
    socket.on("reporte2", reporte2);
    socket.on("reporte3", reporte3);
    socket.on("reporte4", reporte4);
    socket.on("reporte5", reporte5);
    socket.on("fecha", fechaac);
    return () => {
      socket.off("receive_message", recibir_mensaje);
      socket.off("reporte2", reporte2);
      socket.off("reporte3", reporte3);
      socket.off("reporte4", reporte4);
      socket.off("reporte5", reporte5);
      socket.off("fecha", fechaac);
    }
  }, [socket]);



  //data para graficas
  //REPORTE 1
  const [datareporte1, setDataReporte1] = useState([{"id":1,"Sede":44,"Departamento":"Peten","Municipio":"Las flores","Paleta":"Blanca","Partido":"VAMOS","Fuente":"MySQL"},{"id":2,"Sede":44,"Departamento":"Peten","Municipio":"Las flores","Paleta":"Blanca","Partido":"VAMOS","Fuente":"MySQL"}])
  const [fechaactual, setFechaActual] = useState("");
  const [dataGrafica, setDataGrafica] = useState([{ "Departamento": "Guatemela", "votos": 4 }, { "Departamento": "Guatemela", "votos": 4 }]);
  const [dataGraficaR3, setDataGraficaR3] = useState([{ "Departamento": "Guatemela", "votos": 4 }, { "Departamento": "Guatemela", "votos": 4 }]);
  const [dataGraficaR4, setDataGraficaR4] = useState([{ "Sede": 33, "votos": 41 }, { "Sede": 50, "votos": 4 }]);
  const [dataGraficaR5, setDataGraficaR5] = useState([
    { "sede": 7614, "departamento": "Izabal", "municipio": "Izabal", "paleta": "Blanca", "partido": "VAMOS" },
    { "sede": 98, "departamento": "Izabal", "municipio": "Izabal", "paleta": "Blanca", "partido": "VAMOS" }
  ]);


  var datass = {
    labels: dataGrafica.map(o => o.Departamento),
    datasets: [
      {
        label: 'Cantidad de votos',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderColor: 'rgb(0, 255, 0)',
        borderWidth: 1,
        data: dataGrafica.map(o => o.votos)
      }
    ]
  }
  var optionsss = {
    plugins: {
      title: {
        display: true,
        text: 'Bar Chart'
      }
    }
  }

  var dataR4 = {
    labels: dataGraficaR4.map(o => "Sede " + o.Sede),
    datasets: [
      {
        label: "Votos",
        backgroundColor: 'rgba(220,53,69,0.2)',
        borderColor: 'rgb(220,53,69)',
        borderWidth: 1,
        data: dataGraficaR4.map(o => o.votos)
      }
    ]
  }

  var optionReporte4 = {
    plugins: {
      title: {
        display: true,
        text: 'Bar Chart'
      }
    }
  }

  var optionsss = {
    plugins: {
      title: {
        display: true,
        text: 'Bar Chart'
      }
    }
  }

  const datapie = {
    labels: dataGraficaR3.map(o => o.Departamento),
    datasets: [
      {
        label: '# de Votos',
        data: dataGraficaR3.map(o => o.votos),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };



  return (
    <div>
      <div id="Encabezado">
        <center><h1><FcBarChart /> ELECCIONES</h1></center>
      </div>
      <br />
      <br />
      <br />
      <div>
      <h3>Fecha: {fechaactual}</h3>
      <br />
      <br />
      </div>
      <div id="FRow">
        <div id="Tabla">
          <br />
          <h3>Recopilacion de datos almacenados en MySQL</h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Sede</th>
                <th>Municipio</th>
                <th>Departamento</th>
                <th>Papeleta</th>
                <th>Partido</th>
              </tr>
            </thead>
            <tbody>
              {
                datareporte1.map((Fila, index) => {
                  return (
                    <tr key={index} >
                      <td>{Fila.id}</td>
                      <td>{Fila.Sede}</td>
                      <td>{Fila.Municipio}</td>
                      <td>{Fila.Departamento}</td>
                      <td>{Fila.Paleta}</td>
                      <td>{Fila.Partido}</td>
                    </tr>
                  )
                }
                )
              }
            </tbody>
          </Table>
        </div>
        <div id="TopDepartamentos">
          <br />
          <h3>Top 3 departamentos con mayores votos para presidentes, en MySQL.</h3>
          <center>
            <Bar data={datass} options={optionsss} />
          </center>
        </div>
      </div>

      <br /><br />
      <div id="GraficoCircular">
        <br />
        <h3>Grafico circular del porcentaje de votos por partido segun municipio y departamento</h3>
        <Dropdown>
          <Dropdown.Toggle variant="success">
            Departamento
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="GraficoCircular">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <center>
          <Pie data={datapie} />

        </center>
      </div>
      <br /><br />
      <div id="VotosSedes">
        <br />
        <h3>Grafico de barras que muestre las 5 sedes con mayores votos almacenados en Redis</h3>
        <center>
          <Bar data={dataR4} options={optionReporte4} />
        </center>

      </div>
      <br /><br />
      <div id="UltimosVotos">
        <h3>Ultimos 5 votos almacenados en Redis</h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Sede</th>
              <th>Departamento</th>
              <th>Municipio</th>
              <th>Papeleta</th>
              <th>Partido</th>
            </tr>
          </thead>
          <tbody>
            {
              dataGraficaR5.map((elemento, key) => {
                return (
                  <tr key={key}>
                      <td>{elemento.sede}</td>
                      <td>{elemento.departamento}</td>
                      <td>{elemento.municipio}</td>
                      <td>{elemento.paleta}</td>
                      <td>{elemento.partido}</td>
                    </tr>
                )
              })
            }
          </tbody>
    </Table>

      </div>
      <br /><br />
    </div>
  )
}

