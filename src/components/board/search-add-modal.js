/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import gql from "graphql-tag";
import "isomorphic-fetch";

import styled from "styled-components";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";

import { flowRight as compose } from "lodash";

import SearchAddList from "./search-add-list";
import { logEvent } from "../../lib/analytics";

const ModalContainer = styled.div`
    display: ${props => {
        return props.isOpen ? "block" : "none";
    }};
`;

const Backdrop = styled.div`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow-y: scroll; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
`;

const Modal = styled.div`
    position: fixed;
    margin: 5% auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 5px 5px #1d1d1d;
    overflow-y: scroll;
    width: 80%;
    height: 60%;
    z-index: 9999;
    top: 20%;
    left: 10%;
`;

const CloseButton = styled.button`
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    border: none;
    background: transparent;

    &:hover {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    &:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;

const SearchForm = styled.form`
    display: flex;
    background-color: white;
    height: 45px;
    padding: 40px 0;

    @media (max-width: 600px) {
        ${({ visibleOnMobile }) =>
            visibleOnMobile
                ? "visibility: visible;"
                : "position: absolute; visibility: hidden;"};
    }
`;

const SearchBox = styled.input`
    width: 100%;
    height: 48px;
    font-size: inherit;
    padding-left: 5px;
    padding-right: 5px;
    appearance: none;
    border: 3px solid #a1a1a1;
`;

// interface Props {
//   open: boolean;
//   position: number;
//   onModalClose: any;
//   handleBoardChange: any;
//   boardId: string;
//   addBiteToSoundboardWeb: any;
// }

// interface State {
//   modalOpen: boolean;
//   position: number;
//   searchValue: string;
//   searchQueue: string;
// }

class SearchAddModal extends React.Component {
    props;
    state;
    closeButton;
    timer;

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: props.open,
            position: props.position,
            searchQueue: "",
            searchValue: "",
        };
    }

    componentDidMount() {
        this.closeButton.focus();
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState(
            { modalOpen: props.open, position: props.position },
            () => {
                if (props.open) {
                    this.closeButton.focus();
                }
            },
        );
    }

    openModal = () => {
        this.setState({ modalOpen: true }, () => {
            this.closeButton.focus();
        });
    };

    closeModal = () => {
        this.setState({ modalOpen: false });
        this.props.onModalClose();
    };

    innerRef = el => {
        this.closeButton = el;
    };

    render() {
        return (
            <ModalContainer isOpen={this.state.modalOpen}>
                <Backdrop onClick={this.closeModal} />
                <Modal>
                    <CloseButton ref={this.innerRef} onClick={this.closeModal}>
                        &times;
                    </CloseButton>
                    <SearchForm visibleOnMobile={true} role='search'>
                        <SearchBox
                            type='search'
                            placeholder='Search here...'
                            aria-label='Search for a blerp'
                            value={this.state.searchQueue}
                            onChange={this.defaultHandleSearchChange}
                        />
                    </SearchForm>
                    {this.state.modalOpen && (
                        <SearchAddList
                            searchQuery={this.state.searchValue}
                            handleAddButtonClicked={this.handleAddBiteToBoard}
                        />
                    )}
                </Modal>
            </ModalContainer>
        );
    }

    handleAddBiteToBoard = async ({ id }) => {
        try {
            const result = await this.props.addBiteToSoundboardWeb({
                variables: {
                    bite: id,
                    id: this.props.boardId,
                    index: this.props.position,
                },
            });

            this.setState({ searchQueue: "", searchValue: "" });

            if (result.data.errors) {
                // TODO: make UI for this
                alert("Failed to add blerp to board!");
                return;
            } else {
                // TODO: show successfully added screen
                if (this.props.handleBoardChange) {
                    this.props.handleBoardChange({
                        bite:
                            result.data.web.boardSetBite.biteObjects[
                                this.props.position
                            ],
                        index: this.props.position,
                    });
                }
            }
        } catch (error) {
            // TODO: Make Proper UI For This
            this.setState({ searchQueue: "", searchValue: "" });
            alert(`Failed to add blerp to board due to error: ${error}`);
            return;
        }
    };

    defaultHandleSearchSubmit = event => {
        event.preventDefault();
        const searchValue = this.state.searchValue.split(" ").join("-");
    };

    defaultHandleSearchChange = event => {
        event.preventDefault();
        // NOTE: This was used before to put a throttle on the scroll but we just use it for logs now
        clearTimeout(this.timer);
        if (this.state.searchQueue === "") {
            this.setState({
                searchQueue: event.currentTarget.value,
                searchValue: event.currentTarget.value,
            });
        } else {
            this.setState({
                searchQueue: event.currentTarget.value,
                searchValue: event.currentTarget.value,
            });

            this.timer = setTimeout(() => {
                logEvent("Search", "Board Modal", this.state.searchQueue);
            });
        }
    };
}

const addBiteToSoundboardWeb = gql`
    mutation setBiteOnBoardFromWeb(
        $id: MongoID!
        $bite: MongoID!
        $index: Int!
    ) {
        web {
            boardSetBite(_id: $id, bite: $bite, index: $index) {
                _id
                biteObjects {
                    _id
                    ownerId
                    audio {
                        original {
                            url
                        }
                        mp3 {
                            url
                        }
                    }
                    image {
                        original {
                            url
                        }
                    }
                    source
                    title
                    color
                    visibility
                    audienceRating
                    playCount
                    updatedAt
                    createdAt
                }
            }
        }
    }
`;

export default compose(
    graphql(addBiteToSoundboardWeb, {
        name: "addBiteToSoundboardWeb",
    }),
)(SearchAddModal);
