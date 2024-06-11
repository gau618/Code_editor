import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export default function ModalProvider({ children }) {
    const [modalType, setModalType] = useState(null);
    console.log(modalType);
    const closeModal = () => {
        setModalType(null);
    }

    const openModal = (type) => {
        setModalType(type);
    }

    const modalFeatures = {
        openModal: openModal,
        closeModal: closeModal,
        activeModal: modalType
    }

    return (
        <ModalContext.Provider value={modalFeatures}>
            {children}
        </ModalContext.Provider>
    );
}

