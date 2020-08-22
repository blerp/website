/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { Query } from "@apollo/client/react/components";

import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
import { default as Router, withRouter } from "next/router";
import PlaylistListContainer from "../components/playlists/PlaylistListContainer";

import LoadingFullScreen from "../components/loading/loading-full-screen";
import LoadingScroll from "../components/loading/loading-scroll";

import NavBar from "../components/navigation/navbar";
import TabBar from "../components/navigation/tabbar";

import {
    defaultBackground,
    primaryText,
    lightGray,
    lighterDarkText,
    flyoutBackground,
    secondarySubtitleText,
} from "../styles/colors";

import withData from "../lib/withData";
import { logEvent } from "../lib/analytics";

import FeaturedHome from "../components/shared/FeaturedHome";
import AllTheBitesGrid from "../components/shared/AllTheBitesGrid";

import Link from "next/link";

const Container = styled.div`
    position: relative;
    justify-content: center;
`;

const BoardsPadding = styled.div`
    display: flex;
    flex-flow: column;
    text-align: center;

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const PlaylistsContainer = styled.div`
    display: flex;
    flex-flow: column;
    height: 100%;
    text-align: center;
`;

const BoardsContainer = styled.div`
    background: #ccc;
    display: flex;
    flex-flow: column;
    height: 100%;
    text-align: center;

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const Logo = styled.img`
    height: 48px;
    width: 48px;
    align-self: center;
`;

const fetchPopularQuery = gql`
    query websitePopularHomePage($monthBeforeDate: Date) {
        web {
            bitePopular(
                limit: 20
                filter: { timeSpan: { after: $monthBeforeDate } }
            ) {
                ...indexPopularBite
            }
            playlistRandomMany(limit: 7, audienceRating: [G, PG, PG13]) {
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
                followed
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

    fragment indexPopularBite on Bite {
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
`;

const fetchRandomQuery = gql`
    query websiteHomePage {
        web {
            biteRandomMany(limit: 36) {
                ...indexBite
            }
        }
    }

    fragment indexBite on Bite {
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
`;

const FeaturedSuperContainer = styled.div`
    background-color: ${flyoutBackground};
    padding: 32px 32px 0;

    @media (max-width: 600px) {
        padding: 32px 32px 0;
    }
`;

const FeaturedTitle = styled.h1`
    color: #1d1d1d;
    font-weight: bold;
    font-size: 28px;
    align-self: flex-start;
    text-decoration: none;
    margin: 0;
`;

const FeaturedSubtitle = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 28px;
    align-self: flex-start;
    text-decoration: none;
    margin: 0;
    padding-top: 12px;
    font-size: 20px;
`;

function getWeekAgo() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return oneWeekAgo;
}

function getMonday(d) {
    d = new Date(d);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

// NOTE: if we want to put back popular query
// // Get a date object for the current time
const currentWeekBeforeDate = getWeekAgo();

// Set it to one month ago
// currentWeekBeforeDate.setMonth(currentWeekBeforeDate.getMonth() - 1);

const handleListLoadMore = (dataProp, networkStatus, fetchMore) => () => {
    // Don't call twice if already called handleListLoadMore
    // I was using awaitMore={props.data.networkStatus === 3} before but for some reason it stops randomnly
    if (networkStatus === 3) {
        return;
    }
    // The fetchMore method is used to load new data and add it
    // to the original query we used to populate the list
    fetchMore({
        updateQuery: (previousData, { fetchMoreResult }) => {
            // Don't do anything if there weren't any new items
            if (
                !fetchMoreResult ||
                !fetchMoreResult.web ||
                !previousData.web.biteRandomMany ||
                fetchMoreResult.web.biteRandomMany.length === 0
            ) {
                return previousData;
            }
            return {
                web: {
                    ...previousData.web,
                    biteRandomMany: previousData.web.biteRandomMany.concat(
                        fetchMoreResult.web.biteRandomMany,
                    ),
                },
            };
        },
    });

    logEvent(
        "Scroll",
        `Generic Bites`,
        `biteRandomMany : ${dataProp.web &&
            dataProp.web.biteRandomMany.length}`,
        dataProp.web && dataProp.web.biteRandomMany.length,
    );
};

const SectionTitleSpace = styled.a`
    color: ${lighterDarkText};
    display: block;
    font-weight: 600;
    text-decoration: none;
    padding: 8px 24px;
    text-align: left;
    font-size: 18px;
    margin: 0;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

