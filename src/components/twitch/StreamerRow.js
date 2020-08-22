/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import HorizontalList from "../lists/HorizontalList";
import StreamerItem from "./StreamerItem";
import { lightGray } from "../../styles/colors";
import withLogging from "../../lib/withLogging";

const Container = styled.div`
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    width: 88%;
    margin: 8px;
`;

const RowContainer = styled.div``;

class StreamerRow extends React.Component {
    props;

    renderStreamers = streamers => (index, key) => {
        const streamer = streamers[index];
        return (
            <RowContainer key={index}>
                <StreamerItem
                    key={key}
                    logo={streamer.logo}
                    displayName={streamer.display_name}
                    userName={streamer.name}
                    weeklyBlerpBits={streamer.weeklyBlerpBits}
                    rankNumber={index + 1}
                    isStreamOnline={streamer.isStreamOnline}
                    thumbnailUrl={streamer.thumbnailUrl}
                    onlineBorder={lightGray}
                    logAction={this.props.logAction}
                />
            </RowContainer>
        );
    };

    render() {
        if (this.props.streamers.length === 0) {
            return <div />;
        }
        return (
            <Container>
                <HorizontalList
                    length={this.props.streamers.length}
                    renderListItems={this.renderStreamers(this.props.streamers)}
                    showArrows={true}
                    isGrayButton={this.props.isGrayButton}
                />
            </Container>
        );
    }
}

export default withLogging(StreamerRow);
