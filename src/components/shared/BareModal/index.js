/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";

import styled, { keyframes } from "styled-components";

import { randomBlerpColor } from "../../../lib/helperFunctions";

import BiteMenuIcon from "../../icons/bite-menu-icon";
import BiteOptionsModal from "./bite-options-modal";

const MenuButton = styled.button`
    overflow: hidden;
    background-color: transparent;
    width: 52px;
    height: 24px;
    color: rgba(56, 56, 56, 1);
    border: none;
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;

    &:active {
        opacity: 0.4;
    }

    &:hover {
        transition: all 0.2s ease 0s;
    }
`;

// interface Props {
//   biteId?: string;
//   className?: string;
//   menuOpen?: boolean;
// }

// interface State {
//   color: string;
//   menuOpen: boolean;
// }

const DefaultProps = {
    biteId: "",
};

export default class BiteMenu extends React.Component {
    static defaultProps = DefaultProps;

    state = {
        color: randomBlerpColor(),
        menuOpen: this.props.menuOpen,
    };

    onMenuClick = event => {
        this.setState({ menuOpen: !this.state.menuOpen });
    };

    render() {
        return (
            <MenuButton
                onClick={this.onMenuClick}
                color={this.state.color}
                {...this.props}
            >
                <BiteMenuIcon />
                {this.state.menuOpen && (
                    <BiteOptionsModal onModalClose={this.onMenuClick} />
                )}
            </MenuButton>
        );
    }
}
