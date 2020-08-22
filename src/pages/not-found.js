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

import PinkButton from "../components/buttons/pink-button";
import LoadingFullScreen from "../components/loading/loading-full-screen";
import LoadingScroll from "../components/loading/loading-scroll";
import Link from "next/link";

import NavBar from "../components/navigation/navbar";

import {
    defaultBackground,
    statusColor,
    bodyText,
    pandaPink,
    flyoutBackground,
    secondarySubtitleText,
    secondaryText,
    darkBlue,
} from "../styles/colors";

import AllTheBitesGrid from "../components/shared/AllTheBitesGrid";

import withData from "../lib/withData";
import { logEvent } from "../lib/analytics";

const Container = styled.div`
    background-color: ${defaultBackground};
    position: relative;
    justify-content: center;
    width: 100%;
`;

const NoSearchHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 400px;
    align-items: center;
    justify-content: space-evenly;
    padding: 40px 0;
    background-color: ${flyoutBackground};

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const NoSearchTextContainer = styled.div`
    text-align: center;
    z-index: 2;
`;

const NoSearchName = styled.h1`
    color: ${secondaryText};
    font-weight: 600;
    font-size: 48px;
    margin: 4px;
    z-index: 1;
`;

const NoSearchSubtitle = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: lighter;
    padding: 8px;
    margin: 0;
    font-size: 32px;
    z-index: 1;
`;

const AllBitesContainer = styled.div`
    padding: 40px;
`;

const FooterContainer = styled.div``;

const SadBlerpy = styled.img`
    position: absolute;
`;

const RANDOM_QUERY = gql`
    query websiteNoSearchPage {
        web {
            biteRandomMany(limit: 40, audienceRating: [G, PG, PG13]) {
                ...notFoundBite
            }
        }
    }

    fragment notFoundBite on Bite {
        _id
        title
        keywords
        color
        image {
            original {
                url
            }
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

const handleListLoadMore = (dataProp, fetchMore) => () => {
    // Don't call twice if already called handleListLoadMore
    // I was using awaitMore={props.data.networkStatus === 3} before but for some reason it stops randomnly
    if (dataProp.networkStatus === 3) {
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
};

const FeaturedSubtitleRed = styled.h3`
    color: ${darkBlue};
    font-weight: light;
    align-self: flex-start;
    text-decoration: none;
    margin: 0;
    padding: 12px 0;
    font-size: 20px;
`;

const UnstyledLink = styled.a`
    text-decoration: none;
    color: inherit;
    border-radius: 10;
`;

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    renderNoSearchHeader() {
        return (
            <NoSearchHeaderContainer>
                <SadBlerpy
                    src='https://storage.googleapis.com/blerp-web-images/main/sad-blerpy.png'
                    alt='Not Found Blerp Background'
                />
                <NoSearchTextContainer>
                    {!!this.props.suggestText && (
                        <Link
                            prefetch={true}
                            href={{
                                pathname: "/search",
                                query: { q: this.props.suggestText },
                            }}
                            as={`/search?q=${encodeURI(
                                this.props.suggestText,
                            )}`}
                        >
                            <UnstyledLink
                                href={`/search?q=${encodeURI(
                                    this.props.suggestText,
                                )}`}
                            >
                                <FeaturedSubtitleRed>{`Did you mean: '${this.props.suggestText}'?`}</FeaturedSubtitleRed>
                            </UnstyledLink>
                        </Link>
                    )}
                    <NoSearchName>{this.props.mainText}</NoSearchName>
                    <NoSearchSubtitle>{this.props.subtitle}</NoSearchSubtitle>
                </NoSearchTextContainer>
                <PinkButton onClick={this.props.onPinkButtonClick}>
                    {this.props.redirectButtonText}
                </PinkButton>
            </NoSearchHeaderContainer>
        );
    }

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>{this.props.metaTitle}</title>\
                </Helmet>
                <NavBar
                    displayOnMobile='search'
                    initialSearchQuery={this.props.searchQuery}
                />
                {this.renderNoSearchHeader()}
                <Query query={RANDOM_QUERY}>
                    {({ data, networkStatus, fetchMore }) => {
                        if (networkStatus === 1 || networkStatus === 2) {
                            return <LoadingFullScreen />;
                        }

                        return (
                            <React.Fragment>
                                <AllBitesContainer>
                                    <AllTheBitesGrid
                                        listLoadMore={handleListLoadMore(
                                            data,
                                            fetchMore,
                                        )}
                                        bites={
                                            (data &&
                                                data.web &&
                                                data.web.biteRandomMany) ||
                                            []
                                        }
                                        prefetchLink={true}
                                    />
                                </AllBitesContainer>
                                {networkStatus === 3 && (
                                    <LoadingScroll bottomPixels='0' />
                                )}
                            </React.Fragment>
                        );
                    }}
                </Query>
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
