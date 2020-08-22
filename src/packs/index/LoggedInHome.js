/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";

import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import HorizontalBoardsRow from "../../components/playlists/scrollable";
import { withRouter } from "next/router";
import PlaylistListContainer from "../../components/playlists/PlaylistListContainer";

import Header from "../../packs/index/HomeHeader";
import CircleImageButton from "../../packs/index/CircleImageButton";
import TwitchPromotion from "../../components/navigation/TwitchPromotion";

import LoadingFullScreen from "../../components/loading/loading-full-screen";
import LoadingScroll from "../../components/loading/loading-scroll";

import withData from "../../lib/withData";
import { logEvent } from "../../lib/analytics";

import FeaturedHome from "../../components/shared/FeaturedHome";
import AllTheBitesGrid from "../../components/shared/AllTheBitesGrid";

const Container = styled.div`
    position: relative;
    justify-content: center;
`;

const BoardsPadding = styled.div`
    display: flex;
    flex-flow: column;
    text-align: center;
    padding: 20px 0;
    background-color: ${props => props.theme.flyoutBackground};

    @media (max-width: 600px) {
        width: 100%;
    }
`;

const WhiteBoardsContainer = styled.div`
    background-color: ${props => props.theme.flyoutBackground};
    padding: 8px;
`;

