/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import Observer from "@researchgate/react-intersection-observer";
import Link from "next/link";
import * as React from "react";
import styled, { keyframes } from "styled-components";

import AudioButton, { ButtonModes } from "../buttons/data/wrapped-audio-button";
import { PlaceholderImage } from "./placeholder-image";
import BiteMenu from "../shared/BiteMenu";
import DeleteBiteButton from "../buttons/delete-bite-button";

import FavoriteCornerButton from "../shared/FavoriteCornerButton";

import {
    flyoutBackground,
    bodyText,
    pandaPink,
    iconsInActive,
    defaultBackground,
} from "../../styles/colors";
import { Icon } from "../theme/Icon";
import { GenericModal } from "../theme/Theme";
import BiteOptionsModal from "../shared/BiteMenu/BiteOptionsModal";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }`;

const bounceOut = keyframes`
  0% {
    opacity: 0;
    width: 30px;
    height: 30px;
  }

  25% {
    width: 64px;
    height: 64px;
  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 1;
    width: 52px;
    height: 52px;
  }
`;

const bounceOutSmall = keyframes`
  0% {
    opacity: 0;
    width: 36px;
    height: 36px;
  }

  25% {
    width: 44px;
    height: 44px;
  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 1;
    width: 40px;
    height: 40px;
  }
`;

const ContentContainer = styled.div`
    margin: 8px;
    width: 140px;
    height: 218px;
    position: relative;
    /* border-radius: 100px; */
    animation: ${fadeIn} 0.4s 1;
    cursor: pointer;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    /* @media (max-width: 600px) {
    width: 140px;
    height: 218px;
  } */
`;

const BlerpContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 140px;
    height: 140px;
    border-radius: 100px;
    cursor: pointer;
`;

const animateIn = keyframes`
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
`;

const BackgroundImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 140px;
    height: 140px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 100px;
    animation: ${animateIn} 0.9s 1;
`;

const StyledAudioButton = styled(AudioButton)`
    overflow: visible;
    background-color: transparent;
    width: 140px;
    height: 140px;
    border-radius: 420px;
    border: none;
    position: absolute;
    z-index: 1000;

    &:focus {
        opacity: 1;
        border: none !important;
    }

    &:focus ~ .blerp-bite-title {
        opacity: 0.2;
        transition: all 0.2s ease 0s;
    }

    .blerp-bite-scrim &:focus {
        border: 4px solid rgba(255, 120, 91, 1) !important;
        box-shadow: inset 0 0 70px 1em rgba(255, 120, 91, 1) !important;
        transition: all 0.3s ease 0s;
    }
`;

const MenuButton = styled(BiteMenu)`
    position: absolute;
    transform: translate(98px, 98px) scale(1);
    overflow: hidden;
    border: 4px solid ${flyoutBackground} !important;
    background-color: ${props => props.theme.grey3};
    border-radius: 100px;
    width: 40px;
    height: 40px;
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;
    background-position: center;
    z-index: 1001;

    &:focus {
        border: 4px solid ${flyoutBackground} !important;
        background-color: ${props => props.theme.ibisRed};
        border-radius: 100px;
        opacity: 1;
        animation: ${bounceOutSmall} 0.2s 1;
    }

    &:active {
        opacity: 1;
        transform: translate(98px, 98px) scale(0.9);
        animation: ${bounceOutSmall} 0.2s 1;
        background-color: ${props => props.theme.ibisRed};
    }

    &:hover {
        opacity: 0.8;
        background-color: ${props => props.theme.ibisRed};
        animation: ${bounceOutSmall} 0.2s 1;
    }

    @media (max-width: 600px) {
        opacity: 1;
        width: 40px;
        height: 40px;
        padding: 0;
    }

    & img {
        outline: 0;
        height: 100%;
        width: 100%;

        @media (max-width: 600px) {
            height: 16px;
            width: 16px;
        }
    }
`;

const StyledFavoriteButton = styled(FavoriteCornerButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    transform: translate(0px, 0px) scale(1);
    overflow: hidden;
    border-radius: 100px;
    background-position: center;
    z-index: 1001;
    opacity: ${props => (props.favorited ? 1 : 0)};
    padding: 0px;

    &:focus {
        border: 4px solid
            ${props =>
                props.isFeaturedBite
                    ? flyoutBackground
                    : defaultBackground} !important;
        border-radius: 100px;
        opacity: 1;
    }

    &:active {
        opacity: 1;
        background-color: ${props =>
            props.isFeaturedBite ? iconsInActive : pandaPink};
    }

    &:hover {
        opacity: 1;
    }

    @media (max-width: 600px) {
        opacity: 1;
        width: 40px;
        height: 40px;
    }
`;

