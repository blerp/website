/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import ProfilePictureSquare from "./profile-picture-square";
import ProfileTrophySquare from "./profile-trophy-square";
import ProfileStatsSquare from "./profile-stats-square";

import {
    defaultBackground,
    statusColor,
    bodyText,
    pandaPink,
} from "../../styles/colors";

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    background-color: #f8f8f8;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const SquareContainer = styled.div`
    margin: 16px;
`;

// interface Props {
//   loggedIn?: boolean;
//   username?: string;
//   boardCount?: number;
//   uploadedPlays?: number;
//   myPlays?: number;
//   favoriteCount?: number;
//   uploadCount?: number;
//   followingCount?: number;
//   followerCount?: number;
// }

class Page extends React.Component {
    props;

    render() {
        return (
            <ProfileContainer>
                <SquareContainer>
                    <ProfilePictureSquare
                        username={this.props.username}
                        firstName={this.props.firstName}
                        email={this.props.email}
                        lastName={this.props.lastName}
                        isOwnerOrAdmin={this.props.isOwnerOrAdmin}
                    />
                </SquareContainer>
                <SquareContainer>
                    <ProfileStatsSquare
                        loggedIn={this.props.loggedIn}
                        boardCount={this.props.boardCount}
                        uploadedPlays={this.props.uploadedPlays}
                        myPlays={this.props.myPlays}
                        favoriteCount={this.props.favoriteCount}
                        uploadCount={this.props.uploadCount}
                        followingCount={this.props.followingCount}
                        followerCount={this.props.followerCount}
                    />
                </SquareContainer>
                {/* <SquareContainer>
          <ProfileTrophySquare />
        </SquareContainer> */}
            </ProfileContainer>
        );
    }
}

export default Page;
