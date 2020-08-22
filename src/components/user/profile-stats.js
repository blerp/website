import React from "react";
import styled from "styled-components";

const ProfileStatsContianer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;

    @media (max-width: 600px) {
        display: grid;
        grid-template-columns: auto auto;
        width: 80%;
        margin: 0 auto;
    }
`;

const ProfileStatsItem = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
    padding: 15px;

    @media (max-width: 600px) {
    }
`;

const ProfileStatsIcon = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: contain;
    width: 28px;
    height: 28px;
    padding-right: 10px;
    align-self: center;
`;

const ProfileStatsData = styled.div`
    align-self: center;
`;

const ProfileStatsDataText = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-style: bold;
    color: ${props => props.theme.secondaryGray};
`;

const ProfileStatsText = styled.div`
    font-size: 16px;
    cursor: default;
    color: ${props => props.theme.lightGray};
    font-weight: 6;
`;

const ProfileStats = props => {
    return (
        <ProfileStatsContianer>
            <ProfileStatsItem>
                <ProfileStatsIcon
                    style={{ paddingRight: "5px" }}
                    url={
                        "https://storage.googleapis.com/blerp_products/Web/Account/plays.svg?folder=true&organizationId=true"
                    }
                />
                <ProfileStatsData>
                    <ProfileStatsDataText>{props.plays}</ProfileStatsDataText>
                    <ProfileStatsText>Plays</ProfileStatsText>
                </ProfileStatsData>
            </ProfileStatsItem>
            <ProfileStatsItem>
                <ProfileStatsIcon
                    style={{ paddingRight: "25px" }}
                    url={
                        "https://storage.googleapis.com/blerp_products/Web/Account/Blerps.svg?folder=true&organizationId=true"
                    }
                />
                <ProfileStatsData>
                    <ProfileStatsDataText>{props.blerps}</ProfileStatsDataText>
                    <ProfileStatsText>Blerps</ProfileStatsText>
                </ProfileStatsData>
            </ProfileStatsItem>
            <ProfileStatsItem>
                <ProfileStatsIcon
                    url={
                        "https://storage.googleapis.com/blerp_products/Web/Account/Followers.svg?folder=true&organizationId=true"
                    }
                />
                <ProfileStatsData>
                    <ProfileStatsDataText>
                        {props.followerCount}
                    </ProfileStatsDataText>
                    <ProfileStatsText>Followers</ProfileStatsText>
                </ProfileStatsData>
            </ProfileStatsItem>
            <ProfileStatsItem>
                <ProfileStatsIcon
                    url={
                        "https://storage.googleapis.com/blerp_products/Web/Account/Following.svg?folder=true&organizationId=true"
                    }
                />
                <ProfileStatsData>
                    <ProfileStatsDataText>
                        {props.followingCount}
                    </ProfileStatsDataText>
                    <ProfileStatsText>Following</ProfileStatsText>
                </ProfileStatsData>
            </ProfileStatsItem>
        </ProfileStatsContianer>
    );
};

export default ProfileStats;
