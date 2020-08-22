import * as React from "react";
import styled, { withTheme } from "styled-components";
import PinkButton from "../../components/buttons/pink-button";
import LoggedOutHeader from "./LoggedOutHeader";
import HomeHeader from "./HomeHeader";
import IntegrationRow from "./IntegrationRow";
import gql from "graphql-tag";

import { Query, Mutation } from "@apollo/client/react/components";
import LoadingFullScreen from "../../components/loading/loading-full-screen";
import PlaylistListContainer from "../../components/playlists/PlaylistListContainer";
import Footer from "../../components/navigation/footer";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.flyoutBackground};
    scroll-behavior: smooth;
`;

const ColumnContainer = styled.div`
    width: 100%;
    background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : "transparent"};
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    position: relative;
    align-items: center;
    justify-content: center;
    min-height: 600px;
`;

const ColumnContainerStart = styled.div`
    width: 100%;
    background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : "transparent"};
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    min-height: 600px;

    @media (max-width: 600px) {
        min-height: 300px;
    }
`;

const BolderText = styled.div`
    font-size: 60px;
    color: ${props => props.color};
    text-align: center;
    margin: 32px;
    width: 80%;
    font-weight: 600;
    z-index: 10;
    max-width: 800px;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const BolderTextInline = styled.div`
    font-size: 60px;
    color: ${props => props.color};
    text-align: center;
    font-weight: 400;
    z-index: 10;
    display: inline;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const BolderTextLarge = styled.div`
    font-size: 60px;
    color: ${props => props.color};
    text-align: center;
    margin: 32px;
    width: 80%;
    font-weight: normal;
    z-index: 10;
    max-width: 600px;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const BolderTextWidth = styled.h3`
    font-size: 60px;
    color: ${props => props.color};
    text-align: center;
    margin: 8px;
    font-weight: 400;
    z-index: 10;
    max-width: 1000px;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const BolderTextWidthInline = styled.p`
    font-size: 60px;
    color: ${props => props.color};
    text-align: center;
    margin: 8px;
    font-weight: 600;
    z-index: 10;
    display: inline;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const BolderLightNoMargin = styled.div`
    font-size: 60px;
    color: ${props => props.color};
    text-align: center;
    margin: 8px;
    width: 80%;
    font-weight: 400;
    z-index: 10;
    max-width: 800px;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const BolderNoMargin = styled.div`
    font-size: 60px;
    color: ${props => props.color};
    text-align: center;
    margin: 8px;
    width: 80%;
    font-weight: 600;
    z-index: 10;
    max-width: 800px;

    @media (max-width: 600px) {
        font-size: 40px;
    }
`;

const HugeTextContainerBackground = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    min-height: 600px;
    background-color: ${props => props.theme.defaultBackground};
`;
// background-image: url("https://storage.googleapis.com/blerp_products/Web/product_page/red%20blerp%20texture.png");

const HugeTextContainerBackgroundPurple = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 600px;
    position: relative;
    background-color: ${props => props.theme.defaultBackground};
`;

// background-image: url("https://storage.googleapis.com/blerp_products/Web/product_page/purple%20blerp%20texture.svg");

const HugeTextContainerBackgroundGradient = styled.div`
    width: 100%;
    height: 100%;
    min-height: 600px;
    background-image: linear-gradient(
        transparent,
        ${props => props.theme.flyoutBackground}
    );
    opacity: 0.7;
    position: absolute;
    top: 0px;
    left: 0px;
`;

const BetterPinkButton = styled(PinkButton)`
    font-weight: bolder;
    margin: 20px;
