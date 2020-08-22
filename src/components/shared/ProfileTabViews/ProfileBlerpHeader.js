import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import AudioButton from "../../buttons/data/wrapped-audio-button";
import {
    Row,
    FavoriteBoardHeaderControlsContainer,
    FavoriteBoardHeaderControlsText,
    FavoriteBoardHeaderControlsView,
    ControlIcon,
    BoardSquareRow,
    LargeCenterText,
} from "./ProfileStyledComponents";
import { greyC4 } from "../../../styles/colors";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }`;

const bounceOut = keyframes`
  0% {
    opacity: 0;
    width: 30px;
    height: 30px;
  }

  25% {
    width: 64px;
    height: 64px;
  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 1;
    width: 52px;
    height: 52px;
  }
`;

const bounceOutSmall = keyframes`
  0% {
    opacity: 0;
    width: 36px;
    height: 36px;
  }

  25% {
    width: 44px;
    height: 44px;
  }

  50% {
  }

  75% {
  }

  100% {
    opacity: 1;
    width: 40px;
    height: 40px;
  }
`;

const animateIn = keyframes`
  0% {
    opacity: 0;
  }

  25% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }
`;

const BlerpImage = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: 100px 100px;
    background-position: center;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    align-self: start;

    @media (max-width: 600px) {
        width: 65px;
        height: 65px;
    }
`;

const RecentBlerpContainer = styled.div`
    background-color: white;
    width: 340px;
    height: 100px;
    border-radius: 50px;
    margin: 10px;
    flex: 0 0 auto;
    box-shadow: 0px 0px 20px #0000001a;
    display: grid;
    grid-template-columns: auto auto;

    @media (max-width: 600px) {
        width: 200px;
        height: 65px;
    }
`;

const RecentText = styled.div`
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-self: center;
    font-size: 21px;
    cursor: pointer;

    @media (max-width: 600px) {
        font-size: 14px;
    }
`;

const Scrim = styled.div`
    position: relative;
    border: 2px transparent rgba(255, 120, 91, 1) !important;
    background-color: ${props =>
        props.darker ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0)"};
    box-shadow: inset 0 0 70px 10px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 2;
    border-radius: 100px;
    transition: all 0.2s ease 0s;
    animation: ${animateIn} 0.9s 1;

    @media (max-width: 600px) {
        width: 65px;
        height: 65px;
    }

    &:hover .blerp-audio-button {
        opacity: 1;
        transition: all 0.2s ease 0s;
    }

    &:hover .blerp-fav-menu-more {
        opacity: 1;
        transition: all 0.2s ease 0s;
        animation: ${bounceOutSmall} 0.2s 1;
    }

    &:hover .blerp-bite-menu-more {
        opacity: 1;
        transition: all 0.2s ease 0s;
        animation: ${bounceOut} 0.2s 1;
    }

    &:hover .blerp-bite-open {
        opacity: 0.6;
        transition: all 0.2s ease 0s;
    }

    &:focus .blerp-bite-open {
        opacity: 0.6;
        transition: all 0.2s ease 0s;
    }

    &:hover .blerp-bite-title {
        opacity: 0.2;
        transition: all 0.2s ease 0s;
    }

    &:focus .blerp-audio-button {
        opacity: 1;
        transition: all 0.2s ease 0s;
    }

    &:focus .blerp-bite-title {
        opacity: 0.2;
        transition: all 0.2s ease 0s;
    }

    &:hover {
        border: 2px solid rgba(255, 120, 91, 1) !important;
        box-shadow: inset 0 0 70px 1em rgba(255, 120, 91, 0.8) !important;
        transition: all 0.3s ease 0s;
    }
`;

const StyledAudioButton = styled(AudioButton)`
    overflow: hidden;
    background-color: transparent;
    width: 100%;
    height: 100%;
    border-radius: 420px;
    border: none;
    position: relative;
    z-index: 1000;

    @media (max-width: 600px) {
        width: 65px;
        height: 65px;
    }

    &:focus {
        opacity: 1;
        border: none !important;
    }

    &:focus ~ .blerp-bite-title {
        opacity: 0.2;
        transition: all 0.2s ease 0s;
    }

    .blerp-bite-scrim &:focus {
        border: 4px solid rgba(255, 120, 91, 1) !important;
        box-shadow: inset 0 0 70px 1em rgba(255, 120, 91, 1) !important;
        transition: all 0.3s ease 0s;
    }
`;

