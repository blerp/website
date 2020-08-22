/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import gql from "graphql-tag";

import Router from "next/router";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { flowRight as compose } from "lodash";

import styled from "styled-components";
import HeartIcon from "../../icons/heart-icon-white";

import { FavoriteIconBite } from "../../theme/Icon";
import { ScalarLeafs } from "graphql/validation/rules/ScalarLeafs";

const FavoriteButton = styled.button`
    cursor: pointer;
    width: 40px;
    height: 40px;
    transform: translate(0px, 0px) scale(1);
    align-items: center;
    justify-content: center;
    background-color: ${props => {
        return props.favorited ? props.theme.ibisRed : props.theme.grey3;
    }};
    border: ${props => {
            return props.favorited
                ? props.theme.flyoutBackground
                : props.theme.flyoutBackground;
        }}
        4px solid;

    @media (min-width: 600px) {
        &:hover {
            transform: translate(0px, 0px) scale(1.1);
        }

        &:active {
            transform: translate(0px, 0px) scale(0.9);
        }
    }
`;

const FavoriteLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: ${props => {
            return props.favorited
                ? props.theme.flyoutBackground
                : props.theme.flyoutBackground;
        }}
        2px solid;
    background-color: ${props => {
        return props.favorited ? props.theme.seafoam : props.theme.grey3;
    }};
    align-content: center;
    justify-content: center;

    &:hover {
        background-color: ${props => {
            return props.favorited ? props.theme.lightGray : colors.grey4;
        }};
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
                user {
                    _id
                    favoritePlaylist {
                        _id
                        bitesPagination(
                            page: 1
                            perPage: 200
                            sort: CREATEDAT_DESC
                        ) {
                            items {
                                _id
                                title
                                favorited
                            }
                        }
                    }
                }
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
                user {
                    _id
                    favoritePlaylist {
                        _id
                        bitesPagination(
                            page: 1
                            perPage: 200
                            sort: CREATEDAT_DESC
                        ) {
                            items {
                                _id
                                title
                                favorited
                            }
                        }
                    }
                }
            }
        }
    }
`;

const FavoriteStarButton = props => {
    const [favorited, setFavorited] = useState(props.favorited);
    const [favorite] = useMutation(userFavoriteBite);
    const [unfavorite] = useMutation(userUnfavoriteBite);

    const onFavoriteBite = async () => {
        try {
            setFavorited(true);
            const result = await favorite({
                variables: {
                    biteId: props.biteId,
                    data: {
                        searchQuery: props.query,
                    },
                },
            });
            setFavorited(result.data.web.favoriteBite.favorited);
            if (props.favoriteCallback) {
                props.favoriteCallback(result.data.web.favoriteBite.favorited);
            }
        } catch (error) {
            if (
                error ==
                "Error: GraphQL error: You must be logged in, to have access to this action."
            ) {
                const redirect = `bite/${props.biteId}`;
                Router.push(`/login?returnTo=${redirect}`);
            }
            setFavorited(false);
        }
    };

    const onUnfavoriteBite = async () => {
        try {
            setFavorited(false);
            const result = await unfavorite({
                variables: {
                    biteId: props.biteId,
                    data: {
                        searchQuery: props.query | getQueryStringValue("q"),
                    },
                },
            });
            setFavorited(result.data.web.favoriteBite.favorited);
            if (props.favoriteCallback) {
                props.favoriteCallback(result.data.web.favoriteBite.favorited);
            }
        } catch (error) {
            if (
                error ==
                "Error: GraphQL error: You must be logged in, to have access to this action."
            ) {
                const redirect = `bite/${props.biteId}`;
                Router.push(`/login?returnTo=${redirect}`);
            }
            setFavorited(true);
        }
    };

    if (!props.loggedIn) {
        return (
            <FavoriteLink
                href={`/login?returnTo=bite/${props.biteId}`}
                favorited={favorited}
                title={favorited ? "Unfavorite Blerp" : "Favorite Blerp"}
                className={props.className}
            >
                <FavoriteIconBite />
            </FavoriteLink>
        );
    }

    return (
        <FavoriteButton
            onClick={
                favorited ? () => onUnfavoriteBite() : () => onFavoriteBite()
            }
            title={favorited ? "Unfavorite Blerp" : "Favorite Blerp"}
            className={props.className}
            favorited={favorited}
        >
            <FavoriteIconBite />
        </FavoriteButton>
    );
};

export default FavoriteStarButton;
