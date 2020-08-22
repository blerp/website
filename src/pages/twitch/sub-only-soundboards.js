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
import Link from "next/link";
import MainLink from "../../components/link/MainLink";
import { default as Router, withRouter } from "next/router";

import TwitchFoot from "../../components/navigation/TwitchFoot";

import projectConfig from "../../config";
const hostDomain = projectConfig.host;

import NavBar from "../../components/navigation/navbar";
import withData from "../../lib/withData";
import TabBar from "../../components/navigation/tabbar";

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
} from "../../styles/colors";

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
    padding: 60px;

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

const MainTitleH1 = styled.h1``;

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
    max-width: 600px;
`;

const BoldParagraph = styled.p`
    color: ${props => (props.color ? props.color : bodyText)};
    font-size: 20px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    line-height: 32px;
    padding: 20px 40px;
    max-width: 600px;
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
    max-width: 480px;
`;

const StyledImgSmall = styled.img`
    width: 600px;
`;

const StyledImgTiny = styled.img`
    width: 320px;
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
                            "Twitch Subscriber Only Soundboards | Build Your Community | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Create subscriber only soundboards for your twitch extension. Create soundboards that only your subscribers can use or open the boards up for bits.'
                    />
                    <meta
                        name='keywords'
                        content='soundboard maker, blerp, blerp sounds, audio quotes, best soundboard, Favorite Movies, sounds, funny quotes, tv show moments, great games, funny sound, quotes, movie soundboard, blurp, song lyrics, music snippets'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    <StyledImg
                        alt='Blerp Logo'
                        src='https://storage.googleapis.com/blerp_products/Web/Tutorial/sub-only-nocorners.png'
                    />
                    <MainTitleH1>
                        Engage Your Community Using Custom Soundboards!
                    </MainTitleH1>
                    <SecondaryTitleH2>
                        {
                            "Creating subscriber only and bit soundboards through blerp is simple and easy! "
                        }
                    </SecondaryTitleH2>
                </HeaderContainer>

                <RowContainer color={slidePurple}>
                    <SecondaryTitleH2White>
                        Creating your first custom Sub Only Soundboard?
                    </SecondaryTitleH2White>
                    <WhiteParagraph color={flyoutBackground}>
                        You must first{" "}
                        <StyleLinkSmall href='/login'>
                            create an account on blerp.com.
                        </StyleLinkSmall>{" "}
                        Second you should follow this simple guide to{" "}
                        <StyleLinkSmall href='/board-tutorial'>
                            create your first custom soundboard
                        </StyleLinkSmall>
                        .
                    </WhiteParagraph>
                </RowContainer>

                <RowContainerTiny color={defaultBackground} />

                <RowContainer color={pandaNewTeal}>
                    <SecondaryTitleH2White>
                        Feature Your Custom Board on your Twitch Extension
                    </SecondaryTitleH2White>
                    <WhiteParagraph>
                        First Navigate to Your Config Panel
                    </WhiteParagraph>
                    <StyleLinkSmall href='https://www.twitch.tv/ext/oafn7vvzfyzyccwrwrt233221oe5wq'>
                        Go to config panel
                    </StyleLinkSmall>
                    <WhiteParagraph>
                        After opening the config find the "Specific Soundboard
                        Settings"
                    </WhiteParagraph>
                    <StyledImgSmall
                        src='https://storage.googleapis.com/blerp_products/Web/Tutorial/sub-1.png'
                        alt='Screenshot of reccomend specific board settings'
                    />
                    <WhiteParagraph>
                        Click the Select Boards button to open the board chooser
                        modal. Search for the board you created and press
                        confirm.
                    </WhiteParagraph>
                    <StyledImgTiny
                        src='https://storage.googleapis.com/blerp_products/Web/Tutorial/sub-2.png'
                        alt='Screenshot of the open board chooser modal'
                    />
                    <WhiteParagraph>
                        Your chosen board will appear in the list below. Find
                        your board and set the desired settings on the board.
                    </WhiteParagraph>
                    <StyledImgSmall
                        src='https://storage.googleapis.com/blerp_products/Web/Tutorial/sub-3.png'
                        alt='Screenshot of chosen board'
                    />
                    <WhiteParagraph>
                        Your viewers will now see the soundboard as a
                        subscriber-only board! If you set a bit amount for the
                        board than that will show up as well!
                    </WhiteParagraph>
                    <StyledImgSmall
                        src='https://storage.googleapis.com/blerp_products/Web/Tutorial/sub06.png'
                        alt='Screenshot of viewers seeing the subscriber only board'
                    />
                </RowContainer>

                <RowContainer color={ligherBackground}>
                    <SecondaryTitleH2>
                        {
                            "Struggling to make the twitch extension work for you?"
                        }
                    </SecondaryTitleH2>
                    <Paragraph>
                        <MainLink
                            inline={true}
                            text={"Come find us if you need more help!"}
                            as={"/connect-with-us/contact"}
                            href={"/connect-with-us/contact"}
                        />
                    </Paragraph>
                </RowContainer>

                <TabBar />
                <TwitchFoot />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
