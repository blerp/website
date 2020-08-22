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
import Footer from "../../components/navigation/footer";

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
    flex-direction: column;
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
    padding: 8px;
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
    width: 360px;
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
                    <title>{"How to Create Custom Soundboards | Blerp"}</title>
                    <meta
                        name='description'
                        content='Making soundboards on blerp is fast and easy! Make online soundboards and categorize your sounds in ways that you can easily access them.'
                    />
                    <meta
                        name='keywords'
                        content='soundboard maker, blerp, blerp sounds, audio quotes, best soundboard, Favorite Movies, sounds, funny quotes, tv show moments, great games, funny sound, quotes, movie soundboard, blurp, song lyrics, music snippets'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    <MainTitleH1>
                        How to make Custom Soundboards on Blerp
                    </MainTitleH1>
                    <StyledImg
                        alt='Custom Soundboards on Blerp'
                        src='https://storage.googleapis.com/blerp_products/Web/Tutorial/custom-boards.png'
                    />
                    <SecondaryTitleH2>
                        {
                            "Creating custom soundboards on blerp is simple and easy!"
                        }
                    </SecondaryTitleH2>
                </HeaderContainer>

                <RowContainer color={pandaNewTeal}>
                    <SecondaryTitleH2White>
                        First time creating a custom blerp soundboard?
                    </SecondaryTitleH2White>
                    <WhiteParagraph color={flyoutBackground}>
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
                    </WhiteParagraph>
                </RowContainer>

                <RowContainerTiny color={defaultBackground} />

                <RowContainer color={slidePurple}>
                    <SecondaryTitleH2White>
                        How to Make a Custom Blerp Soundboard?
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
                        {"Struggling to make the best soundboards?"}
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
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
