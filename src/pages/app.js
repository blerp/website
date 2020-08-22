/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import styled, { ThemeProvider } from "styled-components";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";

import withData from "../lib/withData";
import { DarkBody } from "../components/layouts/dark-body";
import withLogging from "../lib/withLogging";
import { Grid, Text, Icon } from "../components/theme/Theme";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import { useState, useEffect } from "react";

const Iphone = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/iphone%2011.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 570px;
    place-self: center;

    @media (max-width: 600px) {
        background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/mobile%20iphone%2011.png);
        background-position: right;
        background-size: cover;
    }
`;

const Note10 = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/note%205.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 700px;
    place-self: center;

    @media (max-width: 600px) {
        background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/mobile%20note%205.png);
        background-position-x: left;
        background-size: cover;
    }
`;

const Container = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/Web%20background.png);
    background-size: cover;
    display: flex;
    flex-direction: column;

    @media (max-width: 600px) {
        height: 1850px;
    }
`;

const StyledText = styled(Text)`
    position: relative;
    line-height: 24px;
    &&:before {
        content: "_";
        position: absolute;
        top: 12px;
        ${props => (props.right ? "right: -80px;" : "left: -110px;")}
        ${props =>
            props.mobile
                ? props.right
                    ? "right: -50px !important;"
                    : "left: -50px !important;"
                : ""}
    font-size: 0px;
        width: 20%;
        height: 2px;
        background-color: ${props => props.theme.colors.grey2};
    }

    &&:after {
        content: "_";
        position: absolute;
        top: 4px;
        ${props => (props.right ? "right: -80px;" : "left: -110px;")}
        ${props =>
            props.mobile
                ? props.right
                    ? "right: -50px !important;"
                    : "left: -50px !important;"
                : ""}
    font-size: 1px;
        width: 15px;
        height: 15px;
        background-color: ${props => props.theme.colors.seafoam};
        border: 2px solid white;
        border-radius: 50%;
    }
`;

const Link = styled.a`
    &:focus {
        border: 0px !important;
    }
`;

const StyledGrid = styled(Grid)`
    width: 100%;
    column-gap: 0px;
    margin-bottom: 300px;
    background-color: transparent !important;
    grid-template-columns: 33% 33% 33% !important;

    @media (max-width: 600px) {
        display: grid !important;
        grid-template-columns: 50% 50% !important;
    }
