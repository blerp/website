/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";

import PlaylistBoardSquare from "./playlist-board-square-wrapper";

const GRAB_PLAYLIST = gql`
    query webGrabBoardForTile($id: MongoID!) {
        web {
            playlistById(_id: $id) {
                _id
                title
                biteIds
                giphy {
                    gif
                }
            }
        }
    }
`;

const DefaultProps = {
    boardId: "",
};

export class PlaylistBoardSquareWrapper extends React.Component {
    static defaultProps = DefaultProps;

    render() {
        return (
            <Query
                query={GRAB_PLAYLIST}
                ssr={false}
                variables={{
                    id: this.props.boardId,
                }}
            >
                {({ data, loading, error }) => {
                    if (
                        !data ||
                        !data.web ||
                        !data.web.playlistById ||
                        loading ||
                        error
                    ) {
                        return <div />;
                    }

                    return (
                        <PlaylistBoardSquare
                            id={data.web.playlistById._id}
                            title={data.web.playlistById.title}
                            color={data.web.playlistById.color}
                            imageUrl={
                                (data.web.playlistById.image &&
                                    data.web.playlistById.image.original.url) ||
                                (data.web.playlistById.giphy &&
                                    data.web.playlistById.giphy.gif)
                            }
                            dontBeLink={true}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default PlaylistBoardSquareWrapper;
