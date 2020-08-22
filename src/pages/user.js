/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import React, { useState, useEffect, createRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import withData from "../lib/withData";

import NavBar from "../components/navigation/navbar";
import LoadingFullScreen from "../components/loading/loading-full-screen";
import { flowRight as compose } from "lodash";

import { pandaPink, darkText, seafoam, doubleDarkBlue } from "../styles/colors";

import SocialModal from "../components/shared/ProfileTabViews/SocialModal";
import ProfileSettingsModal from "../components/shared/ProfileTabViews/ProfileSettingsModal";
import ProfileFollowModal from "../components/shared/ProfileTabViews/ProfileFollowModal";
import ProfileFavorites from "../components/shared/ProfileTabViews/ProfileFavorites";
import ProfileBlerps from "../components/shared/ProfileTabViews/ProfileBlerps";
import ProfileBoards from "../components/shared/ProfileTabViews/ProfileBoards";
import ImageUploadModal from "../components/shared/ProfileTabViews/ImageUploadModal";
import Footer from "../components/navigation/footer";
import { withRouter } from "next/dist/client/router";
import { GreyButton } from "../components/shared/Modal/BaseModal";
import { GenericModal } from "../components/theme/Theme";
import { useWindowSize } from "../lib/ScreenSizeHook";

const Header = styled.div`
    height: 375px;
    width: 100%;
    margin-top: 0px;
    overflow: hidden;
    position: relative;
    background-color: ${props => props.theme.flyoutBackground};
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: center;
    height: auto;
    width: 80%;
    margin: 0 auto;
`;

const HeaderRow = styled(Row)`
    justify-content: space-between;
    height: 100px;
    width: 80%;

    @media (max-width: 1000px) {
        width: 100%;
        padding: 0px 19px;
    }
`;

const TabRow = styled(Row)`
    justify-content: flex-start;
    height: 58px;

    @media (max-width: 600px) {
        width: 100%;
        justify-content: space-between;
    }
`;

const BackButton = styled.div`
    align-self: center;
    background-image: url("https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Left.svg");
    background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: 10% 50%;
    width: auto;
    height: 20px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 30px;
    padding: 6px 10px;
    transition: 0.2s;
    color: #47463f;
`;

const StyledPath = styled.path``;

const EditProfileSettings = styled.div`
    align-self: center;
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 16px 16px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: none;
    background-color: ${props => props.theme.flyoutBackground};
    border-radius: 50%;
    padding: 6px;
    opacity: 1;
    margin: 10px;
    transition: 0.2s;

    &:active {
        background-color: ${props => props.theme.grey3};
    }
`;

const SocialContainer = styled.div`
    background: ${props => props.theme.flyoutBackground} 0% 0% no-repeat
        padding-box;
    opacity: 0.55;
    border-radius: 4px;
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: auto;
    height: 38px;
    display: flex;
    transition: 0.2s;
`;

const SocialIcon = styled.a`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: 21px 21px;
    background-position: center;
    border-radius: 0;
    width: 21px;
    height: 21px;
    align-self: center;
    margin: 0 10px;
    opacity: 1;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-image: url(${props => props.hoverUrl});
    }
`;

const HeaderImage = styled.div`
    position: relative;
    height: 225px;
    max-height: 306px;
    width: 100%;
    background: url(${props =>
        props.url
            ? props.url
            : "https://storage.googleapis.com/blerp_products/Web/Account/Ibis%20to%20purple%20header%20placeholder.svg"});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    &:hover ${BackButton} {
        background-color: ${props => props.theme.flyoutBackground};
    }

    &:hover ${SocialContainer} {
        opacity: 1;
    }
`;

const UserStatsContainer = styled.div`
    margin-right: auto;
`;

const ProfileStatsContainer = styled.div`
    display: flex;
`;

const ProfileStatsText = styled.div`
    font-size: 16px;
    padding-right: 10px;
    font-weight: 300;

    border-radius: 5px;
    padding: 3px 5px;
    margin-right: 10px;

    cursor: pointer;

    transition: 0.2s;

    &:hover {
        background-color: ${props => props.theme.grey2};
        transition: 0s;
    }
    &:active {
        background-color: ${props => props.theme.grey3};
    }

    @media (max-width: 600px) {
        font-size: 14px;
    }
`;

const ProfileTabNav = styled.div`
    max-width: 860px;
    min-width: 500px;
    min-height: 60px;
    height: 80px;
    align-self: center;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: white;
    border-radius: 50px;
    box-shadow: 0px 0px 15px #0000001a;
    position: sticky;
    top: 100px;
    z-index: 9800;

    @media (max-width: 600px) {
        width: 100%;
        min-width: 100%;
        height: 62px;
        flex-wrap: no-wrap;
        top: 100px;
    }
`;

const ProfileTabNavIcon = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: contain;
    width: 24px;
    height: 24px;
    padding-right: 10px;
    transition: 0s;
    align-self: center;
    opacity: ${props => (props.active ? 1 : 0.8)};
    @media (max-width: 600px) {
        width: 14px;
        height: 14px;
        align-self: center;
    }
`;

const ProfileTabNavName = styled.div`
    color: ${props => props.theme.darkText};
    font-size: 40px;
    transition: 0.2s;
    word-wrap: break-word;

    @media (max-width: 830px) {
        font-size: 38px;
        width: 50vw;
        line-height: 1;
    }
`;

const ProfileTabNavText = styled.div`
    color: ${props => (props.active ? props.activeColor : props.theme.grey7)};
    opacity: ${props => (props.active ? 1 : 0.8)};
    font-size: 24px;
    font-weight: ${props => (props.active ? 400 : 300)};
    transition: 0s;
    align-self: center;

    @media (max-width: 830px) {
        font-size: 1em !important;
    }
`;

const ProfileTabNavItem = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
    cursor: pointer;
    transition: 0.2s;
    margin: 0 45px 0 0;
    padding: 5px;
    ${props =>
        props.active ? `border-bottom: 4px solid ${props.activeColor};` : ""};

    &:hover ${ProfileTabNavIcon} {
        background-image: url(${props => props.hoverUrl});
    }

    &:hover {
        border-bottom: 4px solid ${props => props.activeColor};
    }

    &:hover ${ProfileTabNavText} {
        color: ${props => props.activeColor};
    }

    @media (max-width: 830px) {
        margin: 0;
        top: 5px;
        position: relative;
    }
`;

const ProfileImage = styled.div`
    background-image: url(${props =>
        props.url
            ? props.url
            : "https://storage.googleapis.com/blerp_products/Web/Account/seafoam%20Account%20image.svg?folder=true&organizationId=true"});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    border: 6px solid white;
    position: relative;
    top: -60px;

    width: 134px;
    height: 134px;
    margin-right: 10px;

    @media (max-width: 1000px) {
        width: 109px;
        height: 109px;
    }
`;

const ProfileImageScrim = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.2s;

    &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

const ProfileFollowGenericModal = styled(GenericModal)`
    width: 475px;
    height: 525px;
    @media (max-width: 1000px) {
        top: 55%;
    }
    @media (max-width: 600px) {
        width: 95%;
    }
`;

const MobileName = styled.div`
    text-align: center;
    font-size: 42px;
`;

const fetchUserProfileWeb = gql`
    query getUserPageForWeb($userId: MongoID!) {
        web {
            userSignedIn {
                _id
                username
                roles
                loggedInIsFollower
                profileImage {
                    original {
                        url
                    }
                }
            }
            userById(_id: $userId) {
                _id
                firstName
                lastName
                email
                username
                bitePlays
                totalPlays
                birthday
                followerCount
                followingCount
                followerIds
                followingIds
                followerObjects {
                    username
                    _id
                    loggedInIsFollower
                }
                followingObjects {
                    username
                    _id
                    loggedInIsFollower
                }
                loggedInIsFollower
                gender
                profileType
                profileImage {
                    original {
                        url
                    }
                }
                headerImage {
                    original {
                        url
                    }
                }
                bitePagination {
                    count
                }
                playlistPagination {
                    count
                }
                socialLinks {
                    name
                    link
                }
            }
        }
    }
`;

const FOLLOW_USER = gql`
    mutation webFollowUser($record: FollowUserInput!) {
        web {
            followUser(record: $record) {
                _id
                firstName
                lastName
                email
                username
                bitePlays
                totalPlays
                birthday
                followerCount
                followingCount
                followerIds
                followingIds
                loggedInIsFollower
                profileImage {
                    original {
                        url
                    }
                }
                headerImage {
                    original {
                        url
                    }
                }
                socialLinks {
                    name
                    link
                }
            }
        }
    }
`;

const Page = props => {
    const [activeTab, setActiveTab] = useState("favorites");
    const [images, setImages] = useState([]);
    const [showProfileSettingsModal, setShowProfileSettingsModal] = useState(
        false,
    );
    const [
        showProfileImageUploadModal,
        setShowProfileImageUploadModal,
    ] = useState(false);
    const [
        showHeaderImageUploadModal,
        setShowHeaderImageUploadModal,
    ] = useState(false);
    const [showSocialModal, setShowSocialModal] = useState(false);
    const [sortType, setSortType] = useState();
    const size = useWindowSize();

    const favoritesRef = createRef();

    const { loading, error, data, refetch } = useQuery(fetchUserProfileWeb, {
        variables: {
            userId: props.url.query.username,
        },
    });

    const [followUser] = useMutation(FOLLOW_USER);

    const filterOptions = [
        { name: "New - Old", value: "CREATEDAT_DESC" },
        { name: "Old - New", value: "CREATEDAT_ASC" },
        { name: "Alphabetical", value: "ALPHABETICAL_ASC" },
    ];

    useEffect(() => {
        const imageList = [
            "https://storage.googleapis.com/blerp_products/Web/Account/My%20Boards%20selected.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/My%20Boards%20Quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/My%20Blerps%20Selected.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/My%20Blerps%20Quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/List%20view%20quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/List%20view%20selected.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/Grid%20view%20Quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/Gride%20View%20selected.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Account/Twitch%20Icon%20quite.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Twitch%20Icon%20selected.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Twitter%20Icon%20quite.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Twitter%20Icon%20selected.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Youtube%20Icon%20quite.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Youtube%20Icon%20selected.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Instagram%20Icon%20quite.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Instagram%20Icon%20selected.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Pinterest%20Icon%20quite.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Pinterest%20Icon%20selected.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Facebook%20Icon%20quite.svg",
            "https://storage.googleapis.com/blerp_products/Web/Account/Facebook%20Icon%20selected.svg",
        ];
        setImages(
            imageList.map(image => {
                const img = new Image();
                img.src = image;
                return img;
            }),
        );

        refetch();
    }, []);

    const userIsOwner = () => {
        return (
            data.web.userSignedIn &&
            data.web.userSignedIn._id === data.web.userById._id
        );
    };

    const renderMainContent = () => {
        if (activeTab === "favorites") {
            return (
                <ProfileFavorites
                    ref={favoritesRef}
                    isOwner={userIsOwner()}
                    userId={props.url.query.username}
                />
            );
        }

        if (activeTab === "boards") {
            return <ProfileBoards userId={props.url.query.username} />;
        }

        if (activeTab === "blerps") {
            return (
                <ProfileBlerps
                    isOwner={userIsOwner()}
                    userId={props.url.query.username}
                />
            );
        }
    };

    if (loading) return <LoadingFullScreen />;
    if (error) return `Error ${error.message}`;

    if (data && data.web.userById) {
        return (
            <>
                <NavBar />
                <Header>
                    <HeaderImage
                        url={
                            data.web.userById.headerImage &&
                            data.web.userById.headerImage.original.url
                        }
                    >
                        <Row
                            style={{
                                width: "97.5%",
                                margin: "0 20px 0 20px",
                                height: "80px",
                                justifyContent: "space-between",
                            }}
                        >
                            <BackButton
                                onClick={() => {
                                    try {
                                        this.props.router.back();
                                    } catch (e) {
                                        window.location.href = "/";
                                    }
                                }}
                            >
                                <p
                                    style={{
                                        margin: "0 0 0 15px",
                                        alignSelf: "center",
                                    }}
                                >
                                    Back
                                </p>
                            </BackButton>
                            {/* <ProfileStats plays={data.web.userById.totalPlays} blerps={data.web.userById.bitePagination.count} followerCount={data.web.userById.followerCount} followingCount={data.web.userById.followingCount} /> */}
                            <div style={{ display: "flex" }}>
                                {userIsOwner() ? (
                                    <GenericModal
                                        gridColumns='auto'
                                        fullscreen
                                        trigger={
                                            <EditProfileSettings
                                                url='https://storage.googleapis.com/blerp_products/Web/Account/edit%20header.svg'
                                                onClick={() =>
                                                    setShowHeaderImageUploadModal(
                                                        true,
                                                    )
                                                }
                                            />
                                        }
                                    >
                                        {({ handleCloseClick }) => (
                                            <ImageUploadModal
                                                width='900px'
                                                userSignedIn={
                                                    data.web.userSignedIn
                                                }
                                                image={
                                                    data.web.userById
                                                        .headerImage &&
                                                    data.web.userById
                                                        .headerImage.original
                                                        .url
                                                }
                                                user={data.web.userById}
                                                onClose={() =>
                                                    handleCloseClick()
                                                }
                                                title='Header Image'
                                                sizeInfo='Minimum dimensions 1920px X 200px'
                                                type='header'
                                                img={
                                                    data.web.userById
                                                        .profileImage &&
                                                    data.web.userById
                                                        .profileImage.original
                                                        .url
                                                }
                                            />
                                        )}
                                    </GenericModal>
                                ) : (
                                    <EditProfileSettings
                                        style={{ display: "none" }}
                                    />
                                )}
                                {showProfileSettingsModal ? (
                                    <ProfileSettingsModal
                                        user={data.web.userById}
                                        onClose={() =>
                                            setShowProfileSettingsModal(false)
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Row>
                        {showSocialModal ? (
                            <SocialModal
                                user={data.web.userById}
                                onClose={() => setShowSocialModal(false)}
                            />
                        ) : (
                            <></>
                        )}
                        <SocialContainer>
                            {userIsOwner() ? (
                                <SocialIcon
                                    url={
                                        "https://storage.googleapis.com/blerp_products/Web/Account/New%20social%20quite.svg"
                                    }
                                    hoverUrl={
                                        "https://storage.googleapis.com/blerp_products/Web/Account/New%20social%20quite.svg"
                                    }
                                    onClick={() => setShowSocialModal(true)}
                                />
                            ) : (
                                <></>
                            )}
                            {data.web.userById.socialLinks &&
                                data.web.userById.socialLinks.map(
                                    (socialItem, index) => {
                                        switch (socialItem.name) {
                                            case "twitch":
                                                return (
                                                    <SocialIcon
                                                        key={
                                                            socialItem.name +
                                                            index
                                                        }
                                                        target='_blank'
                                                        url={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Twitch%20Icon%20quite.svg"
                                                        }
                                                        hoverUrl={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Twitch%20Icon%20selected.svg"
                                                        }
                                                        href={socialItem.link}
                                                        rel='nofollow'
                                                    />
                                                );
                                            case "twitter":
                                                return (
                                                    <SocialIcon
                                                        key={
                                                            socialItem.name +
                                                            index
                                                        }
                                                        target='_blank'
                                                        url={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Twitter%20Icon%20quite.svg"
                                                        }
                                                        hoverUrl={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Twitter%20Icon%20selected.svg"
                                                        }
                                                        href={socialItem.link}
                                                        rel='nofollow'
                                                    />
                                                );
                                            case "youtube":
                                                return (
                                                    <SocialIcon
                                                        key={
                                                            socialItem.name +
                                                            index
                                                        }
                                                        target='_blank'
                                                        url={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Youtube%20Icon%20quite.svg"
                                                        }
                                                        hoverUrl={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Youtube%20Icon%20selected.svg"
                                                        }
                                                        href={socialItem.link}
                                                        rel='nofollow'
                                                    />
                                                );
                                            case "instagram":
                                                return (
                                                    <SocialIcon
                                                        key={
                                                            socialItem.name +
                                                            index
                                                        }
                                                        target='_blank'
                                                        url={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Instagram%20Icon%20quite.svg"
                                                        }
                                                        hoverUrl={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Instagram%20Icon%20selected.svg"
                                                        }
                                                        href={socialItem.link}
                                                        rel='nofollow'
                                                    />
                                                );
                                            case "pinterest":
                                                return (
                                                    <SocialIcon
                                                        key={
                                                            socialItem.name +
                                                            index
                                                        }
                                                        target='_blank'
                                                        url={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Pinterest%20Icon%20quite.svg"
                                                        }
                                                        hoverUrl={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Pinterest%20Icon%20selected.svg"
                                                        }
                                                        href={socialItem.link}
                                                        rel='nofollow'
                                                    />
                                                );
                                            case "facebook":
                                                return (
                                                    <SocialIcon
                                                        key={
                                                            socialItem.name +
                                                            index
                                                        }
                                                        target='_blank'
                                                        url={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Facebook%20Icon%20quite.svg"
                                                        }
                                                        hoverUrl={
                                                            "https://storage.googleapis.com/blerp_products/Web/Account/Facebook%20Icon%20selected.svg"
                                                        }
                                                        href={socialItem.link}
                                                        rel='nofollow'
                                                    />
                                                );
                                            default:
                                                break;
                                        }
                                    },
                                )}
                        </SocialContainer>
                    </HeaderImage>

                    <HeaderRow>
                        <GenericModal
                            fullscreen
                            gridColumns='auto'
                            centerTop
                            trigger={
                                <ProfileImage
                                    url={
                                        data.web.userById.profileImage &&
                                        data.web.userById.profileImage.original
                                            .url
                                    }
                                >
                                    {userIsOwner() ? (
                                        <ProfileImageScrim
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                                setShowProfileImageUploadModal(
                                                    true,
                                                )
                                            }
                                        >
                                            Edit
                                        </ProfileImageScrim>
                                    ) : (
                                        <></>
                                    )}
                                </ProfileImage>
                            }
                        >
                            {({ handleCloseClick }) => (
                                <ImageUploadModal
                                    userSignedIn={data.web.userSignedIn}
                                    image={
                                        data.web.userById.profileImage &&
                                        data.web.userById.profileImage.original
                                            .url
                                    }
                                    user={data.web.userById}
                                    onClose={() => handleCloseClick()}
                                    title='Profile Image'
                                    sizeInfo='Minimum size is 64px X 64px'
                                    type='profile'
                                    img={
                                        data.web.userById.profileImage &&
                                        data.web.userById.profileImage.original
                                            .url
                                    }
                                />
                            )}
                        </GenericModal>

                        <UserStatsContainer>
                            <ProfileStatsContainer>
                                <ProfileTabNavName active={false}>
                                    {data.web.userById.username}
                                </ProfileTabNavName>
                                {userIsOwner() ? (
                                    <EditProfileSettings
                                        url='https://storage.googleapis.com/blerp_products/Web/Account/3dot%20menu.svg'
                                        onClick={() =>
                                            setShowProfileSettingsModal(true)
                                        }
                                    />
                                ) : (
                                    <EditProfileSettings
                                        style={{ visibility: "hidden" }}
                                    />
                                )}
                                {userIsOwner() ? (
                                    <></>
                                ) : (
                                    <GreyButton
                                        style={{
                                            margin: "15px 10px 10px 10px",
                                            padding: "0 5px",
                                            fontSize: "16px",
                                            height: "26px",
                                            width: "auto",
                                        }}
                                        onClick={() => {
                                            data.web.userSignedIn &&
                                            data.web.userSignedIn._id !==
                                                data.web.userById._id
                                                ? followUser({
                                                      variables: {
                                                          record: {
                                                              userIdToFollow:
                                                                  data.web
                                                                      .userById
                                                                      ._id,
                                                          },
                                                      },
                                                  })
                                                : null;
                                        }}
                                    >
                                        {data.web.userById &&
                                        data.web.userById.loggedInIsFollower
                                            ? "Unfollow"
                                            : "Follow"}
                                    </GreyButton>
                                )}
                            </ProfileStatsContainer>
                            <ProfileStatsContainer>
                                <ProfileFollowGenericModal
                                    fullscreen
                                    backgroundBlur
                                    centerVertically
                                    trigger={
                                        <ProfileStatsText>
                                            {data.web.userById.followerCount}{" "}
                                            Followers
                                        </ProfileStatsText>
                                    }
                                >
                                    {({ handleCloseClick }) => (
                                        <ProfileFollowModal
                                            type={"Followers"}
                                            userIsOwner={userIsOwner()}
                                            followerData={{
                                                followers:
                                                    data.web.userById
                                                        .followerObjects,
                                            }}
                                            username={
                                                data.web.userById.username
                                            }
                                            followUser={followUser}
                                            loggedInUser={{
                                                loggedInIsFollower:
                                                    data.web.userById
                                                        .loggedInIsFollower,
                                                userSignedIn:
                                                    data.web.userSignedIn,
                                            }}
                                            onClose={() => {
                                                handleCloseClick();
                                            }}
                                        />
                                    )}
                                </ProfileFollowGenericModal>

                                <ProfileFollowGenericModal
                                    fullscreen
                                    backgroundBlur
                                    centerVertically
                                    trigger={
                                        <ProfileStatsText>
                                            {data.web.userById.followingCount}{" "}
                                            Following
                                        </ProfileStatsText>
                                    }
                                >
                                    {({ handleCloseClick }) => (
                                        <ProfileFollowModal
                                            type={"Following"}
                                            userIsOwner={userIsOwner()}
                                            followingData={{
                                                following:
                                                    data.web.userById
                                                        .followingObjects,
                                            }}
                                            username={
                                                data.web.userById.username
                                            }
                                            followUser={followUser}
                                            loggedInUser={{
                                                loggedInIsFollower:
                                                    data.web.userById
                                                        .loggedInIsFollower,
                                                userSignedIn:
                                                    data.web.userSignedIn,
                                            }}
                                            onClose={() => {
                                                handleCloseClick();
                                            }}
                                        />
                                    )}
                                </ProfileFollowGenericModal>
                            </ProfileStatsContainer>
                        </UserStatsContainer>

                        {/* <UserStatsContainer style={{ alignSelf: 'center', marginRight: '0' }}>
              <ProfileStatsText style={{ textAlign: 'center', margin: '5px', padding: '0px' }}>Do you live stream?</ProfileStatsText>
              <GreyButton>Try Streamer App</GreyButton>
            </UserStatsContainer> */}
                    </HeaderRow>
                    <TabRow>
                        <ProfileTabNavItem
                            active={activeTab === "favorites"}
                            onClick={() => setActiveTab("favorites")}
                            activeColor={seafoam}
                            hoverUrl={
                                "https://storage.googleapis.com/blerp_products/Web/Account/Favorites%20selected.svg?folder=true&organizationId=true"
                            }
                        >
                            {activeTab === "favorites" ? (
                                <ProfileTabNavIcon
                                    url={
                                        "https://storage.googleapis.com/blerp_products/Web/Account/Favorites%20selected.svg?folder=true&organizationId=true"
                                    }
                                />
                            ) : (
                                <ProfileTabNavIcon
                                    url={
                                        "https://storage.googleapis.com/blerp_products/Web/Account/Favorites%20Quite.svg?folder=true&organizationId=true"
                                    }
                                />
                            )}
                            <ProfileTabNavText
                                active={activeTab === "favorites"}
                                activeColor={seafoam}
                            >
                                FAVORITES
                            </ProfileTabNavText>
                        </ProfileTabNavItem>
                        <ProfileTabNavItem
                            active={activeTab === "boards"}
                            onClick={() => setActiveTab("boards")}
                            activeColor={doubleDarkBlue}
                            hoverUrl={
                                "https://storage.googleapis.com/blerp_products/Web/Account/My%20Boards%20selected.svg?folder=true&organizationId=true"
                            }
                        >
                            {activeTab === "boards" ? (
                                <ProfileTabNavIcon
                                    url={
                                        "https://storage.googleapis.com/blerp_products/Web/Account/My%20Boards%20selected.svg?folder=true&organizationId=true"
                                    }
                                />
                            ) : (
                                <ProfileTabNavIcon
                                    url={
                                        "https://storage.googleapis.com/blerp_products/Web/Account/My%20Boards%20Quite.svg?folder=true&organizationId=true"
                                    }
                                />
                            )}
                            <ProfileTabNavText
                                active={activeTab === "boards"}
                                activeColor={doubleDarkBlue}
                            >
                                BOARDS
                            </ProfileTabNavText>
                            <ProfileTabNavText
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "300",
                                    alignSelf: "flex-end",
                                    margin: "0 0 3px 10px",
                                }}
                                active={activeTab === "boards"}
                                activeColor={doubleDarkBlue}
                            >
                                ({data.web.userById.playlistPagination.count})
                            </ProfileTabNavText>
                        </ProfileTabNavItem>
                        <ProfileTabNavItem
                            active={activeTab === "blerps"}
                            onClick={() => setActiveTab("blerps")}
                            activeColor={pandaPink}
                            hoverUrl={
                                "https://storage.googleapis.com/blerp_products/Web/Account/My%20Blerps%20Selected.svg?folder=true&organizationId=true"
                            }
                        >
                            {activeTab === "blerps" ? (
                                <ProfileTabNavIcon
                                    url={
                                        "https://storage.googleapis.com/blerp_products/Web/Account/My%20Blerps%20Selected.svg?folder=true&organizationId=true"
                                    }
                                />
                            ) : (
                                <ProfileTabNavIcon
                                    url={
                                        "https://storage.googleapis.com/blerp_products/Web/Account/My%20Blerps%20Quite.svg?folder=true&organizationId=true"
                                    }
                                />
                            )}
                            <ProfileTabNavText
                                active={activeTab === "blerps"}
                                activeColor={pandaPink}
                            >
                                BLERPS
                            </ProfileTabNavText>
                            <ProfileTabNavText
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "300",
                                    alignSelf: "flex-end",
                                    margin: "0 0 3px 10px",
                                }}
                                active={activeTab === "blerps"}
                                activeColor={pandaPink}
                            >
                                ({data.web.userById.bitePagination.count})
                            </ProfileTabNavText>
                        </ProfileTabNavItem>
                    </TabRow>
                </Header>
                {renderMainContent()}
                <Footer />
            </>
        );
    } else {
        return <></>;
    }
};

export default compose(withData, withRouter)(Page);
