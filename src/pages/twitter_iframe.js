/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2018 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import AudioContainer from "../components/players/embed-player";
import NewSocialContainer from "../components/shared/NewSocialContainer/index";
import CopyUrlLink from "../components/shared/CopyUrlLink/modal";

import { convertTagsToString } from "../lib/helperFunctions";
import withData from "../lib/withData";

import { flyoutBackground, bodyText } from "../styles/colors";

import projectConfig from "../config";
const currentHost = projectConfig.host;

const Container = styled.div`
    position: relative;
    font-weight: 300;
    padding: 0;
    margin: 0;
    width: 100%;
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

const StyledEmbedPlayer = styled(AudioContainer)`
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
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background-color: white;
    border-radius: 6px;
    position: relative;
    margin: 8px;

    @media (max-width: 600px) {
        width: 326px;
    }
`;

const biteQuery = gql`
    query websiteGetTwitterPage($id: MongoID!) {
        web {
            biteById(_id: $id) {
                ...bitePageBite
            }
        }
    }

    fragment bitePageBite on Bite {
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
        transcription
        favorited
        playCount
        visibility
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

const SquareButton = styled.button`
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: transparent;
    width: 40px;
    height: 40px;
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;
    background-position: center;
    opacity: 1;
    border: none;
    cursor: pointer;

    &:focus {
        opacity: 1;
        outline: 0 !important;
        box-shadow: none !important;
    }

    &:active {
        opacity: 1;
    }

    &:hover {
        opacity: 0.7;
    }

    @media (max-width: 600px) {
    }
`;

const BlerpIcon = styled.img`
    width: 100%;
    height: 100%;
    align-self: center;
    white-space: nowrap;

    &:hover {
        opacity: 1;
    }
`;

class TwitterIframe extends React.Component {
    props;
    state = {
        playCount: null,
        showingEdit: false,
    };

    incrementItemPlayCount = playCount => () => {
        this.setState({
            playCount: this.state.playCount
                ? this.state.playCount + 1
                : playCount + 1,
        });
    };

    openBlerpCom = id => () => {
        window.open(`https://blerp.com/soundbites/${id}`, "_blank");
    };

    render() {
        return (
            <Query
                query={biteQuery}
                ssr={true}
                variables={{ id: this.props.id }}
            >
                {({ error, data, networkStatus }) => {
                    if (
                        networkStatus === 1 ||
                        networkStatus === 2 ||
                        !data.web ||
                        !data.web.biteById ||
                        error
                    ) {
                        return <div />;
                    }

                    return (
                        <Container>
                            {data.web && (
                                <Helmet>
                                    <title>{data.web.biteById.title}</title>
                                    <meta charSet='utf-8' />
                                    <link
                                        rel='canonical'
                                        href={`https://blerp.com/soundbites/${data.web.biteById._id}`}
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
                                    <script type='application/ld+json'>{`
                  {
                    "@context": "http://schema.org",
                    "@type": "AudioObject",
                    "url": "https://blerp.com/soundbites/${
                        data.web.biteById._id
                    }",
                    "name": "${data.web.biteById.title}",
                    "image": "${
                        data.web.biteById.image
                            ? data.web.biteById.image.original.url
                            : `https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg`
                    }",
                    "keywords": "${data.web.biteById.keywords
                        .concat(data.web.biteById.userKeywords)
                        .toString()}",
                    "contentUrl": "${data.web.biteById.audio.mp3.url}"
                  }
                    `}</script>
                                </Helmet>
                            )}
                            {!data.error && (
                                <Content>
                                    <ContentContainer>
                                        <SquareButton
                                            onClick={this.openBlerpCom(
                                                data.web.biteById._id,
                                            )}
                                        >
                                            <BlerpIcon src='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftIbisRed.svg' />
                                        </SquareButton>
                                        <StyledEmbedPlayer
                                            id={data.web.biteById._id}
                                            sources={[
                                                data.web.biteById.audio.mp3.url,
                                            ]}
                                            imageUrl={
                                                (data.web.biteById.image &&
                                                    data.web.biteById.image
                                                        .original.url) ||
                                                (data.web.biteById.giphy &&
                                                    data.web.biteById.giphy.gif)
                                            }
                                            title={data.web.biteById.title}
                                            backgroundColor={
                                                data.web.biteById.color
                                            }
                                            playCallback={this.incrementItemPlayCount(
                                                data.web.biteById.playCount,
                                            )}
                                        />
                                        {/* <NewSocialContainer
                      mainTitle={'Share With'}
                      id={data.web.biteById._id}
                      itemTitle={data.web.biteById.title}
                      downloadUrl={data.web.biteById.audio.mp3.url}
                      analyticTitle={'SHARE_BLERP'}
                      analyticUsingTitle={'WEB_BLERP_PAGE_SOCIAL_ITEM_MENU'}
                    />
                    <LinksContainer>
                      <DarkTitle>Permanent URL</DarkTitle>
                      <CopyButtonContainer>
                        <CopyUrlLink
                          key={data.web.biteById._id}
                          id={data.web.biteById._id}
                          url={`${currentHost}/soundbites/${data.web.biteById._id}`}
                          title={'Copy Bite Link'}
                          analyticTitle={'COPY_BLERP_WEB_URL'}
                          analyticUsing={'BLERP_PAGE'}
                        />
                      </CopyButtonContainer>
                    </LinksContainer> */}
                                    </ContentContainer>
                                    <BackgroundImage
                                        imageUrl={
                                            "https://storage.googleapis.com/blerp-public-images/backgrounds/gray-background.png"
                                        }
                                        color={data.web.biteById.color}
                                    />
                                </Content>
                            )}
                        </Container>
                    );
                }}
            </Query>
        );
    }
}

const Page = TwitterIframe;

Page.getInitialProps = ctx => ({ id: ctx.query.id });

export default withData(TwitterIframe);
