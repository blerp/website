/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import gql from "graphql-tag";
import * as React from "react";
import { Query, Mutation } from "@apollo/client/react/components";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import List from "@researchgate/react-intersection-list";
import Bite from "../components/bite";
import countryList from "react-select-country-list";

import SecondaryButton from "../components/buttons/SecondaryButton";
import PinkButton from "../components/buttons/pink-button";
import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import TabBar from "../components/navigation/tabbar";
import ImageUpdateScreen from "../components/mod/ImageUpdateScreen";
import DeleteBiteScreen from "../components/mod/DeleteBiteScreen";
import ResetCuration from "../components/mod/ResetCuration";
import UserOwnerLink from "../components/shared/UserOwnerLink";

import BiteUpdateWrapper from "../components/mod/bite-update-wrapper";

import withData from "../lib/withData";

import projectConfig from "../config";
import { GreyButton } from "../components/shared/Modal/BaseModal";
import BiteUpdateCard from "../components/mod/BiteUpdateCard";
import RatingModal from "../components/shared/Modal/RatingModal";
import ModReporting from "../components/shared/ModPage/ModReporting";
import { GenericModal, Text, Icon, Button } from "../components/theme/Theme";
const currentHost = projectConfig.host;

const PAGE_SIZE = 120;
const PAGE_SIZE_POPULAR = 1200;

const FlexStartItem = styled.div`
    align-self: flex-end;
`;

const ContentContainerGrid = styled.div`
    display: grid;
    grid: minmax(auto, max-content) / repeat(auto-fill, 320px);
    grid-gap: 16px;
    justify-content: center;
    padding: 0 60px;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const BiteEditRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    position: relative;
`;

const CuratedCircle = styled.div`
    position: absolute;
    top: 4px;
    right: 4px;
    border-radius: 16px;
    width: 12px;
    height: 12px;
    background-color: ${props =>
        props.isCurated ? props.theme.seafoam : props.theme.darkGray};
`;

const BiteEditColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.flyoutBackground};
    border-radius: 6px;
    padding: 12px;
    margin: 12px 0;
`;

const FooterContainer = styled.div`
    margin-top: 160px;
`;

const BlerpsContainer = styled.div`
    margin: 0 auto;
    max-width: 1200px;
    align-self: center;
`;

const TestModeratorRow = styled.div`
    display: flex;
    width: 100%;
`;

const ContentVerticalList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const FontSize = styled.div`
    font-size: 20px;
    padding: 16px;
`;

const LinkLink = styled.a`
    font-size: 20px;
    color: ${props => props.theme.focusOutline};
`;

const BigFontSize = styled.div`
    font-size: 32px;
    padding: 16px;
`;

const ButtonContainerPadding = styled.div`
    padding: 4px;
`;

const MODERATION_LIST_QUERY = gql`
    query websiteModerationPage(
        $pageCount: Int!
        $perPage: Int!
        $isCurated: Boolean
        $sort: SortFindManyBiteInput
    ) {
        web {
            userSignedIn {
                _id
                roles
                username
            }

            biteMany(
                limit: $perPage
                skip: $pageCount
                sort: $sort
                filter: { isCurated: $isCurated }
            ) {
                _id
                title
                keywords
                color
                image {
                    original {
                        url
                    }
                }
                giphy {
                    gif
                }
                ownerObject {
                    _id
                    username
                    profileImage {
                        original {
                            url
                        }
                    }
                }
                description
                isCurated
                transcription
                favorited
                userAudioQuality
                userLocale
                playCount
                createdAt
                updatedAt
                userKeywords
                userEmotion
                userCategory
                author
                visibility
                audienceRating
                audio {
                    original {
                        url
                    }
                    mp3 {
                        url
                    }
                }
                lastCurator {
                    _id
                    username
                    profileImage {
                        original {
                            url
                        }
                    }
                }
            }
        }
    }
`;

const MODERATION_LIST_QUERY_POPULAR = gql`
    query websiteModerationPage(
        $pageCount: Int!
        $perPage: Int!
        $isCurated: Boolean
    ) {
        web {
            userSignedIn {
                _id
                roles
                username
            }

            biteModPopular(
                limit: $perPage
                skip: $pageCount
                filter: { isCurated: $isCurated }
            ) {
                _id
                title
                keywords
                color
                image {
                    original {
                        url
                    }
                }
                giphy {
                    gif
                }
                ownerObject {
                    _id
                    username
                    profileImage {
                        original {
                            url
                        }
                    }
                }
                description
                isCurated
                transcription
                favorited
                userAudioQuality
                userLocale
                playCount
                userKeywords
                createdAt
                updatedAt
                userEmotion
                userCategory
                author
                visibility
                audienceRating
                audio {
                    original {
                        url
                    }
                    mp3 {
                        url
                    }
                }
                lastCurator {
                    _id
                    username
                    profileImage {
                        original {
                            url
                        }
                    }
                }
            }
        }
    }
