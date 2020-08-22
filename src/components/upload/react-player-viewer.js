/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import UploadSlider from "./upload-slider";
import ReactPlayer from "react-player";
import JustVideo from "./just-video";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const YTContainer = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    margin: 12px 0;
    width: 100%;
`;

const SubmitButton = styled.button`
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

const SubmitButtonForward = styled.button`
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
    margin: 0 0 40px;
`;

const PreviewHeader = styled.p`
    color: ${props => props.theme.bodyText};
    font-size: 28px;
    text-align: center;
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
            currentTime: parseFloat(props.startTime || 0),
            videoDuration: props.videoDuration || 100000,
            ready: false,
            timeError: false,
            playing: true,
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
        this.setState(
            {
                endTime: values[1],
                startTime: values[0],
                currentTime: this.state.startTime,
            },
            () => {
                if (this.reactVideoPlayer) {
                    this.reactVideoPlayer.seekTo(
                        this.state.startTime / parseFloat("1000"),
                        "seconds",
                    );
                }

                this.props.onFinishedSelection({
                    endTime: this.state.endTime,
                    startTime: this.state.startTime,
                });
            },
        );
    };

    handleOnChangeStart = ({ time, spot }) => {
        this.setState(
            {
                startTime: time, // Milliseconds
                currentTime: this.state.startTime,
            },
            () => {
                if (this.reactVideoPlayer) {
                    this.reactVideoPlayer.seekTo(
                        this.state.startTime / parseFloat("1000"),
                        "seconds",
                    );
                }

                this.props.onFinishedSelection({
                    endTime: this.state.endTime,
                    startTime: this.state.startTime,
                });
            },
        );
    };

    handleOnChangeEnd = ({ time, spot }) => {
        this.setState(
            {
                endTime: time, // Milliseconds
                currentTime: this.state.startTime,
            },
            () => {
                this.props.onFinishedSelection({
                    endTime: this.state.endTime,
                    startTime: this.state.startTime,
                });
            },
        );
    };

    onDuration = duration => {
        this.setState({
            videoDuration: duration * 1000,
            ready: true,
            timeError: false,
        });
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

    playVideoCurrentTime = () => {
        if (this.reactVideoPlayer) {
            this.reactVideoPlayer.seekTo(
                this.state.currentTime / parseFloat("1000"),
                "seconds",
            );
        }
        this.setState({ playing: true });
    };

    reactRef = player => {
        this.reactVideoPlayer = player;
    };

    onProgress = ({ played, playedSeconds, loaded, loadedSeconds }) => {
        if (playedSeconds * 1000 > this.state.endTime) {
            if (this.reactVideoPlayer) {
                this.reactVideoPlayer.seekTo(
                    this.state.startTime / parseFloat("1000"),
                    "seconds",
                );
                this.setState({ currentTime: this.state.startTime });
            }
        } else {
            this.setState({ currentTime: playedSeconds * 1000 });
        }
    };

    renderYoutube() {
        if (!ReactPlayer.canPlay(this.props.videoUrl)) {
            return <ErrorMessage>{"Invalid Video Url"}</ErrorMessage>;
        }

        // const opts = {
        //   height: '390',
        //   playerVars: {
        //     // https://developers.google.com/youtube/player_parameters
        //     autoplay: 1,
        //     cc_load_policy: 0, // Hide closed captions
        //     controls: 1, // show controls
        //     end: this.state.endTime / parseFloat('1000'),
        //     fs: 1, // Hide the full screen button
        //     iv_load_policy: 3, // Hide the Video Annotations
        //     modestbranding: 1, // Hide the Youtube Logo
        //     rel: 0,
        //     start: this.state.startTime / parseFloat('1000')
        //   },
        //   width: '640'
        // };

        return (
            <YTContainer>
                {/* <PreviewHeader>Trimmer Sound</PreviewHeader> */}
                <ReactPlayer
                    ref={this.reactRef}
                    url={this.props.videoUrl}
                    onDuration={this.onDuration}
                    onProgress={this.onProgress}
                    progressInterval={100} // 1/10 milliesonds
                    controls={true}
                    playing={this.state.playing}
                    width={"400px"}
                    height={"240px"}
                />
            </YTContainer>
        );
    }

    render() {
        return (
            <PageContainer>
                {this.state.timeError && (
                    <ErrorMessage>
                        {
                            "Videos must be less then 10 minutes long. (Email support@blerp.com if you want longer videos)"
                        }
                    </ErrorMessage>
                )}
                {this.renderYoutube()}

                <UploadSlider
                    audioDuration={this.state.videoDuration}
                    onMoveAll={this.handleOnChangeAll}
                    onMoveEnd={this.handleOnChangeEnd}
                    onMoveStart={this.handleOnChangeStart}
                    startTime={this.state.startTime}
                    endTime={this.state.endTime}
                    currentTime={this.state.currentTime}
                    showCurrentTime={true}
                    playVideo={this.playVideo}
                    playVideoCurrentTime={this.playVideoCurrentTime}
                    pauseVideo={this.pauseVideo}
                    isPlaying={this.state.playing}
                    renderPlayPauseButtons={true}
                />

                {/* {this.renderSubmitButtons()} */}
            </PageContainer>
        );
    }
}
