/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { keyframes } from "styled-components";

import ActionButton from "../buttons/action-button";
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
} from "../../styles/colors";

const animateIn = keyframes`
  0% {
    width: 72%;
    height: 72%;
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
    width: 80%;
    height: 80%;
    opacity: 1;
  }
`;

const LoginBox = styled.div`
    background-color: ${flyoutBackground};
    display: flex;
    flex-direction: column;
    width: 50%;
    border-radius: 6px;
    margin: 40px auto;
    border-radius: 6px;
    animation: ${animateIn} 0.9s 1;
`;

const Header = styled.div`
    background-color: ${props => (props.color ? props.color : pandaPink)};
    padding: 12px;
    border-radius: 6px 6px 0 0;
`;

const Title = styled.div`
    text-align: center;
    font-size: 28px;
    color: ${primaryText};
    width: 100%;
`;

const LogoutTitle = styled.div`
    padding: 8px;
`;

const BodyTitle = styled.div`
    text-align: center;
    font-size: 28px;
    color: ${bodyText};
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const TermsText = styled.div`
    text-align: center;
    font-size: 16px;
    color: ${disabledText};
    margin: 8px 40px;
`;

const TermsLink = styled.a`
    text-align: center;
    font-size: 16px;
    color: ${disabledText};
    width: 100%;
    text-decoration: underline;

    &:hover {
        color: ${iconsActive};
    }
`;

const Body = styled.div`
    background-color: ${flyoutBackground};
    position: relative;
    height: 100%;
    border-radius: 6px;
    padding: 40px;
`;

const LoginItems = styled.div`
    background-color: ${flyoutBackground};
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const LoginButtonContainer = styled.div`
    align-self: center;
    margin: 24px;
`;

const BodyImage = styled.img`
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

class LogoutBox extends React.Component {
    props;

    actionButtonClick() {
        window.location.href = "/";
    }

    render() {
        return (
            <LoginBox>
                <Header color={pandaPink}>
                    <Title>{"Successfully Logged Out!"}</Title>
                </Header>
                <Body>
                    <LoginItems>
                        <BodyTitle>
                            <LogoutTitle>
                                {"Byee!! I hope you enjoyed your stay."}
                            </LogoutTitle>
                            <TermsLink href='/login'>
                                {"Come back soon!"}
                            </TermsLink>
                        </BodyTitle>
                        <BodyImage
                            src={
                                "https://storage.googleapis.com/blerp-main-bucket/images/outline-pink.png"
                            }
                            alt={"Buyeee!"}
                            onClick={() => {
                                window.location = "/";
                            }}
                        />
                        <LoginButtonContainer>
                            <ActionButton onClick={this.actionButtonClick}>
                                {"Back Home"}
                            </ActionButton>
                        </LoginButtonContainer>
                        <TermsText>
                            <TermsLink href='/search/memes'>
                                {"Wobble Tobble!!"}
                            </TermsLink>
                            {
                                " I like to make random sounds when I see friends leave. "
                            }
                            <TermsLink href='/search/love'>{"<3"}</TermsLink>
                        </TermsText>
                    </LoginItems>
                </Body>
            </LoginBox>
        );
    }
}

export default LogoutBox;
