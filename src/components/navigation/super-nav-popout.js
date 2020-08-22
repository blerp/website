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
    padding: 4px 0;
    width: 100%;
`;

const SocialContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const NavContainer = styled.nav`
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
    font-size: 20px;
    text-decoration: underline;
`;

const SuperNavPopout = props => (
    <Container>
        <NavContainer>
            <Link href='/soundboard-products'>
                <Column>
                    <HeadingText>Soundboard Products</HeadingText>
                </Column>
            </Link>
            <Link href='/blerps'>
                <Column>
                    <HeadingText>Blerps</HeadingText>
                </Column>
            </Link>
            <Link href='/company'>
                <Column>
                    <HeadingText>Company</HeadingText>
                </Column>
            </Link>
            <Link href='/blog'>
                <Column>
                    <HeadingText>Blog</HeadingText>
                </Column>
            </Link>
            <Link href='/resources'>
                <Column>
                    <HeadingText>Resources</HeadingText>
                </Column>
            </Link>
            <Link href='/connect-with-us'>
                <Column>
                    <HeadingText>Connect With Us</HeadingText>
                </Column>
            </Link>
        </NavContainer>
    </Container>
);

export default SuperNavPopout;
