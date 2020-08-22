/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import LoadingFullScreen from "../../loading/loading-full-screen";
import ProfileBoardHeader from "./ProfileBoardHeader";
import withData from "../../../lib/withData";
import {
    MainContentHeaderText,
    Row,
    ControlIcon,
    BoardSquareRow,
    BoardSquareContainer,
    BoardSquareContainerOverlay,
    BoardSquareText,
    LargeCenterText,
    MainContentConatiner,
} from "./ProfileStyledComponents";
import PlaylistListContainer from "../../playlists/PlaylistListContainer";
import List from "@researchgate/react-intersection-list";
import { flyoutBackground } from "../../../styles/colors";
import Dropdown from "../Dropdown/Dropdown";
import { ControlGrid } from "../Dropdown/DropDownStyledComponents";
import BoardBlerpsCard from "./BoardBlerpsCard";
import BoardItem from "./BoardItem";

const fetchUserProfileBoards = gql`
    query getUserBoardsForWeb(
        $userId: MongoID!
        $page: Int!
        $sort: SortFindManyPlaylistInputAuth
    ) {
        web {
            userSignedIn {
                _id
                username
                roles
            }
            categoryMany {
                _id
                title
                playlistIds
            }
            userById(_id: $userId) {
                _id
                username
                profileImage {
                    original {
                        url
                    }
                }
                sharePagination(
                    _id: $userId
                    page: $page
                    perPage: 20
                    sort: CREATEDAT_DESC
                    filter: { userId: $userId, biteId: { ne: null } }
                ) {
                    items {
                        _id
                        playlistId
                        playlist {
                            _id
                            title
                            image {
                                original {
                                    url
                                }
                            }
                        }
                    }
                }
                playlistPagination(page: $page, perPage: 40, sort: $sort) {
                    count
                    pageInfo {
                        perPage
                        currentPage
                        hasNextPage
                    }
                    items {
                        _id
                        followed
                        title
                        ownerObject {
                            _id
                        }
                        giphy {
                            gif
                        }
                        image {
                            original {
                                url
                            }
                        }
                        categoryObjects {
                            _id
                            title
                        }
                        bitesPagination(page: $page, perPage: 10) {
                            items {
                                ...bite
                            }
                        }
                    }
                }
            }
        }
    }

    fragment bite on Bite {
        _id
        title
        keywords
        color
        favorited
        playCount
        giphy {
            gif
        }
        image {
            original {
                url
            }
        }
        audio {
            original {
                url
            }
            mp3 {
                url
            }
        }
    }
`;

const BoardListConatiner = styled.div`
    width: 100%;
    height: auto;
    margin: 0;
`;

const itemsRenderer = (items, ref) => {
    return (
        <BoardListConatiner ref={ref} role='region' aria-labelledby='recent'>
            {items}
        </BoardListConatiner>
    );
};

