import React from 'react'
import '../EditFolderModalName/index.scss';
import { MdCancel } from "react-icons/md";
import { useContext } from 'react';
import { ModalContext } from '../modalProvider/modalProvider';
import { PlaygroundContext } from '../playgroundprovider/playgroundprovider';
export default function 
EditFileModal() {
    const playgroundFeaturs=useContext(PlaygroundContext);
    const modalFeatures =useContext(ModalContext);
    const closeModal=()=>{
        modalFeatures.closeModal();
    }
    const id=playgroundFeaturs.payload.id;
    const fileid=playgroundFeaturs.payload.fileid;
    const SubmitFunction=(e)=>{
        e.preventDefault();
        const filename=e.target?.foldername?.value;
        const language=e.target?.language?.value;
        playgroundFeaturs. editPlaygroundTitle(id,fileid,filename,language);
        playgroundFeaturs.payload.setid(null);
        playgroundFeaturs.payload.setfileid(null);
        modalFeatures.closeModal();  
    }
  return (
    <form className='Edit-folder' onSubmit={SubmitFunction}>
      <div className="folder">
        <div className='header'>
        <h3>Edit File Name</h3>
         <MdCancel onClick={closeModal}/>
        </div>
        <div className="input-button">
            <input type="text" name='foldername' id='folder'/>
            <button type='submit'>
                Edit File
            </button>
            </div >
            <select name='language' className='language'>
            <option value="cpp">CPP</option>
            <option value="java">Java</option>
            <option value="javascript">javascript</option>
            <option value="python">python</option>
           </select>
        
      </div>
    </form>
  )
}
