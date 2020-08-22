/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import * as React from "react";
import styled from "styled-components";
import BoardBite from "./board-bite";

import NoSearchFound from "../messages/no-search-found-upload";
import LoadingTinyScreen from "../loading/loading-tiny-screen";

import gql from "graphql-tag";
import { graphql } from "@apollo/react-hoc";

import ContentContainerGrid from "../shared/ContentContainerGrid";

const Container = styled.div`
    width: 100%;
    background-color: transparent;
`;

const NoSearchContainer = styled.div`
    width: 100%;
    padding: 40px 0;
`;

const LoadingContainer = styled.div`
    width: 98%;
`;

const handleListLoadMore = dataProp => (size, pageSize) => {
    // I was using awaitMore={props.data.networkStatus === 3} before but for some reason it stops randomnly
    if (dataProp.networkStatus === 3) {
        return;
    }
    // The fetchMore method is used to load new data and add it
    // to the original query we used to populate the list
    dataProp.fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
            // Don't do anything if there weren't any new items
            if (
                previousResult.web &&
                !previousResult.web.biteElasticSearch.pageInfo.hasNextPage
            ) {
                // TODO: set finished loading all blerps logo
                return previousResult;
            }
            if (
                !fetchMoreResult ||
                fetchMoreResult.web.biteElasticSearch.bites.length === 0
            ) {
                return previousResult;
            }

            return {
                // Concatenate the new search results after the old ones
                web: {
                    biteElasticSearch: {
                        pageInfo: {
                            ...fetchMoreResult.web.biteElasticSearch.pageInfo,
                        },
                        bites: previousResult.web.biteElasticSearch.bites.concat(
                            fetchMoreResult.web.biteElasticSearch.bites,
                        ),
                    },
                },
            };
        },
        variables: {
            pageCount: dataProp.web.biteElasticSearch.pageInfo.currentPage + 1,
        },
    });
};

// interface Props {
//   data: any;
//   handleAddButtonClicked: any;
// }

const itemsRenderer = (items, ref) => (
    <ContentContainerGrid ref={ref} role='region' aria-labelledby='recent'>
        {items}
    </ContentContainerGrid>
);

const SearchAddList = props => {
    if (props.data.networkStatus === 1 || props.data.networkStatus === 2) {
        return (
            <LoadingContainer>
                <LoadingTinyScreen />
            </LoadingContainer>
        );
    } else if (props.data.variables.query === "") {
        return <Container />;
    } else if (
        props.data.networkStatus === 8 ||
        props.data.error ||
        !props.data.web ||
        (props.data.web &&
            props.data.web &&
            props.data.web.biteElasticSearch.bites.length === 0)
    ) {
        return (
            <NoSearchContainer>
                <NoSearchFound night={true} />
            </NoSearchContainer>
        );
    }

    return (
        <Container>
            <List
                itemCount={props.data.web.biteElasticSearch.bites.length}
                itemsRenderer={itemsRenderer}
                onIntersection={handleListLoadMore(props.data)}
                threshold={"20%"}
            >
                {(index, key) => {
                    const bite = props.data.web.biteElasticSearch.bites[index];
                    return (
                        <BoardBite
                            key={key}
                            biteId={bite._id}
                            title={bite.title}
                            audioSourceUrls={[
                                bite.audio.mp3.url,
                                bite.audio.original.url,
                            ]}
                            color={bite.color}
                            imageUrl={
                                (bite.image && bite.image.original.url) ||
                                (bite.giphy && bite.giphy.gif)
                            }
                            editable={false}
                            adding={true}
                            onPlaceholderClick={props.handleAddButtonClicked}
                            isSpam={false}
                        />
                    );
                }}
            </List>
        </Container>
    );
};

const searchQueryGraphql = gql`
    query websiteBoardSearchModal(
        $query: String!
        $pageCount: Int!
        $perPage: Int!
    ) {
        web {
            biteElasticSearch(
                query: $query
                page: $pageCount
                perPage: $perPage
            ) {
                pageInfo {
                    pageCount
                    perPage
                    hasNextPage
                    currentPage
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

export default graphql(searchQueryGraphql, {
    options: ({ searchQuery }) => ({
        errorPolicy: "ignore", // TODO: change to all but get it to render
        ssr: false,
        variables: {
            query: searchQuery,
            perPage: 30,
            pageCount: 0,
        },
    }),
})(SearchAddList);
