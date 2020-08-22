/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import "isomorphic-fetch";

import Router from "next/router";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import styled from "styled-components";
import withLogging from "../../lib/withLogging";

import AudioButton from "../buttons/data/wrapped-audio-button";
import FileUploadViewer from "./file-upload-viewer";
import Button from "../buttons/button";

import PinkButton from "../buttons/pink-button";

import { canUseDOM, CircleImageDropzone, SoundDropzone } from "./dropzones";
import Tag from "../shared/Tag";
import ReactPlayerViewer from "./react-player-viewer";
import ReactPlayer from "react-player";

import JustVideo from "./just-video";
import Lottie from "react-lottie";
import BlerpCategoryInput from "../../packs/upload/BlerpCategoryInput";
import AddPlaylistScreen from "../../packs/upload/AddPlaylistScreen";
import Toggler from "../../packs/upload/Toggler";

const animationData = require("./animations/blerp-creation.json");

import DotsIndicator from "../shared/DotsIndicator";

import { allBlerpColors } from "../../lib/helperFunctions";
import {
    flyoutBackground,
    bodyText,
    secondaryGray,
    darkBlue,
    defaultBackground,
} from "../../styles/colors";
import SecondaryButton from "../buttons/SecondaryButton";

const RowStartJustify = styled.div`
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    display: flex;
    padding: 16px 0;
`;

const OverallPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
`;

const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
`;

const TwoVideoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    background: transparent;
    align-items: center;
    position: relative;
`;

const TwoVideoContainerColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    align-items: center;
    position: relative;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 40px;
    background-color: #fff;
    border-radius: 8px;
    margin-top: 48px;
    margin-bottom: 20px;
    padding: 12px;
    position: relative;
`;

const FlexibleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    @media (max-width: 1200px) {
        flex-direction: column;
    }
`;

const FinalScreenContainer = styled.div`
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
    align-items: flex-start;
    background-color: transparent;
    border-radius: 12px;
    position: relative;
    width: 100%;
`;

const FinalScreenContainerWidth = styled.div`
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: center;
    display: flex;
    align-items: flex-start;
    background-color: transparent;
    border-radius: 12px;
    position: relative;
    max-width: 600px;
    margin: 0 40px;
`;

const AudioViewerContainer = styled.div`
    padding: 12px;
`;

const ImageSelectorContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-flow: column;
    position: relative;
`;

const WhiteText = styled.p`
    font-weight: bold;
    padding: 0;
    position: absolute;
    margin: 0;
    pointer-events: none;
    cursor: pointer;
    opacity: 0.8;
    font-size: 12px;
    color: ${props => props.theme.flyoutBackground};
`;

const MetadataContainer = styled.div`
    display: flex;
    flex-flow: column;
    padding: 12px;
    position: relative;
`;

const MetadataContainerFull = styled.div`
    display: flex;
    flex-flow: column;
    position: relative;
    width: 100%;
`;

const ColumnContainer = styled.div`
    display: flex;
    flex-flow: column;
    max-width: 280px;
    margin: 4px 0;
`;

const SoundInputContainer = styled.div`
    flex-flow: column;
    padding: 12px;
    display: ${props => (props.showContainer ? "flex" : "none")};
    align-items: center;
    justify-content: center;
`;

const YoutubeInputContainer = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column;
    display: ${props => (props.showContainer ? "flex" : "none")};
    background-color: transparent;
    border-radius: 8px;
    margin-bottom: 24px;
`;

const StyledAudioButton = styled(AudioButton)`
    width: 120px;
    height: 120px;
    background-color: #1d1d1d;
    position: relative;
    border-radius: 6px;
    align-self: center;
`;

const H1Container = styled.div``;

const Borderline = styled.div`
    width: 100%;
    margin: 8px;
    height: 2px;
    border-bottom: 1px solid ${props => props.theme.defaultBackground};
`;

const H1 = styled.h1`
    color: rgba(0, 0, 0, 1);
    text-align: center;
    margin: 20px;
`;

const Label = styled.label`
    font-weight: 400;
    padding: 8px 0;
    color: ${props => props.theme.gray};
`;

const SecondLabel = styled.label`
    padding: 12px;
    color: ${props => props.theme.lightGray};
    text-align: center;
    max-width: 480px;
`;

const YTLabel = styled.label`
    color: ${props => props.theme.gray};
    text-align: center;
    font-size: 16px;
    margin: 4px;
`;

const YTSubLabel = styled.label`
    color: ${props => props.theme.gray};
    font-weight: lighter;
    text-align: center;
    font-size: 16px;
    padding: 4px;
    max-width: 400px;
`;

const YTSubSubLabel = styled.label`
    color: ${props => props.theme.gray};
    font-size: 12px;
    font-weight: lighter;
    text-align: center;
`;

const TextField = styled.input`
    background-color: transparent;
    border: none;
    border-radius: 0;
    height: 32px;
    color: #000;
    font-size: inherit;
    padding-left: 5px;
    padding-right: 5px;
    border-bottom: 2px solid ${props => props.theme.placeholderText};
    outline: 3px solid
        ${props =>
            props.error ? "rgba(200, 20, 20, 1)" : "rgba(200, 20, 20, 0)"};

    ::placeholder {
        font-weight: lighter;
        color: ${props => props.theme.placeholderText};
    }

    &:focus {
        border-radius: 4px;
    }
`;

const YTTextField = styled.input`
    background-color: transparent;
    border: none;
    border-radius: 8px;
    height: 32px;
    color: #000;
    font-size: inherit;
    padding-left: 8px;
    padding-right: 8px;
    border: 2px solid ${props => props.theme.secondaryText};
    outline: 3px solid
        ${props =>
            props.error ? "rgba(200, 20, 20, 1)" : "rgba(200, 20, 20, 0)"};
    width: 70%;

    ::placeholder {
        font-weight: lighter;
        color: ${props => props.theme.placeholderText};
    }

    &:focus {
        border-radius: 8px;
    }
`;

const TagsContainer = styled.div`
    background-color: transparent;
    display: flex;
    flex-flow: row wrap;
    overflow-y: scroll;
    height: 80px;
    max-width: 320px;
    border: ${props => props.theme.placeholderText} solid 2px;
    border-radius: 4px;
`;

const TagsTextField = styled.input`
    background-color: transparent;
    border: none;
    border-radius: 4px;
    height: 32px;
    color: #000;
    font-size: inherit;
    padding-left: 5px;
    padding-right: 5px;
    outline: 3px solid
        ${props =>
            props.error ? "rgba(200, 20, 20, 1)" : "rgba(200, 20, 20, 0)"};

    &:focus {
        border-radius: 4px;
    }

    ::placeholder {
        font-weight: lighter;
        color: ${props => props.theme.placeholderText};
    }
