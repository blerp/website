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

const AdminLabel = styled.div`
    font-weight: bold;
    padding: 8px;
`;

const AnimateContainer = styled.div`
    animation: ${animateTranslate} 1.2s 1;
`;

const AdminBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
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

const AdminContentRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 16px;
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
    padding: 8px;
`;

// TODO: add other types
const VisibilityOptions = [
    { text: "Public", value: "PUBLIC" },
    { text: "Unlisted", value: "UNLISTED" },
];

const NumberQuality = [
    { text: "1 low", value: 1 },
    { text: 2, value: 2 },
    { text: "3 okay", value: 3 },
    { text: 4, value: 4 },
    { text: "5 high", value: 5 },
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
            userEmotion: props.userEmotion,
            userAudioQuality: props.userAudioQuality
                ? props.userAudioQuality
                : 3,
            countryValue: props.userLocale || "US",
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
            userEmotion: this.state.userEmotion,
            userAudioQuality: this.state.userAudioQuality,
            countryValue: this.state.countryValue,
        });
    };

    handleVisibilitySelect = event => {
        this.setState({ visibility: event.target.value });
    };

    handleAudioQualitySelect = event => {
        this.setState({ userAudioQuality: event.target.value });
    };

    handleCountrySelect = event => {
        this.setState({ countryValue: event.target.value });
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

    handleUserEmotionChange = event => {
        this.setState({
            userEmotion: event.target.value,
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
                        <AdminContentRow>
                            <AnimateContainer>
                                <AdminLabel>Blerp Title</AdminLabel>
                                <TextInput
                                    key={this.props.title}
                                    placeholder='Blerp Title'
                                    onTextChange={this.handleTitleChange}
                                    errorMessage={this.props.titleErrorMessage}
                                    value={this.state.title}
                                />
                            </AnimateContainer>
                            <AnimateContainer>
                                <AdminLabel>Author</AdminLabel>
                                <TextInput
                                    key={this.props.author}
                                    placeholder='Author'
                                    onTextChange={this.handleAuthorChange}
                                    errorMessage={this.props.authorErrorMEssage}
                                    value={this.state.author}
                                />
                            </AnimateContainer>
                        </AdminContentRow>
                        <AdminContentRow>
                            {this.props.isModerator && (
                                <AnimateContainer>
                                    <AdminLabel>Category</AdminLabel>
                                    <TextInput
                                        key={this.props.userCategory}
                                        placeholder='Category'
                                        onTextChange={
                                            this.handleUserCategoryChange
                                        }
                                        errorMessage={
                                            this.props.userCategoryError
                                        }
                                        value={this.state.userCategory}
                                    />
                                </AnimateContainer>
                            )}
                            {this.props.isModerator && (
                                <AnimateContainer>
                                    <AdminLabel>Audio Transcription</AdminLabel>
                                    <TextInput
                                        placeholder='Audio Text Transcription'
                                        onTextChange={
                                            this.handleAudioTextChange
                                        }
                                        errorMessage={
                                            this.props.audioTextErrorMessage
                                        }
                                        value={
                                            this.state.audioTextTranscription
                                        }
                                    />
                                </AnimateContainer>
                            )}
                        </AdminContentRow>

                        <AdminContentRow>
                            <AnimateContainer>
                                <AdminLabel>Description</AdminLabel>
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

                            <AnimateContainer>
                                <AdminLabel>Emotion</AdminLabel>
                                <TextInput
                                    key={this.props.userEmotion}
                                    placeholder='Emotional Word'
                                    onTextChange={this.handleUserEmotionChange}
                                    errorMessage={this.props.userEmotionErrorr}
                                    value={this.state.userEmotion}
                                />
                            </AnimateContainer>
                        </AdminContentRow>

                        <Label>Tags</Label>
                        <TagsInput
                            key={this.props.defaultTags.join("-")}
                            defaultTags={this.props.defaultTags}
                            updateTagState={this.handleTagsUpdate}
                        />

                        <AdminContentRow>
                            <AnimateContainer>
                                <Label>Visibility</Label>
                                <select
                                    key={this.props.visibility}
                                    defaultValue={this.props.visibility}
                                    value={this.state.visibility}
                                    onChange={this.handleVisibilitySelect}
                                >
                                    {VisibilityOptions.map(visi => {
                                        return (
                                            <option
                                                key={visi.value}
                                                value={visi.value}
                                            >
                                                {visi.text}
                                            </option>
                                        );
                                    })}
                                </select>
                            </AnimateContainer>

                            <AnimateContainer>
                                <Label>Audio Quality</Label>
                                <select
                                    key={this.props.userAudioQuality}
                                    defaultValue={this.props.userAudioQuality}
                                    value={this.state.userAudioQuality}
                                    onChange={this.handleAudioQualitySelect}
                                >
                                    {NumberQuality.map(num => {
                                        return (
                                            <option
                                                key={num.value}
                                                value={num.value}
                                            >
                                                {num.text}
                                            </option>
                                        );
                                    })}
                                </select>
                            </AnimateContainer>

                            <AnimateContainer>
                                {this.props.isModerator && (
                                    <React.Fragment>
                                        <Label>Audience Rating</Label>
                                        <select
                                            key={this.props.audienceRating}
                                            value={this.state.audienceRating}
                                            defaultValue={
                                                this.props.audienceRating
                                            }
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
                            </AnimateContainer>
                        </AdminContentRow>

                        <AdminContentRow>
                            <AnimateContainer>
                                <Label>Blerp Language/Country</Label>
                                <select
                                    key={this.props.userLocale}
                                    defaultValue={this.props.userLocale}
                                    value={this.state.countryValue}
                                    onChange={this.handleCountrySelect}
                                >
                                    {this.props.countryOptions.map(country => {
                                        return (
                                            <option
                                                key={country.value}
                                                value={country.value}
                                            >
                                                {country.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </AnimateContainer>
                        </AdminContentRow>

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
