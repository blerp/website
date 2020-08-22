import React, { useState, useEffect } from "react";
import AllTheBitesGrid from "../AllTheBitesGrid";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import LoadingFullScreen from "../../loading/loading-full-screen";
import ProfileBoardHeader from "./ProfileBoardHeader";
import withData from "../../../lib/withData";
import {
    MainContentHeaderText,
    Row,
    AllBitesContainer,
    MainContentConatiner,
    LargeCenterText,
    ControlIcon,
} from "./ProfileStyledComponents";
import Dropdown from "../Dropdown/Dropdown";
import { ControlGrid } from "../Dropdown/DropDownStyledComponents";
import CreateNewBlerpButton from "./CreateNewBlerpButton";
import DiscoverContainer from "./DiscoverContainer";
import styled from "styled-components";
import { doubleDarkBlue } from "../../../styles/colors";
import Bite from "../../bite";

const StyledAllBitesContainer = styled(AllBitesContainer)`
    background-color: ${props => props.theme.flyoutBackground};
    padding: ${props => (props.hide ? "0px" : "0 0 40px 0")};
    height: ${props => (props.hide ? "0px" : "auto")};
    ${props => (props.hide ? "padding: 0px;" : "")}
    transition: 1s;
    overflow-x: hidden;
`;
const fetchUserProfileFavorites = gql`
    query getUserFavoritesForWeb(
        $userId: MongoID!
        $page: Int!
        $sort: SortFindManyBiteInput
    ) {
        web {
            userSignedIn {
                _id
                username
                roles
            }
            userById(_id: $userId) {
                _id
                username
                profileImage {
                    original {
                        url
                    }
                }
                favoritePlaylist {
                    _id
                    title
                    bitesPagination(page: $page, perPage: 200, sort: $sort) {
                        items {
                            ...bite
                        }
                    }
                }
                followSoundboardPagination(page: $page, perPage: 200) {
                    count
                    pageInfo {
                        perPage
                        currentPage
                        hasNextPage
                    }
                    items {
                        _id
                        title
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
                        bitesPagination(page: $page, perPage: 200) {
                            items {
                                ...bite
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
        ownerId
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
const DropdownChevron = styled.div`
    position: relative;
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-position: center;
    padding-top: 8px;
    margin-left: 4px;
    float: right;
    width: 20px;
    height: 20px;
    transition: 0.2s;
