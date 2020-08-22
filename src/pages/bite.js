/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2018 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import Link from "next/link";
import { default as Router, withRouter } from "next/router";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import TwitchPromotionBite from "../components/navigation/TwitchPromotionBite";

import AudioContainer from "../components/players/audio-container";
import LoadingFullScreen from "../components/loading/loading-full-screen";
import LoadingScroll from "../components/loading/loading-scroll";
import NewSocialContainer from "../components/shared/NewSocialContainer";
import Tag from "../components/shared/Tag";
import HorizontalList from "../components/lists/HorizontalList";
import OpenBiteMenu from "../components/shared/OpenBiteMenu";
import CopyUrlLink from "../components/shared/CopyUrlLink/modal";
import UserOwnerLink from "../components/shared/UserOwnerLink";
import { initializeApollo } from "../lib/nextApollo";

// import TwitchOnlineIndicator from '../components/twitch/TwitchOnlineIndicator';

import AddBoardMenu from "../components/shared/AddBoardMenu/index";
import BiteUpdateWrapper from "../components/admin/bite-update-wrapper";

import PinkButton from "../components/buttons/pink-button";
import SecondaryButton from "../components/buttons/secondary-button";

import { convertTagsToString } from "../lib/helperFunctions";
import withData from "../lib/withData";

import UrlChanger from "../components/shared/UrlChanger";

import {
    pandaPink,
    flyoutBackground,
    defaultBackground,
    bodyText,
    secondaryText,
} from "../styles/colors";

import NavBar from "../components/navigation/navbar";
import AppsBanner from "../components/navigation/apps-banner";

import NoBlerpFoundPage from "./not-found";

import projectConfig from "../config";
const currentHost = projectConfig.host;

import AllTheBitesGrid from "../components/shared/AllTheBitesGrid";

const CopyButtonContainer = styled.div`
    padding: 8px;
    border-radius: 6px;
    width: 200px;
    align-items: center;
    align-self: center;
    justify-content: center;
    text-align: center;
    margin: 12px auto;
`;

const isBrowser = typeof window !== "undefined";

const Container = styled.div`
    position: relative;
    font-weight: 300;
    padding: 0;
    margin: 0;
    width: 100%;
`;

const LoadingContainer = styled.div`
    position: relative;
    font-weight: 300;
    width: 100%;
    height: 70%;

    @media (max-width: 600px) {
        padding: 0;
        margin: 0;
    }
`;

const Content = styled.div`
    flex-flow: row wrap;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
`;

const StyledTag = styled(Tag)``;

const StyledAudioContainer = styled(AudioContainer)`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: 600px) {
        width: 500px;
    }

    @media (max-width: 600px) {
        flex-flow: column;
        width: 292px;
    }
`;

const BackgroundImage = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 120%;
    background: ${props =>
        props.imageUrl
            ? `url(${props.imageUrl}) no-repeat center center fixed ${props.color}`
            : props.color};
    background-size: cover;
    z-index: -2;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    margin-top: 80px;
    background-color: white;
    border-radius: 6px;
    position: relative;

    @media (max-width: 600px) {
        padding: 8px 0;
        width: 326px;
    }
`;

const Title = styled.span`
    color: ${flyoutBackground};
    text-align: center;
    font-weight: bold;
    font-size: 16px;
`;

const DarkTitle = styled.span`
    color: ${bodyText};
    text-align: center;
    font-weight: bold;
    font-size: 16px;
`;

const TagsContainer = styled.div`
    flex-flow: row wrap;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 500px;
    background-color: ${flyoutBackground};

    @media (max-width: 600px) {
        width: 292px;
    }
`;

const PlayCountSuperContainer = styled.div`
    text-align: center;
    padding: 20px 0;
    margin: 4px;
    background-color: #50555c;
    width: 500px;
    margin-bottom: 8px;
    border-radius: 6px;

    @media (max-width: 600px) {
        width: 292px;
    }
`;

const PlayCountContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 10px;
    width: 500px;
    text-align: center;
    font-size: 32px;
    text-overflow: ellipsis;
    color: ${pandaPink};

    @media (max-width: 600px) {
        width: 292px;
    }
`;

const LinksContainer = styled.div`
    text-align: center;
    padding: 20px 0;
    background-color: ${flyoutBackground};
    width: 500px;
    margin-bottom: 8px;
    border-radius: 6px;

    @media (max-width: 600px) {
        width: 292px;
    }
`;

