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

import { flowRight as compose } from "lodash";
import styled from "styled-components";

import Button from "../buttons/button";
import { canUseDOM, ImageDropzone } from "../upload/dropzones";
import LoadingFullScreen from "../loading/loading-full-screen";
import Tag from "../shared/Tag";

import { allBlerpColors } from "../../lib/helperFunctions";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const FinalScreenContainer = styled.div`
    flex-flow: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-bottom: 100px;
`;

const ImageSelectorContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    flex-flow: column;
`;

const MetadataContainer = styled.div`
    display: flex;
    flex-flow: column;
    padding: 12px;
    width: 400px;
`;

const H1 = styled.h1`
    color: rgba(0, 0, 0, 1);
    text-align: center;
    margin-top: 60px;
`;

const Label = styled.label`
    font-weight: 400;
    padding: 8px 0;
    color: ${props => props.theme.gray};
`;

const TextField = styled.input`
    background-color: rgba(234, 234, 234, 1);
    border: none;
    height: 32px;
    color: #000;
    font-size: inherit;
    padding-left: 5px;
    padding-right: 5px;
    outline: 3px solid
        ${props =>
            props.error ? "rgba(200, 20, 20, 1)" : "rgba(200, 20, 20, 0)"};
`;

const TagsContainer = styled.div`
    background-color: rgba(234, 234, 234, 1);
    display: flex;
    flex-flow: row wrap;
    overflow-y: scroll;
    height: 60px;
`;

const TagsTextField = styled(TextField)`
    flex: 2 0 auto;
`;

const ModalButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ModalButton = styled(Button)`
    background-color: rgba(56, 56, 56, 1);
    color: rgba(255, 255, 255, 1);
    height: 32px;
    border-radius: 0;
    margin: 16px;
`;

const ColoredButton = styled(Button)`
    background-color: ${props => props.name};
    height: 32px;
    width: 32px;
    margin: 1px;
`;

const ColoredButtonContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 200px;
    margin-left: 10px;
    margin-right: 10px;
    justify-content: space-around;
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

    returnHome = () => {
        Router.push(`/`);
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
        } else if (this.state.author.length > 100) {
            // TODO: Make Proper UI For This
            this.setState({ errorTitle: true });
            alert("Your author must be 100 characters or less");
            return;
        }

        this.setState({ loading: true });

        try {
            const result = await this.props.createBoardForWeb({
                variables: {
                    record: {
                        title: this.state.title,
                        audienceRating: "PG",
                        visibility: this.state.visibility,
                        userKeywords: this.state.tags,
                        image: this.state.image,
                        color: this.state.selectedBackground,
                        description: this.state.description,
                    },
                },
            });

            if (result.data.errors || !result.data.web.boardCreate.recordId) {
                // TODO: Make Proper UI For This
                this.setState({ loading: false });
                alert(result.data.error[0].message);
                return;
            } else {
                Router.push(
                    `/beat?id=${result.data.web.boardCreate.recordId}`,
                    `/beat/${result.data.web.boardCreate.recordId}`,
                );
            }
        } catch (error) {
            // TODO: Make Proper UI For This
            this.setState({ loading: false, noMoreBoards: true });
            alert(error);
            return;
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

    handleVisibilitySelect = event => {
        this.setState({ visibility: event.target.value });
    };

    onHandleTagRef = input => {
        this.tagInputField = input;
    };

    renderAudioMetaScreen() {
        return (
            <FinalScreenContainer>
                {/* Image Selection Occurs in this container */}
                <ImageSelectorContainer>
                    {/* Keep the 'Preview' a Dropzone. This makes image uploading a semi-secret. */}
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
                    <ColoredButtonContainer>
                        {backgroundColors.map(color => {
                            return (
                                <ColoredButton
                                    key={color}
                                    name={color}
                                    onClick={this.handleBackgroundColorChange}
                                />
                            );
                        })}
                    </ColoredButtonContainer>
                </ImageSelectorContainer>
                <MetadataContainer>
                    <Label>Title (100 Characters Max)</Label>
                    <TextField
                        name='boardTitle'
                        type='text'
                        onChange={this.handleTitleChange}
                        error={this.state.errorTitle}
                    />
                    <Label>Description (200 Characters Max)</Label>
                    <TextField
                        name='boardDescription'
                        type='text'
                        onChange={this.handleDescriptionChange}
                        error={this.state.errorDescription}
                    />
                    <Label>Tags (Press enter to add new tag)</Label>
                    <TagsContainer onClick={this.handleOnClickTagBox}>
                        {this.state.tags.map((tag, index) =>
                            this.renderTag(tag, index),
                        )}
                        <TagsTextField
                            type='text'
                            ref={this.onHandleTagRef}
                            value={this.state.tagInput}
                            onKeyDown={this.handleTagKeyDown}
                            onChange={this.handleTagInput}
                            error={false}
                        />
                        {/*TODO: do real error checking*/}
                    </TagsContainer>
                    <Label>Visibility</Label>
                    <select
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
                    </select>
                    <ModalButtonContainer>
                        <ModalButton onClick={this.returnHome}>
                            Return Home
                        </ModalButton>
                        <ModalButton onClick={this.handleSubmit}>
                            Create
                        </ModalButton>
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
                <H1>Create a New Beat Board!!</H1>
                {this.renderAudioMetaScreen()}
            </PageContainer>
        );
    }
}

const createBoard = gql`
    mutation makeBoardForWeb($record: CreateOneBoardInput!) {
        web {
            boardCreate(record: $record) {
                recordId
            }
        }
    }
`;

export default compose(graphql(createBoard, { name: "createBoardForWeb" }))(
    CreateBoard,
);
