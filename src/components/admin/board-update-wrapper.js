/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/client/react/hoc";
import { flowRight as compose } from "lodash";
import styled, { keyframes } from "styled-components";
import BoardInfoInput from "./board-info-input";

const BoxContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 12px;
`;

const ErrorText = styled.div``;

const BOARD_UPDATE_MUTATION = gql`
    mutation websiteOwnerBoardUpdate($board: UpdateByIdPlaylistInput!) {
        web {
            playlistUpdateById(record: $board) {
                record {
                    _id
                    title
                    ownerId
                    audienceRating
                    description
                    visibility
                    userKeywords
                    favorites
                    ownerObject {
                        _id
                        username
                        picture
                    }
                    image {
                        original {
                            url
                        }
                    }
                    collabIds
                    giphy {
                        gif
                    }
                    followed
                    biteObjects {
                        _id
                        title
                        keywords
                        userKeywords
                        color
                        image {
                            original {
                                url
                            }
                        }
                        favorited
                        playCount
                        audienceRating
                        giphy {
                            gif
                        }
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
    }
`;

const AdminLabel = styled.label`
    font-weight: bold;
    padding: 8px 0;
`;

class BoardUpdateWrapper extends React.Component {
    state = {
        loadingMutation: false,
        updatedFinished: false,
    };
    props;

    handleSubmitInfo = async ({
        title,
        audienceRating,
        visibility,
        tags,
        description,
    }) => {
        const queryVariables = {
            board: {
                _id: this.props.boardId,
                title,
                description: description ? description : "",
                audienceRating,
                visibility,
                userKeywords: tags,
            },
        };

        if (!this.props.isModerator) {
            delete queryVariables.board.audienceRating;
            delete queryVariables.board.transcription;
        }

        this.setState({ loadingMutation: true });

        const boardUpdateMutation = await this.props.updateBoardPlaylist({
            errorPolicy: "all",
            variables: queryVariables,
        });

        this.setState({ loadingMutation: false, updatedFinished: true });

        if (this.props.onSubmit) {
            this.props.onSubmit();
        }
    };

    render() {
        if (this.state.loadingMutation) {
            return (
                <BoxContainer>
                    <ErrorText>Updating Soundboard</ErrorText>
                </BoxContainer>
            );
        }

        return (
            <BoxContainer>
                <AdminLabel>{"Board Owner Update Box"}</AdminLabel>
                <BoardInfoInput
                    key={this.props.boardId}
                    handleSubmitInfo={this.handleSubmitInfo}
                    id={this.props.boardId}
                    title={this.props.boardTitle}
                    visibility={this.props.visibility}
                    audienceRating={this.props.audienceRating}
                    defaultTags={this.props.tags}
                    description={this.props.description}
                    isModerator={this.props.isModerator}
                    finishedUpdating={this.state.updatedFinished}
                />
                {this.props.globalErrorMessage !== "" && (
                    <ErrorText>{this.props.globalErrorMessage}</ErrorText>
                )}
            </BoxContainer>
        );
    }
}

export default compose(
    graphql(BOARD_UPDATE_MUTATION, {
        name: "updateBoardPlaylist",
    }),
)(BoardUpdateWrapper);
