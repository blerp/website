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

import { DarkBody } from "../components/layouts/dark-body";

const LogoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 12px;

    &:hover {
        opacit: 0.7;
    }
`;

const Logo = styled.img`
    align-self: center;
    padding: 20px;

    @media (min-width: 600px) {
        width: 200px;
    }

    @media (max-width: 600px) {
        width: 200px;
    }
`;

const Blurb = styled.h1`
    font-size: 30px;
    text-align: center;
`;

const Subtitle = styled.h2`
    font-size: 16px;
    text-align: center;
    padding: 8px;
`;

const StoreDownloadButton = styled.img`
    justify-content: center;
    align-items: center;

    @media (min-width: 600px) {
        width: 200px;
        padding: 20px;
    }

    @media (max-width: 600px) {
        width: 300px;
        padding: 24px;
    }
`;

const StoreDownloadCircle = styled.img`
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    padding: 12px;
`;

const StoreDownloadContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-bottom: 12px;
`;

const Link = styled.a`
    text-decoration: none;
    color: #7fc6e1;
`;

const FooterContainer = styled.div``;

class Page extends React.Component {
    state;
    props;

    onClickPlay = () => {
        const audio = new Audio(
            "https://audio.blerp.com/audio/b3efc7e0-f20e-11e8-b17c-dd2e9bdb6825?type=MP3",
        );
        audio.play();
    };

    render() {
        return (
            <div>
                <Helmet>
                    <title>
                        Blerp | Alexa, Cortana, Google Voice Assistant | Blerp
                        Apps
                    </title>
                    <meta
                        name='description'
                        content='Okay google use blerp! Use your favorite voice assistants to interact with the best soundboard, sound bites, search engine. Use blerp through your favorite smart speakers.'
                    />
                    <meta
                        property='og:description'
                        content='Okay google use blerp! Use your favorite voice assistants to interact with the best soundboard, sound bites, search engine. Use blerp through your favorite smart speakers.'
                    />
                    <meta
                        name='keywords'
                        content='google, alexa, cortana, voice assistant, voice bots, movie quotes, soundboards, blerp, blerp sounds, blerp soundboard, star wars quotes, soundbites, sound, bites, lotr quotes, audio memes, sound memes, lord of the rings, tv shows, movie quotes, show quotes, funny quotes, music quotes, netflix quotes, funny movie sounds, sounds audio, Blurp'
                    />
                </Helmet>
                <NavBar />
                <DarkBody>
                    <Blurb>Blerp Voice Assistants</Blurb>
                    <LogoContainer>
                        <Link onClick={this.onClickPlay}>
                            <Logo
                                src='https://storage.googleapis.com/blerp-public-images/twitch/landing/Blerp-logo-item.png'
                                alt='Blerp Logo'
                            />
                        </Link>
                    </LogoContainer>
                    <Subtitle>
                        Use blerp's audio search engine technology with your
                        favorite voice assistants and chat bots!
                    </Subtitle>
                    <StoreDownloadContainer>
                        <Link href='https://assistant.google.com/services/a/uid/000000aee04755ed?source=web'>
                            <StoreDownloadButton
                                src='https://storage.googleapis.com/blerp-web-images/static/badges/google-assistant-badge.png'
                                alt='Google Assistant Badge'
                            />
                        </Link>
                        <Link href='/discord'>
                            <StoreDownloadCircle
                                src='https://storage.googleapis.com/blerp-web-images/static/discord/Discord_logo_circle-tiny.png'
                                alt='Discord Logo'
                            />
                        </Link>
                    </StoreDownloadContainer>
                </DarkBody>
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </div>
        );
    }
}

export default withData(Page);
