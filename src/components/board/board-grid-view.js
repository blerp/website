/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import * as React from "react";
import styled from "styled-components";

import BoardBite from "./board-bite";
import Placeholder from "./board-blerp-placeholder";

import ContentContainerGrid from "../shared/ContentContainerGridSmallBig";

const Container = styled.div`
    width: 100%;
    background-color: ${props => (props.colored ? `#34383e` : `transparent`)};
`;

const BOARD_SIZE = 24;

// interface Props {
//   bites: any;
//   keycodes: any;
//   editable: any;
//   colored?: any;
//   boardId: any;
//   open: boolean;
//   selectPosition?: (props: { id?: string; index?: number }) => void;
//   handleBoardDelete?: (props: { index: any; deleted: any }) => void;
// }

const itemsRenderer = (items, ref) => (
    <ContentContainerGrid ref={ref} role='region' aria-labelledby='recent'>
        {items}
    </ContentContainerGrid>
);
const BoardGridView = props => (
    <Container colored={props.colored || false}>
        <List itemCount={BOARD_SIZE} itemsRenderer={itemsRenderer}>
            {(index, key) => {
                const bite = props.bites[index];
                if (bite) {
                    return (
                        <BoardBite
                            key={key}
                            biteId={bite._id}
                            title={bite.title}
                            audioSourceUrls={[
                                bite.audio.mp3.url,
                                bite.audio.original.url,
                            ]}
                            color={bite.color}
                            imageUrl={bite.image && bite.image.original.url}
                            index={index}
                            adding={false}
                            boardId={props.boardId}
                            editable={props.editable}
                            onPlaceholderClick={props.selectPosition}
                            isSpam={true}
                            keycode={props.keycodes[index]}
                            hotkeyEnabled={!props.open}
                            onDeleteClick={props.handleBoardDelete}
                            favorited={bite.favorited}
                        />
                    );
                } else {
                    return (
                        <Placeholder
                            key={key}
                            title={
                                props.editable
                                    ? "Click this placeholder to add a blerp to this soundboard"
                                    : "A placeholder for a future blerp"
                            }
                            editable={props.editable}
                            index={index}
                            onPlaceholderClick={props.selectPosition}
                        />
                    );
                }
            }}
        </List>
    </Container>
);

export default BoardGridView;
