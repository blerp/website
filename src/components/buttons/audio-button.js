/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { keyframes } from "styled-components";

import { randomBlerpColor } from "../../lib/helperFunctions";

import PlayIcon from "../icons/new-play-icon";
import StopIcon from "../icons/new-stop-icon";
import SpamIcon from "../icons/new-spam-icon";
import SecondaryStopIcon from "../icons/secondary-stop-icon";

import { logEvent } from "../../lib/analytics";

import GlobalAudioPlayer from "../players/global-audio-player";

// Graphql items
import "isomorphic-fetch";

const bounceOut = color => keyframes`
  0% {
    transform: scale(1.0);
  }

  25% {
    transform: scale(1.2);
  }

  50% {
  }

  75% {
  }

  100% {
    transform: scale(1);
  }
`;

// radial-gradient(
//     circle,
//     transparent 1%,
//     ${props => props.color} 1%
//   )
//   center/15000%;

const AudioButtonSquareContainer = styled.button`
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;
    position: absolute;
    border: none;
    background-color: transparent;
    overflow: visible;
    width: 100%;
    height: 100%;
    opacity: ${props => (props.showButton ? 1 : 0)};

    &:focus {
        animation: ${props => bounceOut(props.color)} 0.2s 1;
        border-radius: 50%;
        border: none !important;
    }

    &:focus .blerp-audio-button-child {
        opacity: 1;
    }

    &:hover .blerp-audio-button-child {
        transition: all 0.2s ease 0s;
        opacity: 1;
    }

    &:active .blerp-audio-button-child {
        background-color: ${props =>
            props.color ? props.color : "transparent"};
        background-size: 100%;
        transition: background 0;
        opacity: 0.8;
        animation: ${props => bounceOut(props.color)} 0.2s 1;
    }
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    opacity: 0.9;
`;

const PreviewButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    background-color: transparent;
    width: ${props => (props.size === ButtonSizes.large ? "160px" : "60px")};
    height: ${props => (props.size === ButtonSizes.large ? "160px" : "60px")};
    fill: rgba(255, 255, 255, 1);
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;
    opacity: ${props => (props.showButton ? 1 : 1)};

    &:focus {
        opacity: 1;
        outline: none;
    }
`;

const StyledStopButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid ${props => props.theme.flyoutBackground};
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;

    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%) scale(1);
    opacity: 0;

    z-index: 1001;

    background-color: ${props => props.theme.grey3};

    transition: 0.2s;
    transition: opacity 0.2s 2s;

    &:hover {
        background-color: ${props => props.theme.ibisRed};
    }

    &:active {
        transform: translate(-50%, 50%) scale(0.9);
        background-color: ${props => props.theme.grey4};
        border: 4px solid ${props => props.theme.flyoutBackground};
    }

    &:focus {
        border: 4px solid ${props => props.theme.flyoutBackground};
    }
`;

export const ButtonModes = { play: "PLAY", spam: "SPAM", repeat: "REPEAT" };
export const ButtonSizes = { small: "SMALL", medium: "MEDIUM", large: "LARGE" };

// interface Props {
//   title?: string;
//   biteId?: string;
//   sources: string[];
//   showButton?: boolean;
//   className?: string;
//   preload?: boolean;
//   durationChangeCallback?: (duration: number) => number | void;
//   timeUpdateCallback?: (time: number) => number | void;
//   handleIncrementPlayCount?: any;
//   mode?: string; // Mode can be PLAY, SPAM or REPEAT
//   handlePlayCallback?: (biteId?: any) => void;
//   stopCallBack?: () => void;
//   startTime?: number;
//   endTime?: number;
//   hotkey?: boolean;
//   keycode?: number; // required for hotkey mode
//   volume?: any;
//   useGlobalAudio?: boolean;
//   globalSrcId?: string;
//   size?: string;
//   doNotLogPlay?: boolean;
//   doNotSwitchToSpam?: boolean;
// }

// interface State {
//   color: string;
//   isPlaying: boolean;
//   mode: string;
//   duration: number;
// }

// NOTE: Playing from remote sources will set the volume to zero so that the web can keep track of the item
const DefaultProps = {
    durationChangeCallback: () => {},
    endTime: 0,
    size: ButtonSizes.medium,
    mode: ButtonModes.play,
    preload: false,
    startTime: 0,
    stopCallBack: () => {},
    timeUpdateCallback: () => {},
    volume: 1.0,
    useGlobalAudio: true,
};

