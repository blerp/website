import React, { useState, useDebugValue, useEffect } from "react";
import styled from "styled-components";
import BoardOptionsModal from "./board-options-modal";
import { withRouter } from "next/dist/client/router";
import gql from "graphql-tag";
import Modal from "../../theme/Modal";

const StyledShareButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 40px;
    height: 40px;
    border: none;
    background-image: url("https://storage.googleapis.com/blerp_products/Web/share%20outline.svg");
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: center;
    z-index: 10;
    text-decoration: none;
    opacity: 0;
    cursor: pointer;

    &:focus {
        border: none;
    }
`;

const BoardShare = props => {
    const [showShareBoardModal, setShowBoardModal] = useState(false);
    const [buttonRef, setButtonRef] = useState();
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);

    const onMenuClick = event => {
        let menuElement = buttonRef;
        const bounds = menuElement.getBoundingClientRect();

        setShowBoardModal(!showShareBoardModal);
        setPosX(Math.round(bounds.x + bounds.width / 2 + window.scrollX));
        setPosY(Math.round(bounds.y + bounds.height / 2 + window.scrollY));
    };

    return (
        <>
            <Modal
                trigger={
                    <StyledShareButton className='board_row_engage__hide_buttons' />
                }
                backgroundBlur
            >
                <BoardOptionsModal
                    posX={posX}
                    posY={posY}
                    playlist={props.playlist}
                    onClose={() => setShowBoardModal(false)}
                    {...props}
                />
            </Modal>
        </>
    );
};

export default withRouter(BoardShare);
