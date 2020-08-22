/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import gql from "graphql-tag";

import Router from "next/router";

import * as React from "react";
import { graphql } from "@apollo/client/react/hoc";

import { flowRight as compose } from "lodash";
import styled from "styled-components";
import BlueHeartIcon from "../../icons/blue-heart-icon";
// import BlueHeartIcon from "../../icons/plus-follow-icon";

import { allBlerpColors, randomBlerpColor } from "../../../lib/helperFunctions";

const Button = styled.button`
    cursor: pointer;
    width: 40px;
    height: 40px;

    &:hover {
        opacity: 0.8;
    }
`;

const Link = styled.a`
    display: flex;
    font-size: 16px;
    padding: 12px 0;
    width: 100%;
    border: none;
    background: ${props => {
        return props.followed ? randomBlerpColor() : " #353a40 ";
    }};
    color: ${props => {
        return props.followed ? "#1d1d1d" : " #fff ";
    }};
    align-content: center;
    justify-content: center;
    text-decoration: none;
    transition: ease-in-out;
    transition: background 0.2s;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.9;
    }
`;

function getQueryStringValue(key) {
    return decodeURIComponent(
        window.location.search.replace(
            new RegExp(
                "^(?:.*[&\\?]" +
                    encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") +
                    "(?:\\=([^&]*))?)?.*$",
                "i",
            ),
            "$1",
        ),
    );
}

class FollowHeartButton extends React.Component {
    props;
    state;

    constructor(props) {
        super(props);
        this.state = {
            followed: props.followed || false,
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.followed !== this.props.followed) {
            this.setState({ followed: newProps.followed });
        }
    }

    onFavoriteBite = async () => {
        try {
            this.setState({ followed: true });
            const result = await this.props.userFollowBoard({
                variables: {
                    playlistId: this.props.playlistId,
                    data: {
                        searchQuery: getQueryStringValue("q"),
                    },
                },
            });
            this.setState({
                followed: result.data.web.followSoundboard.followed,
            });
            if (this.props.favoriteCallback) {
                this.props.favoriteCallback(
                    result.data.web.followSoundboard.followed,
                );
            }
        } catch (error) {
            console.log("ERROR OCCURED", error);
            if (
                error ==
                "Error: GraphQL error: You must be logged in, to have access to this action."
            ) {
                const redirect = `soundboard/${this.props.playlistId}`;
                Router.push(`/login?returnTo=${redirect}`);
            }
            this.setState({ followed: false });
        }
    };

    onUnfavoriteBite = async () => {
        try {
            this.setState({ followed: false });
            const result = await this.props.userUnfollowBoard({
                variables: {
                    playlistId: this.props.playlistId,
                    data: {
                        searchQuery: getQueryStringValue("q"),
                    },
                },
            });
            this.setState({
                followed: result.data.web.followSoundboard.followed,
            });

            if (this.props.favoriteCallback) {
                this.props.favoriteCallback(
                    result.data.web.followSoundboard.followed,
                );
            }
        } catch (error) {
            console.log("ERROR OCCURED", error);
            if (
                error ==
                "Error: GraphQL error: You must be logged in, to have access to this action."
            ) {
                const redirect = `soundboard/${this.props.playlistId}`;
                Router.push(`/login?returnTo=${redirect}`);
            }
            this.setState({ followed: true });
        }
    };

    render() {
        if (!this.props.loggedIn) {
            return (
                <Link
                    href={`/login?returnTo=soundboard/${this.props.playlistId}`}
                    followed={this.state.followed}
                    title={
                        this.state.followed ? "Unfollow Board" : "Follow Board"
                    }
                    className={this.props.className}
                >
                    <BlueHeartIcon solid={this.state.followed} />
                </Link>
            );
        }

        return (
            <Button
                onClick={
                    this.state.followed
                        ? this.onUnfavoriteBite
                        : this.onFavoriteBite
                }
                title={
                    this.state.followed
                        ? "Unfollow Soundboard"
                        : "Follow Soundboard"
                }
                className={this.props.className}
            >
                <BlueHeartIcon solid={this.state.followed} />
            </Button>
        );
    }
}

const userFollowBoard = gql`
    mutation websiteUserFollowBoard($playlistId: MongoID!, $data: JSON) {
        web {
            followSoundboard(
                record: { playlistId: $playlistId }
                analytics: { data: $data }
            ) {
                followed
            }
        }
    }
`;

const userUnfollowBoard = gql`
    mutation websiteUserFollowBoard($playlistId: MongoID!, $data: JSON) {
        web {
            followSoundboard(
                record: { playlistId: $playlistId }
                analytics: { data: $data }
            ) {
                followed
            }
        }
    }
`;

export default compose(
    graphql(userUnfollowBoard, {
        name: "userUnfollowBoard",
    }),
    graphql(userFollowBoard, {
        name: "userFollowBoard",
    }),
)(FollowHeartButton);
