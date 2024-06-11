import React, { useContext } from 'react'
import './home.scss'
import logo from "../../public/logo144.png";
import Rightcontainer from './Rightcontainer/Right-container';
import Modal from './Provider/modalProvider/Modal';
import { ModalContext } from './Provider/modalProvider/modalProvider';
export default function Home() {
   const modalFeatures=useContext(ModalContext)
  const createplayground=()=>{
        modalFeatures.openModal("CREATE_PLAYGROUND")
  }
  return (
    <>
    <div className="home-container">
        <div className="left-container">
            <div className='left-item-container'>
            <img src={logo} alt="logo" />
            <h1><span>Code</span> Park</h1>
            <h2>Play.Create.Innovate</h2>
            <button onClick={createplayground}> <strong>+ </strong>Create New playground</button>
            </div>
        </div>
        <Rightcontainer/>
        <Modal/>
    </div>
    </>
  )
}
