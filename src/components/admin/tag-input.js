/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { keyframes } from "styled-components";
import Tag from "../shared/Tag";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    disabledText,
    iconsActive,
} from "../../styles/colors";

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
    height: 300px;
    padding: 8px;
`;

const TagsTextField = styled(TextField)`
    flex: 2 0 auto;
`;

class TagsInput extends React.Component {
    props;
    state;
    tagInputField;

    constructor(props) {
        super(props);
        this.state = {
            tags: props.defaultTags || [],
            tagInput: "",
        };
    }

    handleOnClickTagBox = () => {
        this.tagInputField.focus();
    };

    handleTagCancel = (_, key) => {
        const arrayCopy = this.state.tags;
        arrayCopy.splice(key, 1);
        this.props.updateTagState({ tagsArray: arrayCopy });
        this.setState({ tags: arrayCopy });
        this.tagInputField.focus();
    };

    onHandleTagRef = input => {
        this.tagInputField = input;
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
                const newTags = [...this.state.tags, ...splitInput];
                this.setState({ tags: newTags });
                this.props.updateTagState({ tagsArray: newTags });
            }
            this.setState({ tagInput: "" });
        } else if (event.key === "Backspace") {
            if (this.state.tags.length > 0 && value.length === 0) {
                const arrayCopy = this.state.tags.slice(0, -1);
                this.setState({ tags: arrayCopy });
                this.props.updateTagState({ tagsArray: arrayCopy });
            }
        }
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

    render() {
        return (
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
        );
    }
}

export default TagsInput;
