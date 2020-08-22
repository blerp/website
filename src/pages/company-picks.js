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
import MainLink from "../components/link/MainLink";
import { default as Router, withRouter } from "next/router";
import Footer from "../components/navigation/footer";

import CustomMessage from "../components/messages/custom-message";
import SecondaryButton from "../components/buttons/secondary-button";
import ColorButton from "../components/buttons/color-button";
import LoadingFullScreen from "../components/loading/loading-full-screen";
import LoadingScroll from "../components/loading/loading-scroll";

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
    display: flex;
    align-item: center;
    justify-content: center;
    background-color: ${flyoutBackground};
    padding: 20px 40px;
    flex-direction: column;
    text-align: center;

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

const MainTitleH1 = styled.h1`
    color: ${bodyText};
    font-weight: bold;
    text-decoration: none;
    margin: 0;
    padding-top: 32px;
    text-align: center;

    &:hover {
        opacity: 0.8;
    }
`;

const SecondaryTitleH2 = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 28px;
    text-decoration: none;
    margin: 0;
    padding-top: 12px;
    font-size: 20px;
    text-align: center;
`;

const RowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    background-color: ${props => props.color};

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const TitleH2 = styled.h3`
    color: ${bodyText};
    font-weight: bold;
    text-decoration: none;
    margin: 4px;
    padding-top: 12px;
    max-width: 320px;
    font-size: 40px;
`;

const TitleH3 = styled.h3`
    color: ${bodyText};
    font-weight: bold;
    text-decoration: none;
    margin: 4px;
    padding-top: 12px;
    font-size: 28px;
    max-width: 320px;
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
    font-size: 16px;
    text-decoration: none;
`;

const BoldParagraph = styled.p`
    color: ${bodyText};
    font-size: 16px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
