/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import Link from "next/link";
import gql from "graphql-tag";
import * as React from "react";

import { Query, Mutation } from "@apollo/client/react/components";
import styled, { keyframes } from "styled-components";

import TextInput from "../inputs/text-input";
import IconTextButton from "../buttons/icon-text-button";
import PinkButton from "../buttons/pink-button";
import RegisterNav from "./register-nav";
import ReCAPTCHA from "react-google-recaptcha";

import projectConfig from "../../config";
const apiHost = projectConfig.apiHost;
const currentHost = projectConfig.host;
const captchaKey = projectConfig.captchaKey;

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    disabledText,
    iconsActive,
} from "../../styles/colors";

const animateTranslate = keyframes`
  0% {
    opacity: 0;
  }

  25% {
  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 1;
  }
`;

const AnimateContainer = styled.div`
    animation: ${animateTranslate} 1.2s 1;
`;

const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    border-radius: 6px;
    padding: 20px 40px;
    background-color: ${flyoutBackground};
    position: relative;

    @media (max-width: 600px) {
        padding: 12px 20px;
    }
`;

const TermsText = styled.div`
    text-align: center;
    font-size: 16px;
    color: ${disabledText};
    margin: 8px 12px;
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

const LoginBody = styled.div`
    position: relative;
    height: 100%;
    border-radius: 6px;
`;

const LoginItems = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const LoginButtonContainer = styled.div`
    align-self: center;
    margin: 16px;
`;

const AuthRegisterButtonContainer = styled.div`
    margin: 4px;
`;

const checkValidUsername = gql`
    query websiteCheckValidUserFromWeb($username: Username!) {
        web {
            userAvailableUsername(username: $username) {
                available
            }
        }
    }
`;

class RegistrationBox extends React.Component {
    props;