const StyledDeleteButton = styled(DeleteBiteButton)`
    position: absolute;
    transform: translate(97px, 0) scale(1);
    overflow: hidden;
    border: 4px solid ${flyoutBackground};
    background-color: ${bodyText};
    border-radius: 100px;
    width: 40px;
    height: 40px;
    background-position: center;
    transition: ease-in-out;
    transition: background 1.2s;
    background-position: center;
    z-index: 1001;
    opacity: 1;

    &:focus {
        border: 4px solid ${flyoutBackground} !important;
        border-radius: 100px;
        width: 40px;
        height: 40px;
        opacity: 1;
    }

    &:active {
        opacity: 1;
        transform: translate(97px, 0) scale(0.9);
        background-color: ${iconsInActive};
    }

    @media (max-width: 600px) {
        transform: translate(97px, 0);
        opacity: 1;
        width: 40px;
        height: 40px;
        padding: 0;
    }

    & img {
        outline: 0;
        height: 100%;
        width: 100%;

        @media (max-width: 600px) {
            height: 16px;
            width: 16px;
        }
    }
`;

// const PlayCountText = styled.div`
//   color: ${flyoutBackground};
//   position: absolute;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transform: translate(8px, 157px);
//   overflow: hidden;
//   width: 140px;
//   height: 40px;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   border: none;
//   z-index: 1001;
//   text-decoration: none;
//   opacity: 0.8;
//   font-size: 12px;
//   z-index: 10000000;
//   text-align: left;
//   justify-content: start;
//   transform: translate(12px, 157px);
//   font-size: 16px;
//
//   @media (max-width: 600px) {
//     transform: translate(4px, 90px);
//     width: 32px;
//     height: 32px;
//     font-size: 8px;
//   }
// `;

const Scrim = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    border: 2px transparent rgba(255, 120, 91, 1) !important;
    background-color: ${props =>
        props.darker ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0)"};
    box-shadow: inset 0 0 70px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    width: 140px;
    height: 140px;
    border-radius: 100px;
    transition: all 0.2s ease 0s;
    animation: ${animateIn} 0.9s 1;

    &:hover .blerp-audio-button {
        opacity: 1;
        transform: scale(1.2);
        transition: all 0.2s ease 0s;
    }

    &:hover .bite-play-icons {
        background-image: url("https://storage.googleapis.com/blerp_products/Web/Blerps/play%20on%20click.svg");
    }

    &:hover .blerp-stop-button {
        opacity: 1;
        transition: opacity 0.2s 0s;
    }

    &:hover .blerp-fav-menu-more {
        opacity: 1;
        transition: all 0.2s ease 0s;
        animation: ${bounceOutSmall} 0.2s 1;
    }

    &:hover .blerp-bite-menu-more {
        opacity: 1;
        transition: all 0.2s ease 0s;
        animation: ${bounceOutSmall} 0.2s 1;
    }

    &:hover .blerp-bite-open {
        opacity: 0.6;
        transition: all 0.2s ease 0s;
    }

    &:focus .blerp-bite-open {
        opacity: 0.6;
        transition: all 0.2s ease 0s;
    }

    &:hover .blerp-bite-title {
        opacity: 0.2;
        transition: all 0.2s ease 0s;
    }

    &:focus .blerp-audio-button {
        opacity: 1;
        transition: all 0.2s ease 0s;
    }

    &:focus .blerp-bite-title {
        opacity: 0.2;
        transition: all 0.2s ease 0s;
    }

    &:hover {
        background-color: ${props => `${props.theme.notBlack}99`};
        /* box-shadow: inset 0 0 70px 1em rgba(255, 120, 91, 0.8) !important; */
        transition: all 0.3s ease 0s;
    }
`;

const BiteTitleContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    z-index: 1000;
    position: absolute;
    bottom: 0;
    width: 168px;
    height: 60px;

    @media (max-width: 600px) {
        font-size: 12px;
        width: 112px;
        height: 60px;
    }
`;

