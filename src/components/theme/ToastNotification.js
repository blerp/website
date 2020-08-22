import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import theme from "styled-theming";
import colors from "../theme/colors";
import Text from "../theme/Text";
import { Icon } from "../theme/Icon";

// const ToastNotificationContainer = styled.div`
//     position: fixed;
//     width: auto;
//     height: auto;
//     column-gap: 20px;
//     left: 50%;
//     transform: translateX(-50%);
//     column-gap: 20px;
//     padding: 20px;
//     max-height: 750px;
//     border-radius: 8px;
//     margin: 20px auto;
//     display: ${props => (props.show ? "flex" : "none")};
//     flex-direction: column;
//     width: ${props => props.width || "auto"};
//     justify-content: space-around;
//     background-color: ${modalBackgroundColor};
//     ${props =>
//         props.backgroundBlur
//             ? `
//     background-color: rgba(255, 255, 255, 0.9);
//     backdrop-filter: blur(15px);
// `
//             : ""} transition: 0.5s;
//     z-index: 5000;
//     box-shadow: 0px 0px 20px #0000001a;
//     ${props => (props.show ? "" : "overflow-y: hidden;")};
//     animation: 1s ${slideInFromTop} ease-out;
// `;

const toastBackgroundColor = theme("appearance", {
    success: colors.seafoam,
    error: colors.ibisRed,
});

const slideInFromTop = keyframes`
  0% {
    top: 0px;
  }
  100% {
    top: 80px;
  }
`;

const slideInFromBottom = keyframes`
  0% {
    top: 80px;
  }
  100% {
    top: 0px;
  }
`;

const ToastNotificationContainer = styled.div`
    width: 100%;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: ${props => (props.mobile ? "35px" : "0px")};

    background: ${props =>
        props.appearance === "report"
            ? `linear-gradient(90deg, #fe295c, #3507b4)`
            : null};
    background-color: ${toastBackgroundColor};
    border-radius: 0px 0px 8px 8px;

    position: fixed;
    top: ${props => (props.show ? "80px" : "0px")};
    z-index: 9500;

    animation: ${props =>
        props.show
            ? css`0.3s ${slideInFromTop}`
            : css`0.3s ${slideInFromBottom}`};
    transition-timing-function: cubic-bezier(0, 0, 0, 1);
`;

const ToastNotification = props => {
    const [imgUrl, setImgUrl] = useState(
        "https://storage.googleapis.com/blerp_products/Web/Conformation%20PopUps/white%20checkmark.svg",
    );
    useEffect(() => {
        switch (props.appearance) {
            case "success":
                setImgUrl(
                    "https://storage.googleapis.com/blerp_products/Web/Conformation%20PopUps/white%20checkmark.svg",
                );
                break;
            case "report":
                setImgUrl(
                    "https://storage.googleapis.com/blerp_products/Web/Conformation%20PopUps/flag%20white.svg",
                );
                break;
            case "error":
                setImgUrl(
                    "https://storage.googleapis.com/blerp_products/Web/Conformation%20PopUps/x%20white.svg",
                );
                break;
        }
    }, [props.appearance]);
    return (
        <ToastNotificationContainer
            theme={{ appearance: props.appearance }}
            appearance={props.appearance}
            show={props.show}
            mobile={props.mobile}
        >
            <Icon url={imgUrl} />
            <Text
                style={{ color: "#fff", fontSize: "20px", marginRight: "5px" }}
            >
                {props.content}
            </Text>
        </ToastNotificationContainer>
    );
};

export default ToastNotification;
