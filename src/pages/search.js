/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import LoadingFullScreen from "../components/loading/loading-full-screen";
import LoadingScroll from "../components/loading/loading-scroll";
import { default as Router, withRouter } from "next/router";
import PlaylistListContainer from "../components/playlists/PlaylistListContainer";
import Link from "next/link";

import OpenMenuIconBlack from "../components/icons/open-menu-icon-black";

import NavBar from "../components/navigation/navbar";
import TabBar from "../components/navigation/tabbar";

import AllTheBitesGrid from "../components/shared/AllTheBitesGrid";

import withData from "../lib/withData";

import NoSearchFoundPage from "./not-found";

import { PageContainer } from "../components/layouts/body-components";

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
    lighterDarkText,
    darkText,
    ligherBackground,
    lightGray,
    headerText,
    darkBlue,
} from "../styles/colors";

const BoardsContainer = styled.div`
    padding: 16px 8px;
    background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : "transparent"};
`;

const BoardsInnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SearchBitesContainer = styled.div`
    display: block;
`;

// interface WithInitialProps {
//   getInitialProps?: (ctx: any) => object | Promise<object>;
// }

const fetchSearchQuery = gql`
    query websiteSearchPage($query: String!, $pageCount: Int!, $perPage: Int!) {
        web {
            playlistElasticSearch(query: $query, page: 0, perPage: 5) {
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
                    followed
                    bitesPagination(page: 0, perPage: 20) {
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
            biteElasticSearch(
                query: $query
                page: $pageCount
                perPage: $perPage
            ) {
                pageInfo {
                    perPage
                    hasNextPage
                    currentPage
                    itemCount
                }
                suggest {
                    text
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

const FeaturedSuperContainer = styled.div`
    background-color: ${flyoutBackground};
    padding: 32px;
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
    align-self: flex-start;
    text-decoration: none;
    margin: 0;
    padding-top: 12px;
    font-size: 20px;
`;

const FeaturedSubtitleRed = styled.h3`
    color: ${darkBlue};
    font-weight: light;
    align-self: flex-start;
    text-decoration: none;
    margin: 0;
    padding: 12px 0;
    font-size: 20px;
`;

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

const UnstyledLink = styled.a`
    text-decoration: none;
    color: inherit;
    border-radius: 10;