const NewBoardsContainer = styled.div`
    padding: 16px 8px;
    background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : "transparent"};
`;

const FeaturedSubSubtitle = styled.h3`
    color: ${secondarySubtitleText};
    font-weight: light;
    align-self: flex-start;
    text-decoration: none;
    margin: 0;
    padding: 12px 0;
    font-size: 14px;
`;

class Page extends React.Component {
    props;

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
    }

    handleRefresh = event => {
        this.props.router.push("/app");
    };

    renderPlaylistRow(playlist, index) {
        const isDarker = index % 2 === 1;
        return (
            <PlaylistListContainer
                key={playlist._id}
                isDarker={isDarker}
                playlist={playlist}
            />
        );
    }

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Blerp Soundbites | Audio Clips Creation | Soundboards"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Blerp is the place to find sound bites for all audio clips & sounds. Search our soundboard search engine for dank audio memes and funny audio clips to share with others. Use Blerp on Discord and Twitch and find new ways to communicate. Try Blerp today.'
                    />
                    <meta
                        name='keywords'
                        content='soundbites, sounds, bites, blerp, blerp sounds, audio quotes, best soundboard, Favorite Movies, sounds, funny quotes, tv show moments, great games, funny sound, quotes, movie soundboard, blurp, song lyrics, music snippets'
                    />
                    <meta
                        property='og:image'
                        content='https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg'
                    />
                    <meta property='og:image:width' content='300' />
                    <meta property='og:image:height' content='300' />
                    <meta
                        name='twitter:image'
                        content='https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg'
                    />
                    <meta name='twitter:image:width' content='262' />
                    <meta name='twitter:image:height' content='262' />
                </Helmet>
                <NavBar />
                <FeaturedSuperContainer>
                    <FeaturedTitle>
                        {
                            "Blerp - The Cornucopia of Great Soundbites, Audio Clips and Soundboards"
                        }
                    </FeaturedTitle>
                    <FeaturedSubtitle>
                        {
                            "Sharing snippets of meme pop culture in it's most human and memorable form!"
                        }
                    </FeaturedSubtitle>
                    <FeaturedSubSubtitle>
                        {
                            "- We have the 2017 meme soundboard, 2018 meme soundboard, and even 2019 meme soundboards."
                        }
                    </FeaturedSubSubtitle>
                </FeaturedSuperContainer>

                <Query
                    variables={{
                        monthBeforeDate: currentWeekBeforeDate.toISOString(),
                    }}
                    ssr={false}
                    query={fetchPopularQuery}
                >
                    {props => {
                        if (
                            props.networkStatus === 1 ||
                            props.networkStatus === 2
                        ) {
                            return <LoadingFullScreen />;
                        }
                        if (!props.data) {
                            return <div />;
                        }

                        return (
                            <div>
                                {props.data.web &&
                                    props.data.web.playlistRandomMany &&
                                    props.data.web.playlistRandomMany.map(
                                        (list, index) =>
                                            this.renderPlaylistRow(list, index),
                                    )}
                                <FeaturedHome
                                    bites={
                                        props.data.web &&
                                        props.data.web.bitePopular
                                    }
                                />
                            </div>
                        );
                    }}
                </Query>

                <Query
                    errorPolicy={"ignore"}
                    ssr={false}
                    query={fetchRandomQuery}
                >
                    {props => {
                        if (
                            props.networkStatus === 1 ||
                            props.networkStatus === 2
                        ) {
                            return <LoadingFullScreen />;
                        }
                        if (!props.data) {
                            return;
                        }
                        return (
                            <div>
                                {!(
                                    props.networkStatus === 1 ||
                                    props.networkStatus === 2
                                ) && (
                                    <AllTheBitesGrid
                                        title={"More Blerps."}
                                        listLoadMore={handleListLoadMore(
                                            props.data,
                                            props.networkStatus,
                                            props.fetchMore,
                                        )}
                                        bites={
                                            (props.data.web &&
                                                props.data.web
                                                    .biteRandomMany) ||
                                            []
                                        }
                                    />
                                )}
                                {props.networkStatus === 3 && <LoadingScroll />}
                            </div>
                        );
                    }}
                </Query>
                <TabBar />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
