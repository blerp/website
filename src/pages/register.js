/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { graphql, withApollo } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";

import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
import LoginBox from "../components/registration/box";

import { default as Router, withRouter } from "next/router";
import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

import BoxImage from "../components/shared/Backgrounds/island";

import { flyoutBackground, focusState } from "../styles/colors";

import withData from "../lib/withData";

const Container = styled.div`
    background-color: ${flyoutBackground};
    position: relative;
    justify-content: center;
    width: 100vw;
`;

const BoxContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px;
`;

const FooterContainer = styled.div`
    display: block;
    margin-top: 300px;
`;

const defaultErrorState = {
    passErrorMessage: "",
    pass2ErrorMessage: "",
    emailErrorMessage: "",
    firstNameErrorMessage: "",
    lastNameErrorMessage: "",
    usernameErrorMessage: "",
};

const defaultState = {
    email: "",
    password: "",
    password2: "",
    firstName: "",
    lastName: "",
    username: "",
    captchaValue: false,
    ...defaultErrorState,
};

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
            this.props.router.prefetch("/login");
        }
    }

    resetState = () => {
        this.setState(defaultState);
    };

    resetErrorState = () => {
        this.setState(defaultErrorState);
    };

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

    handleEmailChange = event => {
        this.setState({
            email: event.target.value.trim().toLowerCase(),
            emailErrorMessage: "",
        });
    };

    handlePasswordChange = event => {
        this.setState({ password: event.target.value, passErrorMessage: "" });
    };

    handlePassword2Change = event => {
        this.setState({ password2: event.target.value, pass2ErrorMessage: "" });
    };

    handleFirstNameChange = event => {
        this.setState({
            firstName: event.target.value,
            firstNameErrorMessage: "",
        });
    };

    handleLastNameChange = event => {
        this.setState({
            lastName: event.target.value,
            lastNameErrorMessage: "",
        });
    };

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value.trim().toLowerCase(),
            usernameErrorMessage: "",
        });
    };

    handleSubmitBox = async event => {
        this.resetErrorState();

        this.setState({
            email: this.state.email.trim().toLowerCase(),
            firstName: this.state.firstName.trim(),
            lastName: this.state.lastName.trim(),
            username: this.state.username.trim(),
        });

        if (this.state.email === "") {
            this.setState({
                emailErrorMessage: "Your email is invalid :(",
            });
            return;
        }

        if (!validateEmail(this.state.email)) {
            this.setState({
                emailErrorMessage: "You must enter a valid email",
            });
            return;
        }

        if (this.state.username === "") {
            this.setState({
                usernameErrorMessage: "You must enter a valid username",
            });
            return;
        }

        const ascii = /^[0-9a-zA-Z]+$/;

        if (!ascii.test(this.state.username)) {
            // string has non-ascii characters
            this.setState({
                usernameErrorMessage:
                    "Usernames can only have numbers or letters!",
            });
            return;
        }

        if (this.state.username && this.state.username.length < 3) {
            this.setState({
                usernameErrorMessage:
                    "Username must be greater than 2 characters",
            });
            return;
        }

        if (this.state.firstName === "") {
            this.setState({
                firstNameErrorMessage: "First name required",
            });
            return;
        }

        // if (this.state.lastName === "") {
        //   this.setState({
        //     lastNameErrorMessage: "Last name required"
        //   });
        //   return;
        // }

        if (this.state.password === "") {
            this.setState({
                passErrorMessage: "You must enter a valid password",
            });
            return;
        }

        // if (this.state.password2 === '') {
        //   this.setState({
        //     pass2ErrorMessage: 'You must enter a valid password'
        //   });
        //   return;
        // }

        if (this.state.password.length < 6) {
            this.setState({
                passErrorMessage:
                    "Password must have 6 or more than characters",
            });
            return;
        }

        // if (this.state.password2.length < 6) {
        //   this.setState({
        //     pass2ErrorMessage: 'Password must have 6 or more than characters'
        //   });
        //   return;
        // }

        // if (this.state.password2 !== this.state.password) {
        //   this.setState({
        //     pass2ErrorMessage: 'Your passwords do not match!'
        //   });
        //   return;
        // }

        if (!this.state.captchaValue) {
            this.setState({
                pass2ErrorMessage: "Check the captcha below!",
            });
            return;
        }

        const queryVariables = {
            firstName: this.state.firstName,
            lastName: "",
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

        if (window.gtag) {
            window.gtag("event", "account_create_start", {
                event_category: "account_create_attempt",
                event_label: `${this.state.email}`,
                value: 1,
            });
        }

        const registerMutation = await this.props.registerUserFromEmail({
            variables: queryVariables,
            fetchPolicy: "no-cache",
        });

        if (
            registerMutation.data.web.userRegisterEmail &&
            registerMutation.data.web.userRegisterEmail.user._id
        ) {
            const UserID = registerMutation.data.web.userRegisterEmail.user._id;
            const JWT = registerMutation.data.web.userRegisterEmail.jwt;

            if (window.gtag) {
                window.gtag("event", "account_create_success", {
                    event_category: "login_goal",
                    event_label: `${this.state.email}`,
                    value: 1,
                });
            }

            await this.props.client.resetStore();
            await this.props.client.clearStore();

            if (this.props.returnTo === "/") {
                this.props.router.push(
                    `/user?username=${UserID}`,
                    `/user/${UserID}`,
                );
            } else {
                this.props.router.push(
                    `${this.props.returnTo ? `/${this.props.returnTo}` : "/"}`,
                );
            }

            // this.props.router.push(`/login`);
        } else {
            // TODO: Set Invalidation Errors
            if (
                registerMutation.errors &&
                registerMutation.errors[0].details === "ERROR_EMAIL_TAKEN"
            ) {
                this.setState({
                    emailErrorMessage: "Drats.. This Email Is Taken!!",
                });
            } else if (
                registerMutation.errors &&
                registerMutation.errors[0].details === "ERROR_USERNAME_TAKEN"
            ) {
                this.setState({
                    usernameErrorMessage: "Drats.. This Username Is Taken!!",
                });
            } else {
                this.setState({
                    emailErrorMessage: "Registration Failed!",
                });
            }
        }
    };

    handleSideBarClick = event => {
        this.props.router.push("/login");
    };

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Register for Blerp | Create an Account | Soundboard Maker"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Register for blerp sounds to create sound effects, share sound memes, and build meme soundboards! Find all the audio clips.'
                    />
                </Helmet>
                <NavBar />
                <BoxImage />
                <BoxContainer>
                    <LoginBox
                        title={"Register"}
                        headerColor={focusState}
                        actionButtonText={"Register"}
                        handleSubmitBox={this.handleSubmitBox}
                        email={this.state.email}
                        emailErrorMessage={this.state.emailErrorMessage}
                        handleEmailChange={this.handleEmailChange}
                        password={this.state.password}
                        password2={this.state.password2}
                        passErrorMessage={this.state.passErrorMessage}
                        pass2ErrorMessage={this.state.pass2ErrorMessage}
                        handlePasswordChange={this.handlePasswordChange}
                        // handlePassword2Change={this.handlePassword2Change}
                        handleUsernameChange={this.handleUsernameChange}
                        usernameErrorMessage={this.state.usernameErrorMessage}
                        username={this.state.username}
                        handleFirstNameChange={this.handleFirstNameChange}
                        firstNameErrorMessage={this.state.firstNameErrorMessage}
                        firstName={this.state.firstName}
                        sideMode={"SIGNUP"}
                        previousMode={"SIGNIN"}
                        returnTo={this.props.returnTo}
                        handleCaptcha={this.handleCaptcha}
                    />
                </BoxContainer>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

const registrationUserEmailMutation = gql`
    mutation websiteRegisterUser(
        $firstName: String!
        $lastName: String!
        $username: Username!
        $email: Email!
        $password: Password!
    ) {
        web {
            userRegisterEmail(
                record: {
                    firstName: $firstName
                    lastName: $lastName
                    username: $username
                    email: $email
                    password: $password
                }
            ) {
                jwt
                user {
                    _id
                }
            }
        }
    }
`;

export default compose(
    withData,
    graphql(registrationUserEmailMutation, {
        name: "registerUserFromEmail",
    }),
    withApollo,
    withRouter,
)(Page);
