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

const handleListLoadMoreBites = dataProp => () => {
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
                !previousResult.web.userById.bitePagination.pageInfo.hasNextPage
            ) {
                return previousResult;
            }

            return {
                web: {
                    ...previousResult.web,
                    userById: {
                        ...previousResult.web.userById,
                        bitePagination: {
                            pageInfo: {
                                ...fetchMoreResult.web.userById.bitePagination
                                    .pageInfo,
                            },
                            items: previousResult.web.userById.bitePagination.items.concat(
                                fetchMoreResult.web.userById.bitePagination
                                    .items,
                            ),
                        },
                    },
                },
            };
        },
        variables: {
            bitePage:
                dataProp.web.userById.bitePagination.pageInfo.currentPage + 1,
        },
    });
};

const fetchUserUploadProfileWeb = gql`
    query websiteGetUserUploadedBitesWeb($userId: MongoID!, $bitePage: Int!) {
        web {
            userById(_id: $userId) {
                _id
                username
                bitePagination(
                    page: $bitePage
                    perPage: 50
                    sort: PLAYCOUNT_DESC
                ) {
                    pageInfo {
                        perPage
                        currentPage
                        hasNextPage
                    }
                    items {
                        ...userUploadPageBite
                    }
                }
            }
        }
    }

    fragment userUploadPageBite on Bite {
        _id
        title
        keywords
        color
        favorited
        giphy {
            gif
        }
        image {
            original {
                url
            }
        }
        playCount
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

const goToUploadPage = () => {
    Router.push(`/upload`);
};

class UserUploaded extends React.Component {
    props;
    state;

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

        return (
            this.props.data.web.userById &&
            (this.props.data.web.userById.bitePagination.items.length ? (
                <BitesGridView
                    networkStatus={this.props.data.networkStatus}
                    bites={this.props.data.web.userById.bitePagination.items}
                    mode={this.props.displayMode}
                    handleListLoadMore={handleListLoadMoreBites(
                        this.props.data,
                    )}
                    addItemNavigation={goToUploadPage}
                    night={false}
                />
            ) : (
                <CreateBlerpMessage />
            ))
        );
    }
}

const fetchProfileUploadWrap = graphql(fetchUserUploadProfileWeb, {
    options: props => ({
        variables: {
            userId: props.username,
            bitePage: 0,
        },
    }),
});

export default compose(fetchProfileUploadWrap)(UserUploaded);
