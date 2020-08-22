import * as React from "react";
import PlusIcon from "../icons/plus-icon";
import TealCheckIcon from "../icons/teal-check-icon";
import styled, { keyframes } from "styled-components";

import {
    flyoutBackground,
    bodyText,
    pandaPink,
    iconsInActive,
    actionBackground,
    pandaTeal,
} from "../../styles/colors";

const bounceOut = keyframes`
  0% {
    opacity: 0;
    width: 24px;
    height: 24px;
  }

  25% {
    width: 40px;
    height: 40px;
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

const PlusButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: ${bodyText};
    cursor: pointer;
    width: 24px;
    height: 24px;
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;
    background-position: center;
    z-index: 50;
    animation: ${bounceOut} 0.2s 1;
    opacity: 1;
    border: 2px ${actionBackground} solid;
    border-radius: 40px;
    padding: 0;

    &:focus {
        opacity: 1;
        outline: 0 !important;
        box-shadow: none !important;
    }

    &:active {
        background-color: ${pandaTeal};
        opacity: 1;
    }

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 600px) {
    }
`;

const CheckedButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: ${flyoutBackground};
    width: 24px;
    height: 24px;
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;
    animation: ${bounceOut} 0.2s 1;
    z-index: 50;
    opacity: 1;
    border: 2px ${pandaTeal} solid;
    border-radius: 40px;
    padding: 0;

    &:focus {
        opacity: 1;
        outline: 0 !important;
        box-shadow: none !important;
    }

    &:active {
        background-color: ${pandaTeal};
        opacity: 1;
    }

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 600px) {
    }
`;

const StyledPlusIcon = styled(PlusIcon)``;

const IconContainer = styled.div`
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default class PlusCheckButton extends React.Component {
    handleOnClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };

    render() {
        if (this.props.isChecked) {
            return (
                <CheckedButton
                    className={this.props.className}
                    onClick={this.handleOnClick}
                >
                    <IconContainer>
                        <TealCheckIcon />
                    </IconContainer>
                </CheckedButton>
            );
        } else {
            return (
                <PlusButton
                    className={this.props.className}
                    onClick={this.handleOnClick}
                >
                    <IconContainer>
                        <StyledPlusIcon />
                    </IconContainer>
                </PlusButton>
            );
        }
    }
}
