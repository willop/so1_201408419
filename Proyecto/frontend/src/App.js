import { React, useState } from 'react'
import { Table } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart } from "react-google-charts";

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
    }
  });


  return (
    <div>
      <h1>Dashboard</h1>
      <br />
      <br />
      <h3>Recopilacion de datos almacenados en MySQL</h3>
      <br />
      <div id="Tabla">
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
      <br />
      <br /><br />
      <div id="TopDepartamentos">
        <h3>Top 3 departamentos con mayores votos para presidentes, en MySQL.</h3>
        <h1>ESTO PUEDE SER UNA TABLA</h1>
        <center>
          <Chart
            chartType="Bar"
            width="80%"
            height="400px"
            data={dataGrafica}
            options={options}
          />
        </center>

      </div>
      <br /><br />
      <div id="GraficoCircular">
        <h3>Grafico circular del porcentaje de votos por partido segun municipio y departamento</h3>


        <center><Chart
          chartType="PieChart"
          width="70%"
          height="400px"
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
        <h3>Grafico de barras que muestre las 5 sedes con mayores votos almacenados en Redis</h3>
        <center>
          <Chart
            chartType="Bar"
            width="80%"
            height="400px"
            data={dataGrafica}
            options={options}
          />
        </center>

      </div>
      <br /><br />
      <div id="UltimosVotos">
        <h3>Ultimos 5 votos almacenados en Redis</h3>
        

      </div>
      <br /><br />
    </div>
  )
}

