import React, { useContext } from "react";
import { FaFolderOpen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import Cards from "../Cards/Cards";
import "../Rightcontainer.scss";
import { PlaygroundContext } from "../../Provider/playgroundprovider/playgroundprovider";
import { ModalContext } from "../../Provider/modalProvider/modalProvider";
export default function Foldercontainer({folder,id}) {
  const playgroundFeaturs=useContext(PlaygroundContext);
  const modalFeatures=useContext(ModalContext);
  const deleteFolder=()=>{
     playgroundFeaturs.deleteFolder(id);
  }
  const EditFolder=()=>{
    modalFeatures.openModal("EDIT_FOlDER");
    playgroundFeaturs.payload.setid(id);
  }
  const Createplayground=()=>{
    modalFeatures.openModal("CREATE_PLAYGROUND_FILE");
    playgroundFeaturs.payload.setid(id);
  }
  return (
    <div>
      <div 
       className="folder-container">
         <div className="folder-header">
           <div className="folder-header-items">
             <span >
               <FaFolderOpen style={{color:"FFCA29"}}/>
             </span>
             <span>{folder?.title}</span>
           </div>
           <div className="folder-header-items">
             <span >
               <MdDelete onClick={deleteFolder}/>
             </span>
             <span>
               <MdModeEdit onClick={EditFolder} />
             </span>
             <button onClick={Createplayground}>
               <span>
                 <strong>+</strong>
               </span>
               <span>New playground</span>
             </button>
           </div>
         </div>
         <div className="cards-container">
           {folder.files.map((card,index)=>(
          <Cards card={card} folderid={id}/>
           ))}
           </div>
       </div>
    </div>
  )
}
