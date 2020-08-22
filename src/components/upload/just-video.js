/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import Button from "../buttons/button";
import ReactPlayer from "react-player";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 8px;
`;

const YTContainer = styled.div`
    margin: 12px;
`;

const SubmitButton = styled(Button)`
    background-color: ${props =>
        props.disabled ? "rgba(200,200,200,1)" : "rgba(56, 56, 56, 1)"};
    color: rgba(255, 255, 255, 1);
    height: 40px;
    width: 100px;
    padding: 8px;
    margin: 8px;
    float: right;
    font-size: 16px;
`;

const PreviewHeader = styled.p`
    color: ${props => props.theme.bodyText};
    font-size: 24px;
    text-align: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 0 40px;
`;

export default class ReactPlayerViewer extends React.Component {
    reactVideoPlayer; // access to player in all event handlers via event.target

    constructor(props, context) {
        super(props, context);
        this.state = {
            // All of this is in miliseconds
            endTime:
                parseFloat(
                    props.endTime ? props.endTime : props.startTime || 0,
                ) + 9000,
            startTime: parseFloat(props.startTime || 0),
            videoDuration: props.videoDuration || 100000,
            ready: false,
            timeError: false,
            playing: false,
        };
    }

    handleFinishedSelection = e => {
        this.pauseVideo();
        this.props.onFinishedSelection({
            endTime: this.state.endTime,
            startTime: this.state.startTime,
        });
    };

    onEnded = () => {
        if (this.reactVideoPlayer) {
            this.reactVideoPlayer.seekTo(
                this.state.startTime / parseFloat("1000"),
                "seconds",
            );
        }
        this.setState({ playing: true });
    };

    renderSubmitButtons() {
        if (!this.props.showSubmitButton) {
            return;
        }
        return (
            <ButtonContainer>
                <SubmitButton onClick={this.props.onCancel} disabled={false}>
                    Start Over
                </SubmitButton>
                <SubmitButton
                    onClick={this.handleFinishedSelection}
                    disabled={!this.state.endTime || !this.state.ready}
                >
                    Continue
                </SubmitButton>
            </ButtonContainer>
        );
    }

    pauseVideo = () => {
        this.setState({ playing: false });
    };

    playVideo = () => {
        if (this.reactVideoPlayer) {
            this.reactVideoPlayer.seekTo(
                this.state.startTime / parseFloat("1000"),
                "seconds",
            );
        }
        this.setState({ playing: true });
    };

    reactRef = player => {
        this.reactVideoPlayer = player;
    };
    renderYoutube() {
        if (!ReactPlayer.canPlay(this.props.videoUrl)) {
            return <div />;
        }

        return (
            <YTContainer>
                <ReactPlayer
                    ref={this.reactRef}
                    url={this.props.videoUrl}
                    progressInterval={100} // 1/10 milliesonds
                    controls={true}
                    width='100%'
                    height='100%'
                />
            </YTContainer>
        );
    }

    render() {
        return (
            <PageContainer>
                <PreviewHeader>{"Video Preview"}</PreviewHeader>
                {this.renderYoutube()}
            </PageContainer>
        );
    }
}
