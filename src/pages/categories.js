import React, { useState, useEffect, useContext } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import withData from "../lib/withData";
import { Grid, GridColumn } from "../components/theme/Grid";
import { Text } from "../components/theme/Text";
import NavBar from "../components/navigation/navbar";

import BoardItem from "../components/shared/ProfileTabViews/BoardItem";
import BoardBlerpsCard from "../components/shared/ProfileTabViews/BoardBlerpsCard";
import Modal from "../components/theme/Modal";
import styled, { ThemeContext } from "styled-components";
import {
    BoardFavoriteIcon,
    BoardSquareContainerOverlay,
    BoardSquareText,
    Row,
} from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import withRouter from "next/dist/client/with-router";
import router, { useRouter, Router } from "next/dist/client/router";
import Link from "next/link";
import LoadingTinyScreen from "../components/loading/loading-tiny-screen";
import LoadingFullScreen from "../components/loading/loading-full-screen";
import Button from "../components/theme/Button";
import theme from "styled-theming";
import colors from "../components/theme/colors";
import { Icon } from "../components/shared/Modal/BaseModal";

const BoardSquareRow = styled.div`
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    position: relative;
    display: flex;
    height: auto;
    width: 100%;
    justify-content: ${props =>
        props.viewType === "list" ? "start" : "center"};
    margin: ${props => (props.viewType === "list" ? "0 0 0 9%" : "0 auto")};
    flex-wrap: ${props => (props.viewType === "list" ? "no-wrap" : "wrap")};
    overflow-x: ${props => (props.viewType === "list" ? "scroll" : "none")};
    transition: 0.3s;
    margin-bottom: 40px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const BoardSquareContainer = styled.button`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: 140% 140%;
    background-position: center;
    width: 360px;
    height: 228px;
    border-radius: 6px;
    margin: 20px;
    flex: 0 0 auto;
    position: relative;
    padding: 0;
    border: 0px !important;
    transition: 0.5s;

    @media (max-width: 600px) {
        width: 243px;
        height: 170px;
    }

    &:focus {
        border: 0px !important;
    }
`;

const StyledText = styled(Text)`
    color: ${props => (props.active ? colors.notBlack : colors.grey4)};

    &:hover {
        color: ${colors.notBlack};
    }
`;

const BackButton = styled.div`
    align-self: center;
    background-image: url("https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Left.svg");
    background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: left 10px;
    width: auto;
    height: 20px;
    font-size: 18px;
    cursor: pointer;
    padding: 6px 15px;
    transition: 0.2s;
    color: #47463f;
`;

const SidebarGridColumn = styled(GridColumn)`
    border-right: 6px solid ${props => props.theme.grey2};
    @media (max-width: 600px) {
        margin: 0 40px 0 0;
        overflow: scroll;
        height: 100vh;
        position: fixed;
        z-index: 10000;
        background-color: #fff;
        top: 0px;
        left: -275px;
        width: 235px;
        padding: 20px 20px;
        box-shadow: 2px 0px 10px 0px #00000026;
        border-right: none;
    }
`;

const fetchCategories = gql`
    query getCategories($urlKey: String!) {
        web {
            userSignedIn {
                _id
                username
                roles
            }
            categoryFindByUrlKey(urlKey: $urlKey) {
                _id
                title
                urlKey
                playlistIds
                playlistObjects {
                    _id
                    title
                    categoryObjects {
                        _id
                        title
                    }
                    ownerObject {
                        _id
                        username
                        profileImage {
                            original {
                                url
                            }
                        }
                    }
                    giphy {
                        gif
                    }
                    image {
                        original {
                            url
                        }
                    }
                    bitesPagination(page: 1, perPage: 200) {
                        items {
                            _id
                            title
                            image {
                                original {
                                    url
                                }
                            }
                            audio {
                                mp3 {
                                    url
                                }
                            }
                        }
                    }
                }
            }
            categoryMany {
                _id
                title
                urlKey
                imageUrl
                playlistObjects {
                    _id
                }
                itemNoteObjects {
                    _id
                    title
                    noteContents
                    visibility
                    updatedAt
                    createdAt
                    deleted
                    ownerObject {
                        _id
                        username
                    }
                }
            }
        }
    }