const A = styled.a`
    text-decoration: none;
    color: inherit;
    border-radius: 10;
`;

const AppBannerContainer = styled(AppsBanner)`
    margin-top: 28px;
`;

const UserProfile = styled.img`
    width: 21px;
    height: 21px;
    background-position: center;
`;

const ButtonLink = styled.a`
    display: flex;
    flex-direction: row;
    text-decoration: none;
    background: transparent;
    margin: 0 32px;
    padding: 0;
    position: absolute;
    top: 240px;
    left: 32px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.9;
    }

    @media (max-width: 600px) {
        left: 8px;
        top: 380px;
        margin: 0;
    }
`;

const BackText = styled.div`
    text-decoration: none;
    color: #210000;
    font-size: 14px;
    padding: 4px;
`;

const AllBitesContainer = styled.div`
    padding: 40px;
    background-color: ${defaultBackground};
    border-radius: 0;
`;

const ButtonContainer = styled.div`
    margin: 8px;
`;

const AdminContainer = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
`;

const AdminButtonContainer = styled.div`
    align-self: center;
`;

const USER_SIGNED_IN = gql`
    query websiteUserBitePage {
        web {
            userSignedIn {
                _id
                roles
            }
        }
    }
`;

const biteRandomQuery = gql`
    query websiteGetBitePageRandom {
        web {
            biteRandomMany(limit: 40, audienceRating: [G, PG, PG13]) {
                ...biteRandomPageBite
            }
        }
    }

    fragment biteRandomPageBite on Bite {
        _id
        title
        userKeywords
        keywords
        color
        giphy {
            gif
        }
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

const biteQuery = gql`
    query websiteGetBitePage($id: MongoID!) {
        web {
            biteById(_id: $id) {
                ...bitePageFrag2
            }
        }
    }

    fragment bitePageFrag2 on Bite {
        _id
        title
        userKeywords
        keywords
        color
        image {
            original {
                url
            }
        }
        userCategory
        description
        author
        ownerObject {
            _id
            username
            picture
        }
        transcription
        favorited
        playCount
        visibility
        isCurated
        audienceRating
        ownerId
        giphy {
            mp4
            gif
        }
        audio {
            mp3 {
                url
            }
        }
    }
`;

// interface WithInitialProps {
//   getInitialProps?: (ctx: any) => object | Promise<object>;
// }

const FlexStartItem = styled.div`
    align-self: flex-end;
`;

const MetaInfo = styled.p`
    color: ${secondaryText};
    text-align: center;
    font-weight: lighter;
    font-size: 16px;
`;

const handleListLoadMore = (dataProp, fetchMore) => () => {
    // Don't call twice if already called handleListLoadMore
    // I was using awaitMore={props.data.this.props.data.networkStatus  === 3} before but for some reason it stops randomnly
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

class BitePage extends React.Component {
    props;
    state = {
        playCount: null,
        showingEdit: false,
    };

    handleCreateClick = event => {
        this.props.router.push("/upload");
    };

    renderNoBlerpFound() {
        return (
            <NoBlerpFoundPage
                mainText='Oh No!'
                subtitle="We don't have that blerp!"
                onPinkButtonClick={this.handleCreateClick}
                redirectButtonText={"Create it Now"}
                searchQuery={this.props.searchQuery}
            />
        );
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.playCount >= this.state.playCount) {
            this.setState({
                playCount: nextProps.playCount,
            });
        }
    }

    incrementItemPlayCount = playCount => () => {
        this.setState({
            playCount: this.state.playCount
                ? this.state.playCount + 1
                : playCount + 1,
        });
    };

    renderTags = keywords => (index, key) => {
        const tag = keywords[index];
        if (tag) {
            return (
                <Link
                    key={index}
                    prefetch={true}
                    href={{
                        pathname: "/search",
                        query: { q: tag.split(" ").join("-") },
                    }}
                    as={`/search?q=${encodeURI(tag.split(" ").join("-"))}`}
                >
                    <A
                        key={tag}
                        href={`/search?q=${encodeURI(
                            tag.split(" ").join("-"),
                        )}`}
                    >
                        <StyledTag colored={true}>{`#${tag}`}</StyledTag>
                    </A>
                </Link>
            );
        } else {
            return <div />;
        }
    };

    isOwnerOrAdmin(userData, biteData) {
        return (
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("ADMIN") > -1) ||
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("MODERATOR") > -1) ||
            (biteData &&
                biteData.web &&
                biteData.web.biteById &&
                biteData.web.biteById.ownerId) ===
                (userData &&
                    userData.web &&
                    userData.web.userSignedIn &&
                    userData.web.userSignedIn._id)
        );
    }

    isStrictlyAdmin(userData) {
        return (
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("ADMIN") > -1) ||
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("MODERATOR") > -1)
        );
    }

    showEditMode = () => {
        this.setState({ showingEdit: true });
    };

    hideEditMode = () => {
        this.setState({ showingEdit: false });
    };

    render() {
        return (
            <Query
                query={biteQuery}
                ssr={true}
                variables={{ id: this.props.id }}
            >
                {({ error, data, networkStatus, fetchMore, refetch }) => {
                    if (networkStatus === 1 || networkStatus === 2) {
                        return (
                            <LoadingContainer>
                                <LoadingFullScreen />
                            </LoadingContainer>
                        );
                    } else if (
                        !data ||
                        !data.web ||
                        !data.web.biteById ||
                        error
                    ) {
                        return this.renderNoBlerpFound();
                    }

                    return (
                        <Container>
                            <UrlChanger
                                key={this.props.id}
                                id={this.props.id}
                                title={data.web.biteById.title}
                                oldBaseName={"bite"}
                                newUrlBasePathName={"soundbites"}
                            />
                            {data.web && (
                                <Helmet>
                                    <title>
                                        {data.web.biteById.title &&
                                            data.web.biteById.title.substring(
                                                0,
                                                65,
                                            )}
                                    </title>
                                    <meta charSet='utf-8' />
                                    <link
                                        rel='canonical'
                                        href={`https://blerp.com/soundbites/${data.web.biteById._id}`}
                                    />
                                    <link
                                        rel='alternate'
                                        type='application/json+oembed'
                                        href={`https://blerp.com/oembed?url=https://blerp.com/soundbites/${data.web.biteById._id}`}
                                        title={data.web.biteById.title}
                                    />
                                    <meta
                                        property='og:title'
                                        content={data.web.biteById.title}
                                    />
                                    <meta
                                        property='og:type'
                                        content='music.song'
                                    />
                                    <meta
                                        property='og:description'
                                        content={`"${data.web.biteById.title}" is an audio clip, soundbite found on blerp! Discover your favorite sound bites and create the best soundboards using Blerp. Try blerp on iMessage, iOS, Android, Google Assistant, and Discord.`}
                                    />
                                    <meta
                                        property='og:url'
                                        content={`https://blerp.com/soundbites/${data.web.biteById._id}`}
                                    />
                                    {data.web.biteById.image && (
                                        <meta
                                            property='og:image'
                                            content={
                                                data.web.biteById.image
                                                    ? data.web.biteById.image
                                                          .original.url
                                                    : `https://blerp.com/background?w=300&h=300&color=${data.web.biteById.color.slice(
                                                          1,
                                                      )}`
                                            }
                                        />
                                    )}
                                    <meta
                                        property='og:image:width'
                                        content='300'
                                    />
                                    <meta
                                        property='og:image:height'
                                        content='300'
                                    />
                                    <meta
                                        property='og:audio'
                                        content={
                                            data.web.biteById.audio.mp3.url
                                        }
                                    />
                                    {/* TODO: make a video audiogram*/}
                                    <meta
                                        property='og:video'
                                        content={data.web.biteById.giphy.mp4}
                                    />
                                    <meta
                                        property='og:site_name'
                                        content='Blerp'
                                    />
                                    <meta
                                        property='fb:app_id'
                                        content='448243362173908'
                                    />

                                    <meta
                                        name='twitter:card'
                                        content='player'
                                    />
                                    <meta
                                        name='twitter:site'
                                        content='@blerp'
                                    />
                                    <meta
                                        name='twitter:title'
                                        content={data.web.biteById.title}
                                    />
                                    <meta
                                        name='description'
                                        content={convertTagsToString(
                                            data.web.biteById.keywords.concat(
                                                data.web.biteById.userKeywords,
                                            ),
                                        )}
                                    />
                                    <meta
                                        name='twitter:description'
                                        content={convertTagsToString(
                                            data.web.biteById.keywords.concat(
                                                data.web.biteById.userKeywords,
                                            ),
                                        )}
                                    />
                                    <meta
                                        name='twitter:image'
                                        content={
                                            data.web.biteById.image
                                                ? data.web.biteById.image
                                                      .original.url
                                                : `https://blerp.com/background?w=600&h=600&color=${data.web.biteById.color.slice(
                                                      1,
                                                  )}`
                                        }
                                    />
                                    <meta
                                        name='twitter:image:width'
                                        content='262'
                                    />
                                    <meta
                                        name='twitter:image:height'
                                        content='262'
                                    />
                                    {data.web.biteById && (
                                        <meta
                                            name='twitter:player'
                                            content={`https://blerp.com/iframe/soundbites/${data.web.biteById._id}`}
                                        />
                                    )}
                                    <meta
                                        name='twitter:player:stream'
                                        content={
                                            data.web.biteById.audio.mp3.url
                                        }
                                    />
                                    <meta
                                        name='twitter:player:stream:content_type'
                                        content='video/mp4'
                                    />
                                    <meta
                                        name='twitter:player:width'
                                        content='262'
                                    />
                                    <meta
                                        name='twitter:player:height'
                                        content='262'
                                    />
                                    <script type='application/ld+json'>{`[
                                        {
                                            "@context": "http://schema.org",
                                            "@type": "MediaObject",
                                            "url": "https://blerp.com/soundbites/${
                                                data.web.biteById._id
                                            }",
                                            "embedUrl": "https://blerp.com/embed/${
                                                data.web.biteById._id
                                            }",
                                            "encodingFormat": "audio/mpeg",
                                            "name": "${data.web.biteById
                                                .title &&
                                                data.web.biteById.title.replace(
                                                    /"/g,
                                                    "",
                                                )}",
                                            "image": "${
                                                data.web.biteById.image
                                                    ? data.web.biteById.image
                                                          .original.url
                                                    : `https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg`
                                            }",
                                            "keywords": "${data.web.biteById.keywords
                                                .concat(
                                                    data.web.biteById
                                                        .userKeywords,
                                                )
                                                .toString()}",
                                            "contentUrl": "${
                                                data.web.biteById.audio.mp3.url
                                            }"
                                        }]
                                    `}</script>
                                </Helmet>
                            )}
                            <NavBar />
                            <TwitchPromotionBite />
                            {!data.error && (
                                <Content>
                                    {/* <TwitchOnlineIndicator/> */}
                                    <ButtonLink
                                        onClick={() => {
                                            try {
                                                window.history.length
                                                    ? this.props.router.back()
                                                    : (window.location.href =
                                                          "/");
                                            } catch (e) {
                                                window.location.href = "/";
                                            }
                                        }}
                                    >
                                        <UserProfile
                                            src='https://storage.googleapis.com/blerp-public-images/navigation/back-arrow.svg'
                                            alt='Back Arrow'
                                        />
                                        <BackText>{"Back"}</BackText>
                                    </ButtonLink>
                                    <ContentContainer>
                                        <Query
                                            query={USER_SIGNED_IN}
                                            ssr={false}
                                            errorPolicy={"all"}
                                            fetchPolicy={"network-only"}
                                        >
                                            {userQuery => {
                                                return (
                                                    <React.Fragment>
                                                        {this.isOwnerOrAdmin(
                                                            userQuery.data,
                                                            data,
                                                        ) ? (
                                                            <OpenBiteMenu
                                                                key={341}
                                                                biteId={
                                                                    data.web
                                                                        .biteById &&
                                                                    data.web
                                                                        .biteById
                                                                        ._id
                                                                }
                                                                refetch={
                                                                    refetch
                                                                }
                                                            />
                                                        ) : (
                                                            <div key={37464} />
                                                        )}
                                                        <StyledAudioContainer
                                                            key={12}
                                                            id={
                                                                data.web
                                                                    .biteById
                                                                    ._id
                                                            }
                                                            sources={[
                                                                data.web
                                                                    .biteById
                                                                    .audio.mp3
                                                                    .url,
                                                            ]}
                                                            imageUrl={
                                                                (data.web
                                                                    .biteById
                                                                    .image &&
                                                                    data.web
                                                                        .biteById
                                                                        .image
                                                                        .original
                                                                        .url) ||
                                                                (data.web
                                                                    .biteById
                                                                    .giphy &&
                                                                    data.web
                                                                        .biteById
                                                                        .giphy
                                                                        .gif)
                                                            }
                                                            title={
                                                                data.web
                                                                    .biteById
                                                                    .title
                                                            }
                                                            backgroundColor={
                                                                data.web
                                                                    .biteById
                                                                    .color
                                                            }
                                                            playCallback={this.incrementItemPlayCount(
                                                                data.web
                                                                    .biteById
                                                                    .playCount,
                                                            )}
                                                            favorited={
                                                                data.web
                                                                    .biteById
                                                                    .favorited
                                                            }
                                                            loggedIn={
                                                                userQuery.data &&
                                                                userQuery.data
                                                                    .web &&
                                                                userQuery.data
                                                                    .web
                                                                    .userSignedIn &&
                                                                userQuery.data
                                                                    .web
                                                                    .userSignedIn
                                                                    ._id
                                                            }
                                                        />
                                                        <DarkTitle>
                                                            Save to Soundboard
                                                        </DarkTitle>
                                                        <ButtonContainer
                                                            key={24}
                                                        >
                                                            <AddBoardMenu
                                                                biteId={
                                                                    data.web
                                                                        .biteById
                                                                        ._id
                                                                }
                                                                rootNode={null}
                                                                signedInUserId={
                                                                    userQuery.data &&
                                                                    userQuery
                                                                        .data
                                                                        .web &&
                                                                    userQuery
                                                                        .data
                                                                        .web
                                                                        .userSignedIn &&
                                                                    userQuery
                                                                        .data
                                                                        .web
                                                                        .userSignedIn
                                                                        ._id
                                                                }
                                                            />
                                                        </ButtonContainer>
                                                        <AdminContainer
                                                            key={
                                                                data.web
                                                                    .biteById
                                                                    ._id
                                                            }
                                                        >
                                                            {this.state
                                                                .showingEdit &&
                                                                this.isOwnerOrAdmin(
                                                                    userQuery.data,
                                                                    data,
                                                                ) && (
                                                                    <BiteUpdateWrapper
                                                                        key={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                ._id
                                                                        }
                                                                        biteId={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                ._id
                                                                        }
                                                                        biteTitle={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                .title
                                                                        }
                                                                        visibility={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                .visibility
                                                                        }
                                                                        audienceRating={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                .audienceRating
                                                                        }
                                                                        tags={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                .userKeywords
                                                                        }
                                                                        author={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                .author
                                                                        }
                                                                        userCategory={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                .userCategory
                                                                        }
                                                                        description={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                .description
                                                                        }
                                                                        audioTextTranscription={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                .transcription
                                                                        }
                                                                        isModerator={this.isStrictlyAdmin(
                                                                            userQuery.data,
                                                                        )}
                                                                        refetch={
                                                                            refetch
                                                                        }
                                                                        isCurated={
                                                                            data
                                                                                .web
                                                                                .biteById
                                                                                .isCurated
                                                                        }
                                                                    />
                                                                )}
                                                            {this.isOwnerOrAdmin(
                                                                userQuery.data,
                                                                data,
                                                            ) ? (
                                                                this.state
                                                                    .showingEdit ? (
                                                                    <AdminButtonContainer>
                                                                        <SecondaryButton
                                                                            key={
                                                                                this
                                                                                    .props
                                                                                    .biteId
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .hideEditMode
                                                                            }
                                                                        >
                                                                            {
                                                                                "Exit Edit"
                                                                            }
                                                                        </SecondaryButton>
                                                                    </AdminButtonContainer>
                                                                ) : (
                                                                    <AdminButtonContainer>
                                                                        <PinkButton
                                                                            key={
                                                                                this
                                                                                    .props
                                                                                    .biteId
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .showEditMode
                                                                            }
                                                                        >
                                                                            {
                                                                                "Edit"
                                                                            }
                                                                        </PinkButton>
                                                                    </AdminButtonContainer>
                                                                )
                                                            ) : (
                                                                <div />
                                                            )}
                                                        </AdminContainer>
                                                    </React.Fragment>
                                                );
                                            }}
                                        </Query>

                                        {/* <PlayCountSuperContainer>
                      <Title>Play Count!</Title>
                      <PlayCountContainer key={data.web.biteById.playCount}>
                        {this.state.playCount || data.web.biteById.playCount}
                      </PlayCountContainer>
                    </PlayCountSuperContainer> */}

                                        <NewSocialContainer
                                            mainTitle={"Share With"}
                                            id={data.web.biteById._id}
                                            itemTitle={data.web.biteById.title}
                                            downloadUrl={
                                                data.web.biteById.audio.mp3.url
                                            }
                                            analyticTitle={"SHARE_BLERP"}
                                            analyticUsingTitle={
                                                "WEB_BLERP_PAGE_SOCIAL_ITEM_MENU"
                                            }
                                        />

                                        <LinksContainer>
                                            {data.web.biteById.userCategory && (
                                                <React.Fragment>
                                                    <DarkTitle>
                                                        Audio Type
                                                    </DarkTitle>
                                                    <MetaInfo>
                                                        {
                                                            data.web.biteById
                                                                .userCategory
                                                        }
                                                    </MetaInfo>
                                                </React.Fragment>
                                            )}

                                            {data.web.biteById.author && (
                                                <React.Fragment>
                                                    <DarkTitle>
                                                        Author
                                                    </DarkTitle>
                                                    <MetaInfo>
                                                        {
                                                            data.web.biteById
                                                                .author
                                                        }
                                                    </MetaInfo>
                                                </React.Fragment>
                                            )}

                                            {data.web.biteById.description && (
                                                <React.Fragment>
                                                    <DarkTitle>
                                                        Description
                                                    </DarkTitle>
                                                    <MetaInfo>
                                                        {
                                                            data.web.biteById
                                                                .description
                                                        }
                                                    </MetaInfo>
                                                </React.Fragment>
                                            )}

                                            <DarkTitle>Permanent URL</DarkTitle>
                                            <CopyButtonContainer>
                                                <CopyUrlLink
                                                    key={data.web.biteById._id}
                                                    id={data.web.biteById._id}
                                                    url={`${currentHost}/soundbites/${data.web.biteById._id}`}
                                                    title={"Copy Bite Link"}
                                                    analyticTitle={
                                                        "COPY_BLERP_WEB_URL"
                                                    }
                                                    analyticUsing={"BLERP_PAGE"}
                                                />
                                            </CopyButtonContainer>
                                            <DarkTitle>Tags</DarkTitle>
                                            <TagsContainer>
                                                <HorizontalList
                                                    length={
                                                        data.web.biteById.keywords.concat(
                                                            data.web.biteById
                                                                .userKeywords,
                                                        ).length
                                                    }
                                                    renderListItems={this.renderTags(
                                                        data.web.biteById.keywords.concat(
                                                            data.web.biteById
                                                                .userKeywords,
                                                        ),
                                                    )}
                                                    showArrows={true}
                                                />
                                            </TagsContainer>
                                        </LinksContainer>
                                        <FlexStartItem>
                                            <UserOwnerLink
                                                key={29}
                                                user={
                                                    data.web.biteById
                                                        .ownerObject
                                                }
                                            />
                                        </FlexStartItem>
                                    </ContentContainer>

                                    <BackgroundImage
                                        imageUrl={
                                            "https://storage.googleapis.com/blerp-public-images/backgrounds/gray-background.png"
                                        }
                                        color={data.web.biteById.color}
                                    />
                                    {/* <ScrimImage /> */}
                                    <AppBannerContainer />
                                </Content>
                            )}
                            <Query query={biteRandomQuery} ssr={false}>
                                {biteRandomQueryObj => {
                                    return (
                                        <AllBitesContainer>
                                            <AllTheBitesGrid
                                                listLoadMore={handleListLoadMore(
                                                    biteRandomQueryObj.data,
                                                    biteRandomQueryObj.fetchMore,
                                                )}
                                                bites={
                                                    (biteRandomQueryObj.data &&
                                                        biteRandomQueryObj.data
                                                            .web &&
                                                        biteRandomQueryObj.data
                                                            .web
                                                            .biteRandomMany) ||
                                                    []
                                                }
                                            />
                                        </AllBitesContainer>
                                    );
                                }}
                            </Query>
                            {networkStatus === 3 && (
                                <LoadingScroll bottomPixels='0' />
                            )}
                        </Container>
                    );
                }}
            </Query>
        );
    }
}

const Page = BitePage;

export async function getServerSideProps(context) {
    const apolloClient = initializeApollo();
    const biteId = context.query && context.query.id;
    await apolloClient.query({
        query: biteQuery,
        variables: { id: biteId },
        fetchPolicy: "network-only",
    });

    return {
        props: {
            id: biteId,
            initialApolloState: apolloClient.cache.extract(),
        },
    };
}

export default withRouter(BitePage);
