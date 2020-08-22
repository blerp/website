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
import Link from "next/link";
import MainLink from "../components/link/MainLink";
import { default as Router, withRouter } from "next/router";
import Footer from "../components/navigation/footer";

import projectConfig from "../config";
const hostDomain = projectConfig.host;

import NavBar from "../components/navigation/navbar";
import withData from "../lib/withData";
import TabBar from "../components/navigation/tabbar";

import {
    defaultBackground,
    statusColor,
    bodyText,
    pandaPink,
    flyoutBackground,
    secondarySubtitleText,
    slidePurple,
    secondaryText,
    pandaTeal,
    focusState,
    darkBlue,
    darkText,
    ligherBackground,
    lightGray,
    headerText,
    darkestBackground,
    pandaNewTeal,
} from "../styles/colors";

const Container = styled.div`
    position: relative;
    justify-content: center;
`;

const HeaderContainer = styled.div`
    background-color: ${flyoutBackground};
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 60px;

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

const MainTitleH1 = styled.h1`
    &:hover {
        opacity: 0.7;
    }
`;

const SecondaryTitleH2 = styled.h2`
    color: ${props => (props.color ? props.color : secondarySubtitleText)};
    font-weight: light;
    font-size: 32px;
    text-decoration: none;
    margin: 0;
    padding: 20px;
    text-align: center;
`;

const SecondaryTitleH2White = styled.h2`
    color: ${props => (props.color ? props.color : flyoutBackground)};
    font-weight: light;
    font-size: 32px;
    text-decoration: none;
    margin: 0;
    padding: 20px;
    text-align: center;
`;

const RowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;
    background-color: ${props => props.color};
    min-height: 32px;

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const RowContainerTiny = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background-color: ${props => props.color};
    min-height: 12px;

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
    padding-top: 12px;
    font-size: 28px;
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
    font-size: 20px;
    text-decoration: none;
    line-height: 32px;
    text-align: center;
`;

const WhiteParagraph = styled.p`
    color: ${flyoutBackground};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    line-height: 32px;
    text-align: center;
`;

const BoldParagraph = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    line-height: 32px;
    padding: 0 0 40px;
