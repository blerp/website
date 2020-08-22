/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import { withRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";

import CreateBlerpMessage from "../user/create-blerp-message";
import BoardGridView from "./board-grid-view";
import SearchAddModal from "./search-add-modal";

import { allBlerpColors, randomBlerpColor } from "../../lib/helperFunctions";

import { logEvent } from "../../lib/analytics";

const SoundboardContentContainer = styled.div`
    width: 1400px;
    padding: 28px 80px;
    margin-bottom: 80px;

    @media (max-width: 600px) {
        padding: 28px 0;
    }

    @media (max-width: 1200px) {
        width: 1000px;
    }

    @media (max-width: 800px) {
        width: 800px;
    }

    @media (max-width: 800px) {
        width: 800px;
    }

    @media (max-width: 600px) {
        width: 400px;
    }

    @media (max-width: 390px) {
        width: 320px;
    }
`;

// interface Props {
//   board: any;
//   editable?: any;
// }

// interface State {
//   color: any;
//   openModal: boolean;
//   position: number;
//   board: any;
// }

export default class BoardParentController extends React.Component {
    backgroundColor = "#fff";
    props;
    state = {
        board: this.props.board,
        color: randomBlerpColor(),
        openModal: false,
        position: 0,
    };

    constructor(props) {
        super(props);
    }

    modalClosed = () => {
        this.setState({ openModal: false });
    };

    toggleModalAtPosition = ({ index }) => {
        this.setState({ openModal: !this.state.openModal, position: index });
    };

    handleBoardChange = ({ bite, index }) => {
        const updatedBoard = JSON.parse(JSON.stringify(this.state.board));
        updatedBoard.biteObjects[index] = bite;
        this.setState({ board: updatedBoard, openModal: false });
        logEvent("Board", "Replace Bite With New", bite._id, index);
    };

    handleBoardDelete = ({ index, deleted }) => {
        const updatedBoard = JSON.parse(JSON.stringify(this.state.board));
        const biteId = updatedBoard.biteObjects[index];
        if (deleted) {
            updatedBoard.biteObjects[index] = null;
            this.setState({ board: updatedBoard, openModal: false });
        }
        logEvent("Board", "Delete Bite", biteId, index);
    };

    render() {
        return (
            <SoundboardContentContainer>
                {this.props.board ? (
                    <BoardGridView
                        selectPosition={this.toggleModalAtPosition}
                        boardId={this.state.board._id}
                        keycodes={
                            this.state.board.keycodes.length
                                ? this.state.board.keycodes
                                : new Array(24).fill(null)
                        }
                        bites={
                            this.state.board.biteObjects.length
                                ? this.state.board.biteObjects
                                : new Array(24).fill(null)
                        }
                        open={this.state.openModal}
                        colored={false}
                        handleBoardDelete={this.handleBoardDelete}
                        editable={this.props.editable}
                    />
                ) : (
                    <CreateBlerpMessage />
                )}
                <SearchAddModal
                    open={this.state.openModal}
                    position={this.state.position}
                    onModalClose={this.modalClosed}
                    boardId={this.state.board._id}
                    handleBoardChange={this.handleBoardChange}
                />
            </SoundboardContentContainer>
        );
    }
}
