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
      let respuesta = await fetch('http://localhost:4000/resolver', configuration)
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
        let respuesta = await fetch('http://localhost:4000/logs', configuration)
        let json = await respuesta.json();
        console.log("Resultado logs")
        console.log(json)
        setLogs(json)
        setCambio(!cambio) 
      } catch (error) {
        console.log(error);
      }
    }

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
                  <button className='tipolog2' onClick={() => {setCambio(!cambio)}}>Hide logs</button>
                )
                }
              </div>
            </div>
          </center>
        </div>
        <div id="logs">
          {
            cambio ? (
              <h2>Info de Docker</h2>
            ) : (
              <div>
                <h2>Table</h2>
                <table striped bordered hover>
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
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
