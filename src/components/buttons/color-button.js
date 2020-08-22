import * as React from "react";
import styled from "styled-components";

import {
    pandaPink,
    secondaryGray,
    primaryText,
    flyoutBackground,
} from "../../styles/colors";

export default styled.button`
    background-color: ${props =>
        props.isMenuOpen ? pandaPink : props.color || secondaryGray};
    border-radius: 100px;
    width: 200px;
    height: 60px;
    font-size: 20px;
    color: ${props => (props.isMenuOpen ? pandaPink : flyoutBackground)};
    border: 2px solid
        ${props =>
            props.isMenuOpen ? pandaPink : props.color || secondaryGray};
    z-index: 2;

    &:focus {
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        opacity: 0.8;
        background-color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: ${pandaPink};
        border: 2px solid ${pandaPink};
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;
