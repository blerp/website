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
import { Helmet } from "react-helmet";
import styled from "styled-components";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import TabBar from "../components/navigation/tabbar";

import PlaylistsHorizontalWrapped from "../components/playlists/PlaylistsHorizontalWrapped";
import PlaylistsHorizontal from "../components/playlists/scrollable";

import withData from "../lib/withData";
import BoardSelectionModal from "../components/shared/BoardSelectionModal/index";

import projectConfig from "../config";
const currentHost = projectConfig.host;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const InnerContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const FooterContainer = styled.div`
    margin-top: 160px;
`;

const ListMakerContainer = styled.div`
    text-align: center;
    padding: 40px;
    border-radius: 8px;
    background-color: #fff;
`;

const PlaylistsContainer = styled.div`
    width: 400px;
    height: 200px;
    margin: 32px;
`;

// interface WithInitialProps {
//   getInitialProps?: (ctx) => object | Promise<object>;
// }

const LIST_QUERY = gql`
    query websiteUserFeaturedPage($platform: PlatformEnum) {
        web {
            userSignedIn {
                _id
                roles
            }
            getFeaturedListForPlatform(platform: $platform) {
                _id
                title
                playlistObjects {
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
`;

const CREATE_FEATURED_LIST = gql`
    mutation webMakeFeaturedList(
        $platform: PlatformEnum
        $playlistIds: [MongoID]
    ) {
        admin {
            createFeaturedList(
                record: { platform: $platform, playlistIds: $playlistIds }
            ) {
                _id
                title
                playlistIds
                playlistObjects {
                    _id
                    title
                }
                playlistPagination(page: 0, perPage: 20) {
                    items {
                        _id
                        title
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

const PlatformOptions = [
    { text: "WEB", value: "WEB" },
    { text: "TWITCH", value: "TWITCH" },
    { text: "MOBILE", value: "MOBILE" },
    { text: "IMESSAGE", value: "IMESSAGE" },
    { text: "MESSENGER", value: "MESSENGER" },
    { text: "BLOG", value: "BLOG" },
    { text: "GOOGLE_ASSISTANT", value: "GOOGLE_ASSISTANT" },
    { text: "DISCORD", value: "DISCORD" },
];

class Page extends React.Component {
    static getInitialProps = ctx => ({ id: ctx.query.id });
    props;
    state = {
        playlistIds: [],
        platform: "WEB",
        listMade: false,
    };

    showEditMode = () => {
        this.setState({ showingEdit: true });
    };

    hideEditMode = () => {
        this.setState({ showingEdit: false });
    };

    isStrictlyAdmin(userData) {
        return (
            userData &&
            userData.web &&
            userData.web.userSignedIn &&
            userData.web.userSignedIn.roles &&
            userData.web.userSignedIn.roles.indexOf("ADMIN") > -1
        );
    }

    handleSelectBoards = (mutationCall, refetch) => async ({ boardIds }) => {
        await mutationCall({
            variables: {
                platform: this.state.platform,
                playlistIds: boardIds,
            },
        });

        this.setState({ listMade: true }, () => {
            refetch();
        });
    };

    handleClearList = (mutationCall, refetch) => async () => {
        await mutationCall({
            variables: {
                platform: this.state.platform,
                playlistIds: [],
            },
        });
        refetch();
    };

    onDeleteBoardClick = (mutationCall, refetch, currentBoardIds) => async ({
        boardId,
    }) => {
        const newBoardIds = currentBoardIds.filter(currentBoardId => {
            return boardId !== currentBoardId;
        });

        await mutationCall({
            variables: {
                platform: this.state.platform,
                playlistIds: newBoardIds,
            },
        });
        refetch();
    };

    setPlatform = async event => {
        this.setState({ platform: event.target.value });
    };

    render() {
        return (
            <Container>
                <Helmet>
                    <title>{"Featured List Creation"}</title>
                </Helmet>
                <NavBar />
                <Container>
                    <InnerContainer>
                        <Query
                            query={LIST_QUERY}
                            ssr={false}
                            variables={{ platform: this.state.platform }}
                        >
                            {userQuery => {
                                if (!userQuery.data || userQuery.loading) {
                                    return <div>{"loading"}</div>;
                                }

                                if (this.isStrictlyAdmin(userQuery.data)) {
                                    return (
                                        <ListMakerContainer>
                                            <h1>Featured List</h1>
                                            <h2>Platform</h2>
                                            <select
                                                value={this.state.platform}
                                                onChange={this.setPlatform}
                                            >
                                                {PlatformOptions.map(audi => {
                                                    return (
                                                        <option
                                                            key={audi.value}
                                                            value={audi.value}
                                                        >
                                                            {audi.text}
                                                        </option>
                                                    );
                                                })}
                                            </select>

                                            <h2>Selected Boards</h2>

                                            {this.state.playlistIds.length !==
                                                0 && (
                                                <PlaylistsContainer>
                                                    <PlaylistsHorizontalWrapped
                                                        key={
                                                            this.state
                                                                .playlistIds
                                                                .length
                                                        }
                                                        playlistIds={
                                                            this.state
                                                                .playlistIds
                                                        }
                                                    />
                                                </PlaylistsContainer>
                                            )}

                                            <Mutation
                                                mutation={CREATE_FEATURED_LIST}
                                            >
                                                {createList => {
                                                    return (
                                                        <React.Fragment>
                                                            <BoardSelectionModal
                                                                handleSelectBoards={this.handleSelectBoards(
                                                                    createList,
                                                                    userQuery.refetch,
                                                                )}
                                                                defaultSelectedBoardIds={
                                                                    userQuery
                                                                        .data
                                                                        .web &&
                                                                    userQuery
                                                                        .data
                                                                        .web
                                                                        .getFeaturedListForPlatform &&
                                                                    userQuery
                                                                        .data
                                                                        .web
                                                                        .getFeaturedListForPlatform
                                                                        .playlistObjects &&
                                                                    userQuery.data.web.getFeaturedListForPlatform.playlistObjects.map(
                                                                        board =>
                                                                            board._id,
                                                                    )
                                                                }
                                                            />
                                                            {userQuery.data
                                                                .web &&
                                                                userQuery.data
                                                                    .web
                                                                    .getFeaturedListForPlatform &&
                                                                userQuery.data
                                                                    .web
                                                                    .getFeaturedListForPlatform
                                                                    .playlistObjects && (
                                                                    <PlaylistsContainer>
                                                                        <PlaylistsHorizontal
                                                                            playlists={
                                                                                userQuery
                                                                                    .data
                                                                                    .web &&
                                                                                userQuery
                                                                                    .data
                                                                                    .web
                                                                                    .getFeaturedListForPlatform &&
                                                                                userQuery
                                                                                    .data
                                                                                    .web
                                                                                    .getFeaturedListForPlatform
                                                                                    .playlistObjects
                                                                            }
                                                                            showDeleteButtons={
                                                                                true
                                                                            }
                                                                            onDeleteClick={this.onDeleteBoardClick(
                                                                                createList,
                                                                                userQuery.refetch,
                                                                                userQuery
                                                                                    .data
                                                                                    .web &&
                                                                                    userQuery
                                                                                        .data
                                                                                        .web
                                                                                        .getFeaturedListForPlatform &&
                                                                                    userQuery
                                                                                        .data
                                                                                        .web
                                                                                        .getFeaturedListForPlatform
                                                                                        .playlistObjects &&
                                                                                    userQuery.data.web.getFeaturedListForPlatform.playlistObjects.map(
                                                                                        board =>
                                                                                            board._id,
                                                                                    ),
                                                                            )}
                                                                        />
                                                                    </PlaylistsContainer>
                                                                )}
                                                            {/* <SecondaryButton onClick={this.handleClearList(createList, userQuery.refetch)}>
                                Clear List                         
                              </SecondaryButton> */}
                                                        </React.Fragment>
                                                    );
                                                }}
                                            </Mutation>
                                        </ListMakerContainer>
                                    );
                                } else {
                                    return (
                                        <div>{"Totally Not Authorized!!"}</div>
                                    );
                                }
                            }}
                        </Query>
                    </InnerContainer>
                </Container>
                <TabBar />
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

export default withData(Page);
