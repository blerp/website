/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
import Link from "next/link";

import { default as Router, withRouter } from "next/router";
import Footer from "../components/navigation/footer";

import CustomMessage from "../components/messages/custom-message";
import SecondaryButton from "../components/buttons/secondary-button";
import ColorButton from "../components/buttons/color-button";
import LoadingFullScreen from "../components/loading/loading-full-screen";
import LoadingScroll from "../components/loading/loading-scroll";
import MainLink from "../components/link/MainLink";

import projectConfig from "../config";
const hostDomain = projectConfig.host;

import NavBar from "../components/navigation/navbar";
import withData from "../lib/withData";
import TabBar from "../components/navigation/tabbar";

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
    position: relative;
    background: transparent;
    text-align: center;
    padding: 80px 40px 24px;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

const MainTitleH1 = styled.h1`
    color: ${darkText};
    font-weight: bold;
    font-size: 40px;
    text-decoration: none;
    margin: 0;
    padding: 16px;
`;

const SecondaryTitleH2 = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: light;
    text-decoration: none;
    margin: 0;
    padding: 16px;
    font-size: 20px;
`;

const RowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background-color: ${props => props.color};

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const TitleH3 = styled.h3`
    color: ${bodyText};
    font-weight: bold;
    text-decoration: none;
    margin: 4px;
    padding-top: 12px;
    font-size: 28px;
`;

const Subtitle = styled.h4`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    margin: 4px;
`;

const Paragraph = styled.p`
    color: ${bodyText};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    text-align: center;
`;

const SoundVideo = styled.video`
    width: 100%;
    position: absolute;
    top: -100;
    left: 0;
    z-index: -1;

    @media (max-width: 600px) {
        top: 0px;
    }
`;

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    renderRowContent({ header, subtitle, paragraph, color }) {
        return (
            <RowContainer color={color}>
                <TitleH3>{header}</TitleH3>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
                <Paragraph>{paragraph}</Paragraph>
            </RowContainer>
        );
    }

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "How Blerp is Used | Play All Sound Buttons Free | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Learn more about how you can use Blerp and start expressing yourself through our audio meme soundboard.'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    <SoundVideo
                        autoPlay={true}
                        preload='true'
                        loop={true}
                        muted={true}
                    >
                        <source
                            src='https://storage.googleapis.com/blerp-public-images/video/slow-audiowave_1.mp4'
                            type='video/mp4'
                        />
                        Looping Background Video
                    </SoundVideo>
                    <MainTitleH1>{"How Blerp is Used?"}</MainTitleH1>
                    <SecondaryTitleH2>
                        {
                            "Endless stream of dank audio memes - at the power of your fingertips. Share funny audio clips on many of the platforms you communicate and interact on."
                        }
                    </SecondaryTitleH2>
                </HeaderContainer>
                <RowContainer color={defaultBackground}>
                    <Paragraph>
                        Blerpers commonly use our audio search engine on sites
                        like{" "}
                        <MainLink
                            href={"/twitch"}
                            as={"/soundboard-products/twitch"}
                            text={"Twitch"}
                            inline={true}
                            bigLink={true}
                        />
                        {", "}
                        <MainLink
                            href={"/discord"}
                            as={"/soundboard-products/discord"}
                            text={"Discord"}
                            inline={true}
                            bigLink={true}
                        />
                        {", or even "}
                        <MainLink
                            href={"/voice-assistants"}
                            as={"/soundboard-products/voice-assistants"}
                            text={"Voice Assistants"}
                            inline={true}
                            bigLink={true}
                        />
                        .
                    </Paragraph>
                    <Paragraph>
                        As we continue to keep learn new ways to Blerp, we want
                        to know where you want to share audio clips.
                        <MainLink
                            as={`/blerps/suggest-ways-to-blerp`}
                            href={`/suggest-ways-to-blerp`}
                            text={"Suggest ways to Blerp today."}
                            inline={true}
                        />
                    </Paragraph>
                </RowContainer>
                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
