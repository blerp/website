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
import FavoriteStarButton from "../shared/FavoriteStarButton";

import ProgressBar from "../shared/ProgressBar";
import RealCheckboxContainer from "../shared/CheckboxContainer";

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

const StyledFavoriteButton = styled(FavoriteStarButton)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 40px;
    height: 20px;
    border: none;
    background-color: transparent;
    background-position: center;
    text-decoration: none;
    opacity: 0.7;
    transform: translate(0, 0);

    @media (max-width: 600px) {
        width: 40px;
        height: 20px;
    }

    &:hover {
        opacity: 0.9;
    }

    &:focus {
        border: none;
    }
`;

const MainTitle = styled.h1`
    font-weight: bold;
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: ${darkText};
    margin: 4px;
    user-select: all;
    text-align: left;
    z-index: 10;
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
    cursor: pointer;
`;

// interface Props {
//   id: string;
//   sources: string[];
//   imageUrl?: string;
//   title: string;
//   backgroundColor: string;
//   className?: string;
//   playCallback?: () => void;
//   favorited?: boolean;
//   loggedIn?: boolean;
// }

// interface State {
//   currentTime;
//   duration;
//   color: string;
//   repeatMode: boolean;
// }

const DefaultProps = {
    playCallback: () => {},
};

export default class AudioContainer extends React.Component {
    static defaultProps = DefaultProps;
    wrappedAudioComponent;
    state = {
        color: randomBlerpColor(),
        currentTime: 0,
        duration: 0,
        repeatMode: false,
    };

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
                        <StyledFavoriteButton
                            biteId={this.props.id}
                            loggedIn={this.props.loggedIn}
                            favorited={this.props.favorited}
                        />
                    </TopLeftTitleContainer>
                    <AudioButtonContainer>
                        <CircleImage
                            onError={this.onError}
                            src={this.props.imageUrl}
                            alt={this.props.title}
                        />
                        {/* <Scrim darker={true} /> */}
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
