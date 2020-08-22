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
const BreakLine = styled.hr`
    color: ${props => (props.color ? props.color : bodyText)};
    display: block;
    margin-before: 0.5em;
    margin-after: 0.5em;
    margin-start: auto;
    margin-end: auto;
    overflow: hidden;
    border-style: inset;
    border-width: 1px;
`;

const StyledImg = styled.img`
    width: 100%;
    max-width: 800px;
    max-height: 200px;
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

    renderBoardRow = boardId => {
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
                            isDarker={false}
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
                            "Top 5 Oof Roblox Sound Effects From Roblox Oof Soundboard | Top Sounds | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='The Robox Oof Soundboard is possibly the best meme soundboards on the market. The sounds for roblox are crafted in a genius way that makes the game unimaginably great.'
                    />
                    <meta
                        name='keywords'
                        content='roblox oof soundboard meme'
                    />
                </Helmet>
                <NavBar />
                {this.renderBoardRow("5d23ad1fcb2b0d00053eb3a5")}
                <HeaderContainer color={slidePurple}>
                    <StyledImg
                        alt='Roblox oof soundboard'
                        src='https://media.giphy.com/media/a8i5Ghaw2TnlC/giphy.gif'
                    />
                    <MainTitleH1>
                        {
                            "Top 5 Best Sound Effects From The Roblox Oof Soundboard"
                        }
                    </MainTitleH1>
                    <NormalParagraphCenter color={flyoutBackground}>
                        Roblox is a game launched in 2005. Roblox is a massive
                        multiplayer online game with a creation system platform
                        built into the gameplay. The Roblox soundboard on blerp
                        has some of the best and most popular sound effects from
                        the game.
                    </NormalParagraphCenter>
                </HeaderContainer>

                <RowContainer color={flyoutBackground}>
                    <SecondaryTitleH2 color={bodyText}>
                        What are the top sound effects from the Roblox video
                        game world?
                    </SecondaryTitleH2>
                    <NormalParagraph color={bodyText}>
                        Roblox has man iconic sounds and effects. In this brief
                        article we have hand picked the top sound effects from
                        the Roblox oof soundboard. There are a lot of oofs
                        sounds on blerp. Feel free to explore the site to find
                        even more sounds from the game.
                    </NormalParagraph>

                    <ThirdTitleH3>1. The Death Oof</ThirdTitleH3>

                    {this.renderBite("5b237fbafca7167a3561972b")}

                    <NormalParagraph color={bodyText}>
                        Perhaps one of the most iconic sound effects ever to
                        exist in internet history. The Oof death sound effect
                        was made popular on Roblox. The inventor of the oof
                        sound effect is known as{" "}
                        <StyleLinkSmall href='https://www.quora.com/Who-made-the-Roblox-death-sound'>
                            David Baszucki
                        </StyleLinkSmall>
                        . The sound became a royalty free effect that Roblox
                        uses in the game as the death sound. The Oof is said to
                        stand for Overwhelmingly overpowered failure.
                    </NormalParagraph>

                    <ThirdTitleH3>2. Roblox Jump</ThirdTitleH3>

                    {this.renderBite("5d2265ebcb2b0d00053c58da")}

                    <NormalParagraph color={bodyText}>
                        The Roblox jump sound effect is used in instances when
                        your Roblox character jumps in game. The jump is a swift
                        swoosh that sounds like a quick wind swoop.
                    </NormalParagraph>

                    <ThirdTitleH3>3. Victory in Roblox</ThirdTitleH3>

                    {this.renderBite("5d22660ccb2b0d00053c593d")}

                    <NormalParagraph color={bodyText}>
                        Next to the Roblox oof, the victory sound effect is also
                        a very iconic sound effect from the Roblox game. The
                        victory sound effect gives a very satisfying feeling to
                        the user in moments when good things are happening in
                        the game.
                    </NormalParagraph>

                    <ThirdTitleH3>4. Collide </ThirdTitleH3>

                    {this.renderBite("5d2265dacb2b0d00053c58a5")}

                    <NormalParagraph color={bodyText}>
                        Perhaps one of the most realistic sounds you will hear
                        in the Roblox game is the Roblox collide. If you thought
                        the oof soundboard sound was great then you might want
                        to listen to the collide sound effect. The collide sound
                        happens whenever collisions occur within the Roblox
                        game.
                    </NormalParagraph>

                    <ThirdTitleH3>5. The Rubber Sling</ThirdTitleH3>

                    {this.renderBite("5d2265f4cb2b0d00053c58f5")}

                    <NormalParagraph color={bodyText}>
                        The rubber sling is one of the lesser known sounds from
                        the Roblox oof soundboard. However, this pleasing sound
                        has a very clean vibrance to it. You can put this sound
                        on repeat all day and gain a more optimistic outlook on
                        life.
                    </NormalParagraph>
                </RowContainer>
                {this.renderBoardRow("5b809202e9d51200069f8aaf")}

                <RowContainer
                    // onClick={this.navigateToPath("/how-to-make-money-playing-games")}
                    color={flyoutBackground}
                >
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

                <RowContainer
                    // onClick={this.navigateToPath("/making-money-on-twitch")}
                    color={slidePurple}
                >
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

                <RowContainer
                    // onClick={this.navigateToPath("/videogame-meme-soundboards")}
                    color={flyoutBackground}
                >
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
