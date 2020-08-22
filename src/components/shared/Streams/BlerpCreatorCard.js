import React, { useState } from "react";
import { Row } from "../ProfileTabViews/ProfileStyledComponents";
import styled from "styled-components";
import Link from "next/link";
import { Text, Button } from "../../theme/Theme";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

const Image = styled.div`
    width: 200px;
    height: 130px;
    background-image: url(${props => props.url});
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
`;

const Card = styled.div`
    width: 250px;
    height: auto;
    background-color: ${props => props.theme.colors.white};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-shadow: 0px 0px 15px #0000001a;
    position: relative;
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

const BlerpCreatorCard = props => {
    const [followUser] = useMutation(FOLLOW_USER);
    const { username, profileImage, userId } = props;
    return (
        <>
            <Card style={props.style}>
                <Row style={{ width: "100%", justifyContent: "center" }}>
                    <Image
                        style={{
                            flex: 1,
                            backgroundSize: "cover",
                            borderRadius: "8px 0 0 0",
                        }}
                        url={profileImage}
                    />
                </Row>
                <Row
                    style={{
                        width: "90%",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        fontColor='notBlack'
                        fontSize='28px'
                        style={{
                            lineHeight: "30px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {username}
                    </Text>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                    <Button
                        onClick={() => {
                            followUser({
                                variables: {
                                    record: {
                                        userIdToFollow: props.userId,
                                    },
                                },
                            });
                        }}
                        buttonType='secondary'
                    >
                        {props.following ? "Un-Follow" : "Follow"}
                    </Button>
                </Row>
                <Row style={{ width: "90%", justifyContent: "center" }}>
                    <Link href={`/user/${userId}`}>
                        <Text
                            style={{ cursor: "pointer" }}
                            fontColor='notBlack'
                            fontSize='14px'
                        >
                            Profile
                        </Text>
                    </Link>
                </Row>
            </Card>
        </>
    );
};

export default BlerpCreatorCard;
