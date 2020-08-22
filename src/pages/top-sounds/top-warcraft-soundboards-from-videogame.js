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
                            "Top Warcraft Sounds and Sound Effects | Top Sounds | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='The Warcraft soundboard is perfect for finding the best sounds from Warcraft. There are Warcraft sounds from Night Elves, Orcs, Humans, and even Undead. Warcraft Soundboards are all curated from the warcraft games.'
                    />
                    <meta
                        name='keywords'
                        content='Warcraft III remastered sounds, the warcraft soundboard, warcraft sound effects'
                    />
                </Helmet>
                <NavBar />
                {this.renderBoardRow("5d23ab35cb2b0d00053eab1e")}

                <HeaderContainer color={pandaNewTeal}>
                    <StyledImg
                        alt='Warcraft and World of Warcraft Soundboard'
                        src='https://media.giphy.com/media/RB5gWutcsTzzO/source.gif'
                    />
                    <MainTitleH1>
                        The Top Warcraft Sounds from the Warcraft Video games.
                    </MainTitleH1>
                    <NormalParagraphCenter color={flyoutBackground}>
                        The Warcraft sounds from all the Warcraft games are
                        really fun to use during lan sessions. We collect sounds
                        from the RTS games as well as the MMORPG Warcraft game.
                    </NormalParagraphCenter>
                </HeaderContainer>

                <RowContainer color={flyoutBackground}>
                    <SecondaryTitleH2 color={bodyText}>
                        The top soundboards and sound effects from all the
                        warcraft games!
                    </SecondaryTitleH2>
                </RowContainer>

                <RowContainer color={flyoutBackground}>
                    <ThirdTitleH3>1. The World of Warcraft</ThirdTitleH3>

                    <NormalParagraph color={bodyText}>
                        Some RTS players may hate the WOW soundboard. However,
                        those of you who love World of Warcraft will love the
                        World of Warcraft Soundboard.
                    </NormalParagraph>
                </RowContainer>

                {this.renderBoardRow("5d23abf7cb2b0d00053eae6d")}

                <RowContainer color={flyoutBackground}>
                    <ThirdTitleH3>2. The Rifleman Soundboard</ThirdTitleH3>

                    <NormalParagraph color={bodyText}>
                        One of the most beloved characters in the Warcraft III
                        universe is the Rifleman. The Warcraft III Rifleman
                        Soundboard has all the sounds you need to remember the
                        character.
                    </NormalParagraph>
                </RowContainer>

                {this.renderBoardRow("5d23aae2cb2b0d00053ea922")}

                <RowContainer color={flyoutBackground}>
                    <ThirdTitleH3>
                        3. The Warcraft Peasant Soundboard
                    </ThirdTitleH3>
                    <NormalParagraph color={bodyText}>
                        The Warcraft Peasants are perhaps one of the most iconic
                        units from the RTS game. These peasants have a way of
                        making you smile even when your based is getting pwned.
                    </NormalParagraph>
                </RowContainer>

                {this.renderBoardRow("5d2544c2cb2b0d000540f090")}

                <RowContainer color={flyoutBackground}>
                    <MainLink
                        text={
                            "Curious what the top sounds and soundboards are on Blerp.com?"
                        }
                        href={"/top sounds"}
                        as={"/top sounds"}
                    />
                    <NormalParagraphCenter>
                        We have the best and most curated library of sound
                        effects for you to share with your friends!
                        <StyleLinkSmall href='/top-sounds'>
                            Find the best sounds on our site!
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
