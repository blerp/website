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

import { default as Router, withRouter } from "next/router";
import Footer from "../components/navigation/footer";

import MainLink from "../components/link/MainLink";

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
    background-color: ${flyoutBackground};
    padding: 0px 40px 24px 0px;

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

const MainTitleH1 = styled.h1`
    color: #1d1d1d;
    font-weight: bold;
    font-size: 28px;
    text-decoration: none;
    margin: 0;
    padding-top: 32px;
`;

const SecondaryTitleH2 = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: light;
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

const Paragraph = styled.p`
    color: ${bodyText};
    font-weight: light;
    font-size: 20px;
    text-decoration: none;
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

const SoundVideo = styled.video`
    width: 320px;
    height: 200px;
    margin: 8px;
`;

class Page extends React.Component {
    static defaultProps = {};
    state;
    props;

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "What is Blerp - Learn more | Free Online Soundboard | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Use Blerp as your ultimate meme soundboard search engine. Blerp helps with creating the best soundboard memes moments.'
                    />
                    <meta
                        name='keywords'
                        content='blerp, blerp sounds, audio quotes, best soundboard, Favorite Movies, sounds, funny quotes, tv show moments, great games, funny sound, quotes, movie soundboard, blurp, song lyrics, music snippets'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    <MainTitleH1>{"What is Blerp?"}</MainTitleH1>
                    <SecondaryTitleH2>
                        {
                            "The better question is - what isn’t Blerp? Blerp is mode of expression, a state of being, an intermediary in our online world, the connection between you and the other humans (and bots) on the other side of the screen"
                        }
                    </SecondaryTitleH2>
                </HeaderContainer>
                <RowContainer color={defaultBackground}>
                    <Paragraph>{`That may be a bit of an exaggeration, but for real - Blerp is an audio search engine that helps users communicate online in a new, and more interactive way. Our free online soundboard lets you download, stream, and share royalty free audio clips.`}</Paragraph>
                    <Paragraph>
                        <MainLink
                            href={"/soundbites/5c000352d50343000991d4ae"}
                            as={`/soundbites/5c000352d50343000991d4ae`}
                            text={"Yep- you hear it right, free!"}
                            inline={true}
                        />
                    </Paragraph>
                    <SoundVideo width={320} height={240} controls>
                        <source
                            src='https://storage.googleapis.com/blerp-public-images/video/whaat.mp4'
                            type='video/mp4'
                        />
                        What? Confused.
                    </SoundVideo>
                    <Paragraph>
                        Don’t believe us -{" "}
                        <MainLink
                            href={`/login`}
                            as={`/login`}
                            text={"Blerp for yourself."}
                            inline={true}
                        />
                    </Paragraph>
                    <Paragraph>
                        Not convinced? Learn more about our meme soundboard and{" "}
                        <MainLink
                            as={`"/blerps/how-blerp-is-used`}
                            href={`/how-blerp-is-used`}
                            text={"how it is used."}
                            inline={true}
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
