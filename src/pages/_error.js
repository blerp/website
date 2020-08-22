/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import { default as Router, withRouter } from "next/router";
import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import withData from "../lib/withData";

import NoBlerpFoundPage from "./not-found";

// interface Props {
//   statusCode?: object;
// }

const Container = styled.div``;

class Error extends React.Component {
    static getInitialProps({ res, jsonPageRes }) {
        const statusCode = res
            ? res.statusCode
            : jsonPageRes
            ? jsonPageRes.status
            : null;
        return { statusCode };
    }
    props;

    handleCreateClick = event => {
        this.props.router.push("/");
    };

    render() {
        return (
            <Container>
                <Helmet>
                    {/* <title>{`${this.props.statusCode || "404"} Blerp`}</title> */}
                    <title>{`Error Page | Go to Home Page for More Sound Memes`}</title>

                    <meta
                        name='description'
                        content='You may be lost. This is the error page for blerp.com. Go to the home page to find more sound memes and audio clips.'
                    />
                </Helmet>
                <NoBlerpFoundPage
                    mainText='Oh No!'
                    subtitle='Looks like we are lost!!'
                    onPinkButtonClick={this.handleCreateClick}
                    redirectButtonText={"Take us home!"}
                    searchQuery={this.props.searchQuery}
                />
            </Container>
        );
    }
}

export default withRouter(withData(Error));