`;

const MainTemplateLink = styled.a`
    display: block;
    text-decoration: none;
    padding: 4px;
    color: ${focusState};
    font-size: 20px;

    &:hover {
        color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const ThreeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    padding: 20px;
    background-color: ${props => props.color};

    @media (max-width: 600px) {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 40px;
    }
`;

const SoundVideo = styled.video`
    width: 320px;
    height: 200px;
    margin: 8px;
`;

const TeamPicture = styled.img`
    width: 320px;
    margin: 40px;
`;

const UnStyleLink = styled.a`
    text-decoration: none;
`;

const SocialContainerItem = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    &:hover {
        opacity: 0.7;
    }
`;

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    playBlerp = () => {
        const audio = new Audio(
            "https://audio.blerp.com/audio/b3efc7e0-f20e-11e8-b17c-dd2e9bdb6825?type=MP3",
        );
        audio.play();
    };

    navigateToPath = path => () => {
        window.location.href = path;
    };

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Company Blerp Picks | Favorite Blerp Team Audio Clips| Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Company picks - hear what our Blerp team is listening to this month. Listen to funny sound bites, and dank audio memes with our audio search engine. Sign up today.'
                    />
                    <meta
                        property='og:description'
                        content='Company picks - hear what our Blerp team is listening to this month. Listen to funny sound bites, and dank audio memes with our audio search engine. Sign up today.'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    <MainTitleH1 onClick={this.playBlerp}>
                        {"Company Picks"}
                    </MainTitleH1>
                    <SecondaryTitleH2>
                        {"See what our Blerp team is listening to!"}
                    </SecondaryTitleH2>
                </HeaderContainer>
                <RowContainer
                    onClick={this.navigateToPath("/company/about-us")}
                    color={flyoutBackground}
                >
                    <TitleH2>{"Aaron's Picks"}</TitleH2>
                </RowContainer>
                <ThreeContainer color={flyoutBackground}>
                    <UnStyleLink href='https://blerp.com/soundbites/5b800da4d9ab410005155bb9'>
                        <SocialContainerItem>
                            <SoundVideo width={320} height={240} controls>
                                <source
                                    src='https://storage.googleapis.com/blerp-public-images/video/picks/legendwindmill.mp4'
                                    type='video/mp4'
                                />
                                Windmill Hut Tune From Legend of Zelda
                            </SoundVideo>
                            <TitleH3>{"Windmill Hut Tune"}</TitleH3>
                            <Subtitle>{"Legend of Zelda"}</Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>

                    <UnStyleLink href='https://blerp.com/soundbites/5b237fbafca7167a3561979f'>
                        <SocialContainerItem>
                            <SoundVideo width={320} height={240} controls>
                                <source
                                    src='https://storage.googleapis.com/blerp-public-images/video/justdoit!.mp4'
                                    type='video/mp4'
                                />
                                Just Do It Sound Video
                            </SoundVideo>
                            <TitleH3>{"Just Do It!"}</TitleH3>
                            <Subtitle>{"Shia LaBeouf"}</Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>

                    <UnStyleLink href='https://blerp.com/soundbites/5b237fbafca7167a356195f2'>
                        <SocialContainerItem>
                            <SoundVideo width={320} height={240} controls>
                                <source
                                    src='https://storage.googleapis.com/blerp-public-images/video/picks/rickroll.mp4'
                                    type='video/mp4'
                                />
                                Rick Roll Tune
                            </SoundVideo>
                            <TitleH3>{"Best Melody Ever"}</TitleH3>
                            <Subtitle>{"Rick Roll"}</Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>
                </ThreeContainer>
                <RowContainer
                    onClick={this.navigateToPath("/company/company-profiles")}
                    color={ligherBackground}
                >
                    <TitleH2>{"Greg's Picks"}</TitleH2>
                </RowContainer>
                <ThreeContainer color={ligherBackground}>
                    <UnStyleLink href='https://blerp.com/soundbites/5b5a7472697c4e00059c9a31'>
                        <SocialContainerItem>
                            <SoundVideo width={320} height={240} controls>
                                <source
                                    src='https://storage.googleapis.com/blerp-public-images/video/picks/frogs_gay.mp4'
                                    type='video/mp4'
                                />
                                They turn the freaking frogs gay
                            </SoundVideo>
                            <TitleH3>
                                {"They turn the freaking frogs gay"}
                            </TitleH3>
                            <Subtitle>{"Alex Jones"}</Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>

                    <UnStyleLink href='https://blerp.com/soundbites/5b237fbafca7167a35619f7d'>
                        <SocialContainerItem>
                            <SoundVideo width={320} height={240} controls>
                                <source
                                    src='https://storage.googleapis.com/blerp-public-images/video/picks/doh.mp4'
                                    type='video/mp4'
                                />
                                Doh!
                            </SoundVideo>
                            <TitleH3>{"Doh!"}</TitleH3>
                            <Subtitle>{"Homer Simpson"}</Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>

                    <UnStyleLink href='https://blerp.com/soundbites/5b237fbafca7167a356193b3'>
                        <SocialContainerItem>
                            <SoundVideo width={320} height={240} controls>
                                <source
                                    src='https://storage.googleapis.com/blerp-public-images/video/picks/hey_listen.mp4'
                                    type='video/mp4'
                                />
                                Hey Listen!
                            </SoundVideo>
                            <TitleH3>{"Hey Listen!"}</TitleH3>
                            <Subtitle>{"Navi Fairy"}</Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>
                </ThreeContainer>
                <RowContainer
                    onClick={this.navigateToPath("/company/company-picks")}
                    color={flyoutBackground}
                >
                    <TitleH2>{"Evan's Picks"}</TitleH2>
                </RowContainer>
                <ThreeContainer color={flyoutBackground}>
                    <UnStyleLink href='https://blerp.com/soundbites/5bc16193acf1a70004050674'>
                        <SocialContainerItem>
                            <SoundVideo width={320} height={240} controls>
                                <source
                                    src='https://storage.googleapis.com/blerp-public-images/video/picks/hasta_lavista.mp4'
                                    type='video/mp4'
                                />
                                Hasta la vista baby - arnold schwarzenegger
                                terminator 2
                            </SoundVideo>
                            <TitleH3>{"Hasta la vista baby"}</TitleH3>
                            <Subtitle>{"Arnold Schwarzenegger"}</Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>

                    <UnStyleLink href='https://blerp.com/soundbites/5b237fbafca7167a35619a24'>
                        <SocialContainerItem>
                            <SoundVideo width={320} height={240} controls>
                                <source
                                    src='https://storage.googleapis.com/blerp-public-images/video/picks/ralph_jim_valvano.mp4'
                                    type='video/mp4'
                                />
                                Nothing has great has been accomplished without
                                enthusiasm - Jim Valvano
                            </SoundVideo>
                            <TitleH3>
                                {
                                    "Nothing has great has been accomplished without enthusiasm"
                                }
                            </TitleH3>
                            <Subtitle>{"Jim Valvano"}</Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>

                    <UnStyleLink href='https://blerp.com/soundbites/5b237fbafca7167a35619ee8'>
                        <SocialContainerItem>
                            <SoundVideo width={320} height={240} controls>
                                <source
                                    src='https://storage.googleapis.com/blerp-public-images/video/picks/do_you_know_the_way.mp4'
                                    type='video/mp4'
                                />
                                Do you know the way?
                            </SoundVideo>
                            <TitleH3>{"Do you know the wey?"}</TitleH3>
                            <Subtitle>{"Uganda Knuckles"}</Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>
                </ThreeContainer>
                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
