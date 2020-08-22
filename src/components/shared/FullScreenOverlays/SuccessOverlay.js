import React from "react";
import styled, { keyframes } from "styled-components";

const explosion = keyframes`
  0% {
    transform: scale(0.0); 
  }
  100% {
    transform: scale(1.0);
  }
`;

const movement = keyframes`
  0% {
    transform: scale(1.0)
  }

  50% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1.0);
  }
`;

const spin = keyframes`
  0% {
    transform: scale(0.0) rotate(0deg);
  }

  100% {
    transform: scale(1.0) rotate(360deg);
  }
`;

const Header = styled.h1`
    margin-top: 72px;
    position: absolute;
    bottom: 30.4%;
`;

const Paragraph = styled.p`
    max-width: 600px;
    font-weight: 300;
    font-size: 20px;
    position: absolute;
    bottom: 24%;
`;

const Confetti = styled.img`
    position: absolute;
    top: 22%;
    width: 450px;
    animation: ${explosion} 0.5s ease-out;

    @media (max-width: 600px) {
        width: 300px;
    }
`;

const TheBlur = styled.div`
    position: absolute;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const OverlayBackground = styled.div`
    position: fixed;
    z-index: 10100;
    min-width: 100vw;
    min-height: 100vh;
    top: 0;
    left: 0;
    display: ${props => (props.show ? "flex" : "none")};
    justify-content: center;
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px;
    min-height: 400px;
    z-index: 10;
`;

const StyleLink = styled.a`
    font-weight: 600;
    text-align: center;
    font-size: 16px;
    line-height: 14px;
    text-decoration: underline;
    color: ${props => props.theme.darkBlue};
    white-space: nowrap;
    margin: 4px;
    cursor: pointer;
    position: absolute;
    bottom: 40px;
`;

const Blerpyogo = styled.img`
    position: absolute;
    width: 200px;
    animation: ${explosion} 0.5s ease-out;

    @media (max-width: 600px) {
        width: 150px;
    }
`;

const SuccessOverlay = props => {
    return (
        <OverlayBackground show={props.show}>
            <TheBlur />
            <Column>
                <Confetti
                    alt='Confetti'
                    src='https://storage.googleapis.com/blerp_products/Web/Menus/Confetti%20Large.svg?folder=true&organizationId=true'
                />
                <Blerpyogo
                    alt='Blerpy Happy Logo'
                    src='https://storage.googleapis.com/blerp_products/Web/donate_page/happyblerp.svg'
                />
                <Header>{props.header}</Header>
                <Paragraph>{props.paragraph}</Paragraph>

                <StyleLink onClick={() => props.close()}>Close</StyleLink>
            </Column>
        </OverlayBackground>
    );
};

export default SuccessOverlay;
