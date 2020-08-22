/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { keyframes } from "styled-components";
import { default as Router, withRouter } from "next/router";

import projectConfig from "../../config";
const apiHost = projectConfig.apiHost;

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    disabledText,
    iconsActive,
    bodyText,
    secondaryGray,
} from "../../styles/colors";

const checkTranslate = mode => {
    switch (mode) {
        case REGISTER_NAV_MODES.signIn:
            return `20px`;
        case REGISTER_NAV_MODES.signUp:
            return `80px`;
        case REGISTER_NAV_MODES.reset:
        default:
            return `260px`;
    }
};

const animateTranslate = (previousMode, currentMode) => keyframes`
  0% {
    left: ${checkTranslate(previousMode)};
    opacity: 0;
  }

  25% {
  }

  50% {
  }

  75% {
  }

  100% {
    left: ${checkTranslate(currentMode)};
    opacity: 1;
  }
`;

const RegisterNavContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    border-radius: 6px;
    flex-direction: row;
    justify-content: space-between;
`;

const SignInUpContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const RegisterNavButton = styled.button`
    color: ${props => (props.selected ? pandaPink : secondaryGray)};
    padding: 8px;
    border-radius: 12px;
    box-shadow: none;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:active {
        color: ${pandaPink};
    }
`;

export const REGISTER_NAV_MODES = {
    signUp: "SIGNUP",
    signIn: "SIGNIN",
    reset: "RESET",
};

const TriangleUp = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid ${flyoutBackground};
    margin: auto;
    bottom: -6px;
    left: ${props => checkTranslate(props.mode)};
    animation: ${props => animateTranslate(props.previousMode, props.mode)} 0.9s
        1;
`;

class RegisterNav extends React.Component {
    props;
    state;

    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode || REGISTER_NAV_MODES.signIn,
            previousMode: props.previousMode || REGISTER_NAV_MODES.signUp,
        };
    }

    componentDidMount() {
        if (this.props.router) {
            this.props.router.prefetch("/login");
            this.props.router.prefetch("/register");
            this.props.router.prefetch("/reset-email");
        }
    }

    signInClick = () => {
        if (this.props.signInClick) {
            this.props.signInClick();
        } else {
            this.props.router.push(`/login`);
        }
    };

    signUpClick = () => {
        if (this.props.signUpClick) {
            this.props.signUpClick();
        } else {
            this.props.router.push(`/register`);
        }
    };

    resetClick = () => {
        if (this.props.resetClick) {
            this.props.resetClick();
        } else {
            this.props.router.push(`/reset-email`);
        }
    };

    render() {
        return (
            <RegisterNavContainer>
                {/* <TriangleUp
          mode={this.state.mode}
          previousMode={this.state.previousMode}
        /> */}
                <SignInUpContainer>
                    <RegisterNavButton
                        onClick={this.signInClick}
                        selected={this.state.mode === REGISTER_NAV_MODES.signIn}
                    >
                        {"Login"}
                    </RegisterNavButton>
                    <RegisterNavButton
                        onClick={this.signUpClick}
                        selected={this.state.mode === REGISTER_NAV_MODES.signUp}
                    >
                        {"Register"}
                    </RegisterNavButton>
                </SignInUpContainer>
                <RegisterNavButton
                    onClick={this.resetClick}
                    selected={this.state.mode === REGISTER_NAV_MODES.reset}
                >
                    {"Forgot Password?"}
                </RegisterNavButton>
            </RegisterNavContainer>
        );
    }
}

export default withRouter(RegisterNav);
