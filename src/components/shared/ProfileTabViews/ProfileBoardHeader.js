import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
    Row,
    FavoriteBoardHeaderControlsContainer,
    FavoriteBoardHeaderControlsView,
    FavoriteBoardHeaderControlsText,
    ControlIcon,
    BoardSquareContainer,
    BoardSquareContainerOverlay,
    BoardSquareRow,
    BoardSquareText,
    LargeCenterText,
    BoardSquareContainerSmall,
    BoardSquareTextSmall,
    BoardSquareImageSmall,
    BoardSquareShareButton,
    BoardFavoriteIcon,
    MainContentHeaderText,
} from "./ProfileStyledComponents";
import BoardBlerpsCard from "./BoardBlerpsCard";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import BoardItem from "./BoardItem";
import { darkText, greyC4 } from "../../../styles/colors";

const ProfileBoardHeader = props => {
    const [images, setImages] = useState([]);
    const [viewType, setViewType] = useState("list");
    const [showBlerpsCard, setShowBlerpsCard] = useState(false);
    const [showingBlerps, setShowingBlerps] = useState([]);
    const [showingBoard, setShowingBoard] = useState();
    const [userCreated, setUserCreated] = useState();
    const [posY, setPosY] = useState(0);

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
        scrollRight += 900;
        container.scrollLeft = scrollRight;
    };

    const scrollToLeft = () => {
        let container = document.getElementById("board-container");
        let scrollRight = container.scrollLeft;
        scrollRight -= 900;
        container.scrollLeft = scrollRight;
    };

    const playlistClicked = playlist => {
        window.location.href = `/soundboard/${playlist._id}`;
    };

    const renderBoards = () => {
        return props.boards.map(item => {
            if (props.type === "Recently Shared Boards" && item.playlist) {
                return (
                    <BoardSquareContainerSmall
                        onClick={() => playlistClicked(item.playlist)}
                    >
                        <BoardSquareShareButton />
                        <BoardSquareImageSmall
                            url={item.playlist.image.original.url}
                        />
                        <BoardSquareTextSmall>
                            {item.playlist.title}
                        </BoardSquareTextSmall>
                    </BoardSquareContainerSmall>
                );
            }
        });
    };

    const renderSmallSquares = () => {
        return (
            <>
                <Row>
                    <FavoriteBoardHeaderControlsContainer>
                        <FavoriteBoardHeaderControlsText>
                            {props.type}
                        </FavoriteBoardHeaderControlsText>
                        {props.boards.length === 0 ? (
                            <></>
                        ) : (
                            <FavoriteBoardHeaderControlsView>
                                <ControlIcon
                                    onClick={() => setViewType("list")}
                                    gridColumn={5}
                                    style={{
                                        display: props.hideControls
                                            ? "none"
                                            : "",
                                    }}
                                    url={
                                        viewType === "list"
                                            ? "https://storage.googleapis.com/blerp_products/Web/Account/List%20view%20selected.svg?folder=true&organizationId=true"
                                            : "https://storage.googleapis.com/blerp_products/Web/Account/List%20view%20quite.svg?folder=true&organizationId=true"
                                    }
                                />
                                <ControlIcon
                                    onClick={() => setViewType("grid")}
                                    gridColumn={6}
                                    style={{
                                        justifySelf: "center",
                                        display: props.hideControls
                                            ? "none"
                                            : "",
                                    }}
                                    url={
                                        viewType === "grid"
                                            ? "https://storage.googleapis.com/blerp_products/Web/Account/Gride%20View%20selected.svg?folder=true&organizationId=true"
                                            : "https://storage.googleapis.com/blerp_products/Web/Account/Grid%20view%20Quite.svg?folder=true&organizationId=true"
                                    }
                                />
                                {viewType === "list" ? (
                                    <>
                                        <ControlIcon
                                            mobileHide
                                            onClick={() => scrollToLeft()}
                                            gridColumn={7}
                                            url={
                                                "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Left.svg?folder=true&organizationId=true"
                                            }
                                        />
                                        <ControlIcon
                                            mobileHide
                                            onClick={() => scrollToRight()}
                                            gridColumn={8}
                                            url={
                                                "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Right.svg?folder=true&organizationId=true"
                                            }
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </FavoriteBoardHeaderControlsView>
                        )}
                    </FavoriteBoardHeaderControlsContainer>
                </Row>
                {props.boards.length === 0 ? (
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
                    <></>
                )}
                <BoardSquareRow
                    id='board-container'
                    viewType={viewType}
                    style={{ height: "auto" }}
                >
                    {renderBoards()}
                </BoardSquareRow>
            </>
        );
    };

    const renderBigSquares = () => {
        return (
            <>
                <Row
                    style={{
                        justifyContent: "center",
                        position: "relative",
                        width: "90%",
                    }}
                >
                    <MainContentHeaderText>
                        Favorite Boards
                    </MainContentHeaderText>
                    <div
                        style={{
                            alignSelf: "center",
                            position: "absolute",
                            right: 0,
                        }}
                    >
                        {viewType === "list" ? (
                            <>
                                <ControlIcon
                                    mobileHide
                                    onClick={() => scrollToRight()}
                                    style={{ marginLeft: "25px" }}
                                    url={
                                        "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Right.svg?folder=true&organizationId=true"
                                    }
                                />
                                <ControlIcon
                                    mobileHide
                                    onClick={() => scrollToLeft()}
                                    url={
                                        "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Left.svg?folder=true&organizationId=true"
                                    }
                                />
                            </>
                        ) : (
                            <></>
                        )}
                        <ControlIcon
                            onClick={() => setViewType("list")}
                            style={{
                                display: props.hideControls ? "none" : "",
                            }}
                            url={
                                viewType === "list"
                                    ? "https://storage.googleapis.com/blerp_products/Web/Account/List%20view%20selected.svg?folder=true&organizationId=true"
                                    : "https://storage.googleapis.com/blerp_products/Web/Account/List%20view%20quite.svg?folder=true&organizationId=true"
                            }
                        />
                        <ControlIcon
                            onClick={() => setViewType("grid")}
                            style={{
                                justifySelf: "center",
                                display: props.hideControls ? "none" : "",
                            }}
                            url={
                                viewType === "grid"
                                    ? "https://storage.googleapis.com/blerp_products/Web/Account/Gride%20View%20selected.svg?folder=true&organizationId=true"
                                    : "https://storage.googleapis.com/blerp_products/Web/Account/Grid%20view%20Quite.svg?folder=true&organizationId=true"
                            }
                        />
                    </div>
                </Row>
                {props.boards.length === 0 ? (
                    <>
                        <Row style={{ height: "220px" }}>
                            {props.isOwner ? (
                                <BoardSquareContainer
                                    style={{
                                        zIndex: "-1",
                                        position: "absolute",
                                        left: "9%",
                                        alignSelf: "center",
                                        backgroundSize: "50% 50%",
                                        backgroundPositionY: "30%",
                                        backgroundColor: "#fff",
                                        opacity: 0.3,
                                    }}
                                    url='https://storage.googleapis.com/blerp_products/Web/Account/Featured%20Crown.svg?folder=true&organizationId=true'
                                >
                                    <div>
                                        <BoardFavoriteIcon
                                            active
                                            url='https://storage.googleapis.com/blerp_products/Web/Account/White%20heart.svg'
                                        />
                                        <BoardSquareText
                                            style={{
                                                margin: "50% auto 0 auto",
                                                color: darkText,
                                                textAlign: "center",
                                            }}
                                        >
                                            Example
                                        </BoardSquareText>
                                    </div>
                                </BoardSquareContainer>
                            ) : (
                                <></>
                            )}
                            <LargeCenterText>
                                {props.isOwner
                                    ? "Favorite some Boards to display here!"
                                    : "Nothing has been favorited yet!"}
                            </LargeCenterText>
                        </Row>
                    </>
                ) : (
                    <></>
                )}
                <BoardSquareRow
                    id='board-container'
                    viewType={viewType}
                    style={{ height: "auto", marginBottom: "30px" }}
                >
                    {props.boards.map(item => {
                        return props.type === "Recently Shared Boards" ? (
                            <BoardSquareContainer
                                key={`${item._id}-${item.title}`}
                                url={item.image.original.url}
                                onClick={() => setShowBlerpsCard(true)}
                            >
                                <BoardSquareContainerOverlay>
                                    <BoardFavoriteIcon
                                        active
                                        url='https://storage.googleapis.com/blerp_products/Web/Account/White%20heart.svg'
                                    />
                                    <BoardSquareText>
                                        {item.title}
                                    </BoardSquareText>
                                </BoardSquareContainerOverlay>
                            </BoardSquareContainer>
                        ) : (
                            <BoardItem
                                item={item}
                                forceFollow={true}
                                setPosY={value => setPosY(value)}
                                setShowBlerpsCard={value =>
                                    setShowBlerpsCard(value)
                                }
                                setShowingBlerps={blerps =>
                                    setShowingBlerps(blerps)
                                }
                                setShowingBoard={board =>
                                    setShowingBoard(board)
                                }
                                setUserCreated={user => setUserCreated(user)}
                                setBoards={boards => props.setBoards(boards)}
                                signedInUserId={props.signedInUserId}
                            />
                        );
                    })}
                </BoardSquareRow>
                {showBlerpsCard ? (
                    <BoardBlerpsCard
                        posY={posY}
                        board={showingBoard}
                        user={userCreated}
                        blerps={showingBlerps}
                        onClose={() => setShowBlerpsCard(false)}
                    />
                ) : (
                    <></>
                )}
            </>
        );
    };

    return props.boards.length > 0 ? (
        <>{props.big ? renderBigSquares() : renderSmallSquares()}</>
    ) : (
        <></>
    );
};

export default ProfileBoardHeader;
