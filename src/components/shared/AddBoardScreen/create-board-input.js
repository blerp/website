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
import TextInput from "../../inputs/text-input";
import AddIcon from "../../icons/add-white-circle";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    iconsInActive,
    defaultBackground,
    darkBackground,
    darkestBackground,
} from "../../../styles/colors";

const DefaultProps = {};

const InputRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 60px;
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

        if (window.gtag) {
            window.gtag("event", "soundboard_create", {
                event_category: "create",
                event_label: `${this.state.boardTitle}`,
                value: 1,
            });
        }

        if (this.props.onCreatePlaylist) {
            this.props.onCreatePlaylist();
        }
    };

    onBoardTitleChange = event => {
        this.setState({ boardTitle: event.target.value });
    };

    render() {
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
                                <CreatePlaylistButton
                                    onClick={this.createPlaylistClick(
                                        websiteCreateNewPlaylist,
                                    )}
                                >
                                    <AddIcon />
                                </CreatePlaylistButton>
                            )}
                        </InputRowContainer>
                    );
                }}
            </Mutation>
        );
    }
}

export default AddBoardScreen;
