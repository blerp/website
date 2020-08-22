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

import OpenMenuIcon from "../icons/open-menu-icon";

import AddWhiteCircleButton from "../shared/AddWhiteCircleButton";
import BiteMenu from "../shared/BiteMenu";
import DeleteBiteFromBoard from "../shared/DeleteBiteFromBoard";
import KeycodeButton from "../shared/KeycodeButton";

import { logEvent } from "../../lib/analytics";

import { randomBlerpColor } from "../../lib/helperFunctions";

import Container from "../shared/ContentContainer/zoom-in";

const BackgroundImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: 1;
    border-radius: 6px;

    @media (max-width: 600px) {
        width: 120px;
        height: 120px;
    }
`;

const StyledAudioButton = styled(AudioButton)`
    overflow: hidden;
    background-color: transparent;
    width: 200px;
    height: 200px;
    border-radius: 6px;
    border: none;
    position: absolute;
    z-index: 1000;

    @media (max-width: 600px) {
        width: 120px;
        height: 120px;
    }

    &:focus {
        opacity: 1;
    }

    &:focus ~ .blerp-bite-title {
        opacity: 0.2;
        transition: all 0.2s ease 0s;
    }

    &:hover ~ .blerp-bite-open {
        opacity: 0.2;
        transition: all 0.2s ease 0s;
    }

    .blerp-bite.scrim &:focus {
        box-shadow: inset 0 0 70px 1em rgba(0, 0, 0, 1);
        transition: all 0.3s ease 0s;
    }
`;

const MenuButton = styled(BiteMenu)`
    position: absolute;
    transform: translate(157px, 0);
    overflow: hidden;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    background-position: center;
    z-index: 1001;
    opacity: 0;

    @media (max-width: 600px) {
        transform: translate(90px, 4px);
        width: 32px;
        height: 32px;
    }

    & img {
        height: 80%;
        width: 80%;
    }

    &:hover img {
        opacity: 1;
    }
`;

const StyledKeycodeButton = styled(KeycodeButton)`
    position: absolute;
    transform: translate(8px, 140px);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    z-index: 1010;
    opacity: 0.8;

    @media (max-width: 600px) {
        visibility: hidden;
    }

    &:hover img {
        opacity: 0.5;
    }
`;

const Scrim = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${props =>
        props.darker ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)"};
    box-shadow: inset 0 0 70px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 200px;
    z-index: 2;
    border-radius: 6px;
    transition: all 0.2s ease 0s;

    @media (max-width: 600px) {
        width: 120px;
        height: 120px;
    }

    &:hover .blerp-audio-button {
        opacity: 1;
        transition: all 0.2s ease 0s;
    }

    &:hover .blerp-bite-menu-more {
        opacity: 0.9;
        transition: all 0.2s ease 0s;
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

    &:hover {
        box-shadow: inset 0 0 70px 1em rgba(0, 0, 0, 1);
        transition: all 0.3s ease 0s;
    }
`;

const TitleSection = styled.span`
    flex-direction: row;
    position: absolute;
    width: 120px;
    left: 10px;
    top: 8px;
    height: 100px;
    font-size: 16px;
    font-weight: normal;
    text-align: left;
    color: rgba(255, 255, 255, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    display: box;
    line-height: 20px;
    max-height: 100px;
    -webkit-line-clamp: 4;

    @media (max-width: 600px) {
        font-size: 12px;
        width: 80px;
        height: 80px;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

// THESE ARE PASSED INTO THE BITE MENU
const AddingButton = styled(AddWhiteCircleButton)`
    position: absolute;
    transform: translate(142px, 8px);
    overflow: hidden;
    width: 52px;
    border: none;
    background-position: center;
    z-index: 1010;
    opacity: 1;

    &:hover img {
        opacity: 0.5;
    }
`;

const ToggleLoopMode = styled.button`
    cursor: pointer;
    display: flex;
    font-size: 16px;
    padding: 12px 0;
    width: 100%;
    border: none;
    align-content: center;
    justify-content: center;
    text-decoration: none;
    background-color: ${props =>
        props.isRepeat ? randomBlerpColor() : "#353a40"};
    color: ${props => (props.isRepeat ? "#1d1d1d" : "#fff")};

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.9;
    }
`;

const OpenBite = styled.a`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(8px, 8px);
    overflow: hidden;
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    background-position: center;
    z-index: 1101;
    text-decoration: none;
    opacity: 0;

    @media (max-width: 600px) {
        transform: translate(0, 0);
        width: 32px;
        height: 32px;
    }

    &:hover {
        opacity: 1 !important;
    }

    &:focus {
        opacity: 1;
        border: none;
    }