export class AudioButton extends React.Component {
    static defaultProps = DefaultProps;
    DEFAULT_COLOR = "#383838";
    audioElement;
    props;
    state;

    constructor(props) {
        super(props);
        this.state = {
            color: this.DEFAULT_COLOR,
            isPlaying: false,
            mode: props.mode,
            duration: 1,
        };
    }

    setButtonColor = () => {
        if (this.state.color === this.DEFAULT_COLOR) {
            this.setState({ color: randomBlerpColor() });
        }
    };

    hotKeyClickButton = event => {
        if (this.props.hotkey && this.props.keycode === event.keyCode) {
            this.handleAudioClicks();
            logEvent(
                "Board",
                "Board-HotKey-Press",
                `${this.props.title} : ${this.props.biteId}`,
                event.keyCode,
            );
        }
    };

    componentDidMount() {
        if (this.state.mode === ButtonModes.repeat && !this.state.isPlaying) {
            this.handlePlayClick();
        }
        if (this.props.hotkey) {
            document.addEventListener("keydown", this.hotKeyClickButton);
        }
    }

    componentWillUnmount() {
        if (this.props.hotkey) {
            this.audioElement = null;
            document.removeEventListener("keydown", this.hotKeyClickButton);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.mode === ButtonModes.repeat && !this.state.isPlaying) {
            this.handlePlayClick();
        }
        if (
            (nextProps && nextProps.volume && this.audioElement) ||
            (nextProps && nextProps.volume === 0 && this.audioElement)
        ) {
            this.audioElement.volume = nextProps.volume;
        }

        if (
            nextProps.biteId !== this.props.biteId ||
            nextProps.mode !== this.props.mode
        ) {
            this.handleStopClick();
            this.setState({ mode: ButtonModes.play });
        }

        // If this button is linked up to a global source and its not the current one stop it
        if (
            nextProps &&
            nextProps.useGlobalAudio &&
            nextProps.globalSrcId &&
            nextProps.globalSrcId !== this.props.biteId &&
            this.audioElement &&
            (this.state.mode !== ButtonModes.play || this.state.isPlaying)
        ) {
            this.setState({ isPlaying: false, mode: ButtonModes.play }); // NOTE: This is what changes it to a blerp button after
        }
    }

    incrementPlayCountMethod = () => {
        if (this.props.doNotLogPlay) {
            return;
        }
        try {
            this.props.handleIncrementPlayCount();
        } catch (err) {
            // console.log("ERROR", err);
        }
    };

    setupAudioElement = () => {
        this.audioElement = GlobalAudioPlayer.setupAudioElement({
            sources: this.props.sources,
            onDurationChange: this.onDurationChange,
            handleStopClick: this.handleStopClick,
            onTimeUpdate: this.onTimeUpdate,
            isRepeat: this.state.mode === ButtonModes.repeat,
            isPreload: this.props.preload,
        });
    };

