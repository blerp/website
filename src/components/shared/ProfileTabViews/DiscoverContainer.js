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
    BoardFavoriteIcon,
    AllBitesContainer,
} from "./ProfileStyledComponents";
import BoardBlerpsCard from "./BoardBlerpsCard";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { GreyButton } from "../Modal/BaseModal";
import LoadingTinyScreen from "../../loading/loading-tiny-screen";
import LoadingFullScreen from "../../loading/loading-full-screen";
import Bite from "../../bite";
import BoardItem from "./BoardItem";
import { render } from "react-dom";
import Text from "../../theme/Text";

const DiscoveryControlsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const BlerpGridConatiner = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    width: 86%;
    margin: 0 5% 0 auto;
    justify-content: space-between;
    overflow-x: hidden;

    @media (max-width: 1450px) {
        grid-template-columns: auto auto auto auto auto;
    }

    @media (max-width: 1100px) {
        grid-template-columns: auto auto auto auto;
    }

    @media (max-width: 830px) {
        grid-template-columns: auto auto auto;
    }

    @media (max-width: 400px) {
        grid-template-columns: auto auto;
    }
`;

const BoardGridConatiner = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    width: 86%;
    margin: 0 5% 0 auto;
    position: relative;
    justify-content: space-between;
    overflow: hidden;
    row-gap: 30px;

    @media (max-width: 1450px) {
        grid-template-columns: auto auto auto auto;
    }

    @media (max-width: 1100px) {
        grid-template-columns: auto auto auto;
    }

    @media (max-width: 830px) {
        grid-template-columns: auto auto;
    }

    @media (max-width: 400px) {
        grid-template-columns: auto;
    }
`;

const DiscoverWrapper = styled.div`
    margin: 30px 0;
`;
const SearchContainer = styled.div`
    border: 0px !important;
    border-bottom: 2px solid ${props => props.theme.secondarySubtitleText} !important;
    border-radius: 0px;
    background-color: transparent;
    width: 40%;
    display: flex;
    justify-content: space-between;
    max-width: 450px;

    &:focus-within {
        border-bottom: 2px solid #fe295c !important;
    }

    @media (max-width: 600px) {
        width: 100%;
        overflow-x: hidden;
        margin: 0;
    }
`;
const StyledInput = styled.input`
    border: 0px !important;
    border-radius: 0px;
    background-color: transparent;
    height: 31px;
    font-size: 18px;
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Account/Search%20magnifying%20glass.svg?folder=true&organizationId=true);
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: left;
    padding-left: 25px;
    width: 100%;

    &:focus {
        border: 0px !important;
        border-radius: 0px;
        background-color: transparent;
    }

    @media (max-width: 600px) {
        font-size: 14px;
        width: 60%;
    }
`;

const StyledRow = styled(Row)`
    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const StyledGreyButton = styled(GreyButton)`
    background-color: #e6e6e6;
    transition: all 0.2s ease 0s;
    align-self: center;
    margin: 50px auto 80px auto;
    border-radius: 15px;
    padding: 0 15px;
    transition: 0.2s;

    &:hover {
        background-color: ${props => props.theme.greyAE};
    }
`;

const LightText = styled.p`
    margin-top: 10px;
    padding: 0;
    color: ${props => props.theme.greyAE};
    font-weight: 300;
