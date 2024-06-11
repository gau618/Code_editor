import React, { useContext } from 'react'
import { MdCancel } from "react-icons/md";
import { ModalContext } from '../modalProvider/modalProvider';
import "./playgroundModal.scss";
import { PlaygroundContext } from '../playgroundprovider/playgroundprovider';
export default function PlaygroundModal() {
  const modalFeatures=useContext(ModalContext);
  const {createNewPlayground}=useContext(PlaygroundContext);
  const close_Model=()=>{
    modalFeatures.closeModal();
  }
  const onSubmitModal=(e)=>{
      e.preventDefault();
      const foldername=e.target?.foldername?.value;
      const filename=e?.target?.filename?.value;
      const Language=e.target?.language?.value;
      createNewPlayground({
        foldername,
        filename,
        Language
      })
      modalFeatures.closeModal();

  }
  return (
      <div className="modal-container">
        <form className='modal-body' onSubmit={onSubmitModal}>
      <div className="Modal-header">
        <h3>Create New Playground</h3>
        <button onClick={close_Model}>< MdCancel/></button>
      </div>
      <div className="modal-input">
        <div className='input-label'>
         <label htmlFor="Foldername" id='folder'> Enter Folder Name</label>
         <input type="text" required name='foldername' id='folder' />
        </div>
        <div className='input-label'>
         <label htmlFor="filename" id='file'> Enter File Name</label>
         <input type="text" required name='filename' id='file' />
        </div>
      </div>
        <div className="modal-language">
          <div>
           <select name='language'>
            <option value="cpp">CPP</option>
            <option value="java">Java</option>
            <option value="javascript">javascript</option>
            <option value="python">python</option>
           </select>
          </div>
          <button type='submit'>Create playground</button>
        </div>

        </form>
      </div>
  )
}
