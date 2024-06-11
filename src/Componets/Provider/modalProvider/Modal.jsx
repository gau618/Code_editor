import React, { useContext } from 'react';
import PlaygroundModal from '../PlaygroundModal/PlaygroundModal';
import { ModalContext } from './modalProvider';
import CreateFolderModal from '../CreateFolderModal/CreateFolderModal';
import EditFolderModal from '../EditFolderModalName/EditFolderModal';
import EditFileModal from '../EditFileModalname/EditFileModel';
import Createplayground from '../Createplayground/Createplayground';
export default function Modal() {
    const modalFeatures = useContext(ModalContext);

    return (
        <>
            {modalFeatures.activeModal === "CREATE_PLAYGROUND" && <PlaygroundModal />}
            {
                modalFeatures.activeModal === "CREATE_FOlDER" && <CreateFolderModal />
            }
             {
                modalFeatures.activeModal === "EDIT_FOlDER" &&
                <EditFolderModal/>
            }
             {
                modalFeatures.activeModal === "EDIT_FILE" &&
                <EditFileModal/>
            }
            {
                modalFeatures.activeModal === "CREATE_PLAYGROUND_FILE" &&
                <Createplayground/>
            }
        </>
    );
}

