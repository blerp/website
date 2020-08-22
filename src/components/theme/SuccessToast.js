import React from "react";
import { GenericModal } from "./Theme";
import Text from "./Text";

const SuccessToast = props => {
    return (
        <GenericModal
            style={{ padding: "5px 30px" }}
            fullscreen
            color='seafoam'
            gridColumns={1}
            timeout={props.timeout}
            toast
            slideBottom
            centerTop
            trigger={props.trigger}
        >
            {({ handleCloseClick }) => (
                <Text fontColor='white'>{props.successMessage}</Text>
            )}
        </GenericModal>
    );
};

export default SuccessToast;
