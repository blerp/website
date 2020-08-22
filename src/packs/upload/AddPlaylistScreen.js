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

import BoardMaker from "./board-maker";
import VerticalListRow from "../../components/lists/VerticalListRow";
import CreateBoardInput from "./AddCreatePlaylist";
import NextTextInput from "../../components/inputs/NextTextInput";

import LoadingTinyScreen from "../../components/loading/loading-tiny-screen";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import PinkButton from "../../components/buttons/pink-button";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    iconsInActive,
    defaultBackground,
} from "../../styles/colors";

const DefaultProps = {
    onFinishSelection: () => {},
};

//TODO: maybe paginate
const USER_BOARD_QUERY = gql`
    query creationAddPlaylist($userId: MongoID!, $playlistPage: Int!) {
        web {
            userSignedIn {
                _id
                username
                roles
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
    max-width: 520px;
    overflow-y: scroll;
    width: 100%;
    background-color: ${props => props.theme.lighterBackground};
`;

const CenterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4px;
`;

const CenteredPadding = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 12px;
`;

const BoardSquare = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33%;
    height: 160px;
    border-radius: 12px;
    margin: 16px 0;
    color: ${props =>
        props.isSelected ? props.theme.flyoutBackground : props.theme.gray};
    background-color: ${props =>
        props.isSelected ? "rgba(254, 41, 92, 0.55)" : "transparent"};
    cursor: pointer;

    &:hover {
        background-color: ${props =>
            props.isSelected
                ? "rgba(254, 41, 92, 0.55)"
                : props.theme.actionBackground};
    }
`;

const BoardImage = styled.img`
    width: 100px;
    height: 100px;
    padding: 8px;
    border-radius: 12px;
`;

const CheckImage = styled.img`
    position: absolute;
    height: 40px;
    width: 40px;
`;

const BoardTitle = styled.div`
    margin: 20px 40px;
`;

const BoardTitleMax = styled.div`
    margin: 4px;
    max-width: 320px;
    text-align: center;
`;

const BoardTitleThin = styled.div`
    font-weight: lighter;
    font-size: 18px;
    color: ${props => props.theme.darkBackground};
    margin: 12px 4px;
`;

// interface Props {
//   userId?: string;
//   biteIds?: string[];
//   audienceRating?: string;
//   visibility?: string;
//   onFinishAddBite?: any;
// }

// interface State {}

const RowContainerSticky = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    position: sticky;
    top: 0px;
    z-index: 10;
    background-color: ${props => props.theme.defaultBackground};
`;

const InputRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    height: 60px;
    margin: 8px 16px;
`;

const LineImg = styled.img`
    margin: 4px auto;
    max-width: 600px;
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

const Borderline = styled.div`
    width: 100%;
    margin: 8px;
    height: 2px;
    border-bottom: 1px solid ${props => props.theme.defaultBackground};
`;

const StyleLinkButton = styled.button`
    border: none;
    outline: none;
    font-size: 14px;
    color: ${props => props.theme.gray};
    text-decoration: underline;
    background-color: transparent;
    padding: 8px;

    &:hover {
        color: ${props => props.pandaPink};
    }
`;

export class AddPlaylistScreen extends React.Component {
    static defaultProps = DefaultProps;
    state = {
        boardFilterTitle: "",
        boardFilterError: "",
    };

    addBiteToPlaylistClick = (
        updateBoardWithPlaylist,
        boardId,
        biteIds,
    ) => async () => {
        // const result = await updateBoardWithPlaylist({
        //   variables: {
        //     id: boardId,
        //     biteId: this.props.biteIds[0]
        //   }
        // });
        if (this.props.onFinishSelection) {
            this.props.onFinishSelection({ boardId });
        }
    };

    handleBoardFilter = event => {
        this.setState({ boardFilterTitle: event.target.value });
    };

    handleShowCreateScreen = () => {
        this.props.setCreateBoardStatus({ creatingNewBoard: true });
    };

    hideShowCreateScreen = () => {
        this.props.setCreateBoardStatus({ creatingNewBoard: false });
    };

    handleOnBoardCreate = ({ boardId }) => {
        this.setState({ newBoardCreated: true });
        this.props.onBoardCreated({ boardId });
    };

    renderBoards = boards => (index, key) => {
        const board = boards[boards.length - 1 - index];

        if (board) {
            return (
                <Mutation key={board._id} mutation={MUTATION_UPDATE_PLAYLIST}>
                    {addToExisting => {
                        return (
                            <BoardSquare
                                key={board._id}
                                onClick={this.addBiteToPlaylistClick(
                                    addToExisting,
                                    board._id,
                                    board.biteIds,
                                )}
                                isSelected={
                                    this.props.selectedPlaylistId === board._id
                                }
                            >
                                {this.props.selectedPlaylistId ===
                                    board._id && (
                                    <CheckImage src='https://storage.googleapis.com/blerp-public-images/interaction/teal_checkmark_stuff.svg' />
                                )}
                                <BoardImage
                                    src={
                                        (board.image &&
                                            board.image.original.url) ||
                                        (board.giphy && board.giphy.gif)
                                    }
                                />
                                <BoardTitleMax>{board.title}</BoardTitleMax>
                            </BoardSquare>
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

                    if (this.props.creatingNewBoard) {
                        return (
                            <BoardMaker
                                onResetClick={this.hideShowCreateScreen}
                                onResetClickOverride={this.hideShowCreateScreen}
                                onBoardCreated={this.handleOnBoardCreate}
                            />
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
                        <React.Fragment>
                            <ListContainer>
                                <RowContainerSticky>
                                    <BoardTitle>
                                        <b>Your boards</b>
                                    </BoardTitle>

                                    <InputRowContainer>
                                        <NextTextInput
                                            placeholder='Search Boards'
                                            onTextChange={
                                                this.handleBoardFilter
                                            }
                                            errorMessage={
                                                this.state.boardFilterError
                                            }
                                            value={this.state.boardFilterTitle}
                                        />
                                    </InputRowContainer>
                                </RowContainerSticky>

                                <VerticalListRow
                                    length={filterdBoards.length}
                                    renderListItems={this.renderBoards(
                                        filterdBoards,
                                    )}
                                />
                            </ListContainer>

                            {!this.props.selectedPlaylistId ? (
                                <React.Fragment>
                                    <LineImg
                                        src={
                                            "https://storage.googleapis.com/blerp-public-images/backgrounds/or-line.svg"
                                        }
                                        alt='Line spacer image'
                                    />
                                    <CenteredPadding>
                                        <CenterContainer>
                                            <BoardTitleThin>
                                                Create a new board
                                            </BoardTitleThin>
                                        </CenterContainer>

                                        <PinkButton
                                            onClick={
                                                this.handleShowCreateScreen
                                            }
                                        >
                                            {"New"}
                                        </PinkButton>
                                    </CenteredPadding>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Borderline />
                                    <CenteredPadding>
                                        <PinkButton
                                            onClick={() =>
                                                this.props.onBoardCreated({
                                                    boardId: this.props
                                                        .selectedPlaylistId,
                                                })
                                            }
                                        >
                                            {"Done"}
                                        </PinkButton>
                                    </CenteredPadding>
                                </React.Fragment>
                            )}

                            <CenterContainer>
                                <StyleLinkButton
                                    onClick={() =>
                                        this.props.onBoardCreated({
                                            boardId: null,
                                        })
                                    }
                                >
                                    Skip
                                </StyleLinkButton>
                            </CenterContainer>
                        </React.Fragment>
                    );
                }}
            </Query>
        );
    }
}

export default AddPlaylistScreen;