`;

const MainTemplateLink = styled.a`
    display: block;
    text-decoration: none;
    padding: 4px;
    color: ${focusState};
    font-size: 20px;

    &:hover {
        color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const NavigationButton = styled.a`
    font-weight: lighter;
    padding: 12px 20px;
    margin: 20px;
    text-decoration: none;
    color: ${flyoutBackground};
    white-space: nowrap;
    background: ${pandaPink};
    border-radius: 40px;
    font-size: 14px;
    line-height: 20px;
    border: none;

    &:focus {
        border-radius: 40px;
    }

    &:hover {
        transition: all 0.2s ease 0s;
        background: rgb(240, 240, 240);
        color: rgb(254, 41, 92);
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const HiddenTag = styled.div`
    opacity: 0;
`;

const StyledImg = styled.img`
    width: 100%;
    min-width: 300px;
`;

const StyledImgSmall = styled.img`
    width: 300px;
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

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    renderHomeLink() {
        return (
            <Link prefetch={true} href='/'>
                <MainTemplateLink>{"Home"}</MainTemplateLink>
            </Link>
        );
    }

    navigateToPath = path => () => {
        window.location.href = path;
    };

    playBlerp = () => {
        const audio = new Audio(
            "https://audio.blerp.com/audio/b3efc7e0-f20e-11e8-b17c-dd2e9bdb6825?type=MP3",
        );
        audio.play();
    };

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Blerps | Express Yourself Using Audio - Online Soundboard Maker | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Blerp is best and fastest audio search engine for all audio clips & sound bites & meme soundboards. Blerp not only has 2019 meme soundboards, but it also has 2018 meme soundboards as well as 2020 meme soundboards. Search our soundboard search engine for dank audio memes and funny audio clips to share with others. Use Blerp on Discord and Twitch and find new ways to communicate. This page will show you how to make a soundboard.'
                    />
                    <meta
                        name='keywords'
                        content='blerp, blerp sounds, audio quotes, best soundboard, Favorite Movies, sounds, funny quotes, tv show moments, great games, funny sound, quotes, movie soundboard, blurp, song lyrics, music snippets'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    <MainTitleH1 onClick={this.playBlerp}>
                        <HiddenTag>
                            Blerps | How to Make a Soundboard?
                        </HiddenTag>
                        <StyledImg
                            alt='Blerp Logo'
                            src='https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg'
                        />
                    </MainTitleH1>
                    <SecondaryTitleH2>
                        {
                            "Blerps - the best way to create, communicate, and share soundboards with your peers online"
                        }
                    </SecondaryTitleH2>
                    <NavigationButton href='/'>
                        Start Browsing For Audio Clips and Soundboards
                    </NavigationButton>
                </HeaderContainer>

                <RowContainer color={slidePurple}>
                    <SecondaryTitleH2White>
                        Meme Soundboard Maker Creation Tool
                    </SecondaryTitleH2White>
                    <BoldParagraph color={flyoutBackground}>
                        You can be a soundboard maker after{" "}
                        <StyleLinkSmall href='/login'>
                            creating an account on blerp.com.
                        </StyleLinkSmall>{" "}
                        Search through the millions of audio clips we have to
                        offer or{" "}
                        <StyleLinkSmall href='/upload'>
                            create your own soundbite!
                        </StyleLinkSmall>
                        .
                    </BoldParagraph>
                </RowContainer>

                <RowContainerTiny color={defaultBackground} />

                <RowContainer color={pandaNewTeal}>
                    <SecondaryTitleH2White>
                        The Online Meme Soundboard Creator Tool - How to Make a
                        Soundboard?
                    </SecondaryTitleH2White>
                    <WhiteParagraph>
                        Simply hover over a blerp and a share button will
                        appear.
                    </WhiteParagraph>
                    <StyledImgSmall
                        src='https://storage.googleapis.com/blerp_products/Web/Misc/Screen%20Shot%202019-07-16%20at%208.52.47%20AM.png'
                        alt='Screenshot of hovering over a blerp on website'
                    />
                    <WhiteParagraph>
                        Clicking on the share button will open a menu.
                    </WhiteParagraph>
                    <StyledImgSmall
                        src='https://storage.googleapis.com/blerp_products/Web/Misc/Screen%20Shot%202019-07-16%20at%208.58.40%20AM.png'
                        alt='Screenshot of clicking on the share button on blerp'
                    />
                    <WhiteParagraph>
                        The menu will give you the option to add the blerp to an
                        existing or new soundboard.
                    </WhiteParagraph>
                    <StyledImgSmall
                        src='https://storage.googleapis.com/blerp_products/Web/Misc/create-boards-fina.png'
                        alt='Screenshot of finding or creating a new board'
                    />
                    <WhiteParagraph>
                        Once added to a soundboard you will be able to navigate
                        to your profile using the circle in the header and find
                        all the soundboards that you have created.
                    </WhiteParagraph>
                    <StyledImgSmall
                        src='https://storage.googleapis.com/blerp_products/Web/Tutorial/board/board-page.png'
                        alt='Screenshot of finding or creating a new board'
                    />
                </RowContainer>

                <RowContainer color={ligherBackground}>
                    <SecondaryTitleH2>
                        Blerps Are More Than Just Sound Memes
                    </SecondaryTitleH2>
                    <BoldParagraph>
                        Make your point, win that argument, get the crowd
                        laughing and generally disrupt the status quo. Living in
                        the digital age requires new ways to communicate and
                        express yourself. Learn more about the Blerp Audio
                        Search engine and start expressing yourself.
                    </BoldParagraph>

                    <iframe
                        width='560'
                        height='315'
                        src='https://www.youtube.com/embed/aHdo8sLbiHA'
                        frameBorder='0'
                    />
                </RowContainer>

                <RowContainer color={slidePurple}>
                    <SecondaryTitleH2White>
                        {"The Story of Blerp"}
                    </SecondaryTitleH2White>
                    <WhiteParagraph>
                        Wise software engineers once said...{" "}
                        <MainLink
                            inline={true}
                            text={"(that would be us, the creators of Blerp)"}
                            as={"/company/about-us"}
                            href={"/about"}
                        />{" "}
                        - A Blerp a day keeps a frown away
                    </WhiteParagraph>

                    <WhiteParagraph>
                        While this hasn’t been scientifically tested, we still
                        think it’s true. Use the online soundboard maker to
                        setup a board of your own, and Blerp your heart out.
                    </WhiteParagraph>
                </RowContainer>

                <RowContainer
                    onClick={this.navigateToPath("/blerps/what-is-blerp")}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={"What is Blerp?"}
                        as={"/blerps/what-is-blerp"}
                        href={"/what-is-blerp"}
                    />
                    <Paragraph>
                        {
                            "Click to find out - what have you got to lose? We promise we don’t bite."
                        }
                    </Paragraph>
                </RowContainer>
                <RowContainer color={ligherBackground}>
                    <MainLink
                        text={"How is Blerp Used?"}
                        as={"/blerps/how-blerp-is-used"}
                        href={"/how-blerp-is-used"}
                    />
                    <Paragraph>
                        {
                            "While Blerp is a custom soundboard maker, we do have a bit of a following on some big name sites like Twitch and Discord (not to toot our own horn)."
                        }
                    </Paragraph>
                </RowContainer>
                <RowContainer color={pandaNewTeal}>
                    <WhiteParagraph>
                        Be a part of our{" "}
                        <MainLink
                            inline={true}
                            text='Discord Community'
                            as={"https://discord.gg/uXX3EXh"}
                            href={"https://discord.gg/uXX3EXh"}
                            dontPrefetch={true}
                            bigLink={false}
                        />
                        , or start your own tribe.
                    </WhiteParagraph>
                </RowContainer>
                <RowContainer
                    onClick={this.navigateToPath(
                        "/blerps/suggest-ways-to-blerp",
                    )}
                    color={ligherBackground}
                >
                    <MainLink
                        text={"Suggest ways to Blerp!"}
                        as={"/blerps/suggest-ways-to-blerp"}
                        href={"/suggest-ways-to-blerp"}
                    />
                    <Paragraph>
                        {
                            "Are you the kind of person that marches to the beat of your own drum? Well make a suggestion to where you would like to see an integration of our sound effects library."
                        }
                    </Paragraph>
                </RowContainer>
                <RowContainer
                    onClick={this.navigateToPath("/soundbites")}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={"Find all the soundbites!"}
                        href={"/soundbites"}
                        as={"/soundbites"}
                    />
                    <Paragraph>
                        We bring all your favorite audioclips and soundboards
                        into one place. Use our{" "}
                        <MainLink
                            inline={true}
                            text={"Mobile Apps"}
                            as={"/soundboard-products/mobile-apps"}
                            href={"/app"}
                        />{" "}
                        for online and offline playblack! Play and share your
                        favorite audioclips anywhere in the world!
                    </Paragraph>
                </RowContainer>
                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
