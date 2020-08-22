/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import PlaylistList from "./playlistList";
import Link from "next/link";

import FollowHeartButton from "../shared/FollowHeartButton";

import {
    lighterDarkText,
    lightGray,
    flyoutBackground,
    defaultBackground,
} from "../../styles/colors";
import BoardShare from "../shared/AddBoardMenu/board-share";

const BoardsContainer = styled.div`
    position: relative;
    padding: 32px 8px;
    background-color: ${props =>
        props.backgroundColor ? props.backgroundColor : "transparent"};

    &:hover {
        background-color: ${props =>
            props.hoverBackground ? props.hoverBackground : "transparent"};
        border-bottom: 1px solid ${props => props.theme.darkBackground};
    }

    &:hover:after {
        width: 280px;
        height: 10px;
        position: absolute;
        bottom: -5px;
        left: 1.5%;
        background-color: #3505b3;
        border-radius: 10px;
        content: " ";
    }

    &:hover .board_row_engage__hide_buttons {
        opacity: 1;
    }
`;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 24px;
    left: 0px;
`;

const SectionTitleSpace = styled.a`
    color: ${lighterDarkText};
    display: block;
    font-weight: 600;
    max-width: 320px;
    height: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-decoration: none;
    padding: 8px 24px;
    text-align: left;
    font-size: 18px;
    margin: 0;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

const StyledHeartButton = styled(FollowHeartButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    background-position: center;
    z-index: 50;
    text-decoration: none;
    opacity: 0;

    &:focus {
        border: none;
    }
`;

const ArrowShareButton = styled.button`
    background-color: transparent;
    border: none;
    opacity: 0;
`;

const ArrowShareImage = styled.img`
    width: 26px;
    height: 26px;
`;

// Use this to render a single playlist with
class PlaylistListContainer extends React.Component {
    props;
    static defaultProps = {};

    followedCallback = follow => {
        console.log("followed callback", follow);
    };

    render() {
        if (
            !this.props.playlist.bitesPagination ||
            (this.props.playlist &&
                this.props.playlist.bitesPagination.items.length === 0)
        ) {
            return (
                <BoardsContainer
                    backgroundColor={flyoutBackground}
                    hoverBackground={defaultBackground}
                    theme={this.props.theme}
                >
                    <RowContainer>
                        <Link
                            prefetch={true}
                            href={{
                                pathname: "/soundboard",
                                query: { id: this.props.playlist._id },
                            }}
                            as={`/soundboard/${this.props.playlist._id}`}
                        >
                            <SectionTitleSpace
                                href={`/soundboard/${this.props.playlist._id}`}
                            >
                                {this.props.playlist.title}
                            </SectionTitleSpace>
                        </Link>
                        <StyledHeartButton
                            className='board_row_engage__hide_buttons'
                            playlistId={this.props.playlist._id}
                            loggedIn={true}
                            followed={this.props.playlist.followed}
                            favoriteCallback={this.followedCallback}
                        />
                        <BoardShare
                            playlist={this.props.playlist}
                            data={this.props}
                        />
                        {/* <ArrowShareButton className="board_row_engage__hide_buttons">
              <ArrowShareImage src="https://storage.googleapis.com/blerp_products/Web/share%20outline.svg"/>
            </ArrowShareButton> */}
                    </RowContainer>

                    <PlaylistList
                        playlist={this.props.playlist}
                        isGrayButton={this.props.isDarker ? true : false}
                        showArrows={true}
                    />
                </BoardsContainer>
            );
        }

        return (
            <BoardsContainer
                backgroundColor={flyoutBackground}
                hoverBackground={defaultBackground}
            >
                <RowContainer>
                    <Link
                        prefetch={true}
                        href={{
                            pathname: "/soundboard",
                            query: { id: this.props.playlist._id },
                        }}
                        as={`/soundboard/${this.props.playlist._id}`}
                    >
                        <SectionTitleSpace
                            href={`/soundboard/${this.props.playlist._id}`}
                        >
                            {this.props.playlist.title}
                        </SectionTitleSpace>
                    </Link>
                    <StyledHeartButton
                        className='board_row_engage__hide_buttons'
                        playlistId={this.props.playlist._id}
                        loggedIn={true}
                        followed={this.props.playlist.followed}
                        favoriteCallback={this.followedCallback}
                    />
                    <BoardShare
                        playlist={this.props.playlist}
                        data={this.props}
                    />
                    {/* <ArrowShareButton className="board_row_engage__hide_buttons">
            <ArrowShareImage src="https://storage.googleapis.com/blerp_products/Web/share%20outline.svg"/>
          </ArrowShareButton> */}
                </RowContainer>

                <PlaylistList
                    playlist={this.props.playlist}
                    isGrayButton={this.props.isDarker ? true : false}
                    showArrows={true}
                />
            </BoardsContainer>
        );
    }
}

export default PlaylistListContainer;
