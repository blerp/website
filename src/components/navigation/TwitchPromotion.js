/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import SecondaryButton from "../buttons/secondary-button";

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
} from "../../styles/colors";

const StyleLink = styled.a``;

const SocialLogo = styled.img`
    width: 120px;
    padding: 4px;
    opacity: 1;

    &:hover {
        opacity: 0.4;
    }
`;

const CircleSocialButton = props => {
    return (
        <StyleLink target='external' href={props.link}>
            <SocialLogo
                className={props.className}
                src={props.image}
                alt={props.alt}
                target='_blank'
            />
        </StyleLink>
    );
};

const Container = styled.div`
    position: relative;
    bottom: 0;
    z-index: 100;
    background-color: ${flyoutBackground};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 0;
    padding: 40px 0;
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
    color: ${headerText};
    width: 100%;
    padding: 12px 0px;

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
    margin: 12px;
    align-items: flex-start;
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
    padding: 4px;
    font-size: 20px;
    display: block;
    padding: 4px;
    marging: 4px;
    color: ${headerText};
    text-align: left;
    width: 100%;

    @media (max-width: 600px) {
        text-align: center;
    }
`;

const SubHeadingText = styled.a`
    font-weight: bold;
    display: block;
    padding: 16px 0;
    font-size: 24px;
    display: block;
    color: ${headerText};
`;

const SubHeadingTextLight = styled.a`
    font-weight: lighter;
    display: block;
    font-size: 16px;
    display: block;
    color: ${headerText};
    text-align: left;
    width: 100%;

    @media (max-width: 600px) {
        text-align: center;
    }
`;

const NormalText = styled.p`
    font-size: 20px;
    line-height: 32px;
    margin: 0;
    color: ${props => (props.color ? props.color : props.theme.bodyText)};
    text-align: left;
    font-weight: 300;
    width: 80%;
`;

const BoldText = styled.div`
    font-weight: 600;
    font-size: 28px;
    color: ${props => props.color};
    text-align: left;
    margin: 8px;
    width: 80%;
`;

const navigateToWalkOn = props => () => {
    props.logAction({
        action: "TWITCH_BANNER_TO_WALK_ON",
        event: "TWITCH_WEBSITE_EVENT",
        data: {},
    });
    window.location.href = `${currentHost}/twitch-walkon`;
};

const navigateToTwitchStream = props => () => {
    props.logAction({
        action: "TWITCH_BANNER_TO_MAIN_EXTENSION",
        event: "TWITCH_WEBSITE_EVENT",
        data: {},
    });
    window.open(
        "https://dashboard.twitch.tv/extensions/oafn7vvzfyzyccwrwrt233221oe5wq",
        "_blank",
    );
};

const TwitchPromotion = props => (
    <Container className={props.className}>
        <BoldText>Are you a streamer?</BoldText>
        <NormalText>Check out our Twitch extensions</NormalText>

        <InformationContainer>
            <Column>
                <SocialContainer>
                    <CircleSocialButton
                        alt='Blerp for Twitch Extension'
                        link={`https://dashboard.twitch.tv/extensions/oafn7vvzfyzyccwrwrt233221oe5wq`}
                        image='https://storage.googleapis.com/blerp_products/Web/Streamer/blerpyicon.svg'
                    />
                    <Column>
                        <SubHeadingText>Blerp for Twitch</SubHeadingText>
                        <SecondaryButton
                            onClick={navigateToTwitchStream(props)}
                        >
                            {"View Extension"}
                        </SecondaryButton>
                    </Column>
                </SocialContainer>
            </Column>

            <Column>
                <SocialContainer>
                    <CircleSocialButton
                        alt='Walk On twitch Extension'
                        link={`${currentHost}/twitch-walkon`}
                        image='https://storage.googleapis.com/blerp_products/Web/Streamer/WalkonOverlayIcon.svg'
                    />
                    <Column>
                        <SubHeadingText>Walk On Sounds</SubHeadingText>
                        <SecondaryButton onClick={navigateToWalkOn(props)}>
                            {"Learn More"}
                        </SecondaryButton>
                    </Column>
                </SocialContainer>
            </Column>
        </InformationContainer>
    </Container>
);

export default withLogging(TwitchPromotion);
