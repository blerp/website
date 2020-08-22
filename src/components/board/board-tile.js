/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { keyframes } from "styled-components";
import PlusCheckButton from "../buttons/PlusCheckButton";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    iconsInActive,
    pandaTeal,
    secondaryGray,
} from "../../styles/colors";

const StyledPlusCheckButton = styled(PlusCheckButton)`
    position: absolute;
    top: -4px;
    right: -4px;
`;

const BoardSquareContainer = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    background-color: transparent;
    margin: 4px;
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

// interface Props {
//   userId?: string;
//   biteIds?: string[];
//   audienceRating?: string;
//   visibility?: string;
//   onCreatePlaylist?: any;
// }
//
// interface State {}

const DefaultProps = {};

export class BoardTile extends React.Component {
    static defaultProps = DefaultProps;

    render() {
        return (
            <BoardSquareContainer
                key={this.props.board._id}
                onClick={this.props.onClick}
            >
                <BoardImage
                    src={
                        (this.props.board.image &&
                            this.props.board.image.original.url) ||
                        (this.props.board.giphy && this.props.board.giphy.gif)
                    }
                />
                <TitleSection>
                    <TitleText>{this.props.board.title}</TitleText>
                </TitleSection>
                <Scrim />
            </BoardSquareContainer>
        );
    }
}

// <StyledPlusCheckButton isChecked={checked} />
export default BoardTile;
