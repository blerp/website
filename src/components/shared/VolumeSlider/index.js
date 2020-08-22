/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import "isomorphic-fetch";

import * as React from "react";
import Slider from "react-slider-simple";

import { graphql } from "@apollo/client";
import { flowRight as compose } from "lodash";

import styled from "styled-components";

import VolumeIcon from "../../icons/volume-icon";

import { randomBlerpColor } from "../../../lib/helperFunctions";
import {
    lightGray,
    pandaPink,
    secondaryGray,
    secondaryText,
} from "../../../styles/colors";

const VolumeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const VolumeIconButton = styled.button`
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    width: 40px;
    height: 40px;
    border: none;
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;

    &:active {
        opacity: 0.7;
    }

    &:hover {
        opacity: 0.8;
        transition: all 0.2s ease 0s;
    }
`;

const VolumeBarContainer = styled.div`
    width: 120px; /* Specific width is required for Firefox. */
`;

// interface Props {
//   onVolumeSelect?: (props: { volume: any }) => {};
//   defaultVolume?: number;
//   maxVolume?: number;
//   minVolume?: number;
//   step?: number;
//   className?: any;
//   setGlobalVolume?: any;
// }

// interface State {
//   volume: number;
//   color: string;
//   isMuted: boolean;
//   lastVolume: number;
// }

const DefaultProps = {
    maxVolume: 1.0,
    minVolume: 0,
    onVolumeSelect: () => {},
    step: 0.01,
};

class VolumeSlider extends React.Component {
    static defaultProps = DefaultProps;
    menuElement;
    props = DefaultProps;
    state;

    constructor(props) {
        super(props);

        this.state = {
            color: randomBlerpColor(),
            isMuted: false,
            lastVolume: props.defaultVolume || 1,
            volume: props.defaultVolume || 1,
        };
    }

    onSelectClick = event => {};

    toggleMute = () => {
        this.setState(
            {
                isMuted: !this.state.isMuted,
                lastVolume: this.state.volume,
                volume: !this.state.isMuted ? 0 : this.state.lastVolume,
            },
            () => {
                this.props.setGlobalVolume({
                    variables: {
                        volume: this.state.volume,
                    },
                });
            },
        );
    };

    changingVolume = percent => {
        const newVolume = (percent / 100.0) * this.props.maxVolume;
        this.setState({
            isMuted: false,
            volume: newVolume,
        });
    };

    changedVolume = percent => {
        const newVolume = (percent / 100.0) * this.props.maxVolume;
        this.setState({
            isMuted: false,
            volume: newVolume,
        });
        this.props.setGlobalVolume({
            variables: {
                volume: newVolume,
            },
        });
    };

    render() {
        const calculatePercent =
            (this.state.volume / this.props.maxVolume) * 100;
        return (
            <VolumeContainer className={this.props.className}>
                <VolumeIconButton onClick={this.toggleMute}>
                    <VolumeIcon isMuted={this.state.isMuted} />
                </VolumeIconButton>
                <VolumeBarContainer>
                    <Slider
                        value={calculatePercent}
                        onChange={this.changingVolume}
                        onDone={this.changedVolume}
                        rounded={true}
                        thumbColor={pandaPink}
                        shadowColor={secondaryGray}
                        sliderPathColor={lightGray}
                    />
                </VolumeBarContainer>
            </VolumeContainer>
        );
    }
}

const setGlobalVolume = gql`
    mutation setGlobalVolumeFromWebVolume($volume: Int!) {
        setGlobalVolume(volume: $volume) @client
    }
`;

export default compose(
    graphql(setGlobalVolume, {
        name: "setGlobalVolume",
    }),
)(VolumeSlider);
