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

const DarkThemeButton = styled.button`
    margin: 8px;
    font-weight: lighter;
    padding: 4px 12px;
    text-decoration: none;
    color: ${flyoutBackground};
    white-space: nowrap;
    background: transparent;
    border: 2px solid ${flyoutBackground};
    border-radius: 40px;
    font-size: 14px;
    line-height: 14px;
    height: 32px;
    cursor: pointer;

    &:focus {
        border-radius: 40px;
        border: 2px solid ${pandaPink} !important;
        outline: 0 !important;
        box-shadow: none !important;
    }

    &:hover {
        transition: all 0.2s ease 0s;
        color: ${pandaPink};
    }

    &:active {
        color: ${pandaPink};
        border: 2px solid ${pandaPink};
        transition: all 0.2s ease 0s;
    }
`;

export default DarkThemeButton;
