/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import gql from "graphql-tag";
import "isomorphic-fetch";

import Router from "next/router";

import * as React from "react";

import { graphql } from "@apollo/client/react/hoc";

import { flowRight as compose } from "lodash";

import styled from "styled-components";

import { allBlerpColors, randomBlerpColor } from "../../../lib/helperFunctions";

const FavoriteButton = styled.button`
    cursor: pointer;
    display: flex;
    font-size: 16px;
    padding: 12px 0;
    width: 100%;
    border: none;
    background: ${props =>
        props.favorited ? randomBlerpColor() : " #353a40 "};
    align-content: center;
    justify-content: center;
    text-decoration: none;
    color: ${props => (props.favorited ? "#1d1d1d" : " #fff ")};
    transition: ease-in-out;
    transition: background 0.2s;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.9;
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
//   favoriteCallback?: any;
// }

// interface State {
//   favorited?: boolean;
// }

class FavoriteMenuItem extends React.Component {
    props;
    state = {
        favorited: this.props.favorited || false,
    };

    setFavorited = favorited => {
        this.setState({ favorited });
        if (this.props.favoriteCallback) {
            this.props.favoriteCallback(favorited);
        }
    };

    onFavoriteBite = async () => {
        try {
            this.setState({ favorited: true });
            const result = await this.props.userFavoriteBite({
                variables: {
                    biteId: this.props.biteId,
                },
            });
            this.setFavorited(result.data.web.favoriteBite.favorited);
        } catch (error) {
            if (
                error ==
                "Error: GraphQL error: You must be logged in, to have access to this action."
            ) {
                Router.push("/login?returnTo=/");
            }
            // TODO: Make Proper UI For This
            this.setState({ favorited: false });
            return;
        }
    };

    onUnfavoriteBite = async () => {
        try {
            this.setState({ favorited: false });
            const result = await this.props.userUnfavoriteBite({
                variables: {
                    biteId: this.props.biteId,
                },
            });
            this.setFavorited(result.data.web.favoriteBite.favorited);
        } catch (error) {
            if (
                error ==
                "Error: GraphQL error: You must be logged in, to have access to this action."
            ) {
                Router.push("/login?returnTo=/");
            }
            // TODO: Make Proper UI For This
            this.setState({ favorited: true });
            return;
        }
    };

    render() {
        if (!this.props.loggedIn) {
            return (
                <FavoriteLink
                    href={`/login?returnTo=/&favoriteId=${this.props.biteId}`}
                    favorited={this.state.favorited}
                >
                    {this.state.favorited
                        ? "Unfavorite Blerp"
                        : "Favorite Blerp"}
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
                favorited={this.state.favorited}
            >
                {this.state.favorited ? "Unfavorite Blerp" : "Favorite Blerp"}
            </FavoriteButton>
        );
    }
}

const userFavoriteBite = gql`
    mutation userFavoriteBiteFromWebMenuItem($biteId: MongoID!) {
        web {
            favoriteBite(record: { biteId: $biteId }) {
                favorited
            }
        }
    }
`;

const userUnfavoriteBite = gql`
    mutation userFavoriteBiteFromWebMenuItem($biteId: MongoID!) {
        web {
            favoriteBite(record: { biteId: $biteId }) {
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
)(FavoriteMenuItem);
