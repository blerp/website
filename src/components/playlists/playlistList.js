/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import HorizontalListNew from "../lists/HorizontalListNew";
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
    margin: 8px 16px;
`;

const PlaylistItemContainer = styled.div`
    margin: 8px 12px;
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
class PlaylistList extends React.Component {
    containerScroll;
    props;
    constructor(props) {
        super(props);
        this.containerScroll = React.createRef();
    }
    renderPlaylists = playlist => (index, key) => {
        if (index === 0) {
            return (
                <PlaylistItemContainer key={index}>
                    <PlaylistBoardSquare
                        id={playlist._id}
                        title={playlist.title}
                        color={playlist.color}
                        imageUrl={
                            (playlist.image && playlist.image.original.url) ||
                            (playlist.giphy && playlist.giphy.gif)
                        }
                        dontBeLink={false}
                        showDeleteButtons={false}
                        onDeleteClick={() => {}}
                        dontShowTitle={true}
                    />
                </PlaylistItemContainer>
            );
        }

        if (playlist.bitesPagination.items.length >= 1) {
            const bites = playlist.bitesPagination.items;
            const bite = bites[index - 1];
            if (!bite) {
                return <div>No Blerps Added!</div>;
            }

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
                        playlistId={this.props.playlist._id}
                        night={false}
                        bite={bite}
                    />
                </ItemContainer>
            );
        } else if (playlist.bitesPagination.items.length === 0) {
            return <div>No blerps!</div>;
        }
    };

    render() {
        return (
            <Container>
                <HorizontalListNew
                    length={
                        this.props.playlist.bitesPagination.items.length + 1
                    }
                    renderListItems={this.renderPlaylists(this.props.playlist)}
                    showArrows={this.props.showArrows}
                    isGrayButton={this.props.isGrayButton}
                    flexStart={true}
                />
            </Container>
        );
    }
}

export default PlaylistList;
