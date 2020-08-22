/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components";

import { default as Router, withRouter } from "next/router";
import Footer from "../components/navigation/footer";
import projectConfig from "../config";
const hostDomain = projectConfig.host;

import NavBar from "../components/navigation/navbar";
import withData from "../lib/withData";
import TabBar from "../components/navigation/tabbar";

import NewSocialContainer from "../components/shared/NewSocialContainer";

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
    position: relative;
    background: transparent;
    text-align: center;
    padding: 12px;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${flyoutBackground};

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

const MainTitleH1 = styled.h1`
    color: ${darkText};
    font-weight: bold;
    font-size: 40px;
    text-decoration: none;
    margin: 0;
    padding: 12px;
`;

const SecondaryTitleH2 = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 28px;
    text-decoration: none;
    margin: 0;
    padding: 12px;
    font-size: 20px;
`;

const RowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
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
    padding: 12px;
    font-size: 28px;
`;

const Subtitle = styled.h4`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
    margin: 4px;
`;

const ClickParagraph = styled.p`
    background-color: ${pandaPink};
    color: ${flyoutBackground};
    border: solid ${pandaPink} 2px;
    font-weight: bold;
    font-size: 40px;
    text-decoration: none;
    margin: 0px;
    padding: 20px 24px;
    text-align: center;
    border-radius: 60px;
    text-align: center;
    align-self: center;
    margin: 12px;

    &:hover {
        opacity: 0.7;
    }
`;

const Paragraph = styled.p`
    color: ${bodyText};
    font-weight: light;
    font-size: 28px;
    text-decoration: none;
    line-height: 28px;
`;

const MainTemplateLink = styled.a`
    display: block;
    text-decoration: none;
    padding: 4px;
    color: ${headerText};
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

const FeaturedButtonButton = styled.button`
    font-weight: lighter;
    padding: 12px 20px;
    text-decoration: none;
    color: ${flyoutBackground};
    white-space: nowrap;
    background: ${pandaPink};
    border-radius: 40px;
    margin-left: 16px;
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

const LinkContainer = styled.div`
    padding: 8px;
`;

const SoundVideo = styled.video`
    width: 100%;
    position: absolute;
    top: -100px;
    left: 0;
    z-index: -1;

    @media (max-width: 600px) {
        top: 0px;
    }
`;

const LOG_ACTION = gql`
    mutation logAction($action: String!, $data: JSON) {
        web {
            logAction(action: $action, data: $data) {
                success
            }
        }
    }
`;

const DEFAULT_SOCIAL_ACCOUNTS = [
    {
        name: "Discord",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Discord.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/DiscordSelected.svg",
        createShareUrl: id => {
            return `https://discord.gg/zYSsRxm`;
        },
    },
    {
        name: "Tumblr",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Tumbler.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/TumblerSelected.svg",
        createShareUrl: id => {
            return `https://blerp.tumblr.com`;
        },
    },
    {
        name: "Twitch",
        text: "Twitch",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Glitch_Black_RGB.png",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Glitch_Purple_RGB.png",
        createShareUrl: id => {
            return `https://twitch.tv/blerp`;
        },
    },
    {
        name: "Pinterest",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Pinterest.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/PinterestSelected.svg",
        createShareUrl: id => {
            return `https://www.pinterest.com/blerp/`;
        },
    },
    {
        name: "Facebook",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Facebook.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/FacebookSelected.svg",
        createShareUrl: id => {
            return `https://facebook.com/blerpapp`;
        },
    },
    {
        name: "Reddit",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Reddit.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/RedditSelected.svg",
        createShareUrl: id => {
            return `https://reddit.com/r/blerp`;
        },
    },
    {
        name: "YouTube",
        text: "YouTube",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/yt_logo_mono_light.png",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/yt_logo_rgb_dark.png",
        createShareUrl: id => {
            return `https://youtube.com/c/blerp`;
        },
    },
    {
        name: "Twitter",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Twitter.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/TwitteSelected.svg",
        createShareUrl: id => {
            return `https://twitter.com/blerp`;
        },
    },
    {
        name: "Instagram",
        text: "Instagram",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Instagram.png",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/InstagramSelected.png",
        createShareUrl: id => {
            return `https://instagram.com/blerpapp`;
        },
    },
];

class Page extends React.Component {
    static defaultProps = {};
    state = {
        platformSuggestions: "",
        showThankYou: false,
    };
    props;

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {"Blerp | Social Media Connection | Talk With Us"}
                    </title>
                    <meta
                        name='description'
                        content='At blerp we believe in sharing what we know. Stay connected with us as we work towards building the search engine for audio clips.'
                    />
                    <meta
                        property='og:description'
                        content='At blerp we believe in sharing what we know. Stay connected with us as we work towards building the search engine for audio clips.'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    {/* <SoundVideo autoPlay={true} preload="true" loop={true} muted={true}>
            <source
              src="https://storage.googleapis.com/blerp-public-images/video/slow-audiowave_1.mp4"
              type="video/mp4"
            />
            Looping Background Video
          </SoundVideo> */}
                    <MainTitleH1>{"Blerp's Social Media"}</MainTitleH1>
                    <SecondaryTitleH2>
                        {"Our story is built upon cool people like you."}
                    </SecondaryTitleH2>
                </HeaderContainer>
                <RowContainer color={ligherBackground}>
                    <TitleH3>
                        {
                            "We share who we are, so that you know why we do what we do"
                        }
                    </TitleH3>
                    <NewSocialContainer
                        id='personal_social'
                        downloadUrl=''
                        mainTitle={""}
                        socialItems={DEFAULT_SOCIAL_ACCOUNTS}
                        analyticTitle={"BLERP_SOCIAL_PAGE_OPEN"}
                    />
                </RowContainer>
                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
