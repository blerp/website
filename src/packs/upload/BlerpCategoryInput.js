/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import {
    lightGray,
    pandaPink,
    focusState,
    bodyText,
    flyoutBackground,
} from "../../styles/colors";

const TagInput = styled.div`
    display: block;
    text-decoration: none;
    border: 2px ${props => (props.selected ? flyoutBackground : "transparent")}
        solid;
    color: ${props => (props.selected ? flyoutBackground : bodyText)};
    font-weight: lighter;
    padding: 8px 12px;
    background-color: ${props =>
        props.selected ? props.selectedColor : "transparent"};
    border-radius: 10px;
    height: ${props => (props.colored ? `auto` : `20px`)};
    margin: 0 8px 0 0;
    font-weight: lighter;
    cursor: pointer;

    &:focus {
        border: 1px ${pandaPink} solid;
        color: ${pandaPink};
    }

    &:hover {
        border: 1px ${pandaPink} solid;
        color: ${pandaPink};
    }
`;

const TagsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 16px;
`;

const Label = styled.label`
    font-weight: 400;
    padding: 8px 0;
    color: ${props => props.theme.gray};
`;

const TextField = styled.input`
    background-color: none;
    border: ${props => props.theme.placeholderText} solid 2px;
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

// interface Props {
//   children: React.ReactNode;
//   id?: any;
//   cancelable?: boolean;
//   colored?: boolean;
//   className?: string;
//   onCancel?: (event: any, key: any) => void;
// }

const defaultProps = {
    categories: ["Sound Effect", "Quote", "Song", "Other"],
    selectedCategory: null,
    colored: false,
    onCategoryClick: () => {},
    onCancel: (event, key) => {},
};

const Colors = {
    "Sound Effect": "#3507B4",
    Quote: "#27AAFF",
    Song: "#FFD400",
    Other: "#21000C",
};

export default class BlerpCategoryInput extends React.Component {
    static defaultProps = defaultProps;

    constructor(props) {
        super(props);
        this.state = {
            otherCategory: null,
            showOtherBox: false,
            errorOtherTitle: false,
        };
    }

    onCategoryClick = category => () => {
        const categoryValue = category
            .split(" ")
            .join("_")
            .toUpperCase();
        this.props.onCategoryClick({
            value: categoryValue,
            category: category,
        });
    };

    onOtherCategoryChange = event => {
        const target = event.currentTarget;
        const value = target.value || "";

        const otherValue = value
            .substring(0, 20)
            .split(" ")
            .join("_")
            .toUpperCase();
        this.props.onCategoryClick({ value: otherValue, category: "Other" });
        this.setState({ otherCategory: value });
    };

    render() {
        return (
            <React.Fragment>
                <Label>Category</Label>

                <TagsContainer>
                    {this.props.categories.map(category => {
                        return (
                            <TagInput
                                key={category}
                                onClick={this.onCategoryClick(category)}
                                selected={
                                    this.props.selectedCategory == category
                                }
                                selectedColor={Colors[category]}
                            >
                                {category}
                            </TagInput>
                        );
                    })}
                </TagsContainer>

                {this.props.selectedCategory == "Sound Effect" && (
                    <React.Fragment>
                        <Label>Description (200 Characters Max)</Label>
                        <TextField
                            name='blerpDescription'
                            type='text'
                            placeholder='Describes the sound.. is it from a movie, tv show, podcast?'
                            onChange={this.props.handleDescriptionChange}
                            value={this.props.description}
                        />

                        <Label>Phonetic Transcription (Optional)</Label>
                        <TextField
                            name='blerpTranscription'
                            type='text'
                            placeholder='Write out what you hear!'
                            onChange={this.props.handleTranscriptionChange}
                            value={this.props.userTranscription}
                        />
                    </React.Fragment>
                )}

                {this.props.selectedCategory == "Quote" && (
                    <React.Fragment>
                        <Label>Source (200 Characters Max)</Label>
                        <TextField
                            name='blerpDescription'
                            type='text'
                            placeholder='Where was it said? TV Show, Movie, Podcast.. etc?'
                            onChange={this.props.handleDescriptionChange}
                            value={this.props.description}
                        />

                        <Label>Transcription (Optional)</Label>
                        <TextField
                            name='blerpTranscription'
                            type='text'
                            placeholder='Write out what you hear!'
                            onChange={this.props.handleTranscriptionChange}
                            value={this.props.userTranscription}
                        />
                    </React.Fragment>
                )}

                {this.props.selectedCategory == "Song" && (
                    <React.Fragment>
                        <Label>Song Title or Album</Label>
                        <TextField
                            type='text'
                            onChange={this.props.handleAlbumChange}
                            placeholder='Where is the song from?'
                            value={this.props.album}
                        />
                        <Label>Description (200 Characters Max)</Label>
                        <TextField
                            name='blerpDescription'
                            type='text'
                            placeholder='Anything you want to say about this snippet?'
                            onChange={this.props.handleDescriptionChange}
                            value={this.props.description}
                        />
                        <Label>Transcription (Optional)</Label>
                        <TextField
                            name='blerpTranscription'
                            type='text'
                            placeholder='Write out what you hear!'
                            onChange={this.props.handleTranscriptionChange}
                            value={
                                this.props.userTranscription
                                    ? this.props.userTranscription
                                    : this.props.biteTitle
                            }
                        />
                    </React.Fragment>
                )}

                {this.props.selectedCategory == "Other" && (
                    <React.Fragment>
                        <Label>Category (30 Characters Max)</Label>
                        <TextField
                            type='text'
                            onChange={this.props.handleCustomCategoryChange}
                            error={this.state.errorOtherTitle}
                            placeholder='What topic best describes your blerp?'
                            value={this.props.customCategory}
                        />
                        <Label>Description (200 Characters Max)</Label>
                        <TextField
                            name='blerpDescription'
                            type='text'
                            placeholder='Describes where, what, or who the sound is from ie a movie, tv show, podcast'
                            onChange={this.props.handleDescriptionChange}
                            value={this.props.description}
                        />
                        <Label>Transcription (Optional)</Label>
                        <TextField
                            name='blerpTranscription'
                            type='text'
                            placeholder='Write out what you hear!'
                            onChange={this.props.handleTranscriptionChange}
                            value={this.props.userTranscription}
                        />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
