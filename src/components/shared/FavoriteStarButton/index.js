/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import gql from "graphql-tag";

import Router from "next/router";

import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import { flowRight as compose } from "lodash";

import styled from "styled-components";
import HeartIcon from "../../icons/heart-icon";

import { allBlerpColors, randomBlerpColor } from "../../../lib/helperFunctions";

const FavoriteButton = styled.button`
    cursor: pointer;
    width: 40px;
    height: 40px;

    &:hover {
        opacity: 0.8;
    }
`;

const FavoriteLink = styled.a`
    display: flex;
    font-size: 16px;
    padding: 12px 0;
    width: 100%;
    border: none;
    background: ${props => {
        return props.favorited ? randomBlerpColor() : " #353a40 ";
    }};
    color: ${props => {
        return props.favorited ? "#1d1d1d" : " #fff ";
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

// interface Props {
//   biteId?: string;
//   favorited?: boolean;
//   loggedIn?: boolean;
//   userFavoriteBite?: any; // Added from mutation
//   userUnfavoriteBite?: any; // Added from mutation
//   className?: any;
//   favoriteCallback?: any;
// }

// interface State {
//   favorited?: boolean;
// }

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

class FavoriteStarButton extends React.Component {
    props;
    state;

    constructor(props) {
        super(props);
        this.state = {
            favorited: props.favorited || false,
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.favorited !== this.props.favorited) {
            this.setState({ favorited: newProps.favorited });
        }
    }

    onFavoriteBite = async () => {
        try {
            this.setState({ favorited: true });
            const result = await this.props.userFavoriteBite({
                variables: {
                    biteId: this.props.biteId,
                    data: {
                        searchQuery: getQueryStringValue("q"),
                    },
                },
            });
            this.setState({
                favorited: result.data.web.favoriteBite.favorited,
            });
            if (this.props.favoriteCallback) {
                this.props.favoriteCallback(
                    result.data.web.favoriteBite.favorited,
                );
            }
        } catch (error) {
            console.log("ERROR OCCURED", error);
            if (
                error ==
                "Error: GraphQL error: You must be logged in, to have access to this action."
            ) {
                const redirect = `bite/${this.props.biteId}`;
                Router.push(`/login?returnTo=${redirect}`);
            }
            this.setState({ favorited: false });
        }
    };

    onUnfavoriteBite = async () => {
        try {
            this.setState({ favorited: false });
            const result = await this.props.userUnfavoriteBite({
                variables: {
                    biteId: this.props.biteId,
                    data: {
                        searchQuery: getQueryStringValue("q"),
                    },
                },
            });
            this.setState({
                favorited: result.data.web.favoriteBite.favorited,
            });
            if (this.props.favoriteCallback) {
                this.props.favoriteCallback(
                    result.data.web.favoriteBite.favorited,
                );
            }
        } catch (error) {
            console.log("ERROR OCCURED", error);
            if (
                error ==
                "Error: GraphQL error: You must be logged in, to have access to this action."
            ) {
                const redirect = `bite/${this.props.biteId}`;
                Router.push(`/login?returnTo=${redirect}`);
            }
            this.setState({ favorited: true });
        }
    };

    render() {
        if (!this.props.loggedIn) {
            return (
                <FavoriteLink
                    href={`/login?returnTo=bite/${this.props.biteId}`}
                    favorited={this.state.favorited}
                    title={
                        this.state.favorited
                            ? "Unfavorite Blerp"
                            : "Favorite Blerp"
                    }
                    className={this.props.className}
                >
                    <HeartIcon solid={this.state.favorited} />
                </FavoriteLink>
            );
        }

        return (
            <FavoriteButton
                onClick={
                    this.state.favorited
                        ? this.onUnfavoriteBite
                        : this.onFavoriteBite
                }
                title={
                    this.state.favorited ? "Unfavorite Blerp" : "Favorite Blerp"
                }
                className={this.props.className}
            >
                <HeartIcon solid={this.state.favorited} />
            </FavoriteButton>
        );
    }
}

const userFavoriteBite = gql`
    mutation websiteUserFavoriteBiteFromWebMenuItem(
        $biteId: MongoID!
        $data: JSON
    ) {
        web {
            favoriteBite(
                record: { biteId: $biteId }
                analytics: { data: $data }
            ) {
                favorited
            }
        }
    }
`;

const userUnfavoriteBite = gql`
    mutation websiteUserUnFavoriteBiteFromWebMenuItem(
        $biteId: MongoID!
        $data: JSON
    ) {
        web {
            favoriteBite(
                record: { biteId: $biteId }
                analytics: { data: $data }
            ) {
                favorited
            }
        }
    }
`;

export default compose(
    graphql(userUnfavoriteBite, {
        name: "userUnfavoriteBite",
    }),
    graphql(userFavoriteBite, {
        name: "userFavoriteBite",
    }),
)(FavoriteStarButton);
