/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { default as Router, withRouter } from "next/router";

import withLogging from "../../../lib/withLogging";
import withData from "../../../lib/withData";
import NavBar from "../../../components/navigation/navbar";
import Footer from "../../../components/navigation/footer";
import TwitchFoot from "../../../components/navigation/TwitchFoot";
import CircleSocialButton from "../../../components/buttons/circle-social-button";

import projectConfig from "../../../config";
const currentHost = projectConfig.host;

const Container = styled.div`
    background-color: ${props => props.theme.flyoutBackground};
`;

const FooterContainer = styled.div``;

const HeaderItem = styled.div``;

const CircleSocialButtonStyled = styled(CircleSocialButton)`
    width: 100px;
`;

const DownloadText = styled.p`
    display: block;
    font-size: 20px;
    color: ${props => props.theme.gray};
    text-align: center;
`;

const BlerpForTwitch = styled.a`
    font-weight: bold;
    display: block;
    padding: 12px;
    font-size: 16px;
    display: block;
    color: ${props => props.theme.bodyText};
`;

const HeaderText = styled.p`
    color: ${props => props.theme.flyoutBackground};
    font-size: 48px;
    font-weight: lighter;
    margin: 20px;
    text-align: center;
`;

const BoldText = styled.p`
    font-size: 40px;
    line-height: 40px;
    margin: 8px;
    color: ${props => props.theme.bodyText};
    text-align: center;
`;

const NormalText = styled.p`
    font-size: 32px;
    line-height: 32px;
    margin: 0;
    color: ${props => props.theme.bodyText};
    text-align: center;
    font-weight: 300;
`;

const RedBackgroundHeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url("https://storage.googleapis.com/blerp_products/Web/product_page/Top%20banner%20blob.svg");
    padding: 40px 0 200px 0;
    background-position: 0 -160px;
    background-repeat: no-repeat;
    background-color: ${props => props.theme.flyoutBackground};
    background-size: cover;

    @media (max-width: 1800px) {
        background-size: inherit;
    }
`;

const HeaderLogo = styled.img`
    width: 400px;
`;

const RedLogo = styled.img`
    width: 400px;
    margin: 80px 0;
    z-index: 10;

    @media (max-width: 600px) {
        width: 280px;
        margin: 40px 0;
    }
`;

const HugeTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    background-color: ${props => props.theme.flyoutBackground};
`;

const HugeTextContainerWhite = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    background-color: ${props => props.theme.flyoutBackground};
    padding-bottom: 60px;
`;

const HugeTextContainerLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    background-color: ${props => props.theme.flyoutBackground};
    margin: 20px;
`;

const HugeTextContainerLeftStrict = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    background-color: ${props => props.theme.flyoutBackground};
    margin: 20px 80px;

    @media (max-width: 720px) {
        margin: 8px;
    }
`;
const ContainerSteps = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: ${props => props.theme.flyoutBackground};
    margin: 20px;
`;

const ContainerStepTopHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: ${props => props.theme.flyoutBackground};
    margin: 32px 0 80px;
`;

const LargeContainerSteps = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: ${props => props.theme.flyoutBackground};
    margin: 60px;
`;

const InnerContainerSteps = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    background-color: ${props => props.theme.flyoutBackground};
    margin: 20px;
    max-width: 720px;
    width: 100%;
`;

const NormalStepText = styled.p`
    font-size: 22px;
    color: ${props => props.theme.bodyText};
    text-align: center;
    margin: 16px 0px;
    font-weight: lighter;
`;

const TinyStepText = styled.p`
    font-size: 16px;
    color: ${props => props.theme.gray};
    text-align: left;
    margin: 8px;
    font-weight: lighter;
`;

const Borderline = styled.div`
    width: 60%;
    margin: 8px;
    border-bottom: 1px solid ${props => props.theme.darkGray};
`;

const HugeTextContainerBackground = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    background-image: url("https://storage.googleapis.com/blerp_products/Web/product_page/red%20blerp%20texture.png");
`;

const HugeTextContainerBackgroundGradient = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        transparent,
        ${props => props.theme.flyoutBackground}
    );
    opacity: 0.8;
    position: absolute;
    top: 0px;
    left: 0px;
