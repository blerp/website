/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
import Link from "next/link";

import TextInput from "../components/inputs/text-input";
import RectangleTextButton from "../components/buttons/rectangle-text-button";
import RegisterNav from "../components/registration/register-nav";

import ReCAPTCHA from "react-google-recaptcha";
import projectConfig from "../config";
const apiHost = projectConfig.apiHost;
const currentHost = projectConfig.host;
const captchaKey = projectConfig.captchaKey;

import { default as Router, withRouter } from "next/router";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

import BoxImage from "../components/shared/Backgrounds/island";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    disabledText,
    iconsActive,
    defaultBackground,
    statusColor,
    bodyText,
} from "../styles/colors";

import withData from "../lib/withData";

const Container = styled.div`
    background-color: ${flyoutBackground};
    position: relative;
    justify-content: center;
    width: 100vw;
`;

const BoxContainer = styled.div`
    position: relative;
    margin-top: 120px;
`;

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
    margin: 40px auto;
    border-radius: 6px;
    padding: 20px;
    background-color: ${flyoutBackground};
    position: relative;
`;

const TermsText = styled.div`
    text-align: center;
    font-size: 16px;
    color: ${disabledText};
    margin: 8px 12px;
`;

const NotifyText = styled.div`
    text-align: center;
    font-size: 20px;
    color: ${bodyText};
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
    margin: 8px;
`;

const FooterContainer = styled.div`
    margin-top: 180px;
`;

const defaultErrorState = {
    emailErrorMessage: "",
    globalErrorMessage: "",
};

const defaultState = {
    email: "",
    confirmState: "",
    captchaValue: false,
    ...defaultErrorState,
};

const WEB_RESET_EMAIL = gql`
    mutation mobileSendPasswordReset($email: Email!, $analytics: JSON!) {
        web {
            userSendResetPasswordEmail(
                record: { email: $email }
                analytics: { data: $analytics }
            ) {
                complete
            }
        }
    }
`;

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Page extends React.Component {
    static getInitialProps = ctx => ({
        returnTo: ctx.query.returnTo,
    });
    state = defaultState;
    props;

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
        if (this.props.router) {
            this.props.router.prefetch("/register");
            this.props.router.prefetch("/login");
        }
    }

    handleCaptcha = captchaValue => {
        if (captchaValue) {
            this.setState({
                captchaValue: captchaValue,
            });
        } else {
            this.setState({
                captchaValue: null,
            });
        }
    };

    resetState = () => {
        this.setState(defaultState);
    };

    resetErrorState = () => {
        this.setState(defaultErrorState);
    };

    handleEmailChange = event => {
        this.setState({
            email: event.target.value.trim().toLowerCase(),
            emailErrorMessage: "",
        });
    };

    handleSubmitBox = sendResetConfirmation => async event => {
        this.resetErrorState();

        if (this.state.email === "") {
            this.setState({
                emailErrorMessage: "Enter a valid email :)",
            });
            return;
        }

        if (!validateEmail(this.state.email)) {
            this.setState({
                emailErrorMessage: "Your email is invalid :(",
            });
            return;
        }

        if (!this.state.captchaValue) {
            this.setState({
                emailErrorMessage: "Check the captcha below!",
            });
            return;
        }

        try {
            const isCompleted = await sendResetConfirmation({
                variables: {
                    email: this.state.email,
                    analytics: {},
                },
            });

            if (isCompleted.data.web.userSendResetPasswordEmail.complete) {
                this.setState({ confirmState: "SUCCESS" });
            } else {
                this.setState({
                    emailErrorMessage: "Something wrong happaned!",
                });
            }
        } catch (exception) {
            this.setState({
                emailErrorMessage: "Something wrong happened :(",
            });
        }
    };

    render() {
        if (this.state.confirmState === "SUCCESS") {
            return (
                <Container role='application'>
                    <Helmet>
                        <title>
                            {"Soundboards, Audio Clips, and Sound Memes"}
                        </title>
                        <meta
                            name='description'
                            content='Having trouble logging into blerp sounds? Reset your email to start accessing yoru favorite sound memes!'
                        />
                    </Helmet>
                    <NavBar />
                    <BoxImage />
                    <BoxContainer>
                        <LoginBox>
                            <RegisterNav
                                mode={"RESET"}
                                previousMode={"SIGNIN"}
                            />
                            <LoginBody>
                                <LoginItems>
                                    <NotifyText>
                                        {
                                            "If email account exists, an email has been sent to you with further instructions."
                                        }
                                    </NotifyText>
                                    <NotifyText>
                                        <Link prefetch={true} href='/login'>
                                            <TermsLink>
                                                Navigate to Login
                                            </TermsLink>
                                        </Link>
                                        {" or "}
                                        <Link prefetch={true} href='/'>
                                            <TermsLink>
                                                Explore More Blerps
                                            </TermsLink>
                                        </Link>
                                    </NotifyText>
                                </LoginItems>
                            </LoginBody>
                        </LoginBox>
                    </BoxContainer>
                    <FooterContainer>
                        <Footer />
                    </FooterContainer>
                </Container>
            );
        }

        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {"Reset Email | Soundboards and Sound Memes | Blerp"}
                    </title>
                </Helmet>
                <NavBar />
                <BoxImage />
                <BoxContainer>
                    <LoginBox>
                        <RegisterNav mode={"RESET"} previousMode={"SIGNIN"} />
                        <LoginBody>
                            <LoginItems>
                                {this.handleEmailChange && (
                                    <AnimateContainer>
                                        <TextInput
                                            placeholder='Email'
                                            onTextChange={
                                                this.handleEmailChange
                                            }
                                            errorMessage={
                                                this.state.emailErrorMessage
                                            }
                                            value={this.state.email}
                                        />
                                    </AnimateContainer>
                                )}
                                <LoginButtonContainer>
                                    <Mutation mutation={WEB_RESET_EMAIL}>
                                        {sendResetConfirmation => {
                                            return (
                                                <RectangleTextButton
                                                    text={"Reset Password"}
                                                    backgroundColor={pandaPink}
                                                    onClick={this.handleSubmitBox(
                                                        sendResetConfirmation,
                                                    )}
                                                />
                                            );
                                        }}
                                    </Mutation>
                                </LoginButtonContainer>
                                <ReCAPTCHA
                                    sitekey={captchaKey}
                                    onChange={this.handleCaptcha}
                                />
                                <TermsText>
                                    {"By signing up, you agree to Blerp's "}
                                    <Link
                                        prefetch={true}
                                        href={{ pathname: "/terms" }}
                                        as={"/resources/terms-of-service"}
                                    >
                                        <TermsLink>Terms of Use</TermsLink>
                                    </Link>
                                    {" and "}
                                    <Link
                                        prefetch={true}
                                        href={{ pathname: "/privacy" }}
                                        as={"/resources/privacy"}
                                    >
                                        <TermsLink>Privacy Policy</TermsLink>
                                    </Link>
                                </TermsText>
                            </LoginItems>
                        </LoginBody>
                    </LoginBox>
                </BoxContainer>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
