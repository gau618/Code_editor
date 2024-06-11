import React, { useContext } from 'react'
import smalllogo from "../../../../public/logo48.png"
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import "../Rightcontainer.scss";
import { ModalContext } from '../../Provider/modalProvider/modalProvider';
import { PlaygroundContext } from '../../Provider/playgroundprovider/playgroundprovider';
const Cards = ({card,folderid}) => {
  const Navigate=useNavigate();
  const modalFeatures =useContext(ModalContext);
  const  playgroundFeaturs=useContext(PlaygroundContext);
   const editfilename=()=>{
    modalFeatures.openModal("EDIT_FILE");
    playgroundFeaturs.payload.setid(folderid);
    playgroundFeaturs.payload.setfileid(card.id);
   }
   const deletefile=()=>{
    playgroundFeaturs.deletefile(folderid,card.id);
   }
   const cardid=card.id
   const Navigatetoplayground=()=>{
     Navigate(`/playground/${cardid}/${folderid}`)
   }
  return (
      
           <div className="card" >
             <div className="image-box" onClick={Navigatetoplayground}>
             <img src={smalllogo} alt="logo" />
              <div className="language-box">
               <span>{card.title}</span>
               <span>Language: {card.language}</span>
              </div>
              </div>
              <div className="delete_edit_box">
               <span> <MdDelete onClick={deletefile} /></span>
               <span> <MdModeEdit onClick={editfilename}/></span>
              </div>
           </div>

  )
}

export default Cards
