/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import SecondaryButton from "../buttons/SecondaryButton";
import * as React from "react";
import styled from "styled-components";

import {
    flyoutBackground,
    bodyText,
    headerText,
    secondarySubtitleText,
    pandaPink,
    pandaNewTeal,
} from "../../styles/colors";

const RowContainerContainer = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const RowContainerContainerStart = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const ColumnContainer = styled.div`
    width: 100%;
    background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : "transparent"};
    display: flex;
    flex-direction: column;
    padding: 12px;
    position: relative;
    align-items: center;
    justify-content: center;

    @media (max-width: 600px) {
        padding: 8px;
    }
`;

const TextSubtitle = styled.p`
    color: ${secondarySubtitleText};
    text-align: ${props => props.alignment};
    font-weight: normal;
    padding: 8px;
    margin: 0;
    font-size: 24px;
    z-index: 1;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 16px;
        width: 240px;
    }
`;

const ImageContainer = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    cursor: pointer;
    padding: 8px;
`;

const OnlineCircle = styled.div`
    position: absolute;
    top: -2px;
    left: -2px;
    width: 16px;
    height: 16px;
    border-radius: 20px;
    background-color: ${pandaNewTeal};
    border: ${props => props.onlineBorder} 3px solid;
    z-index: 1;
`;

const Thumbnail = styled.img`
    height: 180px;
    border-radius: 4px;
    border: ${props => props.onlineBorder} 2px solid;
    z-index: 1;
    cursor: pointer;
`;

const TwitchMainStreamer = styled.img`
    width: 60px;
    height: 60px;
    align-self: center;
    white-space: nowrap;
    border-radius: 12px;
`;

const HeaderText = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: ${props => props.color};
    text-align: center;
    margin: 8px;
`;

const ThinTextLarge = styled.div`
    font-weight: lighter;
    font-size: 24px;
    color: ${pandaPink};
    text-align: center;
`;

const StyledButton = styled(SecondaryButton)`
    cursor: pointer;
`;

export default class StreamerItem extends React.Component {
    props;

    render() {
        let matchedThumbnail = this.props.thumbnailUrl
            ? this.props.thumbnailUrl
            : "";
        matchedThumbnail = matchedThumbnail.replace(
            new RegExp("{width}", "gi"),
            300,
        );
        matchedThumbnail = matchedThumbnail.replace(
            new RegExp("{height}", "gi"),
            200,
        );

        return (
            <RowContainerContainer>
                <ColumnContainer>
                    {/* <TextSubtitle>Streamer of the Week</TextSubtitle> */}
                    <RowContainerContainerStart>
                        <ThinTextLarge>{`# ${this.props.rankNumber}`}</ThinTextLarge>

                        <ImageContainer
                            onClick={() => {
                                this.props.logAction({
                                    action: "TWITCH_STREAM_TO_USER_STREAM",
                                    event: "TWITCH_WEBSITE_EVENT",
                                    data: {
                                        imageClick: true,
                                        twitchUserName: this.props.userName,
                                        twitchUserOnline: this.props
                                            .isStreamOnline,
                                    },
                                });
                                window.open(
                                    `https://twitch.tv/${this.props.userName}`,
                                    "_blank",
                                );
                            }}
                        >
                            {this.props.isStreamOnline && (
                                <OnlineCircle
                                    onlineBorder={this.props.onlineBorder}
                                />
                            )}
                            <TwitchMainStreamer src={this.props.logo} />
                        </ImageContainer>

                        <HeaderText color={headerText}>
                            {this.props.displayName}
                        </HeaderText>
                    </RowContainerContainerStart>
                    {!!this.props.thumbnailUrl && (
                        <Thumbnail
                            onClick={() => {
                                this.props.logAction({
                                    action: "TWITCH_STREAM_TO_USER_STREAM",
                                    event: "TWITCH_WEBSITE_EVENT",
                                    data: {
                                        imageClick: true,
                                        twitchUserName: this.props.userName,
                                        twitchUserOnline: this.props
                                            .isStreamOnline,
                                    },
                                });
                                window.open(
                                    `https://twitch.tv/${this.props.userName}`,
                                    "_blank",
                                );
                            }}
                            src={matchedThumbnail}
                        />
                    )}

                    {/* <TextSubtitle>Weekly Blerp Bits</TextSubtitle>
          <ThinTextLarge>{`${this.props.weeklyBlerpBits}`}</ThinTextLarge> */}
                    {/* <StyleLinkSmall href={`${hostDomain}/user/${data.web.getCreatorListByTitle.userObjects[0]._id}`}>{"View Profile"}</StyleLinkSmall> */}
                </ColumnContainer>
            </RowContainerContainer>
        );
    }
}
