/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import TextInput from "../../components/inputs/text-input";
import AddIcon from "../../components/icons/add-white-circle";
import PinkButton from "../../components/buttons/pink-button";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    iconsInActive,
    defaultBackground,
    darkBackground,
    darkestBackground,
} from "../../styles/colors";

const DefaultProps = {};

const InputRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80px;
    background-color: ${defaultBackground};

    &:hover {
        background-color: ${defaultBackground};
    }
`;

const CreatePlaylistButton = styled.button`
    width: 60px;
    height: 60px;
    background-color: ${darkBackground};

    &:hover {
        background-color: ${darkestBackground};
    }
`;

// interface Props {
//   audienceRating?: any;
//   visibility?: any;
//   biteIds: any;
//   userId?: string;
//   description?: string;
//   onCreatePlaylist?: any;
// }

// interface State {
//   boardTitle: string;
//   boardError: string;
// }

const MUTATION_CREATE_PLAYLIST = gql`
    mutation websiteCreateNewPlaylist($record: CreateOnePlaylistInput!) {
        web {
            playlistCreate(record: $record, analytics: {}) {
                record {
                    _id
                    title
                }
            }
        }
    }
`;

export class AddBoardScreen extends React.Component {
    static defaultProps = DefaultProps;
    state = {
        boardTitle: "",
        boardError: "",
        boardCreated: false,
    };

    createPlaylistClick = mutationCall => async () => {
        const result = await mutationCall({
            variables: {
                record: {
                    title: this.state.boardTitle,
                    biteIds: this.props.biteIds,
                    audienceRating: "UR",
                    visibility: "PUBLIC" || this.props.visibility,
                },
            },
        });

        this.setState({ boardCreated: true });

        if (
            this.props.onBoardCreated &&
            result.data &&
            result.data.web.playlistCreate
        ) {
            this.props.onBoardCreated({
                boardId: result.data.web.playlistCreate.record._id,
            });
        }
    };

    onBoardTitleChange = event => {
        this.setState({ boardTitle: event.target.value });
    };

    render() {
        if (this.state.boardCreated) {
            return <InputRowContainer>Board Created!</InputRowContainer>;
        }

        return (
            <Mutation mutation={MUTATION_CREATE_PLAYLIST}>
                {websiteCreateNewPlaylist => {
                    return (
                        <InputRowContainer>
                            <TextInput
                                placeholder={this.props.placeholder}
                                onTextChange={this.onBoardTitleChange}
                                errorMessage={this.state.boardError}
                                value={this.state.boardTitle}
                            />
                            {this.state.boardTitle && (
                                <PinkButton
                                    onClick={this.createPlaylistClick(
                                        websiteCreateNewPlaylist,
                                    )}
                                >
                                    Create Board
                                </PinkButton>
                            )}
                        </InputRowContainer>
                    );
                }}
            </Mutation>
        );
    }
}

export default AddBoardScreen;
