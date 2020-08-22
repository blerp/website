/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";

import { default as Router, withRouter } from "next/router";

import CustomMessage from "../components/messages/custom-message";
import GenericBox from "../components/shared/GenericBox";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

import { defaultBackground, statusColor } from "../styles/colors";

import withData from "../lib/withData";
import { logEvent } from "../lib/analytics";

const Container = styled.div`
    background-color: ${defaultBackground};
    position: relative;
    justify-content: center;
    width: 100vw;
`;

const BoxContainer = styled.div`
    width: 100vw;
`;

const MessageContainer = styled.div`
    margin: auto;
    text-align: center;
    padding: 80px 0;
`;

const LogoutText = styled.div`
    text-align: center;
    margin: auto;
    color: ${statusColor};
`;

const FooterContainer = styled.div``;

class Page extends React.Component {
    static defaultProps = {
        metaTitle: "Soundboards, Audio Clips, and Sound Memes",
        title: "This is awkward. Let me take you home!",
        description:
            "If this happens again let me know at support@blerp.com. I'll get my peeps on it!",
        imageUrl:
            "https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftCircleIbisRed.svg",
        link: "/",
    };
    state;
    props;

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>{this.props.metaTitle}</title>
                </Helmet>
                <NavBar />
                <BoxContainer>
                    <GenericBox>
                        <MessageContainer>
                            <CustomMessage
                                night={true}
                                title={this.props.title}
                                description={this.props.description}
                                imageUrl={this.props.imageUrl}
                                href={this.props.link}
                            />
                        </MessageContainer>
                    </GenericBox>
                </BoxContainer>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
