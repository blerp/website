/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import NewSearchBar from "../../components/navigation/new-searchbar";
import PinkButton from "../../components/buttons/pink-button";

const MainContainer = styled.div`
    background-color: ${props =>
        props.isLight ? props.theme.flyoutBackground : props.theme.starling};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 600px;
    position: relative;
    background: linear-gradient(
        to left top,
        ${props =>
            props.isLight
                ? props.theme.flyoutBackground
                : props.theme.starling},
        ${props =>
            props.isLight
                ? props.theme.flyoutBackground
                : props.theme.starling},
        ${props =>
            props.isLight
                ? props.theme.flyoutBackground
                : props.theme.starling},
        ${props => (props.isLight ? props.theme.flyoutBackground : "#825ee2")}
    );
    width: 100%;
`;

const HeadingText = styled.h1`
    font-weight: bolder;
    padding: 32px 0;
    font-size: 60px;
    margin: 60px 0;
    color: ${props =>
        props.isLight ? props.theme.bodyText : props.theme.flyoutBackground};
    text-align: center;
    width: 90%;
    z-index: 1;
    letter-spacing: 2px;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const TealHeaderText = styled.a`
    font-weight: bolder;
    display: inline;
    padding: 12px;
    font-size: 60px;
    padding: 4px;
    marging: 24px;
    letter-spacing: 2px;
    text-decoration: none;
    color: ${props => props.theme.seafoam};
    text-align: center;
    width: 100%;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const Image = styled.img`
    position: absolute;
    top: 24px;
    border: none;
    left: 0;
    background-repeat: no-repeat;

    /* Preserve aspet ratio */
    max-width: 80%;
    min-height: 60%;
`;

const BetterPinkButton = styled(PinkButton)`
    font-weight: bolder;
`;

class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainContainer isLight={this.props.isLight}>
                <HeadingText isLight={this.props.isLight}>
                    Discover, Share,{" "}
                    <TealHeaderText href='/upload'>Create</TealHeaderText> short
                    audio clips
                </HeadingText>
                {this.props.showSearchButton ? (
                    <BetterPinkButton
                        onClick={() => {
                            document
                                .getElementById("blerp_new_search_bar")
                                .focus();
                        }}
                    >
                        Search Now
                    </BetterPinkButton>
                ) : (
                    <NewSearchBar />
                )}
                <Image src='https://storage.googleapis.com/blerp_products/Web/Home/new_background.svg' />
            </MainContainer>
        );
    }
}

export default HomeHeader;
