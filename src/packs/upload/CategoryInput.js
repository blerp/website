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
} from "../../styles/colors";

const TagInput = styled.div`
    display: block;
    text-decoration: none;
    border: 2px ${props => (props.selected ? pandaPink : lightGray)} solid;
    color: ${props => (props.selected ? pandaPink : lightGray)};
    font-weight: lighter;
    padding: 8px 12px;
    background-color: transparent;
    border-radius: 10px;
    height: ${props => (props.colored ? `auto` : `20px`)};
    margin: 8px;
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
    categories: [],
    selectedCategory: null,
    colored: false,
    onCategoryClick: () => {},
    onCancel: (event, key) => {},
};

export default class CategoryInput extends React.Component {
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

    onOtherClick = () => {
        if (this.props.selectedCategory == "Other") {
            this.props.onCategoryClick({ value: "", category: "" });
        } else {
            this.props.onCategoryClick({ value: "OTHER", category: "Other" });
        }
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
                            >
                                {category}
                            </TagInput>
                        );
                    })}
                    <TagInput
                        onClick={this.onOtherClick}
                        selected={this.props.selectedCategory == "Other"}
                    >
                        Other
                    </TagInput>
                </TagsContainer>
                {this.props.selectedCategory == "Other" && (
                    <React.Fragment>
                        <Label>Custom Category (20 Characters Max)</Label>
                        <TextField
                            type='text'
                            onChange={this.onOtherCategoryChange}
                            error={this.state.errorOtherTitle}
                            placeholder='What topic best describes your soundboard?'
                        />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
