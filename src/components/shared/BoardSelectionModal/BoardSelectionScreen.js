/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import styled, { keyframes } from "styled-components";

import BoardSearchScreen from "./BoardSearchScreen";
import FeaturedBoards from "./FeaturedBoards";

import SecondaryButton from "../../buttons/SecondaryButton";

import CloseButton from "../../buttons/CloseButton";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    headerText,
    iconsActive,
    inputBorderColor,
    secondaryGray,
    bodyText,
    secondaryText,
} from "../../../styles/colors";

const screenSizeHide = 1024;

const slideIn = keyframes`
  0% {
    opacity: 0;
  }

  25% {

  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    opacity: 1;
    top: 0;
  }

  25% {

  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 0;
    top: ${screenSizeHide}px;
  }
`;

const ScreenContainer = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    border-radius: 0;
    opacity: ${props => {
        return props.showScreen ? 1 : 0;
    }};
    top: ${props => {
        return props.showScreen ? "0" : `${screenSizeHide}px`;
    }};
    animation: ${props => {
            return props.showScreen ? slideIn : slideOut;
        }}
        0.5s 1;
    border-radius: ${props => (props.isOverlay ? "12px" : "0")};

    @media (min-width: 600px) {
        justify-content: center;
    }
`;

const HeaderText = styled.div`
    font-weight: 600;
    text-align: center;
    font-size: 24px;
    line-height: 24px;
    padding: 12px;
    text-decoration: none;
    color: ${bodyText};
`;

const SecondaryText = styled.div`
    font-weight: light;
    text-align: center;
    font-size: 14px;
    line-height: 14px;
    text-decoration: none;
    text-align: left;
    color: ${props => (props.color ? props.color : bodyText)};
    padding: 0 0 4px;
`;

const TextContainer = styled.div`
    padding: 8px;
    width: 280px;
`;

const StyledCloseButton = styled(CloseButton)`
    position: absolute;
    top: 8px;
    right: 8px;

    &:focus {
        border-radius: 40px;
        border: 2px solid #21cfa7 !important;
        outline: 0 !important;
        box-shadow: none !important;
    }
`;

const ContentModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 8px;
`;

const ContentHeader = styled.div`
    border-radius: 8px 8px 0 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${flyoutBackground};
    width: 100%;
`;

const ContentBody = styled.div`
    border-radius: 0 0 8px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${actionBackground};
    width: 100%;
`;

class BoardSelectionScreen extends React.Component {
    state = {
        boardIds: this.props.defaultSelectedBoardIds
            ? this.props.defaultSelectedBoardIds
            : [],
    };
    constructor(props) {
        super(props);
        if (process.browser) {
            this.appRoot = document && document.getElementById("root");
            this.modalRoot = document && document.getElementById("modal-root");
            this.el = document && document.createElement("div");
        }
    }

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        this.modalRoot.appendChild(this.el);
        // Prevents scrolling behind the screen
        // this.appRoot.setAttribute("style", "overflow: hidden; position:fixed;");
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);

        // Reenables scrolling behind the screen
        // this.appRoot.setAttribute("style", "overflow: auto; position:static;");
    }

    handleSelectBoard = ({ boardId, selectedType }) => {
        const indexOfId = this.state.boardIds.indexOf(boardId);
        // If board exists then remove it
        if (indexOfId !== -1) {
            const copyOfIds = [...this.state.boardIds];
            // var filteredAry = unfilteredArray.filter(e => e !== boardId)
            copyOfIds.splice(indexOfId, 1);
            this.setState({ boardIds: copyOfIds });
        } else {
            this.setState({ boardIds: [...this.state.boardIds, boardId] });
        }
    };

    handleCloseClick = () => {
        if (this.props.onCloseClick) {
            this.props.onCloseClick();
        }
    };

    handleConfirmClick = () => {
        if (this.props.onSelectClick) {
            this.props.onSelectClick({ boardIds: this.state.boardIds });
        }
    };

    render() {
        return ReactDOM.createPortal(
            <ScreenContainer
                showScreen={this.props.showScreen}
                isOverlay={this.props.isOverlay}
            >
                <ContentModal>
                    <ContentHeader>
                        <StyledCloseButton
                            lightIcon={false}
                            onClick={this.handleCloseClick}
                        />
                        <HeaderText>{"Select a board"}</HeaderText>
                    </ContentHeader>
                    <ContentBody>
                        <TextContainer>
                            <SecondaryText>{"Featured Boards"}</SecondaryText>
                            <FeaturedBoards
                                handleSelectBoard={this.handleSelectBoard}
                                selectedIds={this.state.boardIds}
                            />
                        </TextContainer>
                        <BoardSearchScreen
                            handleSelectBoard={this.handleSelectBoard}
                            selectedIds={this.state.boardIds}
                        />
                        <SecondaryButton onClick={this.handleConfirmClick}>
                            Confirm
                        </SecondaryButton>
                    </ContentBody>
                </ContentModal>
            </ScreenContainer>,
            this.el,
        );
    }
}

export default BoardSelectionScreen;
