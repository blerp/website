/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import Link from "next/link";

const FeaturedButtonLinkWhite = styled.a`
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 40px;
    background-color: transparent;
    border-radius: 100px;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.flyoutBackground};
    border: 2px none ${props => props.theme.flyoutBackground};
    padding: 2px 8px;
    margin: 4px;
    display: flex;

    &:focus {
        border-radius: 40px;
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        color: ${props => props.theme.pandaPink};
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }

    &:active {
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }
`;

const WhiteSecondaryFeaturedButtonLink = styled.a`
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    white-space: nowrap;
    border-radius: 40px;
    background-color: transparent;
    border-radius: 100px;
    align-items: center;
    color: ${props => props.theme.flyoutBackground};
    border: 2px solid ${props => props.theme.flyoutBackground};
    padding: 8px;
    margin: 12px 0;

    &:focus {
        border-radius: 40px;
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        color: ${props => props.theme.pandaPink};
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }

    &:active {
        background-color: transparent;
        transition: all 0.2s ease 0s;
    }
`;

const TinyIcon = styled.img`
    width: 28px;
    height: 28px;
    padding: 4px;
`;

const Blockdiv = styled.div`
    padding: 4px;
`;

const MobileMenuOverlay = styled.div`
    width: 100vw;
    height: 100%;
    z-index: 10000000;
    position: fixed;
    background-color: ${props => props.theme.headerColor};
    opacity: 0.96;
    top: 0;
    padding: 20px 0;
    overflow-y: scroll;
`;

const MobileMenuOverlayColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    padding: 40px 0;
    overflow-y: scroll;
`;

const IntegrationsText = styled.div`
    font-weight: normal;
    font-size: 18px;
    color: ${props => props.theme.flyoutBackground};
`;

const IntegrationsSmallTitle = styled.div`
    font-weight: normal;
    font-size: 12px;
    padding: 8px;
    color: ${props => props.theme.flyoutBackground};
`;

const CloseButton = styled.img`
    width: 28px;
    height: 28px;
    cursor: pointer;
`;

const Borderline = styled.div`
    width: 80%;
    margin: 8px;
    border-bottom: 1px solid ${props => props.theme.flyoutBackground};
    height: 4px;
    position: absolute;
    visibility: hidden;
    display: none;

    @media (max-width: 680px) {
        position: relative;
        visibility: visible;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`;

const IntegrationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 360px;
    padding: 20px 20px 80px;
    cursor: pointer;
`;

const IntegrationRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

const IntegrationItem = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    text-decoration: none;
    min-height: 120px;

    &:hover {
        opacity: 0.8;
    }
`;

const IntegrationImage = styled.img`
    padding: 4px;
`;

const VisibleLinkMobile = styled.div`
    position: absolute;
    visibility: hidden;
    display: none;
    padding: 16px;
    height: 100%;

    @media (max-width: 680px) {
        position: relative;
        visibility: visible;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: column;
    }
`;

const ButtonTransparent = styled.button`
    background-color: transparent;
    border: none;
    margin: 0;
    height: 60px;
    width: 60px;

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 680px) {
        margin: 0;
    }
