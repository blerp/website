/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

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
    primaryText,
} from "../styles/colors";

const DarkBody = styled.div`
    background-color: ${darkBackground};
    color: ${primaryText};
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 40px;

    @media (max-width: 600px) {
        text-align: center;
    }
`;

const InnerBody = styled.div`
    max-width: 600px;
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

    &:hover {
        opacit: 0.7;
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
    font-size: 40px;
    text-align: center;
`;

const Subtitle = styled.h2`
    margin-top: 10px;
    font-size: 28px;
    text-align: center;
    padding: 8px;
`;

const BodyText = styled.p`
    margin-top: 10px;
    font-size: 20px;
    text-align: center;
    padding: 8px;
    line-height: 28px;
`;

const DiscordDownloadButton = styled.a`
    background-color: Transparent;
    border: 2px solid #fff;
    color: #fff;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    transition: 0.3s;
    padding: 15px;
    font-size: 25px;
    font-weight: 300;
    margin: 20px;
    display: block;
    justify-content: center;
    align-items: center;
    width: 320px;
    text-align: center;
    text-decoration: none;

    &:hover {
        color: #34383e;
        transition: all 0.2s ease 0s;
        background: #fff;
    }
`;

const DiscordDownloadContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-bottom: 12px;
`;

const InstructionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    @media only screen and (min-width: 1390px) {
        height: 600px;
    }

    @media only screen and (max-width: 1390px) {
        height: 1200px;
    }

    @media only screen and (max-width: 580px) {
        height: 2300px;
    }
`;

const VideoContainer = styled.div`
    margin: 16px 0;
    z-index: 1000;
    align-self: center;
    margin: 0 auto;
`;

const FooterContainer = styled.div`
    display: block;
`;

class Page extends React.Component {
    state;
    props;

    render() {
        return (
            <div>
                <Helmet>
                    <title>
                        Blerp Meme Soundboard for Discord | Soundboard for
                        Discord | Blerp
                    </title>
                    <meta
                        name='description'
                        content="Soundboard for discord is the best way to search, share, and play sounds and audio clips within discord voice chtas. Blerp's Discord meme soundboard bot pulls audio clips from blerp's large database of sound clips. The soundboard for discord uses blerp's meme sound packs to make your Discord server more fun and engaging!"
                    />
                    <meta
                        property='og:description'
                        content="Soundboard for discord is the best way to search, share, and play sounds and audio clips within discord voice chtas. Blerp's Discord meme soundboard bot pulls audio clips from blerp's large database of sound clips. The soundboard for discord uses blerp's meme sound packs to make your Discord server more fun and engaging!"
                    />
                    <style type='text/css'>{`
            body {
              background-color: #1d1d1d;
            }
          `}</style>
                </Helmet>
                <NavBar />
                <DarkBody>
                    <InnerBody>
                        <MainTitle>
                            Blerp Meme Soundboard for Discord Bot | Soundboard
                            for Discord | Blerp
                        </MainTitle>
                        <LogoContainer>
                            <LogoLink href='/soundboard-products/discord'>
                                <Logo
                                    alt={"Blerp Logo"}
                                    src='https://storage.googleapis.com/blerp-public-images/twitch/landing/Blerp-Logo-Android.png'
                                />
                            </LogoLink>
                            <span aria-hidden={true}>+</span>
                            <LogoLink href='/soundboard-products/discord'>
                                <Logo
                                    alt={"Discord Logo"}
                                    src='https://storage.googleapis.com/blerp-web-images/static/discord/Discord_logo_circle-tiny.png'
                                />
                            </LogoLink>
                        </LogoContainer>

                        <Subtitle>
                            The Soundboard for Discord Bot is Used to Play Audio
                            Clips Within Your Text and Voice Chats!
                        </Subtitle>

                        <BodyText>
                            Blerp's Discord soundboard meme bot pulls audio
                            clips from blerp's large database of sound clips.
                            The soundboard for discord uses blerp's meme sound
                            packs to make your Discord server more fun and
                            engaging! Play Soundbites, Quotes, Funny Noises,
                            Audio Memes, Game Tunes... and More! Join a voice
                            chat and use our discord soundboard commands to play
                            sounds in your voice chat.
                        </BodyText>

                        <VideoContainer>
                            <iframe
                                width='600'
                                height='400'
                                src='https://www.youtube.com/embed/0cctIZvKFac'
                                frameBorder='0'
                                data-allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                title=''
                            />
                        </VideoContainer>

                        <DiscordDownloadContainer>
                            <DiscordDownloadButton href='https://discordapp.com/oauth2/authorize?client_id=421504209997791232&scope=bot&permissions=104197184'>
                                Invite Blerp Bot To Your Discord Server
                            </DiscordDownloadButton>
                        </DiscordDownloadContainer>

                        <Subtitle>
                            Setup Discord Soundboard Bot - Step 1
                        </Subtitle>

                        <BodyText>
                            After inviting the blerp discord soundboard bot to
                            your server using our link above. To simply play a
                            command in a voice chat you must first join a voice
                            chat. Make sure that the blerp sound bot has
                            permissions to join that same voice chat.
                        </BodyText>

                        <Subtitle>Search Sound Memes - Step 2</Subtitle>
                        <BodyText>
                            Use b!p [keywords] or b!s [keywords] to search for
                            your favorite soundbites. The command will display a
                            list of sounds numbered by reactions.
                        </BodyText>

                        <Subtitle>Play the Audio Clip - Step 3</Subtitle>

                        <BodyText>
                            Once all the reactions are loaded onto the message
                            hit the reaction with the number of the sound meme
                            you want to play in your Discord voice chat. The bot
                            will instantly join your voice chat and play your
                            chosen sound. You can then use b!l to make the
                            discord soundboard bot leave the voice chat.
                        </BodyText>

                        <Subtitle>
                            The Blerp Soundboard Discord Bot Has Many Different
                            Uses
                        </Subtitle>

                        <BodyText>
                            Now you can play all the dank sound memes, hot
                            mixtapes, and even celebrity impersonation tracks
                            within Discord. We also have apps for you to access
                            and play the best sound effects from anywhere you
                            want. Feel free to put your favorite loops and
                            sounds onto blerp using our creation tools. We have
                            seen users use blerp soundboard software to play
                            sounds on Teamspeak, Discord, Skype, Curse and even
                            Google Hangouts.
                        </BodyText>

                        <DiscordDownloadContainer>
                            <DiscordDownloadButton href='/soundboard-products/discord'>
                                Full Command List For Discord Bot
                            </DiscordDownloadButton>
                        </DiscordDownloadContainer>
                    </InnerBody>
                </DarkBody>

                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </div>
        );
    }
}

export default withData(Page);
