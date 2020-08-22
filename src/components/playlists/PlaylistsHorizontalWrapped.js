/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import HorizontalList from "../lists/HorizontalList/index";
import PlaylistBoardSquareWrapped from "../board/playlist-board-square-wrapper";

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

const PlaylistsContainer = styled.div`
    margin: 8px;
`;

// interface Props {
//   playlistIds: any;
// }

class PlaylistsHorizontalWrapped extends React.Component {
    props;
    constructor(props) {
        super(props);
    }

    renderPlaylists = playlistIds => (index, key) => {
        const boardId = playlistIds[index];

        return (
            <PlaylistsContainer key={key}>
                {/* {<PlaylistBoardSquareWrapped
          boardId={boardId}
        />} */}
                {boardId}
            </PlaylistsContainer>
        );
    };

    render() {
        return (
            <Container>
                <HorizontalList
                    length={this.props.playlistIds.length}
                    renderListItems={this.renderPlaylists(
                        this.props.playlistIds,
                    )}
                    showArrows={true}
                />
            </Container>
        );
    }
}

export default PlaylistsHorizontalWrapped;
