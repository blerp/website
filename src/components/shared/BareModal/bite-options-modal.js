/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import { default as Router, withRouter } from "next/router";
import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

const ModalContainer = styled.div`
    display: visible;
`;

const Modal = styled.div`
    position: fixed;
    margin: 5% auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 5px 5px #1d1d1d;
    overflow-y: scroll;
    width: 60%;
    height: 60%;
    z-index: 9999;
    top: 20%;
    left: 10%;
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
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

class BiteOptionsModal extends React.Component {
    static defaultProps = {};
    modalRoot;
    el;

    constructor(props) {
        super(props);
        this.modalRoot =
            props.rootNode || document.getElementById("blerp-modal-root");
        this.el = document.createElement("div");
    }

    componentDidMount() {
        this.modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
    }

    closeModal = () => {
        this.props.onModalClose();
    };

    render() {
        return ReactDOM.createPortal(
            <ModalContainer>
                <Backdrop onClick={this.closeModal} />
                <Modal />
            </ModalContainer>,
            this.el,
        );
    }
}
export default withRouter(BiteOptionsModal);