const TitleSection = styled.a`
    width: 140px;
    font-size: 17px;
    font-weight: 300;
    text-align: left;
    color: ${props => (props.night ? flyoutBackground : bodyText)};
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 5px;
    display: -webkit-box;
    line-height: 18px;
    max-height: 60px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-decoration: none;

    &:hover {
        opacity: 0.4;
    }

    @media (max-width: 600px) {
        font-size: 16px;
        width: 100%;
        padding-left: 3px;
        /* height: 60px; */
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

// interface Props {
//   color?: string;
//   id: string;
//   title: string;
//   image?: string;
//   playCount?: any;
//   audioSourceUrls: string[];
//   spamBlerp?: boolean;
//   favorited?: boolean;
//   favoriteCallback?: any;
//   featuredPage?: string;
//   night?: boolean;
//   isFeaturedBite?: boolean;
//   prefetchLink?: boolean;
//   preload?: boolean;
//   isEditable?: boolean;
//   playlistId?: string;
//   onDeleteFromPlaylist?: any;
// }

// interface State {
//   color: string;
//   observed: boolean;
//   favorited: boolean;
//   playCount: any;
// }

class Bite extends React.Component {
    static defaultProps = {
        image: "",
        featuredPage: "",
        night: false,
        isFeaturedBite: false,
        prefetchLink: true,
        preload: false,
    };

    state = {
        color: "white",
        observed: false,
        biteDeleted: false,
    };

    playCallback = () => {
        this.setState({
            playCount: this.state.playCount + 1,
        });
    };

    favoriteCallback = favorited => {
        this.setState({ favorited });
        if (this.props.favoriteCallback) {
            this.props.favoriteCallback(this.props.id, favorited);
        }
    };

    hideErrorImage = i => {
        i.target.style.display = "none";
    };

    render() {
        if (this.state.biteDeleted) {
            return <></>;
        }

        return (
            <Observer onChange={this.handleIntersection}>
                <ContentContainer
                    style={{
                        backgroundColor: "transparent",
                    }}
                    role='listitem'
                    title={this.props.title}
                >
                    <BlerpContainer
                        style={{
                            backgroundColor: this.state.color,
                        }}
                    />
                    {this.props.image && this.state.observed && (
                        <BackgroundImage
                            src={this.props.image}
                            alt={this.props.title}
                            onError={this.hideErrorImage}
                        />
                    )}
                    {this.state.observed ? (
                        <Scrim
                            className='blerp-bite-scrim'
                            darker={Boolean(this.props.image)}
                        >
                            {/* <PlayCountText>{`${this.state.playCount}`}</PlayCountText> */}
                            <StyledAudioButton
                                title={this.props.title}
                                biteId={this.props.id}
                                sources={this.props.audioSourceUrls}
                                preload={this.props.preload}
                                showButton={false}
                                handleIncrementPlayCount={this.playCallback}
                                mode={
                                    this.props.spamBlerp
                                        ? ButtonModes.spam
                                        : ButtonModes.play
                                }
                                useGlobalAudio={true}
                                playlistId={this.props.playlistId}
                                featuredPage={this.props.featuredPage}
                                bite={this.props.bite}
                            />
                            <StyledFavoriteButton
                                query={this.props.query}
                                biteId={this.props.id}
                                className='blerp-fav-menu-more'
                                loggedIn={true}
                                favorited={this.state.favorited}
                                favoriteCallback={this.favoriteCallback}
                            />
                            {this.props.blacklisted ? (
                                <></>
                            ) : (
                                <GenericModal
                                    dontRender
                                    fullscreen
                                    centerVertically
                                    blur
                                    trigger={
                                        <MenuButton
                                            biteId={this.props.id}
                                            biteTitle={this.props.title}
                                            biteAudioUrl={
                                                this.props.audioSourceUrls[0]
                                            }
                                            className='blerp-bite-menu-more'
                                            favorited={this.state.favorited}
                                            favoriteCallback={
                                                this.favoriteCallback
                                            }
                                            isFeaturedBite={
                                                this.props.isFeaturedBite
                                            }
                                        />
                                    }
                                >
                                    {({ handleCloseClicked }) => (
                                        <BiteOptionsModal
                                            biteId={this.props.id}
                                            userSignedIn={
                                                this.props.userSignedIn
                                            }
                                            bite={this.props.bite}
                                        />
                                    )}
                                </GenericModal>
                            )}
                            {this.props.isEditable && this.props.playlistId && (
                                <StyledDeleteButton
                                    playlistId={this.props.playlistId}
                                    biteId={this.props.id}
                                    onDeleteFromPlaylist={({
                                        deleted,
                                        index,
                                    }) => {
                                        if (this.props.onDeleteFromPlaylist) {
                                            this.props.onDeleteFromPlaylist({
                                                deleted,
                                                index,
                                            });
                                        }
                                        this.setState({ biteDeleted: true });
                                    }}
                                />
                            )}
                        </Scrim>
                    ) : (
                        <PlaceholderImage backgroundColor={this.state.color} />
                    )}
                    {/* this.props.prefetchLink */}
                    <BiteTitleContainer>
                        <Link
                            prefetch={true}
                            href={{
                                pathname: "/bite",
                                query: { id: this.props.id },
                            }}
                            as={`/soundbites/${this.props.id}`}
                        >
                            <TitleSection
                                className='blerp-bite-title'
                                night={this.props.night}
                                href={`/soundbites/${this.props.id}`}
                            >
                                {this.props.title}
                            </TitleSection>
                        </Link>
                    </BiteTitleContainer>
                </ContentContainer>
            </Observer>
        );
    }

    handleIntersection = event => {
        this.setState({ observed: event.isIntersecting });
    };
}

export default Bite;
