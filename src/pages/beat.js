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
import { Helmet } from "react-helmet";
import styled from "styled-components";

import BoxColorPicture from "../components/shared/BoxColorPicture";
import CopyUrlLink from "../components/shared/CopyUrlLink";
import ErrorMessage from "../components/messages/error-message";
import LoadingFullScreen from "../components/loading/loading-full-screen";
import { convertTagsToString } from "../lib/helperFunctions";
import withData from "../lib/withData";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

import BoardParentController from "../components/board/board-parent-controller";

import { defaultBackground, primaryText, bodyText } from "../styles/colors";

import projectConfig from "../config";
const currentHost = projectConfig.host;

// import AudioPlayerFooter from "../components/audio-player-footer";

const Container = styled.div`
    position: relative;
`;

// Needed when used with the audio player footer
const FooterContainer = styled.div`
    width: 100%;
`;

const LoadingContainer = styled.div`
    width: 100%;
`;

const Body = styled.div`
    display: flex;
    flex-flow: column;
    height: 100%;
    text-align: center;
    justify-content: center;
    align-items: center;

    @media (max-width: 800px) {
        width: 100%;
        margin: 0;
    }
`;

const SoundboardInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin: 0;
    align-items: center;
    justify-content: space-evenly;
    padding: 80px 0 40px;
    background-color: rgba(0, 0, 0, 0.2);

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const MetaDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
`;

const StyledBoxColorPicture = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
`;

const ProfileStats = styled.div`
    color: ${bodyText};
    font-weight: bold;
    font-size: 24px;
    padding: 4px;
    margin: auto;
`;

const ProfileName = styled.div`
    color: ${bodyText};
    font-weight: bold;
    font-size: 48px;
    padding: 12px;
    margin: auto;
`;

const MiscText = styled.div`
    color: ${bodyText};
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    margin: 16px 0 0;
`;

const HelpText = styled.div`
    color: ${bodyText};
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    margin: 32px 0 0;
`;

const AllTheBitesContainer = styled.div`
    margin-top: 140px;

    @media (max-width: 870px) {
        margin: 140px 0 40px;
    }
`;

const Content = styled.div`
    background-color: #50555c;
    display: grid;
    grid: minmax(auto, max-content) / repeat(auto-fill, 200px);
    grid-gap: 8px;
    justify-content: center;
    padding: 0 60px;

    @media (max-width: 600px) {
        grid: minmax(auto, max-content) / repeat(auto-fill, 200px);
        grid-gap: 4px;
        padding: 0;
    }
`;

const UserLink = styled.a`
    text-decoration: none;
    opacity: 1;

    &:hover {
        opacity: 0.7;
    }
`;

// interface WithInitialProps {
//   getInitialProps?: (ctx: any) => object | Promise<object>;
// }

const itemsRenderer = (items, ref) => (
    <div ref={ref}>
        <Content>{items}</Content>
    </div>
);

class Page extends React.Component {
    static getInitialProps = ctx => ({ id: ctx.query.id });
    props;

