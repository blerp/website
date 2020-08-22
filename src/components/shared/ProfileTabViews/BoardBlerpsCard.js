import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import AllTheBitesGrid from "../AllTheBitesGrid";
import Bite from "../../bite";
import {
    ControlIcon,
    Row,
    BoardFavoriteIcon,
    BoardFavoriteIconInline,
} from "./ProfileStyledComponents";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { doubleDarkBlue } from "../../../styles/colors";
import * as ReactDOM from "react-dom";
import {
    Button,
    CategoryDropdownText,
    Modal,
    Icon,
    Text,
    FavoriteIcon,
} from "../../theme/Theme";
import LoadingFullScreen from "../../loading/loading-full-screen";
import BoardUpdateBox from "../../admin/BoardUpdateBox";
import BoardOptionsModal from "../AddBoardMenu/board-options-modal";
import Link from "next/link";
import colors from "../../theme/colors";
import { ToastContext } from "../../theme/ToastProvider";

const Card = styled.div`
    ${props =>
        props.editing
            ? `
    display: grid;
    grid-template-columns: 70% 30%;
  `
            : ``}
    width: 85%;
    height: auto;
    max-height: ${props => (props.soundboardPage ? "900px" : "750px")};
    border-radius: 16px;
    margin: 10px auto 40px auto;
    background-color: ${props => props.theme.flyoutBackground};
    position: absolute;
    ${props => (props.soundboardPage ? "overflow: hidden;" : "")}
    left: 9.5%;
    top: ${props => props.posY + 80}px;
    transition: 0.5s;
    z-index: 2000;
    ${props => (props.show ? "" : "overflow-y: hidden;")}
    ${props =>
        props.soundboardPage ? "" : "box-shadow: 0px 0px 20px #0000001a"};

    @media (max-width: 1650px) {
        ${props =>
            props.editing
                ? `
        display: grid;
        grid-template-columns: 65% 35%;
    `
                : ``}
    }

    @media (max-width: 1100px) {
        ${props =>
            props.editing
                ? `
        display: grid;
        grid-template-columns: 60% 40%;
    `
                : ``}
    }

    @media (max-width: 900px) {
        grid-template-columns: 100%;
        margin: 10px auto 0px auto;
        border-radius: ${props =>
            props.editing ? "16px 16px 0px 0px" : "16px"};
    }

    @media (max-width: 600px) {
        width: 100%;
        margin: 0;
        border-radius: 0;
    }
`;

const CloseButton = styled.a`
    position: absolute;
    cursor: pointer;
    top: -17px;
    right: 50%;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: url(https://storage.googleapis.com/blerp_products/Web/Navbar/close-button-white.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-color: #474747;
    margin: 3px 3px 3px;
    transform: translate(0px, 0px) scale(1);

    transition: 0.2s;

    &:hover {
        width: 35px;
        height: 35px;
        background-color: #7a7a7a;
        transform: translate(0px, 0px) scale(1.1);
    }
`;

const BoardBitesContainer = styled.div`
    display: grid;
    padding: 16px 16px 12px 16px;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    grid-auto-flow: column;
    grid-auto-columns: minmax(160px, 1fr);
    overflow-x: auto;
    scroll-behavior: smooth;
    position: relative;

    &::-webkit-scrollbar {
        height: 10px;
    }

    &::-webkit-scrollbar-track {
        background: ${props => props.theme.lightGray};
        border-top: 4px solid white;
        border-bottom: 4px solid white;
    }

    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.darkText};
        border-top: 3px solid white;
        border-bottom: 3px solid white;
        border-radius: 8px;
        width: 200px;
    }
`;

const CreatedByContainer = styled.div``;

const ControlsContainer = styled.div`
    display: flex;
    align-self: flex-start;

    @media (max-width: 830px) {
        display: none;
    }
`;

const SmallImage = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;