`;

const MODERATION_LIST_QUERY_SCRAPED = gql`
    query websiteBotsModerationPage($pageCount: Int!, $perPage: Int!) {
        web {
            userSignedIn {
                _id
                roles
                __typename
            }
            biteMany(
                limit: $perPage
                skip: $pageCount
                sort: CREATEDAT_DESC
                filter: {
                    OR: [
                        { ownerId: "5d01b863a6c8c800055ad047" }
                        { ownerId: "5d1f6c80cb2b0d00053649fb" }
                        { ownerId: "5d1f6c80cb2b0d00053649fb" }
                        { ownerId: "5cfacbb2f0d338000671b11d" }
                    ]
                }
            ) {
                _id
                title
                keywords
                color
                image {
                    original {
                        url
                        __typename
                    }
                    __typename
                }
                giphy {
                    gif
                    __typename
                }
                ownerObject {
                    _id
                    username
                    profileImage {
                        original {
                            url
                        }
                    }
                }
                description
                isCurated
                userEmotion
                userAudioQuality
                userLocale
                transcription
                favorited
                playCount
                userKeywords
                createdAt
                updatedAt
                author
                visibility
                userCategory
                audienceRating
                audio {
                    original {
                        url
                        __typename
                    }
                    mp3 {
                        url
                        __typename
                    }
                    __typename
                }
                __typename
            }
            __typename
        }
    }
`;

const itemsRenderer = (items, ref) => (
    <ContentVerticalList ref={ref} role='region' aria-labelledby='recent'>
        {items}
    </ContentVerticalList>
);

const PlatformOptions = [
    { text: "WEB", value: "WEB" },
    { text: "TWITCH", value: "TWITCH" },
    { text: "MOBILE", value: "MOBILE" },
    { text: "IMESSAGE", value: "IMESSAGE" },
    { text: "MESSENGER", value: "MESSENGER" },
    { text: "BLOG", value: "BLOG" },
    { text: "GOOGLE_ASSISTANT", value: "GOOGLE_ASSISTANT" },
    { text: "DISCORD", value: "DISCORD" },
];

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
    position: sticky;
    top: 80px;
    z-index: 4000;
    background-color: ${props => props.theme.colors.white};
`;

const UnderlineButton = styled.div`
    font-size: 24px;
    color: ${props =>
        props.isActive ? props.theme.darkBlue : props.theme.defaultText};
    transition: 0.2s;
    border-bottom: 4px solid
        ${props =>
            props.isActive
                ? props.theme.darkBlue
                : props.theme.defaultBackground};

    &:hover {
        border-bottom: 4px solid ${props => props.theme.darkBlue};
    }
`;

class Page extends React.Component {
    static getInitialProps = ctx => ({ id: ctx.query.id });
    props;
    state = {
        showGuidelinesModal: false,
        playlistIds: [],
        countryOptions: countryList().getData(),
        deleteState: { showing: false, biteId: null },
        platform: "WEB",
        listMade: false,
        pageCount: 1,
        listState: "DEFAULT", // DEFAULT, IMAGE, SCRAPED
    };

    changeShowGuidelinesModal = value => {
        this.setState({ showGuidelinesModal: value });
    };

    changeCountryHandler = value => {
        this.setState({ countryValue: value });
    };

    changeListState = state => () => {
        this.setState({ listState: state });
    };

    changeDeleteState = biteId => () => {
        this.setState({ deleteState: { showing: true, biteId } });
    };

    cancelDeleteState = () => {
        this.setState({ deleteState: { showing: false, biteId: null } });
    };

