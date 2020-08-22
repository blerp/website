/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import styled, { keyframes } from "styled-components";

import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";

import CloseButton from "../buttons/CloseButton";
import SecondaryButton from "../buttons/secondary-button";
import PinkButton from "../buttons/pink-button";
import TextInput from "../inputs/text-input";

import gql from "graphql-tag";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    headerText,
    iconsActive,
    inputBorderColor,
    secondaryGray,
    bodyText,
    secondaryText,
} from "../../styles/colors";

const screenSizeHide = 1024;

const slideIn = keyframes`
  0% {
    opacity: 0;
  }

  25% {

  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    opacity: 1;
    top: 0;
  }

  25% {

  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 0;
    top: ${screenSizeHide}px;
  }
`;

const ScreenContainer = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    border-radius: 0;
    opacity: ${props => {
        return props.showScreen ? 1 : 0;
    }};
    top: ${props => {
        return props.showScreen ? "0" : `${screenSizeHide}px`;
    }};
    animation: ${props => {
            return props.showScreen ? slideIn : slideOut;
        }}
        0.5s 1;
    border-radius: ${props => (props.isOverlay ? "12px" : "0")};

    @media (min-width: 600px) {
        justify-content: center;
    }
`;

const HeaderText = styled.div`
    font-weight: 600;
    text-align: center;
    font-size: 24px;
    line-height: 24px;
    padding: 12px;
    text-decoration: none;
    color: ${bodyText};
`;

const StyledCloseButton = styled(CloseButton)`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;

    &:focus {
        border-radius: 6px;
        border: 2px solid ${pandaPink} !important;
        outline: 0 !important;
        box-shadow: none !important;
    }
`;

const ContentModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 8px;
`;

const ContentHeader = styled.div`
    border-radius: 8px 8px 0 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${flyoutBackground};
    width: 100%;
`;

const ContentBody = styled.div`
    border-radius: 0 0 8px 8px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: ${actionBackground};
    min-width: 320px;
    min-height: 320px;
    justify-content: flex-start;
`;

const OverallContainer = styled.div`
    overflow-y: scroll;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 28px;
`;

const MenuTitle = styled.div`
    margin: 4px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: ${props => (props.selected ? pandaPink : secondaryGray)};
`;

const Subtitle = styled.div`
    margin: 4px;
    font-size: 18px;
    font-weight: lighter;
    text-align: center;
    color: ${props => (props.selected ? pandaPink : secondaryGray)};
`;

const ButtonContainer = styled.div`
    padding: 8px;
    width: 100%;
`;

const RowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 4px;
    background-color: ${props => props.color};
`;

const MUTATION_ITEM = gql`
    mutation webChangeLoggedInUser($newUsername: Username!) {
        web {
            userChangeUsername(newUsername: $newUsername) {
                success
                newUsername
            }
        }
    }
`;

const checkValidUsername = gql`
    query websiteCheckValidUserFromWeb($username: Username!) {
        web {
            userAvailableUsername(username: $username) {
                available
            }
        }
    }
`;

class MenuSelectionScreen extends React.Component {
    state = {
        chosenScreen: "",
        username: this.props.username,
        preTypedUsername: true,
    };
    constructor(props) {
        super(props);
        if (process.browser) {
            this.appRoot = document && document.getElementById("root");
            this.modalRoot = document && document.getElementById("modal-root");
            this.el = document && document.createElement("div");
        }
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        this.modalRoot.appendChild(this.el);
        // Prevents scrolling behind the screen
        // this.appRoot.setAttribute("style", "overflow: hidden; position:fixed;");
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
    }

    handleCloseClick = () => {
        if (this.props.onCloseClick) {
            this.props.onCloseClick();
        }
    };

    handleCancelClick = () => {
        this.setState({ chosenScreen: "" });
    };

    handleChaneUsername = mutationCall => async () => {
        if (this.state.username === "") {
            return null;
        }

        const checkingItem = await mutationCall({
            variables: {
                newUsername: this.state.username,
            },
        });
    };

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value.trim().toLowerCase(),
            preTypedUsername: false,
        });
    };

    render() {
        return ReactDOM.createPortal(
            <ScreenContainer
                showScreen={this.props.showScreen}
                isOverlay={this.props.isOverlay}
            >
                <ContentModal>
                    <ContentHeader>
                        <StyledCloseButton
                            lightIcon={false}
                            onClick={this.handleCloseClick}
                        />
                        <HeaderText>{"Profile Settings"}</HeaderText>
                    </ContentHeader>

                    <ContentBody>
                        <RowContainer>
                            <MenuTitle>{"First Name:"}</MenuTitle>
                            <Subtitle>{this.props.firstName}</Subtitle>
                        </RowContainer>
                        <RowContainer>
                            <MenuTitle>{"Last Name:"}</MenuTitle>
                            <Subtitle>{this.props.lastName}</Subtitle>
                        </RowContainer>

                        <RowContainer>
                            <MenuTitle>{"Username:"}</MenuTitle>
                            <Query
                                query={checkValidUsername}
                                variables={{ username: this.state.username }}
                            >
                                {({ error, data }) => {
                                    if (error || this.state.preTypedUsername) {
                                        return (
                                            <TextInput
                                                onTextChange={
                                                    this.handleUsernameChange
                                                }
                                                errorMessage={
                                                    this.props
                                                        .usernameErrorMessage
                                                }
                                                value={this.state.username}
                                            />
                                        );
                                    }

                                    const validUsernameString = data
                                        ? data.web &&
                                          data.web.userAvailableUsername
                                            ? data.web.userAvailableUsername
                                                  .available
                                                ? ""
                                                : "Username is invalid or taken."
                                            : ""
                                        : "";

                                    return (
                                        <TextInput
                                            placeholder='Username'
                                            onTextChange={
                                                this.handleUsernameChange
                                            }
                                            errorMessage={validUsernameString}
                                            value={this.state.username}
                                        />
                                    );
                                }}
                            </Query>

                            <Mutation mutation={MUTATION_ITEM}>
                                {mut => {
                                    if (this.state.username === "") {
                                        return null;
                                    }
                                    return (
                                        <PinkButton
                                            onClick={this.handleChaneUsername(
                                                mut,
                                            )}
                                        >
                                            Change
                                        </PinkButton>
                                    );
                                }}
                            </Mutation>
                        </RowContainer>

                        <RowContainer>
                            <MenuTitle>{"Email:"}</MenuTitle>
                            <Subtitle>{this.props.email}</Subtitle>
                        </RowContainer>

                        <ButtonContainer>
                            <SecondaryButton onClick={this.handleCloseClick}>
                                Close
                            </SecondaryButton>
                        </ButtonContainer>
                    </ContentBody>
                </ContentModal>
            </ScreenContainer>,
            this.el,
        );
    }
}

export default MenuSelectionScreen;
