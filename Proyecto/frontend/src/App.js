import { React, useState } from 'react'
import { Table, Dropdown, ListGroup } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart } from "react-google-charts";
import { FcBarChart } from "react-icons/fc";

export default function App() {
  //data para graficas
  const [dataGrafica, setDataGrafica] = useState(
    [
      ["Departamento", "Votos"],
      ["Guatemala", 1500],
      ["Suchitepequez", 180],
      ["Quiche", 500]
    ]
  );

  const [options, setoptions] = useState({
    chart: {
      title: "Reporte de votos para presidente",
      subtitle: "Votos del año 2023",
    },
    series: {
      0: { color: 'rgb(220,53,69)' }
    }
  });


  return (
    <div>
      <div id="Encabezado">
        <center><h1><FcBarChart/> ELECCIONES</h1></center>
      </div>

      <br />
      <br />

      <br />
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
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div id="TopDepartamentos">
          <br />
          <h3>Top 3 departamentos con mayores votos para presidentes, en MySQL.</h3>
          <center>
            <Chart
              chartType="Bar"
              width="85%"
              height="400px"
              data={dataGrafica}
              options={{
                chart: {
                  title: "Reporte de votos para presidente",
                  subtitle: "Votos del año 2023",
                },
                series: {
                  0: { color: 'rgb(13,110,253)' }
                }
              }}
            />
          </center>

        </div>
      </div>

      <br /><br />
      <div id="GraficoCircular">
        <br />
        <h3>Grafico circular del porcentaje de votos por partido segun municipio y departamento</h3>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="0">
            Departamento
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="GraficoCircular">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <center><Chart
          chartArea={{ backgroundColor: 'red' }}
          chartType="PieChart"
          width="80%"
          height="300px"
          data={dataGrafica}
          options={{
            chart: {
              title: "Reporte de votos para presidente",
              subtitle: "Votos del año 2023",
            }
          }}
        /></center>
      </div>
      <br /><br />
      <div id="VotosSedes">
        <br />
        <h3>Grafico de barras que muestre las 5 sedes con mayores votos almacenados en Redis</h3>
        <center>
          <Chart
            chartType="Bar"
            width="80%"
            height="500px"
            colors="#ffffff"
            data={dataGrafica}
            options={options}
          />
        </center>

      </div>
      <br /><br />
      <div id="UltimosVotos">
        <h3>Ultimos 5 votos almacenados en Redis</h3>
        <ListGroup>
          <ListGroup.Item action variant="light">
            <ListGroup horizontal={'xxl'} className="mx-5">
              <ListGroup.Item>This</ListGroup.Item>
              <ListGroup.Item>ListGroup</ListGroup.Item>
              <ListGroup.Item>renders</ListGroup.Item>
              <ListGroup.Item>horizontally!</ListGroup.Item>
            </ListGroup></ListGroup.Item>
          <ListGroup.Item action variant="light">Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item action variant="light">Morbi leo risus</ListGroup.Item>
          <ListGroup.Item action variant="light">Porta ac consectetur ac</ListGroup.Item>
          <ListGroup.Item action variant="light">Porta ac consectetur ac</ListGroup.Item>
        </ListGroup>

      </div>
      <br /><br />
    </div>
  )
}

