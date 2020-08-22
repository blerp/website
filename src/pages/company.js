/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { graphql, Query } from "@apollo/client";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";
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
    secondaryText,
    pandaTeal,
    focusState,
    darkText,
    ligherBackground,
    lightGray,
    headerText,
} from "../styles/colors";

const Container = styled.div`
    position: relative;
    justify-content: center;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-item: center;
    justify-content: center;
    background-color: ${flyoutBackground};
    padding: 40px;
    flex-direction: column;
    text-align: center;

    @media (max-width: 600px) {
        padding: 28px;
    }
`;

const MainTitleH1 = styled.h1`
    color: ${bodyText};
    font-weight: bold;
    text-decoration: none;
    margin: 0;
    text-align: center;
    font-size: 40px;
`;

const SecondaryTitleH2 = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 28px;
    text-decoration: none;
    margin: 0;
    padding-top: 12px;
    font-size: 20px;
    text-align: center;
`;

const RowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    background-color: ${props => props.color};
    min-height: 120px;

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

const TitleH3 = styled.h3`
    color: ${secondarySubtitleText};
    font-weight: bold;
    text-decoration: none;
    margin: 4px;
    padding: 12px;
    font-size: 24px;
    text-align: center;
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

const BoldParagraph = styled.p`
    color: ${bodyText};
    font-size: 16px;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
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

const TeamPicture = styled.img`
    width: 600px;
    margin: 40px;

    @media (max-width: 600px) {
        width: 280px;
    }
`;

const PictureContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RowContainerNoPadding = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background-color: ${props => props.color};

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
    }
`;

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    navigateToPath = path => () => {
        window.location.href = path;
    };

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Blerps Online Soundboard | Express Yourself - Audio Search Company | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Blerp Inc. is an online soundboard maker company. Blerp is the company is one of the leading companies within the audio clip and meme industry. Explore blerp.com to find your favorite sound clips, soundboards, and audio memes!'
                    />
                    <meta
                        property='og:description'
                        content='Blerp Inc. is an online soundboard maker company. Blerp is the company is one of the leading companies within the audio clip and meme industry. Explore blerp.com to find your favorite sound clips, soundboards, and audio memes!'
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
                <HeaderContainer>
                    <MainTitleH1>{"Company"}</MainTitleH1>
                    <SecondaryTitleH2>
                        {"Who is the team behind blerp?"}
                    </SecondaryTitleH2>
                    <PictureContainer>
                        <TeamPicture
                            alt={"Blerp Team Picture at TwitchCon"}
                            src='https://storage.googleapis.com/blerp-public-images/team/team-items.jpg'
                        />
                    </PictureContainer>
                </HeaderContainer>
                <RowContainerNoPadding color={defaultBackground}>
                    <TitleH3>
                        {
                            "Some people think we are just making the best soundboard. Innovating over the audio and meme industry is only a cool slice of what we do. We also aim to build products that unlock our creativity and enhance the way we connect with the people around us."
                        }
                    </TitleH3>
                </RowContainerNoPadding>
                <RowContainer
                    onClick={this.navigateToPath("/company/about-us")}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={"About Us"}
                        href={"/about"}
                        as={"/company/about-us"}
                        bigLink={true}
                    />
                </RowContainer>
                <RowContainer color={ligherBackground}>
                    <MainLink
                        text={"Podcast"}
                        as={"/company/podcast"}
                        href={"/podcast"}
                        bigLink={true}
                    />
                </RowContainer>
                <RowContainer
                    onClick={this.navigateToPath("/company/company-profiles")}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={"Company Team Profiles"}
                        as={"/company/company-profiles"}
                        href={"/company-profiles"}
                        bigLink={true}
                    />
                </RowContainer>
                <RowContainer
                    onClick={this.navigateToPath("/company/company-picks")}
                    color={ligherBackground}
                >
                    <MainLink
                        text={"Company Picks"}
                        href={"/company-picks"}
                        as={"/company/company-picks"}
                        bigLink={true}
                    />
                </RowContainer>
                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
