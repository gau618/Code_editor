import initialData from "../../../Data/Data";
import { createContext, useEffect, useState } from "react";
import { languageMap } from "../../../Data/language_defaltcode";
import { v4 } from "uuid";
export const PlaygroundContext = createContext();

export default function PlaygroundProvider({ children }) {
  const [item, setitem] = useState(() => {
    const localData = localStorage.getItem("data");
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch (error) {
        console.error("Error parsing local data:", error);
        
      }
    }
    return initialData;
  });
  const [id, setid] = useState(null);
  const [fileid, setfileid] = useState(null);
  const Getdefaultcode = (folderId, fileId) => {
    for (let i = 0; i < item.length; i++) {
        if (item[i].id === folderId) {
            for (let j = 0; j < item[i].files.length; j++) {
                if (item[i].files[j].id === fileId) {
                 const Mycode=item[i].files[j].code;
                 const language=item[i].files[j].language;
                    return {Mycode,language} 
                }
            }
        }
    }
    return undefined; // Return undefined if the folder or file is not found
};
 const updatetheLanguage=(folderId,fileId,language)=>{
         const updateditem=[...item];
         for (let i = 0; i < item.length; i++) {
          if (updateditem[i].id === folderId) {
              for (let j = 0; j < updateditem[i].files.length; j++) {
                  if (updateditem[i].files[j].id === fileId) {
                    updateditem[i].files[j].code=languageMap[language].defaultCode;
                    updateditem[i].files[j].language=language;
                  }
              }
          }
      }
      localStorage.setItem("data", JSON.stringify(updateditem));
    setitem(updateditem);
 }
  const createNewPlayground = (newplayground) => {
    const { filename, foldername, Language } = newplayground;
    const newitem = [...item];
    newitem.push({
      id: v4(),
      title: foldername,
      files: [
        {
          id: v4(),
          title: filename,
          language: Language,
          code: languageMap[Language]?.defaultCode,
        },
      ],
    });
    localStorage.setItem("data", JSON.stringify(newitem));
    setitem(newitem);
  };
  const createNewFolder = (foldername) => {
    const newitem = {
      id: v4(),
      title: foldername,
      files: [],
    };
    const allitem = [...item, newitem];
    localStorage.setItem("data", JSON.stringify(allitem));
    setitem(allitem);
  };
  const deleteFolder = (id) => {
    const updateditem = item.filter((folderitem) => {
      return folderitem.id !== id;
    });
    localStorage.setItem("data", JSON.stringify(updateditem));
    setitem(updateditem);
  };
  const editfoldertitle = (newfolder, id) => {
    const updateditemlist = item.map((folderitem) => {
      if (folderitem.id === id) {
        folderitem.title = newfolder;
      }
      return folderitem;
    });
    localStorage.setItem("data", JSON.stringify(updateditemlist));
    setitem(updateditemlist);
  };
  const editPlaygroundTitle = (
    folderId,
    cardId,
    PlaygroundTitle,
    Playgroundlanguage
  ) => {
    const Copieditem = [...item];
    for (let i = 0; i < Copieditem.length; i++) {
      if (folderId === Copieditem[i].id) {
        const files = Copieditem[i].files;
        for (let j = 0; j < files.length; i++) {
          if ((files[j].id = cardId)) {
            Copieditem[i].files[j].title = PlaygroundTitle;
            Copieditem[i].files[j].language = Playgroundlanguage;
            break;
          }
        }
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(Copieditem));
    setitem(Copieditem);
  };

  const deletefile = (folderid, fileid) => {
    const newitem = [...item];
    for(let i=0;i<newitem.length;i++){
      if(newitem[i].id===folderid){
        newitem[i].files=newitem[i].files.filter((file)=>file.id!==fileid)
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(newitem));
    setitem(newitem);
  };
  const newplaygroundfile=(folderid,filename,language)=>{
     const playground=
     {  id:v4(),
        title:filename,
        language:language
     }
     const newitem=[...item];
     for(let i=0;i<newitem.length;i++){
      if(newitem[i].id===folderid){
        newitem[i].files.push(playground);
        break;
      }
     }
     localStorage.setItem("data", JSON.stringify(newitem));
      setitem(newitem);
  }
  const Savethecode=(folderId,fileId,newCode)=>{
    console.log(newCode);
    const newitem=[...item];
    for(let i=0;i<newitem.length;i++){
      if(newitem[i].id===folderId){
         const files=newitem[i].files;
        for(let j=0;j<files.length;j++){
          if(files[j].id===fileId){
            newitem[i].files[j].code=newCode;
          }
        }
      }
    }
    localStorage.setItem('data',JSON.stringify(newitem));
    setitem(newitem);
  }
  const playgroundFeaturs = {
    item,
    createNewPlayground,
    createNewFolder,
    deleteFolder,
    editfoldertitle,
    payload: {
      id: id,
      setid: setid,
      fileid: fileid,
      setfileid: setfileid,
    },
    editPlaygroundTitle,
    deletefile,
    newplaygroundfile,
    Getdefaultcode,
    updatetheLanguage,
    Savethecode
  };
  return (
    <PlaygroundContext.Provider value={playgroundFeaturs}>
      {children}
    </PlaygroundContext.Provider>
  );
}
