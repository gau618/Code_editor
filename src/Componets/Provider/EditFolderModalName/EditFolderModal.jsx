import React from 'react'
import './index.scss';
import { MdCancel } from "react-icons/md";
import { useContext } from 'react';
import { ModalContext } from '../modalProvider/modalProvider';
import { PlaygroundContext } from '../playgroundprovider/playgroundprovider';
export default function 
EditFolderModal() {
    const playgroundFeaturs=useContext(PlaygroundContext);
    const modalFeatures =useContext(ModalContext);
    const closeModal=()=>{
        modalFeatures.closeModal();
    }
    const id=playgroundFeaturs.payload.id
    const SubmitFunction=(e)=>{
        e.preventDefault();
        const foldername=e.target?.foldername?.value;
        playgroundFeaturs.editfoldertitle(foldername,id);
        playgroundFeaturs.payload.setid(null);
        modalFeatures.closeModal();  
    }
  return (
    <form className='Edit-folder' onSubmit={SubmitFunction}>
      <div className="folder">
        <div className='header'>
        <h3>Edit Folder Name</h3>
         <MdCancel onClick={closeModal}/>
        </div>
        <div className="input-button">
            <input type="text" name='foldername' id='folder'/>
            <button type='submit'>
                Edit Folder
            </button>
        </div>
      </div>
    </form>
  )
}