`;

class MobileOverlayMenu extends React.Component {
    static defaultProps = {
        onCloseMobileMenu: true,
    };

    render() {
        return (
            <MobileMenuOverlay>
                <MobileMenuOverlayColumn>
                    <ButtonTransparent onClick={this.props.onCloseMobileMenu}>
                        <CloseButton
                            alt='Close Menu Icon'
                            src='https://storage.googleapis.com/blerp_products/Web/Navbar/close-button-white.svg'
                        />
                    </ButtonTransparent>
                    <VisibleLinkMobile>
                        {!this.props.signedInUser && (
                            <WhiteSecondaryFeaturedButtonLink href='/login?returnTo=/'>
                                Sign In/Up
                            </WhiteSecondaryFeaturedButtonLink>
                        )}

                        {this.props.signedInUser && (
                            <Link
                                prefetch={true}
                                href={`/user/${this.props.signedInUser._id}`}
                            >
                                <WhiteSecondaryFeaturedButtonLink
                                    href={`/user/${this.props.signedInUser._id}`}
                                >
                                    My Profile
                                </WhiteSecondaryFeaturedButtonLink>
                            </Link>
                        )}

                        <FeaturedButtonLinkWhite href='/upload'>
                            <TinyIcon
                                alt='Blerp Create Icon'
                                src='https://storage.googleapis.com/blerp_products/Web/Navbar/whhite-lightbulb.svg'
                            />
                            <Blockdiv>Create</Blockdiv>
                        </FeaturedButtonLinkWhite>

                        <FeaturedButtonLinkWhite href='/'>
                            <TinyIcon
                                alt='Blerp Discover Icon'
                                src='https://storage.googleapis.com/blerp_products/Web/Home/discover.svg'
                            />
                            <Blockdiv>Home</Blockdiv>
                        </FeaturedButtonLinkWhite>
                    </VisibleLinkMobile>

                    <FeaturedButtonLinkWhite href='/contact'>
                        {/* <TinyIcon
                alt="Blerp Discover Icon"
                src="https://storage.googleapis.com/blerp_products/Web/Home/discover.svg"
              /> */}
                        <Blockdiv>Contact</Blockdiv>
                    </FeaturedButtonLinkWhite>

                    <Borderline />

                    <IntegrationContainer
                        onClick={this.props.onCloseMobileMenu}
                    >
                        <IntegrationsText>Integrations</IntegrationsText>

                        <IntegrationRow>
                            <IntegrationItem href='/apps'>
                                <IntegrationImage
                                    alt='Android Icon'
                                    src='https://storage.googleapis.com/blerp_products/Web/Navbar/Android%20icon.svg'
                                />
                                <IntegrationsSmallTitle>
                                    Android
                                </IntegrationsSmallTitle>
                            </IntegrationItem>

                            <IntegrationItem href='/apps'>
                                <IntegrationImage
                                    alt='Ios Icon'
                                    src='https://storage.googleapis.com/blerp_products/Web/Navbar/apple.svg'
                                />
                                <IntegrationsSmallTitle>
                                    iOS
                                </IntegrationsSmallTitle>
                            </IntegrationItem>
                        </IntegrationRow>
                        <IntegrationRow>
                            <IntegrationItem href='/streamers'>
                                <IntegrationImage
                                    alt='Blerp and Twitch Logo'
                                    src='https://storage.googleapis.com/blerp_products/Web/Navbar/blerptwitch-noshadow.svg'
                                />
                                <IntegrationsSmallTitle>
                                    Twitch
                                </IntegrationsSmallTitle>
                            </IntegrationItem>
                            <IntegrationItem
                                alt='Blerp and Walkon Logo'
                                href='/twitch-walkon'
                            >
                                <IntegrationImage src='https://storage.googleapis.com/blerp_products/Web/Navbar/Walk%20on%20twitch.svg' />
                                <IntegrationsSmallTitle>
                                    Twitch Walkon
                                </IntegrationsSmallTitle>
                            </IntegrationItem>
                        </IntegrationRow>
                        <IntegrationRow>
                            <IntegrationItem href='/soundboard-products/discord'>
                                <IntegrationImage
                                    alt='Blerp and Discord Logo'
                                    src='https://storage.googleapis.com/blerp_products/Web/Navbar/blerp%20%2B%20discord.svg'
                                />
                                <IntegrationsSmallTitle>
                                    Discord
                                </IntegrationsSmallTitle>
                            </IntegrationItem>
                            <IntegrationItem
                                alt='Voice Assistant Blerp Logo'
                                href='/soundboard-products/voice-assistants'
                            >
                                <IntegrationImage src='https://storage.googleapis.com/blerp_products/Web/Navbar/Blerp%20%2B%20Voice%20assistant.svg' />
                                <IntegrationsSmallTitle>
                                    Voice Assistants
                                </IntegrationsSmallTitle>
                            </IntegrationItem>
                        </IntegrationRow>
                        {this.props.signedInUser && (
                            <IntegrationRow>
                                <WhiteSecondaryFeaturedButtonLink href='/logout'>
                                    <Blockdiv>Logout</Blockdiv>
                                </WhiteSecondaryFeaturedButtonLink>
                            </IntegrationRow>
                        )}
                    </IntegrationContainer>
                </MobileMenuOverlayColumn>
            </MobileMenuOverlay>
        );
    }
}

export default MobileOverlayMenu;
