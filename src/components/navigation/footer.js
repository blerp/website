/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { ThemeContext } from "styled-components";
import { GridColumn } from "../theme/Grid";
import { Grid, Text } from "../theme/Theme";
import { useContext } from "react";
import { Row } from "../shared/ProfileTabViews/ProfileStyledComponents";

const StyledFooterText = styled(Text)`
    line-height: 32px;
`;

const StyledHeaderFooterText = styled(Text)`
    line-height: 32px;
`;

StyledFooterText.defaultProps = {
    fontColor: "white",
    fontWeight: "light",
};

StyledHeaderFooterText.defaultProps = {
    fontColor: "white",
    fontWeight: "light",
};

const Container = styled.footer`
    position: relative;
    bottom: 0;
    background-color: ${props => props.theme.colors.grey7};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0 0 0;
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
    color: ${props => props.theme.flyoutBackground};
    width: 100%;

    @media (max-width: 600px) {
        display: flex;
        flex-direction: column;
    }
`;

const Link = styled.a`
    display: block;
    text-decoration: none;
    padding: 4px;
    color: ${props => props.theme.flyoutBackground};

    &:hover {
        color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const HeadingText = styled.div`
    font-weight: bold;
    padding: 4px;
    text-decoration: underline;
`;

const Copyright = styled.div`
    color: ${props => props.theme.flyoutBackground};
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

const LogoWhite = styled.img`
    width: 100px;
    margin: 8px;
`;

