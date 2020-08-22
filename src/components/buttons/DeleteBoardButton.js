/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import "isomorphic-fetch";
import * as React from "react";
import styled from "styled-components";

const DeleteButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 52px;
    height: 52px;
    opacity: 1;
    padding: 12px;

    &:hover {
        opacity: 0.7;
    }
`;

const DeleteIcon = styled.img`
    width: 100%;
    height: 100%;
    align-self: center;
    white-space: nowrap;
`;

// interface Props {
//   boardId: string;
//   onClick?: any;
//   className?: string;
// }

class DeleteBoardButton extends React.Component {
    static defaultProps = {
        onClick: () => {},
    };
    props;
    state = {};

    onDeleteBoard = () => {
        this.props.onClick({ boardId: this.props.boardId });
    };

    render() {
        return (
            <DeleteButton
                className={this.props.className}
                onClick={this.onDeleteBoard}
            >
                <DeleteIcon src='https://storage.googleapis.com/blerp-public-images/interaction/close-x.svg' />
            </DeleteButton>
        );
    }
}

export default DeleteBoardButton;
