import React from "react";
import {
    CreateBlerpContainer,
    CreateBlerpIcon,
    CreateBlerpText,
} from "./ProfileStyledComponents";

const CreateNewBlerpButton = props => {
    return (
        <CreateBlerpContainer href='/upload'>
            <CreateBlerpIcon
                icon='https://storage.googleapis.com/blerp_products/Web/Account/Create%20New%20Blerp%20inline%20Quite.svg'
                hoverIcon='https://storage.googleapis.com/blerp_products/Web/Account/Create%20New%20Blerp%20inline%20Hover.svg'
            />
            <CreateBlerpText>Create New Blerp</CreateBlerpText>
        </CreateBlerpContainer>
    );
};

export default CreateNewBlerpButton;
