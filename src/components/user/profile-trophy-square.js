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

const ProfileBackground = styled.div`
    display: flex;
    background-color: transparent;
    border-radius: 6px;
    width: 264px;
    height: 264px;
    align-items: center;
    justify-content: center;
`;

const TrophyImage = styled.img`
    width: 264px;
    height: 264px;
    background-position: center;
`;

const ProfilePictureSquare = props => (
    <ProfileBackground>
        <TrophyImage src='https://storage.googleapis.com/blerp-public-images/backgrounds/trophyblur.png' />
    </ProfileBackground>
);

export default ProfilePictureSquare;
