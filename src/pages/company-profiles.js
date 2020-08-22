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

const ThreeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    padding: 80px;
    background-color: ${props => props.color};

    @media (max-width: 600px) {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 40px;
    }
`;

const ProfileImage = styled.img`
    height: 200px;
    width: 200px;
    margin: 8px;
`;

const Container = styled.div`
    position: relative;
    justify-content: center;
`;

const HeaderContainer = styled.div`
    background-color: ${flyoutBackground};
    padding: 40px;

    @media (max-width: 600px) {
        padding: 12px;
    }
`;

const MainTitleH1 = styled.h1`
    color: #1d1d1d;
    font-weight: bold;
    font-size: 40px;
    text-decoration: none;
    margin: 0;
    padding-top: 28px;
    text-align: center;
    padding: 28px;
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
    padding: 60px 40px;
    background-color: ${props => props.color};

    @media (max-width: 600px) {
        margin: 0;
        flex-direction: column;
        text-align: center;
    }
`;

const UnStyleLink = styled.a`
    text-decoration: none;
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
    width: 320px;
    text-align: center;
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
    color: ${focusState};
    font-size: 24px;
    padding: 16px;
    border-radius: 40px;

    &:hover {
        color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const LinkContainer = styled.div`
    padding: 24px;
`;

const TeamPicture = styled.img`
    width: 320px;
    margin: 40px;
`;

const PictureContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SocialContainerItem = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    &:hover {
        opacity: 0.7;
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

    renderComponentLink({ path, Component }) {
        return (
            <Link prefetch={true} href={path}>
                <MainTemplateLink>
                    <Component />
                </MainTemplateLink>
            </Link>
        );
    }

    navigateToPath = path => () => {
        window.location.href = path;
    };

    render() {
        return (
            <Container role='application'>
                <Helmet>
                    <title>
                        {
                            "Meet the Startup Blerp Team | Blerp Behind The Scenes | Blerp"
                        }
                    </title>
                    <meta
                        name='description'
                        content='Love Blerp? Want to learn more about the team that makes it possible? Look no further and read more about the creators of the best soundboard online.'
                    />
                </Helmet>
                <NavBar />
                <HeaderContainer>
                    <MainTitleH1>{"Meet the Blerp Team!"}</MainTitleH1>
                    <SecondaryTitleH2>
                        {
                            "Blerp Behind the Scenes - Learn more about how our team got involved with Blerp, how we hope to see Blerp used, and what our Blerp Sound is."
                        }
                    </SecondaryTitleH2>
                </HeaderContainer>
                <ThreeContainer color={flyoutBackground}>
                    <UnStyleLink href='https://www.linkedin.com/in/aaron-kc-hsu-74b59372'>
                        <SocialContainerItem>
                            <ProfileImage
                                src='https://storage.googleapis.com/blerp_products/Web/Streamer/AaronHeadshot.png'
                                alt='Aaron Hsu Profile Picture'
                            />
                            <TitleH3>{"Aaron Hsu"}</TitleH3>
                            <Subtitle>
                                {
                                    "CEO, Software Architect, Keeps head in clouds..."
                                }
                            </Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>

                    <UnStyleLink
                        href='https://www.linkedin.com/in/evan-degray-565a0baa'
                        alt='Evan Degray Profile Picture'
                    >
                        <SocialContainerItem>
                            <ProfileImage src='https://storage.googleapis.com/blerp_products/Web/Streamer/EvanHeadshot.png' />
                            <TitleH3>{"Evan Degray"}</TitleH3>
                            <Subtitle>
                                {
                                    "Director of Design, Brand Manager, Makes things work..."
                                }
                            </Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>

                    <UnStyleLink href='https://www.linkedin.com/in/derek-omori-81b502b5/'>
                        <SocialContainerItem>
                            <ProfileImage
                                src='https://storage.googleapis.com/blerp_products/Web/Streamer/DerekHeadshot.png'
                                alt='Derek Omori Profile Picture'
                            />
                            <TitleH3>{"Derek Omori"}</TitleH3>
                            <Subtitle>
                                {"Director of Operatons, Sells stuff..."}
                            </Subtitle>
                        </SocialContainerItem>
                    </UnStyleLink>

                    {/* <UnStyleLink href="https://www.linkedin.com/in/arik-armstead-53788b152/">
            <SocialContainerItem>
              <ProfileImage src="https://storage.googleapis.com/blerp-public-images/team/arik-circle.png" alt="Arik Armstead Profile Picture"/>
              <TitleH3>{"Arik Armstead"}</TitleH3>
              <Subtitle>
                {"Director of Partnerships, Business Relations, Content King, NFL player.. no really..."}
              </Subtitle>
            </SocialContainerItem>
          </UnStyleLink>
           */}
                </ThreeContainer>

                {/* <ThreeContainer color={defaultBackground}>

          <UnStyleLink href="https://twitter.com/rossdimassimo ">
            <SocialContainerItem>
              <ProfileImage src="https://storage.googleapis.com/blerp_products/Web/Streamer/imageedit_3_2601427704.gif" alt="Ross Dimassimo Profile Picture" />
              <TitleH3>{"Ross DiMassimo"}</TitleH3>
              <Subtitle>
                {"Principal Software Engineer, Devops Artist, Creative talker..."}
              </Subtitle>
            </SocialContainerItem>
          </UnStyleLink>

          <UnStyleLink href="https://www.linkedin.com/in/sarah-patterson-638a1ab1/">
            <SocialContainerItem>
              <ProfileImage src="https://storage.googleapis.com/blerp-public-images/team/sarah-circle.png" alt="Sarah Patterson Profile Picture"/>
              <TitleH3>{"Sarah Patterson"}</TitleH3>
              <Subtitle>
                {"Director of Marketing, SEO Specialist, Cool person to know..."}
              </Subtitle>
            </SocialContainerItem>
          </UnStyleLink>

          <UnStyleLink href="https://www.linkedin.com/in/sarah-patterson-638a1ab1/">
            <SocialContainerItem>
              <ProfileImage src="https://storage.googleapis.com/blerp-public-images/team/sarah-circle.png" alt="Sarah Patterson Profile Picture"/>
              <TitleH3>{"Sarah Patterson"}</TitleH3>
              <Subtitle>
                {"Director of Marketing, SEO Specialist, Cool person to know..."}
              </Subtitle>
            </SocialContainerItem>
          </UnStyleLink>
          

          <UnStyleLink href="https://www.linkedin.com/in/greg-rosich">
            <SocialContainerItem>
              <ProfileImage src="https://storage.googleapis.com/blerp-public-images/team/Greg%401x.png" alt="Greg Rosich Profile Picture" />
              <TitleH3>{"Greg Rosich"}</TitleH3>
              <Subtitle>
                {"iOS Leader, Software Engineer, Inventor, Avid Discord user..."}
              </Subtitle>
            </SocialContainerItem>
          </UnStyleLink>

        </ThreeContainer> */}

                <RowContainer color={ligherBackground}>
                    <TitleH3>
                        {
                            "Help us create more connections through audio in the new technology immersed world."
                        }
                    </TitleH3>
                    <PictureContainer>
                        <TeamPicture
                            alt={"Blerp Team Picture"}
                            src='https://storage.googleapis.com/blerp_products/Web/Streamer/IMG_20191203_130756.jpg'
                        />
                    </PictureContainer>
                    <LinkContainer>
                        <MainLink
                            text={"Apply for Blerp!"}
                            href={"https://goo.gl/forms/IHKi7Ioz5RJDEgeE3"}
                            as={"https://goo.gl/forms/IHKi7Ioz5RJDEgeE3"}
                            dontPrefetch={true}
                        />
                    </LinkContainer>
                    <Subtitle>
                        {"Hard challenges, great friends, and exciting life"}
                    </Subtitle>
                </RowContainer>
                <TabBar />
                <Footer />
            </Container>
        );
    }
}

export default compose(withData, withRouter)(Page);
