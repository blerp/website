/*
 * BLERP Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp Inc. All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";

import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";
import ResetBox from "./ResetBox";

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boxState: "REGISTER",
        };
    }

    resetClick = () => {
        this.setState({ boxState: "RESET" });
    };
    signUpClick = () => {
        this.setState({ boxState: "REGISTER" });
    };

    signInClick = () => {
        this.setState({ boxState: "LOGIN" });
    };

    render() {
        switch (this.state.boxState) {
            case "RESET":
                return (
                    <ResetBox
                        resetClick={this.resetClick}
                        signUpClick={this.signUpClick}
                        signInClick={this.signInClick}
                    />
                );
            case "LOGIN":
                return (
                    <LoginBox
                        resetClick={this.resetClick}
                        signUpClick={this.signUpClick}
                        signInClick={this.signInClick}
                    />
                );
            case "REGISTER":
            default:
                return (
                    <RegisterBox
                        resetClick={this.resetClick}
                        signUpClick={this.signUpClick}
                        signInClick={this.signInClick}
                    />
                );
        }
    }
}

export default Page;
