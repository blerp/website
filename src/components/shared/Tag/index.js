/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import {
    lightGray,
    pandaPink,
    focusState,
    bodyText,
} from "../../../styles/colors";

const Container = styled.div`
    display: block;
    text-decoration: none;
    border: 1px ${props => (props.colored ? lightGray : lightGray)} solid;
    color: ${props => (props.colored ? lightGray : lightGray)};
    font-weight: lighter;
    padding: 8px 12px;
    background-color: transparent;
    border-radius: 10px;
    height: ${props => (props.colored ? `auto` : `20px`)};
    margin: 8px;
    font-weight: lighter;

    &:focus {
        border: 1px ${pandaPink} solid;
        color: ${pandaPink};
    }

    &:hover {
        border: 1px ${pandaPink} solid;
        color: ${pandaPink};
    }
`;

const CancelButton = styled.button`
    border: none;
    background-color: rgba(0, 0, 0, 0);
    color: ${focusState};
    margin-left: 5px;
`;

// interface Props {
//   children: React.ReactNode;
//   id?: any;
//   cancelable?: boolean;
//   colored?: boolean;
//   className?: string;
//   onCancel?: (event: any, key: any) => void;
// }

const defaultProps = {
    cancelable: false,
    colored: false,
    onCancel: (event, key) => {},
};

export default class Tag extends React.Component {
    static defaultProps = defaultProps;

    render() {
        return (
            <Container {...this.props}>
                {this.props.children}
                {this.props.cancelable && (
                    <CancelButton onClick={this.handleCancelClick}>
                        x
                    </CancelButton>
                )}
            </Container>
        );
    }

    handleCancelClick = event => {
        this.props.onCancel(event, this.props.id);
    };
}
