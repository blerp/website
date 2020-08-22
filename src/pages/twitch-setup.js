/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";

import { default as Router, withRouter } from "next/router";

import ColorButton from "../components/buttons/color-button";
import projectConfig from "../config";
const hostDomain = projectConfig.host;
import TwitchFoot from "../components/navigation/TwitchFoot";

import NavBar from "../components/navigation/navbar";

import {
    defaultBackground,
    statusColor,
    bodyText,
    pandaPink,
    darkBlue,
    flyoutBackground,
    secondarySubtitleText,
    secondaryText,
    pandaTeal,
    focusState,
    darkText,
    ligherBackground,
    lightGray,
} from "../styles/colors";

import withData from "../lib/withData";

const Container = styled.div`
    background-color: ${defaultBackground};
    position: relative;
    justify-content: center;
    width: 100%;
`;

const TwitchLandingMainHeader = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    padding: 40px 0;
    background-color: ${pandaTeal};

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const VideoContainerContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    padding: 40px 0;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const BlerpForTwitchText = styled.h1`
    color: ${secondarySubtitleText};
    font-weight: normal;
    padding: 8px;
    margin: 0;
    font-size: 32px;
    z-index: 1;

    @media (max-width: 600px) {
        font-size: 16px;
        width: 240px;
    }
`;

const MainHeaderTitle = styled.h2`
    color: ${darkText};
    font-weight: 600;
    font-size: 48px;
    margin: 4px;
    z-index: 1;
    width: 700px;

    @media (max-width: 600px) {
        font-size: 24px;
        width: 240px;
    }
`;

const MainHeaderTitleThird = styled.a`
    color: ${darkBlue};
    font-weight: 600;
    font-size: 20px;
    margin: 4px;
    z-index: 1;
    width: 700px;
`;

const PlaceHolderItem = styled.div`
    color: ${darkText};
    font-weight: 600;
    font-size: 48px;
    margin: 4px;
    z-index: 1;

    @media (max-width: 600px) {
        font-size: 24px;
        width: 240px;
    }
`;

const TwitchBottomCallToAction = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background-color: ${flyoutBackground};
`;

const TwitchBottomCallToActionRow = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 40px;

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const TwitchTopCallToActionRow = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 40px;
    backgroun-color: ${lightGray};
`;

const TwitchColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
`;

const TwitchMainScreenShot = styled.img`
    width: 240px;
`;

const TwitchBlerp = styled.img`
    width: 60%;
    margin-top: 120px;
    position: absolute;
    max-height: 1000px;
    margin-top: 20px;
`;

const HorionzontalLogo = styled.img`
    width: 360px;
    padding: 40px;
    z-index: 10;

    @media (max-width: 600px) {
        width: 240px;
        padding: 12px;
        margin: 0;
        flex-direction: column;
    }
`;

const NoSearchTextContainer = styled.div`
    text-align: center;
    z-index: 2;
`;

const TextContainer = styled.div`
    text-align: center;
    z-index: 2;
    padding: 16px;
`;

const SquareLogo = styled.img`
    width: 180px;
    padding: 20px;
    z-index: 10;
`;

const TwitchScreenShot = styled.img`
    width: 320px;
    padding: 8px;
`;

const ContentScreenshot = styled.img`
    max-height: 600px;
    width: auto;

    @media (max-width: 600px) {
        width: 80%;
    }
`;

const ScreenshotSubtitle = styled.p`
    font-family: Odudo;
    color: ${secondaryText};
    font-weight: bold;
    padding: 8px;
    margin: 0;
    font-size: 24px;
    z-index: 1;
    text-align: center;
    margin: 20px;
`;

const TextHeader = styled.h3`
    font-family: Odudo;
    color: ${secondaryText};
    font-weight: bold;
    padding: 8px;
    margin: 0;
    font-size: 24px;
    z-index: 1;
    text-align: ${props => props.alignment};
`;

const TextSubtitle = styled.p`
    color: ${secondarySubtitleText};
    text-align: ${props => props.alignment};
    font-weight: normal;
    padding: 8px;
    margin: 0;
    font-size: 18px;
    z-index: 1;
    max-width: 480px;

    @media (max-width: 600px) {
        font-size: 16px;
        width: 240px;
    }