`;

const fetchSearchQuery = gql`
    query websiteSearchPage($query: String!, $pageCount: Int!, $perPage: Int!) {
        web {
            getFeaturedListForPlatform(platform: WEB) {
                _id
                title
                playlistPagination(page: 1, perPage: 200) {
                    items {
                        _id
                        title
                        image {
                            original {
                                url
                                __typename
                            }
                            __typename
                        }
                        giphy {
                            gif
                            __typename
                        }
                        followed
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

                        bitesPagination(page: 1, perPage: 200) {
                            items {
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
                        }
                    }
                    __typename
                }
                __typename
            }
            playlistElasticSearch(
                query: $query
                page: $pageCount
                perPage: $perPage
            ) {
                pageInfo {
                    perPage
                    hasNextPage
                    currentPage
                    itemCount
                }
                items {
                    _id
                    title
                    image {
                        original {
                            url
                        }
                    }
                    giphy {
                        gif
                    }
                    followed
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
                    bitesPagination(page: 1, perPage: 24) {
                        items {
                            _id
                            title
                            keywords
                            color
                            image {
                                original {
                                    url
                                }
                            }
                            giphy {
                                gif
                            }
                            favorited
                            playCount
                            audienceRating
                            audio {
                                original {
                                    url
                                }
                                mp3 {
                                    url
                                }
                            }
                        }
                    }
                }
            }
            biteElasticSearch(
                query: $query
                page: $pageCount
                perPage: $perPage
            ) {
                pageInfo {
                    perPage
                    hasNextPage
                    currentPage
                    itemCount
                }
                suggest {
                    text
                }
                bites {
                    _id
                    title
                    keywords
                    color
                    image {
                        original {
                            url
                        }
                    }
                    giphy {
                        gif
                    }
                    favorited
                    playCount
                    audienceRating
                    audio {
                        original {
                            url
                        }
                        mp3 {
                            url
                        }
                    }
                }
            }
        }
    }
`;

const DiscoverContainer = props => {
    const [images, setImages] = useState([]);
    const [viewType, setViewType] = useState("list");
    const [showBlerpsCard, setShowBlerpsCard] = useState(false);
    const [showingBlerps, setShowingBlerps] = useState([]);
    const [showingBoard, setShowingBoard] = useState();
    const [searchInput, setSearchInput] = useState(props.searchTerm || "");
    const [userCreated, setUserCreated] = useState();
    const [searchButton, setSearchButton] = useState("Search");
    const [blerpPage, setBlerpPage] = useState(1);
    const [boardPage, setBoardPage] = useState(1);
    const [posY, setPosY] = useState(0);

    const { loading, error, data, refetch, fetchMore } = useQuery(
        fetchSearchQuery,
        {
            variables: {
                query: props.searchTerm || "",
                pageCount: 1,
                perPage: 10,
            },
        },
    );

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

    const handleLoadMore = type => {
        if (type === "bites") {
            setBlerpPage(blerpPage + 1);
            fetchMore({
                variables: {
                    page: blerpPage + 1,
                    pageCount: blerpPage + 1,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    const newData = {
                        web: {
                            ...prev.web,
                            biteElasticSearch: {
                                ...fetchMoreResult.web.biteElasticSearch,
                                pageInfo: {
                                    ...fetchMoreResult.web.biteElasticSearch
                                        .pageInfo,
                                },
                                bites: [
                                    ...prev.web.biteElasticSearch.bites,
                                    ...fetchMoreResult.web.biteElasticSearch
                                        .bites,
                                ],
                            },
                        },
                    };
                    return newData;
                },
            });
        } else {
            setBoardPage(boardPage + 1);
            fetchMore({
                variables: {
                    page: boardPage + 1,
                    pageCount: boardPage + 1,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    const newData = {
                        web: {
                            ...prev.web,
                            playlistElasticSearch: {
                                ...fetchMoreResult.web.playlistElasticSearch,
                                pageInfo: {
                                    ...fetchMoreResult.web.playlistElasticSearch
                                        .pageInfo,
                                },
                                items: [
                                    ...prev.web.playlistElasticSearch.items,
                                    ...fetchMoreResult.web.playlistElasticSearch
                                        .items,
                                ],
                            },
                        },
                    };
                    return newData;
                },
            });
        }
    };

    const scrollToRight = () => {
        let container = document.getElementById("discover-board-container");
        let scrollRight = container.scrollLeft;
        scrollRight += 900;
        container.scrollLeft = scrollRight;
    };

    const scrollToLeft = () => {
        let container = document.getElementById("discover-board-container");
        let scrollRight = container.scrollLeft;
        scrollRight -= 900;
        container.scrollLeft = scrollRight;
    };

    const handleKeyPress = event => {
        if (event.key === "Enter") {
            setBlerpPage(1);
            setBoardPage(1);
            setShowBlerpsCard(false);
            console.log("test");
            refetch({
                query: searchInput,
                page: 1,
            });
            setSearchButton("Cancel");
        }
    };

    const renderNoContent = () => {
        return (
            <>
                {data.web.getFeaturedListForPlatform.playlistPagination.items.map(
                    item => (
                        <BoardItem
                            query={searchInput}
                            key={`discover-${item._id}`}
                            item={item}
                            setPosY={value => setPosY(value)}
                            onClick={event => onMenuClick(event)}
                            setShowBlerpsCard={value =>
                                setShowBlerpsCard(value)
                            }
                            setShowingBlerps={blerps =>
                                setShowingBlerps(blerps)
                            }
                            setShowingBoard={board => setShowingBoard(board)}
                            setUserCreated={user => setUserCreated(user)}
                            signedInUserId={props.signedInUserId}
                        />
                    ),
                )}
            </>
        );
    };

    return (
        <DiscoverWrapper>
            {props.hideSearch ? (
                <></>
            ) : (
                <StyledRow
                    style={{
                        justifyContent: "space-between",
                        marginBottom: "30px",
                    }}
                >
                    <FavoriteBoardHeaderControlsText
                        style={{
                            fontSize: "18px",
                            alignSelf: "center",
                            fontWeight: "lighter",
                            color: "#707070",
                        }}
                    >
                        {searchInput === "" ? "Recommended" : "Search Results"}
                    </FavoriteBoardHeaderControlsText>
                    <SearchContainer>
                        <StyledInput
                            value={searchInput}
                            placeholder='Search movies, songs, memes'
                            onChange={e => {
                                setSearchInput(e.target.value);
                            }}
                            onKeyPress={e => handleKeyPress(e)}
                        />
                        <GreyButton
                            style={{ width: "30%" }}
                            onClick={() => {
                                if (searchButton == "Search") {
                                    setBlerpPage(1);
                                    setBoardPage(1);
                                    refetch({
                                        query: searchInput,
                                        page: 1,
                                    });
                                    setSearchButton("Cancel");
                                } else {
                                    setSearchInput("");
                                    setSearchButton("Search");
                                }
                            }}
                        >
                            {searchButton}
                        </GreyButton>
                    </SearchContainer>
                    <div></div>
                </StyledRow>
            )}
            {loading ? <LoadingFullScreen /> : <></>}
            {error ? "Error" : <></>}
            {data ? (
                <>
                    {searchInput === "" ? (
                        <></>
                    ) : (
                        <BlerpGridConatiner>
                            {data.web.biteElasticSearch.bites.map(bite => {
                                return (
                                    <AllBitesContainer
                                        key={`discover-${bite._id}`}
                                        style={{ padding: "0" }}
                                    >
                                        <Bite
                                            query={searchInput}
                                            key={bite._id}
                                            id={bite._id}
                                            title={bite.title}
                                            audioSourceUrls={[
                                                bite.audio.mp3.url,
                                            ]}
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
                                            bite={bite}
                                        />
                                    </AllBitesContainer>
                                );
                            })}
                            {data.web.biteElasticSearch.bites.length === 0 ? (
                                <></>
                            ) : (
                                <>
                                    {data.web.biteElasticSearch.pageInfo
                                        .hasNextPage ? (
                                        <StyledGreyButton
                                            onClick={() =>
                                                handleLoadMore("bites")
                                            }
                                        >
                                            Load More
                                            <LightText>
                                                (
                                                {
                                                    data.web.biteElasticSearch
                                                        .pageInfo.itemCount
                                                }{" "}
                                                Results)
                                            </LightText>
                                        </StyledGreyButton>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )}
                        </BlerpGridConatiner>
                    )}
                    <BoardGridConatiner id='discover-board-container'>
                        {searchInput === "" ? (
                            data.web.getFeaturedListForPlatform
                                .playlistPagination.items.length === 0 ? (
                                renderNoContent()
                            ) : (
                                data.web.getFeaturedListForPlatform.playlistPagination.items.map(
                                    item => {
                                        return !item.followed ? (
                                            <BoardItem
                                                query={searchInput}
                                                key={`discover-${item._id}`}
                                                item={item}
                                                setPosY={value =>
                                                    setPosY(value)
                                                }
                                                onClick={event =>
                                                    onMenuClick(event)
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
                                                    props.signedInUserId
                                                }
                                            />
                                        ) : (
                                            <></>
                                        );
                                    },
                                )
                            )
                        ) : data.web.playlistElasticSearch.items.length ===
                          0 ? (
                            renderNoContent()
                        ) : (
                            <>
                                {data.web.playlistElasticSearch.items.map(
                                    (item, index) => {
                                        return (
                                            <BoardItem
                                                query={searchInput}
                                                key={`discover-${item._id}`}
                                                item={item}
                                                setPosY={value =>
                                                    setPosY(value)
                                                }
                                                onClick={event =>
                                                    onMenuClick(event)
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
                                                    props.signedInUserId
                                                }
                                            />
                                        );
                                    },
                                )}
                                {data.web.playlistElasticSearch.pageInfo
                                    .hasNextPage ? (
                                    <StyledGreyButton
                                        onClick={() => handleLoadMore("boards")}
                                    >
                                        Load More
                                        <LightText>
                                            (
                                            {
                                                data.web.playlistElasticSearch
                                                    .pageInfo.itemCount
                                            }{" "}
                                            Results)
                                        </LightText>
                                    </StyledGreyButton>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </BoardGridConatiner>
                    {showBlerpsCard ? (
                        <BoardBlerpsCard
                            query={searchInput}
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
            ) : (
                <></>
            )}
        </DiscoverWrapper>
    );
};

export default DiscoverContainer;
