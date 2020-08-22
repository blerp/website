import * as React from "react";
import styled from "styled-components";

import { pandaPink, primaryText, flyoutBackground } from "../../styles/colors";

export default styled.button`
    background-color: ${flyoutBackground};
    border-radius: 100px;
    height: 36px;
    font-weight: bold;
    color: ${pandaPink};
    border: 2px solid ${pandaPink};
    width: 186px;
    cursor: pointer;

    &:hover {
        background-color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;
