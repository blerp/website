import * as React from "react";
import styled from "styled-components";

const ReponsiveContainer = styled.div`
    width: 1400px;
    padding: 28px 80px;
    margin-bottom: 80px;

    @media (max-width: 1200px) {
        width: 1000px;
    }

    @media (max-width: 800px) {
        width: 800px;
    }

    @media (max-width: 800px) {
        width: 800px;
    }

    @media (max-width: 600px) {
        width: 400px;
    }

    @media (max-width: 390px) {
        width: 200px;
    }
`;

export default ReponsiveContainer;
