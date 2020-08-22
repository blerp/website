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

import { flyoutBackground, bodyText } from "../../../styles/colors";

const ProfileStatsRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const ProfileColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    justify-content: center;
    align-items: center;
    margin: 12px;
`;

const StatText = styled.div`
    background-color: ${props => {
        return props.lightText ? flyoutBackground : bodyText;
    }};
    font-size: ${props => {
        return props.bigger ? "48px" : "16px";
    }};
`;

const DescriptionText = styled.div`
    background-color: ${props => {
        return props.lightText ? flyoutBackground : bodyText;
    }};
    font-size: ${props => {
        return props.bigger ? "48px" : "12px";
    }};
`;

const UserProfile = styled.img`
    width: 15px;
    height: 15px;
    padding: 4px;
    background-position: center;
`;

function kFormatter(num) {
    const checkNum = parseInt(num, 10);
    if (!checkNum) {
        return 0;
    }
    return checkNum > 999 ? (checkNum / 1000).toFixed(1) + "k" : checkNum;
}

const StatItem = props => (
    <ProfileColumnContainer className={props.className}>
        <ProfileStatsRow>
            <StatText lightText={props.lightText} bigger={!props.imageSrc}>
                {kFormatter(props.statText) || 0}
            </StatText>
            {props.imageSrc && <UserProfile src={props.imageSrc} />}
        </ProfileStatsRow>
        <ProfileStatsRow>
            <DescriptionText lightText={props.lightText} bigger={false}>
                {props.descriptionText}
            </DescriptionText>
        </ProfileStatsRow>
    </ProfileColumnContainer>
);

export default StatItem;
