/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Query, Mutation } from "@apollo/client/react/components";

import VerticalList from "../../lists/VerticalList";
import CreateBoardInput from "./create-board-input";
import TextInput from "../../inputs/text-input";

import LoadingTinyScreen from "../../loading/loading-tiny-screen";
import SecondaryButton from "../../buttons/SecondaryButton";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    iconsInActive,
    defaultBackground,
} from "../../../styles/colors";

const DefaultProps = {};

//TODO: maybe paginate
const USER_BOARD_QUERY = gql`
    query websiteAddToUserBoardModal($userId: MongoID!, $playlistPage: Int!) {
        web {
            userSignedIn {
                _id
                usernameroles
            }
            userById(_id: $userId) {
                playlistPagination(page: $playlistPage, perPage: 200) {
                    pageInfo {
                        perPage
                        currentPage
                        hasNextPage
                    }
                    items {
                        _id
                        title
                        description
                        biteIds
                        image {
                            original {
                                url
                            }
                        }
                        giphy {
                            gif
                        }
                    }
                }
            }
        }
    }
`;

const ListContainer = styled.div`
    height: 300px;
    overflow-y: scroll;
    width: 100%;
`;

const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 8px;
    text-align: center;
`;

const BoardRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 60px;
    background-color: transparent;

    &:hover {
        background-color: ${actionBackground};
    }
`;

const BoardImage = styled.img`
    border-radius: 6px;
    width: 48px;
    height: 48px;
`;

const BoardTitle = styled.div`
    margin: 4px;
    width: 70%;
`;

// interface Props {
//   userId?: string;
//   biteIds?: string[];
//   audienceRating?: string;
//   visibility?: string;
//   onFinishAddBite?: any;
// }

// interface State {}

const InputRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 60px;
    background-color: ${defaultBackground};
`;

const MUTATION_UPDATE_PLAYLIST = gql`
    mutation websiteAddNewBiteToPlaylist($id: MongoID!, $biteId: MongoID!) {
        web {
            playlistAddBiteById(_id: $id, biteId: $biteId) {
                title
            }
        }
    }
`;

export class AddBoardScreen extends React.Component {
    static defaultProps = DefaultProps;
    state = {
        boardFilterTitle: "",
        boardFilterError: "",
        createNewBoard: this.props.createNewBoard,
    };
    addBiteToPlaylistClick = (
        updateBoardWithPlaylist,
        boardId,
        biteIds,
    ) => async () => {
        const result = await updateBoardWithPlaylist({
            variables: {
                id: boardId,
                biteId: this.props.biteIds[0],
            },
        });
        if (this.props.onFinishAddBite) {
            this.props.onFinishAddBite();
        }
    };

    handleBoardFilter = event => {
        this.setState({ boardFilterTitle: event.target.value });
    };

    handleShowCreateScreen = () => {
        this.setState({ createNewBoard: true });
    };

    renderBoards = boards => (index, key) => {
        const board = boards[index];
        if (board) {
            return (
                <Mutation mutation={MUTATION_UPDATE_PLAYLIST}>
                    {addToExisting => {
                        return (
                            <BoardRowContainer
                                key={board._id}
                                onClick={this.addBiteToPlaylistClick(
                                    addToExisting,
                                    board._id,
                                    board.biteIds,
                                )}
                            >
                                <BoardImage
                                    src={
                                        (board.image &&
                                            board.image.original.url) ||
                                        (board.giphy && board.giphy.gif)
                                    }
                                />
                                <BoardTitle>{board.title}</BoardTitle>
                            </BoardRowContainer>
                        );
                    }}
                </Mutation>
            );
        }
    };

    render() {
        return (
            <Query
                query={USER_BOARD_QUERY}
                ssr={false}
                variables={{
                    userId: this.props.userId,
                    playlistPage: 0,
                }}
            >
                {({ loading, error, data }) => {
                    if (loading || !data) {
                        return (
                            <ListContainer>
                                <LoadingTinyScreen />
                            </ListContainer>
                        );
                    }

                    if (this.state.createNewBoard) {
                        return (
                            <ListContainer>
                                <CenterContainer>
                                    <BoardTitle>
                                        <b>Add to New Soundboard</b>
                                    </BoardTitle>
                                </CenterContainer>
                                <CreateBoardInput
                                    placeholder={"New Board Name"}
                                    biteIds={this.props.biteIds}
                                    description={""}
                                    visibility={"PUBLIC"}
                                    onCreatePlaylist={
                                        this.props.onFinishAddBite
                                    }
                                />
                            </ListContainer>
                        );
                    }

                    const filterBoardRegex = new RegExp(
                        this.state.boardFilterTitle,
                        "i",
                    );
                    const unFilteredBoards =
                        data.web &&
                        data.web.userById &&
                        data.web.userById.playlistPagination &&
                        data.web.userById.playlistPagination.items;

                    const filterdBoards = this.state.boardFilterTitle
                        ? unFilteredBoards.filter(board => {
                              const searchMatch = filterBoardRegex.test(
                                  `${board.title} ${
                                      board.description ? board.description : ""
                                  }`,
                              );
                              return searchMatch;
                          })
                        : unFilteredBoards;

                    return (
                        <ListContainer>
                            <CenterContainer>
                                <SecondaryButton
                                    onClick={this.handleShowCreateScreen}
                                >
                                    {"Create New Board"}
                                </SecondaryButton>
                            </CenterContainer>
                            <CenterContainer>
                                <BoardTitle>
                                    <b>Add to Existing Board</b>
                                </BoardTitle>
                            </CenterContainer>
                            <InputRowContainer>
                                <TextInput
                                    placeholder='Search Your Soundboards'
                                    onTextChange={this.handleBoardFilter}
                                    errorMessage={this.state.boardFilterError}
                                    value={this.state.boardFilterTitle}
                                />
                            </InputRowContainer>
                            <VerticalList
                                length={filterdBoards.length}
                                renderListItems={this.renderBoards(
                                    filterdBoards,
                                )}
                            />
                        </ListContainer>
                    );
                }}
            </Query>
        );
    }
}

export default AddBoardScreen;
