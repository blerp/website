/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
import List from "@researchgate/react-intersection-list";

import Bite from "../../bite";

import * as React from "react";
import styled from "styled-components";

import { darkText } from "../../../styles/colors";
import ContentContainerGrid from "../ContentContainerGrid";
import {
    CreateBlerpContainer,
    CreateBlerpIcon,
    CreateBlerpText,
    Row,
} from "../ProfileTabViews/ProfileStyledComponents";
import CreateNewBlerpButton from "../ProfileTabViews/CreateNewBlerpButton";
import { Icon } from "../../theme/Icon";
import { GenericModal, Text, Button, InputArea } from "../../theme/Theme";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { Divider } from "../../theme/Divider";

const AllTheBitesHeader = styled.h1`
    color: ${darkText};
    font-weight: bold;
    font-size: 28px;
    padding: 20px 4px;
    text-decoration: none;
    align-self: center;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 20px;
    }
`;

const AllTheBitesContainer = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    align-self: center;
`;

const DisabledContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5000;
    background-color: ${props => props.theme.colors.grey2};
    border-radius: 8px;
`;

const DisabledOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 85%;
    z-index: 5000;
    background-color: ${props => props.theme.colors.grey5};
    border-radius: 8px;
`;

const itemsRenderer = (items, ref) => (
    <ContentContainerGrid ref={ref} role='region' aria-labelledby='recent'>
        {items}
    </ContentContainerGrid>
);

// interface Props {
//   title?: string;
//   bites: any;
//   listLoadMore?: any;
//   prefetchLink?: any;
// }

const APPEAL_BLERP = gql`
    mutation webAppealBlerp($record: appealReportedContentInputType!) {
        web {
            reportAppealReportedContent(record: $record) {
                reportedContent {
                    _id
                }
            }
        }
    }
