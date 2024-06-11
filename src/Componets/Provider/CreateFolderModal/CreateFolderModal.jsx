import React from 'react'
import './index.scss';
import { MdCancel } from "react-icons/md";
import { useContext } from 'react';
import { ModalContext } from '../modalProvider/modalProvider';
import { PlaygroundContext } from '../playgroundprovider/playgroundprovider';
export default function 
CreateFolderModal() {
    const playgroundFeaturs=useContext(PlaygroundContext);
    const modalFeatures =useContext(ModalContext);
    const closeModal=()=>{
      modalFeatures.closeModal();
    }
    const SubmitFunction=(e)=>{
        e.preventDefault();
        const foldername=e.target?.foldername?.value;
        playgroundFeaturs.createNewFolder(foldername)
        modalFeatures.closeModal();
    }
  return (
    <form className='Create-folder' onSubmit={SubmitFunction}>
      <div className="folder">
        <div className='header'>
        <h3>Create New Folder</h3>
         <MdCancel onClick={closeModal}/>
        </div>
        <div className="input-button">
            <input type="text" name='foldername' id='folder' required/>
            <button type='submit'>
                Create folder
            </button>
        </div>
      </div>
    </form>
  )
}
