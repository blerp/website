/*
 * BLERP Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2019 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import MainLink from "../components/link/MainLink";
import { default as Router, withRouter } from "next/router";
import Footer from "../components/navigation/footer";
import gql from "graphql-tag";

import projectConfig from "../config";
const hostDomain = projectConfig.host;

import NavBar from "../components/navigation/navbar";
import withData from "../lib/withData";
import TabBar from "../components/navigation/tabbar";

import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import HorizontalList from "../components/playlists/scrollable";
import BitesList from "../components/playlists/biteList";

import LoadingFullScreen from "../components/loading/loading-full-screen";

import {
    defaultBackground,
    statusColor,
    lighterDarkText,
    bodyText,
    pandaPink,
    flyoutBackground,
    secondarySubtitleText,
    slidePurple,
    secondaryText,
    pandaTeal,
    focusState,
    darkBlue,
    darkText,
    ligherBackground,
    lightGray,
    headerText,
    darkestBackground,
    pandaNewTeal,
} from "../styles/colors";

const Container = styled.div`
    position: relative;
    justify-content: center;
`;

const HeaderContainer = styled.div`
    background-color: ${props =>
        props.color ? props.color : flyoutBackground};
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 60px;

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

const MainTitleH1 = styled.h1`
    font-size: 48px;
    color: ${flyoutBackground};
    text-align: center;
`;

const ThirdTitleH3 = styled.h3`
    color: ${props => (props.color ? props.color : secondarySubtitleText)};
    font-weight: light;
    text-decoration: none;
    margin: 0;
    padding: 16px;
    text-align: center;
`;

const SecondaryTitleH2 = styled.h2`
    color: ${props => (props.color ? props.color : secondarySubtitleText)};
    font-weight: light;
    font-size: 32px;
    text-decoration: none;
    margin: 0;
    padding: 20px;
    text-align: center;
`;

const SecondaryTitleH2White = styled.h2`
    color: ${props => (props.color ? props.color : flyoutBackground)};
    font-weight: light;
    font-size: 32px;
    text-decoration: none;
    margin: 0;
    padding: 20px;
    text-align: center;
`;

const RowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;
    background-color: ${props => props.color};
    min-height: 32px;

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const RowContainerTiny = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background-color: ${props => props.color};
    min-height: 12px;

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
    color: ${props => (props.color ? props.color : bodyText)};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    line-height: 32px;
    text-align: center;
`;

const WhiteParagraph = styled.p`
    color: ${flyoutBackground};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    line-height: 32px;
    text-align: center;
`;

const BoldParagraph = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    line-height: 40px;
`;

const NormalParagraph = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    text-align: center;
    line-height: 40px;
    max-width: 800px;
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

const NavigationButton = styled.a`
    font-weight: lighter;
    padding: 12px 20px;
    margin: 20px;
    text-decoration: none;
    color: ${flyoutBackground};
    white-space: pre-wrap;
    background: ${pandaPink};
    border-radius: 40px;
    font-size: 14px;
    line-height: 20px;
    border: none;

    &:focus {
        border-radius: 40px;
    }

    &:hover {
        transition: all 0.2s ease 0s;
        background: rgb(240, 240, 240);
        color: rgb(254, 41, 92);
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const HiddenTag = styled.div`
    opacity: 0;
`;

const StyledImg = styled.img`
    width: 100%;
    max-wdith: 800px;
`;

const StyledImgSmall = styled.img`
    width: 300px;
`;

const StyleLinkSmall = styled.a`
    font-weight: 600;
    text-align: center;
    font-size: 20px;
    line-height: 20px;
    text-decoration: underline;
    color: ${darkBlue};
    white-space: pre-wrap;
    margin: 4px;
    cursor: pointer;
`;

const fetchSearchQuery = gql`
    query websiteVideogamePage($query: String!) {
        web {
            playlistElasticSearch(query: $query, page: 0, perPage: 30) {
                pageInfo {
                    perPage
                    hasNextPage
                    currentPage
                    itemCount
                }
                items {
                    _id
                    title
                    image {
                        original {
                            url
                        }
                    }
                    giphy {
                        gif
                    }
                }
            }
        }
    }
`;

const fetchBitesSearchQuery = gql`
    query websiteVideogamePageBites($query: String!) {
        web {
            biteElasticSearch(query: $query, page: 0, perPage: 30) {
                pageInfo {
                    perPage
                    hasNextPage
                    currentPage
                    itemCount
                }
                bites {
                    _id
                    title
                    keywords
                    color
                    image {
                        original {
                            url
                        }
                    }
                    giphy {
                        gif
                    }
                    favorited
                    playCount
                    audienceRating
                    audio {
                        original {
                            url
                        }
                        mp3 {
                            url
                        }
                    }
                }
            }
        }
    }
`;

const BoardsPadding = styled.div`
    display: flex;
    flex-flow: column;
    text-align: center;

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const WhiteBoardsContainer = styled.div`
    background-color: ${flyoutBackground};
    padding: 8px;
`;

const NormalParagraphCenter = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    text-align: center;
    line-height: 40px;
    max-width: 800px;
`;

const SectionTitleSpace = styled.p`
    color: ${lighterDarkText};
    font-weight: 600;
    text-decoration: none;
    padding: 8px 24px;
    text-align: left;
    font-size: 18px;
    margin: 0;
`;

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    renderHomeLink() {
        return (
            <Link prefetch={true} href='/'>
                <MainTemplateLink>{"Home"}</MainTemplateLink>
            </Link>
        );
    }

    navigateToPath = path => () => {
        window.location.href = path;
    };

    playBlerp = () => {
        const audio = new Audio(
            "https://audio.blerp.com/audio/b3efc7e0-f20e-11e8-b17c-dd2e9bdb6825?type=MP3",
        );
        audio.play();
    };

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {"Videogame Meme Soundboards Buttons | Blerp"}
                    </title>
                    <meta
                        name='description'
                        content='Find your favorite classic sounds from the best NES nintendo games as well as other fun gaming genres. We have meme soundboards and meme sound effects packs from the all the fun video games on this planet. Find your favorite meme soundboard to use on platforms such as Twitch.'
                    />
                    <meta
                        name='keywords'
                        content='meme sound effects pack, meme video game soundboards, videogame sounds, videogame sfx, videogame soundboards, twitch gaming sounds, twitch gaming soundboards'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer color={slidePurple}>
                    <MainTitleH1>
                        {"Videogame Meme Soundboard Buttons"}
                    </MainTitleH1>

                    <SecondaryTitleH2 color={lightGray}>
                        Meme sound effects pack, dank meme soundboards, classic
                        random sound clips
                    </SecondaryTitleH2>

                    <NormalParagraph color={flyoutBackground}>
                        Video games have play a huge role in providing
                        entertainment, education, and behavioral change within
                        our society. The concept of videogames started out in
                        research labs as playful side projects, but has exploded
                        into a 100 billion dollar industry fueling the everyday
                        entertainment for over 2 billion people. Videogames
                        would not even be close to what they are like today
                        without the help of great sound synthesis and audio
                        innovations. Feel free explore our meme sound effects
                        packs and sound buttons!
                    </NormalParagraph>
                </HeaderContainer>

                <Query
                    errorPolicy={"all"}
                    variables={{
                        query: "capcom smash",
                    }}
                    ssr={true}
                    query={fetchSearchQuery}
                >
                    {props => {
                        // if (props.networkStatus === 1 || props.networkStatus === 2) {
                        //   return <LoadingFullScreen />;
                        // }
                        if (!props.data) {
                            return <div></div>;
                        }

                        return (
                            <div>
                                <BoardsPadding>
                                    {!(
                                        props.networkStatus === 1 ||
                                        props.networkStatus === 2
                                    ) &&
                                        props.data.web &&
                                        props.data.web
                                            .playlistElasticSearch && (
                                            <WhiteBoardsContainer>
                                                <SectionTitleSpace>
                                                    {"Videogame Soundboards"}
                                                </SectionTitleSpace>
                                                <HorizontalList
                                                    playlists={
                                                        props.data.web
                                                            .playlistElasticSearch
                                                            .items
                                                    }
                                                    isGrayButton={false}
                                                />
                                            </WhiteBoardsContainer>
                                        )}
                                </BoardsPadding>
                            </div>
                        );
                    }}
                </Query>

                <HeaderContainer color={pandaNewTeal}>
                    <SecondaryTitleH2 color={flyoutBackground}>
                        Video Game Meme Soundboards and Early History of Sound
                        Synths
                    </SecondaryTitleH2>
                    <NormalParagraphCenter color={flyoutBackground}>
                        Blerp has a huge library of the best and most fun video
                        game meme sound effects packs and audio clips. Did you
                        know that the first game arcades machines did not even
                        play music? The first arcade machines actually used
                        mechanical items to generate sound. The idea of sound
                        synthesis through the computer changed the way we
                        experience games because it gave us to ability to play
                        sound from digital devices. The early arcade machines
                        actually used analog signals to generate tracks of
                        sounds. All early home consoles were shipped with
                        digital sound synthesis. The nolstagic tunes of early
                        video games tunes came from the 8 bit limitations of
                        technology. Our gaming consoles of the past could not
                        generate the huge variety of audiowaves that our
                        hardward today has access to today.
                    </NormalParagraphCenter>
                </HeaderContainer>

                <Query
                    variables={{
                        query: "old game tune music",
                    }}
                    ssr={true}
                    query={fetchBitesSearchQuery}
                >
                    {props => {
                        if (!props.data) {
                            return <div></div>;
                        }
                        return (
                            <div>
                                <BoardsPadding>
                                    {!(
                                        props.networkStatus === 1 ||
                                        props.networkStatus === 2
                                    ) &&
                                        props.data.web &&
                                        props.data.web.biteElasticSearch && (
                                            <WhiteBoardsContainer>
                                                <SectionTitleSpace>
                                                    {"Classic Game Sounds"}
                                                </SectionTitleSpace>
                                                <BitesList
                                                    playlist={{
                                                        bites:
                                                            props.data.web
                                                                .biteElasticSearch
                                                                .bites,
                                                    }}
                                                    isGrayButton={false}
                                                />
                                            </WhiteBoardsContainer>
                                        )}
                                </BoardsPadding>
                            </div>
                        );
                    }}
                </Query>

                <RowContainer
                    // onClick={this.navigateToPath("/best-games-to-stream-on-twitch")}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={
                            "Are you looking for new game ideas to make your stream better?"
                        }
                        href={"/best-games-to-stream-on-twitch"}
                        as={"/best-games-to-stream-on-twitch"}
                    />
                    <NormalParagraphCenter>
                        Here is a list of the top games to stream on Twitch,
                        Mixxer and Youtube Gaming. Are you looking for the best
                        games to play on your stream? Here are the top ten best
                        games to stream for streamers!
                    </NormalParagraphCenter>
                </RowContainer>

                <RowContainer
                    // onClick={this.navigateToPath("/making-money-on-twitch")}
                    color={slidePurple}
                >
                    <MainLink
                        text={"Have you thought of making money on Twitch?"}
                        href={"/making-money-on-twitch"}
                        as={"/making-money-on-twitch"}
                    />
                    <NormalParagraphCenter color={flyoutBackground}>
                        Twitch is a live streaming platform for people to build
                        followings through posting live content. Figure out how
                        some people are really making money from streaming on
                        Twitch.tv.
                    </NormalParagraphCenter>
                </RowContainer>

                <RowContainer
                    // onClick={this.navigateToPath("/how-to-make-money-playing-games")}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={
                            "Are you curious about how you can make money playing video games?"
                        }
                        href={"/how-to-make-money-playing-games"}
                        as={"/how-to-make-money-playing-games"}
                    />
                    <NormalParagraphCenter>
                        As the video game industry continues to grow, more and
                        more people are making money from playing games.{" "}
                        <StyleLinkSmall href='/how-to-make-money-playing-games'>
                            Learn how you can make money too from playing video
                            games!
                        </StyleLinkSmall>
                    </NormalParagraphCenter>
                </RowContainer>

                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
