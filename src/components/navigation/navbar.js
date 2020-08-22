/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import Link from "next/link";
import { withRouter } from "next/router";
import * as React from "react";
import { gql, useQuery } from "@apollo/client";

import { Mutation } from "@apollo/client/react/components";

import styled, { ThemeProvider, ThemeContext } from "styled-components";
import MobileOverlayMenu from "./MobileOverlayMenu";
import NewSearchBar from "./new-searchbar";
import { Button } from "../theme/Theme";
import { Icon } from "../theme/Icon";
import { GridColumn, Grid } from "../theme/Grid";
import Text from "../theme/Text";
import { Row } from "../shared/ProfileTabViews/ProfileStyledComponents";
import { useEffect, useContext, useState } from "react";
import ApolloClient from "apollo-client";
import withData from "../../lib/withData";
import MobileNavbar from "./MobileNavbar";
import { ToastContext } from "../theme/ToastProvider";
import {
    ButtonContainer,
    ButtonMobileHiddenContainer,
    SecondaryFeaturedButtonLink,
    TinyIcon,
    FeaturedButtonLink,
    Blockdiv,
    ButtonLink,
    UserProfile,
    Header,
    NavContainer,
    A,
    Logo,
    MobileHamburgerMenu,
    StyledModal,
    VisibleLinkMobileSearch,
    StyledNavText,
    StyledNavProfileText,
    ProfileIcon,
} from "./NavStyledComponents";
import ToastNotification from "../theme/ToastNotification";

const FETCH_USER_SIGNED_IN = gql`
    query webNavGetUserSignedIn {
        web {
            userSignedIn {
                _id
                totalPlays
                roles
                bitePlays
                username
                profileImage {
                    original {
                        url
                    }
                }
            }
            categoryMany {
                _id
                title
                urlKey
                imageUrl
            }
        }
    }
`;

const useWindowSize = () => {
    const isClient = typeof window === "object";

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
};
const isBrowser = typeof window !== "undefined";

const FooterContainer = styled.div``;

