/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { flowRight as compose } from "lodash";
import styled from "styled-components";
import Router from "next/router";

import LoadingFullScreen from "../../loading/loading-full-screen";
import ItemsLinkGridView from "../../shared/ItemGrid";
import { bodyText } from "../../../styles/colors";
import Link from "next/link";

const LoadingContainer = styled.div`
    width: 100%;
`;

// interface WithInitialProps {
//   getInitialProps?: (ctx: any) => object | Promise<object>;
// }

const handleListLoadMoreFavorites = dataProp => () => {
    if (dataProp.networkStatus === 3) {
        return;
    }

    // The fetchMore method is used to load new data and add it
    // to the original query we used to populate the list
    dataProp.fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
            // Don't do anything if there weren't any new items
            if (
                !fetchMoreResult ||
                !previousResult.web.userById.followSoundboardPagination.pageInfo
                    .hasNextPage
            ) {
                return previousResult;
            }

            return {
                web: {
                    ...previousResult.web,
                    userById: {
                        ...previousResult.web.userById,
                        followSoundboardPagination: {
                            pageInfo: {
                                ...fetchMoreResult.web.userById
                                    .followSoundboardPagination.pageInfo,
                            },
                            items: previousResult.web.userById.followSoundboardPagination.items.concat(
                                fetchMoreResult.web.userById
                                    .followSoundboardPagination.items,
                            ),
                        },
                    },
                },
            };
        },
        variables: {
            followedPage:
                dataProp.web.userById.followSoundboardPagination.pageInfo
                    .currentPage + 1,
        },
    });
};

const fetchUserProfileWeb = gql`
    query websiteGetUserFollowedForWeb($userId: MongoID!, $followedPage: Int!) {
        web {
            userById(_id: $userId) {
                _id
                username
                followSoundboardPagination(page: $followedPage, perPage: 100) {
                    count
                    pageInfo {
                        perPage
                        currentPage
                        hasNextPage
                    }
                    items {
                        _id
                        title
                        giphy {
                            gif
                        }
                        image {
                            original {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`;

const goToHomePage = () => {
    Router.push(`/`);
};

const Container = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    padding: 64px;
`;

const StyleDiv = styled.a`
    width: fit-content;
    margin: auto;
    color: #7abcff;
    font-size: 30px;
    text-decoration: none;

    &:hover {
        opacity: 0.7;
    }
`;

const BlerpMascot = styled.img`
    height: 100px;
    background-position: center;
    cursor: pointer;
    margin: 16px;
`;

const StyleImageText = styled.div`
    color: #7abcff;
    font-size: 30px;
`;

const StyleNoDataText = styled.div`
    color: ${bodyText};
    font-size: 40px;

    @media (max-width: 600px) {
        margin-top: 50px;
    }
`;

const StyleSvg = styled.svg`
    height: 48%;
`;

const handleListLoadMorePlaylists = dataProp => () => {
    if (dataProp.networkStatus === 3) {
        return;
    }
    console.log("fetching more called!");
    // The fetchMore method is used to load new data and add it
    // to the original query we used to populate the list
    dataProp.fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
            // Don't do anything if there weren't any new items
            if (
                !fetchMoreResult ||
                !previousResult.web.userById.followSoundboardPagination.pageInfo
                    .hasNextPage
            ) {
                return previousResult;
            }

            return {
                web: {
                    ...previousResult.web,
                    userById: {
                        ...previousResult.web.userById,
                        followSoundboardPagination: {
                            pageInfo: {
                                ...fetchMoreResult.web.userById
                                    .followSoundboardPagination.pageInfo,
                            },
                            items: previousResult.web.userById.followSoundboardPagination.items.concat(
                                fetchMoreResult.web.userById
                                    .followSoundboardPagination.items,
                            ),
                        },
                    },
                },
            };
        },
        variables: {
            playlistPage:
                dataProp.web.userById.followSoundboardPagination.pageInfo
                    .currentPage + 1,
        },
    });
};

class Page extends React.Component {
    props;
    state = {
        playlists: null,
    };

    UNSAFE_componentWillReceiveProps(newProps) {
        if (
            newProps.data.web &&
            newProps.data.web.userById.followSoundboardPagination &&
            newProps.data.web.userById.followSoundboardPagination.items
        ) {
            this.setState({
                playlists:
                    newProps.data.web.userById.followSoundboardPagination.items,
            });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        if (
            this.props.data.networkStatus === 1 ||
            this.props.data.networkStatus === 2
        ) {
            return (
                <LoadingContainer>
                    <LoadingFullScreen />
                </LoadingContainer>
            );
        }

        return this.state.playlists && this.state.playlists.length ? (
            <ItemsLinkGridView
                items={
                    this.props.data.web.userById.followSoundboardPagination
                        .items
                }
                handleListLoadMore={handleListLoadMoreFavorites(
                    this.props.data,
                )}
                itemType={"soundboard"}
            />
        ) : (
            <Container>
                <StyleNoDataText>No followed boards here yet!</StyleNoDataText>
                <Link prefetch={true} href='/'>
                    <StyleDiv href='/'>
                        <BlerpMascot src='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftIbisRed.svg' />
                        <StyleImageText>
                            Follow your favorite soundboards and they will
                            appear here!
                        </StyleImageText>
                    </StyleDiv>
                </Link>
            </Container>
        );
    }
}

const fetchProfileWrap = graphql(fetchUserProfileWeb, {
    options: props => ({
        ssr: false,
        variables: {
            userId: props.username,
            followedPage: 0,
        },
    }),
});

export default compose(fetchProfileWrap)(Page);
