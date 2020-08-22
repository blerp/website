import React from "react";
import styled from "styled-components";

export const Divider = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.colors.grey3};
    margin: 20px 0;
`;
