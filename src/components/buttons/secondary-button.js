import * as React from "react";
import styled from "styled-components";

import {
    pandaPink,
    secondaryGray,
    secondaryText,
    primaryText,
    flyoutBackground,
} from "../../styles/colors";

export default styled.button`
    color: ${props => (props.isMenuOpen ? pandaPink : secondaryGray)};
    border: 2px solid ${props => (props.isMenuOpen ? pandaPink : secondaryGray)};
    font-size: 14px;
    border-radius: 100px;
    height: 40px;
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
