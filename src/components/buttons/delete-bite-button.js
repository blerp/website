/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import gql from "graphql-tag";
import "isomorphic-fetch";

import * as React from "react";
import { Mutation } from "@apollo/client/react/components";

import { flowRight as compose } from "lodash";

import styled from "styled-components";

const DeleteButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 40px;
    height: 40px;
    opacity: 1;
    padding: 10px;
`;

const DeleteIcon = styled.img`
    width: 100%;
    height: 100%;
    align-self: center;
    white-space: nowrap;
`;

// interface Props {
//   playlistId: string;
//   biteId: string;
//   index?: string;
//   onDeleteFromPlaylist?: any;
//   className?: string;
// }

const USER_DELETE_BITE_FROM_PLAYLIST = gql`
    mutation websiteDeleteBiteFromPlaylistFromPlaylistPage(
        $id: MongoID!
        $biteId: MongoID!
    ) {
        web {
            playlistRemoveBiteById(_id: $id, biteId: $biteId) {
                _id
                title
                ownerId
                audienceRating
                description
                visibility
                userKeywords
                favorites
                categoryObjects {
                    _id
                    title
                }
                ownerObject {
                    _id
                    username
                    picture
                }
                image {
                    original {
                        url
                    }
                }
                collabIds
                giphy {
                    gif
                }
                followed
                biteObjects {
                    _id
                    title
                    keywords
                    userKeywords
                    color
                    image {
                        original {
                            url
                        }
                    }
                    favorited
                    playCount
                    audienceRating
                    giphy {
                        gif
                    }
                    audio {
                        original {
                            url
                        }
                        mp3 {
                            url
                        }
                    }
                }
            }
        }
    }
`;

class DeleteBiteButton extends React.Component {
    static defaultProps = {
        onDeleteFromPlaylist: () => {},
    };
    props;
    state = {};

    onDeleteBite = deleteBiteFromBoard => async () => {
        try {
            const result = await deleteBiteFromBoard({
                ssr: false,
                variables: {
                    id: this.props.playlistId,
                    biteId: this.props.biteId,
                },
            });

            if (result.data.errors) {
                this.props.onDeleteFromPlaylist({
                    deleted: false,
                    index: this.props.index,
                });
                // TODO: handle error deleting
                return;
            }

            this.props.onDeleteFromPlaylist({
                deleted: true,
                index: this.props.index,
            });
        } catch (error) {
            // TODO: handle error deleting
            this.props.onDeleteFromPlaylist({
                deleted: false,
                index: this.props.index,
            });
            return;
        }
    };

    render() {
        return (
            <Mutation mutation={USER_DELETE_BITE_FROM_PLAYLIST}>
                {deleteBiteMutation => {
                    return (
                        <DeleteButton
                            className={this.props.className}
                            onClick={this.onDeleteBite(deleteBiteMutation)}
                        >
                            <DeleteIcon src='https://storage.googleapis.com/blerp-public-images/interaction/close-x.svg' />
                        </DeleteButton>
                    );
                }}
            </Mutation>
        );
    }
}

export default DeleteBiteButton;
