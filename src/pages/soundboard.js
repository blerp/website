/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import List from "@researchgate/react-intersection-list";
import gql from "graphql-tag";
import * as React from "react";
import { useQuery } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

import { flowRight as compose } from "lodash";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Bite from "../components/bite";
import LoadingFullScreen from "../components/loading/loading-full-screen";
import Link from "next/link";
import PinkButton from "../components/buttons/pink-button";
import SecondaryButton from "../components/buttons/secondary-button";
import NewSocialContainer from "../components/shared/NewSocialContainer";
import OpenBoardMenu from "../components/shared/OpenBoardMenu";
import CopyUrlLink from "../components/shared/CopyUrlLink/modal";
import TwitchPromotionBite from "../components/navigation/TwitchPromotionBite";

import BoardUpdateWrapper from "../components/admin/board-update-wrapper";

import NavBar from "../components/navigation/navbar";
import Footer from "../components/navigation/footer";
import TabBar from "../components/navigation/tabbar";
import Tag from "../components/shared/Tag";
import FollowHeartButton from "../components/shared/FollowHeartButton";
import PlaylistBoardSquare from "../components/board/playlist-board-square-no-dark";
import { initializeApollo } from "../lib/nextApollo";

import HorizontalList from "../components/lists/HorizontalList";

import CustomMessage from "../components/messages/custom-message";
import withData from "../lib/withData";

import { Body } from "../components/layouts/body-components";
import { bodyText, flyoutBackground, secondaryText } from "../styles/colors";
import ContentContainerGrid from "../components/shared/ContentContainerGrid";
import UrlChanger from "../components/shared/UrlChanger";
import UserOwnerLink from "../components/shared/UserOwnerLink";
import router, { default as Router, withRouter } from "next/router";

import projectConfig from "../config";
import BoardBlerpsCard from "../components/shared/ProfileTabViews/BoardBlerpsCard";
import BoardUpdateBox from "../components/admin/BoardUpdateBox";
import { useState, useEffect, useRef } from "react";
import { Row } from "../components/shared/ProfileTabViews/ProfileStyledComponents";
import {
    Button,
    Icon,
    GenericModal,
    Text,
    Column,
    Grid,
} from "../components/theme/Theme";

import DiscoverContainer from "../components/shared/ProfileTabViews/DiscoverContainer";
import ReportScreen from "../components/shared/BiteMenu/ReportScreen";
import DeleteBoardScreen from "../components/shared/OpenBoardMenu/DeleteBoardScreen";
const currentHost = projectConfig.host;

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const FooterContainer = styled.div`
    margin-top: 160px;
`;

const MainBoardPanel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${flyoutBackground};
    padding: 40px 12px;
    margin-bottom: 40px;
    flex-direction: column;
    width: 600px;
    border-radius: 12px;
    margin: 32px;
    position: relative;

    @media (max-width: 600px) {
        width: 320px;
    }
`;

const MainBoardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px;
`;

const AllTheBitesContainer = styled.div`
    padding: 0;
`;

const LinksContainer = styled.div`
    text-align: center;
    padding: 20px 0;
    background-color: ${flyoutBackground};
    width: 500px;
    margin-bottom: 8px;
    border-radius: 6px;

    @media (max-width: 600px) {
        width: 292px;
    }
`;

const TinyTitle = styled.span`
    color: ${bodyText};
    text-align: center;
    font-weight: bold;
    font-size: 16px;
`;

const MetaInfo = styled.p`
    color: ${secondaryText};
    text-align: center;
    font-weight: lighter;
    font-size: 16px;
`;

const CopyLinkContainer = styled.div`
    margin: 16px;
`;

const TagsContainer = styled.div`
    flex-flow: row wrap;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 500px;
    background-color: ${flyoutBackground};

    @media (max-width: 600px) {
        width: 292px;
    }
`;

const StyledTag = styled(Tag)``;

const PlaylistBoxContainer = styled.div`
    margin: 16px;
`;

const UnstyledLink = styled.a`
    text-decoration: none;
    color: inherit;
    border-radius: 10;
`;

const BackArrow = styled.img`
    width: 21px;
    height: 21px;
    background-position: center;
`;

const BackButton = styled.div`
    align-self: center;
    background-image: url("https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Left.svg");
    background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: left 10px;
    width: auto;
    height: 20px;
    font-size: 18px;
    cursor: pointer;
    padding: 6px 15px;
    transition: 0.2s;
    color: #47463f;
`;

const BackText = styled.div`
    text-decoration: none;
    color: ${bodyText};
    font-size: 14px;
    padding: 4px;
`;

