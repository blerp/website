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
import SecondaryButton from "../../buttons/secondary-button";
import PinkButton from "../../buttons/pink-button";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    iconsInActive,
    pandaTeal,
    secondaryGray,
    defaultBackground,
    darkBackground,
} from "../../../styles/colors";
import { Row } from "../ProfileTabViews/ProfileStyledComponents";

const MUTATION_ITEM = gql`
    mutation webDeleteBoardById($playlistId: MongoID!) {
        web {
            playlistRemoveById(_id: $playlistId) {
                _id
            }
        }
    }
`;

const OverallContainer = styled.div`
    overflow-y: scroll;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const DefaultProps = {};

const MenuTitle = styled.div`
    margin: 4px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: ${props => (props.selected ? pandaPink : secondaryGray)};
`;

const Subtitle = styled.div`
    margin: 4px;
    font-size: 12px;
    font-weight: lighter;
    text-align: center;
    color: ${props => (props.selected ? pandaPink : secondaryGray)};
`;

const ButtonContainer = styled.div`
    padding: 8px;
`;

export class DeleteBoardScreen extends React.Component {
    static defaultProps = DefaultProps;
    state = {
        loading: false,
    };

    handleDeleteClick = mutationCall => async () => {
        this.setState({ loading: true });

        const checkingItem = await mutationCall({
            variables: {
                playlistId: this.props.playlistId,
            },
        });

        if (checkingItem) {
            window.location = "/";
            this.props.handleDeleteFinished();
        }
    };

    render() {
        if (this.state.loading) {
            return (
                <OverallContainer>
                    <MenuTitle>{"Loading"}</MenuTitle>
                </OverallContainer>
            );
        }

        return (
            <React.Fragment>
                <Mutation mutation={MUTATION_ITEM}>
                    {deleteMutation => {
                        return (
                            <OverallContainer>
                                <MenuTitle>
                                    {
                                        "Are you sure you want to delete this Soundboard?"
                                    }
                                </MenuTitle>
                                <Subtitle>
                                    {
                                        "The blerps inside the board will NOT be deleted."
                                    }
                                </Subtitle>
                                <Row
                                    style={{ justifyContent: "space-between" }}
                                >
                                    <ButtonContainer>
                                        <PinkButton
                                            onClick={this.handleDeleteClick(
                                                deleteMutation,
                                            )}
                                        >
                                            Delete
                                        </PinkButton>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <SecondaryButton
                                            onClick={
                                                this.props.handleCancelClick
                                            }
                                        >
                                            Cancel
                                        </SecondaryButton>
                                    </ButtonContainer>
                                </Row>
                            </OverallContainer>
                        );
                    }}
                </Mutation>
            </React.Fragment>
        );
    }
}

export default DeleteBoardScreen;
