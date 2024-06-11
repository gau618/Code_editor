import { useContext } from "react";
import "./Rightcontainer.scss";
import Foldercontainer from "./foldercontainer/foldercontainer";
import { PlaygroundContext } from "../Provider/playgroundprovider/playgroundprovider";
import { ModalContext } from "../Provider/modalProvider/modalProvider";
export default function Rightcontainer() {
  const { item } = useContext(PlaygroundContext);
  const modalFeatures=useContext(ModalContext)
  const openCreateNewfolderModal = () => {
    modalFeatures.openModal("CREATE_FOlDER")
  };
  return (
    <>
      <div className="right-container">
        <div className="header">
          <p>
            My <strong>Playground</strong>
          </p>
          <div onClick={openCreateNewfolderModal}>
            <span>
              <strong>+</strong>
            </span>
            <span> New Folder</span>
          </div>
        </div>
        {item.map((folder, index) => (
          <Foldercontainer folder={folder} id={folder.id} />
        ))}
      </div>
    </>
  );
}
