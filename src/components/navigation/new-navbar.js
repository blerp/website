/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import Link from "next/link";
import { withRouter } from "next/router";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import styled from "styled-components";
import MobileOverlayMenu from "./MobileOverlayMenu";
import NewSearchBar from "./new-searchbar";

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

const SecondaryFeaturedButtonLink = styled.a`
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

const MobileHamburgerMenu = styled.img`
    width: 32px;
    height: 32px;
    background-position: center;
    position: absolute;
    visibility: hidden;
    display: none;
    cursor: pointer;

    @media (max-width: 680px) {
        position: relative;
        visibility: visible;
        display: block;
    }
`;

const UserProfile = styled.img`
    width: 32px;
    height: 32px;
    background-position: center;
    cursor: pointer;
`;

const UserProfileHidden = styled.img`
    width: 36px;
    height: 36px;
    background-position: center;
    visibility: hidden;
`;

const ButtonLink = styled.a`
    text-decoration: none;
    background: transparent;
    margin: 0 32px;
    padding: 0;
    pointer: cursor;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.9;
    }

    @media (max-width: 680px) {
        margin: 0;
    }
`;

const Header = styled.header`
    width: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(63, 32, 107, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    border-radius: 0;

    @media (min-width: 680px) {
        justify-content: center;
    }
`;

const Logo = styled.img`
    height: 66%;
    margin: auto 20px;

    @media (max-width: 680px) {
        height: 56%;
        margin: auto 4px;
        ${({ visibleOnMobile }) =>
            visibleOnMobile
                ? "visibility: hidden;"
                : "position: absolute; visibility: hidden;"};
        display: none;
    }
`;

const A = styled.a`
    height: 64px;
    display: inline-flex;

    @media (max-width: 680px) {
        visibility: hidden;
        display: none;
    }
`;

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(23, 13, 17, 0.3);
    width: 100%;

    @media (max-width: 680px) {
        justify-content: center;
    }
`;

const ButtonContainer = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 16px;
    width: 40%;

    @media (max-width: 680px) {
        position: absolute;
        visibility: hidden;
        display: none;
    }
`;

const ButtonMobileHiddenContainer = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 680px) {
        position: absolute;
        visibility: hidden;
        display: none;
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
    height: 100vh;
    z-index: 10000000;
    position: fixed;
    background-color: ${props => props.theme.headerColor};
    opacity: 0.96;
    top: 0;
    padding: 20px 0;
`;

const MobileMenuOverlayColumn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    padding: 40px 0;
    height: 100%;
    overflow-y: scroll;
`;

const IntegrationsText = styled.div`
    font-weight: normal;
    font-size: 18px !important;
    color: ${props => props.theme.flyoutBackground};
`;

const IntegrationsSmallTitle = styled.div`
    font-weight: normal;
    font-size: 12px !important;
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

const IntegrationImage = styled.img``;

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

const VisibleLinkMobileSearch = styled.div`
    width: 80%;

    @media (max-width: 680px) {
        position: relative;
        visibility: visible;
        display: block;
    }
`;

const ButtonTransparent = styled.button`
    background-color: transparent;
    border: none;
    margin: 0;

    &:hover {
        opacity: 0.8;
    }

    @media (max-width: 680px) {
        margin: 360px 0 0;
    }
`;

class NewNavBar extends React.Component {
    static defaultProps = {
        displayButtons: true,
        displayOnMobile: "logo",
        initialSearchQuery: "",
    };
    navPopoutButton;
    searchBar;

    constructor(props) {
        super(props);
        this.state = {
            searchValue: props.initialSearchQuery,
            forceShowPopup: false,
            showMobileMenu: false,
        };
    }

    onOpenMobileMenu = () => {
        this.setState({ showMobileMenu: true });
    };

    onCloseMobileMenu = () => {
        this.setState({ showMobileMenu: false });
    };

    renderNavOptions() {
        if (this.props.data.loading) {
            return (
                <ButtonContainer>
                    <ButtonMobileHiddenContainer>
                        <FeaturedButtonLinkWhite href='/upload'>
                            <TinyIcon
                                alt='Blerp Create Icon'
                                src='https://storage.googleapis.com/blerp_products/Web/Navbar/whhite-lightbulb.svg'
                            />
                            <Blockdiv>Create</Blockdiv>
                        </FeaturedButtonLinkWhite>
                    </ButtonMobileHiddenContainer>
                    <UserProfileHidden
                        alt='Blerp Integration Soundboard Products Menu'
                        src='https://storage.googleapis.com/blerp_products/Web/Navbar/integrations-menu.svg'
                    />
                    <ButtonLink onClick={this.onOpenMobileMenu}>
                        <UserProfile
                            src='https://storage.googleapis.com/blerp_products/Web/Navbar/integrations-menu.svg'
                            alt='Blerp Integration Soundboard Products Menu'
                        />
                    </ButtonLink>
                </ButtonContainer>
            );
        }

        return this.props.data.web && this.props.data.web.userSignedIn ? (
            <ButtonContainer>
                <ButtonMobileHiddenContainer>
                    <Link
                        prefetch={true}
                        href={`/user/${this.props.data.web.userSignedIn._id}`}
                    >
                        <FeaturedButtonLinkWhite
                            href={`/user/${this.props.data.web.userSignedIn._id}`}
                        >
                            My Profile
                        </FeaturedButtonLinkWhite>
                    </Link>
                </ButtonMobileHiddenContainer>

                <ButtonMobileHiddenContainer>
                    <FeaturedButtonLinkWhite href='/upload'>
                        <TinyIcon
                            alt='Blerp Create Icon'
                            src='https://storage.googleapis.com/blerp_products/Web/Navbar/whhite-lightbulb.svg'
                        />
                        Create
                    </FeaturedButtonLinkWhite>
                </ButtonMobileHiddenContainer>

                <ButtonLink onClick={this.onOpenMobileMenu}>
                    <UserProfile
                        alt='Blerp Integration Soundboard Products Menu'
                        src='https://storage.googleapis.com/blerp_products/Web/Navbar/integrations-menu.svg'
                    />
                </ButtonLink>
            </ButtonContainer>
        ) : (
            <ButtonContainer>
                <ButtonMobileHiddenContainer>
                    <SecondaryFeaturedButtonLink href='/login?returnTo=/'>
                        Sign In/Up
                    </SecondaryFeaturedButtonLink>
                </ButtonMobileHiddenContainer>

                <ButtonMobileHiddenContainer>
                    <FeaturedButtonLinkWhite href='/login?returnTo=upload'>
                        <TinyIcon
                            alt='Blerp Create Icon'
                            src='https://storage.googleapis.com/blerp_products/Web/Navbar/whhite-lightbulb.svg'
                        />
                        <Blockdiv>Create</Blockdiv>
                    </FeaturedButtonLinkWhite>
                </ButtonMobileHiddenContainer>

                <ButtonLink onClick={this.onOpenMobileMenu}>
                    <UserProfile
                        src='https://storage.googleapis.com/blerp_products/Web/Navbar/integrations-menu.svg'
                        alt='Blerp Integration Soundboard Products Menu'
                    />
                </ButtonLink>
            </ButtonContainer>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Header role='navigation' onMouseLeave={this.onExitPopup}>
                    <NavContainer>
                        <Link prefetch={true} href='/'>
                            <A href='/'>
                                <Logo
                                    visibleOnMobile={true}
                                    alt='Blerp Logo'
                                    src='https://storage.googleapis.com/blerp_products/Web/Misc/blerp_logo_transparent.svg'
                                />
                            </A>
                        </Link>
                        <MobileHamburgerMenu
                            alt='Menu Icon'
                            onClick={this.onOpenMobileMenu}
                            src='https://storage.googleapis.com/blerp_products/Web/Navbar/white-hamburger-menu.svg'
                        />
                        <VisibleLinkMobileSearch>
                            <NewSearchBar
                                initialSearchQuery={
                                    this.props.initialSearchQuery
                                }
                            />
                        </VisibleLinkMobileSearch>
                        {this.renderNavOptions()}
                    </NavContainer>
                    {/* <BottomNavContainer>
            <SuperNav prefetch={true} navItems={this.props.navItems} />
          </BottomNavContainer> */}
                </Header>
                {this.state.showMobileMenu && (
                    <MobileOverlayMenu
                        onCloseMobileMenu={this.onCloseMobileMenu}
                        signedInUser={
                            this.props.data.web &&
                            this.props.data.web.userSignedIn
                        }
                    />
                )}
            </React.Fragment>
        );
    }
}

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

export default graphql(userQuery, {
    options: {
        ssr: false,
    },
})(withRouter(NewNavBar));
