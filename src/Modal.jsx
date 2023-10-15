import React from "react";
import "./Modal.css"

const Modal = ({children}) => {
    return (
        <div className="overlay">
            {children}
        </div>
    );
}

export default Modal;