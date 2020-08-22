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
    state;
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

        const boardUpdateMutation = await this.props.updateBoardPlaylist({
            errorPolicy: "all",
            variables: queryVariables,
        });

        if (this.props.refetch) {
            this.props.refetch();
        }

        if (this.props.onSubmit) {
            console.log("submit");
            this.props.onSubmit();
        }
    };

    render() {
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
