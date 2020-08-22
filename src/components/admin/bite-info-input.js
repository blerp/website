/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { keyframes } from "styled-components";

import TextInput from "../inputs/text-input";
import RectangleTextButton from "../buttons/rectangle-text-button";
import TagsInput from "./tag-input";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    disabledText,
    iconsActive,
} from "../../styles/colors";

const animateTranslate = keyframes`
  0% {
    opacity: 0;
  }

  25% {
  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 1;
  }
`;

const AnimateContainer = styled.div`
    animation: ${animateTranslate} 1.2s 1;
`;

const AdminBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    border-radius: 6px;
    margin: 8px;
    border-radius: 6px;
    background-color: ${flyoutBackground};
`;

const Body = styled.div`
    position: relative;
    height: 100%;
    border-radius: 6px;
`;

const AdminContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const LoginButtonContainer = styled.div`
    align-self: center;
    margin: 8px;
`;

const Label = styled.label`
    font-weight: bold;
    padding: 8px 0;
`;

const CuratedCircle = styled.div`
    width: 26px;
    height: 24px;
    background-color: ${props =>
        props.isCurated ? props.theme.seafoam : props.theme.darkGray};
    border-radius: 50%;
    margin-left: 10px;
`;

// TODO: add other types
const VisibilityOptions = [
    { text: "Public", value: "PUBLIC" },
    { text: "Unlisted", value: "UNLISTED" },
];

const AudienceRating = {
    G: "G",
    PG: "PG",
    PG13: "PG13",
    R: "R",
    NC17: "NC17",
    UR: "UR",
};

// TODO: add other types
const AudienceRatingOptions = [
    { text: "G", value: AudienceRating.G },
    { text: "PG", value: AudienceRating.PG },
    { text: "PG13", value: AudienceRating.PG13 },
    { text: "R", value: AudienceRating.R },
    { text: "NC17", value: AudienceRating.NC17 },
    { text: "UR", value: AudienceRating.UR },
];

class BiteInfoInput extends React.Component {
    props;
    state;

    constructor(props) {
        super(props);
        this.state = {
            title: props.title || "",
            visibility: props.visibility || "PUBLIC",
            audienceRating: props.audienceRating || "",
            tags: props.defaultTags || [],
            audioTextTranscription: props.audioTextTranscription || "",
            author: props.author,
            userCategory: props.userCategory,
            description: props.description,
            isCurated: props.isCurated,
        };
    }

    handleSubmitInfo = () => {
        this.props.handleSubmitInfo({
            title: this.state.title,
            audienceRating: this.state.audienceRating,
            visibility: this.state.visibility,
            tags: this.state.tags,
            audioTextTranscription: this.state.audioTextTranscription,
            author: this.state.author,
            userCategory: this.state.userCategory,
            description: this.state.description,
        });
    };

    handleVisibilitySelect = event => {
        this.setState({ visibility: event.target.value });
    };

    handleTagsUpdate = ({ tagsArray }) => {
        this.setState({ tags: tagsArray });
    };

    handleAudienceSelect = event => {
        this.setState({ audienceRating: event.target.value });
    };

    handleTitleChange = event => {
        this.setState({
            title: event.target.value,
        });
    };

    handleDescriptionChange = event => {
        this.setState({
            description: event.target.value,
        });
    };

    handleAuthorChange = event => {
        this.setState({
            author: event.target.value,
        });
    };
    handleUserCategoryChange = event => {
        this.setState({
            userCategory: event.target.value,
        });
    };

    handleAudioTextChange = event => {
        this.setState({
            audioTextTranscription: event.target.value,
        });
    };

    render() {
        return (
            <AdminBoxContainer>
                <Body>
                    <AdminContent>
                        <AnimateContainer>
                            <Label>
                                {this.props.isCurated
                                    ? "Curated"
                                    : "Not yet curated"}
                            </Label>
                            <CuratedCircle
                                style={{
                                    position: "absolute",
                                    right: "0",
                                    top: "0",
                                }}
                                isCurated={this.props.isCurated}
                            />
                            <TextInput
                                key={this.props.title}
                                placeholder='Blerp Title'
                                onTextChange={this.handleTitleChange}
                                errorMessage={this.props.titleErrorMessage}
                                value={this.state.title}
                            />
                        </AnimateContainer>
                        <AnimateContainer>
                            <TextInput
                                key={this.props.author}
                                placeholder='Author'
                                onTextChange={this.handleAuthorChange}
                                errorMessage={this.props.authorErrorMEssage}
                                value={this.state.author}
                            />
                        </AnimateContainer>
                        <AnimateContainer>
                            <TextInput
                                key={this.props.description}
                                placeholder='Description'
                                onTextChange={this.handleDescriptionChange}
                                errorMessage={
                                    this.props.descriptionErrorMessage
                                }
                                value={this.state.description}
                            />
                        </AnimateContainer>
                        {this.props.isModerator && (
                            <AnimateContainer>
                                <TextInput
                                    key={this.props.userCategory}
                                    placeholder='Category'
                                    onTextChange={this.handleUserCategoryChange}
                                    errorMessage={this.props.userCategoryError}
                                    value={this.state.userCategory}
                                />
                            </AnimateContainer>
                        )}
                        {this.props.isModerator && (
                            <AnimateContainer>
                                <TextInput
                                    placeholder='Audio Text Transcription'
                                    onTextChange={this.handleAudioTextChange}
                                    errorMessage={
                                        this.props.audioTextErrorMessage
                                    }
                                    value={this.state.audioTextTranscription}
                                />
                            </AnimateContainer>
                        )}
                        <Label>Tags</Label>
                        <TagsInput
                            key={this.props.defaultTags.join("-")}
                            defaultTags={this.props.defaultTags}
                            updateTagState={this.handleTagsUpdate}
                        />
                        <Label>Visibility</Label>
                        <select
                            key={this.props.visibility}
                            defaultValue={this.props.visibility}
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
                        {this.props.isModerator && (
                            <React.Fragment>
                                <Label>Audience Rating</Label>
                                <select
                                    key={this.props.audienceRating}
                                    value={this.state.audienceRating}
                                    defaultValue={this.props.audienceRating}
                                    onChange={this.handleAudienceSelect}
                                >
                                    {AudienceRatingOptions.map(audi => {
                                        return (
                                            <option
                                                key={audi.value}
                                                value={audi.value}
                                            >
                                                {audi.text}
                                            </option>
                                        );
                                    })}
                                </select>
                            </React.Fragment>
                        )}
                        <LoginButtonContainer>
                            <RectangleTextButton
                                text={
                                    this.props.finishedUpdating
                                        ? "Successfully Updated!"
                                        : "Update Blerp"
                                }
                                backgroundColor={pandaPink}
                                onClick={this.handleSubmitInfo}
                            />
                        </LoginButtonContainer>
                    </AdminContent>
                </Body>
            </AdminBoxContainer>
        );
    }
}

export default BiteInfoInput;