const Heart = styled.div`
    cursor: pointer;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: url(${props =>
        props.active
            ? "https://storage.googleapis.com/blerp_products/Web/Account/Heart%20icon_Red.svg?folder=true&organizationId=true"
            : "https://storage.googleapis.com/blerp_products/Web/Heart%20quite.svg?folder=true&organizationId=true"});
    background-repeat: no-repeat;
    background-position: center;
    background-color: ${props => props.theme.whiteSpace};
`;

const BoldText = styled.div`
    font-size: 28px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0 10px;

    @media (max-width: 600px) {
        font-size: 20px;
    }
`;

const BoardInfoRow = styled(Row)`
    display: grid;
    grid-template-columns: 30px auto 40px 40px;
    column-gap: 10px;
    margin: 0 8px 8px 0;
    justify-content: flex-start;
    align-items: center;
    width: 800px;
    max-width: 800px;
    width: 100%;

    @media (max-width: 600px) {
        grid-template-columns: 30px auto 30px 30px;
    }
`;

const StyledBoardHeaderRow = styled(Row)`
    padding-top: 25px;
    padding-left: 35px;
    padding-right: 35px;
    justify-content: space-between;
    width: 95%;

    @media (max-width: 1100px) {
        width: 90%;
    }
    @media (max-width: 390px) {
        width: 85%;
        padding-top: 16px;
        padding-left: 12px;
        padding-right: 12px;
    }
`;

const LightText = styled.a`
    font-size: 18px;
    font-weight: 300;
    text-decoration: none;
    color: ${props => props.theme.bodyText};
    transition: 0.2s;
    border-radius: 0px;
    align-self: center;
    margin: 10px 0px 0px;
    text-align: left;
    float: left;
`;

const BoldLink = styled(LightText)`
    font-size: 28px;
    padding: 0 8px;

    &:hover {
        border-bottom: 2px solid black;
        border-radius: 0px;
    }

    @media (max-width: 600px) {
        font-size: 24px;
        width: 60vw;
        /* white-space: nowrap; */
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: 420px) {
        width: 50vw;
        padding: 0 2px;
        max-width: 200px;
        /* white-space: nowrap; */
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 21px;
    }
`;

const BoardInfo = styled.div`
    width: 75%;

    @media (max-width: 830px) {
        width: 100%;
    }
`;

const TagContainer = styled.div`
    display: flex;
    max-width: 400px;
    overflow-x: hidden;
    border-top: 2px solid ${props => props.theme.lightGray};
    height: 50px;
    scroll-behavior: smooth;
`;

const TagItem = styled.div`
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 8px;
    height: 25px;
    align-self: center;
    margin: 10px;
    white-space: pre;
    cursor: pointer;
    padding: 5px;

    &:hover {
        background-color: ${colors.ibisRed};
    }
`;

const CreditsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    top: 15px;

    @media (max-width: 1100px) {
        flex-direction: ${props => (props.editing ? "column" : "row")};
        align-items: center;
    }

    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

const BoardUpdateContainerFull = styled.div`
    display: flex;
    background-color: ${props => props.theme.grey2};

    @media (max-width: 900px) {
        display: none;
    }
`;

const getUserSignedIn = gql`
    query userSignedIn {
        web {
            userSignedIn {
                _id
                username
                roles
            }
            categoryMany {
                _id
                title
            }
        }
    }
`;

const updateBoardAndBlerpCategories = gql`
    mutation updatePlaylistAndBitesCategory(
        $record: updatePlaylistAndBitesCategoryInput!
    ) {
        web {
            categoryUpdatePlaylistAndBites(record: $record) {
                playlist {
                    _id
                    categoryObjects {
                        _id
                        title
                    }
                }
            }
        }
    }
`;

const removeBoardAndBlerpCategories = gql`
    mutation removePlaylistAndBites(
        $record: removePlaylistAndBitesCategoryInput!
    ) {
        web {
            categoryRemovePlaylistAndBites(record: $record) {
                playlist {
                    _id
                    categoryObjects {
                        _id
                        title
                    }
                }
            }
        }
    }
`;