`;

const FlatHorizontal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HorizontalSquareButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 720px) {
        flex-direction: column;
    }
`;

const SquareButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px;
    min-width: 200px;

    @media (max-width: 720px) {
        min-width: 10px;
        margin: 4px;
        flex-direction: column;
    }
`;

const SquareButton = styled.button`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    background-color: ${props =>
        props.backgroundColor
            ? props.backgroundColor
            : props.theme.flyoutBackground};
    border: 2px solid
        ${props => (props.isSelected ? props.theme.pandaPink : "transparent")} !important;
    -webkit-box-shadow: 5px 5px 32px -5px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 5px 5px 32px -5px rgba(0, 0, 0, 0.4);
    box-shadow: 5px 5px 32px -5px rgba(0, 0, 0, 0.4);
    padding: 0;
    cursor: pointer;

    @media (max-width: 720px) {
        width: 60px;
        height: 60px;
    }

    &:hover {
        opacity: 0.8;
    }

    &:focus {
        border: 2px solid
            ${props =>
                props.isSelected
                    ? props.theme.pandaPink
                    : props.theme.starling} !important;
        -webkit-box-shadow: 5px 5px 32px -5px rgba(0, 0, 0, 0.4) !important;
        -moz-box-shadow: 5px 5px 32px -5px rgba(0, 0, 0, 0.4) !important;
        box-shadow: 5px 5px 32px -5px rgba(0, 0, 0, 0.4) !important;
    }
`;

const SquareImage = styled.img`
    width: 190px;
    height: 190px;
    position: absolute;

    @media (max-width: 720px) {
        width: 70px;
        height: 70px;
    }
`;

const SquareBackground = styled.div`
    background-color: transparent;
    width: 160px;
    height: 160px;
    border-radius: 8px;
    z-index: 20;
    position: absolute;
    top: -2px;
    right: -2px;

    &:hover {
        opacity: 0.3;
        background-color: ${props => props.theme.pandaPink};
    }

    @media (max-width: 720px) {
        width: 60px;
        height: 60px;
    }
`;

const MainBody = styled.div`
    background-color: ${props => props.theme.flyoutBackground};
`;

const SquareButtonText = styled.p`
    font-size: 20px;
    color: ${props => props.theme.bodyText};
    margin: 12px;
    font-weight: lighter;
    text-align: center;
    font-size: 16px;
    margin: 4px;
    max-width: 160px;
    min-height: 40px;

    @media (max-width: 720px) {
        font-size: 20px;
        margin: 4px;
    }
`;

const NormalGrayText = styled.p`
    font-size: 14px;
    color: ${props => props.theme.gray};
    text-align: center;
    margin: 16px;
    font-weight: lighter;
`;

const StreamingGuides = {
    STREAMLABS: {
        name: "StreamLabs",
        meta: "StreamLabs",
        value: "STREAMLABS",
        url: "streamlabs",
    },
    STREAMELEMENTS: {
        name: "StreamElements / OBS",
        meta: "StreamElements and OBS",
        value: "STREAMELEMENTS",
        url: "streamelements",
    },
    XSPLIT: {
        name: "xSplit",
        meta: "xSplit Streamer Software",
        value: "XSPLIT",
        url: "xsplit",
    },
    TWITCH: {
        name: "TwitchStudios",
        meta: "Twitch Studios",
        value: "TWITCH",
        url: "twitchstudios",
    },
};

const convertGuideTypeToUrl = type => {
    switch (type) {
        case "STREAMLABS":
            return StreamingGuides.STREAMLABS.url;
        case "STREAMELEMENTS":
        case "OBS":
            return StreamingGuides.STREAMELEMENTS.url;
        case "TWITCH":
            return StreamingGuides.TWITCH.url;
        case "XSPLIT":
            return StreamingGuides.XSPLIT.url;
        default:
            return "";
    }
};

const convertGuideUrlToValue = urlName => {
    switch (urlName) {
        case "streamlabs":
            return StreamingGuides.STREAMLABS.value;
        case "streamelements":
        case "obs":
            return StreamingGuides.STREAMELEMENTS.value;
        case "twitch":
        case "twitchstudios":
            return StreamingGuides.TWITCH.value;
        case "xsplit":
            return StreamingGuides.XSPLIT.value;
        default:
            return "NONE";
    }
};

const SetupTwitchBlerpText = styled.div`
    font-size: 36px;
    color: ${props => props.theme.bodyText};
    text-align: left;
    padding: 12px 0;
