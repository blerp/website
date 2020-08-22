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

import projectConfig from "../config";
const apiHost = projectConfig.apiHost;
const currentHost = projectConfig.host;

import { default as Router, withRouter } from "next/router";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

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
    background-color: ${defaultBackground};
    position: relative;
    justify-content: center;
    width: 100vw;
`;

const BoxImage = styled.div`
    background-image: url("https://storage.googleapis.com/blerp_products/ArtWork/LoginPageSpringv4Q1_19'%401x.svg");
    position: absolute;
    height: 110vh;
    top: -120px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const BoxContainer = styled.div`
    width: 100vw;
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
    margin: 80px auto 200px;
    border-radius: 6px;
`;

const NotifyText = styled.div`
    text-align: center;
    font-size: 20px;
    color: ${bodyText};
    margin: 8px 12px;
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
    margin: 8px;
`;

const FooterContainer = styled.div`
    margin-top: 180px;
`;

const defaultErrorState = {
    emailErrorMessage: "",
    globalErrorMessage: "",
    passErrorMessage: "",
    pass2ErrorMessage: "",
};

const defaultState = {
    email: "",
    password: "",
    password2: "",
    confirmState: "",
    token: "",
    ...defaultErrorState,
};

const WEB_RESET_PASSWORD = gql`
    mutation websiteUserResetPassword(
        $token: String!
        $newPassword: Password!
        $newPasswordConfirm: Password!
    ) {
        web {
            userChangePassword(
                record: {
                    verificationToken: $token
                    newPassword: $newPassword
                    newPasswordConfirm: $newPasswordConfirm
                }
            ) {
                changed
            }
        }
    }
`;

function getQueryStringValue(key) {
    return decodeURIComponent(
        window.location.search.replace(
            new RegExp(
                "^(?:.*[&\\?]" +
                    encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") +
                    "(?:\\=([^&]*))?)?.*$",
                "i",
            ),
            "$1",
        ),
    );
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
        const token = getQueryStringValue("token");
        this.setState({ token: token }, () => {
            window.history.replaceState(null, null, `/pass-pass-reset`);
        });
    }

    resetState = () => {
        this.setState(defaultState);
    };

    resetErrorState = () => {
        this.setState(defaultErrorState);
    };

    handlePasswordChange = event => {
        this.setState({ password: event.target.value, passErrorMessage: "" });
    };

    handlePassword2Change = event => {
        this.setState({ password2: event.target.value, pass2ErrorMessage: "" });
    };

    handleSubmitBox = mutationCall => async event => {
        this.resetErrorState();

        if (this.state.password === "") {
            this.setState({
                passErrorMessage: "You must enter a valid password",
            });
            return;
        }

        if (this.state.password.length < 6) {
            this.setState({
                passErrorMessage:
                    "Password must have 6 or more than characters",
            });
            return;
        }

        if (this.state.password2 === "") {
            this.setState({
                pass2ErrorMessage: "You must enter a valid password",
            });
            return;
        }

        if (this.state.password2 !== this.state.password) {
            this.setState({
                pass2ErrorMessage: "Your passwords do not match!",
            });
            return;
        }

        try {
            const isCompleted = await mutationCall({
                variables: {
                    token: this.state.token,
                    newPassword: this.state.password,
                    newPasswordConfirm: this.state.password2,
                },
            });

            if (isCompleted.data.web.userChangePassword.changed) {
                this.setState({ confirmState: "SUCCESS" });
            } else {
                this.setState({
                    emailErrorMessage: "Something wrong happaned!",
                    confirmState: "FAIL",
                });
            }
        } catch (exception) {
            this.setState({
                emailErrorMessage: "Something wrong happened :(",
                confirmState: "FAIL",
            });
        }
    };

    render() {
        if (this.state.confirmState === "FAIL") {
            return (
                <Container role='application'>
                    <Helmet>
                        <title>
                            {
                                "Password Reset | Soundboards, Audio Clips, and Sound Memes | Blerp"
                            }
                        </title>
                    </Helmet>
                    <NavBar />
                    <BoxImage />
                    <BoxContainer>
                        <LoginBox>
                            <LoginBody>
                                <LoginItems>
                                    <NotifyText>
                                        {
                                            "Failed to change password! :( Contact support@blerp.com."
                                        }
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
        } else if (this.state.confirmState === "SUCCESS") {
            return (
                <Container role='application'>
                    <Helmet>
                        <title>
                            {"Soundboards, Audio Clips, and Sound Memes"}
                        </title>
                    </Helmet>
                    <NavBar />
                    <BoxImage />
                    <BoxContainer>
                        <LoginBox>
                            <LoginBody>
                                <LoginItems>
                                    <NotifyText>
                                        {"Successfully Changed Your Password!"}
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
                    <title>{"Soundboards, Audio Clips, and Sound Memes"}</title>
                </Helmet>
                <NavBar />
                <BoxImage />
                <BoxContainer>
                    <LoginBox>
                        <LoginBody>
                            <LoginItems>
                                {this.handlePasswordChange && (
                                    <AnimateContainer>
                                        <TextInput
                                            placeholder='New Password'
                                            onTextChange={
                                                this.handlePasswordChange
                                            }
                                            errorMessage={
                                                this.state.passErrorMessage
                                            }
                                            value={this.state.password}
                                            password={true}
                                        />
                                    </AnimateContainer>
                                )}
                                {this.handlePassword2Change && (
                                    <AnimateContainer>
                                        <TextInput
                                            placeholder='Confirm Password'
                                            onTextChange={
                                                this.handlePassword2Change
                                            }
                                            errorMessage={
                                                this.state.pass2ErrorMessage
                                            }
                                            value={this.state.password2}
                                            password={true}
                                        />
                                    </AnimateContainer>
                                )}
                                <LoginButtonContainer>
                                    <Mutation mutation={WEB_RESET_PASSWORD}>
                                        {mutationCall => {
                                            return (
                                                <RectangleTextButton
                                                    text={"CHANGE PASSWORD"}
                                                    backgroundColor={pandaPink}
                                                    onClick={this.handleSubmitBox(
                                                        mutationCall,
                                                    )}
                                                />
                                            );
                                        }}
                                    </Mutation>
                                </LoginButtonContainer>
                                <TermsText>
                                    {"By signing up, you agree to Blerp's "}
                                    <Link
                                        prefetch={true}
                                        href={{
                                            pathname:
                                                "/resources/terms-of-service",
                                        }}
                                        as={"/terms"}
                                    >
                                        <TermsLink href='/resources/terms-of-service'>
                                            Terms of Use
                                        </TermsLink>
                                    </Link>
                                    {" and "}
                                    <Link
                                        prefetch={true}
                                        href={{
                                            pathname: "/resources/privacy",
                                        }}
                                        as={"/privacy"}
                                    >
                                        <TermsLink href='/resources/privacy'>
                                            Privacy Policy
                                        </TermsLink>
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