    handleListLoadMore = (dataProp, currentPage) => (size, pageSize) => {
        // I was using awaitMore={props.data.networkStatus === 3} before but for some reason it stops randomnly
        if (dataProp.networkStatus === 3) {
            return;
        }
        console.log(currentPage, this.state.pageCount);

        this.setState({ pageCount: currentPage + 1 }, () => {
            // The fetchMore method is used to load new data and add it
            // to the original query we used to populate the list
            dataProp.fetchMore({
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    // // Don't do anything if there weren't any new items
                    // if (
                    //   previousResult.web &&
                    //   previousResult.web.biteMany &&
                    //   !previousResult.web.biteMany.pageInfo.hasNextPage
                    // ) {
                    //   // TODO: set finished loading all blerps logo
                    //   return previousResult;
                    // }
                    // if (
                    //   !fetchMoreResult ||
                    //   (fetchMoreResult.web.biteMany &&
                    //   fetchMoreResult.web.biteMany.bites.length === 0)
                    // ) {
                    //   return previousResult;
                    // }

                    return {
                        // Concatenate the new search results after the old ones
                        web: {
                            userSignedIn: {
                                ...previousResult.web.userSignedIn,
                            },
                            biteMany: previousResult.web.biteMany.concat(
                                fetchMoreResult.web.biteMany,
                            ),
                        },
                    };
                },
                variables: {
                    pageCount: currentPage + 1,
                },
            });
        });
    };

    showEditMode = () => {
        this.setState({ showingEdit: true });
    };

    hideEditMode = () => {
        this.setState({ showingEdit: false });
    };

    isModOrAdmin(userData) {
        return (
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("ADMIN") > -1) ||
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("MODERATOR") > -1)
        );
    }

    handleImageUploadFinished = () => {
        // Figure out how to update the local state to reflect that?
    };

    handleSelectBoards = (mutationCall, refetch) => async ({ boardIds }) => {
        await mutationCall({
            variables: {
                platform: this.state.platform,
                playlistIds: boardIds,
            },
        });

        this.setState({ listMade: true }, () => {
            refetch();
        });
    };

    handleClearList = (mutationCall, refetch) => async () => {
        await mutationCall({
            variables: {
                platform: this.state.platform,
                playlistIds: [],
            },
        });
        refetch();
    };

    onDeleteBoardClick = (mutationCall, refetch, currentBoardIds) => async ({
        boardId,
    }) => {
        const newBoardIds = currentBoardIds.filter(currentBoardId => {
            return boardId !== currentBoardId;
        });

        await mutationCall({
            variables: {
                platform: this.state.platform,
                playlistIds: newBoardIds,
            },
        });
        refetch();
    };

    setPlatform = async event => {
        this.setState({ platform: event.target.value });
    };

    renderBiteColumn(bite, refetch, isModerator, showingCurated, userSignedIn) {
        if (!showingCurated && bite.isCurated) {
            return (
                <BiteEditColumn key={bite._id}>
                    <FontSize>{`Blerp Completed! - ${bite.title}`}</FontSize>
                    {/* <LinkLink href={`${currentHost}/soundbite/${bite._id}`}>{`${currentHost}/soundbite/${bite._id}`}</LinkLink> */}
                    <ResetCuration biteId={bite._id} />
                </BiteEditColumn>
            );
        }

        return (
            <BiteUpdateCard
                userSignedIn={userSignedIn}
                bite={bite}
                prefetchLink={this.props.prefetchLink}
                type={this.state.listState}
            />
            // <BiteEditColumn key={bite._id}>
            //   <BiteEditRow>
            //     <CuratedCircle isCurated={bite.isCurated}>Not Yet Curated</CuratedCircle>
            //     <Bite
            //       key={bite._id}
            //       id={bite._id}
            //       title={bite.title}
            //       audioSourceUrls={[
            //         bite.audio && bite.audio.mp3.url,
            //         bite.audio && bite.audio.original.url
            //       ]}
            //       color={bite.color}
            //       image={
            //         (bite.image && bite.image.original.url) ||
            //         (bite.giphy && bite.giphy.gif)
            //       }
            //       favorited={bite.favorited}
            //       playCount={bite.playCount}
            //       prefetchLink={this.props.prefetchLink}
            //       preload={true}
            //       isCurated={bite.isCurated}
            //     />
            //     <GreyButton>Update Image</GreyButton>
            //     <BiteEditTags>
            //       <BiteEditLabel>Tags</BiteEditLabel>
            //     </BiteEditTags>
            //   </BiteEditRow>
            //   {showingCurated && <ResetCuration biteId={bite._id} />}
            //   <BiteUpdateWrapper
            //     key={bite._id}
            //     biteId={bite._id}
            //     biteTitle={bite.title}
            //     visibility={bite.visibility}
            //     audienceRating={bite.audienceRating}
            //     tags={bite.userKeywords}
            //     author={bite.author}
            //     userCategory={bite.userCategory}
            //     description={bite.description}
            //     audioTextTranscription={bite.transcription}
            //     isModerator={isModerator}
            //     refetch={refetch}
            //     isCurated={bite.isCurated}
            //     userEmotion={bite.userEmotion}
            //     userAudioQuality={bite.userAudioQuality}
            //     userLocale={bite.userLocale}
            //     countryOptions={this.state.countryOptions}
            //   />
            //   <BiteEditRow>
            //      <UserOwnerLink key={29} user={bite.ownerObject} />
            //   </BiteEditRow>
            //   {/* make sure to fix DeleteBiteScreen component before adding this to update local cache before adding thihs back */}
            //   {/* {this.state.deleteState.biteId === bite._id ? <DeleteBiteScreen biteId={bite._id} handleCancelClick={this.cancelDeleteState} handleDeleteFinished={this.cancelDeleteState}/> : <SecondaryButton onClick={this.changeDeleteState(bite._id)}>
            //       Delete Blerp
            //     </SecondaryButton>} */}
            // </BiteEditColumn>
        );
    }

    renderMostRecentCreated() {
        return (
            <Container>
                <BiteEditRow>
                    <FontSize>
                        Most Recently Created Blerp List - Not Curated
                    </FontSize>
                </BiteEditRow>
                <Query
                    query={MODERATION_LIST_QUERY}
                    ssr={false}
                    variables={{
                        pageCount: 0,
                        perPage: PAGE_SIZE,
                        isCurated: false,
                        sort: "CREATEDAT_DESC",
                    }}
                >
                    {userQuery => {
                        if (
                            !userQuery.data ||
                            userQuery.networkStatus === 1 ||
                            userQuery.networkStatus === 2
                        ) {
                            return <FontSize>{"loading"}</FontSize>;
                        }

                        if (this.isModOrAdmin(userQuery.data)) {
                            return (
                                <BlerpsContainer>
                                    <List
                                        itemCount={
                                            userQuery.data.web.biteMany.length
                                        }
                                        itemsRenderer={itemsRenderer}
                                        onIntersection={this.handleListLoadMore(
                                            userQuery,
                                            this.state.pageCount,
                                        )}
                                        threshold={"80%"}
                                    >
                                        {(index, key) => {
                                            const bite =
                                                userQuery.data.web.biteMany[
                                                    index
                                                ];
                                            if (bite) {
                                                return this.renderBiteColumn(
                                                    bite,
                                                    userQuery.refetch,
                                                    this.isModOrAdmin(
                                                        userQuery.data,
                                                    ),
                                                    false,
                                                    userQuery.data.web
                                                        .userSignedIn,
                                                );
                                            }
                                        }}
                                    </List>
                                </BlerpsContainer>
                            );
                        } else {
                            return <div>{"Totally Not Authorized!!"}</div>;
                        }
                    }}
                </Query>
            </Container>
        );
    }

    renderMostRecentCreatedCurated() {
        return (
            <Container>
                <BiteEditRow>
                    <FontSize>Finished Blerps</FontSize>
                </BiteEditRow>
                <Query
                    query={MODERATION_LIST_QUERY}
                    ssr={false}
                    variables={{
                        pageCount: 0,
                        perPage: PAGE_SIZE,
                        isCurated: true,
                        sort: "UPDATED_AT_DESC",
                    }}
                >
                    {userQuery => {
                        if (
                            !userQuery.data ||
                            userQuery.networkStatus === 1 ||
                            userQuery.networkStatus === 2
                        ) {
                            return <FontSize>{"loading"}</FontSize>;
                        }

                        if (this.isModOrAdmin(userQuery.data)) {
                            return (
                                <BlerpsContainer>
                                    <List
                                        itemCount={
                                            userQuery.data.web.biteMany.length
                                        }
                                        itemsRenderer={itemsRenderer}
                                        onIntersection={this.handleListLoadMore(
                                            userQuery,
                                            this.state.pageCount,
                                        )}
                                        threshold={"80%"}
                                    >
                                        {(index, key) => {
                                            const bite =
                                                userQuery.data.web.biteMany[
                                                    index
                                                ];
                                            if (bite) {
                                                return this.renderBiteColumn(
                                                    bite,
                                                    userQuery.refetch,
                                                    this.isModOrAdmin(
                                                        userQuery.data,
                                                    ),
                                                    true,
                                                    userQuery.data.web
                                                        .userSignedIn,
                                                );
                                            }
                                        }}
                                    </List>
                                </BlerpsContainer>
                            );
                        } else {
                            return <div>{"Totally Not Authorized!!"}</div>;
                        }
                    }}
                </Query>
            </Container>
        );
    }

    renderPopular() {
        return (
            <Container>
                <BiteEditRow>
                    <FontSize>Popular List - Not Curated</FontSize>
                </BiteEditRow>
                <Query
                    query={MODERATION_LIST_QUERY_POPULAR}
                    ssr={false}
                    variables={{
                        pageCount: 1,
                        perPage: PAGE_SIZE_POPULAR,
                        isCurated: false,
                    }}
                >
                    {userQuery => {
                        if (
                            !userQuery.data ||
                            userQuery.networkStatus === 1 ||
                            userQuery.networkStatus === 2
                        ) {
                            return <FontSize>{"loading"}</FontSize>;
                        }

                        if (this.isModOrAdmin(userQuery.data)) {
                            return (
                                <BlerpsContainer>
                                    <List
                                        itemCount={
                                            userQuery.data.web.biteModPopular
                                                .length
                                        }
                                        itemsRenderer={itemsRenderer}
                                        onIntersection={this.handleListLoadMore(
                                            userQuery,
                                            this.state.pageCount,
                                        )}
                                        threshold={"80%"}
                                    >
                                        {(index, key) => {
                                            const bite =
                                                userQuery.data.web
                                                    .biteModPopular[index];
                                            if (bite) {
                                                return this.renderBiteColumn(
                                                    bite,
                                                    userQuery.refetch,
                                                    this.isModOrAdmin(
                                                        userQuery.data,
                                                    ),
                                                    false,
                                                    userQuery.data.web
                                                        .userSignedIn,
                                                );
                                            }
                                        }}
                                    </List>
                                </BlerpsContainer>
                            );
                        } else {
                            return <div>{"Totally Not Authorized!!"}</div>;
                        }
                    }}
                </Query>
            </Container>
        );
    }

    renderMostRecentCreatedScraped() {
        return (
            <Container>
                <BiteEditRow>
                    <FontSize>Scraped Only Content Showing</FontSize>
                </BiteEditRow>
                <Query
                    query={MODERATION_LIST_QUERY_SCRAPED}
                    ssr={false}
                    variables={{
                        pageCount: 1,
                        perPage: PAGE_SIZE,
                    }}
                >
                    {userQuery => {
                        if (
                            !userQuery.data ||
                            userQuery.networkStatus === 1 ||
                            userQuery.networkStatus === 2
                        ) {
                            return <FontSize>{"loading"}</FontSize>;
                        }

                        if (this.isModOrAdmin(userQuery.data)) {
                            return (
                                <BlerpsContainer>
                                    <List
                                        itemCount={
                                            userQuery.data.web.biteMany.length
                                        }
                                        itemsRenderer={itemsRenderer}
                                        onIntersection={this.handleListLoadMore(
                                            userQuery,
                                            this.state.pageCount,
                                        )}
                                        threshold={"80%"}
                                    >
                                        {(index, key) => {
                                            const bite =
                                                userQuery.data.web.biteMany[
                                                    index
                                                ];
                                            if (bite) {
                                                return this.renderBiteColumn(
                                                    bite,
                                                    userQuery.refetch,
                                                    this.isModOrAdmin(
                                                        userQuery.data,
                                                    ),
                                                    false,
                                                    userQuery.data.web
                                                        .userSignedIn,
                                                );
                                            }
                                        }}
                                    </List>
                                </BlerpsContainer>
                            );
                        } else {
                            return <div>{"Totally Not Authorized!!"}</div>;
                        }
                    }}
                </Query>
            </Container>
        );
    }

    renderReporting() {
        return <ModReporting listState={this.state.listState} />;
    }

    render() {
        return (
            <Container>
                <Helmet>
                    <title>{"Moderation List of Blerps"}</title>
                </Helmet>
                <NavBar />
                <BiteEditRow>
                    <BigFontSize>Moderation Blerp Page</BigFontSize>
                </BiteEditRow>

                <ButtonContainer>
                    <ButtonContainerPadding>
                        <GenericModal
                            gridColumns={"100px"}
                            trigger={
                                <Button
                                    buttonType='custom'
                                    style={{ backgroundColor: "white" }}
                                    rounding='square'
                                >
                                    {this.state.listState === "FLAGGED" ||
                                    this.state.listState === "REVIEWED" ||
                                    this.state.listState === "APPEALS"
                                        ? "Reporting"
                                        : "Moderation"}
                                    <Icon
                                        size='small'
                                        style={{ marginLeft: "10px" }}
                                        noHover
                                        url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Discord/Down%20arrow.svg'
                                    />
                                </Button>
                            }
                        >
                            {({ handleCloseClick }) => (
                                <>
                                    <Text
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            this.setState({
                                                listState: "FLAGGED",
                                            });
                                            handleCloseClick();
                                        }}
                                    >
                                        Reporting
                                    </Text>
                                    <Text
                                        fontColorHover='ibisRed'
                                        fontSize='16px'
                                        fontColor='notBlack'
                                        fontWeight='light'
                                        onClick={() => {
                                            this.setState({
                                                listState: "DEFAULT",
                                            });
                                            handleCloseClick();
                                        }}
                                    >
                                        Moderation
                                    </Text>
                                </>
                            )}
                        </GenericModal>
                    </ButtonContainerPadding>
                    {this.state.listState === "FLAGGED" ||
                    this.state.listState === "REVIEWED" ||
                    this.state.listState === "APPEALS" ? (
                        <>
                            <ButtonContainerPadding>
                                <UnderlineButton
                                    isActive={
                                        this.state.listState === "FLAGGED"
                                    }
                                    onClick={this.changeListState("FLAGGED")}
                                >
                                    Flagged
                                </UnderlineButton>
                            </ButtonContainerPadding>
                            <ButtonContainerPadding>
                                <UnderlineButton
                                    isActive={
                                        this.state.listState === "REVIEWED"
                                    }
                                    onClick={this.changeListState("REVIEWED")}
                                >
                                    Reviewed
                                </UnderlineButton>
                            </ButtonContainerPadding>

                            <ButtonContainerPadding>
                                <UnderlineButton
                                    isActive={
                                        this.state.listState === "APPEALS"
                                    }
                                    onClick={this.changeListState("APPEALS")}
                                >
                                    Appeals
                                </UnderlineButton>
                            </ButtonContainerPadding>
                        </>
                    ) : (
                        <>
                            <ButtonContainerPadding>
                                <UnderlineButton
                                    isActive={
                                        this.state.listState === "DEFAULT"
                                    }
                                    onClick={this.changeListState("DEFAULT")}
                                >
                                    UGC
                                </UnderlineButton>
                            </ButtonContainerPadding>

                            {/* <ButtonContainerPadding>
                                    <UnderlineButton
                                        isActive={
                                            this.state.listState === "SCRAPED"
                                        }
                                        onClick={this.changeListState(
                                            "SCRAPED",
                                        )}
                                    >
                                        Scraped Only Content
                                    </UnderlineButton>
                                </ButtonContainerPadding> */}

                            <ButtonContainerPadding>
                                <UnderlineButton
                                    isActive={
                                        this.state.listState === "POPULAR"
                                    }
                                    onClick={this.changeListState("POPULAR")}
                                >
                                    Popular
                                </UnderlineButton>
                            </ButtonContainerPadding>

                            <ButtonContainerPadding>
                                <UnderlineButton
                                    isActive={
                                        this.state.listState === "CURATED"
                                    }
                                    onClick={this.changeListState("CURATED")}
                                >
                                    Finished
                                </UnderlineButton>
                            </ButtonContainerPadding>
                        </>
                    )}
                    <ButtonContainerPadding>
                        <GenericModal
                            trigger={
                                <UnderlineButton>
                                    Rating Guidelines
                                </UnderlineButton>
                            }
                        >
                            {({ handleCloseClick }) => (
                                <RatingModal
                                    onClose={() => handleCloseClick()}
                                />
                            )}
                        </GenericModal>
                    </ButtonContainerPadding>
                </ButtonContainer>
                {this.state.listState === "DEFAULT" &&
                    this.renderMostRecentCreated()}
                {this.state.listState === "POPULAR" && this.renderPopular()}
                {this.state.listState === "SCRAPED" &&
                    this.renderMostRecentCreatedScraped()}
                {this.state.listState === "CURATED" &&
                    this.renderMostRecentCreatedCurated()}
                {(this.state.listState === "FLAGGED" ||
                    this.state.listState === "REVIEWED" ||
                    this.state.listState === "APPEALS") &&
                    this.renderReporting()}
                <TabBar />
                <FooterContainer>
                    <Footer />
                </FooterContainer>
            </Container>
        );
    }
}

export default withData(Page);
