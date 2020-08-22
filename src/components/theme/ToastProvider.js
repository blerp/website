import React, { useState } from "react";
import styled from "styled-components";

const ToastContext = React.createContext();

const ToastProvider = props => {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");
    const [appearance, setAppearance] = useState("");

    const useToast = (content, appearance) => {
        setContent(content);
        setAppearance(appearance);

        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ content, appearance, show, useToast }}>
            {props.children}
        </ToastContext.Provider>
    );
};

export { ToastProvider, ToastContext };
