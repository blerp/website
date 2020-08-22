/*
 * BLERP Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";

import styled, { keyframes } from "styled-components";

import BoardSelectionScreen from "./BoardSelectionScreen";
import SecondaryButton from "../../buttons/SecondaryButton";

// import {
//   actionBackground,
//   primaryText,
//   flyoutBackground,
//   pandaPink,
//   iconsInActive
// } from "../../styles/colors";

const DefaultProps = {};

const ButtonContainer = styled.div`
    margin: 12px;
`;

export default class BoardSelectionModal extends React.Component {
    static defaultProps = DefaultProps;
    menuElement;

    state = {
        menuOpen: this.props.defaultMenuOpen || false,
    };

    handleChooseBoardClick = () => {
        this.setState({
            menuOpen: true,
        });
    };

    onMenuClose = event => {
        this.setState(
            {
                menuOpen: false,
            },
            () => {
                this.openMenuButton.focus();
                this.openMenuButton.scrollIntoView();
            },
        );
    };

    handleSelectBoard = ({ boardIds }) => {
        this.setState(
            {
                menuOpen: false,
            },
            () => {
                this.openMenuButton.focus();
                this.openMenuButton.scrollIntoView();

                if (boardIds && this.props.handleSelectBoards) {
                    this.props.handleSelectBoards({ boardIds });
                }
            },
        );
    };

    grabRefForButton = el => {
        this.openMenuButton = el;
    };

    // NOTE: react 16 lets you return arrays i have no idea how to type this correctly
    render() {
        return (
            <React.Fragment>
                <ButtonContainer>
                    <SecondaryButton
                        ref={this.grabRefForButton}
                        onClick={this.handleChooseBoardClick}
                    >
                        {"Select Boards"}
                    </SecondaryButton>
                </ButtonContainer>
                {this.state.menuOpen && (
                    <BoardSelectionScreen
                        showScreen={this.state.menuOpen}
                        onCloseClick={this.onMenuClose}
                        onSelectClick={this.handleSelectBoard}
                        defaultSelectedBoardIds={
                            this.props.defaultSelectedBoardIds
                        }
                    />
                )}
            </React.Fragment>
        );
    }
}
