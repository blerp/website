/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";

import { default as Router, withRouter } from "next/router";
import Footer from "../components/navigation/footer";

import projectConfig from "../config";
const hostDomain = projectConfig.host;

import NavBar from "../components/navigation/navbar";
import withData from "../lib/withData";
import TabBar from "../components/navigation/tabbar";

import MainLink from "../components/link/MainLink";

import {
    defaultBackground,
    statusColor,
    bodyText,
    pandaPink,
    flyoutBackground,
    secondarySubtitleText,
    secondaryText,
    pandaTeal,
    focusState,
    darkText,
    ligherBackground,
    lightGray,
    headerText,
} from "../styles/colors";

const Container = styled.div`
    position: relative;
    justify-content: center;
`;

const HeaderContainer = styled.div`
    background-color: ${flyoutBackground};
    text-align: center;
    padding: 60px;
`;

const MainTitleH1 = styled.h1`
    color: #1d1d1d;
    font-weight: bold;
    font-size: 40px;
    text-decoration: none;
    margin: 0;
`;

const SecondaryTitleH2 = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 28px;
    text-decoration: none;
    margin: 0;
    padding-top: 12px;
    font-size: 20px;
`;

const RowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    background-color: ${props => props.color};
    height: 120px;

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Blerp | Connect With Us | Our Company Story Podcast and Audio Content"
                        }
                    </title>
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    <MainTitleH1>{"Listen to Blerp's Podcast!"}</MainTitleH1>
                    <SecondaryTitleH2>
                        {
                            "Follow our journey as we share our lessons using the power of voice, audio, and storytelling!"
                        }
                    </SecondaryTitleH2>
                </HeaderContainer>
                <RowContainer color={ligherBackground}>
                    <MainLink
                        text={"Blerp's Postcast"}
                        href={"https://anchor.fm/blerp"}
                        as={"https://anchor.fm/blerp"}
                        dontPrefetch={true}
                    />
                </RowContainer>
                <RowContainer color={flyoutBackground}>
                    <MainLink
                        text={"Aaron Founder's Postcast"}
                        href={"https://anchor.fm/ah"}
                        as={"https://anchor.fm/ah"}
                        dontPrefetch={true}
                    />
                </RowContainer>
                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
