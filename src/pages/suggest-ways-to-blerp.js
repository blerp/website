/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { default as Router, withRouter } from "next/router";
import Footer from "../components/navigation/footer";

import MainLink from "../components/link/MainLink";
import TextLight from "../components/inputs/text-light";

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
    position: relative;
    background: transparent;
    text-align: center;
    padding: 80px 40px 24px;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

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
    padding-top: 32px;
`;

const SecondaryTitleH2 = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 28px;
    text-decoration: none;
    margin: 0;
    padding-top: 12px;
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

class Page extends React.Component {
    static defaultProps = {};
    state = {
        platformSuggestions: "",
        showThankYou: false,
    };
    props;

    renderRowContent({ header, subtitle, paragraph, color }) {
        return (
            <RowContainer color={color}>
                <TitleH3>{header}</TitleH3>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
                <Paragraph>{paragraph}</Paragraph>
            </RowContainer>
        );
    }

    handlePlatformTextChange = event => {
        const target = event.currentTarget;
        const suggestion = target.value;

        this.setState({
            platformSuggestions: suggestion,
        });
    };

    submitSuggestion = mutationCall => () => {
        const action = "PLATFORM_SUGGESTION_FROM_WEB";
        const data = {
            platformSuggestions: this.state.platformSuggestions,
        };

        mutationCall({
            fetchPolicy: "no-cache",
            ssr: false,
            variables: {
                action,
                data,
            },
        });

        this.setState({
            showThankYou: true,
        });
    };

    playBlerp = () => {
        const audio = new Audio(
            "https://audio.blerp.com/audio/ffff1eb0-d6e3-11e8-b0b3-db30793d0cc0?type=MP3",
        );
        audio.play();
    };

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Suggest Ways to Blerp | Audio Soundboard Directory | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='In internet is limitless, and modes of communicate continue to grow everyday. Blerp wants to grow alongside of the many great platforms available to our users. Suggest ways Blerp can grow.'
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
                    <SoundVideo
                        autoPlay={true}
                        preload='true'
                        loop={true}
                        muted={true}
                    >
                        <source
                            src='https://storage.googleapis.com/blerp-public-images/video/slow-audiowave_1.mp4'
                            type='video/mp4'
                        />
                        Looping Background Video
                    </SoundVideo>
                    <MainTitleH1>{"Suggest Ways to Blerp?"}</MainTitleH1>
                    <SecondaryTitleH2>
                        {"As our audio directory grows - so do we."}
                    </SecondaryTitleH2>
                </HeaderContainer>
                {this.state.showThankYou ? (
                    <RowContainer color={defaultBackground}>
                        <ClickParagraph onClick={this.playBlerp}>
                            Thank You!
                        </ClickParagraph>
                    </RowContainer>
                ) : (
                    <RowContainer color={defaultBackground}>
                        <Paragraph>
                            Suggest a platform where you would like to see Blerp
                            integrated.
                        </Paragraph>
                        <Mutation mutation={LOG_ACTION}>
                            {LOG_ACTION_MUTATION => (
                                <div>
                                    <TextLight
                                        name='suggestion-platform-input'
                                        type='text'
                                        placeholder='Make a suggestion!'
                                        onChange={this.handlePlatformTextChange}
                                        value={this.state.platformSuggestions}
                                        error={false}
                                    />
                                    <FeaturedButtonButton
                                        onClick={this.submitSuggestion(
                                            LOG_ACTION_MUTATION,
                                        )}
                                    >
                                        Submit
                                    </FeaturedButtonButton>
                                </div>
                            )}
                        </Mutation>
                    </RowContainer>
                )}
                <RowContainer color={ligherBackground}>
                    <TitleH3>
                        {"As blerp grows, so does our community!"}
                    </TitleH3>
                    <LinkContainer>
                        <MainLink
                            text={"Product Feedback Form!"}
                            href={"https://goo.gl/forms/IblHRW0M5x1v4Avg2"}
                            as={"https://goo.gl/forms/IblHRW0M5x1v4Avg2"}
                            dontPrefetch={true}
                        />
                    </LinkContainer>
                    <Subtitle>
                        {"What suggestions do you have for making blerp great?"}
                    </Subtitle>
                </RowContainer>
                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