`;

const AllTheBitesGrid = props => {
    const [appealInput, setAppealInput] = useState("");
    const [appealBlerp] = useMutation(APPEAL_BLERP);
    return (
        <AllTheBitesContainer>
            {props.title && (
                <AllTheBitesHeader>{props.title}</AllTheBitesHeader>
            )}
            <List
                itemCount={props.bites.length}
                itemsRenderer={itemsRenderer}
                onIntersection={props.listLoadMore}
                threshold={"40%"}
            >
                {(index, key) => {
                    const bite = props.bites[index];
                    return (
                        <>
                            {(bite.reportObject &&
                                bite.reportObject.reportedContentStatus ===
                                    "REVIEWED_BLACKLISTED") ||
                            (bite.reportObject &&
                                bite.reportObject.reportedContentStatus ===
                                    "APPEALING") ? (
                                <DisabledContainer>
                                    <GenericModal
                                        style={{
                                            position: "absolute",
                                            top: "-105px",
                                            right: "-150px",
                                            width: "200px",
                                        }}
                                        right
                                        trigger={
                                            <Icon
                                                style={{
                                                    backgroundColor: "grey",
                                                    position: "absolute",
                                                    top: "-105px",
                                                    right: "-150px",
                                                    zIndex: "1200",
                                                    border: "4px solid #E6E6E6",
                                                }}
                                                url='https://storage.googleapis.com/blerp_products/Web/Reporting/white%20lock.svg'
                                            />
                                        }
                                    >
                                        {({ handleCloseClick }) => (
                                            <>
                                                <Text
                                                    fontWeight='light'
                                                    fontSize='16px'
                                                    fontColor='notBlack'
                                                >
                                                    This Blerp has been
                                                    blacklisted for:{" "}
                                                    {
                                                        bite.reportObject
                                                            .reasonType
                                                    }
                                                    <br />
                                                    <br />
                                                    This is only visible to you.
                                                </Text>
                                                <Row
                                                    style={{
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <GenericModal
                                                        fullscreen
                                                        centerVertically
                                                        blur
                                                        trigger={
                                                            <Button
                                                                disabled={
                                                                    bite
                                                                        .reportObject
                                                                        .reportedContentStatus ===
                                                                    "APPEALING"
                                                                }
                                                                buttonType='secondary'
                                                            >
                                                                {bite
                                                                    .reportObject
                                                                    .reportedContentStatus ===
                                                                "APPEALING"
                                                                    ? "Submitted for appeal"
                                                                    : "Appeal"}
                                                            </Button>
                                                        }
                                                    >
                                                        {({
                                                            handleCloseClick,
                                                        }) => (
                                                            <>
                                                                <Row
                                                                    style={{
                                                                        justifyContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <Text
                                                                        fontSize='32px'
                                                                        fontColor='notBlack'
                                                                    >
                                                                        Appeal
                                                                        Blacklisting
                                                                    </Text>
                                                                </Row>
                                                                <Row>
                                                                    <Text
                                                                        fontSize='16px'
                                                                        fontColor='notBlack'
                                                                        fontWeight='light'
                                                                    >
                                                                        As you
                                                                        may know
                                                                        our
                                                                        Community
                                                                        guidelines
                                                                        and
                                                                        Content
                                                                        Policy
                                                                        describe
                                                                        which
                                                                        content
                                                                        we allow
                                                                        - and
                                                                        don’t
                                                                        allow -
                                                                        on
                                                                        Blerp.
                                                                        Your
                                                                        Blerp
                                                                        Just do
                                                                        it was
                                                                        flagged
                                                                        for
                                                                        review.
                                                                        Upon
                                                                        review,
                                                                        we’ve
                                                                        determined
                                                                        that it
                                                                        violates
                                                                        our
                                                                        guidelines.
                                                                        We’ve
                                                                        removed
                                                                        it from
                                                                        Blerp
                                                                        and
                                                                        assigned
                                                                        a
                                                                        Community
                                                                        guidelines
                                                                        strike,
                                                                        or
                                                                        temporary
                                                                        penalty,
                                                                        to your
                                                                        account.
                                                                    </Text>
                                                                </Row>
                                                                <Row>
                                                                    <Text
                                                                        fontSize='16px'
                                                                        fontWeight='light'
                                                                    >
                                                                        Have you
                                                                        violated
                                                                        Blerps
                                                                        Terms of
                                                                        Service
                                                                        or
                                                                        Acceptable
                                                                        Use
                                                                        Policy.
                                                                        I so
                                                                        how?
                                                                        Please
                                                                        include
                                                                        any
                                                                        relevant
                                                                        information
                                                                        that you
                                                                        believe
                                                                        could
                                                                        have
                                                                        caused
                                                                        the
                                                                        Blacklisting.
                                                                    </Text>
                                                                </Row>
                                                                <Row>
                                                                    <Text
                                                                        fontSize='16px'
                                                                        fontColor='notBlack'
                                                                    >
                                                                        Description
                                                                    </Text>
                                                                </Row>
                                                                <Row>
                                                                    <InputArea
                                                                        style={{
                                                                            border:
                                                                                "2px solid grey",
                                                                            width:
                                                                                "100%",
                                                                        }}
                                                                        value={
                                                                            appealInput
                                                                        }
                                                                        onChange={e =>
                                                                            setAppealInput(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                    />
                                                                </Row>
                                                                <Row
                                                                    style={{
                                                                        margin:
                                                                            "20px",
                                                                        justifyContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <Button
                                                                        onClick={() => {
                                                                            appealBlerp(
                                                                                {
                                                                                    variables: {
                                                                                        record: {
                                                                                            appealDescription: appealInput,
                                                                                            reportedContentId:
                                                                                                bite
                                                                                                    .reportObject
                                                                                                    ._id,
                                                                                        },
                                                                                    },
                                                                                },
                                                                            );
                                                                            handleCloseClick();
                                                                        }}
                                                                    >
                                                                        Send
                                                                    </Button>
                                                                </Row>
                                                            </>
                                                        )}
                                                    </GenericModal>
                                                </Row>
                                                <Divider />

                                                <Button>Delete</Button>
                                            </>
                                        )}
                                    </GenericModal>
                                    <Bite
                                        key={key}
                                        id={bite._id}
                                        title={bite.title}
                                        audioSourceUrls={[
                                            bite.audio && bite.audio.mp3.url,
                                            bite.audio &&
                                                bite.audio.original.url,
                                        ]}
                                        color={bite.color}
                                        image={
                                            (bite.image &&
                                                bite.image.original.url) ||
                                            (bite.giphy && bite.giphy.gif)
                                        }
                                        favorited={bite.favorited}
                                        playCount={bite.playCount}
                                        prefetchLink={props.prefetchLink}
                                        preload={true}
                                        blacklisted={
                                            bite.reportObject &&
                                            bite.reportObject
                                                .reportedContentStatus ===
                                                "REVIEWED_BLACKLISTED"
                                        }
                                        bite={bite}
                                    />
                                </DisabledContainer>
                            ) : (
                                <Bite
                                    key={key}
                                    id={bite._id}
                                    title={bite.title}
                                    audioSourceUrls={[
                                        bite.audio && bite.audio.mp3.url,
                                        bite.audio && bite.audio.original.url,
                                    ]}
                                    color={bite.color}
                                    image={
                                        (bite.image &&
                                            bite.image.original.url) ||
                                        (bite.giphy && bite.giphy.gif)
                                    }
                                    favorited={bite.favorited}
                                    playCount={bite.playCount}
                                    prefetchLink={props.prefetchLink}
                                    preload={true}
                                    bite={bite}
                                />
                            )}
                        </>
                    );
                }}
            </List>
        </AllTheBitesContainer>
    );
};

export default AllTheBitesGrid;
