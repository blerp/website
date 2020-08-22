/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import gql from "graphql-tag";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import TabBar from "../components/navigation/tabbar";
import BlogPostForm from "../components/blog/blog-post-form";

import withData from "../lib/withData";

import projectConfig from "../config";
const currentHost = projectConfig.host;

const UPDATE_BLOG_POST = gql`
    mutation webOldBlogPostUpdate($blogRecord: UpdateByIdBlogPostInput!) {
        blog {
            blogPostUpdateById(record: $blogRecord) {
                recordId
                record {
                    id
                    _id
                    giphy {
                        gif
                    }
                }
            }
        }
    }
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const FooterContainer = styled.div`
    margin-top: 160px;
`;

const FETCH_POST = gql`
    query websiteGetSingleBlogPost($id: String!) {
        web {
            userSignedIn {
                _id
                roles
            }
        }
        blog {
            findBlogPostByStringId(id: $id) {
                _id
                id
                title
                tags
                metaTitle
                metaDescription
                metaPageKeywords
                creatorName
                giphyId
                pubDate
                biteId
                publisherName
                contentFormat
                content
            }
        }
    }
`;

class Page extends React.Component {
    props;
    state;
    static getInitialProps = ctx => ({
        id: ctx && ctx.query && ctx.query.id,
    });

    constructor(props) {
        super(props);
    }

    isStrictlyAdmin(userData) {
        return (
            userData &&
            userData.web &&
            userData.web.userSignedIn &&
            userData.web.userSignedIn.roles &&
            userData.web.userSignedIn.roles.indexOf("ADMIN") > -1
        );
    }

    handleUpdateClick = (mutationCall, _id) => async blogPostRecord => {
        await mutationCall({
            variables: {
                blogRecord: { ...blogPostRecord, _id },
            },
        });

        window.location.href = `${currentHost}/blog/post/${blogPostRecord.id}`;
    };

    render() {
        return (
            <Container>
                <Helmet>
                    <title>{"Update Old Blog Post"}</title>
                    <meta
                        property='og:description'
                        content={`Update a old blog post posted on blerp.com`}
                        charSet='utf-8'
                    />
                    <link
                        rel='stylesheet'
                        href='//cdn.quilljs.com/1.2.6/quill.snow.css'
                    />
                    <meta name='robots' content='noindex' />
                </Helmet>
                <NavBar />
                <Query query={FETCH_POST} variables={{ id: this.props.id }}>
                    {({ data, loading }) => {
                        if (loading) {
                            return <div>{"Loading"}</div>;
                        }

                        if (
                            !(
                                data.blog &&
                                data.blog.findBlogPostByStringId &&
                                data.blog.findBlogPostByStringId._id
                            )
                        ) {
                            return (
                                <div>
                                    {"Borked or blog posts does not exist"}
                                </div>
                            );
                        }

                        if (!this.isStrictlyAdmin(data)) {
                            return <div>{"Not Admin"}</div>;
                        }

                        return (
                            <Mutation mutation={UPDATE_BLOG_POST}>
                                {mutationCall => {
                                    return (
                                        <BlogPostForm
                                            blogPost={
                                                data.blog &&
                                                data.blog
                                                    .findBlogPostByStringId &&
                                                data.blog.findBlogPostByStringId
                                            }
                                            handleSubmitClick={this.handleUpdateClick(
                                                mutationCall,
                                                data.blog &&
                                                    data.blog
                                                        .findBlogPostByStringId &&
                                                    data.blog
                                                        .findBlogPostByStringId
                                                        ._id,
                                            )}
                                        />
                                    );
                                }}
                            </Mutation>
                        );
                    }}
                </Query>
                <TabBar />
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

export default compose(withData)(Page);
