import * as React from "react";
import styled from "styled-components";

import {
    pandaPink,
    flyoutBackground,
    statusColor,
    placeholderText,
    primaryText,
    bodyText,
    secondaryText,
    pandaTeal,
} from "../../styles/colors";

const SecondaryButton = styled.button`
    font-size: 18px;
    border-radius: 100px;
    height: 40px;
    color: ${secondaryText};
    border: 2px solid ${secondaryText};
    min-width: 106px;
    z-index: 2;
    padding: 0 24px;
    background-color: transparent;
    cursor: pointer;

    &:focus {
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        color: ${pandaPink};
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }

    &:active {
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

export default SecondaryButton;
