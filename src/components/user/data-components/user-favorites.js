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

import BitesGridView from "../bites-grid-view";
import CreateBlerpMessage from "../create-blerp-message";
import LoadingFullScreen from "../../loading/loading-full-screen";

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
                !previousResult.web.userById.favoriteBitesPagination.pageInfo
                    .hasNextPage
            ) {
                return previousResult;
            }

            return {
                web: {
                    ...previousResult.web,
                    userById: {
                        ...previousResult.web.userById,
                        favoriteBitesPagination: {
                            pageInfo: {
                                ...fetchMoreResult.web.userById
                                    .favoriteBitesPagination.pageInfo,
                            },
                            items: previousResult.web.userById.favoriteBitesPagination.items.concat(
                                fetchMoreResult.web.userById
                                    .favoriteBitesPagination.items,
                            ),
                        },
                    },
                },
            };
        },
        variables: {
            favoritePage:
                dataProp.web.userById.favoriteBitesPagination.pageInfo
                    .currentPage + 1,
        },
    });
};

const fetchUserProfileWeb = gql`
    query websiteGetUserFavoritesForWeb(
        $userId: MongoID!
        $favoritePage: Int!
    ) {
        web {
            userById(_id: $userId) {
                _id
                username
                favoriteBitesPagination(page: $favoritePage, perPage: 55) {
                    pageInfo {
                        perPage
                        currentPage
                        hasNextPage
                    }
                    items {
                        ...userFavoritePageBite
                    }
                }
            }
        }
    }

    fragment userFavoritePageBite on Bite {
        _id
        title
        keywords
        color
        favorited
        playCount
        giphy {
            gif
        }
        image {
            original {
                url
            }
        }
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

const goToHomePage = () => {
    Router.push(`/`);
};

class Page extends React.Component {
    props;
    state = {
        bites: null,
    };

    UNSAFE_componentWillReceiveProps(newProps) {
        if (
            newProps.data.web &&
            newProps.data.web.userById.favoriteBitesPagination &&
            newProps.data.web.userById.favoriteBitesPagination.items
        ) {
            this.setState({
                bites: newProps.data.web.userById.favoriteBitesPagination.items,
            });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    favoriteCallback(biteId, favorited) {
        // if (!favorited) {
        //   const newBites = this.state.bites.slice();
        //   newBites.filter(bite => {
        //     return bite._id !== biteId;
        //   });
        //   this.setState({ bites: newBites });
        // }
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

        return this.state.bites && this.state.bites.length ? (
            <BitesGridView
                networkStatus={this.props.data.networkStatus}
                bites={this.state.bites}
                mode={this.props.displayMode}
                addItemNavigation={goToHomePage}
                handleListLoadMore={handleListLoadMoreFavorites(
                    this.props.data,
                )}
                favoriteCallback={this.favoriteCallback}
                night={false}
            />
        ) : (
            <CreateBlerpMessage />
        );
    }
}

const fetchProfileWrap = graphql(fetchUserProfileWeb, {
    options: props => ({
        ssr: false,
        variables: {
            userId: props.username,
            favoritePage: 0,
        },
    }),
});

export default compose(fetchProfileWrap)(Page);
