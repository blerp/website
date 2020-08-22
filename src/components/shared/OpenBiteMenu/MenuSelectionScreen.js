/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import * as ReactDOM from "react-dom";

import styled, { keyframes } from "styled-components";

import CloseButton from "../../buttons/CloseButton";
import ImageUpdateScreen from "./ImageUpdateScreen";
import DeleteBiteScreen from "./DeleteBiteScreen";

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

const StyledCloseButton = styled(CloseButton)`
    position: absolute;
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;

    &:focus {
        border-radius: 6px;
        border: 2px solid ${pandaPink} !important;
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
    flex-direction: column;
    background-color: ${actionBackground};
    min-width: 320px;
    min-height: 320px;
    justify-content: flex-start;
`;

const MenuRow = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 60px;
    background-color: transparent;

    &:hover {
        background-color: ${pandaPink};
    }
`;

const MenuTitle = styled.div`
    margin: 4px;
    width: 70%;
    font-size: 18px;
    font-weight: 600;
    color: ${props => (props.selected ? pandaTeal : secondaryGray)};
`;

const MenuItems = {
    image: "IMAGE",
    delete: "DELETE",
};

class MenuSelectionScreen extends React.Component {
    state = {
        chosenScreen: "",
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

    handleSelectMenuItem = screen => () => {
        this.setState({ chosenScreen: screen });
    };

    handleCancelClick = () => {
        this.setState({ chosenScreen: "" });
    };

    renderMenuSelect(screen, title) {
        return (
            <MenuRow key={title} onClick={this.handleSelectMenuItem(screen)}>
                <MenuTitle>{title}</MenuTitle>
            </MenuRow>
        );
    }

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
                        <HeaderText>{"Blerp Menu"}</HeaderText>
                    </ContentHeader>
                    {!this.state.chosenScreen && (
                        <ContentBody>
                            {this.renderMenuSelect(
                                MenuItems.image,
                                "Update Image",
                            )}
                            {this.renderMenuSelect(
                                MenuItems.delete,
                                "Delete Blerp",
                            )}
                        </ContentBody>
                    )}
                    {this.state.chosenScreen === MenuItems.image && (
                        <ContentBody>
                            <ImageUpdateScreen
                                biteId={this.props.biteId}
                                handleImageUploadFinished={
                                    this.props.handleImageUploadFinished
                                }
                            />
                        </ContentBody>
                    )}
                    {this.state.chosenScreen === MenuItems.delete && (
                        <ContentBody>
                            <DeleteBiteScreen
                                biteId={this.props.biteId}
                                handleCancelClick={this.handleCancelClick}
                                handleDeleteFinished={this.handleCancelClick}
                            />
                        </ContentBody>
                    )}
                </ContentModal>
            </ScreenContainer>,
            this.el,
        );
    }
}

export default MenuSelectionScreen;
