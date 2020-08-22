import * as React from "react";
import styled from "styled-components";

import { pandaPink, primaryText, flyoutBackground } from "../../styles/colors";

export default styled.button`
    font-size: 18px;
    background-color: ${pandaPink};
    border-radius: 100px;
    height: 40px;
    color: ${flyoutBackground};
    border: 2px solid ${pandaPink};
    min-width: 106px;
    z-index: 2;
    padding: 0 24px;
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