`;

class Page extends React.Component {
    static getInitialProps = ctx => ({
        searchQuery: ctx
            ? ctx.query
                ? ctx.query.q
                    ? ctx.query.q.split("-").join(" ")
                    : ""
                : ""
            : "",
    });
    props;

    componentDidMount() {
        if (window) {
            window.scrollTo(0, 0);
        }
    }

    handleListLoadMore = dataProp => (size, pageSize) => {
        console.log(size, pageSize);
        // I was using awaitMore={props.data.networkStatus === 3} before but for some reason it stops randomnly
        // if (dataProp.networkStatus === 3) {
        //     return;
        // }
        // The fetchMore method is used to load new data and add it
        // to the original query we used to populate the list
        dataProp.fetchMore({
            updateQuery: (previousResult, { fetchMoreResult }) => {
                // Don't do anything if there weren't any new items
                if (
                    previousResult.web &&
                    previousResult.web.biteElasticSearch &&
                    !previousResult.web.biteElasticSearch.pageInfo.hasNextPage
                ) {
                    // TODO: set finished loading all blerps logo
                    return previousResult;
                }

                if (
                    !fetchMoreResult ||
                    (fetchMoreResult.web.biteElasticSearch &&
                        fetchMoreResult.web.biteElasticSearch.bites.length ===
                            0)
                ) {
                    return previousResult;
                }

                return {
                    // Concatenate the new search results after the old ones
                    web: {
                        biteElasticSearch: {
                            pageInfo: {
                                ...fetchMoreResult.web.biteElasticSearch
                                    .pageInfo,
                            },
                            bites: previousResult.web.biteElasticSearch
                                ? previousResult.web.biteElasticSearch.bites.concat(
                                      fetchMoreResult.web.biteElasticSearch
                                          .bites,
                                  )
                                : [],
                        },
                    },
                };
            },
            variables: {
                pageCount:
                    dataProp.web.biteElasticSearch.pageInfo.currentPage + 1,
            },
        });
    };

    handleCreateClick = event => {
        this.props.router.push("/upload");
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

    renderMain(props) {
        return (
            <PageContainer>
                <Helmet>
                    <title>{props.searchQuery}</title>
                    <meta
                        property='og:description'
                        content={`"${props.searchQuery}" search for sounds, soundboards, and audio clips on blerp. Put sounds into soundboards share audio with friends. Try using blerp audio sounds on iMessage, iOS, Android, Google Assistant, and Discord.`}
                    />
                    {/* <link rel="canonical" href="https://blerp.com/search" /> */}
                </Helmet>
                <NavBar
                    displayOnMobile='search'
                    initialSearchQuery={props.searchQuery}
                />
                {this.renderBody(props)}
                <TabBar />
            </PageContainer>
        );
    }

    renderBody(props) {
        return (
            <React.Fragment>
                {!(
                    props.data.networkStatus === 1 ||
                    props.data.networkStatus === 2
                ) &&
                    !!props.searchQuery && (
                        <FeaturedSuperContainer>
                            <FeaturedTitle>{`${props.searchQuery
                                .charAt(0)
                                .toUpperCase() +
                                props.searchQuery.slice(
                                    1,
                                )} sounds and soundboards`}</FeaturedTitle>
                            {!(
                                props.data.networkStatus === 1 ||
                                props.data.networkStatus === 2
                            ) &&
                                props.data &&
                                props.data.web &&
                                props.data.web.playlistElasticSearch &&
                                props.data.web.playlistElasticSearch.items &&
                                (!props.data.error &&
                                props.searchQuery === "" ? (
                                    <div />
                                ) : (
                                    <FeaturedSubtitle>{`${props.data &&
                                        props.data.web.playlistElasticSearch
                                            .pageInfo
                                            .itemCount} boards found for ${
                                        props.searchQuery
                                    }`}</FeaturedSubtitle>
                                ))}
                            {props.data &&
                                props.data.web &&
                                props.data.web.biteElasticSearch &&
                                props.data.web.biteElasticSearch.suggest &&
                                props.data.web.biteElasticSearch.suggest
                                    .text && (
                                    <Link
                                        prefetch={true}
                                        href={{
                                            pathname: "/search",
                                            query: {
                                                q:
                                                    props.data.web
                                                        .biteElasticSearch
                                                        .suggest.text,
                                            },
                                        }}
                                        as={`/search?q=${encodeURI(
                                            props.data.web.biteElasticSearch
                                                .suggest.text,
                                        )}`}
                                    >
                                        <UnstyledLink
                                            href={`/search?q=${encodeURI(
                                                props.data.web.biteElasticSearch
                                                    .suggest.text,
                                            )}`}
                                        >
                                            <FeaturedSubtitleRed>{`Did you mean: '${props.data.web.biteElasticSearch.suggest.text}'?`}</FeaturedSubtitleRed>
                                        </UnstyledLink>
                                    </Link>
                                )}
                        </FeaturedSuperContainer>
                    )}
                {!(
                    props.data.networkStatus === 1 ||
                    props.data.networkStatus === 2
                ) &&
                    props.data &&
                    props.data.web &&
                    props.data.web.playlistElasticSearch &&
                    props.data.web.playlistElasticSearch.items &&
                    (!props.data.error && props.searchQuery === "" ? (
                        <div />
                    ) : (
                        props.data.web.playlistElasticSearch.items.map(
                            (list, index) =>
                                this.renderPlaylistRow(list, index),
                        )
                    ))}

                {!(
                    props.data.networkStatus === 1 ||
                    props.data.networkStatus === 2
                ) &&
                    props.data.web.biteElasticSearch &&
                    (!props.data.error && props.searchQuery === "" ? (
                        <div />
                    ) : (
                        <SearchBitesContainer>
                            <AllTheBitesGrid
                                title={`${props.data.web.biteElasticSearch
                                    .pageInfo &&
                                    props.data.web.biteElasticSearch.pageInfo
                                        .itemCount} blerp sounds found for ${
                                    props.searchQuery
                                }`}
                                listLoadMore={this.handleListLoadMore(
                                    props.data,
                                )}
                                bites={
                                    (props.data.web &&
                                        props.data.web.biteElasticSearch
                                            .bites) ||
                                    []
                                }
                            />
                            {props.data.networkStatus === 3 && (
                                <LoadingScroll />
                            )}
                        </SearchBitesContainer>
                    ))}
            </React.Fragment>
        );
    }

    render() {
        return (
            <Query
                query={fetchSearchQuery}
                ssr={false}
                fetchPolicy='cache-first'
                variables={{
                    perPage: 120,
                    pageCount: 1,
                    query: this.props.searchQuery,
                }}
            >
                {({ data, networkStatus, error, loading, fetchMore }) => {
                    if (loading) {
                        return (
                            <PageContainer>
                                <Helmet>
                                    <title>{this.props.searchQuery}</title>
                                    <meta
                                        property='og:description'
                                        content={`"${this.props.searchQuery}" search for sounds, soundboards, and audio clips on blerp. Put sounds into soundboards share audio with friends. Try using blerp audio sounds on iMessage, iOS, Android, Google Assistant, and Discord.`}
                                    />
                                </Helmet>
                                <NavBar
                                    displayOnMobile='search'
                                    initialSearchQuery={this.props.searchQuery}
                                />
                                <FeaturedSuperContainer>
                                    <FeaturedTitle>{`${this.props.searchQuery
                                        .charAt(0)
                                        .toUpperCase() +
                                        this.props.searchQuery.slice(
                                            1,
                                        )} sounds and soundboards`}</FeaturedTitle>
                                    <FeaturedSubtitle>{`Searching for the best memes, videogame sfx, celebrity quotes, movie soundboards, and sound effects`}</FeaturedSubtitle>
                                </FeaturedSuperContainer>
                                <LoadingFullScreen />
                                <TabBar />
                            </PageContainer>
                        );
                    } else if (
                        !loading &&
                        data &&
                        data.web &&
                        this.props.searchQuery !== "" &&
                        data.web.biteElasticSearch &&
                        !data.web.biteElasticSearch.bites &&
                        !data.web.biteElasticSearch.bites.length &&
                        data.web.playlistElasticSearch &&
                        !data.web.playlistElasticSearch.items.length
                    ) {
                        return (
                            <NoSearchFoundPage
                                metaTitle={"No Search Found."}
                                mainText='Oh No!'
                                subtitle={`We don't have a blerp for ${this.props.searchQuery}`}
                                onPinkButtonClick={this.handleCreateClick}
                                redirectButtonText={"Create it Now"}
                                searchQuery={this.props.searchQuery}
                                suggestText={
                                    data &&
                                    data.web &&
                                    data.web.biteElasticSearch &&
                                    data.web.biteElasticSearch.suggest &&
                                    data.web.biteElasticSearch.suggest.text
                                }
                            />
                        );
                    } else {
                        return this.renderMain({
                            searchQuery: this.props.searchQuery,
                            data: {
                                ...data,
                                networkStatus,
                                error,
                                loading,
                                fetchMore,
                            },
                        });
                    }
                }}
            </Query>
        );
    }
}

export default withRouter(Page);
