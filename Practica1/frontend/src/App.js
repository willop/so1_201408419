import React, { useState } from 'react';
import './App.css'

export default function App() {
  const [procedimiento, setprocedimiento] = useState(' ');
  const [resultado, setresultado] = useState(' ');
  const [bandera, setBandera] = useState(true);
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

  return (
    <div>
      <h1>Practica 1</h1>
      <center>
        <div id="calculadora">
          <div id="notch"></div>
          <div id="vacio"></div>
          <div id="pantalla">
            <input type="text" id="resultado" readOnly value={resultado}></input>
            <input type="text" id="operacion" readOnly value={procedimiento}></input>

          </div>
          <div id="cuerpo">
            <div className='arreglobotones'>
              <button className='tiponum' onClick={handlechange} value='7'>7</button>
              <button className='tiponum' onClick={handlechange} value='8'>8</button>
              <button className='tiponum' onClick={handlechange} value='9'>9</button>
              <button className='tipoop' onClick={handleoperacion} value="X">X</button>
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
          </div>
          <div id="vacio"></div>
        </div>
      </center>
    </div>
  )
}
