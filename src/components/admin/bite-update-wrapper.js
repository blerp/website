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
import BiteInfoInput from "./bite-info-input";

const BoxContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`;

const ErrorText = styled.div``;

const adminUpdateBiteMutation = gql`
    mutation websiteOwnerBiteUpdate($bite: UpdateByIdBiteInput!) {
        web {
            biteUpdateById(record: $bite) {
                record {
                    _id
                    title
                    keywords
                    color
                    image {
                        original {
                            url
                        }
                    }
                    giphy {
                        gif
                    }
                    isCurated
                    transcription
                    favorited
                    playCount
                    userKeywords
                    userEmotion
                    userCategory
                    author
                    audienceRating
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
`;

const AdminLabel = styled.label`
    font-weight: bold;
    padding: 8px 0;
`;

class BiteUpdateWrapper extends React.Component {
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
        audioTextTranscription,
        userCategory,
        description,
        author,
    }) => {
        const queryVariables = {
            bite: {
                _id: this.props.biteId,
                title,
                transcription: audioTextTranscription,
                audienceRating,
                visibility,
                userKeywords: tags,
                userCategory: userCategory ? userCategory.toUpperCase() : "",
                description,
                author,
            },
        };

        if (!this.props.isModerator) {
            delete queryVariables.bite.audienceRating;
            delete queryVariables.bite.transcription;
        }

        this.setState({ loadingMutation: true });

        const biteUpdateMutation = await this.props.updateBite({
            errorPolicy: "all",
            variables: queryVariables,
        });

        this.setState({ loadingMutation: false, updatedFinished: true });
    };

    render() {
        if (this.state.loadingMutation) {
            return (
                <BoxContainer>
                    <ErrorText>Updating Blerp</ErrorText>
                </BoxContainer>
            );
        }

        return (
            <BoxContainer>
                <AdminLabel>{"Bite Owner Update Box"}</AdminLabel>
                <BiteInfoInput
                    key={this.props.biteId}
                    handleSubmitInfo={this.handleSubmitInfo}
                    id={this.props.biteId}
                    title={this.props.biteTitle}
                    visibility={this.props.visibility}
                    audienceRating={this.props.audienceRating}
                    defaultTags={this.props.tags}
                    audioTextTranscription={this.props.audioTextTranscription}
                    author={this.props.author}
                    userCategory={this.props.userCategory}
                    description={this.props.description}
                    isModerator={this.props.isModerator}
                    finishedUpdating={this.state.updatedFinished}
                    isCurated={this.props.isCurated}
                />
                {this.props.globalErrorMessage !== "" && (
                    <ErrorText>{this.props.globalErrorMessage}</ErrorText>
                )}
            </BoxContainer>
        );
    }
}

export default compose(
    graphql(adminUpdateBiteMutation, {
        name: "updateBite",
    }),
)(BiteUpdateWrapper);
