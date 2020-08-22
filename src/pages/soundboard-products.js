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
import Footer from "../components/navigation/footer";

import MainLink from "../components/link/MainLink";

import projectConfig from "../config";
const hostDomain = projectConfig.host;

import NavBar from "../components/navigation/navbar";
import withData from "../lib/withData";

import {
    defaultBackground,
    statusColor,
    bodyText,
    pandaPink,
    flyoutBackground,
    secondarySubtitleText,
    secondaryText,
    pandaTeal,
    focusState,
    darkText,
    ligherBackground,
    lightGray,
    headerText,
    darkBackground,
} from "../styles/colors";

const ThreeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    padding: 80px;

    @media (max-width: 600px) {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 40px;
    }
`;

const SoundVideo = styled.video`
    width: 320px;
    height: 200px;
    margin: 8px;
`;

const Container = styled.div`
    position: relative;
    justify-content: center;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${flyoutBackground};
    padding: 60px;
    align-items: flex-start;

    @media (max-width: 600px) {
        text-align: center;
        padding: 12px;
    }
`;

const MainTitleH1 = styled.h3`
    color: ${bodyText};
    font-weight: bold;
    font-size: 40px;
    text-decoration: none;
    margin: 0;
    padding: 16px;

    @media (max-width: 600px) {
        text-align: center;
        font-size: 32px;
    }
`;

const SecondaryTitleH2 = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 28px;
    text-decoration: none;
    margin: 0;
    padding: 16px;
    font-size: 20px;

    @media (max-width: 600px) {
        text-align: center;
        font-size: 20px;
    }
`;

const RowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;
    background-color: ${props => props.color};
    opacity: 1;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const RowContainerNoPadding = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0 0;
    background-color: ${props => props.color};

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const TitleH3 = styled.h3`
    color: ${bodyText};
    font-weight: bold;
    text-decoration: none;
    margin: 4px;
    padding: 40px;
    font-size: 36px;
`;

const Subtitle = styled.h4`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    margin: 4px;
`;

const Paragraph = styled.p`
    color: ${bodyText};
    font-weight: light;
    font-size: 16px;
    text-decoration: none;
`;

const ParagraphWhite = styled.p`
    color: ${flyoutBackground};
    font-weight: light;
    font-size: 16px;
    text-decoration: none;
`;

const MainTemplateLink = styled.a`
    display: block;
    text-decoration: none;
    color: ${focusState};
    font-size: 24px;
    padding: 16px;
    border-radius: 40px;

    &:hover {
        color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
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

const BlerpForTwitchText = styled.h3`
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

const LogoContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    margin: 12px;
    font-size: 70px;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const Logo = styled.img`
    align-self: center;
    padding: 20px 50px;

    @media (min-width: 600px) {
        width: 200px;
    }

    @media (max-width: 600px) {
        width: 200px;
    }
`;

const LogoLink = styled.a`
    text-decoration: none;
`;