const NavBar = props => {
    const size = useWindowSize();
    const { loading, error, data, refetch } = useQuery(FETCH_USER_SIGNED_IN, {
        fetchPolicy: "network-only",
    });
    const [opened, setOpened] = useState(false);

    const theme = useContext(ThemeContext);

    const { content, appearance, show } = useContext(ToastContext);

    const renderSignedOut = () => {
        return (
            <ButtonContainer>
                <ButtonMobileHiddenContainer>
                    <SecondaryFeaturedButtonLink href='/login?returnTo=/'>
                        Sign In/Up
                    </SecondaryFeaturedButtonLink>
                </ButtonMobileHiddenContainer>

                <ButtonMobileHiddenContainer>
                    <FeaturedButtonLink href='/login?returnTo=upload'>
                        <TinyIcon
                            alt='Blerp Create Icon'
                            src='https://storage.googleapis.com/blerp_products/Web/Navbar/black-lightbulb.svg'
                        />
                        <Blockdiv>Create</Blockdiv>
                    </FeaturedButtonLink>
                </ButtonMobileHiddenContainer>

                <ButtonLink onClick={this.onOpenMobileMenu}>
                    <UserProfile
                        src='https://storage.googleapis.com/blerp_products/Web/Navbar/intgration-black.svg'
                        alt='Blerp Integration Soundboard Products Menu'
                    />
                </ButtonLink>
            </ButtonContainer>
        );
    };

    StyledNavText.defaultProps = {
        style: { cursor: "pointer", whiteSpace: "nowrap" },
        fontColor: "notBlack",
        fontColorHover: "ibisRed",
        fontSize: "24px",
        fontWeight: "light",
    };

    // const renderHalfCategoryList = () => {
    //     const half = Math.ceil(data.web.categoryMany.length / 2);

    //     const firstHalf = data.web.categoryMany.splice(0, half);
    //     const secondHalf = data.web.categoryMany.splice(-half);

    //     return (
    //         <>
    //             <div>
    //                 {firstHalf.map((category, index) => {
    //                     return (
    //                         <StyledNavText
    //                             key={`${category.title}-${index}`}
    //                             fontSize='24px'
    //                             fontWeight='light'
    //                         >
    //                             {category.title}
    //                         </StyledNavText>
    //                     );
    //                 })}
    //             </div>
    //             <div>
    //                 {secondHalf.map((category, index) => {
    //                     return (
    //                         <StyledNavText
    //                             key={`${category.title}-${index}`}
    //                             fontSize='24px'
    //                             fontWeight='light'
    //                         >
    //                             {category.title}
    //                         </StyledNavText>
    //                     );
    //                 })}
    //             </div>
    //         </>
    //     );
    // };

    if (loading || !data) return <></>;
    if (error) return <></>;

    if (data.web)
        if (size.width <= 1000) {
            return <MobileNavbar data={data} />;
        } else {
            return (
                <>
                    <Header role='navigation' onMouseLeave={null}>
                        <NavContainer>
                            <Link prefetch={true} href='/'>
                                <A href='/'>
                                    <Logo
                                        style={{
                                            margin: "0 30px 0 0",
                                            placeSelf: "center",
                                        }}
                                        visibleOnMobile={true}
                                        alt='Blerp Logo'
                                        src='https://storage.googleapis.com/blerp_products/Web/Misc/blerp_logo_transparent.svg'
                                    />
                                </A>
                            </Link>
                            <MobileHamburgerMenu
                                alt='Menu Icon'
                                onClick={null}
                                src='https://storage.googleapis.com/blerp_products/Web/Navbar/black-hamburger-menu.svg'
                            />
                            <VisibleLinkMobileSearch>
                                <NewSearchBar initialSearchQuery={null} />
                            </VisibleLinkMobileSearch>
                            <ButtonContainer
                                style={{
                                    justifyContent: "space-around",
                                    display: "flex",
                                }}
                            >
                                <ButtonMobileHiddenContainer
                                    style={{
                                        justifyContent: "space-around",
                                        width: "100%",
                                    }}
                                >
                                    <StyledModal
                                        data-cy='navbar-menu'
                                        fullscreen
                                        backgroundBlur
                                        width='1200px'
                                        style={{
                                            padding: "0",
                                            flexDirection: "column",
                                        }}
                                        trigger={
                                            <Icon
                                                data-cy='navbar-trigger'
                                                hoverColor='lightGrey'
                                                onOpen={() => setOpened(true)}
                                                onClose={() => setOpened(false)}
                                                size='big'
                                                style={{ marginRight: "15px" }}
                                                url={
                                                    opened
                                                        ? "https://storage.googleapis.com/blerp_products/Web/Menus/x%20close.svg"
                                                        : "https://storage.googleapis.com/blerp_products/Web/Navbar/Menu%202%20line.svg"
                                                }
                                            />
                                        }
                                    >
                                        {({ handleCloseClick }) => (
                                            <>
                                                <Grid
                                                    style={{
                                                        backgroundColor:
                                                            "transparent",
                                                        padding: "10px",
                                                    }}
                                                    gridColumns='38% 33% 29%'
                                                >
                                                    {/* <GridColumn width={2}>
                                                <Link href='/categories'>
                                                    <StyledNavText
                                                        fontSize='32px'
                                                        fontWeight='normal'
                                                    >
                                                        Categories
                                                    </StyledNavText>
                                                </Link>
                                            </GridColumn> */}
                                                    <GridColumn
                                                        style={{
                                                            paddingLeft: "30px",
                                                        }}
                                                    >
                                                        <Link href='/streamers'>
                                                            <StyledNavText
                                                                fontSize='32px'
                                                                fontWeight='normal'
                                                                style={{
                                                                    cursor:
                                                                        "pointer",
                                                                    textAlign:
                                                                        "left",
                                                                }}
                                                            >
                                                                Live Streams
                                                            </StyledNavText>
                                                        </Link>
                                                    </GridColumn>
                                                    <GridColumn>
                                                        <Link href='/mobile-apps'>
                                                            <StyledNavText
                                                                fontSize='32px'
                                                                fontWeight='normal'
                                                            >
                                                                Products
                                                            </StyledNavText>
                                                        </Link>
                                                    </GridColumn>
                                                    <GridColumn
                                                        style={{
                                                            paddingLeft: "30px",
                                                        }}
                                                    >
                                                        <Link href='/faq'>
                                                            <StyledNavText
                                                                fontSize='32px'
                                                                fontWeight='normal'
                                                            >
                                                                About
                                                            </StyledNavText>
                                                        </Link>
                                                    </GridColumn>
                                                </Grid>
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: "2px",
                                                        backgroundColor:
                                                            theme.colors.grey3,
                                                    }}
                                                ></div>
                                                <Grid
                                                    style={{
                                                        backgroundColor:
                                                            "transparent",
                                                        padding: "10px",
                                                    }}
                                                    gridColumns='38% 33% 29%'
                                                >
                                                    {/* <GridColumn>
                                                <Link href='/categories/animals'>
                                                    <StyledNavText>
                                                        Animals/Nature
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/anime'>
                                                    <StyledNavText>
                                                        Anime
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/celebrities'>
                                                    <StyledNavText>
                                                        Celebrities
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/comedians'>
                                                    <StyledNavText>
                                                        Comedians
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/emotions'>
                                                    <StyledNavText>
                                                        Emotions
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/encouragement'>
                                                    <StyledNavText>
                                                        Encouragement
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/farewells'>
                                                    <StyledNavText>
                                                        Farewells
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/gaming'>
                                                    <StyledNavText>
                                                        Gaming
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/Greetings'>
                                                    <StyledNavText>
                                                        Greetings
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/holidays'>
                                                    <StyledNavText>
                                                        Holidays
                                                    </StyledNavText>
                                                </Link>
                                            </GridColumn>
                                            <GridColumn>
                                                <Link href='/categories/movies'>
                                                    <StyledNavText>
                                                        Movies
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/music'>
                                                    <StyledNavText>
                                                        Music
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/pranks'>
                                                    <StyledNavText>
                                                        Pranks
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/politics'>
                                                    <StyledNavText>
                                                        Politics
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/questions'>
                                                    <StyledNavText>
                                                        Questions
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/reactions'>
                                                    <StyledNavText>
                                                        Reactions
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/sound-effects'>
                                                    <StyledNavText>
                                                        Sound Effects
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/sports'>
                                                    <StyledNavText>
                                                        Sports
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/television'>
                                                    <StyledNavText>
                                                        Television
                                                    </StyledNavText>
                                                </Link>
                                                <Link href='/categories/tiktok'>
                                                    <StyledNavText>
                                                        TikTok
                                                    </StyledNavText>
                                                </Link>
                                            </GridColumn> */}
                                                    <GridColumn
                                                        style={{
                                                            paddingLeft: "30px",
                                                        }}
                                                    >
                                                        <Link href='/streamers'>
                                                            <StyledNavText>
                                                                Top Streamers
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/twitch/streaming-guides'>
                                                            <StyledNavText>
                                                                Twitch Alerts
                                                                Guides
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/blerp-ambassadors'>
                                                            <StyledNavText>
                                                                Blerp Champions
                                                            </StyledNavText>
                                                        </Link>
                                                        {/* <Link href='/streams'>
                                                    <StyledNavText>
                                                        Live Now
                                                    </StyledNavText>
                                                </Link>
                                                 */}
                                                    </GridColumn>
                                                    <GridColumn>
                                                        <Link href='/twitch-extension'>
                                                            <StyledNavText>
                                                                Twitch App
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/twitch-walkon'>
                                                            <StyledNavText>
                                                                Twitch Walk On
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/mobile-apps'>
                                                            <StyledNavText>
                                                                Mobile Apps
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/discord-soundboard-bot'>
                                                            <StyledNavText>
                                                                Discord Bot
                                                            </StyledNavText>
                                                        </Link>
                                                    </GridColumn>
                                                    <GridColumn
                                                        style={{
                                                            paddingLeft: "30px",
                                                        }}
                                                    >
                                                        <Link href='/support'>
                                                            <StyledNavText>
                                                                Support
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/faq'>
                                                            <StyledNavText>
                                                                FAQ
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/blog'>
                                                            <StyledNavText>
                                                                Blog
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/legal'>
                                                            <StyledNavText>
                                                                Legal
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/about-us'>
                                                            <StyledNavText>
                                                                About Us
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/careers '>
                                                            <StyledNavText>
                                                                Jobs
                                                            </StyledNavText>
                                                        </Link>
                                                        <Link href='/emerging-media-scholarship'>
                                                            <StyledNavText>
                                                                Scholarship
                                                            </StyledNavText>
                                                        </Link>
                                                    </GridColumn>
                                                </Grid>
                                                <Row
                                                    style={{
                                                        height: "40px",
                                                        width: "100%",
                                                        margin: "0",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "flex-end",
                                                        borderRadius: "8px",
                                                        backgroundColor:
                                                            theme.colors.white,
                                                    }}
                                                >
                                                    <Text
                                                        fontSize='21px'
                                                        fontColor='grey5'
                                                        fontWeight='light'
                                                        style={{
                                                            margin: "0",
                                                            marginRight: "30px",
                                                        }}
                                                    >
                                                        &copy; <b>2020</b>{" "}
                                                        BLERP, Inc
                                                    </Text>
                                                </Row>
                                            </>
                                        )}
                                    </StyledModal>
                                    <ButtonMobileHiddenContainer>
                                        <Link
                                            prefetch={true}
                                            href={
                                                data.web &&
                                                data.web.userSignedIn
                                                    ? `/user/${data.web.userSignedIn._id}`
                                                    : "/login"
                                            }
                                        >
                                            <FeaturedButtonLink
                                                href={
                                                    data.web.userSignedIn
                                                        ? `/user/${data.web.userSignedIn._id}`
                                                        : "/login"
                                                }
                                                hoverColor='ibisRed'
                                                hoverUrl='https://storage.googleapis.com/blerp_products/Web/Account/My%20Blerps%20Selected.svg'
                                            >
                                                <Icon
                                                    size='big'
                                                    url='https://storage.googleapis.com/blerp_products/Web/Account/My%20Blerps%20Quite.svg'
                                                />
                                                <StyledNavText
                                                    style={{ margin: "0" }}
                                                >
                                                    {data.web.userSignedIn
                                                        ? "My Library"
                                                        : "Login"}
                                                </StyledNavText>
                                            </FeaturedButtonLink>
                                        </Link>
                                    </ButtonMobileHiddenContainer>

                                    <ButtonMobileHiddenContainer>
                                        <FeaturedButtonLink
                                            href='/upload'
                                            hoverColor='seafoam'
                                            hoverUrl='https://storage.googleapis.com/blerp_products/Web/Navbar/create%20on%20hover.svg'
                                        >
                                            <Icon
                                                size='big'
                                                url='https://storage.googleapis.com/blerp_products/Web/Navbar/black-lightbulb.svg'
                                            />
                                            <StyledNavText
                                                style={{
                                                    margin: "0",
                                                }}
                                            >
                                                Create
                                            </StyledNavText>
                                        </FeaturedButtonLink>
                                    </ButtonMobileHiddenContainer>

                                    {data.web.userSignedIn ? (
                                        <StyledModal
                                            right
                                            backgroundBlur
                                            style={{
                                                padding: "10px 0",
                                                top: "37px",
                                                width: "320px",
                                            }}
                                            trigger={
                                                <ProfileIcon
                                                    noHover
                                                    url={
                                                        data.web.userSignedIn
                                                            .profileImage
                                                            ? data.web
                                                                  .userSignedIn
                                                                  .profileImage
                                                                  .original.url
                                                            : "https://storage.googleapis.com/blerp_products/Web/Account/seafoam%20Account%20image.svg?folder=true&organizationId=true"
                                                    }
                                                />
                                            }
                                        >
                                            {({ handleCloseClick }) => (
                                                <>
                                                    <Row
                                                        style={{
                                                            margin: "0",
                                                            marginBottom:
                                                                "10px",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <a
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                            href={`/user/${data.web.userSignedIn._id}`}
                                                        >
                                                            <StyledNavProfileText
                                                                fontSize='22px'
                                                                fontColor='notBlack'
                                                                style={{
                                                                    margin:
                                                                        "5px",
                                                                }}
                                                            >
                                                                {
                                                                    data.web
                                                                        .userSignedIn
                                                                        .username
                                                                }
                                                            </StyledNavProfileText>
                                                        </a>
                                                    </Row>
                                                    {/* <Row style={{ margin: "0" }}>
                         <Icon
                         size='small'
                         url='https://storage.googleapis.com/blerp_products/Web/Account/My%20Boards%20Quite.svg'
                        />
                        <StyledNavProfileText
                        fontSize='16px'
                        fontColor='grey5'
                        >
                        {data.web.userSignedIn.totalPlays} Beets
                        </StyledNavProfileText>
                        </Row>
                        <Row style={{ margin: "0" }}>
                        <Icon
                        size='small'
                        url='https://storage.googleapis.com/blerp_products/Web/Menus/Black%20plus.svg'
                        />
                        <StyledNavProfileText
                        fontSize='16px'
                        fontColor='grey5'
                        >
                        Add Beets
                        </StyledNavProfileText>
                    </Row> */}
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                theme.colors
                                                                    .white,
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <Row
                                                            style={{
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Icon
                                                                size='small'
                                                                url='https://storage.googleapis.com/blerp_products/Web/Account/My%20Boards%20Quite.svg'
                                                            />
                                                            <StyledNavProfileText
                                                                fontSize='16px'
                                                                fontColor='grey5'
                                                            >
                                                                {
                                                                    data.web
                                                                        .userSignedIn
                                                                        .totalPlays
                                                                }{" "}
                                                                My Plays
                                                            </StyledNavProfileText>
                                                        </Row>
                                                        <Row
                                                            style={{
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Icon
                                                                size='medium'
                                                                url='https://storage.googleapis.com/blerp_products/Web/Menus/Library%20quiet.svg'
                                                            />
                                                            <StyledNavProfileText
                                                                fontSize='16px'
                                                                fontColor='grey5'
                                                            >
                                                                {
                                                                    data.web
                                                                        .userSignedIn
                                                                        .bitePlays
                                                                }{" "}
                                                                Blerp Plays
                                                            </StyledNavProfileText>
                                                        </Row>
                                                    </div>

                                                    <Row
                                                        style={{
                                                            justifyContent:
                                                                "center",
                                                            marginTop: "10px",
                                                        }}
                                                    >
                                                        <Link href='/logout'>
                                                            <Button buttonType='third'>
                                                                Logout
                                                            </Button>
                                                        </Link>
                                                    </Row>
                                                </>
                                            )}
                                        </StyledModal>
                                    ) : (
                                        <></>
                                    )}
                                </ButtonMobileHiddenContainer>
                            </ButtonContainer>
                        </NavContainer>
                        {/* <BottomNavContainer>
                        <SuperNav prefetch={true} navItems={this.props.navItems} />
                    </BottomNavContainer> */}
                    </Header>
                    <ToastNotification
                        appearance={appearance}
                        show={show}
                        content={content}
                    />

                    {/* {this.state.showMobileMenu && (
                    <MobileOverlayMenu
      onCloseMobileMenu={null}
      signedInUser={null}
      />
    )} */}
                </>
            );
        }
    else {
        return <></>;
    }
};

export default withData(NavBar);
