/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";

import styled, { keyframes } from "styled-components";

import { randomBlerpColor } from "../../../lib/helperFunctions";

import AddWhiteCircle from "../../icons/add-white-circle";

const AddButton = styled.button`
    cursor: pointer;
    overflow: hidden;
    background-color: transparent;
    width: 52px;
    height: 52px;
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

export default class AddWhiteCircleButton extends React.Component {
    static defaultProps = DefaultProps;
    menuElement;
    props;
    state = {
        color: randomBlerpColor(),
    };

    getButtonRef = input => {
        this.menuElement = input;
    };

    onMenuClick = event => {
        this.props.onClick();
    };

    render() {
        return (
            <AddButton
                onClick={this.onMenuClick}
                color={this.state.color}
                ref={this.getButtonRef}
                className={this.props.className}
            >
                <AddWhiteCircle />
            </AddButton>
        );
    }
}
