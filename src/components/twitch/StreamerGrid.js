/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import List from "@researchgate/react-intersection-list";

import StreamerItem from "./StreamerItem";

import * as React from "react";
import styled from "styled-components";
import { flyoutBackground } from "../../styles/colors";
import withLogging from "../../lib/withLogging";

const GridContainer = styled.div`
    width: 100%;
    max-width: 1400px;
    align-self: center;
`;

const ContentContainerGrid = styled.div`
    display: grid;
    grid: minmax(auto, max-content) / repeat(auto-fill, 400px);
    grid-gap: 24px;
    justify-content: center;
    padding: 20px;
`;

const itemsRenderer = (items, ref) => (
    <ContentContainerGrid ref={ref} role='region' aria-labelledby='recent'>
        {items}
    </ContentContainerGrid>
);

class StreamerGrid extends React.Component {
    props;
    render() {
        return (
            <GridContainer>
                <List
                    itemCount={this.props.streamers.length}
                    itemsRenderer={itemsRenderer}
                    onIntersection={this.props.listLoadMore}
                    threshold={"60%"}
                >
                    {(index, key) => {
                        const streamer = this.props.streamers[index];
                        if (streamer) {
                            return (
                                <StreamerItem
                                    key={key}
                                    logo={streamer.logo}
                                    displayName={streamer.display_name}
                                    userName={streamer.name}
                                    weeklyBlerpBits={streamer.weeklyBlerpBits}
                                    rankNumber={index + 1}
                                    isStreamOnline={streamer.isStreamOnline}
                                    onlineBorder={flyoutBackground}
                                    logAction={this.props.logAction}
                                    thumbnailUrl={streamer.thumbnailUrl}
                                />
                            );
                        }
                    }}
                </List>
            </GridContainer>
        );
    }
}

export default withLogging(StreamerGrid);
