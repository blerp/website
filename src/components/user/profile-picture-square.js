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
import { flyoutBackground, lighterDarkText } from "../../styles/colors";
import UserUpdateModal from "./UserUpdateModal";

const ProfileBackground = styled.div`
    position: relative;
    display: flex;
    background-color: ${flyoutBackground};
    border-radius: 6px;
    width: 264px;
    height: 264px;
    align-items: center;
    justify-content: center;
`;

const ProfileInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    justify-content: center;
    align-items: center;
`;

const ProfileName = styled.div`
    color: ${lighterDarkText};
    font-weight: bold;
    font-size: 24px;
    padding: 12px;
    margin: auto;
    font-weight: lighter;
`;

const UserProfile = styled.img`
    width: 137px;
    height: 137px;
    padding: 12px;
    background-position: center;
`;
const ProfilePictureSquare = props => (
    <ProfileBackground>
        {!!props.isOwnerOrAdmin ? (
            <UserUpdateModal
                username={props.username}
                firstName={props.firstName}
                email={props.email}
                lastName={props.lastName}
            />
        ) : null}
        <ProfileInfoContainer>
            <UserProfile src='https://storage.googleapis.com/blerp-public-images/social/large-profile-black.svg' />
            <ProfileName>{props.username || "Profile Name"}</ProfileName>
        </ProfileInfoContainer>
    </ProfileBackground>
);

export default ProfilePictureSquare;
