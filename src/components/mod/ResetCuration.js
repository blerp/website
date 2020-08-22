/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";

import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import styled, { keyframes } from "styled-components";
import BiteInfoInput from "./bite-info-input";

const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 8px;
`;

const ButtonClick = styled.button`
    font-size: 16px;
    color: ${props => props.theme.focusOutline};
    cursor: pointer;
    border: none;
    background-color: transparent;
`;

const NoButton = styled.div`
    font-size: 16px;
    color: ${props => props.theme.focusOutline};
    cursor: pointer;
    border: none;
    background-color: transparent;
`;

const adminUpdateBiteMutation = gql`
    mutation websiteModeratorUpdate($bite: UpdateByIdBiteInput!) {
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

class ResetCuration extends React.Component {
    state = {
        loadingMutation: false,
        finished: false,
    };
    props;

    onLinkClick = mutation => async () => {
        const queryVariables = {
            bite: {
                _id: this.props.biteId,
                isCurated: false,
            },
        };

        if (!this.props.isModerator) {
            delete queryVariables.bite.audienceRating;
            delete queryVariables.bite.transcription;
        }

        this.setState({ loadingMutation: true });

        const biteUpdateMutation = await mutation({
            errorPolicy: "all",
            variables: queryVariables,
        });

        this.setState({ loadingMutation: false, finished: true });
    };

    render() {
        if (this.state.loadingMutation) {
            return (
                <BoxContainer>
                    <ButtonClick>Updating</ButtonClick>
                </BoxContainer>
            );
        }

        if (this.state.finished) {
            return (
                <BoxContainer>
                    <NoButton>Success!</NoButton>
                </BoxContainer>
            );
        }

        return (
            <Mutation
                mutation={adminUpdateBiteMutation}
                update={(cache, { data }) => {
                    console.log("CHECK DATA", data);
                }}
            >
                {(deleteBite, { data }) => (
                    <BoxContainer>
                        <ButtonClick onClick={this.onLinkClick(deleteBite)}>
                            Move Back To Unfinished
                        </ButtonClick>
                    </BoxContainer>
                )}
            </Mutation>
        );
    }
}

export default ResetCuration;