const StyledHeartButton = styled(FollowHeartButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 40px;
    height: 40px;
    border: none;
    align-self: center;
    margin: 12px auto;
    background-color: transparent;
    background-position: center;
    z-index: 1001;
    text-decoration: none;

    &:focus {
        opacity: 0.6;
        border: none;
    }
`;

const ButtonLink = styled.a`
    display: flex;
    flex-direction: row;
    text-decoration: none;
    background: transparent;
    margin: 0 32px;
    padding: 0;
    position: absolute;
    top: 240px;
    left: 32px;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.9;
    }

    @media (max-width: 600px) {
        top: 380px;
        left: 8px;
        margin: 0;
    }
`;

const BoardUpdateContainerMobile = styled.div`
    display: none;
    width: 100%;
    padding-bottom: 20px;

    @media (max-width: 900px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

// interface WithInitialProps {
//   getInitialProps?: (ctx: any) => object | Promise<object>;
// }

const itemsRenderer = (items, ref) => (
    <div ref={ref}>
        <ContentContainerGrid>{items}</ContentContainerGrid>
    </div>
);

const DefaultSocialMediaBoardItems = [
    {
        name: "Tumblr",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Tumbler.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/TumblerSelected.svg",
        createShareUrl: id => {
            return `http://tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
                `${currentHost}/soundboard/${id}`,
            )}`;
        },
    },
    {
        name: "Pinterest",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Pinterest.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/PinterestSelected.svg",
        createShareUrl: id => {
            return `http://www.pinterest.com/pin/create/link/?url=${encodeURIComponent(
                `${currentHost}/soundboard/${id}`,
            )}`;
        },
    },
    {
        name: "Facebook",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Facebook.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/FacebookSelected.svg",
        createShareUrl: id => {
            return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `${currentHost}/soundboard/${id}`,
            )}`;
        },
    },
    {
        name: "Reddit",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Reddit.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/RedditSelected.svg",
        createShareUrl: id => {
            return `http://www.reddit.com/submit?url=${encodeURIComponent(
                `${currentHost}/soundboard/${id}`,
            )}`;
        },
    },
    {
        name: "Twitter",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Twitter.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/TwitteSelected.svg",
        createShareUrl: id => {
            return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                `${currentHost}/soundboard/${id}`,
            )}&via=blerpapp`;
        },
    },
];

const fetchPlaylistQuery = gql`
    query websiteGetPlaylist($id: MongoID!) {
        web {
            userSignedIn {
                _id
                roles
            }
            playlistById(_id: $id) {
                _id
                title
                ownerId
                audienceRating
                description
                visibility
                userKeywords
                favorites
                playCount
                categoryObjects {
                    _id
                    title
                }
                ownerObject {
                    _id
                    username
                    picture
                }
                image {
                    original {
                        url
                    }
                }
                collabIds
                giphy {
                    gif
                }
                followed
                biteObjects {
                    _id
                    title
                    keywords
                    userKeywords
                    color
                    image {
                        original {
                            url
                        }
                    }
                    favorited
                    playCount
                    audienceRating
                    giphy {
                        gif
                    }
                    audio {
                        original {
                            url
                        }
                        mp3 {
                            url
                        }
                    }
                }
            }
        }
    }
`;

const USER_SIGNED_IN = gql`
    query websiteUserBitePage {
        web {
            userSignedIn {
                _id
                roles
            }
        }
    }
`;

const FlexEnd = styled.div`
    align-self: flex-end;
`;

