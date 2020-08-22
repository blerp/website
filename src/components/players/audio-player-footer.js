/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import { withRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";
import ProgressBar from "../shared/ProgressBar";

import { randomBlerpColor } from "../../lib/helperFunctions";

const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    visibility: visible;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 2000;
    background-color: ${props => props.color};
`;

const AudioContainer = styled.div`
    display: flex;
    height: 100px;
    justify-content: center;
    align-items: center;
`;

const Blah = styled.img`
    align-self: center;
    white-space: nowrap;
    padding: 4px 8px;
    width: 30px;
`;

const StyledProgressBar = styled(ProgressBar)`
    align-self: flex-start;
    width: 500px;
    height: 10px;
    background-color: #fff;
    margin: auto 12px;
`;

export default class AudioPlayerFooter extends React.Component {
    backgroundColor = "#2d2d2d";
    state = {
        color: randomBlerpColor(),
        currentTime: 0,
        duration: 0,
        repeatMode: false,
    };

    constructor(props) {
        super(props);
    }

    playFromProgressBar = () => {};

    render() {
        return (
            <Container color={this.backgroundColor}>
                <AudioContainer>
                    <Blah src='https://storage.googleapis.com/blerp-web-images/static/tiny-blah-smile.png' />
                    <StyledProgressBar
                        color={this.state.color}
                        part={this.state.currentTime}
                        total={this.state.duration}
                        onPlayClick={this.playFromProgressBar}
                    />
                    <Blah src='https://storage.googleapis.com/blerp-web-images/static/tiny-blah-smile.png' />
                </AudioContainer>
            </Container>
        );
    }
}
