/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import ItemsLinkGridView from "../shared/ItemGrid";

import UserFavorites from "./data-components/user-favorites";
import UserUploaded from "./data-components/user-uploaded";
import UserFollowed from "./data-components/user-followed";

import { randomBlerpColor } from "../../lib/helperFunctions";

import { logEvent } from "../../lib/analytics";

import {
    defaultBackground,
    statusColor,
    bodyText,
    pandaPink,
    iconsInActive,
    focusState,
    flyoutBackground,
} from "../../styles/colors";

const ProfileContentContainer = styled.div`
    width: 100%;
    background-color: ${flyoutBackground};
    padding: 24px 0;
`;

const ControllerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    background-color: ${flyoutBackground};
`;

const GridContainer = styled.div`
    background-color: ${flyoutBackground};
`;

const ControllerButton = styled.button`
    color: ${props => {
        return props.isSet ? pandaPink : bodyText;
    }};
    cursor: pointer;
    border: none;
    font-weight: lighter;
    font-size: 28px;
    padding: 12px 24px;
    border-radius: 100px;
    margin: 12px;
    cursor: pointer;
    background-color: transparent;
    text-decoration: ${props => {
        return props.isSet ? "underline" : "none";
    }};
    outline: none;

    &:hover {
        color: rgba(200, 200, 200, 1);
    }

    @media (max-width: 600px) {
        margin: 4px;
        font-size: 18px;
    }
`;

const handleListLoadMorePlaylists = dataProp => () => {
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
                !previousResult.web.userById.playlistPagination.pageInfo
                    .hasNextPage
            ) {
                return previousResult;
            }

            return {
                web: {
                    ...previousResult.web,
                    userById: {
                        ...previousResult.web.userById,
                        playlistPagination: {
                            pageInfo: {
                                ...fetchMoreResult.web.userById
                                    .playlistPagination.pageInfo,
                            },
                            items: previousResult.web.userById.playlistPagination.items.concat(
                                fetchMoreResult.web.userById.playlistPagination
                                    .items,
                            ),
                        },
                    },
                },
            };
        },
        variables: {
            playlistPage:
                dataProp.web.userById.playlistPagination.pageInfo.currentPage +
                1,
        },
    });
};

// interface Props {
//   data:
//     | any
//     | {
//         bites: any;
//         boards: any;
//         favBites: any;
//       };
//   startMode?: string;
//   panel?: string;
// }

// interface State {
//   color: any;
//   displayMode: string;
// }

const MODES = {
    playlists: "playlists",
    followed: "followed",
    favorites: "favorites",
    uploads: "uploads",
};

export default class ProfileContentController extends React.Component {
    backgroundColor = "#fff";
    props;
    state;

    constructor(props) {
        super(props);

        this.state = {
            color: randomBlerpColor(),
            displayMode: this.getDefaultMode(props.panel),
        };
    }

    getDefaultMode(panel) {
        switch (panel) {
            case "favorites":
                return "favorites";
            case "playlists":
                return "playlists";
            case "uploads":
                return "uploads";
            case "followed":
                return "followed";
            default:
                return "uploads";
        }
    }

    setDefaultMode(panel) {
        switch (panel) {
            case "favorites":
                this.changeToFavBites();
                break;
            case "playlists":
                this.changeToPlaylists();
                break;
            case "uploads":
                this.changeToUploads();
            case "followed":
                this.changeToFollowed();
            default:
                this.changeToUploads();
                break;
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.panel !== this.props.panel) {
            this.setDefaultMode(newProps.panel);
        }
    }

    changeToUploads = () => {
        this.setState({ displayMode: "uploads" });
        logEvent(
            "Profile",
            "Display Uploads",
            this.props.data.web.userById.username,
        );
    };

    changeToFollowed = () => {
        this.setState({ displayMode: "followed" });
        logEvent(
            "Profile",
            "Display Followed",
            this.props.data.web.userById.username,
        );
    };

    changeToPlaylists = () => {
        this.setState({ displayMode: "playlists" });
        logEvent(
            "Profile",
            "Display Boards",
            this.props.data.web.userById.username,
        );
    };

    changeToFavBites = () => {
        this.setState({ displayMode: "favorites" });
        logEvent(
            "Profile",
            "Display Favorite Bites",
            this.props.data.web.userById.username,
        );
    };

    render() {
        return (
            <ProfileContentContainer>
                <ControllerContainer>
                    <ControllerButton
                        isSet={this.state.displayMode === MODES.uploads}
                        onClick={this.changeToUploads}
                    >
                        {"Uploaded"}
                    </ControllerButton>
                    <ControllerButton
                        isSet={this.state.displayMode === MODES.playlists}
                        onClick={this.changeToPlaylists}
                    >
                        {"My Boards"}
                    </ControllerButton>
                    <ControllerButton
                        isSet={this.state.displayMode === MODES.favorites}
                        onClick={this.changeToFavBites}
                    >
                        {"Favorites"}
                    </ControllerButton>
                    <ControllerButton
                        isSet={this.state.displayMode === MODES.followed}
                        onClick={this.changeToFollowed}
                    >
                        {"Followed"}
                    </ControllerButton>
                </ControllerContainer>

                <GridContainer>
                    {this.state.displayMode === MODES.uploads &&
                        this.props.data.web.userById && (
                            <UserUploaded
                                username={this.props.data.web.userById._id}
                                displayMode={this.state.displayMode}
                            />
                        )}
                    {this.state.displayMode === MODES.playlists &&
                        this.props.data.web.userById.playlistPagination &&
                        (this.props.data.web.userById.playlistPagination.items
                            .length ? (
                            <ItemsLinkGridView
                                items={
                                    this.props.data.web.userById
                                        .playlistPagination.items
                                }
                                handleListLoadMore={handleListLoadMorePlaylists(
                                    this.props.data,
                                )}
                                itemType={"soundboard"}
                            />
                        ) : (
                            <div />
                        ))}

                    {this.state.displayMode === MODES.favorites &&
                        this.props.data.web.userById && (
                            <UserFavorites
                                username={this.props.data.web.userById._id}
                                displayMode={this.state.displayMode}
                            />
                        )}

                    {this.state.displayMode === MODES.followed &&
                        this.props.data.web.userById && (
                            <UserFollowed
                                username={this.props.data.web.userById._id}
                                displayMode={this.state.displayMode}
                            />
                        )}
                </GridContainer>
            </ProfileContentContainer>
        );
    }
}
