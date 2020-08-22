/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { graphql, withApollo } from "@apollo/react-hoc";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import LogoutBox from "../components/registration/logout-box";

import { default as Router, withRouter } from "next/router";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import BoxImage from "../components/shared/Backgrounds/island";

import {
    defaultBackground,
    statusColor,
    flyoutBackground,
} from "../styles/colors";

import withData from "../lib/withData";

import projectConfig from "../config";
const jwtDomain = projectConfig.jwtDomain;

const Container = styled.div`
    background-color: ${flyoutBackground};
    position: relative;
    justify-content: center;
    width: 100vw;
`;

const BoxContainer = styled.div`
    width: 100vw;
    position: relative;
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
    ...defaultErrorState,
};

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

function eraseCookie({ name, sDomain, sPath }) {
    document.cookie =
        name +
        "=; Max-Age=-99999999;" +
        "expires=Thu, 01 Jan 1970 00:00:01 GMT;" +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "");
}

class Page extends React.Component {
    state = defaultState;
    props;

    async componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
        eraseCookie({ name: "jwt" });
        eraseCookie({ name: "jwt", sDomain: jwtDomain, sPath: "/" });
        await this.props.client.resetStore();
        await this.props.client.clearStore();

        if (window.localStorage) {
            window.localStorage.removeItem("jwt");
            window.localStorage.clear();
        }
    }

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Logout Page For Blerp | Soundboards, and Sound Memes | Blerp"
                        }
                    </title>
                </Helmet>
                <NavBar />
                <BoxImage />
                <BoxContainer>
                    <LogoutBox />
                </BoxContainer>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

const logOutUserQuery = gql`
    query websiteLogout {
        web {
            userSignedIn {
                _id
                roles
            }
            userSignOut {
                complete
            }
        }
    }
`;

const fetchLogoutWrap = graphql(logOutUserQuery, {
    options: props => ({
        ssr: false,
    }),
});

export default compose(withData, withRouter, withApollo, fetchLogoutWrap)(Page);
