/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import * as React from "react";
import styled from "styled-components";
import PlaylistBoardSquare from "../board/playlist-board-square";

const Container = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #bebebc;
    padding: 0 40px 24px;

    @media (max-width: 600px) {
        padding: 8px;
    }
`;

const OuterContentContainer = styled.div`
    overflow-x: scroll;
    -ms-overflow-style: none;
    border-left: 2px solid #2d2d2d;
    border-right: 2px solid #2d2d2d;
    overflow-y: hidden;
    transition: 0.3s;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const InnerContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    padding: inherit;
    width: fit-content;
`;

const PlaylistsContainerTitle = styled.h3`
    color: #1d1d1d;
    font-weight: bold;
    font-size: 24px;
    align-self: flex-start;
    text-decoration: none;
    margin: 16px 0;
`;

const PlaylistsContainer = styled.div`
    margin: 8px;
`;

const EmptyContainer = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: #bebebc;
    align-items: center;
    justify-content: center;
`;

const EmptyTitle = styled.div`
    color: #1d1d1d;
    font-weight: bold;
    font-size: 24px;
    align-self: flex-start;
    text-decoration: none;
    margin: 20px;
    text-align: center;
`;

// Featured Page defines how the bite is featured
// interface Props {
//   title: string;
//   playlists: any;
//   colored?: boolean;
//   featuredPage?: string;
// }

class Playlists extends React.Component {
    containerScroll;
    props;
    constructor(props) {
        super(props);
        this.containerScroll = React.createRef();
    }

    handleOnMouseOver = () => {
        // TODO: get to work
        this.containerScroll.current.scrollLeft =
            this.containerScroll.current.scrollLeft + 10;
        // document.getElementById("boards-inner-bar-container")
    };

    itemsRenderer = (items, ref) => (
        <OuterContentContainer ref={this.containerScroll}>
            <InnerContentContainer id='boards-inner-bar-container' ref={ref}>
                {items}
            </InnerContentContainer>
        </OuterContentContainer>
    );

    render() {
        if (this.props.playlists.length === 0) {
            return (
                <EmptyContainer>
                    <EmptyTitle>{"No Boards Found."}</EmptyTitle>
                </EmptyContainer>
            );
        }
        return (
            <Container>
                <PlaylistsContainerTitle>
                    {this.props.title}
                </PlaylistsContainerTitle>
                <List
                    itemsRenderer={this.itemsRenderer}
                    itemCount={this.props.playlists.length}
                >
                    {(index, key) => {
                        const board = this.props.playlists[index];
                        return (
                            <PlaylistsContainer key={key}>
                                <PlaylistBoardSquare
                                    id={board._id}
                                    title={board.title}
                                    color={board.color}
                                    imageUrl={
                                        (board.image &&
                                            board.image.original.url) ||
                                        (board.giphy && board.giphy.gif)
                                    }
                                    dontBeLink={false}
                                />
                            </PlaylistsContainer>
                        );
                    }}
                </List>
            </Container>
        );
    }
}

export default Playlists;
