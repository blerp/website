/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";

import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";

import { default as Router, withRouter } from "next/router";

import ColorButton from "../../components/buttons/color-button";
import projectConfig from "../../config";
const hostDomain = projectConfig.host;
import TwitchFoot from "../../components/navigation/TwitchFoot";

import NavBar from "../../components/navigation/navbar";

import {
    defaultBackground,
    statusColor,
    bodyText,
    pandaPink,
    darkBlue,
    slidePurple,
    flyoutBackground,
    secondarySubtitleText,
    secondaryText,
    pandaTeal,
    focusState,
    darkText,
    ligherBackground,
    lightGray,
} from "../../styles/colors";

import withData from "../../lib/withData";

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
    background-color: ${slidePurple};

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
    color: ${flyoutBackground};
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

const PlaceHolderItem = styled.div`
    color: ${flyoutBackground};
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
    width: 240px;
`;

const ContentScreenshot = styled.img`
    width: 80%;
    padding: 20px;

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

const SmallText = styled.div`
    color: ${flyoutBackground};
    font-size: 20px;
    line-height: 20px;
    margin: 4px;
    z-index: 1;
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
        window.location.href = `${hostDomain}/streams`;
    };

    navigateToUpload = () => {
        window.location.href = `${hostDomain}/upload`;
    };

    renderMainHeader() {
        return (
            <TwitchLandingMainHeader>
                <HorionzontalLogo
                    src='https://storage.googleapis.com/blerp-public-images/twitch/landing/white-blerp.svg'
                    alt='Blerp Logo'
                />
                <HorionzontalLogo
                    src='https://storage.googleapis.com/blerp-public-images/twitch/landing/Twitch_Purple_RGB.svg'
                    alt='Twitch Logo'
                />
                <NoSearchTextContainer>
                    <MainHeaderTitle>
                        {"Troubleshooting Blerp and Walkon Twitch Extensions!"}
                    </MainHeaderTitle>
                </NoSearchTextContainer>

                <NoSearchTextContainer aria-hidden={true}>
                    <PlaceHolderItem>{"_"}</PlaceHolderItem>
                </NoSearchTextContainer>

                <NoSearchTextContainer>
                    <SmallText>
                        If you need more help or just want to chat find us
                        through our
                        <StyleLinkSmall href='/connect-with-us/contact'>
                            Email
                        </StyleLinkSmall>{" "}
                        or{" "}
                        <StyleLinkSmall href='https://discord.gg/HHueCtM'>
                            Discord channel.
                        </StyleLinkSmall>
                    </SmallText>
                </NoSearchTextContainer>

                <NoSearchTextContainer aria-hidden={true}>
                    <PlaceHolderItem>{"_"}</PlaceHolderItem>
                </NoSearchTextContainer>

                <StyleLinkSmall href='https://www.twitch.tv/p/extensions/'>
                    {
                        "Configure extension page is at 'get started' and under 'my extensions'!"
                    }
                </StyleLinkSmall>
            </TwitchLandingMainHeader>
        );
    }

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>{`Troubleshoot Blerp for Twitch or Walk On | Common Problems and Answers`}</title>
                    <meta
                        name='description'
                        content='Sometimes the blerp for twitch extension does not work the way we want it to! Here are common ways people have solved problems to get the extension working correctly!'
                    />
                    <meta
                        property='og:description'
                        content='Sometimes the blerp for twitch extension does not work the way we want it to! Here are common ways people have solved problems to get the extension working correctly!'
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
                        {"Streamers who use blerp get featured on our site!"}
                    </TextSubtitle>
                    <ButtonLink color={focusState} href='/streams'>
                        {"Blerp Streams"}
                    </ButtonLink>
                </TwitchTopCallToActionRow>

                <TwitchLandingRow color={flyoutBackground}>
                    <TwitchLandingRowHeader>
                        {
                            'Using bits "Something went wrong message" or incorrect bit values showing up?'
                        }
                    </TwitchLandingRowHeader>
                    <TwitchLandingInnerRow>
                        <TwitchLandingHalfColumn>
                            <TwitchScreenShot
                                alt='Something went wrong Twitch bits'
                                src='https://storage.googleapis.com/blerp_products/Web/Streamer/Screen%20Shot%202019-09-13%20at%2011.22.04%20AM.png'
                            />
                        </TwitchLandingHalfColumn>

                        <TwitchLandingHalfColumn>
                            <NoSearchTextContainer>
                                <TextHeader alignment='left'>
                                    {
                                        "All Permission Settings Must Be Enabled For Extensions to Work"
                                    }
                                </TextHeader>
                                <TextSubtitle alignment='left'>
                                    {
                                        "In your extensions config https://www.twitch.tv/YOUR_USERNAME/dashboard/extensions/manage there is a permissions button that navigates to https://www.twitch.tv/YOUR_USERNAME/dashboard/extensions/permissions"
                                    }
                                </TextSubtitle>

                                <ContentScreenshot
                                    alt='Image of the permissions button'
                                    src='https://storage.googleapis.com/blerp_products/Web/Streamer/Screen%20Shot%202019-09-13%20at%2011.18.03%20AM.png'
                                />

                                <TextSubtitle alignment='left'>
                                    {
                                        "Find the permissions for the correct blerp extension and make sure all three settings are turned on and green"
                                    }
                                </TextSubtitle>

                                <ContentScreenshot
                                    alt='Twitch extension blerp pemissions'
                                    src='https://storage.googleapis.com/blerp_products/Web/Streamer/Screen%20Shot%202019-09-13%20at%202.37.51%20AM.png'
                                />

                                <ContentScreenshot
                                    alt='Extension walk on sounds pemissions'
                                    src='https://storage.googleapis.com/blerp_products/Web/Streamer/Screen%20Shot%202019-09-13%20at%202.37.56%20AM.png'
                                />
                            </NoSearchTextContainer>
                        </TwitchLandingHalfColumn>
                    </TwitchLandingInnerRow>
                </TwitchLandingRow>

                <TwitchLandingRow color={ligherBackground}>
                    <TwitchLandingRowHeader>
                        {"Browser Source Disconnected?"}
                    </TwitchLandingRowHeader>
                    <TwitchLandingInnerRow>
                        <TwitchLandingHalfColumn>
                            <NoSearchTextContainer>
                                <TextHeader alignment='center'>
                                    {"The Browser Source Must Be Open"}
                                </TextHeader>
                                <TextSubtitle alignment='center'>
                                    {
                                        "The scene with the browser source must be open. If you switch between scenes make sure every scene has a browser source."
                                    }
                                </TextSubtitle>
                            </NoSearchTextContainer>

                            <NoSearchTextContainer>
                                <TextHeader alignment='center'>
                                    {
                                        "The URL must match exactly the link in your config panel"
                                    }
                                </TextHeader>
                                <TextSubtitle alignment='center'>
                                    {
                                        "You can find the blerp config at the extensions page  https://www.twitch.tv/YOUR_USERNAME/dashboard/extensions/manage and clicking the gear icon of the extension. Under blerp setup make sure that link matches exactly what you put into your browser source."
                                    }
                                </TextSubtitle>
                            </NoSearchTextContainer>
                        </TwitchLandingHalfColumn>
                    </TwitchLandingInnerRow>
                </TwitchLandingRow>

                <TwitchLandingRow color={flyoutBackground}>
                    <TwitchLandingRowHeader>
                        {"Sounds not playing?"}
                    </TwitchLandingRowHeader>
                    <TextContainer>
                        <TextHeader alignment='center'>
                            {
                                "Make sure volume is turned up for the browser source"
                            }
                        </TextHeader>
                        <TextSubtitle alignment='center'>
                            {
                                "Your streaming software should let you set the volume of that browser source. Our extension also lets you change the volume of the sound playback. Make sure you are not muted on both ends."
                            }
                        </TextSubtitle>
                    </TextContainer>
                    <TextContainer>
                        <TextHeader alignment='center'>
                            {
                                "Make sure the audio from your browser source is routed correctly"
                            }
                        </TextHeader>
                        <TextSubtitle alignment='center'>
                            {
                                "The streaming software sometimes route the sounds to only play through your headphones. Make sure the sounds play correctly to your computer so the stream can pick up the sound!"
                            }
                        </TextSubtitle>
                    </TextContainer>
                </TwitchLandingRow>

                <TwitchLandingRow color={ligherBackground}>
                    <TwitchLandingRowHeader>
                        {"Not posting in chat?"}
                    </TwitchLandingRowHeader>

                    <TwitchLandingInnerRow>
                        <TwitchLandingHalfColumn>
                            <NoSearchTextContainer>
                                <TextHeader alignment='left'>
                                    {
                                        "Make sure both the extensions config and the permissions has chat enabled"
                                    }
                                </TextHeader>
                                <TextSubtitle alignment='left'>
                                    {
                                        "You can turn the chat feature on through the extension config panel (https://www.twitch.tv/YOUR_USERNAME/dashboard/extensions/manage) and the permissions page (https://www.twitch.tv/YOUR_USERNAME/dashboard/extensions/permissions). Currently extensions don't post to streamlabs chat but Twitch is working on a solution for this."
                                    }
                                </TextSubtitle>
                            </NoSearchTextContainer>
                        </TwitchLandingHalfColumn>
                    </TwitchLandingInnerRow>
                </TwitchLandingRow>

                <TwitchFoot />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
