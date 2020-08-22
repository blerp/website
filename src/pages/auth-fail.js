/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { flowRight as compose } from "lodash";
import { default as Router, withRouter } from "next/router";

import Fail from "./template-message";
import withData from "../lib/withData";

class Page extends React.Component {
    state;
    props;

    componentDidMount() {
        if (window) {
            if (window.gtag) {
                window.gtag("event", "account_auth_fail", {
                    event_category: "login_fail",
                    event_label: "",
                    value: -1,
                });
            }
        }
    }

    render() {
        return (
            <Fail
                metaTitle='501 | Failed Access'
                title='Login Failed..! Is your email verified with your provider (Twitch, Google..etc)?'
                description='Email support@blerp.com if this problem persists.'
                imageUrl='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftCircleIbisRed.svg'
                link='/login'
            />
        );
    }
}

export default compose(withData, withRouter)(Page);
