/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import HorizontalListNew from "../lists/HorizontalListNew";
import PlaylistBoardSquare from "../board/playlist-board-square";

const Container = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: column;

    @media (max-width: 600px) {
    }
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
//   isGrayButton?: boolean;
// }

// const SectionTitleSpace = styled.p`
//   color: ${lighterDarkText};
//   font-weight: 600;
//   text-decoration: none;
//   padding: 8px 32px;
//   text-align: left;
//   font-size: 18px;
//   margin: 0;
// `;

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

    renderPlaylists = playlists => (index, key) => {
        const board = playlists[index];
        return (
            <PlaylistsContainer key={index}>
                <PlaylistBoardSquare
                    id={board._id}
                    title={board.title}
                    color={board.color}
                    imageUrl={
                        (board.image && board.image.original.url) ||
                        (board.giphy && board.giphy.gif)
                    }
                    dontBeLink={false}
                    showDeleteButtons={this.props.showDeleteButtons}
                    onDeleteClick={this.props.onDeleteClick}
                />
            </PlaylistsContainer>
        );
    };

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
                <HorizontalListNew
                    title={this.props.title}
                    length={this.props.playlists.length}
                    renderListItems={this.renderPlaylists(this.props.playlists)}
                    showArrows={true}
                    isGrayButton={this.props.isGrayButton}
                />
            </Container>
        );
    }
}

export default Playlists;
