/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { keyframes } from "styled-components";

const PlayCountContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 10px;
    width: 100%;
    text-align: center;
    font-size: 32px;
`;

class PlaycountCounter extends React.Component {
    props;
    state = {
        playCount: this.props.playCount,
    };

    render() {
        return (
            <PlayCountContainer className={this.props.className}>
                {this.state.playCount}
            </PlayCountContainer>
        );
    }
}

export default PlaycountCounter;
