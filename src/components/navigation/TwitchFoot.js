/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import CircleSocialButton from "../buttons/circle-social-button";
import DarkThemeButton from "../buttons/DarkThemeButton";

import projectConfig from "../../config";
const currentHost = projectConfig.host;
import withLogging from "../../lib/withLogging";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    headerText,
    iconsActive,
    lighterDarkText,
    darkBlue,
    bodyText,
} from "../../styles/colors";

const Container = styled.div`
    position: relative;
    bottom: 0;
    z-index: 1000;
    background-color: ${bodyText};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 0;
    text-align: center;
`;

const SocialContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 0;
`;

const InformationContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 16px;

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
`;

const Column = styled.div`
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 8px;
    align-items: center;
`;

const Link = styled.a`
    display: block;
    text-decoration: none;
    padding: 4px;
    color: ${headerText};

    &:hover {
        color: ${pandaPink};
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: ${pandaPink};
        transition: all 0.2s ease 0s;
    }
`;

const HeadingText = styled.a`
    font-weight: bold;
    display: block;
    padding: 12px;
    font-size: 24px;
    display: block;
    padding: 4px;
    marging: 4px;
    color: ${flyoutBackground};
    text-align: center;
    width: 100%;
`;

const SubHeadingText = styled.a`
    font-weight: bold;
    display: block;
    padding: 12px;
    font-size: 16px;
    display: block;
    color: ${flyoutBackground};
`;

const SubHeadingTextLight = styled.a`
    font-weight: lighter;
    display: block;
    font-size: 20px;
    display: block;
    color: ${flyoutBackground};
    text-align: center;
    width: 100%;
`;

const MarginContainer = styled.div`
    margin: 12px;
`;

const StyleLinkSmall = styled.a`
    font-weight: 600;
    text-align: center;
    font-size: 20px;
    line-height: 20px;
    text-decoration: underline;
    color: ${darkBlue};
    white-space: nowrap;
    margin: 4px;
    cursor: pointer;
`;

const navigateToWalkOn = props => () => {
    props.logAction({
        action: "TWITCH_FOOTER_TO_WALKON_EXTENSION",
        event: "TWITCH_WEBSITE_EVENT",
        data: {},
    });
    window.location.href = `${currentHost}/twitch-walkon`;
};

const navigateToTwitchStream = props => () => {
    props.logAction({
        action: "TWITCH_FOOTER_TO_MAIN_EXTENSION",
        event: "TWITCH_WEBSITE_EVENT",
        data: {},
    });
    window.open(
        "https://dashboard.twitch.tv/extensions/oafn7vvzfyzyccwrwrt233221oe5wq",
        "_blank",
    );
};

const navigateToTwitchStreamersPage = props => () => {
    props.logAction({
        action: "TWITCH_FOOTER_TO_STREAMS_PAGE",
        event: "TWITCH_WEBSITE_EVENT",
        data: {},
    });
    window.location.href = `${currentHost}/streams`;
};

const TwitchFoot = props => (
    <Container className={props.className}>
        <Column>
            <MarginContainer>
                <HeadingText>Twitch Extensions</HeadingText>
            </MarginContainer>
            <SubHeadingTextLight>
                Sign up for an account and install one of the Blerp twitch
                extensions
            </SubHeadingTextLight>
            <StyleLinkSmall onClick={navigateToTwitchStreamersPage(props)}>
                for a chance to get ranked
            </StyleLinkSmall>
        </Column>

        <InformationContainer>
            <Column>
                <SocialContainer>
                    <CircleSocialButton
                        alt='Blerp for Twitch Extension'
                        link={`https://dashboard.twitch.tv/extensions/oafn7vvzfyzyccwrwrt233221oe5wq`}
                        image='https://storage.googleapis.com/blerp_products/Web/Streamer/blerpyicon.svg'
                    />
                    <SubHeadingText>Blerp for Twitch</SubHeadingText>
                    <DarkThemeButton onClick={navigateToTwitchStream(props)}>
                        {"View Extension"}
                    </DarkThemeButton>
                </SocialContainer>
            </Column>

            <Column>
                <SocialContainer>
                    <CircleSocialButton
                        alt='Walk On twitch Extension'
                        link={`${currentHost}/twitch-walkon`}
                        image='https://storage.googleapis.com/blerp_products/Web/Streamer/WalkonOverlayIconLight.svg'
                    />
                    <SubHeadingText>Walk On Sounds</SubHeadingText>
                    <DarkThemeButton onClick={navigateToWalkOn(props)}>
                        {"Learn More"}
                    </DarkThemeButton>
                </SocialContainer>
            </Column>
        </InformationContainer>
    </Container>
);

export default withLogging(TwitchFoot);
