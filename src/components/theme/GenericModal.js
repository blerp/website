import React, { useState, useRef, useEffect, cloneElement } from "react";
import Button from "./Button";
import styled, { keyframes } from "styled-components";
import * as ReactDOM from "react-dom";
import theme from "styled-theming";
import colors from "./colors";

const modalBackgroundColor = theme.variants("mode", "color", {
    white: { light: colors.white, dark: colors.black170 },
    lightBlue: { light: colors.lightBlue, dark: colors.lightBlue },
    darkBlue: { light: colors.darkBlue, dark: colors.darkBlue },
    seafoam: { light: colors.seafoam, dark: colors.seafoam },
    yellow: { light: colors.yellow, dark: colors.yellow },
    red: { light: colors.red, dark: colors.red },
});

const modalGridColumns = theme.variants("mode", "gridColumns", {
    1: {
        light: "grid-template-columns: 100%;",
        dark: "grid-template-columns: 100%;",
    },
    2: {
        light: "grid-template-columns: auto auto;",
        dark: "grid-template-columns: auto auto;",
    },
});

const Card = styled.div`
    ${props =>
        props.fullscreen
            ? `
    position: fixed;
    width: auto;
    height: auto;
    top: 60px;
    column-gap: 20px;
    ${
        props.centerVertically
            ? `
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `
            : `
      left: 50%;
      transform: translateX(-50%);
    `
    }
    ${
        props.centerTop
            ? `
        top: 80px;
      `
            : ``
    }
    `
            : `
    position: absolute;
    ${props.posX}
    ${props.posY}
  `} column-gap: 20px;
    padding: 20px;
    max-height: 750px;
    border-radius: 8px;
    margin: 20px auto;
    display: ${props => (props.show ? "flex" : "none")};
    flex-direction: column;
    width: ${props => props.width || "auto"};
    justify-content: space-around;
    background-color: ${modalBackgroundColor};
    ${props =>
        props.backgroundBlur
            ? `
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(15px);
  `
            : ""} transition: 0.5s;
    z-index: 5000;
    box-shadow: 0px 0px 20px #0000001a;
    ${props => (props.show ? "" : "overflow-y: hidden;")};
`;

const slideInFromTop = keyframes`
  0% {
    top: 0px;
    opacity: 0;
  }
  25% {
    top: 100px;
    opacity: 1;
  }
  75% {
    top: 100px;
    opacity: 1;
  }
  100% {
    top: 0px;
    opacity: 0;
  }
`;

const slideInFromBottom = keyframes`
0% {
  bottom: 0px;
  opacity: 0;
}
25% {
  bottom: 80px;
  opacity: 1;
}
75% {
  bottom: 100px;
  opacity: 1;
}
100% {
  bottom: 0px;
  opacity: 0;
}
`;

const Toast = styled.div`
    position: fixed;
    width: auto;
    height: auto;
    column-gap: 20px;
    left: 50%;
    transform: translateX(-50%);
    column-gap: 20px;
    padding: 20px;
    max-height: 750px;
    border-radius: 8px;
    margin: 20px auto;
    display: ${props => (props.show ? "flex" : "none")};
    flex-direction: column;
    width: ${props => props.width || "auto"};
    justify-content: space-around;
    background-color: ${modalBackgroundColor};
    ${props =>
        props.backgroundBlur
            ? `
background-color: rgba(255, 255, 255, 0.9);
backdrop-filter: blur(15px);
`
            : ""} transition: 0.5s;
    z-index: 5000;
    box-shadow: 0px 0px 20px #0000001a;
    ${props => (props.show ? "" : "overflow-y: hidden;")};
    animation: 1s ${slideInFromTop} ease-out;
`;

const TheBlur = styled.div`
    position: fixed;
    z-index: 1200;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const Container = styled.div`
    position: relative;
    display: flex;
`;

Card.defaultProps = {
    color: "white",
    fullscreen: false,
    gridColumns: 2,
};

const Modal = props => {
    const [show, setShow] = useState(false);
    const [shouldRender, setShouldRender] = useState(!props.dontRender);
    const [posX, setPosX] = useState("");
    const [posY, setPosY] = useState("");
    const cardRef = useRef();
    const [buttonRef, setButtonRef] = useState();

    useEffect(() => {
        document.addEventListener("mousedown", e =>
            handleOutsideModalClicked(e),
        );

        return () => {
            document.removeEventListener("mousedown", e =>
                handleOutsideModalClicked(e),
            );
        };
    }, []);

    const handleOutsideModalClicked = e => {
        const domNode = ReactDOM.findDOMNode(cardRef.current);
        // Detects if there was an outside click
        if ((!domNode || !domNode.contains(e.target)) && cardRef.current) {
            handleCloseClick();
        }
    };

    const handleCloseClick = () => {
        setShow(false);
        setShouldRender(false);
        setPosX(0);
        setPosY(0);
        if (props.trigger.props.extra) {
            props.trigger.props.extra();
        }
        if (props.trigger.props.onClose) {
            props.trigger.props.onClose();
        }
    };

    const handleTriggerClick = () => {
        setShow(true);
        setShouldRender(true);
        if (props.trigger.props.extra) {
            props.trigger.props.extra();
        }
        if (props.trigger.props.onOpen) {
            props.trigger.props.onOpen();
        }
        if (props.timeout) {
            setTimeout(() => {
                setShow(false);
            }, props.timeout);
        }
        if (props.right) {
            setPosX(`right: 0px;`);
        } else {
            setPosX(`left: 0px;`);
        }
        setPosY(`top: 20px;`);
    };

    return (
        <Container>
            <>
                {shouldRender ? (
                    <>
                        {props.blur && show ? <TheBlur /> : <></>}
                        {props.toast ? (
                            <Toast
                                show={show}
                                ref={cardRef}
                                posY={posY}
                                posX={posX}
                                {...props}
                            >
                                {props.children({ handleCloseClick })}
                            </Toast>
                        ) : (
                            <Card
                                show={show}
                                ref={cardRef}
                                posY={posY}
                                posX={posX}
                                {...props}
                            >
                                {props.children({ handleCloseClick })}
                            </Card>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </>
            {cloneElement(props.trigger, {
                innerRef: input => setButtonRef(input),
                onClick: handleTriggerClick,
            })}
        </Container>
    );
};

export default Modal;
