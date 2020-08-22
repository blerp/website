/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import LoadingFullScreen from "../components/loading/loading-full-screen";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import TabBar from "../components/navigation/tabbar";

import PostItem from "../components/blog/post-item";
import withData from "../lib/withData";

import {
    bodyText,
    focusState,
    flyoutBackground,
    ligherBackground,
    inputBorderColor,
    pandaPink,
    placeholderText,
    slidePurple,
    defaultBackground,
    secondarySubtitleText,
} from "../styles/colors";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${defaultBackground};
`;

const FooterContainer = styled.div`
    margin-top: 160px;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    background-color: ${slidePurple};
    margin-bottom: 40px;
    flex-direction: column;
    padding: 60px;
`;

const Header = styled.h1`
    color: ${flyoutBackground};
    font-weight: bold;
    font-size: 48px;
    text-align: center;
`;

const Subheader = styled.h2`
    color: ${ligherBackground};
    font-weight: light;
    font-size: 28px;
    text-align: center;
`;

const TagText = styled.p`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 14px;
    text-align: center;
`;

const AllTheBitesContainer = styled.div`
    padding: 0;
`;

const ContentContainerGrid = styled.div`
    display: grid;
    grid: minmax(auto, max-content) / repeat(auto-fill, 600px);
    grid-gap: 40px;
    justify-content: center;
    padding: 0 60px;

    @media (max-width: 600px) {
        grid: minmax(auto, max-content) / repeat(auto-fill, 320px);
        grid-gap: 12px;
        padding: 0;
    }
`;

const TagContainer = styled.button`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CancelButton = styled.button`
    border: none;
    background-color: rgba(0, 0, 0, 0);
    color: ${focusState};
    margin-left: 5px;
    font-size: 18px;
`;

const itemsRenderer = (item, ref) => (
    <ContentContainerGrid ref={ref} key={item.id}>
        {item}
    </ContentContainerGrid>
);

const fetchBlogPosts = gql`
    query webBlogPostsHomeRandom($tags: [String]!) {
        blog {
            randomBlogPosts(limit: 30, tags: $tags) {
                id
                title
                content
                creatorName
                tags
                contentFormat
                pubDate
                createdAt
                blerpObject {
                    _id
                    title
                    audio {
                        mp3 {
                            url
                        }
                    }
                    image {
                        original {
                            url
                        }
                    }
                }
                giphy {
                    gif
                }
            }
        }
    }
`;

const fetchSearchBlogPosts = gql`
    query webBlogPostsHomeSearch($searchQuery: String!) {
        blog {
            findBlogPosts(filter: { fuzzyTitle: $searchQuery }) {
                id
                title
                content
                creatorName
                tags
                contentFormat
                pubDate
                createdAt
                blerpObject {
                    _id
                    title
                    audio {
                        mp3 {
                            url
                        }
                    }
                    image {
                        original {
                            url
                        }
                    }
                }
                giphy {
                    gif
                }
            }
        }
    }
`;

const SearchForm = styled.form`
    display: flex;
    background-color: transparent;
    height: 45px;
    margin: 16px;
    transition: 0.3s;
    box-shadow: none;
    justify-content: center;
    width: 72%;

    @media (max-width: 600px) {
        ${({ visibleOnMobile }) =>
            visibleOnMobile
                ? "visibility: visible;"
                : "position: absolute; visibility: hidden;"};
    }
`;

// padding: 0 40px; if using searchblerpy
const SearchBox = styled.input`
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 48px;
    font-size: 16px;
    padding: 0 20px;
    appearance: none;
    border-radius: 12px;
    border: 2px solid ${inputBorderColor};
    caret-color: ${pandaPink};

    &::placeholder {
        color: ${placeholderText};
    }
`;

class Page extends React.Component {
    static getInitialProps = ctx => ({ tag: ctx.query.tag });
    props;
    state;

    constructor(props) {
        super(props);
        this.state = {
            tags: props.tag ? [props.tag] : [],
            searchValue: "",
            searchQuery: "",
        };
    }

    closeTag = () => {
        if (window) {
            window.history.replaceState(null, this.props.title, `/blog`); // Relative I believe
        }
        this.setState({ tags: [] });
    };

    onSetTagState = tag => {
        if (window) {
            window.history.replaceState(null, this.props.title, `/blog/${tag}`); // Relative I believe
        }
        this.setState({ tags: [tag], searchQuery: "", searchValue: "" });
    };

    defaultHandleSearchChange = event => {
        this.setState({
            searchValue: event.currentTarget.value,
        });
    };

    defaultHandleSearchSubmit = event => {
        event.preventDefault();
        this.setState({ searchQuery: this.state.searchValue });
    };

