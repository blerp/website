/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import React from "react";
import styled from "styled-components";

const TogglerContainerView = styled.div`
    margin: 0 20px;
`;

const TogglerBackground = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    background-color: ${props =>
        props.on ? props.theme.togglerBackground : props.theme.lighterGray};
    align-items: center;
    border-radius: 16px;
    height: 12px;
    width: 32px;
`;

const TogglerCircle = styled.div`
    position: absolute;
    left: ${props => (props.on ? "auto" : "0px")};
    right: ${props => (props.on ? "0px" : "auto")};
    display: flex;
    flex-direction: row;
    background-color: ${props =>
        props.on ? props.theme.pandaPink : props.theme.secondaryGray};
    align-items: center;
    justify-content: space-between;
    width: 18px;
    height: 18px;
    border-radius: 40px;
    cursor: pointer;
`;

// interface Props {
//   onChange?: (props: { newToggleState: boolean }) => {};
//   toggleState?: boolean;
// }
//
// interface State {
//   on: boolean;
// }

const DefaultProps = {};

export class Toggler extends React.Component {
    static defaultProps = DefaultProps;

    handleOnPress = () => {
        if (this.props.onChange) {
            this.props.onChange({ newToggleState: !this.props.toggleState });
        }
    };

    render() {
        return (
            <TogglerContainerView>
                <TogglerBackground
                    onClick={this.handleOnPress}
                    on={this.props.toggleState}
                >
                    <TogglerCircle on={this.props.toggleState} />
                </TogglerBackground>
            </TogglerContainerView>
        );
    }
}

export default Toggler;
