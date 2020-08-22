/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import CircleSocialButton from "../buttons/circle-social-button";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    headerText,
    iconsActive,
} from "../../styles/colors";

const Container = styled.div`
    position: relative;
    bottom: 0;
    z-index: 1000;
    background-color: ${flyoutBackground};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 0;
`;

const SocialContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 0;
`;

const InformationContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: ${headerText};
    width: 100%;

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
`;

const CreationColumn = styled.div`
    @media (max-width: 600px) {
        display: none;
    }
`;
const Column = styled.div`
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 8px;
    align-items: center;
`;

const Link = styled.a`
    display: block;
    text-decoration: none;
    padding: 4px;
    color: ${headerText};

    &:hover {
        color: ${pandaPink};
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: ${pandaPink};
        transition: all 0.2s ease 0s;
    }
`;

const HeadingText = styled.a`
    font-weight: bold;
    display: block;
    padding: 4px;
    text-decoration: underline;
    display: block;
    padding: 4px;
    color: ${headerText};
`;

const AppsBanner = props => (
    <Container className={props.className}>
        <InformationContainer>
            <CreationColumn>
                <Column>
                    <HeadingText>Tools</HeadingText>
                    <Link href='https://chrome.google.com/webstore/detail/blerp-for-youtube-audio-c/icegggloogckapffpbppdghhhmdbelpb?utm_source=gmail'>
                        {"Chrome Extension"}
                    </Link>
                    <Link href='/upload'>{"Create Blerps"}</Link>
                </Column>
            </CreationColumn>
            <Column>
                <HeadingText>Mobile</HeadingText>
                <Link href='https://itunes.apple.com/us/app/blerp-sound-bite-search-and-audio-meme-messaging/id1235261552?mt=8'>
                    {"iOS & iMessage Apps"}
                </Link>
                <Link href='https://play.google.com/store/apps/details?id=com.lolibe.blerp'>
                    {"Android App"}
                </Link>
            </Column>
            <Column>
                <HeadingText>Bots</HeadingText>
                <SocialContainer>
                    <CircleSocialButton
                        alt='Invite Blerp Discord Bot'
                        link='/discord'
                        image='https://storage.googleapis.com/blerp-web-images/static/clean-social/Discord%403x.png'
                    />
                    <CircleSocialButton
                        alt='Try Our Google Skill'
                        link='https://assistant.google.com/services/a/uid/000000aee04755ed?source=web'
                        image='https://storage.googleapis.com/blerp-web-images/static/clean-social/google-assi-final.png'
                    />
                    <CircleSocialButton
                        alt='Se our featured blerps'
                        link='/'
                        image='https://storage.googleapis.com/blerp-main-bucket/images/discord.png'
                    />
                </SocialContainer>
            </Column>
        </InformationContainer>
    </Container>
);

export default AppsBanner;
