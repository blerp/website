/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import LoadingFullScreen from "../components/loading/loading-full-screen";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import TabBar from "../components/navigation/tabbar";
import UrlChanger from "../components/shared/UrlChanger";
import AudioButton, {
    ButtonModes,
} from "../components/buttons/data/wrapped-audio-button";

import CustomMessage from "../components/messages/custom-message";

import withData from "../lib/withData";

import { Body } from "../components/layouts/body-components";
import {
    bodyText,
    flyoutBackground,
    ligherBackground,
    secondarySubtitleText,
    darkBlue,
    secondaryGray,
} from "../styles/colors";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const DangerContainer = styled.div`
    width: 100%;
`;

const BlogContent = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 80%;
    height: 100%;
    background-color: ${flyoutBackground};
    padding: 40px;
    border-radius: 8px;

    @media (max-width: 600px) {
        font-size: 32px;
        padding: 8px;
        width: 92%;
    }

    & img {
        width: inherit;
        max-width: 90%;
        border-radius: 8px;
    }

    & h1,
    h2,
    h3,
    h4 {
        text-align: left;
        max-width: 800px;
        width: 100%;
        margin: auto;
    }

    & p {
        font-size: 18px;
        line-height: 32px;
        padding: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        max-width: 800px;
        margin: auto;
    }

    & iframe {
        width: inherit;
        max-width: 800px;
    }

    & a {
        font-weight: 600;
        text-align: center;
        font-size: 18px;
        text-decoration: underline;
        color: ${darkBlue};
        white-space: pre-wrap;
        margin: 4px;
    }
`;

const FooterContainer = styled.div`
    margin-top: 160px;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    background-color: ${ligherBackground};
    margin-bottom: 40px;
    flex-direction: column;
    padding: 40px 0;
    width: 100%;
`;

const Header = styled.h1`
    color: ${bodyText};
    font-weight: bold;
    font-size: 40px;
    text-align: center;
    max-width: 800px;
    width: 100%;
    @media (max-width: 600px) {
        font-size: 32px;
    }
`;

const Subheader = styled.h2`
    color: ${secondarySubtitleText};
    font-weight: light;
    font-size: 20px;
    text-align: center;
    padding: 24px;
    max-width: 800px;
    width: 100%;
`;

const AllTheBitesContainer = styled.div`
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
`;

const BlogSupportingImage = styled.img`
    width: 300px;
    height: 200px;
    border-radius: 8px;
`;

const BlerpLogo = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 8px;
`;

const StyledAudioButton = styled(AudioButton)`
    overflow: hidden;
    background-color: ${secondaryGray};
    width: 68px;
    height: 68px;
    border-radius: 100px;
    border: none;
    z-index: 1000;
    position: relative;

    @media (max-width: 600px) {
        width: 68px;
        height: 68px;
    }

    &:focus {
        opacity: 1;
        border: none !important;
    }
`;

// interface WithInitialProps {
//   getInitialProps?: (ctx) => object | Promise<object>;
// }

function formatDate(date) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
}

class Page extends React.Component {
    static getInitialProps = ctx => ({ id: ctx.query.id });
    props;

    renderGenericMessage() {
        return (
            <CustomMessage
                night={true}
                title='Something wrong happened!'
                description="hmm let's go back to the main blog."
                imageUrl='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftCircleIbisRed.svg'
                href={"/blog"}
            />
        );
    }

