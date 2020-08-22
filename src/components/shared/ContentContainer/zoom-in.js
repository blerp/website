import * as React from "react";
import styled, { keyframes } from "styled-components";

const animateIn = keyframes`
  0% {
    width: 232px;
    height: 232px;
    opacity: 0;
  }

  25% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
`;

const ZoomInContentContainer = styled.div`
    width: 200px;
    height: 200px;
    position: relative;
    border-radius: 6px;
    animation: ${animateIn} 0.7s 1;

    @media (max-width: 600px) {
        width: 120px;
        height: 120px;
    }
`;

export default ZoomInContentContainer;
