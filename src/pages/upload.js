/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { withTheme } from "styled-components";

import { Helmet } from "react-helmet";
import gql from "graphql-tag";
import Link from "next/link";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import PinkButton from "../components/buttons/pink-button";
import SecondaryButton from "../components/buttons/SecondaryButton";

import BoardMaker from "../packs/upload/board-maker";
import UploadBlerp from "../components/upload/app";
import withData from "../lib/withData";

import { graphql, withApollo } from "@apollo/react-hoc";

const Container = styled.div`
    position: relative;
    font-weight: 300;
    padding: 0;
    margin: 0;
    width: 100%;
`;

const FooterContainer = styled.div`
    margin-top: 20px;
`;

const FinalScreenContainer = styled.div`
    flex-flow: row;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 40px 68px;
    margin: 120px 0;
    background-color: #fff;
    border-radius: 8px;
`;

const BoxImage = styled.div`
    background-image: ${props =>
        props.showBackground
            ? `url("https://storage.googleapis.com/blerp_products/ArtWork/LoginPageSpringv5Q1_19'%401x.svg")`
            : "none"};
    width: 100vw;
    position: absolute;
    height: 80vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
`;

const LineImg = styled.img`
    margin: 30px;
    width: 100%;
`;

const HugeTextContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    z-index: 1000;
`;

const ImageIcon = styled.img`
    width: 48px;
    height: 48px;
    min-width: 48px;
    min-height: 48px;
`;

const NormalText = styled.div`
    font-weight: lighter;
    font-size: 16px;
    color: ${props => props.color};
    text-align: center;
    margin: 16px 0;
    max-width: 320px;
`;

const BoldTextNoHover = styled.div`
    font-weight: normal;
    font-size: 32px;
    color: ${props => props.theme.seafoam};
    text-align: left;
    margin: 8px;
    width: 80%;
`;

const userQuery = gql`
    query webGetUserForWeb {
        web {
            userSignedIn {
                _id
                roles
            }
        }
    }
`;

const Borderline = styled.div`
    width: 100%;
    margin: 8px;
    height: 1px;
    border-bottom: 1px solid ${props => props.theme.defaultBackground};
`;

const ButtonLink = styled.a`
    display: flex;
    flex-direction: row;
    text-decoration: none;
    background: transparent;
    margin: 0 32px;
    padding: 0;
    position: absolute;
    top: 92px;
    left: 32px;
    align-items: center;
    justify-content: center;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.9;
    }
`;

const BackArrow = styled.img`
    width: 21px;
    height: 21px;
    background-position: center;
`;

const BackText = styled.div`
    text-decoration: none;
    color: ${props => props.theme.bodyText};
    font-size: 14px;
    padding: 4px;
`;

const BoardContainer = styled.div`
    margin: 40px;
`;

class Page extends React.Component {
    static getInitialProps = ctx => ({
        link: ctx.query.link,
        t: ctx.query.t,
    });
    props;

    constructor(props) {
        super(props);
        this.state = {
            selectedScreenOption: props.t ? "BLERP" : "NONE", // SOUNDBOARD
        };
    }

    async componentDidMount() {
        // Note: Checks if loggedin.. if not redirects to login page
        const loggedInQuery = await this.props.client.query({
            errorPolicy: "all",
            fetchPolicy: "network-only",
            query: userQuery,
        });

        const redirect = "upload";

        if (
            loggedInQuery.data &&
            loggedInQuery.data.web &&
            loggedInQuery.data.web.userSignedIn &&
            loggedInQuery.data.web.userSignedIn._id
        ) {
        } else {
            window.location.href = `/login?returnTo=${redirect}`;
        }
    }

    onSelectScreenOption = option => () => {
        this.setState({ selectedScreenOption: option });
    };

    onResetClick = () => {
        this.setState({ selectedScreenOption: "NONE" });
    };

    render() {
        return (
            <Container>
                <Helmet>
                    <title>
                        {
                            "Create Blerps | Youtube Audio Downloader | Online Audio Editor"
                        }
                    </title>
                    <style type='text/css' />
                    <meta
                        name='description'
                        content={`Create audio clips, soundboards, and sound memes using blerp's upload audio tools. Our sound maker allows you to download audio clips from Youtube, Soundcloud, Twitch, and more. Create all the audio clips or upload your own audio clips to share with your friends!`}
                    />
                </Helmet>
                <NavBar displayButtons={true} />

                <Link
                    prefetch={true}
                    href={{
                        pathname: "/",
                    }}
                    as={`/`}
                >
                    <ButtonLink href={`/`}>
                        <BackArrow src='https://storage.googleapis.com/blerp-public-images/navigation/back-arrow.svg' />
                        <BackText>{"Home"}</BackText>
                    </ButtonLink>
                </Link>

                <BoxImage
                    showBackground={this.state.selectedScreenOption === "NONE"}
                />
                {this.state.selectedScreenOption === "NONE" && (
                    <FinalScreenContainer>
                        <PageContainer>
                            <HugeTextContainer>
                                <ImageIcon src='https://storage.googleapis.com/blerp_products/create%20bulb.svg' />
                                <BoldTextNoHover>Create</BoldTextNoHover>
                            </HugeTextContainer>

                            <Borderline />

                            <NormalText>Create a new soundbite!</NormalText>
                            <PinkButton
                                onClick={this.onSelectScreenOption("BLERP")}
                            >
                                Create Blerp
                            </PinkButton>

                            <LineImg
                                src={
                                    "https://storage.googleapis.com/blerp-public-images/backgrounds/or-line.svg"
                                }
                                alt='Line spacer image'
                            />

                            <NormalText>
                                Create a new soundboard to organize your blerps!
                            </NormalText>
                            <SecondaryButton
                                onClick={this.onSelectScreenOption(
                                    "SOUNDBOARD",
                                )}
                            >
                                Create Board
                            </SecondaryButton>
                        </PageContainer>
                    </FinalScreenContainer>
                )}

                {this.state.selectedScreenOption === "SOUNDBOARD" && (
                    <BoardContainer>
                        <BoardMaker
                            onResetClick={this.onResetClick}
                            onBoardCreated={null}
                        />
                    </BoardContainer>
                )}
                {this.state.selectedScreenOption === "BLERP" && (
                    <UploadBlerp
                        onResetClick={this.onResetClick}
                        link={this.props.link}
                        startTime={this.props.t}
                    />
                )}

                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

export default withData(withApollo(Page));
