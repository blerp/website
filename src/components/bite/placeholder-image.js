import * as React from "react";
import styled, { keyframes } from "styled-components";

const opacityAnimation = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity:0.3;
  }
  100% {
    opacity: 1;
  }
`;

export const PlaceholderImage = styled.div`
    width: 140px;
    height: 140px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 100px;
    background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : "transparent"};

    @media (max-width: 600px) {
        width: 112px;
        height: 112px;
    }
`;
