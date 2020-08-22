/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import CircleSocialButton from "../buttons/circle-social-button";
import SecondaryButton from "../buttons/secondary-button";
import { withRouter } from "next/router";

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

const Container = styled.div`
    position: relative;
    bottom: 0;
    z-index: 1000;
    background-color: ${defaultBackground};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 0;
    padding: 4px 0;
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

    @media (max-width: 830px) {
        display: flex;
        flex-direction: column;
    }
`;

const Column = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 8px;
    align-items: center;

    @media (max-width: 600px) {
        width: 300px;
    }
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
    padding: 12px;
    font-size: 16px;
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

class TwitchPromotionBite extends React.Component {
    props;
    navigateToSecond = () => {
        this.props.logAction({
            action: "BITE_BANNER_TO_DISCORD_INVITE",
            event: "WEBSITE_NAVIGATION_EVENT",
            data: {},
        });
        window.location.href = `https://discord.gg/zYSsRxm`;
    };

    navigateToTwitchStream = () => {
        this.props.logAction({
            action: "BITE_BANNER_TO_STREAMS",
            event: "WEBSITE_NAVIGATION_EVENT",
            data: {},
        });
        this.props.router.push(`/streams`);
    };

    navigateToApps = () => {
        this.props.logAction({
            action: "BITE_BANNER_TO_MOBILE_APPS",
            event: "WEBSITE_NAVIGATION_EVENT",
            data: {},
        });
        this.props.router.push(`/app`);
    };

    componentDidMount() {
        if (this.props.router) {
            this.props.router.prefetch("/streams");
            this.props.router.prefetch("/app");
        }
    }

    render() {
        return (
            <Container className={this.props.className}>
                <InformationContainer>
                    {/* <Column>
        <HeadingText>Try our many tools for sharing soundbites</HeadingText>
        <SubHeadingTextLight href="">
          Explore all of blerp tools!
        </SubHeadingTextLight>
      </Column> */}

                    <Column>
                        <SocialContainer>
                            <CircleSocialButton
                                alt='Blerp Twitch Streams'
                                link={`${currentHost}/streams`}
                                image='https://storage.googleapis.com/blerp-public-images/twitch/landing/Glitch_Purple_RGB.svg'
                            />
                            <SubHeadingText>
                                Share sounds on live streams!
                            </SubHeadingText>
                            <SecondaryButton
                                onClick={this.navigateToTwitchStream}
                            >
                                {"Streams"}
                            </SecondaryButton>
                        </SocialContainer>
                    </Column>

                    <Column>
                        <SocialContainer>
                            <CircleSocialButton
                                alt='Blerp sounds on the go'
                                link={`${currentHost}/app`}
                                image='https://storage.googleapis.com/blerp_products/Web/Streamer/blerpyicon.svg'
                            />
                            <SubHeadingText>
                                Play sounds offline!
                            </SubHeadingText>
                            <SecondaryButton onClick={this.navigateToApps}>
                                {"Mobile Apps"}
                            </SecondaryButton>
                        </SocialContainer>
                    </Column>

                    <Column>
                        <SocialContainer>
                            <CircleSocialButton
                                alt='Blerp Discord'
                                link='https://discord.gg/zYSsRxm'
                                image='https://storage.googleapis.com/blerp-web-images/static/clean-social/Discord%403x.png'
                            />
                            <SubHeadingText>Join our community</SubHeadingText>
                            <SecondaryButton onClick={this.navigateToSecond}>
                                {"Join Now"}
                            </SecondaryButton>
                        </SocialContainer>
                    </Column>
                </InformationContainer>
            </Container>
        );
    }
}

export default withRouter(withLogging(TwitchPromotionBite));
