import * as React from "react";
import styled from "styled-components";

const StyleLink = styled.a``;

const SocialLogo = styled.img`
    width: 40px;
    padding: 4px;
    opacity: 1;

    &:hover {
        opacity: 0.4;
    }
`;

const CircleSocialButton = props => {
    return (
        <StyleLink target='external' href={props.link}>
            <SocialLogo
                className={props.className}
                src={props.image}
                alt={props.alt}
            />
        </StyleLink>
    );
};

export default CircleSocialButton;