`;

const ModalButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 8px;
`;

const ButtonContainer = styled.div`
    margin: 12px 4px;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const LeftButtonModal = styled.button`
    position: absolute;
    top: 45%;
    left: -20px;
    margin: 4px;
    width: 48px;
    height: 48px;
    border-radius: 100px;
    background-color: ${props => props.theme.darkBackground};
    border: none;
    z-index: 1000;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.06);
    -moz-box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.06);
    box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${props => props.theme.actionBackground};
    }
`;

const ModalButtonRight = styled.button`
    position: absolute;
    top: 45%;
    right: -20px;
    margin: 4px;
    width: 48px;
    height: 48px;
    border-radius: 100px;
    position: absolute;
    border: none;
    background-color: ${props => props.theme.ibisRed};
    z-index: 1000;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.06);
    -moz-box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.06);
    box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${props => props.theme.actionBackground};
    }
`;

const ColoredButton = styled(Button)`
    background-color: ${props => props.name};
    height: 32px;
    width: 32px;
    margin: 1px;
    border-radius: 8px;
`;

const StyledSecButton = styled(SecondaryButton)`
    top: 0px;
    position: absolute;
    right: 0px;
`;

const LineImg = styled.img`
    margin: 30px;
`;

const Link = styled.a`
    text-decoration: none;
    color: ${darkBlue};
`;

const RowContainerRow = styled.div`
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    display: flex;
`;

const ColoredButtonContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 200px;
    margin-left: 10px;
    margin-right: 10px;
    justify-content: space-around;
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

const SmallImageIcon = styled.img`
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
`;

const HugeCircleImage = styled.img`
    position: absolute;
    top: -180px;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    -webkit-box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.14);
    -moz-box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.14);
    box-shadow: 0px 0px 25px 4px rgba(0, 0, 0, 0.14);
`;

const BoldTextNoHover = styled.div`
    font-weight: normal;
    font-size: 32px;
    color: ${props => props.theme.seafoam};
    text-align: center;
    margin: 8px;
`;

const BoldTextNoHoverNoColor = styled.div`
    font-weight: normal;
    font-size: 28px;
    color: ${props => props.theme.secondaryText};
    text-align: center;
`;

const BoldTextNoHoverNoColorFull = styled.div`
    font-weight: normal;
    font-size: 20px;
    color: ${props => props.theme.secondaryText};
    text-align: center;
    width: 100%;
`;

const VideoRowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
`;

const VideoIconImage = styled.img`
    height: 32px;
    padding: 0 8px;
`;

const VideoIconImageSquare = styled.img`
    height: 40px;
    padding: 0 8px;
`;

const StyleSelect = styled.select`
    background-color: ${props => props.theme.flyoutBackground};
    margin: 4px;
    border-width: 2px;
    border-radius: 6px;
    color: ${props => props.theme.invertFlyoutBackground};
    border-color: ${props => props.theme.placeholderText};
    max-width: 200px;
`;

const BlueLink = styled.a`
    font-weight: lighter;
    text-decoration: none;
    color: ${props => props.theme.darkBlue};
`;

const ExtraPadding = styled.div`
    padding-top: 60px;
`;

const SecondLabelTwo = styled.div`
    font-weight: lighter;
    padding: 12px;
    color: ${props => props.theme.gray};
    text-align: center;
    max-width: 480px;
`;

const backgroundColors = allBlerpColors;

const Visibility = {
    PUBLIC: "PUBLIC",
    UNLISTED: "UNLISTED",
    PRIVATE: "PRIVATE",
    HIDDEN: "HIDDEN",
    BLOCKED: "BLOCKED",
};

// TODO: add other types
const VisibilityOptions = [
    { text: "Public", value: Visibility.PUBLIC },
    { text: "Unlisted", value: Visibility.UNLISTED },
];

const DEFAULT_LENGTH_SPREAD = 9600;

const USER_SIGNED_IN = gql`
    query websiteCreationPage {
        web {
            userSignedIn {
                _id
                roles
            }
        }
    }
`;

const createDefaultState = props => ({
    audioSelectionFinished: false,
    selectingPlaylist: false,
    selectedPlaylistId: null,
    biteTitle: "",
    errorTitle: false,
    image: undefined,
    loading: false,
    previewDuration: 10000,
    previewEndPosition: props.previewEndPosition
        ? props.previewEndPosition
        : props.previewStartPosition + DEFAULT_LENGTH_SPREAD,
    previewStartPosition: props.previewStartPosition
        ? props.previewStartPosition
        : 0,
    previewURL: "",
    selectedBackground:
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
    sound: undefined,
    videoUrlLink: undefined,
    tagInput: "",
    tags: [],
    visibility: VisibilityOptions[0].value,
    showJustVideo: false,
    customCategory: "",
    userTranscription: "",
    album: "",
    author: "",
    description: "",
    createBoardStatus: false,
    ...props,
});

// interface Props {
//   useRandomColor?: boolean;
//   createBiteFromUpload?: any;
//   createBiteFromURL?: any;
// }

// interface State {
//   audioSelectionFinished: boolean;
//   image: File | undefined;
//   sound: File | undefined;
//   videoUrlLink: string | undefined;
//   tags: string[];
//   tagInput: string;
//   selectedBackground: string;
//   previewStartPosition: number;
//   previewEndPosition: number;
//   previewDuration: number;
//   previewURL: string;
//   biteTitle: string;
//   loading: boolean;
//   errorTitle: boolean;
//   visibility: Visibility;
// }

class UploadDialog extends React.Component {
    static defaultProps = {
        useRandomColor: true,
    };
    tagInputField;
    state;

    constructor(props) {
        super(props);

        this.state = createDefaultState({
            previewStartPosition: Number(props.startTime)
                ? Number(props.startTime) * 1000
                : 0,
            videoUrlLink: props.link,
        });
    }

    startOver = () => {
        this.setState({ ...createDefaultState({}) });
    };

    goBack = () => {
        this.setState({ audioSelectionFinished: false });
    };

    setPlaylistId = ({ boardId }) => {
        if (boardId === this.state.selectedPlaylistId) {
            this.setState({ selectedPlaylistId: null });
        } else {
            this.setState({ selectedPlaylistId: boardId });
        }
    };
    onBoardCreated = ({ boardId }) => {
        this.setState({ selectedPlaylistId: boardId }, () => {
            this.handleSubmit();
        });
    };

    setCreateBoardStatus = ({ creatingNewBoard }) => {
        this.setState({ creatingNewBoard });
    };

