/*
 * BLERP Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2019 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import MainLink from "../../components/link/MainLink";
import { default as Router, withRouter } from "next/router";
import Footer from "../../components/navigation/footer";
import PlaylistListContainer from "../../components/playlists/PlaylistListContainer";
import Bite from "../../components/bite";

import projectConfig from "../../config";
const hostDomain = projectConfig.host;

import NavBar from "../../components/navigation/navbar";
import withData from "../../lib/withData";
import TabBar from "../../components/navigation/tabbar";

import {
    defaultBackground,
    statusColor,
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
} from "../../styles/colors";

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
    max-width: 800px;
    text-align: center;
`;

const ThirdTitleH3 = styled.h3`
    color: ${props => (props.color ? props.color : secondarySubtitleText)};
    font-weight: light;
    text-decoration: none;
    margin: 0;
    padding: 16px;
    text-align: left;
    max-width: 800px;
    width: 100%;
`;

const SecondaryTitleH2 = styled.h2`
    color: ${props => (props.color ? props.color : secondarySubtitleText)};
    font-weight: light;
    font-size: 32px;
    text-decoration: none;
    margin: 0;
    padding: 20px;
    max-width: 800px;
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
    max-width: 800px;
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
    max-width: 800px;
`;

const NormalParagraphCenter = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    text-align: center;
    line-height: 40px;
    max-width: 800px;
`;

const NormalParagraph = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    text-align: left;
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
    max-width: 600px;
    max-height: 400px;
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

const fetchPlaylistQuery = gql`
    query websitePlaylistForOof($id: MongoID!) {
        web {
            playlistById(_id: $id) {
                _id
                title
                image {
                    original {
                        url
                    }
                }
                followed
                giphy {
                    gif
                }
                bitesPagination(page: 0, perPage: 8) {
                    items {
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
    }
`;

const fetchBiteQuery = gql`
    query websiteBiteTopTen($id: MongoID!) {
        web {
            biteById(_id: $id) {
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

    renderBoardRow = (boardId, darker) => {
        return (
            <Query
                errorPolicy={"all"}
                variables={{
                    id: boardId,
                }}
                ssr={true}
                query={fetchPlaylistQuery}
            >
                {props => {
                    if (
                        !props.data ||
                        !props.data.web ||
                        !props.data.web.playlistById
                    ) {
                        return <div />;
                    }
                    return (
                        <PlaylistListContainer
                            isDarker={darker}
                            playlist={props.data.web.playlistById}
                        />
                    );
                }}
            </Query>
        );
    };

    renderBite = biteId => {
        return (
            <Query
                errorPolicy={"all"}
                variables={{
                    id: biteId,
                }}
                ssr={true}
                query={fetchBiteQuery}
            >
                {props => {
                    if (
                        !props.data ||
                        !props.data.web ||
                        !props.data.web.biteById
                    ) {
                        return <div />;
                    }
                    const bite = props.data.web.biteById;
                    return (
                        <Bite
                            key={bite._id}
                            id={bite._id}
                            title={bite.title}
                            audioSourceUrls={[
                                bite.audio && bite.audio.mp3.url,
                                bite.audio && bite.audio.original.url,
                            ]}
                            color={props.data.web.biteById.color}
                            image={
                                (bite.image && bite.image.original.url) ||
                                (bite.giphy && bite.giphy.gif)
                            }
                            favorited={bite.favorited}
                            playCount={bite.playCount}
                            prefetchLink={this.props.prefetchLink}
                            preload={true}
                        />
                    );
                }}
            </Query>
        );
    };

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Top Six Donald Trump Soundboard Quotes | Top Sounds | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content="The top quotes and sounds from Donald Trump's Soundboard. The Donald Trump Soundboard is a board of audio clips of famous quotes Donald Trump has said."
                    />
                    <meta
                        name='keywords'
                        content='donald trump, the donald trump soundboard sonds'
                    />
                </Helmet>
                <NavBar />
                {this.renderBoardRow("5b237ffbfca7167a35628122")}

                <HeaderContainer color={pandaNewTeal}>
                    <StyledImg
                        alt='Donald Trump Soundboard'
                        src='https://media.giphy.com/media/Qjmp5vKEERPyw/giphy.gif'
                    />
                    <MainTitleH1>
                        Top 6 Best Sound Quotes From the Donald Trump Soundboard
                    </MainTitleH1>
                    <NormalParagraphCenter color={flyoutBackground}>
                        Donald Trump is the 45th president of the United States.
                        He is hated and revered by many people.{" "}
                        <MainLink href='/soundboard/5d23ad1fcb2b0d00053eb3a5'>
                            The Donald Trump Soundboard
                        </MainLink>{" "}
                        is perhaps one of the most popular soundboards here on
                        blerp. Here are a couple of highlights from the Donald
                        Trump soundboard.
                    </NormalParagraphCenter>
                </HeaderContainer>

                <RowContainer color={flyoutBackground}>
                    <SecondaryTitleH2 color={bodyText}>
                        A list of the top sounds of Donald Trump compiled from
                        the donald trump soundboard
                    </SecondaryTitleH2>
                    {/* <NormalParagraph color={bodyText}>
            
          </NormalParagraph> */}

                    <ThirdTitleH3>
                        1. We will make America great again{" "}
                    </ThirdTitleH3>
                    {this.renderBite("5d3d17b4b8a9be0005dde313")}

                    <NormalParagraph color={bodyText}>
                        One of Donald Trump's most famous lines is we will make
                        America great again. Some people question why Donald
                        Trump thinks America isn't great. This quote was Donald
                        Trump's slogan in his 2016 Presidential election
                        campaign.
                    </NormalParagraph>

                    <ThirdTitleH3>
                        2. We need to build a wall, and it has to be built
                        quickly
                    </ThirdTitleH3>
                    {this.renderBite("5d3d17e4b8a9be0005dde399")}

                    <NormalParagraph color={bodyText}>
                        One of Trump's most iconic lines is we need to build a
                        wall. Trump has been pushing for major form in
                        immigration. He thinks that by building a wall between
                        America and Mexico we will reduce the amount of illegal
                        immigrants coming into America.
                    </NormalParagraph>

                    <ThirdTitleH3>3. I don't give a damn</ThirdTitleH3>
                    {this.renderBite("5d3d18cfb8a9be0005dde62e")}
                    <NormalParagraph color={bodyText}>
                        I don't give a damn is a quote said by Donald Trump.
                        This line is a perfect representation of Donald Trump's
                        brand and character.
                    </NormalParagraph>

                    <ThirdTitleH3>4. We need money.</ThirdTitleH3>
                    {this.renderBite("5d3d1acab8a9be0005ddee1f")}
                    <NormalParagraph color={bodyText}>
                        Donald Trump gives advice a lot. One of his best advice
                        that he has ever given resides in the quote, "We Need
                        Money"
                    </NormalParagraph>

                    <ThirdTitleH3>
                        5. I have a total net worth and now with the increase it
                        will be well worth over 10 billion dollars.
                    </ThirdTitleH3>
                    {this.renderBite("5d3d19c8b8a9be0005ddead1")}
                    <NormalParagraph color={bodyText}>
                        Donald Trump sometimes says absurd things. This famous
                        quote of Donald Trump is of him claiming to be over 10
                        billion dollars.
                    </NormalParagraph>

                    <ThirdTitleH3>6. Wrong</ThirdTitleH3>
                    {this.renderBite("5b237fbafca7167a35619c74")}
                    <NormalParagraph color={bodyText}>
                        Donald Trump has sometimes been called a master debater.
                        This famous and well thought out quote is one of Trump's
                        most famous weapons in a debate.
                    </NormalParagraph>
                </RowContainer>

                {this.renderBoardRow("5d3df2ccb8a9be0005df9f86", true)}

                <RowContainer color={flyoutBackground}>
                    <MainLink
                        text={
                            "Did you know people can make money playing video games?"
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

                <RowContainer color={slidePurple}>
                    <MainLink
                        text={
                            "Are you curious about how you can make money on Twitch?"
                        }
                        href={"/making-money-on-twitch"}
                        as={"/making-money-on-twitch"}
                    />
                    <NormalParagraphCenter color={flyoutBackground}>
                        Making Money on Twitch is one of the best ways to earn
                        income while playing video games. Twitch is a live
                        streaming platform for people to build followings
                        through posting live content. Come learn how some people
                        are really making money from streaming on Twitch.tv.
                    </NormalParagraphCenter>
                </RowContainer>

                <RowContainer color={flyoutBackground}>
                    <MainLink
                        text={"Find all the video game meme soundboards!"}
                        href={"/videogame-meme-soundboards"}
                        as={"/videogame-meme-soundboards"}
                    />
                    <NormalParagraphCenter>
                        Sound effects and audio within gaming has always played
                        vital part in creating a enjoyable experience for users.
                        Blerp has curated soundboards of the top sounds from
                        your favorite video games!
                    </NormalParagraphCenter>
                </RowContainer>

                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
