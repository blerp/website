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
                            "Top Blerp Sounds and Soundboards | Best Curated Meme Soundboards | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Find the best soundboards on blerp.com. We have all the top sounds and soundboards for you to share with your friends.'
                    />
                    <meta
                        property='og:description'
                        content='Find the best soundboards on blerp.com. We have all the top sounds and soundboards for you to share with your friends.'
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
                    <MainTitleH1>
                        {"Top Blerp Sounds and Soundboards"}
                    </MainTitleH1>
                    <SecondaryTitleH2>
                        {
                            "Blerp meme soundboards are curated just for you! We have some of the best soundboards from your favorite movies, celebreties, video games, and tv shows."
                        }
                    </SecondaryTitleH2>
                </HeaderContainer>
                <RowContainerNoPadding color={defaultBackground}>
                    <TitleH3>
                        {
                            "What soundboards do you enjoy using? How do you use soundboards? Do you prank people using soundboards? Our blerp meme soundboards are integrated into your favorite platforms for you to play your favorite sounds! Check out some of our top soundboards listed below or use the search bar to find your favorite boards!"
                        }
                    </TitleH3>
                </RowContainerNoPadding>
                <RowContainer
                    color={ligherBackground}
                    onClick={this.navigateToPath(
                        "/top-sounds/six-donald-trump-soundboard-sounds",
                    )}
                >
                    <MainLink
                        text={"Donald Trump Soundboard"}
                        href={"/top-sounds/six-donald-trump-soundboard-sounds"}
                        as={"/top-sounds/six-donald-trump-soundboard-sounds"}
                        bigLink={true}
                    />
                </RowContainer>

                <RowContainer
                    onClick={this.navigateToPath(
                        "/top-sounds/bernie-sanders-soundboard-top-bernie-sounds",
                    )}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={"Bernies Sanders Soundboard"}
                        href={
                            "/top-sounds/bernie-sanders-soundboard-top-bernie-sounds"
                        }
                        as={
                            "/top-sounds/bernie-sanders-soundboard-top-bernie-sounds"
                        }
                        bigLink={true}
                    />
                </RowContainer>

                <RowContainer color={ligherBackground}>
                    <MainLink
                        text={"South Park Soundboard"}
                        as={
                            "/top-sounds/five-great-sound-quotes-from-south-park-soundboard"
                        }
                        href={
                            "/top-sounds/five-great-sound-quotes-from-south-park-soundboard"
                        }
                        bigLink={true}
                    />
                </RowContainer>

                <RowContainer
                    onClick={this.navigateToPath(
                        "/top-sounds/the-three-best-laugh-track-soundboard-sounds",
                    )}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={"Laugh Track Soundboard"}
                        as={
                            "/top-sounds/the-three-best-laugh-track-soundboard-sounds"
                        }
                        href={
                            "/top-sounds/the-three-best-laugh-track-soundboard-sounds"
                        }
                        bigLink={true}
                    />
                </RowContainer>

                <RowContainer
                    onClick={this.navigateToPath(
                        "/top-sounds/top-sound-quotes-from-roblox-oof-soundboard",
                    )}
                    color={ligherBackground}
                >
                    <MainLink
                        text={"Roblox Oof Soundboard"}
                        href={
                            "/top-sounds/top-sound-quotes-from-roblox-oof-soundboard"
                        }
                        as={
                            "/top-sounds/top-sound-quotes-from-roblox-oof-soundboard"
                        }
                        bigLink={true}
                    />
                </RowContainer>

                <RowContainer
                    onClick={this.navigateToPath(
                        "/top-sounds/top-warcraft-soundboards-from-videogame",
                    )}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={"Warcraft Soundboard Video game"}
                        href={
                            "/top-sounds/top-warcraft-soundboards-from-videogame"
                        }
                        as={
                            "/top-sounds/top-warcraft-soundboards-from-videogame"
                        }
                        bigLink={true}
                    />
                </RowContainer>

                <RowContainer
                    onClick={this.navigateToPath(
                        "/top-sounds/top-mario-and-luigi-nintendo-soundboards",
                    )}
                    color={flyoutBackground}
                >
                    <MainLink
                        text={"Mario and Luigi Nintendo Soundboards"}
                        href={
                            "/top-sounds/top-mario-and-luigi-nintendo-soundboards"
                        }
                        as={
                            "/top-sounds/top-mario-and-luigi-nintendo-soundboards"
                        }
                        bigLink={true}
                    />
                </RowContainer>

                <RowContainer
                    color={ligherBackground}
                    onClick={this.navigateToPath(
                        "/top-sounds/top-star-wars-soundboards-lightsaber-sfx",
                    )}
                >
                    <MainLink
                        text={
                            "Star Wars Soundboard and Lightsaber Sound Effects"
                        }
                        as={
                            "/top-sounds/top-star-wars-soundboards-lightsaber-sfx"
                        }
                        href={
                            "/top-sounds/top-star-wars-soundboards-lightsaber-sfx"
                        }
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
