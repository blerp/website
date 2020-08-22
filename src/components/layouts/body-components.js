import * as React from "react";
import styled from "styled-components";

import { defaultBackground } from "../../styles/colors";

export const PageContainer = styled.div`
    background-color: ${defaultBackground};
    width: 100%;
    height: 100%;
`;

export const Body = styled.div`
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 100%;
    background: ${defaultBackground};
    text-align: center;
    justify-content: center;
    align-items: center;
`;
