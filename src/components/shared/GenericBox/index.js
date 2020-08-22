/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { keyframes } from "styled-components";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    disabledText,
    iconsActive,
    bodyText,
} from "../../../styles/colors";

const animateIn = keyframes`
  0% {
    width: 72%;
    opacity: 0;
  }

  25% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    width: 80%;
    opacity: 1;
  }
`;

const Box = styled.div`
    background-color: ${flyoutBackground};
    display: flex;
    flex-direction: column;
    width: 80%;
    border-radius: 6px;
    margin: 40px auto;
    border-radius: 6px;
    animation: ${animateIn} 0.9s 1;
`;

const Header = styled.div`
    background-color: ${props => (props.color ? props.color : pandaPink)};
    padding: 12px;
    border-radius: 6px 6px 0 0;
`;

const Title = styled.div`
    text-align: center;
    font-size: 28px;
    color: ${primaryText};
    width: 100%;
`;

const Body = styled.div`
    background-color: ${flyoutBackground};
    position: relative;
    height: 100%;
    border-radius: 6px;
    padding: 40px;
`;

class GenericBox extends React.Component {
    props;
    render() {
        return (
            <Box>
                <Header color={pandaPink}>
                    <Title>{this.props.header}</Title>
                </Header>
                <Body>{this.props.children}</Body>
            </Box>
        );
    }
}

export default GenericBox;