    goBackToMetaData = () => {
        this.setState({ selectingPlaylist: false });
    };

    goToPlaylistAdding = () => {
        if (!this.state.sound && !this.state.videoUrlLink) {
            // TODO: Make Proper UI For This
            alert("Sound is required for a submission");
            return;
        }
        if (
            this.state.videoUrlLink &&
            this.state.videoUrlLink.length &&
            !ReactPlayer.canPlay(this.state.videoUrlLink)
        ) {
            // TODO: Make Proper UI For This
            alert("Valid Url is required for a submission");
            return;
        } else if (false && !this.state.tags.length) {
            // Don't make required for now
            const container = document.getElementById("blerp_tag_upload");
            if (container) {
                container.scrollIntoView({
                    inline: "center",
                    block: "center",
                    behavior: "smooth",
                });
            }
            // TODO: Make Proper UI For This
            alert(
                "Tags are required for submission (Hint: you need to press enter after typing)",
            );
            return;
        } else if (!this.state.biteTitle) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Title is required for a submission");
            return;
        } else if (
            this.state.blerpCategory &&
            !this.state.blerpCategory.category
        ) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("You must select a category for the soundbite");
            return;
        } else if (this.state.description.length > 300) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your description must be 300 characters or less");
            return;
        } else if (this.state.author.length > 100) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your title must be 100 characters or less");
            return;
        } else if (this.state.album.length > 100) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your title must be 100 characters or less");
            return;
        } else if (this.state.customCategory.length > 30) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your title must be 20 characters or less");
            return;
        } else if (this.state.userTranscription.length > 300) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your title must be 300 characters or less");
            return;
        } else if (this.state.biteTitle.length > 200) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your title must be 200 characters or less");
            return;
        } else if (this.state.previewDuration >= 10200) {
            // TODO: Make Proper UI For This
            alert("Your sound bite must be less then 10 seconds long");
            return;
        } else if (this.state.previewDuration < 100) {
            // NOTE: catching not real file stuff
            alert("You can only upload sound files greater then 0.1 secound");
            return;
        } else if (this.state.image && this.state.image.size > 5842038) {
            alert("You must update with a valid image less then 5mb");
            return;
        }

        this.setState({ selectingPlaylist: true });
    };

    componentDidMount() {
        this.setState({
            selectedBackground:
                backgroundColors[
                    Math.floor(Math.random() * backgroundColors.length)
                ],
        });
    }

    handleImageDrop = acceptedFiles => {
        this.setState({ image: acceptedFiles[0] });
    };

    handleSoundDrop = acceptedFiles => {
        this.setState({
            audioSelectionFinished: false, // TODO: remove this when we are ready for sending time selection
            previewURL: URL.createObjectURL(acceptedFiles[0]),
            sound: acceptedFiles[0],
        });
    };

    handleCategoryChange = category => {
        this.setState({
            blerpCategory: category,
        });
    };

    handleSubmit = async () => {
        if (!this.state.sound && !this.state.videoUrlLink) {
            // TODO: Make Proper UI For This
            alert("Sound is required for a submission");
            return;
        } else if (false && !this.state.tags.length) {
            // one day maybe make required again
            // TODO: Make Proper UI For This
            alert(
                "Tags are required for submission (Hint: you need to press enter after typing)",
            );
            return;
        }
        if (
            this.state.videoUrlLink &&
            this.state.videoUrlLink.length &&
            !ReactPlayer.canPlay(this.state.videoUrlLink)
        ) {
            // TODO: Make Proper UI For This
            alert("Valid Url is required for a submission");
            return;
        } else if (!this.state.biteTitle) {
            const container = document.getElementById("blerp_tag_upload");
            if (container) {
                container.scrollIntoView({
                    inline: "center",
                    block: "center",
                    behavior: "smooth",
                });
            }

            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Title is required for a submission");
            return;
        } else if (
            this.state.blerpCategory &&
            !this.state.blerpCategory.category
        ) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("You must select a category for the soundbite");
            return;
        } else if (this.state.description.length > 300) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your description must be 300 characters or less");
            return;
        } else if (this.state.author.length > 100) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your author must be 100 characters or less");
            return;
        } else if (this.state.album.length > 100) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your album must be 100 characters or less");
            return;
        } else if (this.state.customCategory.length > 30) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your custom category must be 20 characters or less");
            return;
        } else if (this.state.userTranscription.length > 300) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your title must be 300 characters or less");
            return;
        } else if (this.state.biteTitle.length > 200) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your title must be 200 characters or less");
            return;
        } else if (this.state.previewDuration >= 10200) {
            // TODO: Make Proper UI For This
            alert("Your sound bite must be less then 10 seconds long");
            return;
        } else if (this.state.previewDuration < 100) {
            // NOTE: catching not real file stuff
            alert("You can only upload sound files greater then 0.1 secound");
            return;
        } else if (this.state.image && this.state.image.size > 5842038) {
            alert("You must update with a valid image less then 5mb");
            return;
        } else {
            this.setState({ loading: true });

            if (this.state.sound) {
                if (window.gtag) {
                    window.gtag("event", "blerp_creation_file", {
                        event_category: "create",
                        event_label: `${this.state.biteTitle}`,
                        value: 1,
                    });
                }

                this.props.logAction({
                    action: "BLERP_ATTEMPT_FILE_CREATION",
                    event: "BLERP_CREATION",
                    data: {
                        color: this.state.selectedBackground,
                        keywords: this.state.tags,
                        title: this.state.biteTitle,
                        visibility: this.state.visibility,
                        startTime: Math.floor(this.state.previewStartPosition),
                        duration: Math.ceil(this.state.previewDuration + 50),
                        description: this.state.description,
                        album: this.state.album,
                        customCategory: this.state.customCategory,
                        userCategory:
                            this.state.blerpCategory &&
                            this.state.blerpCategory.category,
                        author: this.state.author,
                        userTranscription: this.state.userTranscription,
                        playlistId: this.state.selectedPlaylistId,
                    },
                });

                try {
                    const result = await this.props.createBiteFromUpload({
                        variables: {
                            audio: this.state.sound,
                            color: this.state.selectedBackground,
                            image: this.state.image,
                            keywords: this.state.tags,
                            title: this.state.biteTitle,
                            visibility: this.state.visibility,
                            startTime: Math.floor(
                                this.state.previewStartPosition,
                            ),
                            duration: Math.ceil(
                                this.state.previewDuration + 50,
                            ),
                            description: this.state.description,
                            album: this.state.album,
                            customCategory: this.state.customCategory,
                            userCategory:
                                this.state.blerpCategory &&
                                this.state.blerpCategory.category,
                            author: this.state.author,
                            userTranscription: this.state.userTranscription
                                .length
                                ? this.state.userTranscription
                                : this.state.biteTitle,
                            playlistId: this.state.selectedPlaylistId,
                        },
                    });

                    if (
                        (result.data.web.biteCreateByUpload &&
                            !result.data.web.biteCreateByUpload._id) ||
                        result.data.errors
                    ) {
                        this.setState({ loading: false });
                        // TODO: Make Proper UI For This
                        alert(
                            result.data.errors && result.data.errors[0].message,
                        );
                        this.props.logAction({
                            action: "CREATE_BLERP_FROM_FILE_ERROR",
                            event: "BLERP_CREATION",
                            data: {
                                errorMessage:
                                    result.data.errors &&
                                    result.data.errors[0].message,
                                color: this.state.selectedBackground,
                                keywords: this.state.tags,
                                title: this.state.biteTitle,
                                visibility: this.state.visibility,
                                startTime: Math.floor(
                                    this.state.previewStartPosition,
                                ),
                                duration: Math.ceil(
                                    this.state.previewDuration + 50,
                                ),
                                description: this.state.description,
                                album: this.state.album,
                                customCategory: this.state.customCategory,
                                userCategory:
                                    this.state.blerpCategory &&
                                    this.state.blerpCategory.category,
                                author: this.state.author,
                                userTranscription: this.state.userTranscription
                                    .length
                                    ? this.state.userTranscription
                                    : this.state.biteTitle,
                                playlistId: this.state.selectedPlaylistId,
                            },
                        });
                        return;
                    } else {
                        Router.push(
                            `/bite?id=${result.data.web.biteCreateByUpload._id}`,
                            `/soundbites/${result.data.web.biteCreateByUpload._id}`,
                        );
                    }
                } catch (error) {
                    // TODO: Make Proper UI For This
                    this.setState({ loading: false });

                    alert(`Failed to create blerp due to error: ${error}`);

                    this.props.logAction({
                        action: "CREATE_BLERP_FROM_FILE_ERROR",
                        event: "BLERP_CREATION",
                        data: {
                            errorMessage: error,
                            color: this.state.selectedBackground,
                            keywords: this.state.tags,
                            title: this.state.biteTitle,
                            visibility: this.state.visibility,
                            startTime: Math.floor(
                                this.state.previewStartPosition,
                            ),
                            duration: Math.ceil(
                                this.state.previewDuration + 50,
                            ),
                            description: this.state.description,
                            album: this.state.album,
                            customCategory: this.state.customCategory,
                            userCategory:
                                this.state.blerpCategory &&
                                this.state.blerpCategory.category,
                            author: this.state.author,
                            userTranscription: this.state.userTranscription,
                            playlistId: this.state.selectedPlaylistId,
                        },
                    });

                    return;
                }
            } else if (this.state.videoUrlLink) {
                if (window.gtag) {
                    window.gtag("event", "blerp_creation_video", {
                        event_category: "create",
                        event_label: `${this.state.biteTitle}`,
                        value: 1,
                    });
                }

                this.props.logAction({
                    action: "BLERP_ATTEMPT_URL_CREATION",
                    event: "BLERP_CREATION",
                    data: {
                        color: this.state.selectedBackground,
                        duration: Math.ceil(this.state.previewDuration + 100), // Add a buffer because more is better then less
                        keywords: this.state.tags,
                        startTime: Math.floor(this.state.previewStartPosition),
                        title: this.state.biteTitle,
                        url: this.state.videoUrlLink,
                        visibility: this.state.visibility,
                        description: this.state.description,
                        album: this.state.album,
                        customCategory: this.state.customCategory,
                        userCategory:
                            this.state.blerpCategory &&
                            this.state.blerpCategory.category,
                        author: this.state.author,
                        userTranscription: this.state.userTranscription,
                        playlistId: this.state.selectedPlaylistId,
                    },
                });

                try {
                    const result = await this.props.createBiteFromURL({
                        variables: {
                            color: this.state.selectedBackground,
                            duration: Math.ceil(
                                this.state.previewDuration + 100,
                            ), // Add a buffer because more is better then less
                            image: this.state.image,
                            keywords: this.state.tags,
                            startTime: Math.floor(
                                this.state.previewStartPosition,
                            ),
                            title: this.state.biteTitle,
                            url: this.state.videoUrlLink,
                            visibility: this.state.visibility,
                            description: this.state.description,
                            album: this.state.album,
                            customCategory: this.state.customCategory,
                            userCategory:
                                this.state.blerpCategory &&
                                this.state.blerpCategory.category,
                            author: this.state.author,
                            userTranscription: this.state.userTranscription,
                            playlistId: this.state.selectedPlaylistId,
                        },
                    });

                    if (
                        (result.data.web.biteCreateByYouTube &&
                            !result.data.web.biteCreateByYouTube._id) ||
                        result.data.errors
                    ) {
                        this.setState({ loading: false });
                        // TODO: Make Proper UI For This
                        alert(
                            result.data.errors && result.data.errors[0].message,
                        );

                        this.props.logAction({
                            action: "CREATE_BLERP_FROM_URL_ERROR",
                            event: "BLERP_CREATION",
                            data: {
                                errorMessage:
                                    result.data.errors &&
                                    result.data.errors[0].message,
                                color: this.state.selectedBackground,
                                duration: Math.ceil(
                                    this.state.previewDuration + 100,
                                ), // Add a buffer because more is better then less
                                keywords: this.state.tags,
                                startTime: Math.floor(
                                    this.state.previewStartPosition,
                                ),
                                title: this.state.biteTitle,
                                url: this.state.videoUrlLink,
                                visibility: this.state.visibility,
                                description: this.state.description,
                                album: this.state.album,
                                customCategory: this.state.customCategory,
                                userCategory:
                                    this.state.blerpCategory &&
                                    this.state.blerpCategory.category,
                                author: this.state.author,
                                userTranscription: this.state.userTranscription,
                                playlistId: this.state.selectedPlaylistId,
                            },
                        });

                        return;
                    } else {
                        Router.push(
                            `/bite?id=${result.data.web.biteCreateByYouTube._id}`,
                            `/soundbites/${result.data.web.biteCreateByYouTube._id}`,
                        );
                    }
                } catch (error) {
                    // TODO: Make Proper UI For This
                    this.setState({ loading: false });
                    alert(`Failed to create blerp due to error: ${error}`);

                    this.props.logAction({
                        action: "CREATE_BLERP_FROM_URL_ERROR",
                        event: "BLERP_CREATION",
                        data: {
                            errorMessage: error,
                            color: this.state.selectedBackground,
                            duration: Math.ceil(
                                this.state.previewDuration + 100,
                            ), // Add a buffer because more is better then less
                            keywords: this.state.tags,
                            startTime: Math.floor(
                                this.state.previewStartPosition,
                            ),
                            title: this.state.biteTitle,
                            url: this.state.videoUrlLink,
                            visibility: this.state.visibility,
                            description: this.state.description,
                            album: this.state.album,
                            customCategory: this.state.customCategory,
                            userCategory:
                                this.state.blerpCategory &&
                                this.state.blerpCategory.category,
                            author: this.state.author,
                            userTranscription: this.state.userTranscription,
                            playlistId: this.state.selectedPlaylistId,
                        },
                    });

                    return;
                }
            } else {
                // TODO: Make Proper UI For This
                this.setState({ loading: false });
                alert(`Failed to create blerp due to invalid sound file`);
            }
        }
    };

    handleBackgroundColorChange = event => {
        event.preventDefault();
        const target = event.currentTarget;
        const name = target.name;
        this.setState({
            image: undefined,
            selectedBackground: name,
        });
    };

    handleURLChange = event => {
        const target = event.currentTarget;
        const url = target.value;

        this.setState({
            previewDuration: DEFAULT_LENGTH_SPREAD,
            previewEndPosition:
                this.state.previewStartPosition + DEFAULT_LENGTH_SPREAD,
            previewStartPosition: this.state.previewStartPosition,
            videoUrlLink: url,
        });
    };

    handleTitleChange = event => {
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;

        this.setState({ biteTitle: value, errorTitle: false });
    };

    handleTagInput = event => {
        const target = event.currentTarget;
        const value = target.value;

        this.setState({ tagInput: value });
    };

    onBlur = () => {
        let input = this.state.tagInput;
        const splitInput = input.split(",").filter((elem, index, self) => {
            return index === self.indexOf(elem);
        });
        if (
            this.state.tags.indexOf(this.state.tagInput) === -1 &&
            this.state.tagInput.length > 0
        ) {
            this.setState({ tags: [...this.state.tags, ...splitInput] });
        }
        this.setState({ tagInput: "" });
    };

    handleTagKeyDown = event => {
        const target = event.currentTarget;
        const value = target.value;

        let input = this.state.tagInput;
        // Remove '#' from start of string if it exists
        if (input[0] === "#") {
            input = input.slice(1);
        }

        // Allow tags to be seperated by commas
        const splitInput = input.split(",").filter((elem, index, self) => {
            return index === self.indexOf(elem);
        });

        if (event.key === "Enter") {
            if (this.state.tags.indexOf(value) === -1 && value.length > 0) {
                this.setState({ tags: [...this.state.tags, ...splitInput] });
            }
            this.setState({ tagInput: "" });
        } else if (event.key === "Backspace") {
            if (this.state.tags.length > 0 && value.length === 0) {
                const arrayCopy = this.state.tags.slice(0, -1);
                this.setState({ tags: arrayCopy });
            }
        }
    };

    handleOnClickTagBox = () => {
        this.tagInputField.focus();
    };

    handleTagCancel = (_, key) => {
        const arrayCopy = this.state.tags;
        arrayCopy.splice(key, 1);
        this.setState({ tags: arrayCopy });
        this.tagInputField.focus();
    };

    handleVisibilitySelect = ({ newToggleState }) => {
        this.setState({ visibility: newToggleState ? "UNLISTED" : "PUBLIC" });
    };

    handleCustomCategoryChange = event => {
        const target = event.currentTarget;
        const value = target.value;
        this.setState({ customCategory: value });
    };

    handleDescriptionChange = event => {
        const target = event.currentTarget;
        const value = target.value;
        this.setState({ description: value });
    };

    handleTranscriptionChange = event => {
        const target = event.currentTarget;
        const value = target.value;
        this.setState({ userTranscription: value });
    };

    handleAlbumChange = event => {
        const target = event.currentTarget;
        const value = target.value;
        this.setState({ album: value });
    };

    handleAuthorChange = event => {
        const target = event.currentTarget;
        const value = target.value;
        this.setState({ author: value });
    };

    renderTag(tag, index) {
        return (
            <Tag
                key={index}
                cancelable={true}
                id={index}
                colored={false}
                onCancel={this.handleTagCancel}
            >
                #{tag}
            </Tag>
        );
    }

    onHandleTagRef = input => {
        this.tagInputField = input;
    };

    renderAudioInput() {
        const showContainer =
            !this.state.sound &&
            !this.state.videoUrlLink &&
            !this.state.selectingPlaylist;
        return (
            <SoundInputContainer showContainer={showContainer}>
                <YTLabel>Create a Blerp from file upload</YTLabel>

                {canUseDOM() && (
                    <SoundDropzone
                        multiple={false}
                        accept='audio/*'
                        onDrop={this.handleSoundDrop}
                    />
                )}
                <YTSubLabel>Upload a audio file</YTSubLabel>
                <YTSubSubLabel>(mp3, wav, aac, ogg)</YTSubSubLabel>
            </SoundInputContainer>
        );
    }

    renderAudioMetaScreen() {
        if (
            (!this.state.sound && !this.state.videoUrlLink) ||
            (this.state.sound && !this.state.audioSelectionFinished) ||
            this.state.selectingPlaylist
        ) {
            return;
        }
        return (
            <FinalScreenContainerWidth>
                <HugeTextContainer>
                    <BoldTextNoHoverNoColor>
                        Name Your Blerp
                    </BoldTextNoHoverNoColor>
                </HugeTextContainer>
                <Borderline />
                {/* Image Selection Occurs in this container */}
                {/* TODO: remove the this.state.sound after multifile uploading works */}
                <MetadataContainer>
                    {/* {this.state.sound && <Label>Max 10 Second Upload</Label>} */}
                    {this.state.sound && (
                        <StyledAudioButton
                            biteId={"pre-upload"}
                            sources={[URL.createObjectURL(this.state.sound)]}
                            preload={true}
                            showButton={true}
                            startTime={
                                this.state.previewStartPosition /
                                parseFloat("1000")
                            }
                            endTime={
                                this.state.previewEndPosition /
                                parseFloat("1000")
                            }
                            useGlobalAudio={false}
                            doNotLogPlay={true}
                            doNotSwitchToSpam={true}
                        />
                    )}
                    <Label>Title</Label>
                    <TextField
                        name='biteTitle'
                        type='text'
                        placeholder='Title (100 Characters Max)'
                        id='blerp_title_upload'
                        onChange={this.handleTitleChange}
                        error={this.state.errorTitle}
                        value={this.state.biteTitle}
                    />
                    <RowContainerRow>
                        {!this.state.sound && (
                            <ImageSelectorContainer>
                                {/* Keep the 'Preview' a Dropzone. This makes image uploading a semi-secret. */}
                                {canUseDOM() && (
                                    <CircleImageDropzone
                                        multiple={false}
                                        accept='image/*'
                                        color={
                                            this.props.useRandomColor
                                                ? this.state.selectedBackground
                                                : "#ff0000"
                                        }
                                        imageURL={
                                            this.state.image &&
                                            URL.createObjectURL(
                                                this.state.image,
                                            )
                                        }
                                        onDrop={this.handleImageDrop}
                                    />
                                )}
                                <WhiteText>+ Image Upload</WhiteText>
                                {/* <ColoredButtonContainer>
                {backgroundColors.map(color => {
                  return (
                    <ColoredButton
                      key={color}
                      name={color}
                      onClick={this.handleBackgroundColorChange}
                    />
                  );
                })}
              </ColoredButtonContainer> */}
                            </ImageSelectorContainer>
                        )}

                        <ColumnContainer>
                            <Label>Author, Speaker, or Item</Label>
                            <TextField
                                name='author'
                                type='text'
                                placeholder='Who or what said it?'
                                onChange={this.handleAuthorChange}
                                error={this.state.errorAuthor}
                                value={this.state.author}
                            />
                            <Label>Tags</Label>
                            <TagsContainer onClick={this.handleOnClickTagBox}>
                                {this.state.tags.map((tag, index) =>
                                    this.renderTag(tag, index),
                                )}
                                <TagsTextField
                                    type='text'
                                    id='blerp_tag_upload'
                                    ref={this.onHandleTagRef}
                                    value={this.state.tagInput}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.handleTagKeyDown}
                                    onChange={this.handleTagInput}
                                    error={false}
                                />
                            </TagsContainer>
                        </ColumnContainer>
                    </RowContainerRow>

                    <Borderline />
                    <BoldTextNoHoverNoColorFull>
                        Optional
                    </BoldTextNoHoverNoColorFull>

                    <RowStartJustify>
                        <Label>Make blerp private</Label>
                        <Toggler
                            toggleState={this.state.visibility === "UNLISTED"}
                            onChange={this.handleVisibilitySelect}
                        />
                    </RowStartJustify>

                    {/* <Label>Visibility</Label>
          <StyleSelect
            value={this.state.visibility}
            onChange={this.handleVisibilitySelect}
          >
            {VisibilityOptions.map(visi => {
              return (
                <option key={visi.value} value={visi.value}>
                  {visi.text}
                </option>
              );
            })}
          </StyleSelect> */}

                    <BlerpCategoryInput
                        onCategoryClick={this.handleCategoryChange}
                        selectedCategory={
                            this.state.blerpCategory &&
                            this.state.blerpCategory.category
                        }
                        handleCustomCategoryChange={
                            this.handleCustomCategoryChange
                        }
                        handleDescriptionChange={this.handleDescriptionChange}
                        handleTranscriptionChange={
                            this.handleTranscriptionChange
                        }
                        handleAlbumChange={this.handleAlbumChange}
                        biteTitle={this.state.biteTitle}
                        customCategory={this.state.customCategory}
                        description={this.state.description}
                        userTranscription={this.state.userTranscription}
                        album={this.state.album}
                    />

                    <ButtonContainer>
                        {this.state.blerpCategory ? (
                            <PinkButton onClick={this.goToPlaylistAdding}>
                                Continue
                            </PinkButton>
                        ) : (
                            <></>
                        )}
                    </ButtonContainer>

                    <SecondLabel>
                        * Creating a Blerp for Twitch? Depending on content
                        rating per streamer you may need to send us the sound
                        link via{" "}
                        <Link href='/connect-with-us/contact' target='_blank'>
                            email
                        </Link>{" "}
                        or{" "}
                        <Link href='https://discord.gg/HHueCtM' target='_blank'>
                            discord
                        </Link>{" "}
                        for approval.
                    </SecondLabel>
                </MetadataContainer>
            </FinalScreenContainerWidth>
        );
    }

    renderPlaylistScreen() {
        if (!this.state.selectingPlaylist) {
            return;
        }
        return (
            <Query ssr={false} query={USER_SIGNED_IN}>
                {({ data, networkStatus }) => {
                    if (networkStatus === 1 || networkStatus === 2) {
                        return <div>Loading Boards!</div>;
                    }

                    if (data && !data.web.userSignedIn) {
                        return <div>Something Went Wrong</div>;
                    }

                    return (
                        <FinalScreenContainer>
                            {this.state.image && (
                                <HugeCircleImage
                                    src={
                                        this.state.image &&
                                        URL.createObjectURL(this.state.image)
                                    }
                                />
                            )}
                            <MetadataContainerFull>
                                <AddPlaylistScreen
                                    onFinishSelection={this.setPlaylistId}
                                    onBoardCreated={this.onBoardCreated}
                                    creatingNewBoard={
                                        this.state.creatingNewBoard
                                    }
                                    setCreateBoardStatus={
                                        this.setCreateBoardStatus
                                    }
                                    userId={
                                        data &&
                                        data.web.userSignedIn &&
                                        data.web.userSignedIn._id
                                    }
                                    selectedPlaylistId={
                                        this.state.selectedPlaylistId
                                    }
                                />

                                {!this.state.creatingNewBoard && (
                                    <ModalButtonContainer>
                                        <ButtonContainer>
                                            <LeftButtonModal
                                                onClick={this.goBackToMetaData}
                                            >
                                                <SmallImageIcon src='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_White_Left.svg' />
                                            </LeftButtonModal>
                                        </ButtonContainer>
                                        <ButtonContainer>
                                            <ModalButtonRight
                                                onClick={this.handleSubmit}
                                            >
                                                <SmallImageIcon src='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_White_Right.svg' />
                                            </ModalButtonRight>
                                        </ButtonContainer>
                                    </ModalButtonContainer>
                                )}
                            </MetadataContainerFull>
                        </FinalScreenContainer>
                    );
                }}
            </Query>
        );
    }

    finishedAudioSelection = ({ startTime, endTime }) => {
        this.setState({
            audioSelectionFinished: true,
            previewDuration:
                Math.max(startTime, endTime) - Math.min(startTime, endTime),
            previewEndPosition: endTime,
            previewStartPosition: startTime,
        });
    };

    onShowVideo = show => () => {
        this.setState({
            showJustVideo: show,
        });
    };

    /*
     * This is used to select start and end time for a sound file input
     */
    renderAudioViewerPreview = () => {
        if (!this.state.sound || this.state.audioSelectionFinished) {
            return;
        }

        return (
            <AudioViewerContainer>
                <FileUploadViewer
                    title={"Title"}
                    audioFile={this.state.sound}
                    color={"#HEFES"}
                    backgroundColor={"#AEFAHF"}
                    onFinished={this.finishedAudioSelection}
                    onCancel={this.startOver}
                    endTime={this.state.previewEndPosition}
                    startTime={this.state.previewStartPosition}
                    duration={this.state.previewDuration}
                />
            </AudioViewerContainer>
        );
    };

    /*
     * This is used to grab a sound bite from a youtube video
     */
    renderYoutubeUrlInput() {
        if (this.state.sound || this.state.selectingPlaylist) {
            return;
        }
        return (
            <YoutubeInputContainer showContainer={true}>
                {!this.state.videoUrlLink ? (
                    <HugeTextContainer>
                        <ImageIcon src='https://storage.googleapis.com/blerp_products/create%20bulb.svg' />
                        <BoldTextNoHover>Create</BoldTextNoHover>
                        <BoldTextNoHoverNoColor>a Blerp</BoldTextNoHoverNoColor>
                    </HugeTextContainer>
                ) : (
                    <React.Fragment>
                        <HugeTextContainer>
                            <BoldTextNoHoverNoColor>
                                Trim Sound
                            </BoldTextNoHoverNoColor>
                        </HugeTextContainer>
                    </React.Fragment>
                )}
                <Borderline />
                {(!this.state.videoUrlLink || this.state.sound) && (
                    <React.Fragment>
                        <YTLabel>
                            You can make a Blerp from a supported video site:
                        </YTLabel>
                        <VideoRowContainer>
                            <VideoIconImage src='https://storage.googleapis.com/blerp_products/Web/creation_page/youtube%20grey.svg' />
                            <VideoIconImage src='https://storage.googleapis.com/blerp_products/Web/creation_page/vimeo%20grey.svg' />
                            <VideoIconImage src='https://storage.googleapis.com/blerp_products/Web/creation_page/sound%20cloud%20grey.svg' />
                            <VideoIconImageSquare src='https://storage.googleapis.com/blerp_products/Web/creation_page/facebook%20grey.svg' />
                            <VideoIconImageSquare src='https://storage.googleapis.com/blerp_products/Web/creation_page/twitter%20grey.svg' />
                            <VideoIconImageSquare src='https://storage.googleapis.com/blerp_products/Web/creation_page/twitch%20grey.svg' />
                        </VideoRowContainer>
                    </React.Fragment>
                )}

                {/* <YTLabel>
          Not seeing the source you want? <Link href="https://discord.gg/cWKgdem" target="_blank">Request new source.</Link>
        </YTLabel> */}

                <YTTextField
                    name='upload-sound-url-input'
                    type='text'
                    placeholder='Enter valid video URL'
                    onChange={this.handleURLChange}
                    value={this.state.videoUrlLink}
                    error={false}
                />

                {(!this.state.videoUrlLink || this.state.sound) && (
                    <SecondLabel>
                        *Providers can block us and sometimes you may need to
                        try later
                    </SecondLabel>
                )}

                {/*TODO: do real error checking*/}
                {this.renderYoutubeAudioPreview()}
            </YoutubeInputContainer>
        );
    }

    /*
     * This is used to select start and end time for a youtube url input
     */
    renderYoutubeAudioPreview() {
        // NOTE: Only render youtube screen if tehre is a youtube link typed in or if we didn't use drag and drop sound
        if (!this.state.videoUrlLink || this.state.sound) {
            return;
        }
        return (
            <TwoVideoContainer>
                <ReactPlayerViewer
                    onFinishedSelection={this.finishedAudioSelection}
                    onCancel={this.startOver}
                    videoUrl={this.state.videoUrlLink}
                    endTime={this.state.previewEndPosition}
                    startTime={this.state.previewStartPosition}
                    videoDuration={this.state.previewDuration}
                    showSubmitButton={!this.state.audioSelectionFinished}
                />
                {/* {this.state.showJustVideo ? (
          <TwoVideoContainerColumn>
            <SecondaryButton onClick={this.onShowVideo(false)}>
              Hide Video Preview
            </SecondaryButton>
            <JustVideo
              onFinishedSelection={this.finishedAudioSelection}
              onCancel={this.startOver}
              videoUrl={this.state.videoUrlLink}
              endTime={this.state.previewEndPosition}
              startTime={this.state.previewStartPosition}
              videoDuration={this.state.previewDuration}
              showSubmitButton={!this.state.audioSelectionFinished}
            />
          </TwoVideoContainerColumn>
        ) : (
          <StyledSecButton onClick={this.onShowVideo(true)}>
            Full Video Preview
          </StyledSecButton>
        )} */}
            </TwoVideoContainer>
        );
    }

    getSelectedIndex = () => {
        if (
            (this.state.sound || this.state.videoUrlLink) &&
            !this.state.audioSelectionFinished
        ) {
            return 1;
        } else if (
            (this.state.sound || this.state.videoUrlLink) &&
            this.state.audioSelectionFinished &&
            !this.state.selectingPlaylist
        ) {
            return 2;
        } else if (this.state.selectingPlaylist) {
            return 3;
        } else {
            return 0;
        }
    };

    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
            },
        };

        return this.state.loading ? (
            <AnimationContainer>
                <Lottie options={defaultOptions} height={480} width={480} />
            </AnimationContainer>
        ) : (
            <OverallPageContainer>
                <PageContainer>
                    <H1Container>
                        <H1>
                            {!this.state.selectingPlaylist ? (
                                this.state.sound || this.state.videoUrlLink ? (
                                    !this.state.audioSelectionFinished &&
                                    !this.state.videoUrlLink ? (
                                        <React.Fragment>
                                            <HugeTextContainer>
                                                <ImageIcon src='https://storage.googleapis.com/blerp_products/create%20bulb.svg' />
                                                <BoldTextNoHover>
                                                    Create
                                                </BoldTextNoHover>
                                                <BoldTextNoHoverNoColor>
                                                    a Blerp
                                                </BoldTextNoHoverNoColor>
                                            </HugeTextContainer>
                                            <Borderline />
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            {/* <HugeTextContainer>
                        <ImageIcon src="https://storage.googleapis.com/blerp_products/create%20bulb.svg" />
                        <BoldTextNoHover>Create</BoldTextNoHover>
                        <BoldTextNoHoverNoColor>a Blerp</BoldTextNoHoverNoColor>
                      </HugeTextContainer>
                      <Borderline /> */}
                                        </React.Fragment>
                                    )
                                ) : (
                                    <React.Fragment>
                                        {/* <HugeTextContainer>
                      <ImageIcon src="https://storage.googleapis.com/blerp_products/create%20bulb.svg" />
                      <BoldTextNoHover>Create</BoldTextNoHover>
                      <BoldTextNoHoverNoColor>a Blerp</BoldTextNoHoverNoColor>
                    </HugeTextContainer>
                    <Borderline /> */}
                                    </React.Fragment>
                                )
                            ) : !this.state.creatingNewBoard ? (
                                <ExtraPadding>
                                    <BoldTextNoHoverNoColor>
                                        Add to Board
                                    </BoldTextNoHoverNoColor>
                                    <Borderline />
                                </ExtraPadding>
                            ) : (
                                <div />
                            )}
                        </H1>
                    </H1Container>

                    <FlexibleContainer>
                        {this.renderYoutubeUrlInput()}
                        {this.renderAudioMetaScreen()}
                    </FlexibleContainer>

                    {!this.state.selectingPlaylist && (
                        <ModalButtonContainer>
                            <ButtonContainer>
                                <LeftButtonModal
                                    onClick={this.props.onResetClick}
                                >
                                    <SmallImageIcon src='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_White_Left.svg' />
                                </LeftButtonModal>
                            </ButtonContainer>
                            {this.state.videoUrlLink &&
                                this.state.audioSelectionFinished && (
                                    <ButtonContainer>
                                        <ModalButtonRight
                                            onClick={this.goToPlaylistAdding}
                                        >
                                            <SmallImageIcon src='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_White_Right.svg' />
                                        </ModalButtonRight>
                                    </ButtonContainer>
                                )}

                            {((this.state.videoUrlLink &&
                                this.state.audioSelectionFinished) ||
                                (this.state.sound &&
                                    this.state.audioSelectionFinished)) && (
                                <ButtonContainer>
                                    <ModalButtonRight
                                        onClick={this.goToPlaylistAdding}
                                    >
                                        <SmallImageIcon src='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_White_Right.svg' />
                                    </ModalButtonRight>
                                </ButtonContainer>
                            )}
                        </ModalButtonContainer>
                    )}

                    {this.renderPlaylistScreen()}

                    {!this.state.sound &&
                        !this.state.videoUrlLink &&
                        !this.state.selectingPlaylist && (
                            <LineImg
                                src={
                                    "https://storage.googleapis.com/blerp-public-images/backgrounds/or-line.svg"
                                }
                                alt='Line spacer image'
                            />
                        )}

                    {this.renderAudioInput()}
                    {this.renderAudioViewerPreview()}

                    {!(
                        !this.state.sound &&
                        !this.state.videoUrlLink &&
                        !this.state.selectingPlaylist
                    ) ? (
                        <SecondLabel>
                            {/* Contact us by{" "}
              <Link href="/connect-with-us/contact" target="_blank">
                email
              </Link>{" "}
              or{" "}
              <Link href="https://discord.gg/cWKgdem" target="_blank">
                discord
              </Link>! */}
                        </SecondLabel>
                    ) : (
                        <SecondLabel>
                            You can use a download site{" "}
                            <Link
                                rel='nofollow'
                                href='https://clipr.xyz/'
                                target='_blank'
                            >
                                twitch (https://clipr.xyz/)
                            </Link>{" "}
                            or{" "}
                            <Link
                                rel='nofollow'
                                href='https://ytmp3.cc'
                                target='_blank'
                            >
                                youtube (https://ytmp3.cc)
                            </Link>{" "}
                            and conversion tools{" "}
                            <Link
                                rel='nofollow'
                                href='https://www.onlinevideoconverter.com/convert-mp4-to-mp3'
                                target='_blank'
                            >
                                (mp4-to-mp3)
                            </Link>{" "}
                            to get an audio file.
                        </SecondLabel>
                    )}
                </PageContainer>
                {/* <DotsIndicator
          numberOfSteps={4}
          selectedIndex={this.getSelectedIndex()}
        /> */}
                <SecondLabelTwo>
                    By creating this blerp I agree to Blerp's{" "}
                    <BlueLink rel='nofollow' href='/terms' target='_blank'>
                        Terms of Service
                    </BlueLink>
                    {" & "}
                    <BlueLink rel='nofollow' href='/privacy' target='_blank'>
                        Private Policy
                    </BlueLink>
                </SecondLabelTwo>
            </OverallPageContainer>
        );
    }
}