    render() {
        return (
            <Container>
                <Helmet>
                    <title>
                        {
                            "Blerp Blog | Sound Insights and Random Soundboard Info"
                        }
                    </title>
                    <meta
                        name='description'
                        content={`Check out the Blerp blog to read more on the soundboard industry, get creative insights, or humor our random thoughts. Read more.`}
                    />
                    <meta
                        property='og:description'
                        content={`Check out the Blerp blog to read more on the soundboard industry, get creative insights, or humor our random thoughts. Read more.`}
                    />
                </Helmet>
                <NavBar />
                <AllTheBitesContainer>
                    <HeaderContainer>
                        <Header>{"Blerp Blog"}</Header>
                        <Subheader>
                            {
                                "Read the Blerp Blog to learn more about the industry, get creative insights or just be entertained. "
                            }
                        </Subheader>
                        <SearchForm
                            visibleOnMobile={true}
                            role='search'
                            onSubmit={this.defaultHandleSearchSubmit}
                        >
                            <SearchBox
                                type='search'
                                placeholder='Search here...'
                                aria-label='Search'
                                value={this.state.searchValue}
                                onChange={this.defaultHandleSearchChange}
                            />
                        </SearchForm>
                        {!!this.state.tags.length && (
                            <TagContainer>
                                {this.state.tags.map(tag => {
                                    return (
                                        <TagText key={tag}>{`#${tag}`}</TagText>
                                    );
                                })}
                                <CancelButton onClick={this.closeTag}>
                                    x
                                </CancelButton>
                            </TagContainer>
                        )}
                    </HeaderContainer>
                    {!!this.state.searchQuery ? (
                        <Query
                            query={fetchSearchBlogPosts}
                            ssr={true}
                            variables={{
                                searchQuery: this.state.searchQuery,
                            }}
                        >
                            {({ data, networkStatus, loading }) => {
                                if (loading) {
                                    return <LoadingFullScreen />;
                                }

                                if (
                                    !data ||
                                    !data.blog ||
                                    !data.blog.findBlogPosts
                                ) {
                                    return <div />;
                                }

                                return (
                                    <AllTheBitesContainer>
                                        <List
                                            itemCount={10} // For some reason past 10 will break this
                                            itemsRenderer={itemsRenderer}
                                        >
                                            {(index, key) => {
                                                const post =
                                                    data.blog.findBlogPosts[
                                                        index
                                                    ];
                                                if (!post) {
                                                    return <div key={key} />;
                                                }
                                                return (
                                                    <PostItem
                                                        key={key}
                                                        id={post.id}
                                                        title={post.title}
                                                        creator={
                                                            post.creatorName
                                                        }
                                                        pubDate={
                                                            post.pubDate
                                                                ? post.pubDate
                                                                : post.createdAt
                                                        }
                                                        blerp={post.blerpObject}
                                                        blogImage={
                                                            post.giphy &&
                                                            post.giphy.gif
                                                        }
                                                        tags={post.tags}
                                                        onTagClick={
                                                            this.onSetTagState
                                                        }
                                                    />
                                                );
                                            }}
                                        </List>
                                    </AllTheBitesContainer>
                                );
                            }}
                        </Query>
                    ) : (
                        <Query
                            query={fetchBlogPosts}
                            ssr={true}
                            variables={{
                                tags: this.state.tags,
                            }}
                        >
                            {({ data, networkStatus, loading }) => {
                                if (loading) {
                                    return <LoadingFullScreen />;
                                }

                                if (
                                    !data ||
                                    !data.blog ||
                                    !data.blog.randomBlogPosts
                                ) {
                                    return <div />;
                                }

                                return (
                                    <AllTheBitesContainer>
                                        <List
                                            itemCount={10} // For some reason past 10 will break this
                                            itemsRenderer={itemsRenderer}
                                        >
                                            {(index, key) => {
                                                const post =
                                                    data.blog.randomBlogPosts[
                                                        index
                                                    ];
                                                if (!post) {
                                                    return <div key={key} />;
                                                }
                                                return (
                                                    <PostItem
                                                        key={key}
                                                        id={post.id}
                                                        title={post.title}
                                                        creator={
                                                            post.creatorName
                                                        }
                                                        pubDate={
                                                            post.pubDate
                                                                ? post.pubDate
                                                                : post.createdAt
                                                        }
                                                        blerp={post.blerpObject}
                                                        blogImage={
                                                            post.giphy &&
                                                            post.giphy.gif
                                                        }
                                                        tags={post.tags}
                                                        onTagClick={
                                                            this.onSetTagState
                                                        }
                                                    />
                                                );
                                            }}
                                        </List>
                                    </AllTheBitesContainer>
                                );
                            }}
                        </Query>
                    )}
                </AllTheBitesContainer>
                <TabBar />
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

export default compose(withData)(Page);