`;

const SetupTwitchBlerpLightText = styled.div`
    font-family: Odudo;
    font-weight: 300;
    font-size: 28px;
    color: ${props => props.theme.gray};
    text-align: left;
`;

const OnlineTextContainer = styled.div`
    display: flex;
    align-items: center;
`;

const GoodToGoText = styled.h3`
    font-size: 32px;
    color: ${props => props.theme.bodyText};
    text-align: center;
`;

const OnlineNormalText = styled.p`
    font-size: 16px;
    color: ${props => props.theme.bodyText};
    text-align: center;
    max-width: 720px;
    font-weight: 300;
`;

const OnlineCircle = styled.div`
    border-radius: 40px;
    margin: 8px;
    width: 12px;
    height: 12px;
    background-color: ${props =>
        props.isOnline ? props.theme.seafoam : props.theme.bodyText};
`;

const WalkThroughImage = styled.img`
    width: 100%;
    max-width: 720px;
`;

const HelpImage = styled.img`
    height: 80px;

    @media (max-width: 600px) {
        height: 40px;
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

const SocialContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 0;
`;

const VideoContainer = styled.div`
    margin: 16px 0;
    z-index: 1000;
`;
const VideoContainerContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    padding: 40px 0;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`;

const SecondaryButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
    padding: 0 12px;
    text-decoration: none;
    color: ${props => props.theme.secondaryText};
    white-space: nowrap;
    background: transparent;
    border: 2px solid ${props => props.theme.secondaryText};
    border-radius: 40px;
    font-size: 14px;
    line-height: 14px;
    height: 32px;

    &:focus {
        border-radius: 40px;
        border: 2px solid ${props => props.theme.pandaPink} !important;
        outline: 0 !important;
        box-shadow: none !important;
    }

    &:hover {
        transition: all 0.2s ease 0s;
        color: ${props => props.theme.pandaPink};
    }

    &:active {
        color: ${props => props.theme.pandaPink};
        border: 2px solid ${props => props.theme.pandaPink};
        transition: all 0.2s ease 0s;
    }
`;

const navigateToTwitchStream = () => {
    window.location.href = `https://dashboard.twitch.tv/extensions/oafn7vvzfyzyccwrwrt233221oe5wq`;
};

class Page extends React.Component {
    state;
    props;

    constructor(props) {
        super(props);
        this.state = {
            selectedBroadcastingSoftware: convertGuideUrlToValue(
                props.url.query.guideName,
            ),
        };
    }

    componentDidMount() {
        if (this.props.router) {
            this.props.router.prefetch("/twitch/streaming-guides/streamlabs");
            this.props.router.prefetch(
                "/twitch/streaming-guides/streamelements",
            );
            this.props.router.prefetch("/twitch/streaming-guides/obs");
            this.props.router.prefetch("/twitch/streaming-guides/xsplit");
            this.props.router.prefetch(
                "/twitch/streaming-guides/twitchstudios",
            );
        }
    }

    renderBlerpIsOnlineComponent() {
        return <div></div>;
    }

    handleSquareButtonClick = type => () => {
        if (type == this.state.selectedBroadcastingSoftware) {
            this.setState({ selectedBroadcastingSoftware: false });
            Router.push(
                `/twitch/streaming-guides`,
                `/twitch/streaming-guides`,
                {
                    shallow: true,
                },
            );
        } else {
            this.setState({ selectedBroadcastingSoftware: type });
            Router.push(
                `/twitch/streaming-guides/${convertGuideTypeToUrl(type)}`,
                `/twitch/streaming-guides/${convertGuideTypeToUrl(type)}`,
                {
                    shallow: true,
                },
            );
        }
    };