const Page = props => {
    const [showingEdit, setShowingEdit] = useState(false);
    const [showReporting, setShowReporting] = useState(false);

    const BoardUpdateContainerMobileRef = useRef(null);

    const { loading, error, data, refetch } = useQuery(fetchPlaylistQuery, {
        variables: {
            id: props.id,
        },
        ssr: true,
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (showingEdit) {
            BoardUpdateContainerMobileRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [showingEdit]);

    const renderGenericMessage = () => {
        return (
            <CustomMessage
                night={true}
                title='No sounds added to this board yet.'
                description='If you own this board you can add some sounds by hovering over a blerp!'
                imageUrl='https://storage.googleapis.com/blerp-public-images/branding/BlerpyLeftCircleIbisRed.svg'
                href={"/"}
            />
        );
    };

    const renderNoBlerpsOnBoard = () => {
        return (
            <Body>
                <MainBoardContainer>
                    <Link
                        prefetch={true}
                        href={{
                            pathname: "/",
                        }}
                        as={`/`}
                    >
                        <ButtonLink href={`/`}>
                            <BackArrow
                                src='https://storage.googleapis.com/blerp-public-images/navigation/back-arrow.svg'
                                alt='Back Arrow'
                            />
                            <BackText>{"Home"}</BackText>
                        </ButtonLink>
                    </Link>
                    <MainBoardPanel>
                        <Query query={USER_SIGNED_IN} ssr={false}>
                            {userQuery => {
                                if (
                                    props.data &&
                                    props.data.web &&
                                    props.data.web.playlistById &&
                                    !props.data.web.playlistById.favorites &&
                                    isOwnerOrAdmin(userQuery.data, props.data)
                                ) {
                                    return (
                                        <OpenBoardMenu
                                            playlistId={
                                                props.data &&
                                                props.data.web.playlistById &&
                                                props.data.web.playlistById._id
                                            }
                                            refetch={
                                                props.data && props.data.refetch
                                            }
                                        />
                                    );
                                }
                                return <div />;
                            }}
                        </Query>
                        <PlaylistBoardSquare
                            id={data.web.playlistById._id}
                            title={data.web.playlistById.title}
                            color={data.web.playlistById.color}
                            imageUrl={
                                (data.web.playlistById.image &&
                                    data.web.playlistById.image.original.url) ||
                                (data.web.playlistById.giphy &&
                                    data.web.playlistById.giphy.gif)
                            }
                            dontBeLink={true}
                        />
                    </MainBoardPanel>
                </MainBoardContainer>
                {renderGenericMessage()}
            </Body>
        );
    };

    const renderTags = keywords => (index, key) => {
        const tag = keywords[index];
        if (tag) {
            return (
                <Link
                    key={tag}
                    prefetch={true}
                    href={{
                        pathname: "/search",
                        query: { q: tag.split(" ").join("-") },
                    }}
                    as={`/search?q=${encodeURI(tag.split(" ").join("-"))}`}
                >
                    <UnstyledLink
                        key={tag}
                        href={`/search?q=${encodeURI(
                            tag.split(" ").join("-"),
                        )}`}
                    >
                        <StyledTag colored={true}>{`#${tag}`}</StyledTag>
                    </UnstyledLink>
                </Link>
            );
        } else {
            return <div />;
        }
    };

    const onRemoveBite = () => {
        refetch();
    };

    const showEditMode = () => {
        setState({ showingEdit: true });
    };

    const hideEditMode = () => {
        setState({ showingEdit: false });
    };

    const isOwnerOrAdmin = (userData, boardData) => {
        if (!userData) return false;
        return (
            userData.roles.indexOf("ADMIN") > -1 ||
            userData.roles.indexOf("MODERATOR") > -1 ||
            boardData.ownerId === userData._id
        );
    };

    const isOwnerOrCollaborator = (userData, boardData) => {
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
                userData.web.userSignedIn.roles.indexOf("MODERATOR") > -1) ||
            (boardData &&
                boardData.web &&
                boardData.web.playlistById &&
                boardData.web.playlistById.collabIds &&
                boardData.web.playlistById.collabIds.length &&
                userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn._id &&
                boardData.web.playlistById.collabIds.indexOf(
                    userData.web.userSignedIn._id,
                ) > -1) ||
            (boardData &&
                boardData.web &&
                boardData.web.playlistById &&
                boardData.web.playlistById.ownerId) ===
                (userData &&
                    userData.web &&
                    userData.web.userSignedIn &&
                    userData.web.userSignedIn._id)
        );
    };

    const isStrictlyAdmin = userData => {
        return (
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("MODERATOR") > -1) ||
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("ADMIN") > -1)
        );
    };

    if (error) return <Body>{renderGenericMessage()}</Body>;
    if (loading && !data) return <LoadingFullScreen />;

    return (
        <Container>
            {data.web && data.web.playlistById && (
                <Helmet>
                    <title>
                        {data.web.playlistById.title &&
                            data.web.playlistById.title.substring(0, 65)}
                    </title>
                    <meta
                        property='og:description'
                        content={`"${data.web.playlistById.title}" is a soundboard of audio clips, sound buttons, and soundbites found on blerp! Discover your favorite sound bites and create the best soundboards using Blerp. Try blerp sound boards on iMessage, iOS, Android, Google Assistant, Twitch, and Discord.`}
                    />
                    <meta
                        name='description'
                        content={`"${data.web.playlistById.title}" is a soundboard of audio clips, sound button, and soundbites found on blerp! Discover your favorite sound bites and create the best soundboards using Blerp. Try blerp sound boards on iMessage, iOS, Android, Google Assistant, Twitch, and Discord.`}
                    />
                    <meta
                        name='keywords'
                        content='meme soundboards, soundboards, meme sounds, categorized audio clips, soundbites, sounds, bites, blerp, blerp sounds, audio quotes, best soundboard, Favorite Movies, sounds, funny quotes, tv show moments, great games, funny sound, quotes, movie soundboard, blurp, song lyrics, music snippets'
                    />
                    <meta
                        property='og:image'
                        content='https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg'
                    />
                    <meta property='og:image:width' content='300' />
                    <meta property='og:image:height' content='300' />
                    <meta
                        name='twitter:image'
                        content='https://storage.googleapis.com/blerp-public-images/branding/newest-logo.svg'
                    />
                    <meta name='twitter:image:width' content='262' />
                    <meta name='twitter:image:height' content='262' />
                </Helmet>
            )}
            <NavBar />
            {/* Breaks back button for know idk why <UrlChanger
                key={props.id}
                id={props.id}
                title={props.data.web.playlistById.title}
                newUrlBasePathName={"soundboard"}
                oldBaseName={'soundboard'}
            /> */}
            {data.web.playlistById &&
            data.web.playlistById.biteObjects.length === 0
                ? renderNoBlerpsOnBoard()
                : data.web &&
                  data.web.playlistById && (
                      <>
                          <Row
                              style={{
                                  width: "85%",
                                  margin: "20px auto 20px auto",
                                  height: "30px",
                              }}
                          >
                              <BackButton
                                  onClick={() => {
                                      try {
                                          router.back();
                                      } catch (e) {
                                          window.location.href = "/";
                                      }
                                  }}
                              >
                                  Back
                              </BackButton>
                              <GenericModal
                                  style={{
                                      overflow: "hidden",
                                      padding: "0",
                                      width: "auto",
                                      minWidth: "300px",
                                  }}
                                  backgroundBlur
                                  trigger={
                                      <Icon
                                          size='big'
                                          hoverColor='lightGrey'
                                          url='https://storage.googleapis.com/blerp_products/Web/Account/3dot%20menu.svg'
                                      />
                                  }
                                  right
                              >
                                  {({ handleCloseClick }) => (
                                      <>
                                          {showReporting ? (
                                              <ReportScreen
                                                  style={{ width: "400px" }}
                                                  type={"soundboard"}
                                                  playlist={props.id}
                                                  onClose={() =>
                                                      setShowReporting(false)
                                                  }
                                              />
                                          ) : (
                                              <Grid
                                                  style={{
                                                      backgroundColor:
                                                          "transparent",
                                                      margin: "10px",
                                                      marginBottom: "0px",
                                                  }}
                                              >
                                                  <Column centerText>
                                                      {/* <Text fontSize='14px' fontWeight='light'>{} Saves</Text> */}
                                                      {/* <Text fontSize='14px' fontWeight='light'>{} Shares</Text> */}
                                                      <Text
                                                          fontWeight='light'
                                                          fontColor='dark170D11'
                                                          fontSize='18px'
                                                      >
                                                          Size:{" "}
                                                          {
                                                              data.web
                                                                  .playlistById
                                                                  .biteObjects
                                                                  .length
                                                          }
                                                      </Text>
                                                      <Text
                                                          fontWeight='light'
                                                          fontColor='dark170D11'
                                                          fontSize='18px'
                                                      >
                                                          Category:{" "}
                                                          {data.web.playlistById
                                                              .categoryObjects[0] &&
                                                              data.web
                                                                  .playlistById
                                                                  .categoryObjects[0]
                                                                  .title}
                                                      </Text>
                                                      <Text
                                                          fontWeight='light'
                                                          fontColor='dark170D11'
                                                          fontSize='18px'
                                                      >
                                                          Rating:{" "}
                                                          {
                                                              data.web
                                                                  .playlistById
                                                                  .audienceRating
                                                          }
                                                      </Text>
                                                  </Column>
                                                  <Column
                                                      centerText
                                                      style={{
                                                          display: "flex",
                                                          flexDirection:
                                                              "column",
                                                      }}
                                                  >
                                                      {isOwnerOrAdmin(
                                                          data.web.userSignedIn,
                                                          data.web.playlistById,
                                                      ) ? (
                                                          <>
                                                              <Button
                                                                  buttonType='secondary'
                                                                  onClick={() => {
                                                                      setShowingEdit(
                                                                          true,
                                                                      );
                                                                      handleCloseClick();
                                                                  }}
                                                              >
                                                                  Edit
                                                              </Button>
                                                              <GenericModal
                                                                  fullscreen
                                                                  style={{
                                                                      padding:
                                                                          "0",
                                                                      margin:
                                                                          "0",
                                                                      top: "0",
                                                                      width:
                                                                          "100%",
                                                                  }}
                                                                  trigger={
                                                                      <Button
                                                                          fontSize='small'
                                                                          buttonType='custom'
                                                                          color='invisible'
                                                                          textColor='dark170D11'
                                                                      >
                                                                          Delete
                                                                      </Button>
                                                                  }
                                                              >
                                                                  {({
                                                                      handleCloseClick,
                                                                  }) => (
                                                                      <DeleteBoardScreen
                                                                          playlistId={
                                                                              data &&
                                                                              data
                                                                                  .web
                                                                                  .playlistById
                                                                                  ._id
                                                                          }
                                                                          handleCancelClick={() =>
                                                                              handleCloseClick()
                                                                          }
                                                                          handleDeleteFinished={() =>
                                                                              handleCloseClick()
                                                                          }
                                                                      />
                                                                  )}
                                                              </GenericModal>
                                                          </>
                                                      ) : (
                                                          <></>
                                                      )}
                                                      <Button
                                                          fontSize='small'
                                                          buttonType='custom'
                                                          color='invisible'
                                                          textColor='dark170D11'
                                                          onClick={() =>
                                                              setShowReporting(
                                                                  true,
                                                              )
                                                          }
                                                      >
                                                          <Icon
                                                              style={{
                                                                  borderRadius:
                                                                      "0",
                                                                  backgroundSize:
                                                                      "8px",
                                                                  marginRight:
                                                                      "10px",
                                                              }}
                                                              noHover
                                                              size='tiny'
                                                              url='https://storage.googleapis.com/blerp_products/Web/Menus/report%20black.svg'
                                                          />
                                                          Report Board
                                                      </Button>
                                                  </Column>
                                                  <Column width={2}>
                                                      <Row
                                                          style={{
                                                              width: "120%",
                                                              marginLeft:
                                                                  "-38px",
                                                              justifyContent:
                                                                  "center",
                                                              backgroundColor:
                                                                  "white",
                                                          }}
                                                      >
                                                          <Text
                                                              fontSize='18px'
                                                              fontWeight='light'
                                                              fontColor='grey2'
                                                          >
                                                              Plays: N/A
                                                          </Text>
                                                      </Row>
                                                  </Column>
                                              </Grid>
                                          )}
                                      </>
                                  )}
                              </GenericModal>
                          </Row>
                          {showingEdit ? (
                              <BoardUpdateContainerMobile
                                  ref={BoardUpdateContainerMobileRef}
                              >
                                  <BoardUpdateBox
                                      user={data.web.userSignedIn}
                                      onClose={() => {
                                          if (setShowingEdit) {
                                              setShowingEdit(false);
                                          }

                                          setShowingEdit(false);
                                      }}
                                      board={data.web.playlistById}
                                      mobile
                                  />
                              </BoardUpdateContainerMobile>
                          ) : null}
                          <BoardBlerpsCard
                              dontShowPreview={true}
                              pathName={props.url && props.url.pathname}
                              cardStyle={{
                                  position: "relative",
                                  top: "0",
                                  left: "0",
                              }}
                              hideClose
                              showEdit={showingEdit}
                              setRootEditing={setShowingEdit}
                              posY={0}
                              board={data.web.playlistById}
                              user={data.web.playlistById.ownerObject}
                              signedInUserId={
                                  data.web.userSignedIn &&
                                  data.web.userSignedIn._id
                              }
                              blerps={data.web.playlistById.biteObjects}
                              categories={data.web.categoryMany}
                              onClose={() => null}
                              onDeleteFromPlaylist={() => onRemoveBite()}
                          />
                      </>
                  )}
            <TwitchPromotionBite />
            {/* <DiscoverContainer searchTerm={`${data.web.playlistById.title}`} hideSearch /> */}
            <FooterContainer>
                <Footer />
            </FooterContainer>
        </Container>
    );
};

export async function getServerSideProps(context) {
    const apolloClient = initializeApollo();
    const id = context.query && context.query.id;

    await apolloClient.query({
        query: fetchPlaylistQuery,
        variables: { id: id },
        fetchPolicy: "network-only",
    });

    return {
        props: {
            id: id,
            initialApolloState: apolloClient.cache.extract(),
        },
    };
}

export default compose(withRouter)(Page);
