/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import * as React from "react";
import styled from "styled-components";

import TextInput from "../inputs/text-input";
import RectangleTextButton from "../buttons/rectangle-text-button";
const shortid = require("shortid");

const isBrowser = typeof window !== "undefined";

import {
    bodyText,
    flyoutBackground,
    ligherBackground,
    pandaPink,
    secondarySubtitleText,
    darkBlue,
} from "../../styles/colors";

const SubmitButtonContainer = styled.div`
    align-self: center;
    margin: 8px;
`;

const InputHeader = styled.p`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 20px;
    text-align: center;
`;

const BlogForm = styled.div`
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
`;

const BlogFormInputContainer = styled.div`
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
`;

const EditorContainer = styled.div`
    border: 1px solid gray;
    min-height: 400px;
    min-width: 600px;
`;

class Page extends React.Component {
    props;
    state;
    ReactQuill;

    constructor(props) {
        super(props);
        if (isBrowser) {
            this.ReactQuill = require("react-quill");
        }

        if (props.blogPost) {
            this.state = {
                blogTitle: props.blogPost.title,
                subtitle: props.blogPost.subtitle,
                metaTitle: props.blogPost.metaTitle,
                metaDescription: props.blogPost.metaDescription,
                metaPageKeywords: props.blogPost.metaPageKeywords
                    ? props.blogPost.metaPageKeywords.join(",")
                    : "",
                blerpId: props.blogPost.biteId,
                giphyId: props.blogPost.giphyId ? props.blogPost.giphyId : "",
                blogTags: props.blogPost.tags
                    ? props.blogPost.tags.join(",")
                    : "",
                creatorName: props.blogPost.creatorName,
                publisherName: props.blogPost.publisherName,
                blogContent: props.blogPost.content,
            };
        } else {
            this.state = {
                blogTitle: "",
                subtitle: "",
                metaTitle: "",
                metaDescription: "",
                metaPageKeywords: "",
                blerpId: "",
                giphyId: "",
                blogTags: "",
                creatorName: "",
                publisherName: "",
                blogContent: "",
            };
        }
    }

    handleBlogTitleChange = event => {
        this.setState({ blogTitle: event.target.value });
    };

    handleSubtitleChange = event => {
        this.setState({ subtitle: event.target.value });
    };

    handleMetaTitleChange = event => {
        this.setState({ metaTitle: event.target.value });
    };

    handleMetaDescriptionChange = event => {
        this.setState({ metaDescription: event.target.value });
    };

    handleMetaKeywordsChange = event => {
        this.setState({ metaPageKeywords: event.target.value });
    };

    handleBlerpIdChange = event => {
        this.setState({ blerpId: event.target.value });
    };

    handleGiphyIdChange = event => {
        this.setState({ giphyId: event.target.value });
    };

    handleBlogTags = event => {
        this.setState({ blogTags: event.target.value });
    };

    handleCreatorNameChange = event => {
        this.setState({ creatorName: event.target.value });
    };

    handlePublisherNameChange = event => {
        this.setState({ publisherName: event.target.value });
    };

    handleBlogContentChange = value => {
        this.setState({ blogContent: value });
    };

    handleSubmitClick = async () => {
        const newId = shortid.generate();

        const blogPostRecord = {
            id: this.props.blogPost ? this.props.blogPost.id || newId : newId, // Only generate new id if id doesn't exist
            title: this.state.blogTitle,
            subtitle: this.state.subtitle,
            metaTitle: this.state.metaTitle,
            metaDescription: this.state.metaDescription,
            metaPageKeywords: this.state.metaPageKeywords
                ? this.state.metaPageKeywords.split(",")
                : [],
            biteId: this.state.blerpId,
            giphyId: this.state.giphyId,
            tags: this.state.blogTags ? this.state.blogTags.split(",") : [],
            creatorName: this.state.creatorName,
            publisherName: this.state.publisherName,
            content: this.state.blogContent,
        };

        this.props.handleSubmitClick(blogPostRecord);
    };

    render() {
        const ReactQuill = this.ReactQuill;

        return (
            <BlogForm>
                <BlogFormInputContainer>
                    <InputHeader>{"Blog Title"}</InputHeader>
                    <TextInput
                        placeholder='Blog Title'
                        onTextChange={this.handleBlogTitleChange}
                        errorMessage={""}
                        value={this.state.blogTitle}
                    />
                    <InputHeader>{"Blog Subtitle"}</InputHeader>
                    <TextInput
                        placeholder='Subtitle'
                        onTextChange={this.handleSubtitleChange}
                        errorMessage={""}
                        value={this.state.subtitle}
                    />
                    <InputHeader>{"Blog Tags (Comma Seperated)"}</InputHeader>
                    <TextInput
                        placeholder='Categories, Keywords, Tags'
                        onTextChange={this.handleBlogTags}
                        errorMessage={""}
                        value={this.state.blogTags}
                    />
                    <InputHeader>{"Metadata: Title"}</InputHeader>
                    <TextInput
                        placeholder='Metadata title'
                        onTextChange={this.handleMetaTitleChange}
                        errorMessage={""}
                        value={this.state.metaTitle}
                    />
                    <InputHeader>
                        {"Metadata: Description (Optional)"}
                    </InputHeader>
                    <TextInput
                        placeholder='Metadata description'
                        onTextChange={this.handleMetaDescriptionChange}
                        errorMessage={""}
                        value={this.state.metaDescription}
                    />
                    <InputHeader>
                        {"Metadata: Keywords (Comma Seperated) (Optional)"}
                    </InputHeader>
                    <TextInput
                        placeholder='Metadata keywords'
                        onTextChange={this.handleMetaKeywordsChange}
                        errorMessage={""}
                        value={this.state.metaPageKeywords}
                    />
                    <InputHeader>
                        {"Link a Blerp Id to Blog Post (Optional)"}
                    </InputHeader>
                    <TextInput
                        placeholder='Blerp Id found at end of Soudnbite Url'
                        onTextChange={this.handleBlerpIdChange}
                        errorMessage={""}
                        value={this.state.blerpId}
                    />
                    <InputHeader>
                        {"Giphy Id For Blog Thumbnail (Optional)"}
                    </InputHeader>
                    <TextInput
                        placeholder='Id found at the end of a giphy url'
                        onTextChange={this.handleGiphyIdChange}
                        errorMessage={""}
                        value={this.state.giphyId}
                    />
                    <InputHeader>{"Creator Name (Required)"}</InputHeader>
                    <TextInput
                        placeholder='Name'
                        onTextChange={this.handleCreatorNameChange}
                        errorMessage={""}
                        value={this.state.creatorName}
                    />
                    <InputHeader>{"Publisher Name (Optional"}</InputHeader>
                    <TextInput
                        placeholder='Publisher'
                        onTextChange={this.handlePublisherNameChange}
                        errorMessage={""}
                        value={this.state.publisherName}
                    />
                    <InputHeader>{"Blog Content (Required)"}</InputHeader>
                    {isBrowser && this.ReactQuill ? (
                        <EditorContainer>
                            <ReactQuill
                                theme='snow'
                                value={this.state.blogContent}
                                onChange={this.handleBlogContentChange}
                            />
                        </EditorContainer>
                    ) : (
                        <textarea />
                    )}
                </BlogFormInputContainer>
                <SubmitButtonContainer>
                    <RectangleTextButton
                        text={"Update/Submit Blog"}
                        backgroundColor={pandaPink}
                        onClick={this.handleSubmitClick}
                    />
                </SubmitButtonContainer>
            </BlogForm>
        );
    }
}

export default Page;