`;

const OFFLINE_QUERY = gql`
    query webSiteLoggedOutPlaylists {
        web {
            playlistRandomMany(limit: 3, audienceRating: [G, PG]) {
                _id
                title
                image {
                    original {
                        url
                    }
                }
                followed
                giphy {
                    gif
                }
                bitesPagination(page: 0, perPage: 8) {
                    items {
                        _id
                        title
                        keywords
                        color
                        image {
                            original {
                                url
                            }
                        }
                        giphy {
                            gif
                        }
                        favorited
                        playCount
                        audienceRating
                        audio {
                            original {
                                url
                            }
                            mp3 {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`;

const ContainPlaylists = styled.div`
    width: 100%;
`;

const ArrowIcon = styled.img`
    width: 32px;
    height: 32px;
    transform: translateY(-200px);

    @media (max-width: 600px) {
        display: none;
    }
`;

const ShareIconsDiscover = styled.img`
    width: 48px;
    height: 48px;
    margin: 0 8px;
`;

const ShareIconsCreate = styled.img`
    width: 40px;
    height: 40px;
    margin: 0 8px;
`;

const ShareIconsCreateLarge = styled.img`
    width: 60px;
    height: 60px;
    margin: 0 8px;
`;

const CreationImage = styled.img`
    width: 50%;
    margin: 20px;

    @media (max-width: 600px) {
        margin: 0;
        width: 90%;
    }
`;

const CreationImage2 = styled.img`
    width: 50%;
    margin: 40px;
`;

class LoggedOutHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasScrolled: false,
        };
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll, { passive: true });
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = event => {
        // do something like call `this.setState`
        // access window.scrollY etc
        this.setState({ hasScrolled: true });

        if (this.state.hasScrolled) {
            window.removeEventListener("scroll", this.handleScroll);
        }
    };

    renderPlaylistRow(playlist, index) {
        const isDarker = index % 2 === 0;
        return (
            <PlaylistListContainer
                key={playlist._id}
                isDarker={false}
                playlist={playlist}
            />
        );
    }

    render() {
        return (
            <PageContainer>
                <LoggedOutHeader />

                <ArrowIcon
                    src={
                        "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Down.svg"
                    }
                    alt='Arrow Down'
                />

                {this.state.hasScrolled && (
                    <Query
                        errorPolicy={"all"}
                        ssr={false}
                        query={OFFLINE_QUERY}
                    >
                        {props => {
                            if (
                                props.networkStatus === 1 ||
                                props.networkStatus === 2
                            ) {
                                return (
                                    <LoadingFullScreen id='discover_blerp_container' />
                                );
                            }
                            if (!props.data) {
                                return (
                                    <div id='discover_blerp_container'> hi</div>
                                );
                            }

                            return (
                                <ContainPlaylists id='discover_blerp_container'>
                                    {props.data.web &&
                                        props.data.web.playlistRandomMany &&
                                        props.data.web.playlistRandomMany.map(
                                            (list, index) =>
                                                this.renderPlaylistRow(
                                                    list,
                                                    index,
                                                ),
                                        )}
                                </ContainPlaylists>
                            );
                        }}
                    </Query>
                )}

                <IntegrationRow hasScrolled={this.state.hasScrolled} />

                <ColumnContainer
                    backgroundColor={this.props.theme.flyoutBackground}
                >
                    <BolderTextLarge color={this.props.theme.starling}>
                        <ShareIconsDiscover
                            src='https://storage.googleapis.com/blerp_products/search.svg'
                            alt='Search sound memes and sound effects'
                        />
                        Search our audio database of meme soundboards
                    </BolderTextLarge>
                    <BetterPinkButton
                        onClick={() => {
                            document
                                .getElementById("blerp_new_search_bar")
                                .focus();
                        }}
                    >
                        Search Now
                    </BetterPinkButton>
                </ColumnContainer>

                {this.state.hasScrolled && (
                    <HugeTextContainerBackgroundPurple id='blerp_home_create'>
                        <ColumnContainer backgroundColor={"transparent"}>
                            <BolderLightNoMargin
                                color={this.props.theme.bodyText}
                            >
                                Can't find the sound clip you are looking for?
                            </BolderLightNoMargin>
                            <BolderNoMargin color={this.props.theme.seafoam}>
                                <ShareIconsCreateLarge
                                    src='https://storage.googleapis.com/blerp_products/create%20bulb.svg'
                                    alt='Create the best sound effects'
                                />
                                <b>Create</b> the best soundbite!
                            </BolderNoMargin>
                            <BetterPinkButton
                                onClick={() =>
                                    window.open(
                                        "https://blerp.com/upload",
                                        "_blank",
                                    )
                                }
                            >
                                Create now
                            </BetterPinkButton>
                            <HugeTextContainerBackgroundGradient />
                        </ColumnContainer>
                    </HugeTextContainerBackgroundPurple>
                )}

                {this.state.hasScrolled && (
                    <ColumnContainerStart
                        backgroundColor={this.props.theme.flyoutBackground}
                    >
                        <CreationImage
                            alt='Blerps sounds can be created from vimeo videos, youtube videos, facebook videos, twitch videos'
                            src='https://storage.googleapis.com/blerp_products/Web/Home/creation_blerp.svg'
                        />
                    </ColumnContainerStart>
                )}

                <ColumnContainer
                    backgroundColor={this.props.theme.flyoutBackground}
                >
                    <BolderTextWidth color={this.props.theme.bodyText}>
                        <BolderTextWidthInline color={this.props.theme.seafoam}>
                            Organize
                        </BolderTextWidthInline>{" "}
                        millions of{" "}
                        <BolderTextWidthInline color={this.props.theme.seafoam}>
                            Blerp Sound Effects
                        </BolderTextWidthInline>{" "}
                        with{" "}
                        <BolderTextWidthInline color={this.props.theme.seafoam}>
                            custom soundboards
                        </BolderTextWidthInline>
                    </BolderTextWidth>
                    {this.state.hasScrolled && (
                        <CreationImage2
                            alt='Organized sound blerps into soundboards'
                            src='https://storage.googleapis.com/blerp_products/Web/Home/best-shia-image.svg'
                        />
                    )}
                    <BetterPinkButton
                        onClick={() =>
                            window.open("https://blerp.com/upload", "_blank")
                        }
                    >
                        Create now
                    </BetterPinkButton>
                </ColumnContainer>

                <HugeTextContainerBackground id='blerp_home_share'>
                    <ColumnContainer backgroundColor={"transparent"}>
                        <BolderText color={this.props.theme.pandaPink}>
                            <ShareIconsCreate
                                src='https://storage.googleapis.com/blerp_products/share.svg'
                                alt='Share perfect sounds effect memes organized into soundboards'
                            />
                            Share
                            <BolderTextInline color={this.props.theme.bodyText}>
                                {" "}
                                the
                            </BolderTextInline>{" "}
                            perfect sound meme moment{" "}
                            <BolderTextInline color={this.props.theme.bodyText}>
                                on your
                            </BolderTextInline>{" "}
                            favorite socials
                        </BolderText>
                        <BetterPinkButton
                            onClick={() =>
                                window.open(
                                    "https://blerp.com/soundboard-products",
                                    "_blank",
                                )
                            }
                        >
                            Explore products
                        </BetterPinkButton>
                    </ColumnContainer>
                </HugeTextContainerBackground>

                <HomeHeader isLight={true} showSearchButton={true} />
                <Footer />
            </PageContainer>
        );
    }
}

export default withTheme(LoggedOutHome);
