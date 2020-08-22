/*
 * Blerp Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import "isomorphic-fetch";

import Router from "next/router";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { flowRight as compose } from "lodash";
import styled from "styled-components";

import Button from "../../components/buttons/button";
import { canUseDOM, ImageDropzone } from "./dropzones";
import LoadingFullScreen from "../../components/loading/loading-full-screen";
import Tag from "./tag";
import CategoryInput from "./CategoryInput";
import Toggler from "./Toggler";

import { allBlerpColors } from "../../lib/helperFunctions";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 60px;
    background-color: #fff;
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
`;

const FinalScreenContainer = styled.div`
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    display: flex;
    max-width: 520px;
`;

const RowStartJustify = styled.div`
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    display: flex;
    padding: 16px 0;
`;

const ImageSelectorContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-flow: column;
    position: relative;
`;

const MetadataContainer = styled.div`
    display: flex;
    flex-flow: column;
    min-width: 320px;
`;

const H1 = styled.h1`
    color: rgba(0, 0, 0, 1);
    text-align: center;
`;

const Label = styled.label`
    font-weight: 600;
    padding: 8px 0;
    color: ${props => props.theme.gray};
`;

const WhiteText = styled.p`
    font-weight: bold;
    padding: 0;
    position: absolute;
    margin: 0;
    pointer-events: none;
    cursor: pointer;
    opacity: 0.8;
    color: ${props => props.theme.flyoutBackground};
`;

const TextField = styled.input`
    background-color: none;
    border: none;
    border-radius: 0;
    height: 32px;
    color: #000;
    font-size: inherit;
    margin-bottom: 12px;
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

const TagsContainer = styled.div`
    background-color: none;
    display: flex;
    flex-flow: row wrap;
    overflow-y: scroll;
    height: 80px;
    max-width: 320px;
    border: ${props => props.theme.placeholderText} solid 2px;
    border-radius: 4px;
`;

const TagsTextField = styled.input`
    background-color: none;
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
`;

const ButtonContainer = styled.div`
    padding: 12px;
`;

const ModalButtonRight = styled.button`
    position: absolute;
    top: 50%;
    right: -20px;
    margin: 4px;
    width: 48px;
    height: 48px;
    border-radius: 100px;
    position: absolute;
    top: 50%;
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

const ModalButton = styled(Button)`
    background-color: rgba(56, 56, 56, 1);
    color: rgba(255, 255, 255, 1);
    height: 32px;
    border-radius: 0;
    margin: 16px;
`;

const BoldTextNoHover = styled.div`
    font-weight: normal;
    font-size: 32px;
    color: ${props => props.theme.secondaryText};
    text-align: left;
    margin: 8px;
    text-align: center;
    font-size: 20px;
    width: 100%;
`;

const Borderline = styled.div`
    width: 100%;
    margin: 8px;
    height: 1px;
    border-bottom: 1px solid ${props => props.theme.defaultBackground};
`;

const StyleSelect = styled.select`
    background-color: ${props => props.theme.flyoutBackground};
    margin: 4px;
    max-width: 200px;
    border-width: 2px;
    border-radius: 6px;
    color: ${props => props.theme.invertFlyoutBackground};
    border-color: ${props => props.theme.placeholderText};
`;

const LeftButtonModal = styled.button`
    position: absolute;
    top: 50%;
    left: -20px;
    margin: 4px;
    width: 48px;
    height: 48px;
    border-radius: 100px;
    background-color: ${props => props.theme.darkBackground};
    border: none;
    z-index: 1000;
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

const SmallImageIcon = styled.img`
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
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

const defaultState = {
    audioSelectionFinished: false,
    description: "",
    errorDescription: false,
    errorTitle: false,
    author: "",
    errorAuthor: "",
    image: undefined,
    loading: false,
    noMoreBoards: false,
    selectedBackground:
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
    sound: undefined,
    soundURL: undefined,
    tagInput: "",
    tags: [],
    title: "",
    visibility: Visibility.PUBLIC,
    boardCategory: null,
};

// interface Props {
//   useRandomColor?: boolean;
//   createBite?: any;
//   createBiteFromURL?: any;
// }

// interface State {
//   audioSelectionFinished: boolean;
//   image: File | undefined;
//   sound: File | undefined;
//   soundURL: string | undefined;
//   tags: string[];
//   tagInput: string;
//   noMoreBoards: boolean;
//   selectedBackground: string;
//   title: string;
//   description: string;
//   loading: boolean;
//   errorTitle: boolean;
//   errorDescription: boolean;
//   visibility: Visibility;
// }

class CreateBoard extends React.Component {
    static defaultProps = {
        useRandomColor: true,
    };
    tagInputField;
    state;

    constructor(props) {
        super(props);
        this.state = defaultState;
    }

    goBackToCreate = () => {
        Router.push(`/upload`);
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

    handleSubmit = async () => {
        if (!this.state.tags.length) {
            // TODO: Make Proper UI For This
            alert(
                "Tags are required for submission (Hint: you need to press enter after typing)",
            );
            return;
        } else if (!this.state.title) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Title is required for submission");
            return;
        } else if (this.state.title.length > 60) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your title must be 60 characters or less");
            return;
        } else if (this.state.description.length > 200) {
            // TODO: Make Proper UI For This
            this.setState({ errorDescription: true });
            alert("Your description must be 200 characters or less");
            return;
        }

        this.setState({ loading: true });

        try {
            const result = await this.props.createBoardForWeb({
                variables: {
                    record: {
                        title: this.state.title,
                        audienceRating: "UR",
                        author: this.state.author,
                        visibility: this.state.visibility,
                        userKeywords: this.state.tags,
                        image: this.state.image,
                        description: this.state.description,
                        userCategory:
                            this.state.boardCategory &&
                            this.state.boardCategory.value,
                    },
                },
            });

            if (
                result.data.errors ||
                !result.data.web.playlistCreate.recordId
            ) {
                // TODO: Make Proper UI For This
                this.setState({ loading: false });
                alert(result.data.error[0].message);
                if (this.props.onResetClickOverride) {
                    this.props.onResetClickOverride();
                }
                return;
            } else {
                if (
                    this.props.onBoardCreated &&
                    result.data &&
                    result.data.web.playlistCreate
                ) {
                    this.props.onBoardCreated({
                        boardId: result.data.web.playlistCreate.record._id,
                    });
                } else {
                    Router.push(
                        `/soundboard?id=${result.data.web.playlistCreate.recordId}`,
                        `/soundboard/${result.data.web.playlistCreate.recordId}`,
                    );
                }
            }
        } catch (error) {
            // TODO: Make Proper UI For This
            this.setState({ loading: false, noMoreBoards: true });
            alert(error);
            return;
        }
    };

    handleCategoryChange = category => {
        this.setState({
            boardCategory: category,
        });
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

    handleTitleChange = event => {
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;

        this.setState({ title: value, errorTitle: false });
    };

    handleDescriptionChange = event => {
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;

        this.setState({ description: value, errorDescription: false });
    };

    handleAuthorChange = event => {
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;
        this.setState({ author: value, errorAuthor: false });
    };

    handleTagInput = event => {
        const target = event.currentTarget;
        const value = target.value;

        this.setState({ tagInput: value });
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

    handleOnClickTagBox = () => {
        this.tagInputField.focus();
    };

    handleTagCancel = (_, key) => {
        const arrayCopy = this.state.tags;
        arrayCopy.splice(key, 1);
        this.setState({ tags: arrayCopy });
        this.tagInputField.focus();
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

    handleVisibilitySelect = ({ newToggleState }) => {
        this.setState({ visibility: newToggleState ? "UNLISTED" : "PUBLIC" });
    };

    onHandleTagRef = input => {
        this.tagInputField = input;
    };

    renderAudioMetaScreen() {
        return (
            <FinalScreenContainer>
                {/* Image Selection Occurs in this container */}
                <MetadataContainer>
                    <Label>Board Title</Label>
                    <TextField
                        name='boardTitle'
                        type='text'
                        placeholder='Title (100 Characters Max)'
                        onChange={this.handleTitleChange}
                        error={this.state.errorTitle}
                    />
                    <FinalScreenContainer>
                        <ImageSelectorContainer>
                            <WhiteText>Upload Image</WhiteText>
                            {canUseDOM() && (
                                <ImageDropzone
                                    multiple={false}
                                    accept='image/*'
                                    color={
                                        this.props.useRandomColor
                                            ? this.state.selectedBackground
                                            : "#53A9FF"
                                    }
                                    imageURL={
                                        this.state.image &&
                                        URL.createObjectURL(this.state.image)
                                    }
                                    onDrop={this.handleImageDrop}
                                />
                            )}
                        </ImageSelectorContainer>
                        <MetadataContainer>
                            <Label>Author, Speaker, or Item</Label>
                            <TextField
                                name='boardAuthor'
                                type='text'
                                placeholder='Who or what said it?'
                                onChange={this.handleAuthorChange}
                                error={this.state.errorAuthor}
                            />
                            <Label>Tags</Label>
                            <TagsContainer onClick={this.handleOnClickTagBox}>
                                {this.state.tags.map((tag, index) =>
                                    this.renderTag(tag, index),
                                )}
                                <TagsTextField
                                    type='text'
                                    ref={this.onHandleTagRef}
                                    value={this.state.tagInput}
                                    onBlur={this.onBlur}
                                    onKeyDown={this.handleTagKeyDown}
                                    onChange={this.handleTagInput}
                                    error={false}
                                />
                                {/*TODO: do real error checking*/}
                            </TagsContainer>
                        </MetadataContainer>
                    </FinalScreenContainer>
                    <Borderline />
                    <BoldTextNoHover>Optional</BoldTextNoHover>

                    <RowStartJustify>
                        <Label>Make board private</Label>
                        <Toggler
                            toggleState={this.state.visibility === "UNLISTED"}
                            onChange={this.handleVisibilitySelect}
                        />
                    </RowStartJustify>

                    {/* <StyleSelect
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

                    <Label>Description (200 Characters Max)</Label>

                    <TextField
                        name='boardDescription'
                        type='text'
                        placeholder='Anything you want to say about this board?'
                        onChange={this.handleDescriptionChange}
                        error={this.state.errorDescription}
                    />

                    <CategoryInput
                        onCategoryClick={this.handleCategoryChange}
                        selectedCategory={
                            this.state.boardCategory &&
                            this.state.boardCategory.category
                        }
                        categories={[
                            "Movie",
                            "Texting",
                            "Sound Effects",
                            "Nature",
                            "Animal",
                            "Gaming",
                            "Book",
                            "Podcast",
                            "Mad",
                            "Funny",
                            "Celebrity",
                            "Music",
                        ]}
                    />

                    <ModalButtonContainer>
                        <ButtonContainer>
                            <LeftButtonModal onClick={this.props.onResetClick}>
                                <SmallImageIcon src='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_White_Left.svg' />
                            </LeftButtonModal>
                        </ButtonContainer>
                        <ButtonContainer>
                            <ModalButtonRight onClick={this.handleSubmit}>
                                <SmallImageIcon src='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_White_Right.svg' />
                            </ModalButtonRight>
                        </ButtonContainer>
                    </ModalButtonContainer>
                </MetadataContainer>
            </FinalScreenContainer>
        );
    }

    render() {
        if (this.state.noMoreBoards) {
            return <PageContainer>{/* <NoMoreBoards /> */}</PageContainer>;
        }

        return this.state.loading ? (
            <LoadingFullScreen />
        ) : (
            <PageContainer>
                <H1>New Board</H1>
                <Borderline />
                {this.renderAudioMetaScreen()}
            </PageContainer>
        );
    }
}

const createBoard = gql`
    mutation createSoundboardFromWeb($record: CreateOnePlaylistInput!) {
        web {
            playlistCreate(record: $record) {
                record {
                    _id
                    title
                }
                recordId
            }
        }
    }
`;

export default compose(graphql(createBoard, { name: "createBoardForWeb" }))(
    CreateBoard,
);