`;

// interface Props {
//   boardId?: string;
//   color?: string;
//   biteId: string;
//   title: string;
//   imageUrl?: string;
//   audioSourceUrls: string[];
//   onPlaceholderClick: (props: { id: string; index: number }) => void;
//   onDeleteClick?: (props: { index: number; deleted: boolean }) => void;
//   editable?: boolean;
//   adding?: boolean;
//   index?: number;
//   isSpam?: boolean;
//   keycode?: number;
//   hotkeyEnabled?: boolean;
//   favorited?: boolean;
// }

// interface State {
//   buttonMode: string;
//   color: string;
//   currentKeycode: number;
// }

class BoardBite extends React.Component {
    props;
    state;
    constructor(props) {
        super(props);
        this.state = {
            buttonMode: this.props.isSpam ? ButtonModes.spam : ButtonModes.play,
            color: randomBlerpColor(),
            currentKeycode: props.keycode || null,
        };
    }

    handlePlaceholderClicked = () => {
        if (this.props.onPlaceholderClick) {
            this.props.onPlaceholderClick({
                id: this.props.biteId,
                index: this.props.index,
            });
        }

        logEvent("Board", "Add Bite", this.props.biteId);
    };

    handleDeleteClicked = ({ index, deleted }) => {
        if (this.props.onDeleteClick) {
            this.props.onDeleteClick({
                deleted,
                index,
            });
        }
        logEvent("Board", "Delete Bite", this.props.biteId);
    };

    toggleLoopMode = () => {
        if (this.state.buttonMode === ButtonModes.repeat) {
            this.setState({
                buttonMode: this.props.isSpam
                    ? ButtonModes.spam
                    : ButtonModes.play,
            });
            logEvent("Board", "Toggle Loop On", this.props.biteId);
        } else {
            this.setState({ buttonMode: ButtonModes.repeat });
        }
    };

    handleSetKeycode = ({ keycode }) => {
        this.setState({ currentKeycode: keycode });
        logEvent("Board", "Set Keycode", keycode);
    };

    hideErrorImage(i) {
        i.target.style.display = "none";
    }

    render() {
        return (
            <Container
                style={{
                    backgroundColor: this.state.color,
                }}
                role='listitem'
                title={this.props.title}
            >
                {this.props.imageUrl && (
                    <BackgroundImage
                        aria-hidden='true'
                        src={this.props.imageUrl}
                        onError={this.hideErrorImage}
                    />
                )}
                <Scrim
                    className='blerp-bite-scrim'
                    darker={Boolean(this.props.imageUrl)}
                >
                    <Link
                        prefetch={true}
                        href={{
                            pathname: "/bite",
                            query: { id: this.props.biteId },
                        }}
                        as={`/soundbites/${this.props.biteId}`}
                    >
                        <OpenBite
                            className='blerp-bite-open'
                            title={`Open blerp bite page for ${this.props.title}`}
                            href={`/soundbites/${this.props.biteId}`}
                        >
                            <OpenMenuIcon />
                        </OpenBite>
                    </Link>
                    <StyledAudioButton
                        biteId={this.props.biteId}
                        sources={this.props.audioSourceUrls}
                        preload={false}
                        showButton={false}
                        mode={this.state.buttonMode}
                        hotkey={this.props.hotkeyEnabled}
                        keycode={this.state.currentKeycode}
                        useGlobalAudio={false}
                    />
                    <TitleSection className='blerp-bite-title'>
                        {this.props.title}
                    </TitleSection>
                    <StyledKeycodeButton
                        onClick={this.handleSetKeycode}
                        boardId={this.props.boardId}
                        keycode={this.state.currentKeycode}
                        position={this.props.index}
                        editable={this.props.editable}
                    />
                    {this.props.adding ? (
                        <AddingButton onClick={this.handlePlaceholderClicked} />
                    ) : (
                        <MenuButton
                            key={2}
                            biteId={this.props.biteId}
                            biteAudioUrl={this.props.audioSourceUrls[0]}
                            biteTitle={this.props.title}
                            favorited={this.props.favorited}
                            favoriteCallback={() => {}}
                            className='blerp-bite-menu-more'
                        >
                            <ToggleLoopMode
                                onClick={this.toggleLoopMode}
                                isRepeat={
                                    this.state.buttonMode === ButtonModes.repeat
                                }
                            >
                                {this.state.buttonMode === ButtonModes.repeat
                                    ? "Loop Off"
                                    : "Loop On"}
                            </ToggleLoopMode>
                            {this.props.editable && (
                                <DeleteBiteFromBoard
                                    boardId={this.props.boardId}
                                    index={this.props.index}
                                    onDeleteClick={this.handleDeleteClicked}
                                />
                            )}
                        </MenuButton>
                    )}
                </Scrim>
            </Container>
        );
    }
}

export default BoardBite;
