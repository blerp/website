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

const CREATE_BLOG_POST = gql`
    mutation webNewBlogPostCreate($blogRecord: CreateOneBlogPostInput!) {
        blog {
            blogPostCreate(record: $blogRecord) {
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

const FETCH_USER = gql`
    query websiteGetSingleBlogPost {
        web {
            userSignedIn {
                _id
                roles
            }
        }
    }
`;

class Page extends React.Component {
    props;
    state;

    constructor(props) {
        super(props);
    }

    handleSubmitClick = mutationCall => async blogPostRecord => {
        await mutationCall({
            variables: {
                blogRecord: blogPostRecord,
            },
        });

        window.location.href = `${currentHost}/blog/post/${blogPostRecord.id}`;
    };

    isStrictlyAdmin(userData) {
        return (
            userData &&
            userData.web &&
            userData.web.userSignedIn &&
            userData.web.userSignedIn.roles &&
            userData.web.userSignedIn.roles.indexOf("ADMIN") > -1
        );
    }

    render() {
        return (
            <Container>
                <Helmet>
                    <title>{"Create New Blog Post"}</title>
                    <meta
                        property='og:description'
                        content={`Create a new blog post posted on blerp.com`}
                        charSet='utf-8'
                    />
                    <link
                        rel='stylesheet'
                        href='//cdn.quilljs.com/1.2.6/quill.snow.css'
                    />
                    <meta name='robots' content='noindex' />
                </Helmet>
                <NavBar />
                <Query query={FETCH_USER}>
                    {({ data, loading }) => {
                        if (loading) {
                            return <div>{"Loading"}</div>;
                        }

                        if (!this.isStrictlyAdmin(data)) {
                            return <div>{"NotAdmin"}</div>;
                        }

                        return (
                            <Mutation mutation={CREATE_BLOG_POST}>
                                {mutationCall => {
                                    return (
                                        <BlogPostForm
                                            blogPost={null}
                                            handleSubmitClick={this.handleSubmitClick(
                                                mutationCall,
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
