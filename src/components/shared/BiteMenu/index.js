/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";

import styled from "styled-components";

import { randomBlerpColor } from "../../../lib/helperFunctions";

import BiteMenuIcon from "../../icons/bite-menu-icon";
import BiteOptionsModal from "./bite-options-modal";

const MenuButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 40px;
    height: 40px;
    opacity: ${props => (props.isMenuOpen ? 1 : 0)};
`;

// interface Props {
//   biteId: string;
//   biteAudioUrl: string;
//   biteTitle: string;
//   className?: string;
//   menuOpen?: boolean;
//   favorited?: boolean;
//   favoriteCallback?: any;
// }

// interface State {
//   color: string;
//   menuOpen: boolean;
//   posX: number;
//   posY: number;
// }

const DefaultProps = {};

export default class BiteMenu extends React.Component {
    static defaultProps = DefaultProps;
    menuElement;

    state = {
        color: randomBlerpColor(),
        menuOpen: this.props.menuOpen || false,
        posX: 0,
        posY: 0,
    };

    buttonRef = React.createRef();

    getButtonRef = input => {
        this.menuElement = input;
    };

    onMenuClick = event => {
        const bounds = this.buttonRef.current.getBoundingClientRect();

        this.setState({
            menuOpen: !this.state.menuOpen,
            posX: Math.round(bounds.x + bounds.width / 2 + window.scrollX),
            posY: Math.round(bounds.y + bounds.height / 2 + window.scrollY),
        });
    };

    onMenuClose = event => {
        this.buttonRef.current.focus();
        this.setState({
            menuOpen: false,
        });
    };

    // NOTE: react 16 lets you return arrays i have no idea how to type this correctly
    render() {
        return [
            <MenuButton
                key={this.props.biteId}
                onClick={this.onMenuClick}
                color={this.state.color}
                ref={this.buttonRef}
                {...this.props}
                isMenuOpen={this.state.menuOpen}
            >
                <BiteMenuIcon />
            </MenuButton>,
            this.state.menuOpen && (
                <BiteOptionsModal
                    key={`${this.props.biteId}2`}
                    posX={this.state.posX}
                    posY={this.state.posY}
                    onModalClose={this.onMenuClose}
                    biteId={this.props.biteId}
                    biteAudioUrl={this.props.biteAudioUrl}
                    biteTitle={this.props.biteTitle}
                    favorited={this.props.favorited}
                    favoriteCallback={this.props.favoriteCallback}
                >
                    {this.props.children}
                </BiteOptionsModal>
            ),
        ];
    }
}
