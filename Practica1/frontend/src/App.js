import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import './App.css'

export default function App() {
  const [cambio, setCambio] = useState(true);
  const [texts, setText] = useState('View');
  const [procedimiento, setprocedimiento] = useState(' ');
  const [resultado, setresultado] = useState(' ');
  const [bandera, setBandera] = useState(true);
  const [logs, setLogs] = useState([
    {
      Id: 1,
      Numero1: 1,
      Operador: '+',
      Numero2: 2,
      Resultado: 3,
      Fecha: '2021-01-01 10:12:20'
    },
    {
      Id: 2,
      Numero1: 3,
      Operador: '-',
      Numero2: 3,
      Resultado: 6,
      Fecha: '2021-01-01 10:12:20'
    }
  ]);
  const [operacion, setOperacion] = useState({
    Numero1: 0,
    Operador: '',
    Numero2: 0
  })


  // Almacenamiento de Numeros
  const handlechange = (evnt) => {
    bandera ?
      (operacion.Numero1 = parseInt(operacion.Numero1 + evnt.target.value))
      :
      (operacion.Numero2 = parseInt(operacion.Numero2 + evnt.target.value))
    setprocedimiento(operacion.Numero1 + ' ' + operacion.Operador + ' ' + operacion.Numero2)
  }

  //almacenamiento de operaciones
  const handleoperacion = (evnt) => {
    setBandera(false)
    operacion.Operador = evnt.target.value;
    setprocedimiento(operacion.Numero1 + ' ' + operacion.Operador + ' ' + operacion.Numero2)
  }

  //limpiar calculadora
  const limpiar = () => {
    setBandera(true);
    operacion.Numero1 = 0;
    operacion.Numero2 = 0;
    operacion.Operador = '';
    setresultado(' ');
    setprocedimiento(' ');
  }

  //Realizar operacion
  const RealizarOperacion = async () => {
    try {
      let configuration = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(operacion),
      }
      let respuesta = await fetch('http://'+ process.env.REACT_APP_API_URL +':4000/resolver', configuration)
      let json = await respuesta.json();
      setresultado(json.resultado)
      operacion.Numero1 = 0;
      operacion.Numero2 = 0;
      operacion.Operador = '';
      setBandera(true)
    } catch (error) {
      console.log(error);
    }
  }

  //Realizar operacion
  const ViewLogs = async () => {
    try {
      let configuration = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let respuesta = await fetch('http://'+ process.env.REACT_APP_API_URL +':4000/logs', configuration)
      let json = await respuesta.json();
      console.log("Resultado logs")
      console.log(json)
      setLogs(json)
      setCambio(!cambio)
    } catch (error) {
      console.log(error);
    }
  }


  //generar reporte 
  const Generar_reporte = () => {
    try {
      const a = document.createElement("a");
      var contenido = "";
      for (var x of logs) {
        contenido += x.Id +";"+x.Numero1+";"+x.Numero2+";%"+x.Operador+"%;"+x.Resultado+";"+x.Fecha+"\n";
      }
      const archivo = new Blob([contenido], { type: 'text/plain' });
      const url = URL.createObjectURL(archivo);
      a.href = url;
      a.download = "script";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {

    }
  }

  //Realizar operacion


  return (
    <div id="App">
      <h1>Practica 1</h1>
      <div id="cuerpohtml">
        <div id="calculadora">
          <center>
            <div id="notch"></div>
            <div id="pantalla">
              <input type="text" id="resultado" readOnly value={resultado}></input>
              <input type="text" id="operacion" readOnly value={procedimiento}></input>
            </div>
            <div id="cuerpo">
              <div className='arreglobotones'>
                <button className='tiponum' onClick={handlechange} value='7'>7</button>
                <button className='tiponum' onClick={handlechange} value='8'>8</button>
                <button className='tiponum' onClick={handlechange} value='9'>9</button>
                <button className='tipoop' onClick={handleoperacion} value="X">x</button>
              </div>
              <div className='arreglobotones'>
                <button className='tiponum' onClick={handlechange} value='4'>4</button>
                <button className='tiponum' onClick={handlechange} value='5'>5</button>
                <button className='tiponum' onClick={handlechange} value='6'>6</button>
                <button className='tipoop' onClick={handleoperacion} value="-">-</button>
              </div>
              <div className='arreglobotones'>
                <button className='tiponum' onClick={handlechange} value='1'>1</button>
                <button className='tiponum' onClick={handlechange} value='2'>2</button>
                <button className='tiponum' onClick={handlechange} value='3'>3</button>
                <button className='tipoop' onClick={handleoperacion} value="+">+</button>
              </div>
              <div className='arreglobotones'>
                <button className='tipoop' onClick={limpiar}>CE</button>
                <button className='tiponum' onClick={handlechange} value='0'>0</button>
                <button className='tipoop' onClick={handleoperacion} value="/">/</button>
                <button className='tipoop' onClick={RealizarOperacion}>=</button>
              </div>
              <div className='arreglobotones'>
                {cambio ? (
                  <button className='tipolog' onClick={ViewLogs}>View logs</button>
                ) : (
                  <button className='tipolog2' onClick={() => { setCambio(!cambio) }}>Hide logs</button>
                )
                }
              </div>
            </div>
          </center>
        </div>
        <div id="logs">
          {
            cambio ? (
              <div>
                <h2>Docker</h2>
                <p>Docker empaqueta software en “contenedores” que incluyen en ellos todo lo necesario para que dicho software se ejecute, incluidas librerías. Con Docker se puede implementar y ajustar la escala de aplicaciones de una forma rápida en cualquier entorno con la garantía de que el código se ejecutará.
                  A primera vista se piensa en Docker como una especie de máquina virtual “liviana”, pero la verdad no lo es. En Docker no existe un hypervisor que virtualice hardware sobre el cual corra un sistema operativo completo. En Docker lo que se hace es usar las funcionalidades del Kernel para encapsular un sistema, de esta forma el proyecto que corre dentro de el no tendrá conocimiento que está en un contenedor. Los contenedores se encuentran aislados entre sí y se comportaran como máquinas independientes.
                  Iniciar un contenedor no tiene un gran impacto a diferencia de iniciar una máquina virtual ya que no tiene que iniciar un sistema operativo completo (desde cero). Gracias al uso de contenedores la demanda de recursos baja limitándose sólo al consumo de la aplicación que contenga. Un contenedor inicia en milisegundos.</p>
              </div>

            ) : (
              <div >
                <h2>Logs</h2>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Numero1</th>
                      <th>Numero2</th>
                      <th>Operador</th>
                      <th>Resultado</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      logs.map((log, index) => (
                        <tr key={index}>
                          <td>{log.Id}</td>
                          <td>{log.Numero1}</td>
                          <td>{log.Numero2}</td>
                          <td>{log.Operador}</td>
                          <td>{log.Resultado}</td>
                          <td>{log.Fecha}</td>
                        </tr>
                      )
                      )
                    }
                  </tbody>
                </table>
                <br />
                <br />
                <center>
                  <button id="Reporte" onClick={Generar_reporte}>Gererar reporte</button>
                </center>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