    render() {
        return (
            <Container>
                {this.props.data.blog && (
                    <Helmet>
                        <title>
                            {this.props.data.blog.findBlogPostByStringId
                                .metaTitle
                                ? this.props.data.blog.findBlogPostByStringId
                                      .metaTitle
                                : this.props.data.blog.findBlogPostByStringId
                                      .title}
                        </title>
                        <script type='application/ld+json'>
                            {`
            {
              "@context": "http://schema.org",
              "@type": "BlogPosting",
              "headline": ${this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.title},
              "alternativeHeadline": ${this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.title},
              "image": "https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg",
              "award": ${
                  this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.creatorName
                      ? this.props.data.blog.findBlogPostByStringId.creatorName
                      : "Audio Search Engine Blog"
              },
              "editor": ${this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.creatorName},
              "genre": ${
                  this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.genre
                      ? this.props.data.blog.findBlogPostByStringId.genre
                      : "Audio Search Engine"
              },
              "keywords": ${
                  this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.tags
                      ? this.props.data.blog.findBlogPostByStringId.tags.join(
                            " ",
                        )
                      : "Sound Clips, Audio Search Engine"
              },
              "wordcount": ${this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.content.length},
              "publisher": ${
                  this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.publisherName
                      ? this.props.data.blog.findBlogPostByStringId
                            .publisherName
                      : "Blerp Inc."
              },
              "url": https://blerp.com/blog/posts/${this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.id},
              "datePublished": ${
                  this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.pubDate
                      ? this.props.data.blog.findBlogPostByStringId.pubDate
                      : this.props.data.blog.findBlogPostByStringId.createdAt
              },
              "dateCreated": ${
                  this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.pubDate
                      ? this.props.data.blog.findBlogPostByStringId.pubDate
                      : this.props.data.blog.findBlogPostByStringId.createdAt
              },
              "dateModified": ${
                  this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.pubDate
                      ? this.props.data.blog.findBlogPostByStringId.pubDate
                      : this.props.data.blog.findBlogPostByStringId.createdAt
              },
              "description": ${this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.metaDescription},
              "articleBody": ${this.props.data.blog &&
                  this.props.data.blog.findBlogPostByStringId.content},
              "author": {
                 "@type": "Person",
                 "name": ${this.props.data.blog &&
                     this.props.data.blog.findBlogPostByStringId.creatorName}
               }
             }
          `}
                        </script>
                        <meta
                            property='og:description'
                            content={
                                this.props.data.blog.findBlogPostByStringId
                                    .metaDescription
                                    ? this.props.data.blog
                                          .findBlogPostByStringId
                                          .metaDescription
                                    : `${this.props.data.blog.findBlogPostByStringId.metaTitle} is a blog post posted on blerp.com`
                            }
                        />
                    </Helmet>
                )}
                <NavBar />
                {(this.props.data.networkStatus === 1 ||
                    this.props.data.networkStatus === 2) && (
                    <LoadingFullScreen />
                )}
                {this.props.data.error && (
                    <Body>{this.renderGenericMessage()}</Body>
                )}
                {this.props.data.blog && (
                    <AllTheBitesContainer>
                        <UrlChanger
                            key={this.props.data.blog.findBlogPostByStringId.id}
                            id={this.props.data.blog.findBlogPostByStringId.id}
                            title={
                                this.props.data.blog.findBlogPostByStringId
                                    .title
                            }
                            newUrlBasePathName={"blog/post"}
                        />
                        <HeaderContainer>
                            <Header>
                                {
                                    this.props.data.blog.findBlogPostByStringId
                                        .title
                                }
                            </Header>
                            <Subheader>{`Author: ${
                                this.props.data.blog.findBlogPostByStringId
                                    .creatorName
                            } - Published: ${formatDate(
                                new Date(
                                    this.props.data.blog.findBlogPostByStringId
                                        .pubDate
                                        ? this.props.data.blog
                                              .findBlogPostByStringId.pubDate
                                        : this.props.data.blog
                                              .findBlogPostByStringId.createdAt,
                                ),
                            )}`}</Subheader>
                            {this.props.data.blog.findBlogPostByStringId &&
                            this.props.data.blog.findBlogPostByStringId
                                .blerpObject ? (
                                <StyledAudioButton
                                    title={
                                        this.props.data.blog
                                            .findBlogPostByStringId.blerpObject
                                            .title
                                    }
                                    biteId={
                                        this.props.data.blog
                                            .findBlogPostByStringId.blerpObject
                                            ._id
                                    }
                                    sources={[
                                        this.props.data.blog
                                            .findBlogPostByStringId.blerpObject
                                            .audio &&
                                            this.props.data.blog
                                                .findBlogPostByStringId
                                                .blerpObject.audio.mp3.url,
                                    ]}
                                    preload={true}
                                    showButton={true}
                                    handleIncrementPlayCount={() => {}}
                                    mode={ButtonModes.play}
                                    useGlobalAudio={true}
                                    featuredPage={"BLOG_POST"}
                                />
                            ) : this.props.data.blog.findBlogPostByStringId
                                  .giphy &&
                              this.props.data.blog.findBlogPostByStringId.giphy
                                  .gif ? (
                                <BlogSupportingImage
                                    src={
                                        this.props.data.blog
                                            .findBlogPostByStringId.giphy.gif
                                    }
                                />
                            ) : (
                                <BlerpLogo src='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftIbisRed.svg' />
                            )}
                        </HeaderContainer>
                        <BlogContent>
                            <DangerContainer
                                dangerouslySetInnerHTML={{
                                    __html: this.props.data.blog
                                        .findBlogPostByStringId.content,
                                }}
                            />
                        </BlogContent>
                    </AllTheBitesContainer>
                )}
                <TabBar />
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

const fetchPost = gql`
    query websiteGetSingleBlogPost($id: String!) {
        blog {
            findBlogPostByStringId(id: $id) {
                id
                title
                tags
                metaTitle
                metaDescription
                metaPageKeywords
                creatorName
                pubDate
                createdAt
                publisherName
                contentFormat
                content
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

const fetchSinglePost = graphql(fetchPost, {
    options: props => ({
        ssr: true,
        variables: {
            id: props.id,
        },
    }),
});

export default compose(withData, fetchSinglePost)(Page);
