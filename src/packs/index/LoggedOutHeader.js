/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { withTheme } from "styled-components";

import MainBox from "./MainBox";

const MainContainer = styled.div`
    background-color: ${props => props.theme.flyoutBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 1000px;
    position: relative;
    width: 100%;
    position: relative;
    background-image: url("https://storage.googleapis.com/blerp_products/Web/Red%20to%20purple%20header%20gradient%20blob-min.png");
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 120px;

    @media (max-width: 600px) {
        padding: 20px 0;
    }

    @media (max-width: 1800px) {
        background-size: inherit;
    }
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

const BoldText = styled.div`
    font-weight: 600;
    font-size: 80px;
    color: ${props => props.color};
    text-align: left;
    margin: 8px;
    width: 80%;
    cursor: pointer;
    line-height: 60px;

    &:hover {
        color: ${props => props.hoverColor};
        font-size: 78px;
        text-decoration: underline;
    }

    @media (max-width: 600px) {
        font-size: 60px;

        &:hover {
            color: ${props => props.hoverColor};
            font-size: 52px;
            text-decoration: underline;
        }
    }
`;

const BoldTextNoHover = styled.div`
    font-weight: 600;
    font-size: 80px;
    color: ${props => props.color};
    text-align: left;
    margin: 8px;
    width: 80%;

    @media (max-width: 600px) {
        font-size: 60px;
    }
`;

const MediumText = styled.div`
    font-size: 60px;
    color: ${props => props.color};
    text-align: left;
    width: 100%;
    font-weight: 300;
    text-decoration: underline;
    letter-spacing: 3px;
    width: 90%;

    @media (max-width: 600px) {
        font-size: 40px;
        text-align: center;
    }
`;

const StyleLink = styled.a`
    text-decoration: none;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 32px;

    @media (max-width: 600px) {
        padding: 16px 0;
        align-items: center;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    width: 100%;

    @media (max-width: 800px) {
        align-items: center;
        flex-direction: column;
    }
`;

class LoggedOutHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainContainer>
                <Row>
                    <Column>
                        <HugeTextContainer>
                            <ImageIcon src='https://storage.googleapis.com/blerp_products/Web/Home/discover.svg' />
                            <StyleLink
                                onClick={() => {
                                    const container = document.getElementById(
                                        "discover_blerp_container",
                                    );
                                    if (container) {
                                        container.scrollIntoView({
                                            block: "end",
                                            behavior: "smooth",
                                        });
                                    }
                                }}
                            >
                                <BoldText
                                    color={this.props.theme.flyoutBackground}
                                    hoverColor={this.props.theme.starling}
                                >
                                    Discover
                                </BoldText>
                            </StyleLink>
                        </HugeTextContainer>
                        <HugeTextContainer>
                            <ImageIcon src='https://storage.googleapis.com/blerp_products/Web/Home/light.svg' />
                            <StyleLink
                                onClick={() => {
                                    document
                                        .getElementById("blerp_home_create")
                                        .scrollIntoView({
                                            block: "end",
                                            behavior: "smooth",
                                        });
                                }}
                            >
                                <BoldText
                                    color={this.props.theme.flyoutBackground}
                                    hoverColor={this.props.theme.seafoam}
                                >
                                    Create
                                </BoldText>
                            </StyleLink>
                            <BoldTextNoHover
                                color={this.props.theme.flyoutBackground}
                            >
                                &
                            </BoldTextNoHover>
                        </HugeTextContainer>
                        <HugeTextContainer>
                            <ImageIcon src='https://storage.googleapis.com/blerp_products/Web/Home/share2.svg' />
                            <StyleLink
                                onClick={() => {
                                    document
                                        .getElementById("blerp_home_share")
                                        .scrollIntoView({
                                            block: "start",
                                            behavior: "smooth",
                                        });
                                }}
                            >
                                <BoldText
                                    color={this.props.theme.flyoutBackground}
                                    hoverColor={this.props.theme.pandaPink}
                                >
                                    Share
                                </BoldText>
                            </StyleLink>
                        </HugeTextContainer>

                        <HugeTextContainer>
                            <MediumText
                                color={this.props.theme.flyoutBackground}
                            >
                                Short audio bites
                            </MediumText>
                        </HugeTextContainer>
                    </Column>
                    <MainBox />
                </Row>
                {/* <HugeTextContainerBackgroundGradient /> */}
            </MainContainer>
        );
    }
}

export default withTheme(LoggedOutHeader);