    renderDownloadBlerpTwitch = () => {
        return (
            <LargeContainerSteps>
                <Column>
                    <DownloadText>
                        Add the Blerp Twitch extension to your channel
                    </DownloadText>
                    <SocialContainer>
                        <CircleSocialButtonStyled
                            alt='Blerp for Twitch Extension'
                            link={`https://dashboard.twitch.tv/extensions/oafn7vvzfyzyccwrwrt233221oe5wq`}
                            image='https://storage.googleapis.com/blerp_products/Web/Streamer/blerpyicon.svg'
                        />
                        <Column>
                            <BlerpForTwitch>Blerp for Twitch</BlerpForTwitch>
                            <SecondaryButton href='https://dashboard.twitch.tv/extensions/oafn7vvzfyzyccwrwrt233221oe5wq'>
                                {"Download"}
                            </SecondaryButton>
                        </Column>
                    </SocialContainer>
                </Column>
            </LargeContainerSteps>
        );
    };

    renderBody() {
        switch (this.state.selectedBroadcastingSoftware) {
            case StreamingGuides.STREAMLABS.value:
                return (
                    <React.Fragment>
                        <HugeTextContainerLeftStrict>
                            <SetupTwitchBlerpText>
                                Setup Twitch Blerp extension with{" "}
                                {StreamingGuides.STREAMLABS.name}
                            </SetupTwitchBlerpText>
                            <SetupTwitchBlerpLightText>
                                Step by step guide on how to activate your
                                Twitch Blerp Extension.
                            </SetupTwitchBlerpLightText>
                        </HugeTextContainerLeftStrict>

                        {this.renderDownloadBlerpTwitch()}

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 1</b> Select new source
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/SLstep%201.png' />
                            </InnerContainerSteps>
                        </ContainerSteps>

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 2</b> Select Browser source. Then
                                    add source.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/SLstep%202.png' />
                            </InnerContainerSteps>
                        </ContainerSteps>

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 3</b> Name the New Source.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/SLstep%203.png' />
                            </InnerContainerSteps>
                        </ContainerSteps>

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 4</b> Add your url.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/SLstep%204.png' />
                                <TinyStepText>
                                    Enter{" "}
                                    <b>
                                        URL from Twitch config panel into
                                        streaming software
                                    </b>{" "}
                                    to start listening to audio clips from
                                    viewers.
                                </TinyStepText>
                                <HelpImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Screen%20Shot%202019-12-21%20at%206.56.05%20PM.png' />
                            </InnerContainerSteps>
                        </ContainerSteps>

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 5</b> Text connection.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/SLStep%205.png' />
                                <TinyStepText>
                                    Test your audio button in the config. A
                                    notification should appear in your OBS.
                                    Adjust or move the source to customize where
                                    your notification appears during the stream.
                                </TinyStepText>
                                <NormalStepText>
                                    <b>
                                        (Your scene with the browser source URL
                                        must be open to hear the audio)
                                    </b>
                                </NormalStepText>
                            </InnerContainerSteps>
                        </ContainerSteps>

                        {this.renderRedLogoBackground()}
                        {this.renderYourGoodToGo()}
                    </React.Fragment>
                );
            case StreamingGuides.STREAMELEMENTS.value:
                return (
                    <React.Fragment>
                        <HugeTextContainerLeftStrict>
                            <SetupTwitchBlerpText>
                                Setup Twitch Blerp extension with{" "}
                                {StreamingGuides.STREAMELEMENTS.name}
                            </SetupTwitchBlerpText>
                            <SetupTwitchBlerpLightText>
                                Step by step guide on how to activate your
                                Twitch Blerp Extension.
                            </SetupTwitchBlerpLightText>
                        </HugeTextContainerLeftStrict>
                        {this.renderDownloadBlerpTwitch()}

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 1</b> Select add source. Then
                                    Browser.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Stream%20elements_OBS%20walkthrough%20step%201.png' />
                            </InnerContainerSteps>
                        </ContainerSteps>

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 2</b> Add your url.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Stream%20elements_OBS%20walkthrough%20steps%20-1.png' />
                                <TinyStepText>
                                    Enter{" "}
                                    <b>
                                        URL from Twitch config panel into
                                        streaming software
                                    </b>{" "}
                                    to start listening to audio clips from
                                    viewers.
                                </TinyStepText>
                                <HelpImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Screen%20Shot%202019-12-21%20at%206.56.05%20PM.png' />
                            </InnerContainerSteps>
                        </ContainerSteps>

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 3</b> Text connection.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Stream%20elements_OBS%20walkthrough%20steps%202.png' />
                                <TinyStepText>
                                    Test your audio button in the config. A
                                    notification should appear in your OBS.
                                    Adjust or move the source to customize where
                                    your notification appears during the stream.
                                </TinyStepText>
                                <NormalStepText>
                                    <b>
                                        (Your scene with the browser source URL
                                        must be open to hear the audio)
                                    </b>
                                </NormalStepText>
                            </InnerContainerSteps>
                        </ContainerSteps>

                        {this.renderRedLogoBackground()}
                        {this.renderYourGoodToGo()}
                    </React.Fragment>
                );
            case StreamingGuides.XSPLIT.value:
                return (
                    <React.Fragment>
                        <HugeTextContainerLeftStrict>
                            <SetupTwitchBlerpText>
                                Setup Twitch Blerp extension with{" "}
                                {StreamingGuides.XSPLIT.name}
                            </SetupTwitchBlerpText>
                            <SetupTwitchBlerpLightText>
                                Step by step guide on how to activate your
                                Twitch Blerp Extension.
                            </SetupTwitchBlerpLightText>
                        </HugeTextContainerLeftStrict>

                        {this.renderDownloadBlerpTwitch()}

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 1</b> Select add source. Then
                                    Webpage.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Xsplit%20walkthrough%20step%201.png' />
                            </InnerContainerSteps>
                        </ContainerSteps>

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 2</b> Add your url.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Xsplit%20%20walkthrough%20step%202.png' />
                                <TinyStepText>
                                    Enter{" "}
                                    <b>
                                        URL from Twitch config panel into
                                        streaming software
                                    </b>{" "}
                                    to start listening to audio clips from
                                    viewers.
                                </TinyStepText>
                                <HelpImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Screen%20Shot%202019-12-21%20at%206.56.05%20PM.png' />
                            </InnerContainerSteps>
                        </ContainerSteps>

                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 3</b> Text connection.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Xsplit%20%20walkthrough%20step%202.png' />
                                <TinyStepText>
                                    Test your audio button in the config. A
                                    notification should appear in your OBS.
                                    Adjust or move the source to customize where
                                    your notification appears during the stream.
                                </TinyStepText>
                                <NormalStepText>
                                    <b>
                                        (Your scene with the browser source URL
                                        must be open to hear the audio)
                                    </b>
                                </NormalStepText>
                            </InnerContainerSteps>
                        </ContainerSteps>

                        {this.renderRedLogoBackground()}
                        {this.renderYourGoodToGo()}
                    </React.Fragment>
                );
            case StreamingGuides.TWITCH.value:
                return (
                    <React.Fragment>
                        {" "}
                        <HugeTextContainerLeftStrict>
                            <SetupTwitchBlerpText>
                                Setup Twitch Blerp extension with{" "}
                                {StreamingGuides.TWITCH.name}
                            </SetupTwitchBlerpText>
                            <SetupTwitchBlerpLightText>
                                Step by step guide on how to activate your
                                Twitch Blerp Extension.
                            </SetupTwitchBlerpLightText>
                        </HugeTextContainerLeftStrict>
                        {this.renderDownloadBlerpTwitch()}
                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 1</b> Select new layer. Then Embed
                                    Webpage.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/TwitchStudios%20walkthrough%20step%201.png' />
                            </InnerContainerSteps>
                        </ContainerSteps>
                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 2</b> Add your url.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/TwitchStudios%20walkthrough%20step%202.png' />
                                <TinyStepText>
                                    Enter{" "}
                                    <b>
                                        URL from Twitch config panel into
                                        streaming software
                                    </b>{" "}
                                    to start listening to audio clips from
                                    viewers.
                                </TinyStepText>
                                <TinyStepText>
                                    Note* Twitch may say URL doesn't seem to
                                    work but that's okay.
                                </TinyStepText>
                                <HelpImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Screen%20Shot%202019-12-21%20at%206.56.05%20PM.png' />
                            </InnerContainerSteps>
                        </ContainerSteps>
                        <ContainerSteps>
                            <InnerContainerSteps>
                                <NormalStepText>
                                    <b>Step 3</b> Text connection.
                                </NormalStepText>
                                <WalkThroughImage src='https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/TwitchStudios%20walkthrough%20step%203.png' />
                                <TinyStepText>
                                    Test your audio button in the config. A
                                    notification should appear in your OBS.
                                    Adjust or move the source to customize where
                                    your notification appears during the stream.
                                </TinyStepText>
                                <NormalStepText>
                                    <b>
                                        (Your scene with the browser source URL
                                        must be open to hear the audio)
                                    </b>
                                </NormalStepText>
                            </InnerContainerSteps>
                        </ContainerSteps>
                        {this.renderRedLogoBackground()}
                        {this.renderYourGoodToGo()}
                    </React.Fragment>
                );
            default:
                return (
                    <React.Fragment>
                        {this.renderDownloadBlerpTwitch()}
                        <VideoContainerContainer>
                            <VideoContainer>
                                <iframe
                                    width='320'
                                    height='240'
                                    src='https://www.youtube.com/embed/J3ZfWHP9Nhg'
                                    frameBorder='0'
                                    data-allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                />
                            </VideoContainer>

                            <VideoContainer>
                                <iframe
                                    width='320'
                                    height='240'
                                    src='https://www.youtube.com/embed/dT2_btG_5To'
                                    frameBorder='0'
                                    data-allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                />
                            </VideoContainer>

                            <VideoContainer>
                                <iframe
                                    width='320'
                                    height='240'
                                    src='https://www.youtube.com/embed/ktnCuqAOlNI'
                                    frameBorder='0'
                                    data-allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                />
                            </VideoContainer>
                        </VideoContainerContainer>
                        <TwitchFoot />
                    </React.Fragment>
                );
        }
    }

