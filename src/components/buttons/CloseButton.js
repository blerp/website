import * as React from "react";
import CloseIcon from "../icons/dark-close-icon";
import LightCloseIcon from "../icons/light-close-icon";
import styled, { keyframes } from "styled-components";

import {
    flyoutBackground,
    bodyText,
    pandaPink,
    iconsInActive,
} from "../../styles/colors";

const bounceOut = keyframes`
  0% {
    opacity: 0;
    width: 24px;
    height: 24px;
  }

  25% {
    width: 64px;
    height: 64px;
  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 1;
    width: 32px;
    height: 32px;
  }
`;

const CloseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: transparent;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;
    background-position: center;
    z-index: 1001;
    animation: ${bounceOut} 0.2s 1;
    opacity: 1;
    border: none;

    &:focus {
        opacity: 1;
        outline: 0 !important;
        box-shadow: none !important;
    }

    &:active {
        background-color: ${props =>
            props.isFeaturedBite ? iconsInActive : pandaPink};
        opacity: 1;
    }

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 600px) {
    }
`;

const CloseIconContainer = styled.div`
    width: 32px;
    height: 32px;
`;

export default class CloseButtonComponent extends React.Component {
    handleCloseClick = () => {
        this.props.onClick();
    };

    render() {
        return (
            <CloseButton
                className={this.props.className}
                onClick={this.handleCloseClick}
            >
                <CloseIconContainer>
                    {this.props.lightIcon ? <LightCloseIcon /> : <CloseIcon />}
                </CloseIconContainer>
            </CloseButton>
        );
    }
}