`;

const TwitchLandingRowHeader = styled.h3`
    font-family: Odudo;
    color: ${props => props.color};
    font-weight: bold;
    padding: 8px;
    margin: 0;
    font-size: 24px;
    z-index: 1;
    text-align: center;
    margin: 20px;
    text-decoration: underline;
`;

const TwitchLandingRow = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background-color: ${props => props.color};

    @media (max-width: 600px) {
        margin: 0;
        padding: 0;
        flex-direction: column;
    }
`;

const TwitchLandingInnerRow = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 40px;

    @media (max-width: 600px) {
        padding: 0;
        margin: 0;
        flex-direction: column;
    }
`;

const TwitchLandingHalfColumn = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const VideoContainer = styled.div`
    margin: 16px 0;
    z-index: 1000;
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

const ButtonLink = styled.a`
    background-color: ${props =>
        props.isMenuOpen ? pandaPink : props.color || secondaryGray};
    border-radius: 100px;
    width: 200px;
    height: 60px;
    font-size: 20px;
    color: ${props => (props.isMenuOpen ? pandaPink : flyoutBackground)};
    border: 2px solid
        ${props =>
            props.isMenuOpen ? pandaPink : props.color || secondaryGray};
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
        outline: 3px solid rgba(59, 119, 255, 1);
        border-radius: 100px;
    }

    &:hover {
        opacity: 0.8;
        background-color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
        border-radius: 100px;
    }

    &:active {
        color: ${pandaPink};
        border: 2px solid ${pandaPink};
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
        border-radius: 100px;
    }
`;

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    navigateToTwitchExtension = () => {
        window.location.href =
            "https://www.twitch.tv/ext/oafn7vvzfyzyccwrwrt233221oe5wq";
    };

    navigateToUpload = () => {
        window.location.href = `${hostDomain}/upload`;
    };

    renderMainHeader() {
        return (
            <TwitchLandingMainHeader>
                <TwitchBlerp
                    alt='sprinkle image decoration'
                    src='https://storage.googleapis.com/blerp-public-images/twitch/landing/background-svg.svg'
                    aria-hidden='true'
                />
                <HorionzontalLogo
                    src='https://storage.googleapis.com/blerp-public-images/twitch/landing/white-blerp.svg'
                    alt='Blerp Logo'
                />
                <NoSearchTextContainer>
                    <BlerpForTwitchText>
                        {"Blerp for Twitch"}
                    </BlerpForTwitchText>
                </NoSearchTextContainer>
                <HorionzontalLogo
                    src='https://storage.googleapis.com/blerp-public-images/twitch/landing/Twitch_Purple_RGB.svg'
                    alt='Twitch Logo'
                />
                <NoSearchTextContainer aria-hidden={true}>
                    <PlaceHolderItem>{"_"}</PlaceHolderItem>
                </NoSearchTextContainer>
                <NoSearchTextContainer>
                    <MainHeaderTitle>
                        {"The setup guide for the blerp twitch extension"}
                    </MainHeaderTitle>
                </NoSearchTextContainer>

                <VideoContainerContainer>
                    <VideoContainer>
                        <iframe
                            width='480'
                            height='240'
                            src='https://www.youtube.com/embed/J3ZfWHP9Nhg'
                            frameBorder='0'
                            data-allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        />
                    </VideoContainer>

                    <VideoContainer>
                        <iframe
                            width='480'
                            height='240'
                            src='https://www.youtube.com/embed/dT2_btG_5To'
                            frameBorder='0'
                            data-allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        />
                    </VideoContainer>

                    <VideoContainer>
                        <iframe
                            width='480'
                            height='240'
                            src='https://www.youtube.com/embed/u-NBkIt_WRc'
                            frameBorder='0'
                            data-allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        />
                    </VideoContainer>
                </VideoContainerContainer>

                <StyleLinkSmall href='/twitch/troubleshoot'>
                    Need More Help? Click Here For Our Troubleshoot Guide!
                </StyleLinkSmall>
            </TwitchLandingMainHeader>
        );
    }

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>{`Blerp for Twitch | Setup Guide For Twitch Extension | Blerp`}</title>
                    <meta
                        name='description'
                        content='Blerp for Twitch. Use audio memes from Blerp to stream sounds on Twitch. You can search sounds on the Twitch platform, stream them live, and earn bits. Learn how!'
                    />
                    <meta
                        property='og:description'
                        content='Blerp for Twitch. Use audio memes from Blerp to stream sounds on Twitch. You can search sounds on the Twitch platform, stream them live, and earn bits. Learn how!'
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
                    <meta
                        property='og:video'
                        content='https://www.youtube.com/watch?v=u-NBkIt_WRc'
                    />
                </Helmet>
                <NavBar />
                {this.renderMainHeader()}
                <TwitchTopCallToActionRow>
                    <TextSubtitle alignment='center'>
                        {"Install and Config Link For Extension"}
                    </TextSubtitle>
                    <ButtonLink
                        color={focusState}
                        href='https://www.twitch.tv/ext/oafn7vvzfyzyccwrwrt233221oe5wq'
                    >
                        {"Blerp Twitch"}
                    </ButtonLink>
                </TwitchTopCallToActionRow>

                <TwitchLandingRow color={flyoutBackground}>
                    <TwitchLandingRowHeader>{"Step 1"}</TwitchLandingRowHeader>
                    <TwitchLandingInnerRow>
                        <TwitchLandingHalfColumn>
                            <TwitchScreenShot
                                alt='Stream Audio Clips'
                                src='https://storage.googleapis.com/blerp_products/Web/Streamer/Screen%20Shot%202019-10-04%20at%201.36.03%20AM.png'
                            />
                            <TwitchScreenShot
                                alt='Click extension config button'
                                src='https://storage.googleapis.com/blerp_products/Web/Streamer/Screen%20Shot%202019-10-04%20at%201.00.42%20AM.png'
                            />
                        </TwitchLandingHalfColumn>

                        <TwitchLandingHalfColumn>
                            <NoSearchTextContainer>
                                <TextHeader alignment='left'>
                                    {"Install Extension"}
                                </TextHeader>
                                <TextSubtitle alignment='left'>
                                    {
                                        "Go to the install page using the blue action button above."
                                    }
                                </TextSubtitle>
                                <TextSubtitle alignment='left'>
                                    {
                                        "Click the install button on the top right corner. Go to extension config by clicking the configure button."
                                    }
                                </TextSubtitle>
                            </NoSearchTextContainer>
                        </TwitchLandingHalfColumn>
                    </TwitchLandingInnerRow>
                </TwitchLandingRow>

                <TwitchLandingRow color={ligherBackground}>
                    <TwitchLandingRowHeader>{"Step 2"}</TwitchLandingRowHeader>
                    <TwitchLandingInnerRow>
                        <TwitchLandingHalfColumn>
                            <NoSearchTextContainer>
                                <TextHeader alignment='right'>
                                    {"Activate Extension"}
                                </TextHeader>
                                <TextSubtitle alignment='right'>
                                    {
                                        "Activate your twitch extension by setting it as a panel or video component."
                                    }
                                </TextSubtitle>

                                <TextSubtitle alignment='right'>
                                    {
                                        "The panel will show up below your stream."
                                    }
                                </TextSubtitle>

                                <TextSubtitle alignment='right'>
                                    {
                                        "The component will show in a overlay sidebar on stream. The video component will only appear when your stream is live."
                                    }
                                </TextSubtitle>
                            </NoSearchTextContainer>
                        </TwitchLandingHalfColumn>

                        <TwitchLandingHalfColumn>
                            <TwitchScreenShot
                                alt='Activate Twitch Extension Screen'
                                src='https://storage.googleapis.com/blerp_products/Web/Streamer/Screen%20Shot%202019-10-04%20at%201.29.23%20AM.png'
                            />
                        </TwitchLandingHalfColumn>
                    </TwitchLandingInnerRow>
                </TwitchLandingRow>

                <TwitchLandingRow color={flyoutBackground}>
                    <TwitchLandingRowHeader>{"Step 3"}</TwitchLandingRowHeader>
                    <TextContainer>
                        <TextHeader alignment='center'>
                            {"Copy Browser Link Source"}
                        </TextHeader>
                        <TextSubtitle alignment='center'>
                            {
                                "Copy the link and enter it into your Broadcast Software (OBS, Xsplit etc..). If pasting link into a regular browser you will need to click on the screen before sounds will play. Click the test audio button to check if your panel is receiving sounds."
                            }
                        </TextSubtitle>
                    </TextContainer>
                    <ContentScreenshot
                        alt='The browser source location'
                        src='https://storage.googleapis.com/blerp_products/Web/Streamer/Screen%20Shot%202019-10-04%20at%201.42.42%20AM.png'
                    />
                    <TextContainer>
                        <TextHeader alignment='center'>
                            {"OBS Example: Add New Browser Source Window"}
                        </TextHeader>
                        <TextSubtitle alignment='center'>
                            {
                                "Click the add source button and find the browser option."
                            }
                        </TextSubtitle>
                    </TextContainer>
                    <ContentScreenshot
                        alt='Image of browser add button'
                        src='https://storage.googleapis.com/blerp-public-images/twitch/guide/source-image.png'
                    />
                    <TextContainer>
                        <TextHeader alignment='center'>
                            {"OBS Example: Paste Link Into Source Window"}
                        </TextHeader>
                        <TextSubtitle alignment='center'>
                            {"Enter the url into the browser source box."}
                        </TextSubtitle>
                    </TextContainer>
                    <ContentScreenshot
                        alt='Image showing where to enter browser source url'
                        src='https://storage.googleapis.com/blerp-public-images/twitch/guide/screenw-withhighlight.png'
                    />
                </TwitchLandingRow>

                <TwitchLandingRow color={ligherBackground}>
                    <TwitchLandingRowHeader>{"Step 4"}</TwitchLandingRowHeader>
                    <TwitchLandingInnerRow>
                        <TwitchLandingHalfColumn>
                            <TwitchScreenShot
                                alt='Blerp Main Panel Screenshot'
                                src='https://storage.googleapis.com/blerp_products/Web/Streamer/Screen%20Shot%202019-10-04%20at%201.46.38%20AM.png'
                            />
                        </TwitchLandingHalfColumn>
                        <TwitchLandingHalfColumn>
                            <NoSearchTextContainer>
                                <TextHeader alignment='left'>
                                    {"Profit"}
                                </TextHeader>
                                <TextSubtitle alignment='left'>
                                    {
                                        "Optionally set subscriber and regular bit amounts, cooldown time, content rating to control what's appropriate for your stream!"
                                    }
                                </TextSubtitle>
                                <TextSubtitle alignment='left'>
                                    {
                                        "Viewers can now choose from the millions of sounds in our database to communicate with you live on stream. Have fun!"
                                    }
                                </TextSubtitle>
                            </NoSearchTextContainer>
                        </TwitchLandingHalfColumn>
                    </TwitchLandingInnerRow>
                </TwitchLandingRow>

                <TwitchBottomCallToAction>
                    <NoSearchTextContainer>
                        <TextHeader alignment='center'>
                            {"Blerp + Twitch"}
                        </TextHeader>
                        <TextSubtitle alignment='center'>
                            {"Enable your viewers today."}
                        </TextSubtitle>
                    </NoSearchTextContainer>
                    <TwitchBottomCallToActionRow>
                        <SquareLogo
                            alt='Blerp logo'
                            src='https://storage.googleapis.com/blerp-public-images/twitch/landing/Blerp-logo-item.png'
                        />
                        <NoSearchTextContainer aria-hidden={true}>
                            <PlaceHolderItem>{"+"}</PlaceHolderItem>
                        </NoSearchTextContainer>
                        <SquareLogo
                            alt='Twitch logo'
                            src='https://storage.googleapis.com/blerp-public-images/twitch/landing/Glitch_Purple_RGB.svg'
                        />
                    </TwitchBottomCallToActionRow>
                    <ScreenshotSubtitle>
                        {"Get the extension now."}
                    </ScreenshotSubtitle>
                    <ButtonLink
                        color={focusState}
                        href='https://www.twitch.tv/ext/oafn7vvzfyzyccwrwrt233221oe5wq'
                    >
                        {"Get Extension"}
                    </ButtonLink>
                </TwitchBottomCallToAction>

                <TwitchFoot />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
