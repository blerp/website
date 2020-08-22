/*
 * BLERP Inc. ("BLERP") CONFIDENTIAL
 * Copyright (c) 2019 Blerp Inc. All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 *
 * @flow
 */

import * as React from "react";
import styled from "styled-components";
import projectConfig from "../../../config";
const currentHost = projectConfig.host;

import { flyoutBackground, bodyText } from "../../../styles/colors";

const ProfileStatsRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 260px;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CreatedBy = styled.div`
    color: ${bodyText};
    font-size: 12px;
    font-weight: light;
`;

const UsernameText = styled.div`
    color: ${bodyText};
    font-size: 20px;
    font-weight: bold;
`;

const UserProfile = styled.img`
    width: 40px;
    height: 40px;
    padding: 16px;
    background-position: center;
`;

const handleClick = props => () => {
    window.location.href = `${currentHost}/user/${props.user._id}`;
};

const UserOwnerLink = props => (
    <ProfileStatsRow className={props.className} onClick={handleClick(props)}>
        <UserProfile
            src={
                props.user && props.user.profile
                    ? props.user.profile
                    : "https://storage.googleapis.com/blerp-public-images/social/large-profile-black.svg"
            }
            alt={`${props.user.username} Profile Image`}
        />
        <Column>
            <CreatedBy>Created By</CreatedBy>
            <UsernameText>{props.user.username}</UsernameText>
        </Column>
    </ProfileStatsRow>
);

export default UserOwnerLink;
