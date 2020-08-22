import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AllTheBitesGrid from "../AllTheBitesGrid";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import LoadingFullScreen from "../../loading/loading-full-screen";
import withData from "../../../lib/withData";
import ProfileBlerpHeader from "./ProfileBlerpHeader";
import {
    MainContentHeaderText,
    Row,
    AllBitesContainer,
    LargeCenterText,
    MainContentConatiner,
} from "./ProfileStyledComponents";
import Dropdown from "../Dropdown/Dropdown";
import { ControlGrid } from "../Dropdown/DropDownStyledComponents";
import CreateNewBlerpButton from "./CreateNewBlerpButton";
import LoadingTinyScreen from "../../loading/loading-tiny-screen";

const fetchUserProfileBlerps = gql`
    query getUserBlerpsForWeb(
        $userId: MongoID!
        $page: Int!
        $sort: SortFindManyBiteInputAuth
    ) {
        web {
            userSignedIn {
                _id
                username
                roles
            }
            userById(_id: $userId) {
                _id
                bitePagination(page: $page, perPage: 18, sort: $sort) {
                    count
                    items {
                        ...bite
                    }
                }
                sharePagination(
                    _id: $userId
                    page: $page
                    perPage: 20
                    sort: CREATEDAT_DESC
                    filter: { userId: $userId, playlistId: { ne: null } }
                ) {
                    items {
                        _id
                        biteId
                        bite {
                            ...bite
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
        reportObject {
            _id
            reportedContentStatus
            reasonType
        }
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

const ProfileBlerps = props => {
    const [userBlerpPage, setUserBlerpPage] = useState(1);
    const [sortType, setSortType] = useState("CREATEDAT_DESC");
    const { loading, error, data, refetch, fetchMore } = useQuery(
        fetchUserProfileBlerps,
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
                            bitePagination: {
                                ...prev.web.userById.bitePagination,
                                items: [
                                    ...prev.web.userById.bitePagination.items,
                                    ...fetchMoreResult.web.userById
                                        .bitePagination.items,
                                ],
                            },
                        },
                    },
                };
            },
        });
    };

    if (loading && !data) return <LoadingFullScreen />;
    if (error) return `Error ${error.message}`;

    if (data) {
        return (
            <>
                {data.web.userSignedIn &&
                data.web.userSignedIn._id === data.web.userById._id ? (
                    <ProfileBlerpHeader
                        blerps={data.web.userById.sharePagination.items}
                    />
                ) : (
                    <></>
                )}
                <MainContentConatiner>
                    <Row style={{ justifyContent: "center" }}>
                        <MainContentHeaderText>My blerps</MainContentHeaderText>
                        <ControlGrid style={{ gridAutoColumns: "auto" }}>
                            <Dropdown
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
                        </ControlGrid>
                    </Row>
                    {data.web.userById.bitePagination.items.length === 0 ? (
                        <Row>
                            <CreateNewBlerpButton />
                        </Row>
                    ) : (
                        <></>
                    )}
                    {/* CREATE NEW LIST? */}
                    <AllBitesContainer>
                        <AllTheBitesGrid
                            isOwner={props.isOwner}
                            listLoadMore={() => {
                                handleLoadMoreUserBites();
                                setUserBlerpPage(userBlerpPage + 1);
                            }}
                            bites={data.web.userById.bitePagination.items || []}
                            userSignedIn={data.web.userSignedIn}
                        />
                        {loading ? <LoadingFullScreen /> : <></>}
                    </AllBitesContainer>
                </MainContentConatiner>
            </>
        );
    }
};

export default withData(ProfileBlerps);
