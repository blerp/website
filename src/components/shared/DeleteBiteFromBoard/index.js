/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import gql from "graphql-tag";
import "isomorphic-fetch";

import * as React from "react";

import { graphql } from "@apollo/react-hoc";

import { flowRight as compose } from "lodash";

import styled from "styled-components";

import { allBlerpColors, randomBlerpColor } from "../../../lib/helperFunctions";

const DeleteButton = styled.button`
    cursor: pointer;
    display: flex;
    font-size: 16px;
    padding: 12px 0;
    width: 100%;
    border: none;
    align-content: center;
    justify-content: center;
    text-decoration: none;
    background-color: #ddd;
    color: #1d1d1d;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.9;
    }
`;

// interface Props {
//   boardId: string;
//   index?: string;
//   loggedIn?: boolean;
//   onDeleteClick: any;
//   deleteBiteFromBoard?: any;
// }

// interface State {
//   favorited?: boolean;
// }

class DeleteFromBoardMenuItem extends React.Component {
    props;
    state = {};

    onDeleteBite = async () => {
        try {
            const result = await this.props.deleteBiteFromBoard({
                variables: {
                    id: this.props.boardId,
                    bite: null,
                    index: this.props.index,
                },
            });

            if (result.data.errors) {
                this.props.onDeleteClick({
                    deleted: false,
                    index: this.props.index,
                });
                // TODO: handle error deleting
                return;
            }

            this.props.onDeleteClick({
                deleted: true,
                index: this.props.index,
            });
        } catch (error) {
            // TODO: handle error deleting
            this.props.onDeleteClick({
                deleted: false,
                index: this.props.index,
            });
            return;
        }
    };

    render() {
        return (
            <DeleteButton onClick={this.onDeleteBite}>
                {"Remove blerp from board"}
            </DeleteButton>
        );
    }
}

const userDeleteBiteFromBoard = gql`
    mutation websiteDeleteBiteFromBoardFromWebMenuItem(
        $id: MongoID!
        $bite: MongoID
        $index: Int!
    ) {
        web {
            boardSetBite(_id: $id, bite: $bite, index: $index) {
                title
            }
        }
    }
`;

export default compose(
    graphql(userDeleteBiteFromBoard, {
        name: "deleteBiteFromBoard",
    }),
)(DeleteFromBoardMenuItem);