`;

const useWindowSize = () => {
    const isClient = typeof window === "object";

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
};
const isBrowser = typeof window !== "undefined";

const FooterContainer = styled.div``;

const Page = props => {
    const size = useWindowSize();

    const onClickPlay = () => {
        const audio = new Audio(
            "https://audio.blerp.com/audio/b3efc7e0-f20e-11e8-b17c-dd2e9bdb6825?type=MP3",
        );
        audio.play();
    };

    const renderMobile = () => {
        return (
            <>
                <Row style={{ justifyContent: "start", margin: "20px auto" }}>
                    <Text
                        style={{
                            letterSpacing: "1.8px",
                            lineHeight: "40px",
                            textAlign: "left",
                        }}
                        fontSize='48px'
                        fontColor='notBlack'
                        fontWeight='light'
                    >
                        Mobile Apps
                    </Text>
                </Row>
                <Row style={{ margin: "10px" }}>
                    <Text
                        style={{
                            letterSpacing: "1.8px",
                            lineHeight: "30px",
                            textAlign: "left",
                        }}
                        fontSize='21px'
                        fontColor='notBlack'
                        fontWeight='light'
                    >
                        Share and save sound bites, funny noises, and audio
                        memes on your favorite messaging platforms
                    </Text>
                </Row>
                <StyledGrid>
                    <Link
                        target='_blank'
                        href='https://apps.apple.com/us/app/blerp-audio-meme-soundboards/id1235261552'
                        style={{
                            width: "90%",
                            height: "40px",
                            backgroundSize: "contain",
                            borderRadius: "0",
                            alignSelf: "center",
                            justifySelf: "center",
                        }}
                    >
                        <Icon
                            style={{
                                width: "80%",
                                height: "30px",
                                backgroundSize: "contain",
                                borderRadius: "0",
                                margin: "0 auto",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/app%20store%20icon.svg'
                            hoverUrl='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/app%20store%20icon%20on%20hover.svg'
                        />
                    </Link>
                    <Link
                        target='_blank'
                        href='https://play.google.com/store/apps/details?id=com.lolibe.blerp&hl=en_US'
                        style={{
                            width: "90%",
                            height: "40px",
                            backgroundSize: "contain",
                            borderRadius: "0",
                            alignSelf: "center",
                            justifySelf: "center",
                        }}
                    >
                        <Icon
                            style={{
                                width: "80%",
                                height: "30px",
                                backgroundSize: "contain",
                                borderRadius: "0",
                                margin: "0 auto",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/google%20play.svg'
                            hoverUrl='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/google%20play%20on%20hover.svg'
                        />
                    </Link>
                    <Iphone></Iphone>
                    <div
                        style={{
                            width: "100%",
                            height: "670px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                        }}
                    >
                        <StyledText
                            mobile
                            fontWeight='light'
                            fontColor='notBlack'
                            fontSize='18px'
                            style={{ width: "80%", alignSelf: "flex-end" }}
                        >
                            Easily add a Blerp into any text message.
                        </StyledText>
                        <StyledText
                            mobile
                            fontWeight='light'
                            fontColor='notBlack'
                            fontSize='18px'
                            style={{ width: "80%", alignSelf: "flex-end" }}
                        >
                            IOS Keyboard extension.
                        </StyledText>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            height: "670px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                        }}
                    >
                        <StyledText
                            mobile
                            right
                            fontWeight='light'
                            fontColor='notBlack'
                            style={{ width: "80%", alignSelf: "flex-end" }}
                        >
                            Browse and share trending content
                        </StyledText>
                        <StyledText
                            mobile
                            right
                            fontWeight='light'
                            fontColor='notBlack'
                            style={{ width: "80%", alignSelf: "flex-end" }}
                        >
                            Sign into your Blerp account to quickly share your
                            saved Boards and Blerps.
                        </StyledText>
                    </div>
                    <Note10></Note10>
                    <Link
                        target='_blank'
                        href='https://apps.apple.com/us/app/blerp-audio-meme-soundboards/id1235261552'
                        style={{
                            width: "90%",
                            height: "40px",
                            backgroundSize: "contain",
                            borderRadius: "0",
                            alignSelf: "center",
                            justifySelf: "center",
                        }}
                    >
                        <Icon
                            style={{
                                width: "80%",
                                height: "30px",
                                backgroundSize: "contain",
                                borderRadius: "0",
                                margin: "0 auto",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/app%20store%20icon.svg'
                            hoverUrl='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/app%20store%20icon%20on%20hover.svg'
                        />
                    </Link>
                    <Link
                        target='_blank'
                        href='https://play.google.com/store/apps/details?id=com.lolibe.blerp&hl=en_US'
                        style={{
                            width: "90%",
                            height: "40px",
                            backgroundSize: "contain",
                            borderRadius: "0",
                            alignSelf: "center",
                            justifySelf: "center",
                        }}
                    >
                        <Icon
                            style={{
                                width: "80%",
                                height: "30px",
                                backgroundSize: "contain",
                                borderRadius: "0",
                                margin: "0 auto",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/google%20play.svg'
                            hoverUrl='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/google%20play%20on%20hover.svg'
                        />
                    </Link>
                </StyledGrid>
            </>
        );
    };

    return (
        <div>
            <Helmet>
                <title>
                    Blerp Mobile Apps | Audio Memes For Android and iOS | Blerp
                </title>
                <meta
                    name='description'
                    content='The Blerp Mobile App is now available for Android and IOS. You have the power of sound in your hands, with our easy to use audio search engine. Start sharing soundbites, funny noises, audio memes, messaging and more. Get the app today.'
                />
                <meta
                    property='og:description'
                    content='The Blerp Mobile App is now available for Android and IOS. You have the power of sound in your hands, with our easy to use audio search engine. Start sharing soundbites, funny noises, audio memes, messaging and more. Get the app today.'
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
            </Helmet>
            <NavBar />
            <Container>
                {size.width < 600 ? (
                    renderMobile()
                ) : (
                    <>
                        <Row
                            style={{
                                justifyContent: "center",
                                margin: "60px auto",
                            }}
                        >
                            <Text
                                fontSize='72px'
                                fontColor='notBlack'
                                fontWeight='light'
                            >
                                Mobile Apps
                            </Text>
                        </Row>
                        <Row
                            style={{
                                justifyContent: "center",
                                width: "60%",
                                marginBottom: "80px",
                            }}
                        >
                            <Text
                                style={{
                                    letterSpacing: "1.8px",
                                    lineHeight: "30px",
                                    textAlign: "center",
                                }}
                                fontSize='36px'
                                fontColor='notBlack'
                                fontWeight='light'
                            >
                                Share and save sound bites, funny noises, and
                                audio memes on your favorite messaging platforms
                            </Text>
                        </Row>
                        <StyledGrid>
                            <Link
                                target='_blank'
                                href='https://apps.apple.com/us/app/blerp-audio-meme-soundboards/id1235261552'
                                style={{
                                    width: "220px",
                                    height: "80px",
                                    backgroundSize: "contain",
                                    borderRadius: "0",
                                    alignSelf: "end",
                                    justifySelf: "center",
                                }}
                            >
                                <Icon
                                    style={{
                                        width: "220px",
                                        height: "80px",
                                        backgroundSize: "contain",
                                        borderRadius: "0",
                                        alignSelf: "end",
                                        justifySelf: "center",
                                    }}
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/app%20store%20icon.svg'
                                    hoverUrl='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/app%20store%20icon%20on%20hover.svg'
                                />
                            </Link>
                            <div></div>
                            <Link
                                target='_blank'
                                href='https://play.google.com/store/apps/details?id=com.lolibe.blerp&hl=en_US'
                                style={{
                                    width: "220px",
                                    height: "80px",
                                    backgroundSize: "contain",
                                    borderRadius: "0",
                                    alignSelf: "end",
                                    justifySelf: "center",
                                }}
                            >
                                <Icon
                                    style={{
                                        width: "220px",
                                        height: "80px",
                                        backgroundSize: "contain",
                                        borderRadius: "0",
                                        alignSelf: "end",
                                        justifySelf: "center",
                                    }}
                                    url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/google%20play.svg'
                                    hoverUrl='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Mobile/google%20play%20on%20hover.svg'
                                />
                            </Link>
                            <div
                                style={{
                                    width: "100%",
                                    height: "670px",
                                    display: "flex",
                                }}
                            >
                                <Iphone></Iphone>
                            </div>
                            <div
                                style={{
                                    width: "100%",
                                    height: "670px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                }}
                            >
                                <StyledText
                                    fontWeight='light'
                                    fontColor='notBlack'
                                    right
                                    style={{
                                        width: "80%",
                                        alignSelf: "flex-end",
                                    }}
                                >
                                    Sign into your Blerp account to quickly
                                    share your saved boards and Blerps.
                                </StyledText>
                                <StyledText
                                    fontWeight='light'
                                    fontColor='notBlack'
                                    style={{ width: "80%" }}
                                >
                                    Easily add a Blerp into any text message.
                                </StyledText>
                                <StyledText
                                    fontWeight='light'
                                    fontColor='notBlack'
                                    style={{ width: "80%" }}
                                >
                                    Keyboard extension available on IOS.
                                </StyledText>
                            </div>
                            <Note10></Note10>
                        </StyledGrid>
                    </>
                )}
            </Container>

            <FooterContainer>
                <Footer />
            </FooterContainer>
        </div>
    );
};

export default withData(withLogging(Page));

// <Link href="https://storage.googleapis.com/blerp-web-images/static/badges/amazon-alexa-badge.png">
//   <StoreDownloadButton src="/static/images/amazon-alexa-badge.png" />
// </Link>
