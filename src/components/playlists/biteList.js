/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import HorizontalList from "../lists/HorizontalList";
import Bite from "../bite";
import PlaylistBoardSquare from "../board/playlist-board-square";

const Container = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: column;

    @media (max-width: 600px) {
    }
`;

const ItemContainer = styled.div`
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

// Use this to render a single playlist with
class BitesList extends React.Component {
    containerScroll;
    props;
    constructor(props) {
        super(props);
        this.containerScroll = React.createRef();
    }

    renderPlaylists = bites => (index, key) => {
        // if(index == 0) {
        //   <PlaylistBoardSquare
        //       id={board._id}
        //       title={board.title}
        //       color={board.color}
        //       imageUrl={
        //         (board.image && board.image.original.url) ||
        //         (board.giphy && board.giphy.gif)
        //       }
        //       dontBeLink={false}
        //       showDeleteButtons={this.props.showDeleteButtons}
        //       onDeleteClick={this.props.onDeleteClick}
        //     />
        // }
        const bite = bites[index];
        return (
            <ItemContainer key={index}>
                <Bite
                    key={key}
                    id={bite._id}
                    title={bite.title}
                    audioSourceUrls={[
                        bite.audio.mp3.url,
                        bite.audio.original.url,
                    ]}
                    color={bite.color}
                    image={
                        (bite.image && bite.image.original.url) ||
                        (bite.giphy && bite.giphy.gif)
                    }
                    favorited={bite.favorited}
                    favoriteCallback={() => {}}
                    playCount={bite.playCount}
                    night={false}
                    bite={bite}
                />
            </ItemContainer>
        );
    };

    render() {
        if (
            !this.props.playlist ||
            (this.props.playlist && this.props.playlist.bites.length === 0)
        ) {
            return (
                <EmptyContainer>
                    <EmptyTitle>{"No Bites In Board"}</EmptyTitle>
                </EmptyContainer>
            );
        }
        return (
            <Container>
                <HorizontalList
                    length={this.props.playlist.bites.length} // Eventually plus 1
                    renderListItems={this.renderPlaylists(
                        this.props.playlist.bites,
                    )}
                    showArrows={true}
                    isGrayButton={this.props.isGrayButton}
                />
            </Container>
        );
    }
}

export default BitesList;
