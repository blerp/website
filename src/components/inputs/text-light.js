import * as React from "react";
import styled, { keyframes } from "styled-components";

import {
    defaultBackground,
    statusColor,
    bodyText,
    pandaPink,
    flyoutBackground,
    secondarySubtitleText,
    secondaryText,
    pandaTeal,
    focusState,
    darkText,
    ligherBackground,
    lightGray,
    headerText,
} from "../../styles/colors";

const TextField = styled.input`
    background-color: ${flyoutBackground};
    border: none;
    height: 32px;
    color: ${bodyText};
    font-size: inherit;
    padding-left: 5px;
    padding-right: 5px;
    border: solid rgb(191, 191, 186) 2px;
    padding: 4px 12px;
    border-radius: 16px;
    outline: 3px solid
        ${props =>
            props.error ? "rgba(200, 20, 20, 1)" : "rgba(200, 20, 20, 0)"};

    &:placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #bfbfba;
    }

    &:focus {
        border-radius: 16px;
    }
`;

export default TextField;
