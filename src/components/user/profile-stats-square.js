/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 *
 * @flow
 */

import * as React from "react";
import styled from "styled-components";
import Link from "next/link";

import SecondaryButton from "../buttons/secondary-button";
import StatItem from "../shared/StatItem";

import {
    flyoutBackground,
    lightGray,
    lighterDarkText,
} from "../../styles/colors";

const ProfileBackground = styled.div`
    display: flex;
    background-color: ${flyoutBackground};
    border-radius: 6px;
    width: 400px;
    height: 264px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProfileStatsRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    justify-content: space-around;
`;

const ProfileInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    justify-content: center;
    align-items: center;
`;

const BottomStatsPlaceholder = styled.div`
    margin-top: 20px;
    width: 80%;
    border-top: ${lightGray} 1px solid;
`;

const logoutFromPage = () => {
    window.location.href = "/logout";
};

const loginFromPage = () => {
    window.location.href = "/login";
};

const createBlerp = () => {
    window.location.href = "/upload";
};

const ProfilePictureSquare = props => (
    <ProfileBackground>
        <ProfileStatsRow>
            <ProfileInfoContainer>
                <StatItem
                    descriptionText='Boards'
                    statText={props.boardCount}
                    lightText={true}
                />
                {props.loggedIn ? (
                    <SecondaryButton onClick={logoutFromPage}>
                        {"Logout"}
                    </SecondaryButton>
                ) : (
                    <SecondaryButton onClick={loginFromPage}>
                        {"Login"}
                    </SecondaryButton>
                )}
            </ProfileInfoContainer>
            <ProfileInfoContainer>
                <StatItem
                    descriptionText='Bites'
                    statText={props.uploadCount}
                    lightText={true}
                />
                {props.loggedIn ? (
                    <SecondaryButton onClick={createBlerp}>
                        {"New Blerp"}
                    </SecondaryButton>
                ) : (
                    <SecondaryButton onClick={loginFromPage}>
                        {"New Blerp"}
                    </SecondaryButton>
                )}
            </ProfileInfoContainer>
        </ProfileStatsRow>
        <BottomStatsPlaceholder />
        <ProfileStatsRow>
            <StatItem
                statText={props.followingCount}
                lightText={true}
                descriptionText='Following'
                imageSrc={
                    "https://storage.googleapis.com/blerp-public-images/profile/following.svg"
                }
            />
            <StatItem
                statText={props.followerCount}
                lightText={true}
                descriptionText='Followers'
                imageSrc={
                    "https://storage.googleapis.com/blerp-public-images/profile/followers.svg"
                }
            />
            <StatItem
                statText={props.myPlays}
                descriptionText='My plays'
                lightText={true}
                imageSrc={
                    "https://storage.googleapis.com/blerp-public-images/profile/myplays.svg"
                }
            />
            <StatItem
                statText={props.uploadedPlays}
                descriptionText='Blerp plays'
                lightText={true}
                imageSrc={
                    "https://storage.googleapis.com/blerp-public-images/profile/blerpplays.svg"
                }
            />
        </ProfileStatsRow>
    </ProfileBackground>
);

export default ProfilePictureSquare;
