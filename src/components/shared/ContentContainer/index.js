import * as React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    border-radius: 16px;
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
    border-radius: 6px;
  }`;

const ContentContainer = styled.div`
    width: 200px;
    height: 200px;
    position: relative;
    border-radius: 6px;
    animation: ${fadeIn} 0.4s 1;
    cursor: pointer;

    @media (max-width: 600px) {
        width: 89px;
        height: 89px;
    }
`;

export default ContentContainer;
