/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import Button from "../buttons/button";
import UploadSlider from "./upload-slider";

import { msToTime, YouTubeGetID } from "../../lib/utils";

import YouTube from "react-youtube";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const YTContainer = styled.div`
    margin: 12px 0;
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

const InteractButton = styled(Button)`
    background-color: ${props =>
        props.disabled ? "rgba(150,150,150,1)" : "rgba(56, 56, 56, 1)"};
    color: rgba(255, 255, 255, 1);
    height: 40px;
    width: 100px;
    padding: 8px;
    margin: 8px;
    float: right;
    font-size: 16px;
    border-radius: 40px;
`;

const ErrorMessage = styled.div`
    color: rgba(200, 20, 20, 1);
    padding: 8px 4px 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export default class YoutubeUploadViewer extends React.Component {
    youtubeVideoPlayer; // access to player in all event handlers via event.target

    constructor(props, context) {
        super(props, context);
        this.state = {
            // All of this is in miliseconds
            endTime: parseFloat((props.startTime || 0) + 300),
            startTime: parseFloat(props.startTime || 0),
            videoDuration: props.videoDuration || 100000,
            ready: false,
            timeError: false,
        };
    }

    handleFinishedSelection = e => {
        this.pauseVideo();
        this.props.onFinishedSelection({
            endTime: this.state.endTime,
            startTime: this.state.startTime,
        });
    };

    handleOnChangeAll = ({ values }) => {
        this.setState({
            endTime: values[1],
            startTime: values[0],
        });
    };

    handleOnChangeStart = ({ time, spot }) => {
        this.setState({
            startTime: time,
        });
    };

    handleOnChangeEnd = ({ time, spot }) => {
        this.setState({
            endTime: time,
        });
    };

    onReady = event => {
        this.youtubeVideoPlayer = event.target;

        if (event.target.getDuration() < 610) {
            this.setState({
                videoDuration: event.target.getDuration() * 1000,
                ready: true,
                timeError: false,
            });
        } else {
            this.setState({
                videoDuration: event.target.getDuration() * 1000,
                ready: false,
                timeError: true,
            });
        }
    };

    onStateChange = event => {
        if (event.data == 1) {
            this.setState({
                ready: true,
            });
        } else if (event.data == -1) {
            this.setState({
                ready: false,
            });
        }
    };

    onError = event => {
        this.setState({
            ready: false,
        });
    };

    onPause = event => {};

    onEnd = event => {
        event.target.seekTo(this.state.startTime / parseFloat("1000"), true);
        event.target.playVideo();
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
        this.youtubeVideoPlayer.pauseVideo();
    };

    playVideo = () => {
        this.youtubeVideoPlayer.seekTo(
            this.state.startTime / parseFloat("1000"),
            true,
        );
        this.youtubeVideoPlayer.playVideo();
    };

    renderYoutube() {
        let ytID = "";

        if (this.props.youtubeURL) {
            ytID = YouTubeGetID(this.props.youtubeURL);
        }

        if (ytID) {
            const opts = {
                height: "390",
                playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 1,
                    cc_load_policy: 0, // Hide closed captions
                    controls: 1, // show controls
                    end: this.state.endTime / parseFloat("1000"),
                    fs: 1, // Hide the full screen button
                    iv_load_policy: 3, // Hide the Video Annotations
                    modestbranding: 1, // Hide the Youtube Logo
                    rel: 0,
                    start: this.state.startTime / parseFloat("1000"),
                },
                width: "640",
            };

            return (
                <YTContainer>
                    <YouTube
                        videoId={ytID}
                        opts={opts}
                        onReady={this.onReady}
                        onPause={this.onPause}
                        onStateChange={this.onStateChange}
                        onEnd={this.onEnd}
                        onError={this.onError}
                    />
                </YTContainer>
            );
        }
    }

    render() {
        return (
            <PageContainer>
                {this.state.timeError && (
                    <ErrorMessage>
                        {
                            "Videos must be less then 15 minutes long. (Email support@blerp.com if you want longer videos)"
                        }
                    </ErrorMessage>
                )}
                {this.renderYoutube()}
                <ButtonContainer>
                    <InteractButton onClick={this.playVideo} disabled={false}>
                        Play
                    </InteractButton>
                    <InteractButton onClick={this.pauseVideo} disabled={false}>
                        Stop
                    </InteractButton>
                </ButtonContainer>
                <UploadSlider
                    audioDuration={this.state.videoDuration}
                    onMoveAll={this.handleOnChangeAll}
                    onMoveEnd={this.handleOnChangeEnd}
                    onMoveStart={this.handleOnChangeStart}
                    startTime={this.state.startTime}
                    endTime={this.state.endTime}
                    showCurrentTime={false}
                />
                {this.renderSubmitButtons()}
            </PageContainer>
        );
    }
}
