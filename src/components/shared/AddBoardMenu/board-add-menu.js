/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import { default as Router, withRouter } from "next/router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import TriangleIcon from "../../icons/triangle-icon";

import styled from "styled-components";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    disabledText,
    iconsActive,
    bodyText,
    lightGray,
} from "../../../styles/colors";

import AddBoardScreen from "../AddBoardScreen";

const StyledTriangleIcon = styled(TriangleIcon)`
    width: 100%;
    height: 40px;
    padding: 0;
    margin: 0px 0px -11px 0px;
`;

const ModalContainer = styled.div`
    position: absolute;
    background-color: transparent;
    padding: 12px;
    z-index: 1000;
    width: 342px;
    top: ${props => props.posY}px;
    left: ${props => props.posX - 160}px;
`;

const CloseButtonHeader = styled.div`
    display: flex;
    width: 100%;
    border: none;
    text-decoration: none;
    justify-content: flex-end;
`;

const CloseXButton = styled.button`
    color: #aaa;
    width: 20%;
    padding: 4px;
    font-size: 28px;
    font-weight: bold;
    border: none;
    background: transparent;

    &:hover {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;

const BorderLine = styled.div`
    border-top: 1px solid ${lightGray};
    margin: 8px;
    width: 80%;
`;

const ModalSquare = styled.div`
    background-color: #fff;
    z-index: 1000;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    border: 1px solid ${lightGray};
    padding-bottom: 20px;
`;

const ModalContents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

// interface Props {
//   data?: any;
//   biteId: string;
//   onModalClose: any;
//   rootNode?: any;
//   stuff?: any;
//   posX: any;
//   posY: any;
//   router?: any;
//   signedInUserId?: any;
// }

// interface State {
//   stuff?: any;
// }

class BoardAddMenu extends React.Component {
    static defaultProps = {};
    modalRoot;
    el;
    closeButton;

    constructor(props) {
        super(props);
        this.modalRoot =
            props.rootNode ||
            (document && document.getElementById("blerp-modal-root"));
        this.el = document.createElement("div");
    }

    componentDidMount() {
        this.modalRoot.appendChild(this.el);
        document &&
            document.addEventListener("mousedown", this.closeModalOutsideClick);
        this.closeButton.focus();
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
        document &&
            document.removeEventListener(
                "mousedown",
                this.closeModalOutsideClick,
            );
    }

    closeModal = () => {
        this.props.onModalClose();
    };

    closeModalOutsideClick = event => {
        const domNode = ReactDOM.findDOMNode(this);

        // Detects if there was an outside click
        if (!domNode || !domNode.contains(event.target)) {
            this.closeModal();
        }
    };

    getCloseButton = el => {
        this.closeButton = el;
    };

    render() {
        return ReactDOM.createPortal(
            <ModalContainer
                posX={this.props.posX - 10}
                posY={this.props.posY - 10}
            >
                <StyledTriangleIcon />
                <ModalSquare>
                    <ModalContents>
                        <CloseButtonHeader>
                            <CloseXButton
                                aria-label="You are on a close button at the bottom of a drop down. There is a close button at the bottom.. Becareful because we don't trap focus yet."
                                ref={this.getCloseButton}
                                onClick={this.closeModal}
                            >
                                &times;
                            </CloseXButton>
                        </CloseButtonHeader>
                        <AddBoardScreen
                            biteIds={[this.props.biteId]}
                            userId={this.props.signedInUserId}
                            onFinishAddBite={this.closeModal}
                        />
                        <BorderLine />
                    </ModalContents>
                </ModalSquare>
            </ModalContainer>,
            this.el,
        );
    }
}

export default withRouter(BoardAddMenu);
