import React from 'react'
import './Proceso.css'
import {GrUserAdmin, GrUser,GrCloudlinux} from 'react-icons/gr'
import { BsFillSignStopFill } from "react-icons/bs";
import { GiShamblingZombie } from "react-icons/gi";
import { MdBedtime } from "react-icons/md";



const Proceso = props => {
  return (
    <div className='comp_process' id={props.type}>
      <table>
        <tr>
          <td width="15%">{props.idp}</td>
          <td width="55%">{props.name}</td>
          <td width="10%">{props.ram}Mb</td>
          {props.userp === '0'?
          <td width="10%"><GrUserAdmin/></td>:
          <td width="10%"><GrUser/></td>}
         <Type_icon type_process={props.type}/>
          
        </tr>
      </table>
    </div>
  )
}

function Type_icon(props) {

  switch (props.type_process) {
    case "running":
      return(
        <div id='icono1'>
        <td><GrCloudlinux/></td>
        </div>  
      )
      case "zombie":
        return(
          <div id='icono2'>
        <td>
          <GiShamblingZombie/></td>
        </div> 
        )
        case "stoped":
      return(
        <div id='icono3'>
        <td>
          <BsFillSignStopFill/></td>
        </div> 
      )
      case "sleep":
      return(
        <div id='icono4'>
        <td>
          <MdBedtime/></td>
        </div> 
      )
      
  }
}

export default Proceso