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

const MenuButton = styled.button`
    cursor: pointer;
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
//   onClick: any;
//   className?: any;
// }

// interface State {
//   color: string;
// }

const DefaultProps = {};

export default class MoreMenuButton extends React.Component {
    static defaultProps = DefaultProps;
    menuElement;
    props;
    state = {
        color: randomBlerpColor(),
    };

    getButtonRef = input => {
        this.menuElement = input;
    };

    onMenuClick = _ => {
        this.props.onClick();
    };

    render() {
        return (
            <MenuButton
                onClick={this.onMenuClick}
                color={this.state.color}
                ref={this.getButtonRef}
                className={this.props.className}
            >
                <BiteMenuIcon />
            </MenuButton>
        );
    }
}