const Footer = () => {
    const theme = useContext(ThemeContext);

    return (
        <Container>
            <Grid
                style={{
                    backgroundColor: "transparent",
                    width: "80%",
                    justifyItems: "flex-start",
                    padding: "0 0 8px",
                    alignItems: "center",
                }}
                gridColumns='33% 33% 33%'
            >
                {/* <GridColumn width={2}>
                    <Link href='/categories'>
                        <StyledHeaderFooterText fontSize='32px' fontWeight='normal'>
                            Categories
                        </StyledHeaderFooterText>
                    </Link>
                </GridColumn> */}
                <GridColumn style={{ paddingLeft: "80px" }}>
                    <Link href='/streams'>
                        <StyledHeaderFooterText
                            fontSize='32px'
                            fontWeight='normal'
                        >
                            Live Streams
                        </StyledHeaderFooterText>
                    </Link>
                </GridColumn>
                <GridColumn style={{ paddingLeft: "80px" }}>
                    <Link href='/apps'>
                        <StyledHeaderFooterText
                            fontSize='32px'
                            fontWeight='normal'
                        >
                            Products
                        </StyledHeaderFooterText>
                    </Link>
                </GridColumn>
                <GridColumn style={{ paddingLeft: "80px" }}>
                    <Link href='/faq'>
                        <StyledHeaderFooterText
                            fontSize='32px'
                            fontWeight='normal'
                        >
                            About
                        </StyledHeaderFooterText>
                    </Link>
                </GridColumn>
            </Grid>
            <div
                style={{
                    width: "100%",
                    height: "2px",
                    backgroundColor: theme.colors.grey6,
                    overflow: "hidden",
                }}
            ></div>
            <Grid
                style={{
                    backgroundColor: "transparent",
                    width: "80%",
                    justifyItems: "flex-start",
                    padding: "12px",
                }}
                gridColumns='33% 33% 33%'
            >
                {/* <GridColumn>
                    <Link href='/categories/animals'>
                        <StyledFooterText>Animals/Nature</StyledFooterText>
                    </Link>
                    <Link href='/categories/anime'>
                        <StyledFooterText>Anime</StyledFooterText>
                    </Link>
                    <Link href='/categories/celebrities'>
                        <StyledFooterText>Celebrities</StyledFooterText>
                    </Link>
                    <Link href='/categories/comedians'>
                        <StyledFooterText>Comedians</StyledFooterText>
                    </Link>
                    <Link href='/categories/emotions'>
                        <StyledFooterText>Emotions</StyledFooterText>
                    </Link>
                    <Link href='/categories/encouragement'>
                        <StyledFooterText>Encouragement</StyledFooterText>
                    </Link>
                    <Link href='/categories/farewells'>
                        <StyledFooterText>Farewells</StyledFooterText>
                    </Link>
                    <Link href='/categories/gaming'>
                        <StyledFooterText>Gaming</StyledFooterText>
                    </Link>
                    <Link href='/categories/Greetings'>
                        <StyledFooterText>Greetings</StyledFooterText>
                    </Link>
                    <Link href='/categories/holidays'>
                        <StyledFooterText>Holidays</StyledFooterText>
                    </Link>
                </GridColumn>
                <GridColumn>
                    <Link href='/categories/movies'>
                        <StyledFooterText>Movies</StyledFooterText>
                    </Link>
                    <Link href='/categories/music'>
                        <StyledFooterText>Music</StyledFooterText>
                    </Link>
                    <Link href='/categories/pranks'>
                        <StyledFooterText>Pranks</StyledFooterText>
                    </Link>
                    <Link href='/categories/politics'>
                        <StyledFooterText>Politics</StyledFooterText>
                    </Link>
                    <Link href='/categories/questions'>
                        <StyledFooterText>Questions</StyledFooterText>
                    </Link>
                    <Link href='/categories/reactions'>
                        <StyledFooterText>Reactions</StyledFooterText>
                    </Link>
                    <Link href='/categories/sound-effects'>
                        <StyledFooterText>Sound Effects</StyledFooterText>
                    </Link>
                    <Link href='/categories/sports'>
                        <StyledFooterText>Sports</StyledFooterText>
                    </Link>
                    <Link href='/categories/television'>
                        <StyledFooterText>Television</StyledFooterText>
                    </Link>
                    <Link href='/categories/tiktok'>
                        <StyledFooterText>TikTok</StyledFooterText>
                    </Link>
                </GridColumn> */}
                <GridColumn style={{ paddingLeft: "80px" }}>
                    <Link href='/streams'>
                        <StyledFooterText>Top Streamers</StyledFooterText>
                    </Link>
                    <Link href='/streams'>
                        <StyledFooterText>Live Now</StyledFooterText>
                    </Link>
                    <Link href='/twitch/streaming-guides'>
                        <StyledFooterText>Twitch Guides</StyledFooterText>
                    </Link>
                    <Link href='/blerp-ambassadors'>
                        <StyledFooterText>Blerp Champions</StyledFooterText>
                    </Link>
                </GridColumn>
                <GridColumn style={{ paddingLeft: "80px" }}>
                    <Link href='/twitch-extension'>
                        <StyledFooterText>Twitch App</StyledFooterText>
                    </Link>
                    <Link href='/twitch-walkon'>
                        <StyledFooterText>Twitch Walk On</StyledFooterText>
                    </Link>
                    <Link href='/apps'>
                        <StyledFooterText>Mobile Apps</StyledFooterText>
                    </Link>
                    <Link href='/discord-soundboard-bot'>
                        <StyledFooterText>Discord Bot</StyledFooterText>
                    </Link>
                </GridColumn>
                <GridColumn style={{ paddingLeft: "80px" }}>
                    <Link href='/support'>
                        <StyledFooterText>Support</StyledFooterText>
                    </Link>
                    <Link href='/faq'>
                        <StyledFooterText>FAQ</StyledFooterText>
                    </Link>
                    <Link href='/blog'>
                        <StyledFooterText>Blog</StyledFooterText>
                    </Link>
                    <Link href='/legal'>
                        <StyledFooterText>Legal</StyledFooterText>
                    </Link>
                    <Link href='/company'>
                        <StyledFooterText>Company</StyledFooterText>
                    </Link>
                    <Link href='/careers '>
                        <StyledFooterText>Jobs</StyledFooterText>
                    </Link>
                </GridColumn>
            </Grid>
            <Row style={{ justifyContent: "center" }}>
                <Text
                    fontSize='21px'
                    fontColor='grey5'
                    fontWeight='light'
                    style={{
                        margin: "0",
                        marginRight: "60px",
                        height: "100%",
                        padding: "16px",
                    }}
                >
                    &copy; <b>2020</b> BLERP, Inc
                </Text>
            </Row>
        </Container>
    );
};

export default Footer;
