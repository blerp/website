import * as React from "react";
import styled from "styled-components";

import {
    pandaPink,
    flyoutBackground,
    defaultBackground,
    statusColor,
    placeholderText,
    primaryText,
    bodyText,
    darkBackground,
} from "../../styles/colors";

export const DarkBody = styled.div`
    background-color: ${darkBackground};
    color: ${primaryText};
    padding: 20px 40px;

    @media (max-width: 600px) {
        text-align: center;
    }
`;
