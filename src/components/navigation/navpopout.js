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
    background-color: ${flyoutBackground};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    width: 100%;
`;

const SocialContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
        color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const HeadingText = styled.h2`
    font-weight: bold;
    padding: 4px;
    font-size: 24px;
    text-decoration: underline;
`;

const Copyright = styled.div`
    color: ${headerText};
    opacity: 0.6;
    font-size: 10px;
    margin: 16px 100px 16px auto;

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
        margin: auto;
        text-align: center;
    }
`;

const NavPopout = props => (
    <Container>
        <InformationContainer>
            <Column>
                <Link href='/app'>
                    <HeadingText>Soundboard Products</HeadingText>
                </Link>
                <Link href='/twitch'>Twitch Extension</Link>
                <Link href='/discord'>Discord Bot</Link>
                <Link href='/app'>Mobile Apps</Link>
            </Column>
            <Column>
                <Link href='/about'>
                    <HeadingText>Company</HeadingText>
                </Link>
                <Link href='/blog'>Blog</Link>
                <Link href='https://anchor.fm/blerp'>Podcast</Link>
                <Link href='/contact'>Support</Link>
            </Column>
            <Column>
                <Link href='/terms'>
                    <HeadingText>Content Legal Information</HeadingText>
                </Link>
                <Link href='/terms'>Terms of Service</Link>
                <Link href='/dmca'>DMCA</Link>
                <Link href='/privacy'>Privacy</Link>
            </Column>
            <Column>
                <Link href='https://reddit.com/r/blerp'>
                    <HeadingText>Blerp Social Media</HeadingText>
                </Link>
                <SocialContainer>
                    <CircleSocialButton
                        alt='Go to Blerp Instagram Page'
                        link='http://instagram.com/blerpapp'
                        image='https://storage.googleapis.com/blerp-web-images/static/social/instagram_color.svg'
                    />
                    <CircleSocialButton
                        alt='Go to Blerp Twitter Page'
                        link='https://twitter.com/blerp'
                        image='https://storage.googleapis.com/blerp-web-images/static/social/twitter_color.svg'
                    />
                    <CircleSocialButton
                        alt='Go to Blerp Facebook Page'
                        link='https://www.facebook.com/blerpapp'
                        image='https://storage.googleapis.com/blerp-web-images/static/social/facebook_color.svg'
                    />
                </SocialContainer>
            </Column>
        </InformationContainer>
        <Copyright>Copyright 2016 © Blerp, Inc. All Rights Reserved</Copyright>
    </Container>
);

export default NavPopout;