const ProfileBoards = props => {
    const [userBlerpPage, setUserBlerpPage] = useState(1);
    const [sortType, setSortType] = useState("CREATEDAT_DESC");
    const [viewType, setViewType] = useState("grid");
    const [showBlerpsCard, setShowBlerpsCard] = useState(false);
    const [showingBlerps, setShowingBlerps] = useState([]);
    const [showingBoard, setShowingBoard] = useState();
    const [searchInput, setSearchInput] = useState("");
    const [userCreated, setUserCreated] = useState();
    const [posY, setPosY] = useState(0);

    const { loading, error, data, refetch, fetchMore } = useQuery(
        fetchUserProfileBoards,
        {
            variables: {
                userId: props.userId,
                page: 1,
                sort: sortType,
            },
        },
    );

    const filterOptions = [
        { name: "New - Old", value: "CREATEDAT_DESC" },
        { name: "Old - New", value: "CREATEDAT_ASC" },
        { name: "Alphabetical", value: "ALPHABETICAL_ASC" },
    ];

    useEffect(() => {
        refetch();
    }, []);

    const filterData = async sortType => {
        await fetchMore({
            variables: {
                page: 1,
                sort: sortType,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                const newData = {
                    web: {
                        ...prev.web,
                        userById: {
                            ...prev.web.userById,
                            bitePagination: {
                                items: [
                                    ...fetchMoreResult.web.userById
                                        .bitePagination.items,
                                ],
                            },
                        },
                    },
                };
                return newData;
            },
        });
    };

    const handleLoadMoreUserBites = async () => {
        await fetchMore({
            variables: {
                page: userBlerpPage + 1,
                sort: sortType,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                    web: {
                        ...prev.web,
                        userById: {
                            ...prev.web.userById,
                            playlistPagination: {
                                ...prev.web.userById.playlistPagination,
                                items: [
                                    ...prev.web.userById.playlistPagination
                                        .items,
                                    ...fetchMoreResult.web.userById
                                        .playlistPagination.items,
                                ],
                            },
                        },
                    },
                };
            },
        });
        setUserBlerpPage(userBlerpPage + 1);
    };

    const playlistClicked = playlist => {
        window.location.href = `/soundboard/${playlist._id}`;
    };

    if (loading) return <LoadingFullScreen />;
    if (error) return `Error ${error.message}`;

    if (data) {
        return (
            <>
                {data.web.userSignedIn &&
                data.web.userSignedIn._id === data.web.userById._id ? (
                    <ProfileBoardHeader
                        boards={data.web.userById.sharePagination.items}
                        user={data.web.userById}
                        type='Recently Shared Boards'
                        hideControls
                    />
                ) : (
                    <></>
                )}
                <MainContentConatiner>
                    <Row
                        style={{
                            justifyContent: "center",
                            backgroundColor: flyoutBackground,
                            margin: "0",
                            padding: "0 auto",
                            width: "100%",
                        }}
                    >
                        <MainContentHeaderText>My boards</MainContentHeaderText>
                        <ControlGrid>
                            <Dropdown
                                style={{
                                    gridColumn: "1",
                                }}
                                type='filter'
                                currentSelection='Filter'
                                options={filterOptions}
                                icon='https://storage.googleapis.com/blerp_products/Web/Account/Filter.svg'
                                updateSelection={option => {
                                    setSortType(option.value);
                                    setUserBlerpPage(1);
                                    refetch({
                                        page: 1,
                                        sort: option.value,
                                    });
                                }}
                            />
                            <ControlIcon
                                onClick={() => {
                                    setViewType("list");
                                    refetch({
                                        page: 1,
                                        sort: sortType,
                                    });
                                    setUserBlerpPage(1);
                                }}
                                gridColumn={3}
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
                                style={{ justifySelf: "center" }}
                                onClick={() => {
                                    setViewType("grid");
                                    refetch({
                                        page: 1,
                                        sort: sortType,
                                    });
                                    setUserBlerpPage(1);
                                }}
                                gridColumn={4}
                                style={{
                                    display: props.hideControls ? "none" : "",
                                }}
                                url={
                                    viewType === "grid"
                                        ? "https://storage.googleapis.com/blerp_products/Web/Account/Gride%20View%20selected.svg?folder=true&organizationId=true"
                                        : "https://storage.googleapis.com/blerp_products/Web/Account/Grid%20view%20Quite.svg?folder=true&organizationId=true"
                                }
                            />
                        </ControlGrid>
                    </Row>
                    {/* CREATE NEW LIST? */}
                    {/* Note: page size on List should be divisible by the perpage on the query */}
                    {data.web.userById.playlistPagination.items.length === 0 ? (
                        <LargeCenterText>
                            Create some boards to display here!
                        </LargeCenterText>
                    ) : (
                        <></>
                    )}
                    {viewType === "list" ? (
                        <List
                            itemCount={
                                data.web.userById.playlistPagination.items
                                    .length
                            }
                            itemsRenderer={itemsRenderer}
                            onIntersection={() => handleLoadMoreUserBites()}
                            threshold={"60%"}
                            pageSize={10}
                        >
                            {(index, key) => {
                                const playlist =
                                    data.web.userById.playlistPagination.items[
                                        index
                                    ];
                                return (
                                    <PlaylistListContainer
                                        key={playlist._id}
                                        isDarker
                                        playlist={playlist}
                                    />
                                );
                            }}
                        </List>
                    ) : (
                        <BoardSquareRow
                            id='board-container'
                            viewType={"grid"}
                            style={{ height: "auto" }}
                        >
                            <List
                                itemCount={
                                    data.web.userById.playlistPagination.items
                                        .length
                                }
                                itemsRenderer={itemsRenderer}
                                onIntersection={() => handleLoadMoreUserBites()}
                                threshold={"60%"}
                                pageSize={10}
                            >
                                {(index, key) => {
                                    const item =
                                        data.web.userById.playlistPagination
                                            .items[index];
                                    return (
                                        <BoardItem
                                            key={`board-${item._id}`}
                                            item={item}
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
                                            setUserCreated={user =>
                                                setUserCreated(user)
                                            }
                                            signedInUserId={
                                                data.web.userSignedIn &&
                                                data.web.userSignedIn._id
                                            }
                                        />
                                    );
                                }}
                            </List>
                            {showBlerpsCard ? (
                                <BoardBlerpsCard
                                    posY={posY}
                                    board={showingBoard}
                                    user={data.web.userById}
                                    blerps={showingBlerps}
                                    categories={data.web.categoryMany}
                                    onClose={() => setShowBlerpsCard(false)}
                                />
                            ) : (
                                <></>
                            )}
                        </BoardSquareRow>
                    )}
                </MainContentConatiner>
            </>
        );
    }
};

export default withData(ProfileBoards);
