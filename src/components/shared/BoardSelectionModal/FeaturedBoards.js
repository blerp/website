/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import gql from "graphql-tag";

import { Query, Mutation } from "@apollo/client/react/components";

import HorizontalList from "../../lists/HorizontalList";
import PlusCheckButton from "../../buttons/PlusCheckButton";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    iconsInActive,
    pandaTeal,
    secondaryGray,
} from "../../../styles/colors";

const POPULAR_BOARD_QUERY = gql`
    query twitchStreamerPopularBoards($limit: Int) {
        twitch {
            playlistRandomMany(limit: $limit) {
                _id
                title
                biteIds
                giphy {
                    gif
                }
                image {
                    original {
                        url
                    }
                }
            }
        }
    }
`;

const StyledPlusCheckButton = styled(PlusCheckButton)`
    position: absolute;
    top: -4px;
    right: -4px;
`;

const ListContainer = styled.div`
    position: relative;
    width: 100%;
`;

const BoardSquareContainer = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    background-color: transparent;
    margin: 4px;

    &:hover {
        opacity: 0.8;
    }
`;

const Scrim = styled.div`
    position: absolute;
    border-radius: 6px;
    width: 100px;
    height: 100px;
    top: 0;
    left: 0;
    background-color: ${pandaTeal};
    opacity: 0;

    &:hover {
        opacity: 0.4;
    }
`;

const BoardImage = styled.img`
    position: absolute;
    border-radius: 6px;
    width: 100px;
    height: 100px;
`;

const TitleSection = styled.div`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    background-color: rgba(89, 88, 82, 0.6);
    border-radius: 0 0 8px 8px;
    display: flex;
    width: 100%;
    overflow: hidden;
    height: 40px;
`;

const TitleText = styled.div`
    width: 150px;
    height: 40px;
    padding: 0;
    overflow: hidden;
    flex-direction: row;
    font-size: 16px;
    text-align: center;
    color: rgba(255, 255, 255, 1);
    text-overflow: ellipsis;
    display: box;
    line-height: 20px;
    z-index: 100;
    padding: 0 12px;
    font-weight: lighter;
    font-size: 12px;
    width: 80px;
    font-size: 12px;
    height: initial;
`;

const LoadingText = styled.div`
    text-align: center;
    width: 100%;
    font-weight: bold;
    padding: 12px;
`;

// interface Props {
//   userId?: string;
//   biteIds?: string[];
//   audienceRating?: string;
//   visibility?: string;
//   onCreatePlaylist?: any;
// }
//
// interface State {}

function uniq(a) {
    return Array.from(new Set(a));
}

const DefaultProps = {};

export class FeaturedBoards extends React.Component {
    static defaultProps = DefaultProps;

    selectBoard = (boardId, biteIds) => async () => {
        if (this.props.handleSelectBoard) {
            this.props.handleSelectBoard({ boardId, selectedType: "FEATURED" });
        }
    };

    renderBoards = (boards, selectedIds) => (index, key) => {
        const board = boards[index];

        if (board) {
            const checked = selectedIds.indexOf(board._id) !== -1;
            return (
                <BoardSquareContainer
                    key={board._id}
                    onClick={this.selectBoard(board._id, board.biteIds)}
                >
                    <StyledPlusCheckButton isChecked={checked} />
                    <BoardImage
                        src={
                            (board.image && board.image.original.url) ||
                            (board.giphy && board.giphy.gif)
                        }
                    />
                    <TitleSection>
                        <TitleText>{board.title}</TitleText>
                    </TitleSection>
                    <Scrim />
                </BoardSquareContainer>
            );
        }
    };

    render() {
        return (
            <Query
                query={POPULAR_BOARD_QUERY}
                ssr={false}
                variables={{
                    limit: 40,
                }}
            >
                {({ loading, error, data }) => {
                    if (loading || !data) {
                        return (
                            <ListContainer>
                                <LoadingText>
                                    {"Hacky Loading Icon!!"}
                                </LoadingText>
                            </ListContainer>
                        );
                    }

                    return (
                        <ListContainer>
                            <HorizontalList
                                length={
                                    data &&
                                    data.twitch &&
                                    data.twitch.playlistRandomMany &&
                                    data.twitch.playlistRandomMany.length
                                }
                                renderListItems={this.renderBoards(
                                    data &&
                                        data.twitch &&
                                        data.twitch.playlistRandomMany,
                                    this.props.selectedIds,
                                )}
                                showArrows={true}
                            />
                        </ListContainer>
                    );
                }}
            </Query>
        );
    }
}

export default FeaturedBoards;
