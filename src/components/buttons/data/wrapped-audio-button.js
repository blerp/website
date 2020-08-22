/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { Mutation, Query } from "@apollo/client/react/components";

import InnerAudioButton from "../audio-button";
export { ButtonModes } from "../audio-button";
import StopIcon from "../../icons/new-stop-icon";
import { Icon } from "../../theme/Icon";

const Container = styled.div``;

const GET_GLOBAL_ITEMS = gql`
    query grabGlobalItemsOnClient {
        globalVolume @client
        globalSrcId @client
    }
`;

const PLAY_BITE_WEB = gql`
    mutation websiteIncrementPlayCountOnServer(
        $id: MongoID!
        $playlistId: MongoID
        $featuredPage: String
    ) {
        web {
            bitePlay(
                _id: $id
                playlistId: $playlistId
                analytics: { data: { featured: $featuredPage } }
            ) {
                _id
            }
        }
    }
`;

const SET_SRC_WEB = gql`
    mutation webSetGlobalSrc($id: String!) {
        setGlobalSrc(id: $id) @client
    }
`;

// interface Props {
//   title?: string;
//   biteId?: string;
//   sources?: string[];
//   showButton?: boolean;
//   className?: string;
//   preload?: boolean;
//   durationChangeCallback?: (duration: number) => number | void;
//   timeUpdateCallback?: (time: number) => number | void;
//   handleIncrementPlayCount?: any;
//   incrementPlayCountOnServer?: any;
//   mode?: string; // Mode can be PLAY, SPAM or REPEAT
//   stopCallBack?: () => void;
//   handlePlayCallback?: (biteId?: any) => void;
//   startTime?: number;
//   endTime?: number;
//   hotkey?: boolean;
//   keycode?: number; // required for hotkey mode
//   useGlobalAudio?: boolean;
//   size?: string;
//   featuredPage?: string;
//   doNotLogPlay?: boolean;
//   doNotSwitchToSpam?: boolean;
// }

const DefaultProps = {
    durationChangeCallback: () => {},
    endTime: 0,
    mode: "PLAY",
    preload: false,
    startTime: 0,
    stopCallBack: () => {},
    timeUpdateCallback: () => {},
    volume: 1.0,
    sources: [],
};

export class AudioButton extends React.Component {
    static defaultProps = DefaultProps;
    props;
    audioButton;

    handleIncrementPlayCount = mutationCall => () => {
        mutationCall({
            variables: {
                id: this.props.biteId,
                playlistId: this.props.playlistId || null,
                featuredPage: this.props.featuredPage || "UNKNOWN",
            },
        });
        if (this.props.handleIncrementPlayCount) {
            this.props.handleIncrementPlayCount();
        }
    };

    handlePlayCallback = mutationCall => biteId => {
        mutationCall({
            variables: {
                id: biteId,
            },
        });
        if (this.props.handlePlayCallback) {
            this.props.handlePlayCallback();
        }
    };

    handleSpotClick = percentSpot => {
        this.audioButton.handleSpotClick(percentSpot);
    };

    innerRef = el => {
        this.audioButton = el;
    };

    render() {
        return (
            <Container className={this.props.className}>
                <Query query={GET_GLOBAL_ITEMS}>
                    {({ loading, error, data }) => {
                        return (
                            <Mutation mutation={PLAY_BITE_WEB}>
                                {webincrementPlayCountOnServer => (
                                    <Mutation mutation={SET_SRC_WEB}>
                                        {webSetGlobalSrc => (
                                            <InnerAudioButton
                                                ref={this.innerRef}
                                                title={this.props.title}
                                                biteId={this.props.biteId}
                                                sources={this.props.sources}
                                                showButton={true}
                                                preload={this.props.preload}
                                                durationChangeCallback={
                                                    this.props
                                                        .durationChangeCallback
                                                }
                                                timeUpdateCallback={
                                                    this.props
                                                        .timeUpdateCallback
                                                }
                                                stopCallBack={
                                                    this.props.stopCallBack
                                                }
                                                startTime={this.props.startTime}
                                                endTime={this.props.endTime}
                                                hotkey={this.props.hotkey}
                                                keycode={this.props.keycode} // required for hotkey mode
                                                volume={
                                                    (data &&
                                                        data.globalVolume) ||
                                                    (data &&
                                                        data.globalVolume === 0)
                                                        ? data.globalVolume
                                                        : 1.0
                                                }
                                                handleIncrementPlayCount={this.handleIncrementPlayCount(
                                                    webincrementPlayCountOnServer,
                                                )}
                                                handlePlayCallback={this.handlePlayCallback(
                                                    webSetGlobalSrc,
                                                )}
                                                mode={this.props.mode}
                                                globalSrcId={
                                                    data && data.globalSrcId
                                                }
                                                useGlobalAudio={
                                                    this.props.useGlobalAudio
                                                }
                                                size={this.props.size}
                                                doNotLogPlay={
                                                    this.props.doNotLogPlay
                                                }
                                                doNotSwitchToSpam={
                                                    this.props.doNotSwitchToSpam
                                                }
                                            />
                                        )}
                                    </Mutation>
                                )}
                            </Mutation>
                        );
                    }}
                </Query>
            </Container>
        );
    }
}

export default AudioButton;
