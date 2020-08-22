/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import React, { lazy, Suspense } from "react";
import { Query, Mutation } from "@apollo/client/react/components";

import { Helmet } from "react-helmet";
import styled from "styled-components";
import { withRouter } from "next/router";
import { initializeApollo } from "../lib/nextApollo";

import NavBar from "../components/navigation/navbar";
import LoadingFullScreen from "../components/loading/loading-full-screen";

// const LoggedOutHome = dynamic(() => import("../packs/index/LoggedOutHome"), {
//     ssr: true,
//     loading: () => <LoadingFullScreen />,
// });
// const LoggedInHome = dynamic(() => import("../packs/index/LoggedInHome"), {
//     ssr: true,
//     loading: () => <LoadingFullScreen />,
// });

import LoggedOutHome from "../packs/index/LoggedOutHome";
import LoggedInHome from "../packs/index/LoggedInHome";

// import TwitchOnlineIndicator from '../components/twitch/TwitchOnlineIndicator';

const Container = styled.div`
    position: relative;
    justify-content: center;
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

const renderLoader = () => <LoadingFullScreen />;

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

    renderMainContent() {
        return (
            <Query query={USER_SIGNED_IN} ssr={true}>
                {({ data, networkStatus, loading }) => {
                    if (loading) {
                        return renderLoader();
                    }
                    if (data && (!data.web || !data.web.userSignedIn)) {
                        return <LoggedOutHome />;
                    }

                    return <LoggedInHome />;
                }}
            </Query>
        );
    }

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Blerp Audio Clips | Best Meme Soundboard | Soundboard Software"
                        }
                    </title>
                    <script type='application/ld+json'>{`[
                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "url": "https://blerp.com/",
                            "logo": "https://storage.googleapis.com/blerp-main-bucket/images/blerp-banner-log.png"
						},
						{
                            "@context": "http://schema.org",
                            "@type": "Organization",
                            "url": "https://blerp.com/",
                            "logo": "https://storage.googleapis.com/blerp-main-bucket/images/blerp-banner-log.png"
						},
						{
                            "@context": "http://schema.org",
                            "@type": "Organization",
                            "url": "https://blerp.com/",
                            "founder": "Aaron Hsu"
						},
						{
                            "@context": "http://schema.org",
                            "@type": "Organization",
                            "name": "Blerp",
                            "description": "Blerp is best audio search engine for all audio clips & sound bites. Search our soundboard search engine for dank audio memes and funny audio clips to share with others. Use Blerp on Discord and Twitch and find new ways to communicate. Try Blerp today.",
                            "image": "https://storage.googleapis.com/blerp-main-bucket/images/blerp-banner-log.png",
                            "logo": "https://storage.googleapis.com/blerp-main-bucket/images/blerp-banner-log.png",
                            "url": "https://blerp.com/",
                            "telephone": "support@blerp.com",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Salt Lake City"
                            }
						},
						{
                            "@context": "http://schema.org",
                            "@type": "Organization",
                            "url": "https://blerp.com/",
                            "contactPoint": [{
                                "@type": "ContactPoint",
                                "email": "support@blerp.com",
                                "contactType": "support",
                                "contactOption": "free",
                                "areaServed": "US"
                            }]
						},
						{
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Blerp",
                            "url": "https://blerp.com/",
                            "sameAs": [
                                "https://facebook.com/blerpapp",
                                "https://www.instagram.com/blerpapp/",
                                "http://tumblr.blerp.com/",
                                "https://discordapp.com/invite/zYSsRxm",
                                "https://www.reddit.com/r/blerp"
                            ]
						},
						{
						"@context": "https://schema.org/",
						"@type": "Product",
						"name": "Blerp Soundboard Meme Audio Search Engine",
						"image": [
							"https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg"
						],
						"description": "Blerp is best audio search engine for all audio clips & sound bites. Search our soundboard search engine for dank audio memes and funny audio clips to share with others. Use Blerp on Discord and Twitch and find new ways to communicate. Try Blerp today.",
						"brand": {
							"@type": "Thing",
							"name": "Blerp"
						},
						"review": {
							"@type": "Review",
							"name": "Best soundboard search engine I have ever used. I love playing audio clips at home and with my friends.",
							"author": "Skyli Heart"
						},
						"aggregateRating": {
							"@type": "AggregateRating",
							"ratingValue": "4.9",
							"reviewCount": "68"
						},
						"offers": {
							"@type": "Offer",
							"priceCurrency": "USD",
							"price": "0.00",
							"availability": "InStock",
							"priceValidUntil": "2100",
							"url": "https://blerp.com"
						}
						},
						{
						"@context": "https://schema.org",
						"@type": "WebSite",
						"url": "https://blerp.com",
						"potentialAction": {
							"@type": "SearchAction",
							"target": "https://blerp.com/search?q={search_term_string}",
							"query-input": "required name=search_term_string"
						}
						}]`}</script>
                    <meta
                        name='description'
                        content='Blerp lets you find, share, and create short audio clips, meme sounds, and soundboards! The fastest growing database of categorized meme sound effects and meme soundboards that you can easily use to enhance your communication and interactions. Use blerps on Discord, Twitch and even iOS and Android. Find new ways to communicate using short audio clips.'
                    />
                    <meta
                        name='keywords'
                        content='blerp sounds, audio quotes, blerp, best soundboard, Favorite Movies, sounds, funny quotes, tv show moments, great games, funny sound, quotes, movie soundboard, blurp, song lyrics, music snippets'
                    />
                    <meta
                        property='og:image'
                        content='https://storage.googleapis.com/blerp-public-images/branding/Screen%20Shot%202019-03-12%20at%208.14.59%20PM.png'
                    />
                    <meta property='og:image:width' content='300' />
                    <meta property='og:image:height' content='300' />
                    <meta
                        name='twitter:image'
                        content='https://storage.googleapis.com/blerp-public-images/branding/Screen%20Shot%202019-03-12%20at%208.14.59%20PM.png'
                    />
                    <meta name='twitter:image:width' content='262' />
                    <meta name='twitter:image:height' content='262' />
                </Helmet>
                <NavBar />
                {this.renderMainContent()}
            </Container>
        );
    }
}

export async function getServerSideProps(context) {
    const apolloClient = initializeApollo();

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        },
    };
}

export default withRouter(Page);
