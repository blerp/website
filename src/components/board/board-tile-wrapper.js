/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import gql from "graphql-tag";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";

import BoardTile from "./board-tile";

const GRAB_BOARD = gql`
  query webGrabBoardForTile$id: MongoID!) {
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

const DefaultProps = {};

export class BoardTileWrapper extends React.Component {
    static defaultProps = DefaultProps;
    render() {
        return (
            <Query
                query={GRAB_BOARD}
                ssr={false}
                variables={{
                    id: this.props.boardId,
                }}
            >
                {({ data, loading }) => {
                    if (!data || loading) {
                        return <div />;
                    }

                    return (
                        <BoardTile
                            onClick={() => {}}
                            board={data && data.web && data.web.playlistById}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default BoardTileWrapper;