const userFollowBoard = gql`
    mutation websiteUserFollowBoard($playlistId: MongoID!, $data: JSON) {
        web {
            followSoundboard(
                record: { playlistId: $playlistId }
                analytics: { data: $data }
            ) {
                playlist {
                    _id
                    followed
                }
                user {
                    _id
                    followSoundboardPagination(page: 1, perPage: 200) {
                        items {
                            _id
                            title
                            followed
                            __typename
                        }
                        __typename
                    }
                }
                __typename
            }
        }
    }
`;

const userUnfollowBoard = gql`
    mutation websiteUserFollowBoard($playlistId: MongoID!, $data: JSON) {
        web {
            followSoundboard(
                record: { playlistId: $playlistId }
                analytics: { data: $data }
            ) {
                playlist {
                    _id
                    followed
                }
                user {
                    _id
                    followSoundboardPagination(page: 1, perPage: 200) {
                        items {
                            _id
                            title
                            followed
                            __typename
                        }
                        __typename
                    }
                }
                __typename
            }
        }
    }
`;

const BoardBlerpsCard = props => {
    const { loading, error, data, refetch } = useQuery(getUserSignedIn);
    const [followBoard] = useMutation(userFollowBoard);
    const [unFollowBoard] = useMutation(userUnfollowBoard);
    const [updateCategories] = useMutation(updateBoardAndBlerpCategories);
    const [removeCategories] = useMutation(removeBoardAndBlerpCategories);
    const [show, setShow] = useState(false);
    const [gridColumns, setGridColumns] = useState(1);
    const [showExtra, setShowExtra] = useState(false);
    const [editing, setEditing] = useState(props.showEdit);
    const [followed, setFollowed] = useState(props.board.followed);
    const cardRef = useRef();

    const { useToast } = useContext(ToastContext);

    useEffect(() => {
        refetch();
        setShow(true);
        document.addEventListener("mousedown", e =>
            handleOutsideModalClicked(e),
        );
        if (!props.hideClose) {
            cardRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }

        return () => {
            document.removeEventListener("mousedown", e =>
                handleOutsideModalClicked(e),
            );
        };
    }, []);

    useEffect(() => {
        setEditing(props.showEdit);
        setFollowed(props.board.followed);
    }, [props]);

    const handleOutsideModalClicked = e => {
        const domNode = ReactDOM.findDOMNode(cardRef.current);
        // Detects if there was an outside click
        if ((!domNode || !domNode.contains(e.target)) && cardRef.current) {
            setShow(false);
            props.onClose();
        }
    };

    const scrollToRight = () => {
        let container = document.getElementById("bite-card-container");
        let scrollRight = container.scrollLeft;
        scrollRight += 900;
        container.scrollLeft = scrollRight;
    };

    const scrollToLeft = () => {
        let container = document.getElementById("bite-card-container");
        let scrollRight = container.scrollLeft;
        scrollRight -= 900;
        container.scrollLeft = scrollRight;
    };

    const scrollTagToRight = () => {
        let container = document.getElementById("tag-container");
        let scrollRight = container.scrollLeft;
        scrollRight += 200;
        container.scrollLeft = scrollRight;
    };

    const scrollTagToLeft = () => {
        let container = document.getElementById("tag-container");
        let scrollRight = container.scrollLeft;
        scrollRight -= 200;
        container.scrollLeft = scrollRight;
    };

    const handleFollowClicked = async () => {
        if (props.board.followed) {
            const res = await unFollowBoard({
                variables: {
                    playlistId: props.board._id,
                },
            })
                .then(res => {
                    useToast("Unfollowed board!", "error");
                    setFollowed(
                        res.data.web.followSoundboard.playlist.followed,
                    );
                })
                .catch(err => useToast("Error!", "error"));
            props.onClose();
        } else {
            const res = await followBoard({
                variables: {
                    playlistId: props.board._id,
                    data: {
                        url: history.url,
                        searchQuery: props.query,
                    },
                },
            })
                .then(res => {
                    useToast("Followed board!", "success");
                    setFollowed(
                        res.data.web.followSoundboard.playlist.followed,
                    );
                })
                .catch(err => useToast("Error!", "error"));
        }
    };

    const handleCategoryClick = category => {
        if (
            props.board.categoryObjects &&
            props.board.categoryObjects.some(e => e._id === category._id)
        ) {
            removeCategories({
                variables: {
                    record: {
                        playlistId: props.board._id,
                        categoryId: category._id,
                    },
                },
            });
        } else {
            updateCategories({
                variables: {
                    record: {
                        playlistId: props.board._id,
                        categoryId: category._id,
                    },
                },
            });
        }
    };

    if (loading && !data) return <LoadingFullScreen />;
    if (error) return "error";

    return (
        <>
            <Card
                soundboardPage={props.pathName === "/soundboard"}
                style={props.cardStyle}
                editing={editing}
                ref={cardRef}
                id={`${props.board._id}-board-card`}
                show={show}
                posY={props.posY}
            >
                <div>
                    {props.hideClose ? (
                        <></>
                    ) : (
                        <CloseButton
                            onClick={() => {
                                setShow(false);
                                props.onClose();
                            }}
                        />
                    )}
                    <StyledBoardHeaderRow>
                        <BoardInfo>
                            <BoardInfoRow
                                style={{
                                    marginBottom: "0px",
                                }}
                            >
                                <SmallImage
                                    url={props.board.image.original.url}
                                />
                                <BoldLink
                                    style={{
                                        fontWeight: "normal",
                                        marginLeft: "0",
                                        position: "relative",
                                        bottom: "7px",
                                    }}
                                    href={`/soundboard/${props.board._id}`}
                                >
                                    {props.board.title}
                                </BoldLink>
                                <FavoriteIcon
                                    style={{ alignSelf: "center" }}
                                    size='small'
                                    onClick={() => {
                                        handleFollowClicked();
                                    }}
                                    active={followed}
                                />
                                <Modal
                                    gridColumns={1}
                                    backgroundBlur
                                    trigger={
                                        <Icon
                                            color='grey'
                                            hoverColor='darkGrey'
                                            size='small'
                                            url='https://storage.googleapis.com/blerp_products/Web/Board%20Page/share%20arrow%20white.svg'
                                        />
                                    }
                                >
                                    <BoardOptionsModal
                                        showBoardEdit={value =>
                                            setEditing(value)
                                        }
                                        playlist={props.board}
                                        onClose={() => setShowBoardModal(false)}
                                        {...props}
                                    />
                                </Modal>
                            </BoardInfoRow>

                            {!props.dontShowPreview && (
                                <LightText style={{ margin: "12px 0 0 0" }}>
                                    Board Preview
                                </LightText>
                            )}
                        </BoardInfo>
                        <ControlsContainer>
                            {data.web.userSignedIn &&
                            data.web.userSignedIn.roles.includes(
                                "MODERATOR",
                            ) ? (
                                <Modal
                                    backgroundBlur
                                    trigger={
                                        <Button>
                                            Categories
                                            <Icon
                                                style={{ marginLeft: "10px" }}
                                                noHover
                                                url='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_White_Down.svg'
                                            />
                                        </Button>
                                    }
                                    gridColumns={gridColumns}
                                >
                                    <div
                                        style={{
                                            maxHeight: "300px",
                                            overflowY: "scroll",
                                            margin: "5px",
                                            textAlign: "left",
                                        }}
                                    >
                                        {data.web.categoryMany.map(category => (
                                            <CategoryDropdownText
                                                key={`${category._id}-card`}
                                                active={
                                                    props.board
                                                        .categoryObjects &&
                                                    props.board.categoryObjects.some(
                                                        e =>
                                                            e._id ===
                                                            category._id,
                                                    )
                                                }
                                                onClick={() =>
                                                    handleCategoryClick(
                                                        category,
                                                    )
                                                }
                                            >
                                                {category.title}
                                            </CategoryDropdownText>
                                        ))}
                                        {/* <CategoryDropdownText onClick={() => {
                      if (gridColumns === 2) {
                        setGridColumns(1);
                      } else {
                        setGridColumns(2);
                      }
                      setShowExtra(!showExtra);
                    }}>Category</CategoryDropdownText> */}
                                    </div>
                                    {/* <div style={{ display: showExtra ? 'block' : 'none' }}>
                    <CategoryDropdownText>test</CategoryDropdownText>
                    <CategoryDropdownText active>test</CategoryDropdownText>
                    <CategoryDropdownText active>test</CategoryDropdownText>
                    <CategoryDropdownText>test</CategoryDropdownText>
                    <CategoryDropdownText active>test</CategoryDropdownText>
                  </div> */}
                                </Modal>
                            ) : (
                                <></>
                            )}
                            <ControlIcon
                                onClick={() => scrollToLeft()}
                                url={
                                    "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Left.svg?folder=true&organizationId=true"
                                }
                            />
                            <ControlIcon
                                style={{ marginLeft: "30px" }}
                                onClick={() => scrollToRight()}
                                url={
                                    "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Right.svg?folder=true&organizationId=true"
                                }
                            />
                        </ControlsContainer>
                    </StyledBoardHeaderRow>
                    <BoardBitesContainer
                        id='bite-card-container'
                        style={{
                            gridTemplateRows: editing ? "2fr 2fr" : "auto auto",
                        }}
                    >
                        {props.blerps.map(bite => (
                            <>
                                <Bite
                                    query={props.query}
                                    playlistId={props.board._id}
                                    key={bite._id}
                                    id={bite._id}
                                    title={bite.title}
                                    audioSourceUrls={[bite.audio.mp3.url]}
                                    color={bite.color}
                                    image={
                                        (bite.image &&
                                            bite.image.original.url) ||
                                        (bite.giphy && bite.giphy.gif)
                                    }
                                    favorited={bite.favorited}
                                    playCount={bite.playCount}
                                    featuredPage={props.featuredPage}
                                    isFeaturedBite={true}
                                    preload={true}
                                    isEditable={editing}
                                    bite={bite}
                                />
                            </>
                        ))}
                    </BoardBitesContainer>
                    {props.pathName === "/soundboard" ? (
                        <>
                            <CreditsContainer>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <Text
                                        fontSize='16px'
                                        fontWeight='light'
                                        fontColor='170D11'
                                        style={{
                                            letterSpacing: "0px",
                                            margin: "5px 0px",
                                        }}
                                    >
                                        <span style={{ fontWeight: "600" }}>
                                            {props.board.title}
                                        </span>{" "}
                                        soundboard by
                                    </Text>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <a
                                        href={`/user/${props.user._id}`}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-end",
                                            justifyContent: "center",
                                            paddingLeft: "10px",
                                            border: "none",
                                            textDecoration: "none",
                                            color: "#170D11",
                                        }}
                                    >
                                        <Icon
                                            style={{
                                                padding: "0px 5px",
                                                width: "22px",
                                                height: "22px",
                                                backgroundSize: "contain",
                                            }}
                                            url={
                                                (props.user &&
                                                    props.user.profileImage &&
                                                    props.user.profileImage
                                                        .original.url) ||
                                                "https://storage.googleapis.com/blerp_products/Web/Account/seafoam%20Account%20image.svg?folder=true&organizationId=true"
                                            }
                                        />
                                        <Text
                                            fontSize='16px'
                                            fontWeight='light'
                                            fontColor='170D11'
                                            style={{
                                                letterSpacing: "0px",
                                                margin: "5px 0px",
                                            }}
                                        >
                                            {props.user && props.user.username}
                                        </Text>
                                    </a>
                                </div>
                            </CreditsContainer>
                            <Row style={{ justifyContent: "center" }}>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        width: editing ? "60%" : "85%",
                                    }}
                                    fontSize='16px'
                                    fontWeight='light'
                                    color='dark170D11'
                                >
                                    {props.board.description}
                                </Text>
                            </Row>
                            <Row
                                style={{
                                    justifyContent: "center",
                                    marginBottom: "20px",
                                }}
                            >
                                {props.board.userKeywords.length > 0 ? (
                                    <>
                                        <ControlIcon
                                            onClick={() => scrollTagToLeft()}
                                            url={
                                                "https://storage.googleapis.com/blerp_products/Web/Board%20Page/arrow%20Left%20grey%203.svg"
                                            }
                                        />
                                        <TagContainer
                                            id='tag-container'
                                            style={{ overflow: "hidden" }}
                                        >
                                            {props.board.userKeywords.map(
                                                tag => (
                                                    <TagItem key={tag}>
                                                        <Link
                                                            prefetch={true}
                                                            href={{
                                                                pathname:
                                                                    "/search",
                                                                query: {
                                                                    q: tag
                                                                        .split(
                                                                            " ",
                                                                        )
                                                                        .join(
                                                                            "-",
                                                                        ),
                                                                },
                                                            }}
                                                            as={`/search?q=${encodeURI(
                                                                tag
                                                                    .split(" ")
                                                                    .join("-"),
                                                            )}`}
                                                        >
                                                            {/* <Text>{`#${tag}`}</Text> */}
                                                            <Text
                                                                fontSize='14px'
                                                                fontColorHover='white'
                                                                fontWeight='light'
                                                                style={{
                                                                    margin:
                                                                        "3px 15px",
                                                                }}
                                                            >
                                                                #{tag}
                                                            </Text>
                                                        </Link>
                                                    </TagItem>
                                                ),
                                            )}
                                        </TagContainer>
                                        <ControlIcon
                                            onClick={() => scrollTagToRight()}
                                            url={
                                                "https://storage.googleapis.com/blerp_products/Web/Board%20Page/arrow%20Right%20grey%203.svg"
                                            }
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </Row>
                        </>
                    ) : (
                        <Row
                            style={{
                                justifyContent: "center",
                            }}
                        >
                            <CreatedByContainer
                                style={{
                                    width: "100%",
                                }}
                            >
                                <BoldText
                                    style={{
                                        fontSize: "16px",
                                        textAlign: "center",
                                    }}
                                >
                                    Created by
                                </BoldText>
                                <Row
                                    style={{
                                        margin: "10px auto",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <SmallImage
                                        url={
                                            (props.user &&
                                                props.user.profileImage &&
                                                props.user.profileImage.original
                                                    .url) ||
                                            "https://storage.googleapis.com/blerp_products/Web/Account/seafoam%20Account%20image.svg?folder=true&organizationId=true"
                                        }
                                    />
                                    <BoldLink href={`/user/${props.user._id}`}>
                                        {props.user && props.user.username}
                                    </BoldLink>
                                </Row>
                            </CreatedByContainer>
                        </Row>
                    )}
                </div>
                {editing ? (
                    <BoardUpdateContainerFull>
                        <BoardUpdateBox
                            user={data.web.userSignedIn}
                            onClose={() => {
                                if (props.setRootEditing) {
                                    props.setRootEditing(false);
                                }

                                setEditing(false);
                            }}
                            board={props.board}
                        />
                    </BoardUpdateContainerFull>
                ) : (
                    <></>
                )}
            </Card>
        </>
    );
};

export default BoardBlerpsCard;
