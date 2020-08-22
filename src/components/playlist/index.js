/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import * as React from "react";
import styled from "styled-components";
import Bite from "../bite";

import OpenMenuIconBlack from "../icons/open-menu-icon-black";

import Link from "next/link";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    disabledText,
    iconsActive,
    bodyText,
} from "../../styles/colors";

const Container = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: column;
    background-color: ${props =>
        props.colored ? defaultBackground : `transparent`};
    padding: 8px 40px 28px;
    border-bottom: 1px solid rgba(53, 58, 64, 0.3);
    align-items: center;
    justify-content: center;
    margin: 0 80px;

    @media (max-width: 600px) {
        margin: 0;
    }
`;

const StyledOpenIconBlack = styled(OpenMenuIconBlack)``;

const OuterContentContainer = styled.div`
    overflow-x: scroll;
    -ms-overflow-style: none;

    @media (max-width: 920px) {
        width: 100%;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;

const InnerContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    padding: inherit;
    align-items: center;
    justify-content: center;
    width: max-content;
`;

const TopicTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-decoration: none;

    &:hover {
        opacity: 0.5;
    }
`;

const TopicTitleLink = styled.a`
    text-decoration: none;
`;

const TopicTitle = styled.h2`
    color: ${bodyText};
    font-weight: bold;
    font-size: 28px;
    padding: 16px 4px;
    text-decoration: none;
    align-self: center;

    @media (max-width: 600px) {
        font-size: 20px;
    }
`;

const TopicIconContainer = styled.div`
    width: 12px;
    height: 12px;
    padding: 4px;

    @media (max-width: 600px) {
        width: 8px;
        height: 8px;
    }
`;

const BiteContainer = styled.div`
    margin: 4px;
`;

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(initialArray) {
    const array = initialArray.slice(0);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// interface State {
//   content: any;
//   showCount: number;
// }

// interface Props {
//   defaultShowCount?: number;
//   playlist: {
//     _id: string;
//     title: string;
//     biteObjects: any[];
//   };
//   colored?: boolean;
//   featuredPage?: string;
// }

const itemsRenderer = (items, ref) => (
    <OuterContentContainer>
        <InnerContentContainer ref={ref}>{items}</InnerContentContainer>
    </OuterContentContainer>
);

export default class Playlist extends React.Component {
    state;
    props;

    constructor(props) {
        super(props);
        this.state = {
            content: shuffleArray(props.playlist.biteObjects),
            showCount: props.defaultShowCount || 5,
        };
    }

    render() {
        return (
            <Container colored={this.props.colored || false}>
                <Link
                    prefetch={true}
                    href={{
                        pathname: "/soundboard",
                        query: { id: this.props.playlist._id },
                    }}
                    as={`/soundboard/${this.props.playlist._id}`}
                >
                    <TopicTitleContainer>
                        <TopicTitleLink
                            href={`/soundboard/${this.props.playlist._id}`}
                        >
                            <TopicTitle>{this.props.playlist.title}</TopicTitle>
                        </TopicTitleLink>
                        <TopicIconContainer>
                            <StyledOpenIconBlack />
                        </TopicIconContainer>
                    </TopicTitleContainer>
                </Link>
                <List
                    itemsRenderer={itemsRenderer}
                    itemCount={this.state.showCount}
                >
                    {(index, key) => {
                        const bite = this.state.content[index];
                        if (bite) {
                            return (
                                <BiteContainer key={key}>
                                    <Bite
                                        id={bite._id}
                                        title={bite.title}
                                        audioSourceUrls={[
                                            bite.audio.mp3.url,
                                            bite.audio.original.url,
                                        ]}
                                        color={bite.color}
                                        image={
                                            (bite.image &&
                                                bite.image.original.url) ||
                                            (bite.giphy && bite.giphy.gif)
                                        }
                                        favorited={bite.favorited}
                                        playCount={bite.playCount}
                                        featuredPage={this.props.featuredPage}
                                        preload={true}
                                        bite={bite}
                                    />
                                </BiteContainer>
                            );
                        }
                    }}
                </List>
            </Container>
        );
    }
}
