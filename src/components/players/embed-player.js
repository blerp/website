/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import { randomBlerpColor } from "../../lib/helperFunctions";
import AudioButton, { ButtonModes } from "../buttons/data/wrapped-audio-button";

import ProgressBar from "../shared/ProgressBar/index";
import RealCheckboxContainer from "../shared/CheckboxContainer/index";

import {
    defaultBackground,
    flyoutBackground,
    secondaryGray,
    darkText,
} from "../../styles/colors";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const TopLeftTitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-self: flex-start;
    width: 50%;
`;

const AudioTitleContainer = styled.div`
    margin: 4px 8px 0;
    background-color: ${flyoutBackground};
    display: flex;
    align-items: center;
    flex-flow: column;
    flex-direction: column;
    border-radius: 6px;
    justify-content: center;
`;

const MainTitle = styled.span`
    font-weight: bold;
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: ${darkText};
    margin: 4px;
    user-select: all;
    text-align: left;
`;

const AudioButtonContainer = styled.div`
    position: relative;
    margin: 24px;
`;

const Scrim = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 260px;
    height: 260px;
    border-radius: 260px;
    background-color: ${props =>
        props.darker ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
`;

const CircleImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 260px;
    height: 260px;
    border-radius: 260px;
`;

const StyledAudioButton = styled(AudioButton)`
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
    width: 260px;
    height: 260px;
    border-radius: 160px;
`;

const StyledProgressBar = styled(ProgressBar)`
    align-self: flex-start;
    margin: 8px;
    width: 97%;
    border-radius: 6px;
`;

// interface Props {
//   id: string;
//   sources: string[];
//   imageUrl?: string;
//   title: string;
//   backgroundColor: string;
//   className?: string;
//   playCallback?: () => void;
// }

// interface State {
//   currentTime: number;
//   duration: number;
//   color: string;
//   repeatMode: boolean;
// }

const DefaultProps = {
    playCallback: () => {},
};

export default class EmbedPlayer extends React.Component {
    static defaultProps = DefaultProps;
    wrappedAudioComponent;
    state;
    props;

    constructor(props) {
        super(props);
        this.state = {
            color: randomBlerpColor(),
            currentTime: 0,
            duration: 0,
            repeatMode: false,
        };
    }

    toggleRepeatMode = () => {
        this.setState({
            repeatMode: !this.state.repeatMode,
        });
    };

    playFromProgressBar = event => {
        const bounds = event.target.getBoundingClientRect(); // get parent
        const x = event.clientX - bounds.left;
        const percentSpot = x / bounds.width;
        this.wrappedAudioComponent.handleSpotClick(percentSpot);
    };

    updateStateDuration = duration => {
        this.setState({ duration });
    };

    updateStateCurrentTime = currentTime => {
        this.setState({ currentTime });
    };

    innerRef = el => {
        this.wrappedAudioComponent = el;
    };

    onError = i => {
        i.target.style.display = "none";
    };

    render() {
        return (
            <MainContainer>
                <AudioTitleContainer {...this.props}>
                    <TopLeftTitleContainer>
                        <MainTitle>{this.props.title}</MainTitle>
                    </TopLeftTitleContainer>
                    <AudioButtonContainer>
                        <CircleImage
                            onError={this.onError}
                            src={this.props.imageUrl}
                        />
                        <Scrim darker={true} />
                        <StyledAudioButton
                            biteId={this.props.id}
                            ref={this.innerRef}
                            durationChangeCallback={this.updateStateDuration}
                            timeUpdateCallback={this.updateStateCurrentTime}
                            sources={this.props.sources}
                            preload={true}
                            showButton={true}
                            handleIncrementPlayCount={this.props.playCallback}
                            mode={
                                this.state.repeatMode
                                    ? ButtonModes.repeat
                                    : ButtonModes.play
                            }
                            useGlobalAudio={true}
                            size={"LARGE"}
                        />
                    </AudioButtonContainer>
                </AudioTitleContainer>
                <StyledProgressBar
                    color={this.state.color}
                    part={this.state.currentTime}
                    total={this.state.duration}
                    onPlayClick={this.playFromProgressBar}
                />
                <RealCheckboxContainer
                    checked={this.state.repeatMode}
                    color={this.state.color}
                    toggleChecked={this.toggleRepeatMode}
                    options={["Play", "Loop"]}
                />
            </MainContainer>
        );
    }
}