const MainTitle = styled.h1`
    color: ${flyoutBackground};
    font-size: 40px;
    text-align: center;
`;

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Soundboard Products | Audio memes, Twitch & Discord | Blerp"
                        }
                    </title>
                    <script type='application/ld+json'>{`
          [
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Blerp",
              "operatingSystem": "IOS",
              "applicationCategory": "https://schema.org/GameApplication",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "68"
              },
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Blerp",
              "operatingSystem": "ANDROID",
              "applicationCategory": "https://schema.org/GameApplication",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.3",
                "ratingCount": "53"
              },
              "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
              }
            }
          ]
      `}</script>
                    <meta
                        name='description'
                        content='Use Blerp soundboard products for any of your online channels. Blerp audio memes integrate with Twitch and Discord, making it easy to share a soundbite. Blerp is available on your Android and IOS mobile devices so you can Blerp on the go.'
                    />
                    <meta
                        name='keywords'
                        content='movie quotes, soundboards, blerp, blerp sounds, blerp soundboard, star wars quotes, soundbites, sound, bites, lotr quotes, audio memes, sound memes, lord of the rings, tv shows, movie quotes, show quotes, funny quotes, music quotes, netflix quotes, funny movie sounds, sounds audio, Blurp'
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
                        content='https://storage.googleapis.com/blerp-public-images/video/blerp!.mp4'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    <MainTitleH1>
                        {
                            "Create a Custom Soundboard Online for your Audio Clip Needs"
                        }
                    </MainTitleH1>
                    <SecondaryTitleH2>
                        {
                            "Create and share sound bites, funny noises, audio memes in messaging, voice chats, party settings, and more from Blerp’s audio effects library."
                        }
                    </SecondaryTitleH2>
                </HeaderContainer>
                <ThreeContainer color={flyoutBackground}>
                    <SoundVideo width={320} height={240} controls>
                        <source
                            src='https://storage.googleapis.com/blerp-public-images/video/justdoit!.mp4'
                            type='video/mp4'
                        />
                        Just Do It Sound Video
                    </SoundVideo>
                    <SoundVideo width={320} height={240} controls>
                        <source
                            src='https://storage.googleapis.com/blerp-public-images/video/blerp!.mp4'
                            type='video/mp4'
                        />
                        Victory Sound Effect Video
                    </SoundVideo>
                    <SoundVideo width={320} height={240} controls>
                        <source
                            src='https://storage.googleapis.com/blerp-public-images/video/victory.mp4'
                            type='video/mp4'
                        />
                        Blerp Sound Effect
                    </SoundVideo>
                </ThreeContainer>
                <RowContainerNoPadding color={flyoutBackground}>
                    <TitleH3>{"Blerp Soundboard Products"}</TitleH3>
                </RowContainerNoPadding>
                <MainLink
                    text={"Blerp for Twitch"}
                    as={"/soundboard-products/twitch"}
                    href={"/twitch"}
                >
                    <RowContainer color={pandaTeal}>
                        <TwitchBlerp
                            alt='sprinkle image decoration'
                            src='https://storage.googleapis.com/blerp-public-images/twitch/landing/background-svg.svg'
                            aria-hidden='true'
                        />
                        <HorionzontalLogo
                            src='https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg'
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
                        <Paragraph>
                            {
                                "Use Blerp to generate sounds for Twitch, and find new ways to communicate with the Twitch community. Try our integration now."
                            }
                        </Paragraph>
                    </RowContainer>
                </MainLink>
                <MainLink
                    text={"Blerp Mobile Apps"}
                    as={"/soundboard-products/mobile-apps"}
                    href={"/app"}
                >
                    <RowContainer color={flyoutBackground}>
                        <MainLink
                            text={"Blerp Mobile Apps"}
                            as={"/soundboard-products/mobile-apps"}
                            href={"/app"}
                        />
                        <Paragraph>
                            {
                                "Take your dank meme soundboard on the go with the Blerp mobile app. For android and IOS. Blerp anytime, anywhere. Even use blerp in your iMessage Keyboard!"
                            }
                        </Paragraph>
                    </RowContainer>
                </MainLink>

                <MainLink
                    text={"Blerp for Discord"}
                    as={"/soundboard-products/discord"}
                    href={"/discord"}
                >
                    <RowContainer color={darkBackground}>
                        <MainTitle>Blerp for Discord</MainTitle>
                        <LogoContainer>
                            <LogoLink href='https://discordapp.com/oauth2/authorize?client_id=421504209997791232&scope=bot&permissions=104197184'>
                                <Logo
                                    alt={"Blerp Logo"}
                                    src='https://storage.googleapis.com/blerp-public-images/twitch/landing/Blerp-Logo-Android.png'
                                />
                            </LogoLink>
                            <span aria-hidden={true}>+</span>
                            <LogoLink href='https://discordapp.com/oauth2/authorize?client_id=421504209997791232&scope=bot&permissions=104197184'>
                                <Logo
                                    alt={"Discord Logo"}
                                    src='https://storage.googleapis.com/blerp-web-images/static/discord/Discord_logo_circle-tiny.png'
                                />
                            </LogoLink>
                        </LogoContainer>
                        <ParagraphWhite>
                            {
                                "Take your free voice and text chat for gamers to the next level with Blerp for discord."
                            }
                        </ParagraphWhite>
                    </RowContainer>
                </MainLink>

                <MainLink
                    as={"/soundboard-products/voice-assistants"}
                    href={"/voice-assistants"}
                >
                    <RowContainer color={ligherBackground}>
                        <MainLink
                            text={"Blerp Voice Assistants"}
                            as={"/soundboard-products/voice-assistants"}
                            href={"/voice-assistants"}
                        />
                        <Paragraph>
                            {
                                "Search sounds, audio clips, and soundboards conveniently from your favorite smart speaker!"
                            }
                        </Paragraph>
                    </RowContainer>
                </MainLink>

                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