`;

const BoardBitesContainer = styled.div`
    display: grid;
    padding: 20px 10px;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    grid-auto-flow: column;
    grid-auto-columns: minmax(160px, 1fr);
    overflow-x: hidden;
    scroll-behavior: smooth;
    position: relative;
    margin: 0 0 0 9%;
    width: 91%;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const FavoriteBlerpPlaceHolder = styled.div`
    position: absolute;
    left: 9%;
    width: 120px;
    height: 120px;
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Account/Blerp%20placeholder%20favorites.svg?folder=true&organizationId=true);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;

const ProfileFavorites = props => {
    const [userBlerpPage, setUserBlerpPage] = useState(1);
    const [sortType, setSortType] = useState("CREATEDAT_DESC");
    const [blerpsHide, setBlerpsHide] = useState(false);
    const [favoriteBoards, setFavoriteBoards] = useState([]);
    const [viewType, setViewType] = useState("list");
    const { loading, error, data, refetch, fetchMore } = useQuery(
        fetchUserProfileFavorites,
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

    const scrollToRight = () => {
        if (blerpsHide === false) {
            let container = document.getElementById("favorite-bite-container");
            let scrollRight = container.scrollLeft;
            scrollRight += 900;
            container.scrollLeft = scrollRight;
            handleLoadMoreUserBites();
            setUserBlerpPage(userBlerpPage + 1);
        }
    };

    const scrollToLeft = () => {
        if (blerpsHide === false) {
            let container = document.getElementById("favorite-bite-container");
            let scrollRight = container.scrollLeft;
            scrollRight -= 900;
            container.scrollLeft = scrollRight;
        }
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
                        favoriteBitesPagination: {
                            ...prev.web.userById.favoritePlaylist,
                            bitesPagination: {
                                items: [
                                    ...prev.web.userById.favoritePlaylist
                                        .bitesPagination.items,
                                    ...fetchMoreResult.web.userById
                                        .favoritePlaylist.bitesPagination.items,
                                ],
                            },
                        },
                    },
                };
            },
        });
    };

    if (loading) return <LoadingFullScreen />;
    if (error) return `Error ${error.message}`;

    if (data) {
        return (
            <div>
                <ProfileBoardHeader
                    boards={data.web.userById.followSoundboardPagination.items}
                    type='Favorite Boards'
                    hideControls={false}
                    big
                    isOwner={props.isOwner}
                    signedInUserId={
                        data.web.userSignedIn && data.web.userSignedIn._id
                    }
                />
                <MainContentConatiner>
                    <Row
                        style={{
                            justifyContent: "center",
                            position: "relative",
                            width: "90%",
                        }}
                    >
                        <MainContentHeaderText>
                            Favorite Blerps
                            {/* <DropdownChevron url={blerpsHide ? "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Down.svg?folder=true&organizationId=true" : "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Up.svg?folder=true&organizationId=true"}/> */}
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
                    {/* CREATE NEW LIST? */}
                    <StyledAllBitesContainer hide={blerpsHide}>
                        {blerpsHide ? (
                            <></>
                        ) : (
                            <>
                                {data.web.userById.favoritePlaylist
                                    .bitesPagination.items.length === 0 ? (
                                    <Row>
                                        {props.isOwner ? (
                                            <>
                                                <FavoriteBlerpPlaceHolder />
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                        <LargeCenterText>
                                            {props.isOwner
                                                ? "Favorite some Blerps to display here!"
                                                : "Nothing has been favorited yet!"}
                                        </LargeCenterText>
                                    </Row>
                                ) : (
                                    <></>
                                )}
                                {viewType === "list" ? (
                                    <BoardBitesContainer
                                        style={{ gridTemplateRows: "auto" }}
                                        id='favorite-bite-container'
                                    >
                                        {data.web.userById.favoritePlaylist.bitesPagination.items.map(
                                            bite => (
                                                <>
                                                    <Bite
                                                        key={bite._id}
                                                        id={bite._id}
                                                        title={bite.title}
                                                        audioSourceUrls={[
                                                            bite.audio.mp3.url,
                                                        ]}
                                                        color={bite.color}
                                                        image={
                                                            (bite.image &&
                                                                bite.image
                                                                    .original
                                                                    .url) ||
                                                            (bite.giphy &&
                                                                bite.giphy.gif)
                                                        }
                                                        favorited={true}
                                                        playCount={
                                                            bite.playCount
                                                        }
                                                        featuredPage={
                                                            props.featuredPage
                                                        }
                                                        isFeaturedBite={true}
                                                        preload={true}
                                                        bite={bite}
                                                    />
                                                </>
                                            ),
                                        )}
                                    </BoardBitesContainer>
                                ) : (
                                    <AllTheBitesGrid
                                        isOwner={props.isOwner}
                                        listLoadMore={() => {
                                            handleLoadMoreUserBites();
                                            setUserBlerpPage(userBlerpPage + 1);
                                        }}
                                        bites={
                                            data.web.userById.favoritePlaylist
                                                .bitesPagination.items || []
                                        }
                                        userSignedIn={data.web.userSignedIn}
                                    />
                                )}
                            </>
                        )}
                    </StyledAllBitesContainer>
                </MainContentConatiner>
                {data.web.userSignedIn &&
                data.web.userSignedIn._id === data.web.userById._id ? (
                    <DiscoverContainer
                        signedInUserId={
                            data.web.userSignedIn && data.web.userSignedIn._id
                        }
                    />
                ) : (
                    <></>
                )}
            </div>
        );
    }
};

export default withData(ProfileFavorites);