const ProfileBlerpHeader = props => {
    const [images, setImages] = useState([]);
    const [viewType, setViewType] = useState("list");

    useEffect(() => {
        const imageList = [
            "https://storage.googleapis.com/blerp_products/Web/Account/List%20view%20quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/List%20view%20selected.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/Grid%20view%20Quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/Gride%20View%20selected.svg?folder=true&organizationId=true",
        ];
        setImages(
            imageList.map(image => {
                const img = new Image();
                img.src = image;
                return img;
            }),
        );
    }, []);

    const scrollToRight = () => {
        let container = document.getElementById("board-container");
        let scrollRight = container.scrollLeft;
        scrollRight += 600;
        container.scrollLeft = scrollRight;
    };

    const scrollToLeft = () => {
        let container = document.getElementById("board-container");
        let scrollRight = container.scrollLeft;
        scrollRight -= 600;
        container.scrollLeft = scrollRight;
    };

    const biteClicked = bite => {
        window.location.href = `/soundbites/${bite._id}`;
    };

    const renderBlerps = () => {
        return (
            <>
                <Row>
                    <FavoriteBoardHeaderControlsContainer>
                        <FavoriteBoardHeaderControlsText>
                            Recently Shared Blerps
                        </FavoriteBoardHeaderControlsText>
                        <FavoriteBoardHeaderControlsView>
                            {props.blerps.length === 0 ? (
                                <></>
                            ) : (
                                <>
                                    <ControlIcon
                                        onClick={() => scrollToLeft()}
                                        gridColumn={7}
                                        url={
                                            "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Left.svg?folder=true&organizationId=true"
                                        }
                                    />
                                    <ControlIcon
                                        onClick={() => scrollToRight()}
                                        gridColumn={8}
                                        url={
                                            "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Right.svg?folder=true&organizationId=true"
                                        }
                                    />
                                </>
                            )}
                        </FavoriteBoardHeaderControlsView>
                    </FavoriteBoardHeaderControlsContainer>
                </Row>
                {props.blerps.length === 0 ? (
                    <Row style={{ flexDirection: "column" }}>
                        <LargeCenterText
                            style={{ fontSize: "28px", padding: "0px" }}
                        >
                            {props.isOwner
                                ? "It's quiet here... too quiet"
                                : "It's quiet here... too quiet"}
                        </LargeCenterText>
                        <LargeCenterText
                            style={{
                                fontSize: "16px",
                                padding: "0px",
                                marginBottom: "50px",
                                color: greyC4,
                            }}
                        >
                            {props.isOwner
                                ? "*Share a Blerp to view it here"
                                : "*Share a Blerp to view it here"}
                        </LargeCenterText>
                    </Row>
                ) : (
                    <>
                        <BoardSquareRow
                            id='board-container'
                            viewType={viewType}
                            style={{ height: "auto" }}
                        >
                            {props.blerps.map(item => {
                                if (item.bite && item.bite.image) {
                                    return (
                                        <RecentBlerpContainer key={item._id}>
                                            <BlerpImage
                                                url={
                                                    item.bite &&
                                                    item.bite.image &&
                                                    item.bite.image.original.url
                                                }
                                            >
                                                <Scrim
                                                    className='blerp-bite-scrim'
                                                    darker={Boolean(
                                                        item.bite.image,
                                                    )}
                                                >
                                                    <StyledAudioButton
                                                        title={item.bite.title}
                                                        biteId={item.bite._id}
                                                        sources={[
                                                            item.bite.audio &&
                                                                item.bite.audio
                                                                    .mp3.url,
                                                        ]}
                                                        showButton={false}
                                                        mode={"PLAY"}
                                                        useGlobalAudio={true}
                                                        featuredPage={"profile"}
                                                    />
                                                </Scrim>
                                            </BlerpImage>
                                            <RecentText
                                                onClick={() =>
                                                    biteClicked(item.bite)
                                                }
                                            >
                                                {item.bite.title}
                                            </RecentText>
                                        </RecentBlerpContainer>
                                    );
                                }
                            })}
                        </BoardSquareRow>
                    </>
                )}
            </>
        );
    };

    return renderBlerps();
};

export default ProfileBlerpHeader;
