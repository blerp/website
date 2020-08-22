/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import LoginBox from "../components/registration/box";
import BoxImage from "../components/shared/Backgrounds/island";
import { withApollo } from "@apollo/react-hoc";

import { default as Router, withRouter } from "next/router";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

import { defaultBackground, flyoutBackground } from "../styles/colors";

import withData from "../lib/withData";

const Container = styled.div`
    background-color: ${flyoutBackground};
    position: relative;
    justify-content: center;
    width: 100vw;
    position: relative;
`;

const BoxContainer = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px;
`;

const FooterContainer = styled.div`
    margin-top: 180px;
`;

const defaultErrorState = {
    passErrorMessage: "",
    emailErrorMessage: "",
    globalErrorMessage: "",
};

const defaultState = {
    email: "",
    password: "",
    captchaValue: false,
    ...defaultErrorState,
};

const logInUserQuery = gql`
    query loginOnWebsite($email: Email!, $password: Password!) {
        web {
            userSignInEmail(record: { email: $email, password: $password }) {
                jwt
                user {
                    _id
                    username
                }
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
        client: ctx.apolloClient,
    });
    state = defaultState;
    props;

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
        if (this.props.router) {
            this.props.router.prefetch("/register");
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

    handlePasswordChange = event => {
        this.setState({ password: event.target.value, passErrorMessage: "" });
    };

    handleSubmitBox = async event => {
        this.resetErrorState();

        if (this.state.email === "") {
            this.setState({
                emailErrorMessage: "Enter a valid email :)",
            });
        }

        if (!validateEmail(this.state.email)) {
            this.setState({
                emailErrorMessage: "Your email is invalid :(",
            });
            return;
        }

        if (this.state.password.length < 6) {
            this.setState({
                passErrorMessage:
                    "Your password should have 6 or more than characters",
            });
            return;
        }

        if (!this.state.captchaValue) {
            this.setState({
                passErrorMessage: "Check the captcha below!",
            });
            return;
        }

        if (this.state.password === "") {
            this.setState({
                passErrorMessage: "You must enter a valid password",
            });
        } else {
            try {
                console.log("TESTING", this.props.client);

                const loginQuery = await this.props.client.query({
                    query: logInUserQuery,
                    variables: {
                        email: this.state.email,
                        password: this.state.password,
                    },
                });

                console.log("TESTING", loginQuery);

                if (window.gtag) {
                    window.gtag("event", "account_login_attempt", {
                        event_category: "login_attempt",
                        event_label: `${this.state.email}`,
                        value: 1,
                    });
                }

                if (
                    loginQuery.data &&
                    loginQuery.data.web &&
                    loginQuery.data.web.userSignInEmail &&
                    loginQuery.data.web.userSignInEmail.jwt
                ) {
                    const JWT = loginQuery.data.web.userSignInEmail.jwt;

                    if (window.localStorage) {
                        window.localStorage.setItem("jwt", JWT);
                    }

                    if (window.gtag) {
                        window.gtag("event", "account_login_success", {
                            event_category: "login_goal",
                            event_label: `${this.state.email}`,
                            value: 1,
                        });
                    }

                    await this.props.client.resetStore();
                    await this.props.client.clearStore();

                    if (this.props.returnTo === "/") {
                        this.props.router.push(`/`);
                    } else {
                        this.props.router.push(
                            `${
                                this.props.returnTo
                                    ? `/${this.props.returnTo}`
                                    : "/"
                            }`,
                        );
                    }
                } else {
                    if (loginQuery.errors && loginQuery.errors[0].details) {
                        this.setState({
                            emailErrorMessage: loginQuery.errors[0].details,
                            globalErrorMessage: loginQuery.errors[0].details,
                        });
                    } else {
                        this.setState({
                            emailErrorMessage: "Invalid email or password",
                            globalErrorMessage: "Invalid email or password",
                        });
                    }
                }
            } catch (exception) {
                this.setState({
                    emailErrorMessage: "Invalid email or password",
                    globalErrorMessage: "Invalid email or password",
                });
            }
        }
    };

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Login Page For Blerp | Soundboards, Clips, Sound Memes | Create Account"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Sign up for blerp sounds to create sound effects, share sound memes, and build meme soundboards! Plug blerp into your favorite voice chats and social channels.'
                    />
                    <meta
                        name='keywords'
                        content='blerp sounds, audio quotes, blerp, best soundboard, Favorite Movies, sounds, funny quotes, tv show moments, great games, funny sound, quotes, movie soundboard, blurp, song lyrics, music snippets'
                    />
                    <link rel='canonical' href='https://blerp.com/login' />
                </Helmet>
                <NavBar />
                <BoxImage />
                <BoxContainer>
                    <LoginBox
                        title={"Login"}
                        actionButtonText={"Login"}
                        handleEmailChange={this.handleEmailChange}
                        handlePasswordChange={this.handlePasswordChange}
                        handleSubmitBox={this.handleSubmitBox}
                        email={this.state.email}
                        password={this.state.password}
                        emailErrorMessage={this.state.emailErrorMessage}
                        passErrorMessage={this.state.passErrorMessage}
                        sideMode={"SIGNIN"}
                        previousMode={"SIGNUP"}
                        returnTo={this.props.returnTo || false}
                        handleCaptcha={this.handleCaptcha}
                    />
                    {/* {this.props.globalErrorMessage !== "" && (
            <ErrorText>{this.props.globalErrorMessage}</ErrorText>
          )} */}
                </BoxContainer>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

export default compose(withData, withRouter, withApollo)(Page);
