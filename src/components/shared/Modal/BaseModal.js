import styled from "styled-components";

export const BaseModal = styled.div`
    ${props =>
        props.fullscreen
            ? `
    position: fixed;
    z-index: 10100;
    min-width: 100vw;
    min-height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `
            : `
    position: absolute;
    top: ${props => props.top};
    left: ${props => props.left};
    ${props => (props.right ? props.right : "right: 0;")}
    width: ${props => props.width};
    height: ${props => props.height};
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 20px #0000001A;
    opacity: 1;
    z-index: 9900;

    @media (max-width: 480px) {
      position: absolute;
      top: 70px;
      left: 0;
      width: 100%;
      height: 60%;
    }
  `}
`;

export const Column = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px;
    min-height: 400px;
    z-index: 10;
`;

export const TheBlur = styled.div`
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(2px);
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const ModalCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ModalTitle = styled.div`
    font-size: 28px;
    margin: 20px;
`;

export const ModalCard = styled.div`
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 20px #0000001a;
    border-radius: 8px;
    width: auto;
    height: auto;
    align-self: center;
`;

export const Icon = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    height: 17px;
    width: 24px;
`;

export const GreyButton = styled.button`
    font-size: 18px;
    background-color: transparent;
    padding-bottom: 2px;
    border-bottom: 2px;
    border-color: transparent;
    height: 32px;
    color: #47463f;
    cursor: pointer;

    &:focus {
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        background-color: #e6e6e6;
        transition: all 0.2s ease 0s;
    }

    &:hover ${Icon} {
        background-image: url(${props => props.hoverUrl});
    }

    &:active {
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;