    renderSquareButton(
        obsType,
        obsName,
        obsImageUrl,
        isSelected,
        optionalColor,
    ) {
        return (
            <SquareButtonContainer>
                <SquareButton
                    backgroundColor={optionalColor}
                    isSelected={isSelected}
                    onClick={this.handleSquareButtonClick(obsType)}
                >
                    <SquareImage src={obsImageUrl} />
                    <SquareBackground />
                </SquareButton>
                <SquareButtonText>{obsName}</SquareButtonText>
            </SquareButtonContainer>
        );
    }

    renderWhiteLogoBackground() {
        return (
            <RedBackgroundHeaderRow>
                <HeaderLogo
                    alt='Blerp'
                    src='https://storage.googleapis.com/blerp_products/Web/blerp_white_logo.svg'
                />
                <HeaderText>For Twitch</HeaderText>
            </RedBackgroundHeaderRow>
        );
    }

    renderRedLogoBackground() {
        return (
            <HugeTextContainerBackground>
                <RedLogo
                    alt='Red Blerp'
                    src='https://storage.googleapis.com/blerp_products/Web/Misc/blerp_logo_transparent.svg'
                />
                <HugeTextContainerBackgroundGradient />
            </HugeTextContainerBackground>
        );
    }

    renderYourGoodToGo() {
        return (
            <HugeTextContainerWhite>
                <GoodToGoText>You're Good To Go</GoodToGoText>
                <Borderline />
                <OnlineNormalText>
                    Blerp is ready! Make sure you're connected before you start
                    your stream
                </OnlineNormalText>
                <OnlineTextContainer>
                    <OnlineNormalText>
                        <b>Status</b> Connected
                    </OnlineNormalText>
                    <OnlineCircle isOnline={true} />
                </OnlineTextContainer>
                <OnlineNormalText>
                    <b>
                        (If you switch between scenes make sure every scene has
                        the a browser source)
                    </b>
                </OnlineNormalText>
            </HugeTextContainerWhite>
        );
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>{`Twitch Streaming Guide | Live Streaming Software | ${
                        StreamingGuides[this.state.selectedBroadcastingSoftware]
                            ? StreamingGuides[
                                  this.state.selectedBroadcastingSoftware
                              ].meta
                            : "Blerp"
                    }`}</title>
                    <meta
                        name='description'
                        content={`The Twitch streamers live broadcasting guide for ${
                            StreamingGuides[
                                this.state.selectedBroadcastingSoftware
                            ]
                                ? StreamingGuides[
                                      this.state.selectedBroadcastingSoftware
                                  ].meta
                                : "live streamer software"
                        }. We have integration live streaming guides for how to use blerp for twitch in your live streaming software.`}
                    />
                    <meta
                        property='og:description'
                        content={`The Twitch streamers live broadcasting guide for ${
                            StreamingGuides[
                                this.state.selectedBroadcastingSoftware
                            ]
                                ? StreamingGuides[
                                      this.state.selectedBroadcastingSoftware
                                  ].meta
                                : "live streamer software"
                        }. We have integration live streaming guides for how to use blerp for twitch in your live streaming software.`}
                    />
                    <meta
                        name='keywords'
                        content={`twitch streamers, streams, live streaming, broadcasting software, broadcaster software, twitch software, ${
                            StreamingGuides[
                                this.state.selectedBroadcastingSoftware
                            ]
                                ? StreamingGuides[
                                      this.state.selectedBroadcastingSoftware
                                  ].meta
                                : "live streaming software"
                        }`}
                    />
                    <meta
                        property='og:image'
                        content='https://storage.googleapis.com/blerp-public-images/branding/Screen%20Shot%202019-03-12%20at%208.14.59%20PM.png'
                    />
                    <meta property='og:image:width' content='300' />
                    <meta property='og:image:height' content='300' />
                    <meta
                        name='twitter:image'
                        content='https://storage.googleapis.com/blerp-public-images/branding/Screen%20Shot%202019-03-12%20at%208.14.59%20PM.png'
                    />
                    <meta name='twitter:image:width' content='262' />
                    <meta name='twitter:image:height' content='262' />
                </Helmet>
                <NavBar />
                <Container>
                    {this.renderWhiteLogoBackground()}

                    <HugeTextContainer>
                        <BoldText>Set up your Blerp Extension</BoldText>
                        <Borderline aria-hidden='true' />
                        <NormalText>
                            <b>First</b> Select your OBS below
                        </NormalText>

                        <ContainerStepTopHeader>
                            <FlatHorizontal>
                                <HorizontalSquareButtonsContainer>
                                    {this.renderSquareButton(
                                        "STREAMLABS",
                                        StreamingGuides.STREAMLABS.name,
                                        "https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Streamlabs.png",
                                        this.state
                                            .selectedBroadcastingSoftware ===
                                            StreamingGuides.STREAMLABS.value,
                                    )}
                                    {this.renderSquareButton(
                                        "STREAMELEMENTS",
                                        StreamingGuides.STREAMELEMENTS.name,
                                        "https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Streamelements-OBS.png",
                                        this.state
                                            .selectedBroadcastingSoftware ===
                                            StreamingGuides.STREAMELEMENTS
                                                .value,
                                    )}
                                </HorizontalSquareButtonsContainer>
                                <HorizontalSquareButtonsContainer>
                                    {this.renderSquareButton(
                                        "XSPLIT",
                                        StreamingGuides.XSPLIT.name,
                                        "https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/xSplit.png",
                                        this.state
                                            .selectedBroadcastingSoftware ===
                                            StreamingGuides.XSPLIT.value,
                                        "#000",
                                    )}
                                    {this.renderSquareButton(
                                        "TWITCH",
                                        StreamingGuides.TWITCH.name,
                                        "https://storage.googleapis.com/blerp_products/Web/twitch_guides_page/Twitchstudio.png",
                                        this.state
                                            .selectedBroadcastingSoftware ===
                                            StreamingGuides.TWITCH.value,
                                        "#9148f1",
                                    )}
                                </HorizontalSquareButtonsContainer>
                            </FlatHorizontal>
                            <NormalGrayText>
                                More Tutorials Coming Soon...
                            </NormalGrayText>
                        </ContainerStepTopHeader>
                    </HugeTextContainer>

                    <MainBody>{this.renderBody()}</MainBody>
                </Container>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </div>
        );
    }
}

Page.getInitialProps = ctx => ({ guildName: ctx.url.query.guildName });

export default withRouter(withData(withLogging(Page)));
