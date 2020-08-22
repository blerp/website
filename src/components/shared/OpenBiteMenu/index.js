/*
 * BLERP Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";

import styled, { keyframes } from "styled-components";

import MenuSelectionScreen from "./MenuSelectionScreen";
import ThreeDotMenuIcon from "../../icons/three-dot-menu-icon";

// import {
//   actionBackground,
//   primaryText,
//   flyoutBackground,
//   pandaPink,
//   iconsInActive
// } from "../../styles/colors";

const DefaultProps = {};

const ButtonContainer = styled.div`
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: absolute;
    top: 4px;
    right: 8px;
`;

const SquareButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: transparent;
    width: 32px;
    height: 32px;
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;
    background-position: center;
    opacity: 1;
    border: none;
    cursor: pointer;

    &:focus {
        opacity: 1;
        outline: 0 !important;
        box-shadow: none !important;
    }

    &:active {
        opacity: 1;
    }

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 600px) {
    }
`;

export default class OpenBiteMenu extends React.Component {
    static defaultProps = DefaultProps;
    menuElement;

    state = {
        menuOpen: this.props.defaultMenuOpen || false,
    };

    handleOpenMenu = () => {
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

    handleImageUploadFinished = () => {
        this.props.refetch();
        this.setState(
            {
                menuOpen: false,
            },
            () => {
                this.openMenuButton.focus();
                this.openMenuButton.scrollIntoView();

                if (this.props.handleImageUploadFinished) {
                    this.props.handleImageUploadFinished();
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
                    <SquareButton
                        ref={this.grabRefForButton}
                        onClick={this.handleOpenMenu}
                    >
                        <ThreeDotMenuIcon colorStyle='dark' />
                    </SquareButton>
                </ButtonContainer>
                {this.state.menuOpen && (
                    <MenuSelectionScreen
                        showScreen={this.state.menuOpen}
                        onCloseClick={this.onMenuClose}
                        handleImageUploadFinished={
                            this.handleImageUploadFinished
                        }
                        biteId={this.props.biteId}
                    />
                )}
            </React.Fragment>
        );
    }
}
