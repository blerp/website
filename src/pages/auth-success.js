/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";

import { flowRight as compose } from "lodash";
import { default as Router, withRouter } from "next/router";

import Success from "./template-message";
import withData from "../lib/withData";

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

class Page extends React.Component {
    state;
    props;

    componentDidMount() {
        if (window) {
            // window.location.href = `blrp://auth-success/${cookie}`;
            // window.open(`https://blerp.com/auth-success/${cookie}`, "_self");
            if (window.gtag) {
                window.gtag("event", "account_auth_success", {
                    event_category: "login_success",
                    event_label: "",
                    value: 1,
                });
            }
        }
    }

    render() {
        return (
            <Success
                metaTitle='Successful Login | Blerp'
                title='Successful Login!'
                description="Yaaayy! This is great! I'm so glad you are here."
                imageUrl='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftCircleIbisRed.svg'
                link='/'
            />
        );
    }
}

export default compose(withData, withRouter)(Page);
