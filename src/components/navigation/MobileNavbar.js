import React, { useEffect, useContext } from "react";
import styled, { ThemeProvider, ThemeContext } from "styled-components";
import MobileOverlayMenu from "./MobileOverlayMenu";
import NewSearchBar from "./new-searchbar";
import Modal from "../theme/Modal";
import { Icon } from "../theme/Icon";
import { GridColumn, Grid } from "../theme/Grid";
import Text from "../theme/Text";
import { Row } from "../shared/ProfileTabViews/ProfileStyledComponents";
import Link from "next/link";
import { Button, GenericModal } from "../theme/Theme";
import ToastNotification from "../theme/ToastNotification";
import { ToastContext, ToastProvider } from "../theme/ToastProvider";
import {
    ButtonContainer,
    ButtonMobileHiddenContainer,
    SecondaryFeaturedButtonLink,
    TinyIcon,
    MobileFeaturedButtonLink,
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

StyledNavText.defaultProps = {
    style: { cursor: "pointer", whiteSpace: "nowrap" },
    fontColor: "notBlack",
    fontColorHover: "ibisRed",
    fontSize: "20px",
    fontWeight: "light",
};

const MobileModal = styled(StyledModal)`
    width: 95vw;
    height: 100%;
    overflow-y: scroll;
    position: fixed;
    left: 50%;
    top: -20px;
    flex-direction: column;
    justify-content: flex-start;
`;

const MobileNavbar = props => {
    const theme = useContext(ThemeContext);
    const { show, appearance, mobile, content } = useContext(ToastContext);
    const { data } = props;
    return (
        <>
            <Header role='navigation' onMouseLeave={null}>
                <Row style={{ width: "90%", marginTop: "10px" }}>
                    <Link prefetch={true} href='/'>
                        <Icon
                            style={{
                                width: "100px",
                                height: "30px",
                                backgroundSize: "contain",
                                borderRadius: "0",
                            }}
                            url='https://storage.googleapis.com/blerp_products/Web/Misc/blerp_logo_transparent.svg'
                        />
                    </Link>
                    <MobileModal
                        data-cy='navbar-mobile-menu'
                        fullscreen
                        backgroundColor='white'
                        width='1200px'
                        style={{
                            paddingBottom: "0",
                        }}
                        trigger={
                            <Icon
                                data-cy='navbar-mobile-trigger'
                                size='big'
                                url='https://storage.googleapis.com/blerp_products/Web/Navbar/Menu%202%20line.svg'
                            />
                        }
                    >
                        {({ handleCloseClick }) => (
                            <>
                                <Row
                                    style={{
                                        flexDirection: "column",
                                        alignContent: "center",
                                        width: "95%",
                                    }}
                                >
                                    {data.web.userSignedIn ? (
                                        <Modal
                                            fullscreen
                                            centerTop
                                            backgroundBlur
                                            width='320px'
                                            style={{ padding: "10px 0" }}
                                            trigger={
                                                <ProfileIcon
                                                    style={{
                                                        width: "60px",
                                                        height: "60px",
                                                        margin: "0 auto",
                                                    }}
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
                                            <Row
                                                style={{
                                                    margin: "0",
                                                    marginBottom: "10px",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <StyledNavProfileText
                                                    fontSize='22px'
                                                    fontColor='notBlack'
                                                    style={{
                                                        margin: "5px",
                                                    }}
                                                >
                                                    {
                                                        data.web.userSignedIn
                                                            .username
                                                    }
                                                </StyledNavProfileText>
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
                                                        theme.colors.white,
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
                                                    justifyContent: "center",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                <Link href='/logout'>
                                                    <Button buttonType='third'>
                                                        Logout
                                                    </Button>
                                                </Link>
                                            </Row>
                                        </Modal>
                                    ) : (
                                        <></>
                                    )}
                                    <MobileFeaturedButtonLink
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
                                            fontSize='24px'
                                            fontColor='notBlack'
                                        >
                                            {data.web.userSignedIn
                                                ? "My Library"
                                                : "Login"}
                                        </StyledNavText>
                                    </MobileFeaturedButtonLink>
                                    <Icon
                                        data-cy='navbar-mobile-close'
                                        style={{
                                            position: "absolute",
                                            top: "15px",
                                            right: "20px",
                                        }}
                                        onClick={() => handleCloseClick()}
                                        url='https://storage.googleapis.com/blerp_products/Web/Menus/x%20close.svg'
                                    />
                                    <MobileFeaturedButtonLink
                                        href='/upload'
                                        hoverColor='seafoam'
                                        hoverUrl='https://storage.googleapis.com/blerp_products/Web/Navbar/create%20on%20hover.svg'
                                    >
                                        <Icon
                                            size='big'
                                            url='https://storage.googleapis.com/blerp_products/Web/Navbar/black-lightbulb.svg'
                                        />
                                        <StyledNavText fontSize='24px'>
                                            Create
                                        </StyledNavText>
                                    </MobileFeaturedButtonLink>
                                </Row>

                                {/* <Row>
                                    <Link href='/categories'>
                                        <StyledNavText
                                            fontSize='24px'
                                            fontWeight='normal'
                                        >
                                            Categories
                                        </StyledNavText>
                                    </Link>
                                </Row> */}

                                {/* <Row style={{ margin: "10px auto" }}>
                                    <Row style={{ flexDirection: "column" }}>
                                        <Link href='/categories/animals'>
                                            <StyledNavText>
                                                Animals/Nature
                                            </StyledNavText>
                                        </Link>
                                        <Link href='/categories/anime'>
                                            <StyledNavText>Anime</StyledNavText>
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
                                    </Row>

                                    <Row style={{ flexDirection: "column" }}>
                                        <Link href='/categories/movies'>
                                            <StyledNavText>
                                                Movies
                                            </StyledNavText>
                                        </Link>
                                        <Link href='/categories/music'>
                                            <StyledNavText>Music</StyledNavText>
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
                                    </Row>
                                </Row> */}

                                <Row>
                                    <Link href='/streams'>
                                        <StyledNavText
                                            fontSize='24px'
                                            fontWeight='normal'
                                        >
                                            Live Streams
                                        </StyledNavText>
                                    </Link>
                                </Row>

                                <Row style={{ flexDirection: "column" }}>
                                    <Link href='/streamers'>
                                        <StyledNavText>
                                            Top Streamers
                                        </StyledNavText>
                                    </Link>
                                    <Link href='/streamers'>
                                        <StyledNavText>Live Now</StyledNavText>
                                    </Link>
                                    <Link href='/twitch/streaming-guides'>
                                        <StyledNavText>
                                            Twitch Alerts Guides
                                        </StyledNavText>
                                    </Link>
                                    <Link href='/blerp-ambassadors'>
                                        <StyledNavText>
                                            Blerp Champions
                                        </StyledNavText>
                                    </Link>
                                    {/* <Link href='/streams'>
                                        <StyledNavText>
                                            Blerp Champions
                                        </StyledNavText>
                                    </Link> */}
                                </Row>

                                <Row>
                                    <Link href='/mobile-apps'>
                                        <StyledNavText
                                            fontSize='24px'
                                            fontWeight='normal'
                                        >
                                            Products
                                        </StyledNavText>
                                    </Link>
                                </Row>

                                <Row style={{ flexDirection: "column" }}>
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
                                    <Link href='/apps'>
                                        <StyledNavText>
                                            Mobile Apps
                                        </StyledNavText>
                                    </Link>
                                    <Link href='/discord-soundboard-bot'>
                                        <StyledNavText>
                                            Discord Bot
                                        </StyledNavText>
                                    </Link>
                                </Row>

                                <Row>
                                    <Link href='/faq'>
                                        <StyledNavText
                                            fontSize='24px'
                                            fontWeight='normal'
                                        >
                                            About
                                        </StyledNavText>
                                    </Link>
                                </Row>

                                <Row style={{ flexDirection: "column" }}>
                                    <Link href='/support'>
                                        <StyledNavText>Support</StyledNavText>
                                    </Link>
                                    <Link href='/faq'>
                                        <StyledNavText>FAQ</StyledNavText>
                                    </Link>
                                    <Link href='/blog'>
                                        <StyledNavText>Blog</StyledNavText>
                                    </Link>
                                    <Link href='/legal'>
                                        <StyledNavText>Legal</StyledNavText>
                                    </Link>
                                    <Link href='/about-us'>
                                        <StyledNavText>About Us</StyledNavText>
                                    </Link>
                                    <Link href='/careers '>
                                        <StyledNavText>Jobs</StyledNavText>
                                    </Link>
                                    <Link href='/emerging-media-scholarship'>
                                        <StyledNavText>
                                            Scholarship
                                        </StyledNavText>
                                    </Link>
                                </Row>

                                <Row style={{ justifyContent: "flex-end" }}>
                                    <Text
                                        fontSize='21px'
                                        fontColor='grey5'
                                        fontWeight='light'
                                        style={{
                                            margin: "0",
                                            height: "100%",
                                            padding: "20px 0 32px",
                                        }}
                                    >
                                        &copy; <b>2020</b> BLERP, Inc
                                    </Text>
                                </Row>
                            </>
                        )}
                    </MobileModal>
                </Row>
                <Row
                    style={{
                        justifyContent: "center",
                        width: "95%",
                    }}
                >
                    <NewSearchBar mobile initialSearchQuery={null} />
                </Row>
            </Header>
            <ToastNotification
                appearance={appearance}
                show={show}
                content={content}
                mobile
            />
        </>
    );
};

export default MobileNavbar;
