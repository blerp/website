import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import {
    BaseModal,
    ModalTitle,
    ModalCard,
    TheBlur,
    Column,
    GreyButton,
} from "../Modal/BaseModal";
import { Text, Icon, Button } from "../../theme/Theme";
import CenteredContent from "../Modal/CenteredContent";
import Link from "next/link";

const CloseButton = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Twitch/Assets/Close_Black.svg?folder=true&organizationId=true);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
`;

const ProfileFollowModalCard = styled(ModalCard)`
    min-width: 500px;
    height: 50vh;
    position: relative;
    display: flex;
    flex-direction: column;

    @media (max-width: 490px) {
        position: absolute;
        height: 100%;
        width: 100%;
    }
`;

const SearchContainer = styled.div`
    height: 65px;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Search = styled.div`
    border: 0px !important;
    border-bottom: 2px solid ${props => props.theme.secondarySubtitleText} !important;
    border-radius: 0px;
    background-color: transparent;
    width: 80%;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: auto;
    &:focus-within {
        border-bottom: 2px solid #fe295c !important;
    }

    @media (max-width: 600px) {
        width: 90%;
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
        font-size: 17px;
        width: 90%;
    }
`;

const ListContainer = styled.div`
    width: 100%;
    flex: 1;
    overflow-y: scroll;
    overflow-x: visible;
    border-radius: 0px 0px 8px 8px;
`;

const UserContainer = styled.div`
    width: 90%;
    height: 75px;
    margin: auto;
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 600px) {
        width: 95%;
    }
`;

const UserInfo = styled.div`
    display: flex;
    position: relative;
    left: 0px;
    width: 70%;

    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    cursor: pointer;

    & > p {
        width: 100%;
    }

    @media (max-width: 600px) {
        width: 60%;

        & > p {
            width: 80%;
        }
    }
`;

const EmptyList = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const ProfileFollowModal = props => {
    const [searchInput, setSearchInput] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [followList, setFollowList] = useState([]);

    const handleChange = value => {
        let list;
        if (value !== "") {
            if (props.type === "Followers") {
                list = props.followerData.followers.filter(d =>
                    d.username
                        .toLowerCase()
                        .includes(value.toLocaleLowerCase()),
                );
            } else {
                list = props.followingData.following.filter(d =>
                    d.username
                        .toLowerCase()
                        .includes(value.toLocaleLowerCase()),
                );
            }
            setFollowList(list);
        } else {
            if (props.type === "Followers") {
                list = props.followerData.followers;
            } else {
                list = props.followingData.following;
            }
            setFollowList(list);
        }
        setSearchInput(value);
    };

    const mappedUsers = () => {
        if (followList.length === 0) {
            return (
                <EmptyList>
                    {isOwner ? (
                        <>
                            <Text
                                fontWeight={200}
                                style={{
                                    paddingTop: "25px",
                                    fontColor: "170D11",
                                }}
                                fontColor='170D11'
                            >
                                {props.type === "Followers"
                                    ? "No one is following you yet!"
                                    : searchInput.length > 0
                                    ? "Nothing here!"
                                    : "You aren't following anyone!"}
                            </Text>
                            {props.type === "Followers" ? (
                                <Text
                                    style={{
                                        fontColor: "#c4c4c4",
                                        fontWeight: 200,
                                        textAlign: "center",
                                        width: "70%",
                                    }}
                                    fontSize='16px'
                                >
                                    *Tell your friends to hit that follow button
                                    and you'll see them here
                                </Text>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <Text
                            fontWeight={200}
                            style={{ paddingTop: "25px" }}
                            fontColor='170D11'
                        >
                            {props.type === "Followers"
                                ? "No followers yet!"
                                : searchInput.length > 0
                                ? "Nothing here!"
                                : `${props.username} isn't following anyone!`}
                        </Text>
                    )}
                </EmptyList>
            );
        }
        return (
            <>
                {followList.map(user => {
                    return (
                        <UserContainer key={user._id}>
                            <Link href={`/user/${user._id}`}>
                                <UserInfo>
                                    <Icon
                                        style={{
                                            padding: "0px 10px",
                                            width: "50px",
                                            height: "50px",
                                            backgroundSize: "contain",
                                        }}
                                        url={
                                            (user &&
                                                user.profileImage &&
                                                user.profileImage.original
                                                    .url) ||
                                            "https://storage.googleapis.com/blerp_products/Web/Account/seafoam%20Account%20image.svg?folder=true&organizationId=true"
                                        }
                                    />
                                    <Text
                                        fontColor='170D11'
                                        style={{
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {user.username}
                                    </Text>
                                </UserInfo>
                            </Link>
                            {user._id !==
                            props.loggedInUser.userSignedIn._id ? (
                                <Button
                                    buttonType='secondary'
                                    onClick={() => {
                                        props.followUser({
                                            variables: {
                                                record: {
                                                    userIdToFollow: user._id,
                                                },
                                            },
                                        });
                                    }}
                                >
                                    {user.loggedInIsFollower
                                        ? "Unfollow"
                                        : "Follow"}
                                </Button>
                            ) : (
                                <></>
                            )}
                        </UserContainer>
                    );
                })}
            </>
        );
    };

    useEffect(() => {
        if (props.type === "Followers" && props.followerData.followers) {
            setFollowList(props.followerData.followers);
        } else if (
            props.type === "Following" &&
            props.followingData.following
        ) {
            setFollowList(props.followingData.following);
        }
    }, [props.followerData, props.followingData]);

    useEffect(() => {
        setIsOwner(props.userIsOwner);
    }, []);

    return (
        <>
            <CenteredContent>
                <CloseButton
                    onClick={() => {
                        props.onClose();
                    }}
                />
                <ModalTitle style={{ fontSize: "28px" }}>
                    {props.type}
                </ModalTitle>
                <SearchContainer>
                    <Search>
                        <StyledInput
                            value={searchInput}
                            placeholder='Search for users'
                            onChange={e => {
                                handleChange(e.target.value);
                            }}
                        />
                    </Search>
                </SearchContainer>
            </CenteredContent>
            <ListContainer>{mappedUsers()}</ListContainer>
        </>
    );
};

export default ProfileFollowModal;
