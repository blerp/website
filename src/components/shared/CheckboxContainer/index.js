/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import { randomBlerpColor } from "../../../lib/helperFunctions";

import { pandaPink } from "../../../styles/colors";

const CheckboxMainContainer = styled.div`
    margin: 6px;
    background-color: ${props => props.backgroundColor};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 6px;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const CheckboxOption = styled.div`
    font-size: 12px;
    text-align: center;
    color: ${props => (props.isChecked ? "#fff" : "rgba(75,75,75,1)")};
    margin: 12px;
    user-select: all;
    opacity: ${props => (props.isChecked ? "1.0" : "0.33")};
`;

const StyledCheckboxContainer = styled.div`
    width: 70px;
    height: 40px;
    background: #50555c;
    margin: 8px;
    border-radius: 50px;
    position: relative;
    justify-content: center;
    align-items: center;

    &::before {
        content: "";
        position: absolute;
        left: 14px;
        top: 16px;
        height: 8px;
        width: 40px;
        border-radius: 4px;
        background: ${props => props.lineColor};
    }
`;

const StyledCheckBox = styled.input`
    appearance: none;
    display: none;

    &:focus {
        border: 2px solid ${pandaPink} !important;
        outline: none;
        box-shadow: none !important;
    }
`;

const StyledLabel = styled.label`
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.5s ease;
    cursor: pointer;
    position: absolute;
    top: 5px;
    z-index: 1;
    left: ${props => (props.isChecked ? "36px" : "4px")};
    background: ${props => (props.isChecked ? "#fff" : "#fff")};

    &:focus {
        border: 2px solid ${pandaPink} !important;
        outline: none;
        box-shadow: none !important;
    }
`;

// interface Props {
//   checked: boolean;
//   color: string;
//   toggleChecked?: () => void;
//   options: string[];
// }

// interface State {
//   color: string;
// }

const DefaultProps = {
    checked: false,
    toggleChecked: () => {},
};

export default class CheckboxContainer extends React.Component {
    static defaultProps = DefaultProps;

    constructor(props) {
        super(props);
        this.state = {
            color: randomBlerpColor(),
        };
    }

    handleOnKeyPress = event => {
        this.props.toggleChecked();
    };

    render() {
        return (
            <CheckboxMainContainer backgroundColor={this.state.color}>
                <CheckboxOption isChecked={!this.props.checked}>
                    {this.props.options[0]}
                </CheckboxOption>
                <StyledCheckboxContainer lineColor={this.state.color}>
                    <StyledCheckBox
                        type='checkbox'
                        onChange={this.props.toggleChecked}
                        checked={this.props.checked}
                    />
                    <StyledLabel
                        isChecked={this.props.checked}
                        onClick={this.props.toggleChecked}
                        tabIndex={0}
                        onKeyPress={this.handleOnKeyPress}
                    />
                </StyledCheckboxContainer>
                <CheckboxOption
                    isChecked={this.props.checked}
                    onClick={this.props.toggleChecked}
                >
                    {this.props.options[1]}
                </CheckboxOption>
            </CheckboxMainContainer>
        );
    }
}
