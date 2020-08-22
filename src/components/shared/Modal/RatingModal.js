import React, { useEffect } from "react";
import styled from "styled-components";
import { BaseModal } from "./BaseModal";
import * as ReactDOM from "react-dom";

const RatingCard = styled.div`
    position: fixed;
    background-color: ${props => props.theme.flyoutBackground};
    width: 200px;
    height: auto;
    top: 160px;
    right: 20px;
    border-radius: 4px;
    z-index: 14000;
    padding: 20px;
    box-shadow: 0px 0px 20px #0000001a;
`;

const RatingItem = styled.div`
    margin: 20px 10px;
    font-weight: 300;
    color: ${props => props.theme.defaultText};
`;

const RatingModal = props => {
    useEffect(() => {
        const modalRoot = document.getElementById("blerp-modal-root");
        // modalRoot.appendChild(this.el);
        document.addEventListener("mousedown", e =>
            handleOutsideModalClicked(e),
        );
    }, []);

    const handleOutsideModalClicked = e => {
        const domNode = ReactDOM.findDOMNode(
            document.getElementById("settings-modal"),
        );

        // Detects if there was an outside click
        if (!domNode || !domNode.contains(e.target)) {
            props.onClose();
        }
    };

    return (
        <BaseModal style={{ zIndex: "10000" }}>
            <RatingCard>
                <RatingItem>G: Appropriate for all ages.</RatingItem>
                <RatingItem>
                    PG: May contain some material parents may not like for their
                    young children.
                </RatingItem>
                <RatingItem>
                    PG-13: Parents urged to be cautious. Some material may be
                    inappropriate for teens. No swearing. Mild adult content.
                </RatingItem>
                <RatingItem>
                    R: Conatins adult material. Swearing, sexual innuendo,
                    violence.
                </RatingItem>
                <RatingItem>
                    NC-17: Clearly adult. Very vulgar, sexual or violent.
                </RatingItem>
            </RatingCard>
        </BaseModal>
    );
};

export default RatingModal;
