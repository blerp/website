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
    background-color: ${props => {
        return props.color ? props.color : "#34383e";
    }};
    width: 200px;
    height: 200px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
`;

const Image = styled.img`
    background-position: center;
    width: 200px;
    height: 200px;
    border-radius: 12px;
`;

const BoxColorPicture = props => (
    <ProfileBackground color={props.color} {...props}>
        {props.imageUrl && <Image src={props.imageUrl} />}
    </ProfileBackground>
);

export default BoxColorPicture;