    render() {
        return (
            <LoginBox>
                <RegisterNav
                    onClick={this.props.sideClickHandler}
                    mode={this.props.sideMode}
                    previousMode={this.props.previousMode}
                    resetClick={this.props.resetClick}
                    signUpClick={this.props.signUpClick}
                    signInClick={this.props.signInClick}
                />
                <LoginBody>
                    <LoginItems>
                        {this.props.handleFirstNameChange && (
                            <AnimateContainer>
                                <TextInput
                                    placeholder='Name'
                                    onTextChange={
                                        this.props.handleFirstNameChange
                                    }
                                    errorMessage={
                                        this.props.firstNameErrorMessage
                                    }
                                    value={this.props.firstName}
                                />
                            </AnimateContainer>
                        )}
                        {this.props.handleLastNameChange && (
                            <AnimateContainer>
                                <TextInput
                                    placeholder='Last Name'
                                    onTextChange={
                                        this.props.handleLastNameChange
                                    }
                                    errorMessage={
                                        this.props.lastNameErrorMessage
                                    }
                                    value={this.props.lastName}
                                />
                            </AnimateContainer>
                        )}
                        {this.props.handleEmailChange && (
                            <AnimateContainer>
                                <TextInput
                                    placeholder='Email'
                                    onTextChange={this.props.handleEmailChange}
                                    errorMessage={this.props.emailErrorMessage}
                                    value={this.props.email}
                                />
                            </AnimateContainer>
                        )}
                        {this.props.handleUsernameChange && (
                            <Query
                                query={checkValidUsername}
                                variables={{
                                    username: this.props.username || "",
                                }}
                            >
                                {({ loading, error, data }) => {
                                    if (error || this.props.username === "") {
                                        return (
                                            <TextInput
                                                placeholder='Username'
                                                onTextChange={
                                                    this.props
                                                        .handleUsernameChange
                                                }
                                                errorMessage={
                                                    this.props
                                                        .usernameErrorMessage
                                                }
                                                value={this.props.username}
                                            />
                                        );
                                    }

                                    const validUsernameString = data
                                        ? data.web &&
                                          data.web.userAvailableUsername
                                            ? data.web.userAvailableUsername
                                                  .available
                                                ? ""
                                                : "Username is invalid or taken."
                                            : ""
                                        : "";

                                    return (
                                        <TextInput
                                            placeholder='Username'
                                            onTextChange={
                                                this.props.handleUsernameChange
                                            }
                                            errorMessage={
                                                validUsernameString ||
                                                (this.props &&
                                                    this.props
                                                        .usernameErrorMessage)
                                            }
                                            value={this.props.username}
                                        />
                                    );
                                }}
                            </Query>
                        )}
                        {this.props.handlePasswordChange && (
                            <AnimateContainer>
                                <TextInput
                                    placeholder='Password'
                                    onTextChange={
                                        this.props.handlePasswordChange
                                    }
                                    errorMessage={this.props.passErrorMessage}
                                    value={this.props.password}
                                    password={true}
                                />
                            </AnimateContainer>
                        )}
                        {this.props.handlePassword2Change && (
                            <AnimateContainer>
                                <TextInput
                                    placeholder='Confirm Password'
                                    onTextChange={
                                        this.props.handlePassword2Change
                                    }
                                    errorMessage={this.props.pass2ErrorMessage}
                                    value={this.props.password2}
                                    password={true}
                                />
                            </AnimateContainer>
                        )}
                        <LoginButtonContainer>
                            <PinkButton onClick={this.props.handleSubmitBox}>
                                {this.props.actionButtonText}
                            </PinkButton>
                        </LoginButtonContainer>
                        {this.props.email && (
                            <ReCAPTCHA
                                sitekey={captchaKey}
                                onChange={this.props.handleCaptcha}
                            />
                        )}
                        <TermsText>{"- OR -"}</TermsText>

                        <AuthRegisterButtonContainer>
                            <IconTextButton
                                image='https://storage.googleapis.com/blerp-web-images/sign-in/btn_google_light_normal.svg'
                                link={`${apiHost}/auth/google?pass=${currentHost}/${
                                    this.props.returnTo &&
                                    this.props.returnTo !== "/"
                                        ? this.props.returnTo
                                        : ""
                                }&fail=${currentHost}/auth-fail`}
                                alt='Login with Google'
                                text='Login with Google'
                                textColor={primaryText}
                                iconColor='#ffffffdd'
                                backgroundColor='#4285F4'
                                height='48px'
                            />
                        </AuthRegisterButtonContainer>

                        <AuthRegisterButtonContainer>
                            <IconTextButton
                                image='https://storage.googleapis.com/blerp-web-images/static/apps/Discord-Logo-Color.svg'
                                link={`${apiHost}/auth/discord?pass=${currentHost}/${
                                    this.props.returnTo &&
                                    this.props.returnTo !== "/"
                                        ? this.props.returnTo
                                        : ""
                                }&fail=${currentHost}/auth-fail`}
                                alt='Login With Discord'
                                text='Login With Discord'
                                textColor={primaryText}
                                iconColor='#ffffffdd'
                                backgroundColor='#7289DA'
                                height='48px'
                            />
                        </AuthRegisterButtonContainer>

                        <AuthRegisterButtonContainer>
                            <IconTextButton
                                image='https://storage.googleapis.com/blerp_products/Web/Home/twitch_Glitch_Purple_RGB_2_smallish.png'
                                link={`${apiHost}/auth/twitch?pass=${currentHost}/${
                                    this.props.returnTo &&
                                    this.props.returnTo !== "/"
                                        ? this.props.returnTo
                                        : ""
                                }&fail=${currentHost}/auth-fail`}
                                alt='Login with Twitch'
                                text='Login with Twitch'
                                textColor={primaryText}
                                iconColor='#ffffffdd'
                                backgroundColor='#6441A4'
                                height='48px'
                            />
                        </AuthRegisterButtonContainer>

                        <TermsText>
                            {"By signing up, you agree to Blerp's "}
                            <Link
                                prefetch={true}
                                href={{ pathname: "/terms" }}
                                as={"/resources/terms-of-service"}
                            >
                                <TermsLink href='/terms'>
                                    Terms of Use
                                </TermsLink>
                            </Link>
                            {" and "}
                            <Link
                                prefetch={true}
                                href={{ pathname: "/privacy" }}
                                as={"/resources/privacy"}
                            >
                                <TermsLink href='/privacy'>
                                    Privacy Policy
                                </TermsLink>
                            </Link>
                        </TermsText>
                    </LoginItems>
                </LoginBody>
            </LoginBox>
        );
    }
}

export default RegistrationBox;
