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
import Link from "next/link";

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
    text-align: center;
    padding: 60px;
`;

const MainTitleH1 = styled.h1`
    color: #1d1d1d;
    font-weight: bold;
    font-size: 40px;
    text-decoration: none;
    margin: 0;
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
    padding: 32px;
    background-color: ${props => props.color};
    min-height: 120px;

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
    font-size: 16px;
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

    renderRowContent({ header, subtitle, paragraph, color }) {
        return (
            <RowContainer color={color}>
                <TitleH3>{header}</TitleH3>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
                <Paragraph>{paragraph}</Paragraph>
            </RowContainer>
        );
    }

    renderGenericLink({ name, path }) {
        return (
            <Link prefetch={true} href={path}>
                <MainTemplateLink>{name}</MainTemplateLink>
            </Link>
        );
    }

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>{"Resources"}</title>
                    <meta
                        name='description'
                        content="Blerp resources includes everything you need to have a fun audio meme soundboard experience. Blerp is one of the first companies to centralize and improve audio search. Use blerp's resources to make the most of your online soundboard experience!"
                    />
                    <meta
                        property='og:description'
                        content="Blerp resources includes everything you need to have a fun audio meme soundboard experience. Blerp is one of the first companies to centralize and improve audio search. Use blerp's resources to make the most of your online soundboard experience!"
                    />
                    <meta
                        name='keywords'
                        content='blerp, blerp sounds, audio quotes, best soundboard, Favorite Movies, sounds, funny quotes, tv show moments, great games, funny sound, quotes, movie soundboard, blurp, song lyrics, music snippets'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    <MainTitleH1>{"Resources"}</MainTitleH1>
                    <SecondaryTitleH2>
                        {
                            "Some blerp resources that will help you understand why blerp is awesome... (or bore you death from business jargon)"
                        }
                    </SecondaryTitleH2>
                </HeaderContainer>
                <RowContainer color={flyoutBackground}>
                    <MainLink
                        text={"Terms of Service"}
                        as={"/resources/terms-of-service"}
                        href={"/terms"}
                        bigLink={true}
                    />
                </RowContainer>
                <RowContainer color={ligherBackground}>
                    <MainLink
                        text={"DMCA"}
                        as={"/resources/dmca"}
                        href={"/dmca"}
                        bigLink={true}
                    />
                </RowContainer>
                <RowContainer color={flyoutBackground}>
                    <MainLink
                        text={"Privacy"}
                        as={"/resources/privacy"}
                        href={"/privacy"}
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
