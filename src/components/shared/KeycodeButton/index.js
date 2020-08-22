/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import "isomorphic-fetch";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { graphql } from "@apollo/react-hoc";
import { flowRight as compose } from "lodash";

import styled from "styled-components";

import { randomBlerpColor } from "../../../lib/helperFunctions";

const StyledKeycodeButton = styled.button`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => {
        return props.selected ? "#4a4a4a" : "#fff";
    }};
    width: 48px;
    height: 48px;
    border-radius: 50px;
    color: ${props => {
        return props.selected ? "rgba(20, 20, 20, 1)" : "rgba(56, 56, 56, 1)";
    }};
    border: none;
    background-position: center;
    transition: ease-in-out;
    transition: background 0.6s;
    opacity: ${props => {
        return props.isDisabled ? "0.5" : "0.8";
    }} !important;

    &:active {
        opacity: ${props => {
            return props.isDisabled ? "0.5" : "0.4s";
        }};
    }

    &:hover {
        transition: all 0.2s ease 0s;
        opacity: ${props => {
            return props.isDisabled ? "0.5" : "0.6";
        }};
    }
`;

const KeycodeChar = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

// interface Props {
//   onClick: (props: { keycode: any }) => {};
//   boardId?: string;
//   className?: any;
//   keycode?: any;
//   editable?: boolean;
//   position?: any; // position/index of the bite in the board
//   userSelectHotkey?: any;
// }

// interface State {
//   color: string;
//   keyname?: string;
//   keycode?: number;
//   selected: boolean;
// }

const DefaultProps = {};

class KeycodeButton extends React.Component {
    static defaultProps = DefaultProps;
    menuElement;
    props;
    state = {
        color: randomBlerpColor(),
        keycode: this.props.keycode || null,
        keyname: String.fromCharCode(this.props.keycode) || "",
        selected: false,
    };

    componentDidMount() {
        if (!this.props.editable) {
            return;
        }
        document.addEventListener("mousedown", this.onClickSelectCancel);
    }

    componentWillUnmount() {
        if (!this.props.editable) {
            return;
        }
        document.removeEventListener("mousedown", this.onClickSelectCancel);
    }

    setKeyEvent = async event => {
        if (!this.props.editable) {
            return;
        }

        if (this.state.selected && event.key.length === 1) {
            try {
                this.setState({ keycode: event.keyCode, keyname: event.key });
                const result = await this.props.userSelectHotkey({
                    variables: {
                        id: this.props.boardId,
                        keycode: event.keyCode,
                        position: this.props.position,
                    },
                });

                if (result.data.errors) {
                    // TODO: make UI for this
                    this.setState({ keycode: null, keyname: "" });
                    this.props.onClick({ keycode: null });
                    this.onUnselectButton();
                    alert("Failed to add hot key blerp!");
                    return;
                }
            } catch (error) {
                // TODO: Make Proper UI For This
                this.setState({ keycode: null, keyname: "" });
                this.props.onClick({ keycode: null });
                this.onUnselectButton();
                alert(`Failed to add keycode to blerp: ${error}`);
                return;
            }
            this.onUnselectButton();

            // NOTE This does set the state correctly but there is an error
            // TypeError: e.replace is not a function.. i will solve this later
            this.props.onClick({ keycode: this.state.keycode });
        }
    };

    getButtonRef = input => {
        this.menuElement = input;
    };

    onClickSelectCancel = event => {
        if (!this.state.selected) {
            return;
        }
        const domNode = ReactDOM.findDOMNode(this);

        // Detects if there was an outside click
        if (!domNode || !domNode.contains(event.target)) {
            this.onUnselectButton();
        }
    };

    onUnselectButton = () => {
        this.setState({ selected: false });
        document.removeEventListener("keydown", this.setKeyEvent);
    };

    onSelectClick = _ => {
        if (!this.props.editable) {
            return;
        }
        document.addEventListener("keydown", this.setKeyEvent);
        this.setState({ selected: true });
    };

    render() {
        return (
            <StyledKeycodeButton
                onClick={this.onSelectClick}
                color={this.state.color}
                ref={this.getButtonRef}
                selected={this.state.selected}
                className={this.props.className}
                isDisabled={!this.props.editable}
                title={`play this bite using the ${this.state.keyname} hotkey`}
            >
                <KeycodeChar>{this.state.keyname}</KeycodeChar>
            </StyledKeycodeButton>
        );
    }
}

const userSelectHotkey = gql`
    mutation websiteAddHotkeyFromWebMenuItem(
        $id: MongoID!
        $keycode: Int!
        $position: Int!
    ) {
        web {
            boardSetHotkey(_id: $id, key: $keycode, index: $position) {
                title
            }
        }
    }
`;

export default compose(
    graphql(userSelectHotkey, {
        name: "userSelectHotkey",
    }),
)(KeycodeButton);
