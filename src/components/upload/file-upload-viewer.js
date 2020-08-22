/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import AudioButton, { ButtonModes } from "../buttons/audio-button";
import Button from "../buttons/button";
import UploadSlider from "./upload-slider";
import SecondaryButton from "../buttons/SecondaryButton";
import PinkButton from "../buttons/pink-button";

const StyledAudioButton = styled(AudioButton)`
    width: 100px;
    height: 100px;
    position: relative;
    background-color: #210000;
    border-radius: 60px;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MainTitle = styled.div`
    font-weight: bold;
    font-size: 20px;
    width: 240px;
    text-align: center;
    color: black;
    margin: 20px;
    user-select: all;
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
    border-radius: 8px;
    font-size: 16px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const ButtonInnerContainer = styled.div`
    padding: 8px;
`;

// interface Props {
//   title: string;
//   audioFile: File | undefined;
//   color: string;
//   backgroundColor: string;
//   className?: string;
//   duration?: number;
//   startTime?: number;
//   endTime?: number;
//   onFinished: (props: { startTime: number; endTime: number }) => void;
//   onCancel: () => void;
// }

// interface State {
//   duration: number;
//   audioUrl: string;
//   currentTime: number;
//   startTime: number;
//   placedEnd: boolean;
//   placedStart: boolean;
//   isPlaying: boolean;
//   endTime: number;
//   audioBuffer: AudioBuffer;
// }

const DefaultProps = {
    backgroundColor: "",
    color: "",
    onFinished: () => {},
    title: "",
};

export default class FileUploadViewer extends React.Component {
    static defaultProps = DefaultProps;
    audioElement;
    canvas;

    CANVAS_WIDTH = 840;
    CANVAS_HEIGHT = 200;
    AUDIOWAVE_COLOR = "#A1A1A1";
    AUDIO_BACKGROUND_COLOR = "1";

    state = {
        audioBuffer: null,
        duration: 0,
        audioUrl: URL.createObjectURL(this.props.audioFile),
        currentTime: this.props.startTime || 0,
        endTime: this.props.endTime || 300,
        isPlaying: false,
        placedEnd: false,
        placedStart: false,
        startTime: this.props.startTime || 0,
    };

    componentDidMount() {
        // TODO: Find a more efficient way to draw our audio wave on the component
        // const audioContext = new AudioContext();
        // let currentBuffer = null;
        // let arrayBuffer;
        // const fileReader = new FileReader();
        // fileReader.onload = (e: any) => {
        //   arrayBuffer = e.target.result;
        //   this.setState({ audioBuffer: arrayBuffer });
        //   audioContext.decodeAudioData(
        //     arrayBuffer,
        //     buffer => {
        //       currentBuffer = buffer;
        //       const leftChannel = currentBuffer.getChannelData(0); // Float32Array describing left channel
        //       const lineOpacity = this.CANVAS_WIDTH / leftChannel.length;
        //       const canvasCtx = this.canvas.getContext("2d");
        //       canvasCtx.save();
        //       canvasCtx.fillStyle = this.AUDIO_BACKGROUND_COLOR;
        //       canvasCtx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        //       canvasCtx.strokeStyle = this.AUDIOWAVE_COLOR;
        //       /*canvasCtx.globalCompositeOperation = "lighter";*/
        //       canvasCtx.translate(0, this.CANVAS_HEIGHT / 2);
        //       /*canvasCtx.globalAlpha = 1; // lineOpacity ;*/
        //       for (let i = 0; i < leftChannel.length; i++) {
        //         // on which line do we get ?
        //         const x = Math.floor(this.CANVAS_WIDTH * i / leftChannel.length);
        //         const y = leftChannel[i] * this.CANVAS_WIDTH / 2;
        //         canvasCtx.beginPath();
        //         canvasCtx.moveTo(x, 0);
        //         canvasCtx.lineTo(x + 1, y);
        //         canvasCtx.stroke();
        //       }
        //       canvasCtx.save();
        //     },
        //     this.onDecodeError
        //   );
        // };
        // fileReader.readAsArrayBuffer(this.props.audioFile);
    }

    drawLine() {
        const ctx = this.canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(300, 150);
        ctx.stroke();
    }

    onDoneButtonPressed = () => {
        this.props.onFinished({
            endTime: this.state.endTime,
            startTime: this.state.startTime,
        });
    };

    onDurationChange = duration => {
        this.setState({ duration: duration * parseFloat("1000") });
    };

    onTimeUpdate = time => {
        this.setState({ currentTime: time * parseFloat("1000") });
    };

    renderPreviewButton() {
        return (
            <StyledAudioButton
                biteId={this.props.title}
                sources={[this.state.audioUrl]}
                preload={true}
                startTime={this.state.startTime / parseFloat("1000")}
                endTime={this.state.endTime / parseFloat("1000")}
                durationChangeCallback={this.onDurationChange}
                mode={ButtonModes.play}
                useGlobalAudio={false}
                timeUpdateCallback={this.onTimeUpdate}
                showButton={true}
                doNotSwitchToSpam={true}
            />
        );
    }

    handleOnChangeAll = ({ values }) => {
        this.setState({
            endTime: values[1],
            startTime: values[0],
            currentTime: values[0],
        });
    };

    handleOnChangeStart = ({ time, spot }) => {
        this.setState({
            startTime: time,
            currentTime: time,
        });
    };

    handleOnChangeEnd = ({ time, spot }) => {
        this.setState({
            endTime: time,
        });
    };

    renderSubmitButtons() {
        return (
            <ButtonContainer>
                {/* <ButtonInnerContainer>
          <SecondaryButton onClick={this.props.onCancel} disabled={false}>
            Start Over
          </SecondaryButton>
        </ButtonInnerContainer> */}
                <ButtonInnerContainer>
                    <PinkButton
                        onClick={this.onDoneButtonPressed}
                        disabled={!this.state.endTime}
                    >
                        Continue
                    </PinkButton>
                </ButtonInnerContainer>
            </ButtonContainer>
        );
    }

    render() {
        return (
            <MainContainer>
                {this.renderPreviewButton()}
                <MainTitle>Clip Your Audio Clip! (10 Seconds Max)</MainTitle>
                <UploadSlider
                    audioDuration={this.state.duration}
                    onMoveAll={this.handleOnChangeAll}
                    onMoveEnd={this.handleOnChangeEnd}
                    onMoveStart={this.handleOnChangeStart}
                    startTime={this.state.startTime}
                    endTime={this.state.endTime}
                    currentTime={this.state.currentTime}
                    showCurrentTime={true}
                    renderPlayPauseButtons={false}
                />
                {this.renderSubmitButtons()}
            </MainContainer>
        );
    }
}
