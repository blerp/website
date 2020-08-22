/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import * as React from "react";
import styled from "styled-components";
import BeatSquare from "./beat-square";

import Link from "next/link";

const Container = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: ${props => (props.colored ? `#34383e` : `transparent`)};
    padding: 0 40px 24px;
    border-bottom: 1px solid rgba(53, 58, 64, 0.1);
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

const BoardTitle = styled.h3`
    color: #1d1d1d;
    font-weight: bold;
    font-size: 20px;
    align-self: flex-start;
    text-decoration: none;
    margin: 16px 0;
`;

const BiteContainer = styled.div`
    margin: 8px;
`;

// Featured Page defines how the bite is featured
// interface Props {
//   title: string;
//   boards: any;
//   colored?: boolean;
//   featuredPage?: string;
// }

class Boards extends React.Component {
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
        return (
            <Container colored={this.props.colored || false}>
                <BoardTitle>{this.props.title}</BoardTitle>
                <List
                    itemsRenderer={this.itemsRenderer}
                    itemCount={this.props.boards.length}
                >
                    {(index, key) => {
                        const board = this.props.boards[index];
                        return (
                            <BiteContainer key={key}>
                                <BeatSquare
                                    id={board._id}
                                    title={board.title}
                                    color={board.color}
                                    imageUrl={
                                        board.image && board.image.original.url
                                    }
                                />
                            </BiteContainer>
                        );
                    }}
                </List>
            </Container>
        );
    }
}

export default Boards;