const addBiteFromYoutube = gql`
    mutation websiteBiteCreateByUpload(
        $audio: Upload!
        $image: Upload
        $title: String!
        $keywords: [String!]!
        $color: String!
        $visibility: Visibility
        $startTime: Int!
        $duration: Int!
        $description: String
        $userCategory: String
        $customCategory: String
        $author: String
        $album: String
        $userTranscription: String
        $playlistId: MongoID
    ) {
        web {
            biteCreateByUpload(
                record: {
                    image: $image
                    audio: $audio
                    title: $title
                    keywords: $keywords
                    color: $color
                    visibility: $visibility
                    startTime: $startTime
                    duration: $duration
                    userCategory: $userCategory
                    description: $description
                    customCategory: $customCategory
                    author: $author
                    album: $album
                    userTranscription: $userTranscription
                    playlistId: $playlistId
                }
            ) {
                _id
            }
        }
    }
`;

const addBiteFromURL = gql`
    mutation websiteBiteCreateByUrl(
        $url: URL!
        $title: String!
        $keywords: [String!]!
        $color: String!
        $image: Upload
        $startTime: Int!
        $duration: Int!
        $visibility: Visibility
        $description: String
        $userCategory: String
        $customCategory: String
        $author: String
        $album: String
        $userTranscription: String
        $playlistId: MongoID
    ) {
        web {
            biteCreateByYouTube(
                record: {
                    url: $url
                    title: $title
                    keywords: $keywords
                    color: $color
                    image: $image
                    startTime: $startTime
                    duration: $duration
                    visibility: $visibility
                    userCategory: $userCategory
                    description: $description
                    customCategory: $customCategory
                    author: $author
                    album: $album
                    userTranscription: $userTranscription
                    playlistId: $playlistId
                }
            ) {
                _id
            }
        }
    }
`;

export default compose(
    withLogging,
    graphql(addBiteFromURL, {
        name: "createBiteFromURL",
    }),
    graphql(addBiteFromYoutube, {
        name: "createBiteFromUpload",
    }),
)(UploadDialog);
