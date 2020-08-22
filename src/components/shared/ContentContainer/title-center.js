import * as React from "react";
import styled, { keyframes } from "styled-components";

const TitleSection = styled.span`
    flex-direction: row;
    position: absolute;
    width: 180px;
    left: 10px;
    top: 16px;
    height: 80px;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    line-height: 20px;
    max-height: 80px;
    -webkit-line-clamp: 4;

    @media (max-width: 600px) {
        line-height: 16px;
        font-size: 12px;
        width: 72px;
        max-height: 64px;
        height: 64px;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

export default TitleSection;