const fetchMobileQuery = gql`
    query websitePopularMobileHomePage {
        web {
            getFeaturedListForPlatform(platform: MOBILE) {
                _id
                title
                playlistObjects {
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
            playlistRandomMany(limit: 7, audienceRating: [G, PG]) {
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
                bitesPagination(page: 0, perPage: 24) {
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

const fetchTwitchQuery = gql`
    query websitePopularTwitchHomePage {
        web {
            getFeaturedListForPlatform(platform: TWITCH) {
                _id
                title
                playlistObjects {
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
            playlistRandomMany(limit: 7, audienceRating: [G, PG]) {
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
                bitesPagination(page: 0, perPage: 24) {
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

const fetchPopularQuery = gql`
    query websitePopularHomePage($monthBeforeDate: Date) {
        web {
            bitePopular(
                limit: 20
                filter: { timeSpan: { after: $monthBeforeDate } }
            ) {
                ...indexPopularBite
            }
            trendingBoards: playlistRandomMany(
                limit: 14
                audienceRating: [G, PG]
            ) {
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
            playlistRandomMany(limit: 7, audienceRating: [G, PG]) {
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
                bitesPagination(page: 0, perPage: 24) {
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
    query websiteHomePage($audienceRating: [AudienceRating]) {
        web {
            biteRandomMany(limit: 36, audienceRating: $audienceRating) {
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
    background-color: ${props => props.theme.flyoutBackground};
    padding: 32px 32px 0;
    display: none;

    @media (max-width: 600px) {
        padding: 32px 32px 0;
    }
`;

const FeaturedTitle = styled.h2`
    color: #1d1d1d;
    font-weight: bold;
    font-size: 28px;
    align-self: flex-start;
    text-decoration: none;
    margin: 0;
`;

const FeaturedSubtitle = styled.h3`
    color: ${props => props.theme.secondarySubtitleText};
    font-weight: light;
    align-self: flex-start;
    text-decoration: none;
    margin: 0;
    padding: 10px 0;
    font-size: 20px;
`;

const StyleLinkMedium = styled.a`
    font-weight: 600;
    text-align: center;
    padding: 4px 0;
    font-size: 20px;
    text-decoration: underline;
    color: ${props => props.theme.darkBlue};
    white-space: nowrap;
    cursor: pointer;
`;

const FeaturedSubSubtitle = styled.h3`
    color: ${props => props.theme.secondarySubtitleText};
    font-weight: light;
    align-self: flex-start;
    text-decoration: none;
    margin: 0;
    padding: 6px 0;
    font-size: 14px;
`;

const StyleLinkSmall = styled.a`
    font-weight: 600;
    text-align: center;
    padding: 4px 0;
    font-size: 14px;
    text-decoration: underline;
    color: ${props => props.theme.darkBlue};
    white-space: nowrap;
    cursor: pointer;
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
                !fetchMoreResult.web ||
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

const ConfettiContainer = styled.div`
    position: relative;
    background-color: ${props => props.theme.flyoutBackground};
`;

const TitleConfetti = styled.img`
    position: absolute;
    width: 160px;
    top: 28px;
    opacity: 0.8;
    left: 12px;
`;

const SectionTitle = styled.p`
    color: ${props => props.theme.lighterDarkText};
    font-weight: 600;
    text-decoration: none;
    padding: 48px 32px 0;
    font-size: 18px;
    z-index: 100;
    text-align: left;
    margin: 0;
`;

const SectionTitleSpace = styled.a`
    color: ${props => props.theme.bodyText};
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

const SectionButtonsContainerContainer = styled.div`
    position: relative;
    z-index: 1000;
`;

const SectionButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -30px;
    width: 100%;
`;

const SCROLL_THRESHOLD = 600;

const USER_SIGNED_IN = gql`
    query websiteHomePage {
        web {
            userSignedIn {
                _id
                roles
            }
        }
    }
`;

const SELECTED_TABS = {
    hot: "HOT",
    trending: "TRENDING",
    twitch: "TWITCH",
    mobile: "MOBILE",
};

class Page extends React.Component {
    props;
    state = {
        scrolledDown: false,
        currentSelectedTab: SELECTED_TABS.hot,
    };

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
            window.addEventListener("scroll", this.handleScroll);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = event => {
        if (window.scrollY > SCROLL_THRESHOLD) {
            if (!this.state.scrolledDown) {
                this.setState({ scrolledDown: true });
            }
        } else {
            if (this.state.scrolledDown) {
                this.setState({ scrolledDown: false });
            }
        }
    };

    handleRefresh = event => {
        this.props.router.push("/app");
    };

    handleSelectTab = ({ actionName }) => {
        this.setState({ currentSelectedTab: actionName });
    };

    renderPlaylistRow(playlist, index) {
        const isDarker = index % 2 === 0;
        return (
            <PlaylistListContainer
                key={playlist._id}
                isDarker={isDarker}
                playlist={playlist}
            />
        );
    }

    renderSelectedItems() {
        switch (this.state.currentSelectedTab) {
            case SELECTED_TABS.mobile:
                return (
                    <Query ssr={false} query={fetchMobileQuery}>
                        {props => {
                            if (
                                props.networkStatus === 1 ||
                                props.networkStatus === 2
                            ) {
                                return <LoadingFullScreen />;
                            }

                            if (!props.data) {
                                return <></>;
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
                                                .getFeaturedListForPlatform && (
                                                <WhiteBoardsContainer>
                                                    <HorizontalBoardsRow
                                                        title={
                                                            "Popular Soundboards on Mobile"
                                                        }
                                                        playlists={
                                                            props.data.web
                                                                .getFeaturedListForPlatform
                                                                .playlistObjects
                                                        }
                                                        isGrayButton={false}
                                                    />
                                                </WhiteBoardsContainer>
                                            )}
                                    </BoardsPadding>

                                    {props.data.web &&
                                        props.data.web.playlistRandomMany &&
                                        props.data.web.playlistRandomMany.map(
                                            (list, index) =>
                                                this.renderPlaylistRow(
                                                    list,
                                                    index,
                                                ),
                                        )}
                                </div>
                            );
                        }}
                    </Query>
                );
            case SELECTED_TABS.trending:
                return (
                    <Query
                        variables={{
                            monthBeforeDate: currentWeekBeforeDate.toISOString(),
                        }}
                        ssr={false}
                        query={fetchPopularQuery}
                    >
                        {props => {
                            if (props.loading) {
                                return <LoadingFullScreen />;
                            }
                            if (!props.data) {
                                return <div></div>;
                            }

                            return (
                                <div>
                                    <BoardsPadding>
                                        {!props.loading &&
                                            props.data.web &&
                                            props.data.web.trendingBoards && (
                                                <WhiteBoardsContainer>
                                                    {/* <Link
                          prefetch={true}
                          href={{
                            pathname: "/soundbites"
                          }}
                          as={`/soundbites`}
                        >
                          <SectionTitleSpace href="/soundbites">{'Trending Soundboards'}</SectionTitleSpace>
                        </Link> */}
                                                    <HorizontalBoardsRow
                                                        title={
                                                            "Trending Soundboards"
                                                        }
                                                        playlists={
                                                            props.data.web
                                                                .trendingBoards
                                                        }
                                                        isGrayButton={false}
                                                    />
                                                </WhiteBoardsContainer>
                                            )}
                                    </BoardsPadding>

                                    {props.data.web &&
                                        props.data.web.playlistRandomMany &&
                                        props.data.web.playlistRandomMany.map(
                                            (list, index) =>
                                                this.renderPlaylistRow(
                                                    list,
                                                    index,
                                                ),
                                        )}
                                </div>
                            );
                        }}
                    </Query>
                );
            case SELECTED_TABS.twitch:
                return (
                    <Query ssr={false} query={fetchTwitchQuery}>
                        {props => {
                            if (
                                props.networkStatus === 1 ||
                                props.networkStatus === 2
                            ) {
                                return <LoadingFullScreen />;
                            }
                            if (!props.data) {
                                return <div> hi</div>;
                            }

                            return (
                                <div>
                                    <TwitchPromotion />
                                    <BoardsPadding>
                                        {!(
                                            props.networkStatus === 1 ||
                                            props.networkStatus === 2
                                        ) &&
                                            props.data.web &&
                                            props.data.web
                                                .getFeaturedListForPlatform && (
                                                <WhiteBoardsContainer>
                                                    <HorizontalBoardsRow
                                                        title='Featured Twitch Soundboards'
                                                        playlists={
                                                            props.data.web
                                                                .getFeaturedListForPlatform
                                                                .playlistObjects
                                                        }
                                                        isGrayButton={false}
                                                    />
                                                </WhiteBoardsContainer>
                                            )}
                                    </BoardsPadding>

                                    {props.data.web &&
                                        props.data.web.playlistRandomMany &&
                                        props.data.web.playlistRandomMany.map(
                                            (list, index) =>
                                                this.renderPlaylistRow(
                                                    list,
                                                    index,
                                                ),
                                        )}
                                </div>
                            );
                        }}
                    </Query>
                );
            case SELECTED_TABS.hot:
            default:
                return (
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
                                return <div>hi</div>;
                            }

                            return (
                                <div>
                                    <ConfettiContainer>
                                        <SectionTitle>
                                            {"Hot This Week"}
                                        </SectionTitle>
                                        <TitleConfetti src='https://storage.googleapis.com/blerp-public-images/backgrounds/Cartoonfetti.svg' />
                                    </ConfettiContainer>
                                    <FeaturedHome
                                        bites={
                                            props.data.web &&
                                            props.data.web.bitePopular
                                        }
                                    />

                                    {props.data.web &&
                                        props.data.web.playlistRandomMany &&
                                        props.data.web.playlistRandomMany.map(
                                            (list, index) =>
                                                this.renderPlaylistRow(
                                                    list,
                                                    index,
                                                ),
                                        )}
                                </div>
                            );
                        }}
                    </Query>
                );
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header showSearchButton={true} />
                <SectionButtonsContainerContainer>
                    <SectionButtonsContainer>
                        <CircleImageButton
                            alt='Hot Content'
                            onClick={this.handleSelectTab}
                            actionName={SELECTED_TABS.hot}
                            isSelected={
                                this.state.currentSelectedTab ===
                                SELECTED_TABS.hot
                            }
                            iconImage='https://storage.googleapis.com/blerp_products/Web/Home/rocket-white.svg'
                            selectedIconImage='https://storage.googleapis.com/blerp_products/Web/Home/rocket_black.svg'
                        />
                        <CircleImageButton
                            alt='Trending Content'
                            onClick={this.handleSelectTab}
                            actionName={SELECTED_TABS.trending}
                            isSelected={
                                this.state.currentSelectedTab ===
                                SELECTED_TABS.trending
                            }
                            iconImage='https://storage.googleapis.com/blerp_products/Web/Home/rise-icon-white.svg'
                            selectedIconImage='https://storage.googleapis.com/blerp_products/Web/Home/rise-icon-black.svg'
                        />
                        <CircleImageButton
                            alt='Twitch Content'
                            onClick={this.handleSelectTab}
                            actionName={SELECTED_TABS.twitch}
                            isSelected={
                                this.state.currentSelectedTab ===
                                SELECTED_TABS.twitch
                            }
                            iconImage='https://storage.googleapis.com/blerp_products/Web/Home/glitch_white_real.svg'
                            selectedIconImage='https://storage.googleapis.com/blerp_products/Web/Home/twitch-icon-black.svg'
                        />
                        <CircleImageButton
                            alt='Mobile'
                            onClick={this.handleSelectTab}
                            actionName={SELECTED_TABS.mobile}
                            isSelected={
                                this.state.currentSelectedTab ===
                                SELECTED_TABS.mobile
                            }
                            iconImage='https://storage.googleapis.com/blerp_products/Web/Home/mobile-icon-white.svg'
                            selectedIconImage='https://storage.googleapis.com/blerp_products/Web/Home/mobile-icon-black.svg'
                        />
                    </SectionButtonsContainer>
                </SectionButtonsContainerContainer>

                {/* <TwitchOnlineIndicator alwaysOn={false} /> */}

                {this.renderSelectedItems()}

                <Query
                    ssr={false}
                    variables={{
                        audienceRating: ["G", "PG", "PG13"],
                    }}
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
                            return <></>;
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
            </React.Fragment>
        );
    }
}

export default compose(withData, withRouter)(Page);
