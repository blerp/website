import React, { useEffect } from "react";
import styled from "styled-components";
import * as ReactDOM from "react-dom";
import { BaseModal } from "../shared/Modal/BaseModal";

const RatingCard = styled.div`
    position: absolute;
    background-color: ${props => props.theme.flyoutBackground};
    width: 70%;
    height: auto;
    top: 0px;
    right: 0px;
    border-radius: 4px;
    z-index: 100;
    padding: 20px;
    box-shadow: 0px 0px 20px #0000001a;
`;

const RatingItem = styled.div`
    margin: 20px 10px;
    font-weight: 300;
    color: ${props => props.theme.defaultText};
`;

const CategoryHelpModal = props => {
    useEffect(() => {
        const modalRoot = document.getElementById("category-modal-root");
        // modalRoot.appendChild(this.el);
        document.addEventListener("mousedown", e =>
            handleOutsideModalClicked(e),
        );
    }, []);

    const handleOutsideModalClicked = e => {
        const domNode = ReactDOM.findDOMNode(
            document.getElementById("category-modal"),
        );

        // Detects if there was an outside click
        if (!domNode || !domNode.contains(e.target)) {
            props.onClose();
        }
    };

    return (
        <BaseModal style={{ zIndex: "100", position: "relative" }}>
            <RatingCard>
                <RatingItem>Sound Effect: “Explosion” - Boom!</RatingItem>
                <RatingItem>Quote: Something someone says </RatingItem>
                <RatingItem>
                    Song: “Music and Lyrics, that someone owns”
                </RatingItem>
            </RatingCard>
        </BaseModal>
    );
};

export default CategoryHelpModal;