    render() {
        return (
            <Container role='application'>
                {this.props.data &&
                    this.props.data.web &&
                    this.props.data.web.boardById && (
                        <Helmet>
                            <title>{this.props.data.web.boardById.title}</title>
                            <meta charSet='utf-8' />
                            <link
                                rel='canonical'
                                href={`https://blerp.com/beat/${this.props.data.web.boardById._id}`}
                            />
                            <meta
                                property='og:title'
                                content={this.props.data.web.boardById.title}
                            />
                            <meta property='og:type' content='music.song' />
                            <meta
                                property='og:description'
                                content={`"${this.props.data.web.boardById.title}" is an audio clip soundboard for all sounds made on blerp. Create the best sounds and make the best soundboards on blerp. Try blerp on iMessage, iOS, Android, Google Assistant, and Discord.`}
                            />
                            <meta
                                property='og:url'
                                content={`https://blerp.com/beat/${this.props.data.web.boardById._id}`}
                            />
                            <meta
                                property='og:image'
                                content={
                                    this.props.data.web.boardById.image
                                        ? this.props.data.web.boardById.image
                                              .original.url
                                        : this.props.data.web.boardById.color
                                        ? `https://blerp.com/background?w=600&h=600&color=${this.props.data.web.boardById.color.slice(
                                              1,
                                          )}`
                                        : null
                                }
                            />
                            <meta property='og:image:width' content='600' />
                            <meta property='og:image:height' content='600' />
                            <meta property='og:site_name' content='Blerp' />
                            <meta
                                property='fb:app_id'
                                content='448243362173908'
                            />
                            <script
                                type='application/ld+json'
                                dangerouslySetInnerHTML={{
                                    __html: `{
                  "@context": "http://schema.org",
                  "@type": "AudioObject",
                  "url": "https://blerp.com/beat/${
                      this.props.data.web.boardById._id
                  }",
                  "name": "${this.props.data.web.boardById.title}",
                  "image": "${
                      this.props.data.web.boardById.image
                          ? this.props.data.web.boardById.image.original.url
                          : `https://blerp.com/background?w=600&h=600&color=${this
                                .props.data.web.boardById.color &&
                                this.props.data.web.boardById.color.slice(1)}`
                  }",
                  "keywords": "${this.props.data.web.boardById.keywords.toString()}",
                }`,
                                }}
                            />
                            <meta name='twitter:card' content='player' />
                            <meta name='twitter:site' content='@blerpapp' />
                            <meta
                                name='twitter:description'
                                content={convertTagsToString(
                                    this.props.data.web.boardById.keywords,
                                )}
                            />
                            <meta
                                name='twitter:title'
                                content={this.props.data.web.boardById.title}
                            />
                            <meta
                                name='twitter:image'
                                content={
                                    this.props.data.web.boardById.image &&
                                    this.props.data.web.boardById.image.original
                                        .url
                                        ? this.props.data.web.boardById.image
                                              .original.url
                                        : "https://storage.googleapis.com/blerp-main-bucket/images/default2-a89e-4a33-8a26-4fff77cd9607.png"
                                }
                            />
                            <meta name='twitter:image:width' content='262' />
                            <meta name='twitter:image:height' content='262' />
                        </Helmet>
                    )}
                <NavBar />
                <Body role='main'>
                    {(this.props.data.networkStatus === 1 ||
                        this.props.data.networkStatus === 2) && (
                        <LoadingContainer>
                            <LoadingFullScreen />
                        </LoadingContainer>
                    )}
                    {this.props.data.errors && <ErrorMessage />}
                    {!(
                        this.props.data.networkStatus === 1 ||
                        this.props.data.networkStatus === 2
                    ) &&
                        this.props.data.web.boardById &&
                        !this.props.data.error && (
                            <SoundboardInfoContainer>
                                <StyledBoxColorPicture>
                                    <BoxColorPicture
                                        imageUrl={
                                            this.props.data.web.boardById
                                                .image &&
                                            this.props.data.web.boardById.image
                                                .original &&
                                            this.props.data.web.boardById.image
                                                .original.url
                                        }
                                        color={
                                            this.props.data.web.boardById.color
                                        }
                                    />
                                </StyledBoxColorPicture>
                                <MetaDataContainer>
                                    <ProfileName>
                                        {this.props.data.web.boardById.title}
                                    </ProfileName>
                                    <UserLink
                                        href={`${`/user/${this.props.data.web.boardById.ownerId}`}`}
                                    >
                                        <ProfileStats>{`Created By: ${this.props.data.web.boardById.ownerObject.username}`}</ProfileStats>
                                    </UserLink>
                                    <MiscText>{"Share Your Beats!"}</MiscText>
                                    <CopyUrlLink
                                        url={`${currentHost}/beat/${this.props.data.web.boardById._id}`}
                                    />
                                </MetaDataContainer>
                            </SoundboardInfoContainer>
                        )}
                    {!(
                        this.props.data.networkStatus === 1 ||
                        this.props.data.networkStatus === 2
                    ) &&
                        !this.props.data.error &&
                        this.props.data.web.boardById &&
                        this.props.data.web.boardById.biteObjects && [
                            <HelpText key='11'>
                                {
                                    "Blerps with circle letters can be played by tapping the hotkeys on your keyboard!"
                                }
                            </HelpText>,
                            <BoardParentController
                                key='22'
                                board={this.props.data.web.boardById}
                                editable={
                                    this.props.data.web.boardById.ownerObject
                                        ._id ===
                                    (this.props.data.web.userSignedIn &&
                                        this.props.data.web.userSignedIn._id)
                                }
                            />,
                        ]}
                    {/* <AudioPlayerFooter /> */}
                    <FooterContainer>
                        <Footer />
                    </FooterContainer>
                </Body>
            </Container>
        );
    }
}

const fetchBoardForTheWebsite = gql`
    query getBoardForWebsite($id: MongoID!) {
        web {
            boardById(_id: $id) {
                ...boardBite
            }
            userSignedIn {
                _id
                roles
            }
        }
    }

    fragment boardBite on Board {
        _id
        title
        keywords
        keycodes
        ownerId
        biteObjects {
            _id
            ownerId
            audio {
                original {
                    url
                }
                mp3 {
                    url
                }
            }
            image {
                original {
                    url
                }
            }
            favorited
            source
            title
            color
            visibility
            audienceRating
            playCount
            updatedAt
            createdAt
        }
        color
        ownerObject {
            _id
            username
        }
        image {
            original {
                url
            }
        }
    }
`;

const fetchBoardWrap = graphql(fetchBoardForTheWebsite, {
    options: props => ({
        ssr: true,
        variables: {
            id: props.id,
        },
    }),
});

export default compose(withData, fetchBoardWrap)(Page);
