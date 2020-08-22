import * as React from "react";
import styled from "styled-components";

const ContentContainerGrid = styled.div`
    display: grid;
    grid: minmax(auto, max-content) / repeat(auto-fill, 160px);
    grid-gap: 16px;
    justify-content: center;
    padding: 0 60px;

    @media (max-width: 600px) {
        grid: minmax(auto, max-content) / repeat(auto-fill, 160px);
        grid-gap: 12px;
        padding: 0;
    }
`;

export default ContentContainerGrid;