    handlePlayClick = () => {
        if (this.props.handlePlayCallback) {
            this.props.handlePlayCallback(this.props.biteId);
        }
        if (this.props.useGlobalAudio) {
            this.setupAudioElement();
        }
        this.audioElement.currentTime = this.props.startTime;
        this.setState({ isPlaying: true });
        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
            playPromise
                .then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    console.log("playing failed witihin", error);
                });
        }

        this.incrementPlayCountMethod();
    };

    handleSpotClick = spotFraction => {
        if (this.props.useGlobalAudio) {
            this.setupAudioElement();
        }

        this.audioElement.currentTime = this.state.duration * spotFraction;
        this.setState({ isPlaying: true });
        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
            playPromise
                .then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    console.log("playing failed witihin", error);
                });
        }
        this.incrementPlayCountMethod();
    };

    stopAllClicks = () => {
        const sounds = document.getElementsByTagName("audio");
        for (let i = 0; i < sounds.length; i++) {
            if (sounds[i]) {
                sounds[i].pause();
                sounds[i].currentTime = 0;
            }
        }
    };

    handleAudioClicks = () => {
        this.setButtonColor();
        if (this.state.mode === ButtonModes.repeat) {
            this.handlePlayClick();
            logEvent(
                "Bite",
                "Repeat-Click",
                `${this.props.title} : ${this.props.biteId}`,
            );
            return;
        } else if (this.state.mode === ButtonModes.spam) {
            this.handlePlayClick();
            logEvent(
                "Bite",
                `${this.state.mode}-Click`,
                `${this.props.title} : ${this.props.biteId}`,
            );
        } else if (!this.state.isPlaying) {
            this.handlePlayClick();
            logEvent(
                "Bite",
                `${this.state.mode}-Click`,
                `${this.props.title} : ${this.props.biteId}`,
            );
        } else if (this.state.isPlaying) {
            this.handleStopClick();
            logEvent(
                "Bite",
                "Stop-Click",
                `${this.props.title} : ${this.props.biteId}`,
            );
        }
    };

    handleStopClick = () => {
        if (this.props.doNotSwitchToSpam) {
            this.setState({ isPlaying: false });
        } else {
            this.setState({ isPlaying: false, mode: ButtonModes.spam }); // NOTE: This is what changes it to a blerp button after
        }
        if (!this.audioElement) {
            return;
        }
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = this.props.startTime; // By default start time is 0
        }
        if (this.props.stopCallBack) {
            this.props.stopCallBack();
        }
    };

    onDurationChange = () => {
        this.setState({ duration: this.audioElement.duration });
        const currentDuration = this.audioElement.duration || 0;
        if (this.props.durationChangeCallback) {
            this.props.durationChangeCallback(currentDuration);
        }
    };

    onTimeUpdate = () => {
        const currentTime = this.audioElement.currentTime || 0;
        // If there is an endTime set then check if we passed it
        if (this.props.endTime) {
            if (this.props.endTime <= this.audioElement.currentTime) {
                this.handleStopClick();
            }
        }
        if (this.props.timeUpdateCallback) {
            this.props.timeUpdateCallback(currentTime);
        }
    };

    getAriaLabel = () => {
        if (this.state.mode === ButtonModes.play && this.state.isPlaying) {
            return "Stop";
        }
        return "Play";
    };

    renderIcon() {
        let Icon;
        if (this.state.mode !== ButtonModes.play) {
            Icon = SpamIcon;
        } else if (this.state.isPlaying) {
            Icon = StopIcon;
        } else {
            Icon = PlayIcon;
        }
        return (
            <IconContainer>
                <Icon />
            </IconContainer>
        );
    }

    renderStopIcon() {
        if (this.state.mode !== ButtonModes.play) {
            return (
                <>
                    <StyledStopButton
                        className='blerp-stop-button'
                        onClick={() => {
                            this.handleStopClick();
                        }}
                    >
                        <SecondaryStopIcon />
                    </StyledStopButton>
                </>
            );
        }
    }

    renderSources() {
        return this.props.sources.map((source, index) => {
            return <source key={index} src={source} />;
        });
    }

    onHandleRef = input => {
        this.audioElement = input;
    };

    renderLocalAudioTag() {
        if (this.props.useGlobalAudio) {
            return;
        }
        return (
            <audio
                ref={this.onHandleRef}
                onEnded={this.handleStopClick}
                onPause={this.handleStopClick}
                onDurationChange={this.onDurationChange}
                onTimeUpdate={this.onTimeUpdate}
                preload={this.props.preload ? "auto" : "none"}
                loop={this.props.mode === ButtonModes.repeat}
            >
                {this.renderSources()}
            </audio>
        );
    }

    render() {
        return (
            <>
                <AudioButtonSquareContainer
                    className={`blerp-audio-button ${this.props.className}`}
                    aria-label={this.getAriaLabel()}
                    onClick={this.handleAudioClicks}
                    showButton={this.props.showButton || this.state.isPlaying}
                    color={this.state.color}
                >
                    <PreviewButton
                        size={this.props.size}
                        className='blerp-audio-button-child'
                        showButton={
                            this.props.showButton || this.state.isPlaying
                        }
                    >
                        {this.renderIcon()}
                        {this.renderLocalAudioTag()}
                    </PreviewButton>
                </AudioButtonSquareContainer>
                {this.renderStopIcon()}
            </>
        );
    }
}

export default AudioButton;