`;

const createNewNote = gql`
    mutation createNewNote($record: createNewItemNoteInput!) {
        web {
            categoryCreateNewItemNote(record: $record) {
                category {
                    _id
                    itemNoteObjects {
                        _id
                        title
                        noteContents
                        visibility
                        updatedAt
                        createdAt
                        deleted
                        ownerObject {
                            _id
                            username
                        }
                    }
                }
            }
        }
    }
`;

const removeCategoryNote = gql`
    mutation removeCategoryNote($record: removeNoteItemArguments!) {
        web {
            categoryRemoveNewItemNote(record: $record) {
                category {
                    _id
                    itemNoteObjects {
                        _id
                        title
                        noteContents
                        visibility
                        updatedAt
                        createdAt
                        deleted
                        ownerObject {
                            _id
                            username
                        }
                    }
                }
            }
        }
    }
`;

const Page = props => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [showBlerpsCard, setShowBlerpsCard] = useState(false);
    const [showingBlerps, setShowingBlerps] = useState([]);
    const [showingBoard, setShowingBoard] = useState();
    const [userCreated, setUserCreated] = useState();
    const [noteInput, setNoteInput] = useState("");
    const [posY, setPosY] = useState(0);
    const [sideBarShow, setSidebarShow] = useState(false);
    const router = useRouter();

    const [newNote] = useMutation(createNewNote);
    const [removeNote] = useMutation(removeCategoryNote);

    const theme = useContext(ThemeContext);

    const { loading, error, data, refetch } = useQuery(fetchCategories, {
        variables: {
            urlKey: (props.url.asPath && props.url.asPath.split("/")[2]) || "",
        },
        ssr: true,
    });

    useEffect(() => {
        refetch();
    }, []);

    if (error) return `error`;
    if (loading && !data) return <LoadingFullScreen />;
    if (data)
        return (
            <>
                <NavBar />
                <>
                    <Grid
                        gridColumns='300px auto'
                        padding='20px'
                        style={{
                            backgroundColor: "#fff",
                        }}
                    >
                        <SidebarGridColumn>
                            <div
                                style={{
                                    position: "sticky",
                                    top: "100px",
                                }}
                            >
                                <Link prefetch={true} href='/categories'>
                                    <BackButton>Back</BackButton>
                                </Link>
                                {data.web.categoryMany.map(category => (
                                    <>
                                        {category.imageUrl ? (
                                            <Link
                                                prefetch={true}
                                                href={{
                                                    pathname: "/categories",
                                                    query: {
                                                        key: category.urlKey,
                                                    },
                                                }}
                                                as={`/categories/${category.urlKey}`}
                                            >
                                                <StyledText
                                                    key={`category-${category._id}`}
                                                    style={{
                                                        margin: "15px 0",
                                                        cursor: "pointer",
                                                    }}
                                                    fontSize='21px'
                                                    fontWeight='light'
                                                    active={
                                                        props.url.asPath &&
                                                        props.url.asPath.split(
                                                            "/",
                                                        )[2] === category.urlKey
                                                    }
                                                >
                                                    {data.web.userSignedIn &&
                                                    data.web.userSignedIn.roles.includes(
                                                        "MODERATOR",
                                                    )
                                                        ? `${category.title} (${category.playlistObjects.length})`
                                                        : `${category.title}`}
                                                </StyledText>
                                            </Link>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ))}
                                {data.web.userSignedIn &&
                                data.web.userSignedIn.roles.includes(
                                    "MODERATOR",
                                ) ? (
                                    <Link
                                        prefetch={true}
                                        href={{ pathname: "/upload" }}
                                    >
                                        <StyledText
                                            style={{
                                                margin: "15px 0",
                                                cursor: "pointer",
                                            }}
                                            fontSize='21px'
                                            fontWeight='light'
                                        >
                                            Create New Board
                                        </StyledText>
                                    </Link>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </SidebarGridColumn>
                        <GridColumn>
                            <Text
                                style={{ textAlign: "left", margin: "20px" }}
                                fontSize='30px'
                                fontColor='dark170D11'
                            >
                                {props.url.asPath &&
                                props.url.asPath.split("/")[2] !== undefined
                                    ? props.url.asPath
                                          .split("/")[2]
                                          .charAt(0)
                                          .toUpperCase() +
                                      props.url.asPath.split("/")[2].slice(1)
                                    : "Categories"}
                            </Text>
                            <BoardSquareRow>
                                {!data.web.categoryFindByUrlKey ? (
                                    data.web.categoryMany.map(category => (
                                        <>
                                            {category.imageUrl ? (
                                                <BoardSquareContainer
                                                    id={`${category.title}`}
                                                    key={`${category.title}`}
                                                    url={category.imageUrl}
                                                >
                                                    {(data.web.userSignedIn &&
                                                        data.web.userSignedIn.roles.includes(
                                                            "MODERATOR",
                                                        )) ||
                                                    (data.web.userSignedIn &&
                                                        data.web.userSignedIn.roles.includes(
                                                            "ADMIN",
                                                        )) ? (
                                                        <div
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                right: "5px",
                                                                top: "-20px",
                                                            }}
                                                        >
                                                            <Modal
                                                                trigger={
                                                                    <Button
                                                                        style={{
                                                                            zIndex:
                                                                                "100",
                                                                            border:
                                                                                "2px solid #fff",
                                                                            width:
                                                                                "40px",
                                                                            height:
                                                                                "40px",
                                                                            alignItems:
                                                                                "center",
                                                                            justifyContent:
                                                                                "center",
                                                                            fontSize:
                                                                                "18px",
                                                                            borderRadius:
                                                                                "100px",
                                                                        }}
                                                                        fontColor='white'
                                                                        hoverColor='white'
                                                                        buttonType='custom'
                                                                        color='dark170D11'
                                                                        activeColor='red'
                                                                        rounding='round'
                                                                    >
                                                                        {
                                                                            category
                                                                                .itemNoteObjects
                                                                                .length
                                                                        }
                                                                    </Button>
                                                                }
                                                                right
                                                                gridColumns={1}
                                                                backgroundBlur
                                                                renderCloseButton={handleCloseModal => (
                                                                    <Button
                                                                        onClick={e =>
                                                                            handleCloseModal()
                                                                        }
                                                                        style={{
                                                                            justifySelf:
                                                                                "center",
                                                                        }}
                                                                        buttonType='third'
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                )}
                                                            >
                                                                <Text
                                                                    fontColor='dark170D11'
                                                                    style={{
                                                                        width:
                                                                            "350px",
                                                                    }}
                                                                >
                                                                    Notes
                                                                </Text>
                                                                <Row
                                                                    fontSize='18px'
                                                                    style={{
                                                                        flexDirection:
                                                                            "column",
                                                                        maxHeight:
                                                                            "250px",
                                                                        overflowY:
                                                                            "scroll",
                                                                        margin:
                                                                            "0",
                                                                        width:
                                                                            "100%",
                                                                    }}
                                                                >
                                                                    {category.itemNoteObjects.map(
                                                                        note => (
                                                                            <>
                                                                                <Row
                                                                                    style={{
                                                                                        backgroundColor:
                                                                                            "white",
                                                                                        alignItems:
                                                                                            "center",
                                                                                        margin:
                                                                                            "0 0 20px 0",
                                                                                        width:
                                                                                            "100%",
                                                                                    }}
                                                                                >
                                                                                    <div>
                                                                                        <Text
                                                                                            fontColor='dark170D11'
                                                                                            style={{
                                                                                                textAlign:
                                                                                                    "left",
                                                                                            }}
                                                                                            fontSize='18px'
                                                                                        >
                                                                                            {
                                                                                                note.noteContents
                                                                                            }
                                                                                        </Text>
                                                                                        <Text
                                                                                            style={{
                                                                                                textAlign:
                                                                                                    "left",
                                                                                            }}
                                                                                            fontSize='12px'
                                                                                        >
                                                                                            {
                                                                                                note
                                                                                                    .ownerObject
                                                                                                    .username
                                                                                            }{" "}
                                                                                            {
                                                                                                note.createdAt.split(
                                                                                                    "T",
                                                                                                )[0]
                                                                                            }
                                                                                        </Text>
                                                                                    </div>
                                                                                    <Icon
                                                                                        onClick={() =>
                                                                                            removeNote(
                                                                                                {
                                                                                                    variables: {
                                                                                                        record: {
                                                                                                            categoryId:
                                                                                                                category._id,
                                                                                                            itemNoteId:
                                                                                                                note._id,
                                                                                                        },
                                                                                                    },
                                                                                                },
                                                                                            )
                                                                                        }
                                                                                        url='https://storage.googleapis.com/blerp_products/Twitch/Assets/Close_Black.svg?folder=true&organizationId=true'
                                                                                    />
                                                                                </Row>
                                                                            </>
                                                                        ),
                                                                    )}
                                                                </Row>
                                                                <Row
                                                                    style={{
                                                                        margin:
                                                                            "0",
                                                                    }}
                                                                >
                                                                    <Text
                                                                        fontColor='dark170D11'
                                                                        style={{
                                                                            textAlign:
                                                                                "left",
                                                                        }}
                                                                        fontSize='18px'
                                                                    >
                                                                        New Note
                                                                    </Text>
                                                                </Row>
                                                                <textarea
                                                                    value={
                                                                        noteInput
                                                                    }
                                                                    onChange={e =>
                                                                        setNoteInput(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    style={{
                                                                        fontSize:
                                                                            "20px",
                                                                        padding:
                                                                            "0",
                                                                        width:
                                                                            "100%",
                                                                        height:
                                                                            "120px",
                                                                    }}
                                                                />
                                                                <Button
                                                                    onClick={() =>
                                                                        newNote(
                                                                            {
                                                                                variables: {
                                                                                    record: {
                                                                                        categoryId:
                                                                                            category._id,
                                                                                        itemNoteContents: noteInput,
                                                                                    },
                                                                                },
                                                                            },
                                                                        )
                                                                    }
                                                                    style={{
                                                                        justifySelf:
                                                                            "center",
                                                                        margin:
                                                                            "8px 4px",
                                                                    }}
                                                                >
                                                                    Save
                                                                </Button>
                                                            </Modal>
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <Link
                                                        prefetch={true}
                                                        href={{
                                                            pathname:
                                                                "/categories",
                                                            query: {
                                                                key:
                                                                    category.urlKey,
                                                            },
                                                        }}
                                                        as={`/categories/${category.urlKey}`}
                                                    >
                                                        <BoardSquareContainerOverlay>
                                                            <BoardSquareText>
                                                                {category.title}
                                                            </BoardSquareText>
                                                        </BoardSquareContainerOverlay>
                                                    </Link>
                                                </BoardSquareContainer>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ))
                                ) : (
                                    <></>
                                )}
                                {loading ? (
                                    <LoadingTinyScreen />
                                ) : (
                                    data.web.categoryFindByUrlKey &&
                                    data.web.categoryFindByUrlKey.playlistObjects.map(
                                        item => (
                                            <>
                                                <BoardItem
                                                    key={`board-${item._id}`}
                                                    item={item}
                                                    setPosY={value =>
                                                        setPosY(value)
                                                    }
                                                    setShowBlerpsCard={value =>
                                                        setShowBlerpsCard(value)
                                                    }
                                                    setShowingBlerps={blerps =>
                                                        setShowingBlerps(blerps)
                                                    }
                                                    setShowingBoard={board =>
                                                        setShowingBoard(board)
                                                    }
                                                    setUserCreated={user =>
                                                        setUserCreated(user)
                                                    }
                                                    signedInUserId={
                                                        data.web.userSignedIn &&
                                                        data.web.userSignedIn
                                                            ._id
                                                    }
                                                />
                                            </>
                                        ),
                                    )
                                )}
                            </BoardSquareRow>
                        </GridColumn>
                        {showBlerpsCard ? (
                            <BoardBlerpsCard
                                posY={posY}
                                board={showingBoard}
                                user={userCreated}
                                blerps={showingBlerps}
                                categories={data.web.categoryMany}
                                onClose={() => setShowBlerpsCard(false)}
                            />
                        ) : (
                            <></>
                        )}
                    </Grid>
                </>
            </>
        );
};

export default withData(Page);
