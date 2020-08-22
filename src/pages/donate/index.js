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

import { default as Router, withRouter } from "next/router";

import CustomMessage from "../../components/messages/custom-message";
import GenericBox from "../../components/shared/GenericBox";

import NavBar from "../../components/navigation/navbar";
import Footer from "../../components/navigation/footer";

import { defaultBackground, statusColor } from "../../styles/colors";

import withData from "../../lib/withData";
import { logEvent } from "../../lib/analytics";

const Container = styled.div`
    background-color: ${props => props.theme.flyoutBackground};
`;

const MessageContainer = styled.div`
    margin: auto;
    text-align: center;
    padding: 80px 0;
`;

const LogoutText = styled.div`
    text-align: center;
    margin: auto;
    color: ${statusColor};
`;

const FooterContainer = styled.div``;

const Header = styled.h1``;

const Paragraph = styled.p`
    max-width: 600px;
    font-weight: 300;
`;

const Borderline = styled.div`
    width: 60%;
    margin: 8px;
    border-bottom: 1px solid ${props => props.theme.darkGray};
`;

const RedBackgroundHeaderRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url("https://storage.googleapis.com/blerp_products/Web/product_page/Top%20banner%20blob.svg");
    padding: 40px 0 200px 0;
    background-position: 0 -160px;
    background-repeat: no-repeat;
    background-color: ${props => props.theme.flyoutBackground};
    background-size: cover;

    @media (max-width: 1800px) {
        background-size: inherit;
    }
`;

const HeaderLogo = styled.img`
    width: 400px;
`;

const SecondaryButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: lighter;
    padding: 0 12px;
    text-decoration: none;
    color: ${props => props.theme.secondaryText};
    white-space: nowrap;
    background: transparent;
    border: 2px solid ${props => props.theme.secondaryText};
    border-radius: 40px;
    font-size: 14px;
    line-height: 14px;
    height: 32px;
    margin: 20px;

    &:focus {
        border-radius: 40px;
        border: 2px solid ${props => props.theme.pandaPink} !important;
        outline: 0 !important;
        box-shadow: none !important;
    }

    &:hover {
        transition: all 0.2s ease 0s;
        color: ${props => props.theme.pandaPink};
    }

    &:active {
        color: ${props => props.theme.pandaPink};
        border: 2px solid ${props => props.theme.pandaPink};
        transition: all 0.2s ease 0s;
    }
`;

const RedLogo = styled.img`
    width: 400px;
    margin: 80px 0;
    z-index: 10;

    @media (max-width: 600px) {
        width: 280px;
        margin: 40px 0;
    }
`;

const HugeTextContainerBackground = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    background-image: url("https://storage.googleapis.com/blerp_products/Web/product_page/red%20blerp%20texture.png");
`;

const HugeTextContainerBackgroundGradient = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        transparent,
        ${props => props.theme.flyoutBackground}
    );
    opacity: 0.8;
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 20px 0;
`;

const HeaderText = styled.p`
    color: ${props => props.theme.bodyText};
    font-size: 48px;
    font-weight: lighter;
    margin: 20px;
    text-align: center;
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px;
    z-index: 10;
`;

// https://www.paypal.com/cgi-bin/webscr?cmd=_button-management
class Page extends React.Component {
    static defaultProps = {
        metaTitle: "Soundboards, Audio Clips, and Sound Memes",
        title: "This is awkward. Let me take you home!",
        description:
            "If this happens again let me know at support@blerp.com. I'll get my peeps on it!",
        imageUrl:
            "https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftCircleIbisRed.svg",
        link: "/",
    };
    state;
    props;

    render() {
        return (
            <div>
                <Helmet>
                    <title>{`Help Blerp Grow | Do you love our software | Blerp`}</title>
                    <meta
                        name='description'
                        content={`Do you love our software? Do you want to help us grow? Blerp is started by a college students from the University of Utah. We are a free platform for you to discover, share, and create short audio clips.`}
                    />
                    <meta
                        property='og:description'
                        content={`Do you love our software? Do you want to help us grow? Blerp is started by a college students from the University of Utah. We are a free platform for you to discover, share, and create short audio clips.`}
                    />
                    <meta
                        name='keywords'
                        content={`donation to blerp, helping start ups, blerp funds, how does blerp make money?`}
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

                <Container>
                    <RedBackgroundHeaderRow>
                        <HeaderLogo
                            alt='Blerp'
                            src='https://storage.googleapis.com/blerp_products/Web/blerp_white_logo.svg'
                        />
                    </RedBackgroundHeaderRow>

                    <Column>
                        <Header>Support Blerp</Header>
                        <Borderline />
                        <Paragraph>
                            Blerp is a small company that started out of a
                            college dorm. To make this product the best it can
                            be we need your help! All donations go towards
                            building the best experience possible for you.
                        </Paragraph>

                        <form
                            action='https://www.paypal.com/cgi-bin/webscr'
                            method='post'
                            target='_top'
                        >
                            <input type='hidden' name='cmd' value='_s-xclick' />
                            <input
                                type='hidden'
                                name='hosted_button_id'
                                value='8JAQHW38UG5S8'
                            />
                            <input
                                type='image'
                                src='https://storage.googleapis.com/blerp_products/Web/donate_page/donate-to-paypal.svg'
                                border='0'
                                name='submit'
                                title='PayPal - The safer, easier way to pay online!'
                                alt='Donate with PayPal button'
                            />
                            {/* <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" /> */}
                        </form>
                    </Column>

                    <HugeTextContainerBackground>
                        <Column>
                            {/* <RedLogo alt="Red Blerp"src="https://storage.googleapis.com/blerp_products/Web/Misc/blerp_logo_transparent.svg" /> */}
                            <HeaderText>Not sure what blerp is?</HeaderText>
                            <SecondaryButton href='https://blerp.com'>
                                Learn More
                            </SecondaryButton>
                        </Column>
                        <HugeTextContainerBackgroundGradient />
                    </HugeTextContainerBackground>
                </Container>

                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </div>
        );
    }
}

export default compose(withData, withRouter)(Page);
