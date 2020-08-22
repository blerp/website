/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { randomBlerpColor } from "../../../lib/helperFunctions";

import BoardAddMenu from "./board-add-menu";
import SecondaryButton from "../../buttons/secondary-button";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    iconsInActive,
} from "../../../styles/colors";

// interface Props {
//   biteId: string;
//   className?: string;
//   menuOpen?: boolean;
//   signedInUserId?;
//   rootNode?;
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

    getButtonRef = input => {
        this.menuElement = input;
    };

    onMenuClick = event => {
        const bounds = this.menuElement.getBoundingClientRect();

        this.setState({
            menuOpen: !this.state.menuOpen,
            posX: Math.round(bounds.x + bounds.width / 2 + window.scrollX),
            posY: Math.round(bounds.y + bounds.height / 2 + window.scrollY),
        });
    };

    notLoggedInClick = event => {
        if (window) {
            const redirect = `soundbites/${this.props.biteId}`;
            window.location.href = `/login?returnTo=${redirect}`;
        }
    };

    onMenuClose = event => {
        this.menuElement.focus();
        this.setState({
            menuOpen: false,
        });
    };

    render() {
        return [
            this.props.signedInUserId ? (
                <SecondaryButton
                    key={this.props.biteId}
                    onClick={this.onMenuClick}
                    color={this.state.color}
                    ref={this.getButtonRef}
                    isMenuOpen={this.state.menuOpen}
                >
                    {"Add to Board"}
                </SecondaryButton>
            ) : (
                <SecondaryButton
                    key={this.props.biteId}
                    onClick={this.notLoggedInClick}
                    color={this.state.color}
                    ref={this.getButtonRef}
                    isMenuOpen={this.state.menuOpen}
                >
                    {"Add to Board"}
                </SecondaryButton>
            ),
            this.state.menuOpen && (
                <BoardAddMenu
                    key={`${this.props.biteId}2`}
                    posX={this.state.posX}
                    posY={this.state.posY}
                    onModalClose={this.onMenuClose}
                    biteId={this.props.biteId}
                    signedInUserId={this.props.signedInUserId}
                    rootNode={this.props.rootNode}
                >
                    {this.props.children}
                </BoardAddMenu>
            ),
        ];
    }
}
