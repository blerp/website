/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";

import { flowRight as compose } from "lodash";
import styled, { keyframes } from "styled-components";

import { default as Router, withRouter } from "next/router";

import Success from "./template-message";

import { defaultBackground, statusColor } from "../styles/colors";

import withData from "../lib/withData";
import { logEvent } from "../lib/analytics";

const Container = styled.div`
    background-color: ${defaultBackground};
    position: relative;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

const BoxContainer = styled.div`
    width: 100vw;
    height: 80vh;
`;

const MessageContainer = styled.div`
    margin: auto;
    text-align: center;
    padding: 80px;
`;

const LogoutText = styled.div`
    text-align: center;
    margin: auto;
    color: ${statusColor};
`;

const FooterContainer = styled.div``;

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts
            .pop()
            .split(";")
            .shift();
    }
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

class Page extends React.Component {
    state;
    props;

    componentDidMount() {
        const cookie = getCookie("jwt");
        if (window) {
            const platform = getMobileOperatingSystem();
            window.location.href =
                platform === "iOS"
                    ? `blrp://auth-success/${cookie}`
                    : `https://blerp.com/auth-success/${cookie}`;
            // blrp://blrp/auth-success/${cookie}
            // window.open(`https://blerp.com/auth-success/${cookie}`, "_self");
        }
    }

    render() {
        return (
            <Success
                metaTitle='Successful Mobile Login | Blerp'
                title='Successful Login!!'
                description='Wait for redirect or close this screen!'
                imageUrl='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftCircleIbisRed.svg'
                link='/'
            />
        );
    }
}

export default compose(withData, withRouter)(Page);
