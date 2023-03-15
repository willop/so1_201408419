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
        <tbody>
        <tr>
          <td width="15%">{props.idp}</td>
          <td width="50%">{props.name}</td>
          <td width="20%">{props.ram}Mb</td>
          {props.userp === '0'?
          <td width="20%"><GrUserAdmin/></td>:
          <td width="20%"><GrUser/></td>}
         <Type_icon type_process={props.type}/>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

function Type_icon(props) {

  switch (props.type_process) {
    case "running":
      return(
        
        <td><div id='icono1'><GrCloudlinux/></div> </td>
         
      )
      case "zombie":
        return(
          
        <td><div id='icono2'>
          <GiShamblingZombie/></div> </td>
        
        )
        case "stoped":
      return(
        
        <td><div id='icono3'>
          <BsFillSignStopFill/></div> </td>
        
      )
      case "sleep":
      return(
        
        <td><div id='icono4'>
          <MdBedtime/></div> </td>
        
      )
      
  }
}

export default Proceso