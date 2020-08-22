import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

import PinkButton from "../../buttons/pink-button";
import TriangleIcon from "../../icons/triangle-icon";
import CopyUrlLink from "../CopyUrlLink/modal";
import { lightGray } from "../../../styles/colors";

import projectConfig from "../../../config";
import BoardUpdateWrapper from "../../admin/board-update-wrapper";
import * as ReactDOM from "react-dom";
import NewSocialContainer from "../NewSocialContainer/NewSocialContainer";
import EditBlerp from "../BiteMenu/EditBlerp";
const currentHost = projectConfig.host;

const BorderLine = styled.div`
    border-top: 1px solid ${lightGray};
    margin: 8px;
    width: 80%;
`;

const ModalContents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const BitePageLink = styled.a`
    display: flex;
    padding: 12px 0;
    width: 100%;
    align-content: center;
    justify-content: center;
    text-decoration: none;
    color: #fff;
    background-color: #3d3d3d;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.9;
    }
`;

const ButtonContainer = styled.div`
    margin: 8px;
`;

const Icon = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    height: 17px;
    width: 24px;
`;

const GreyButton = styled.button`
    font-size: 18px;
    background-color: transparent;
    border-radius: 100px;
    height: 40px;
    color: #47463f;
    border: 2px solid #47463f;
    min-width: 106px;
    z-index: 2;
    padding: 0 24px;
    cursor: pointer;

    &:focus {
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        color: white;
        background-color: grey;
        border-color: grey;
        transition: all 0.2s ease 0s;
    }

    &:hover ${Icon} {
        background-image: url(${props => props.hoverUrl});
    }

    &:active {
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const RedButton = styled.button`
    font-size: 18px;
    background-color: transparent;
    border-radius: 100px;
    height: 40px;
    color: #47463f;
    border: 2px solid #47463f;
    min-width: 106px;
    z-index: 2;
    padding: 0 24px;
    cursor: pointer;

    &:focus {
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        color: red;
        background-color: pink;
        border-color: pink;
        transition: all 0.2s ease 0s;
    }

    &:hover ${Icon} {
        background-image: url(${props => props.hoverUrl});
    }

    &:active {
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const ButtonTextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonText = styled.div`
    text-align: center;
`;

const CenterContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const GET_SIGNED_IN_USER = gql`
    query playlist($_id: MongoID!) {
        web {
            playlistById(_id: $_id) {
                _id
                ownerId
                author
                description
                title
                userCategory
                followed
                userKeywords
                audienceRating
                visibility
            }
            userSignedIn {
                _id
                roles
            }
        }
    }
`;

const userFollowBoard = gql`
    mutation websiteUserFollowBoard($playlistId: MongoID!, $data: JSON) {
        web {
            followSoundboard(
                record: { playlistId: $playlistId }
                analytics: { data: $data }
            ) {
                followed
            }
        }
    }
`;

const userUnfollowBoard = gql`
    mutation websiteUserFollowBoard($playlistId: MongoID!, $data: JSON) {
        web {
            followSoundboard(
                record: { playlistId: $playlistId }
                analytics: { data: $data }
            ) {
                followed
            }
        }
    }
`;

const BoardOptionsModal = props => {
    const [showBoardEdit, setShowBoardEdit] = useState(false);
    const [saved, setSaved] = useState(false);
    const [images, setImages] = useState([]);
    const modal = useRef(null);

    const { loading, error, data, refetch } = useQuery(GET_SIGNED_IN_USER, {
        variables: { _id: props.playlist._id },
    });
    const [followBoard] = useMutation(userFollowBoard);
    const [unFollowBoard] = useMutation(userUnfollowBoard);

    useEffect(() => {
        const pictures = [
            "https://storage.googleapis.com/blerp_products/Web/Menus/delete%20red.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/delete%20black.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/report%20red.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/report%20black.svg",
        ];

        setImages(
            pictures.map(picture => {
                const img = new Image();
                img.src = picture;
                return img;
            }),
        );
    }, []);

    // useEffect(() => {
    //   document.addEventListener("mousedown", closeModalOutsideClick);
    // }, [])

    // const [followBoard] = useMutation(
    //   userFollowBoard,
    //   {
    //     update(cache, { data: { followBoard } }) {
    //       const { web } = cache.readQuery({ query: GET_SIGNED_IN_USER, variables: { _id: props.playlist._id }});
    //       const { playlistById } = web
    //       cache.writeQuery({
    //         query: GET_SIGNED_IN_USER,
    //         data: { playlistById: playlistById.concat([followBoard]) },
    //       });
    //     }
    //   }
    // );

    const reportClicked = event => {
        if (window) {
            window.location.href = `/contact`;
        }
    };

    const loginClicked = event => {
        if (window) {
            window.location.href = `/login`;
        }
    };

    const handleSave = () => {
        setShowBoardEdit(false);
        setSaved(true);
        setInterval(() => {
            setSaved(false);
        }, 2000);
    };

    const handleFollowClicked = following => {
        if (following === false) {
            // console.log('following...')
            followBoard({
                variables: { playlistId: data.web.playlistById._id },
            });
            // refetch();
        } else {
            // console.log('un-following...')
            unFollowBoard({
                variables: { playlistId: data.web.playlistById._id },
            });
            // refetch();
        }
    };

    const isOwnerOrAdmin = (userData, boardData) => {
        return (
            userData.roles.indexOf("ADMIN") > -1 ||
            boardData.ownerId === userData._id
        );
    };

    const isStrictlyAdmin = userData => {
        return userData.roles && userData.roles.indexOf("ADMIN") > -1;
    };

    const renderSignedIn = (userData, boardData) => {
        if (isOwnerOrAdmin(userData, boardData) === true) {
            return renderOwner();
        } else {
            return renderNotOwner();
        }
    };

    const renderAdmin = () => (
        <>
            <ButtonContainer>
                <GreyButton>
                    <ButtonTextContainer>
                        <Icon />
                        <ButtonText>Edit Board</ButtonText>
                    </ButtonTextContainer>
                </GreyButton>
            </ButtonContainer>
        </>
    );

    const renderOwner = () => {
        return (
            <>
                {/* TODO: Add Collaborative Function */}
                {/* <ButtonContainer>
        <GreyButton>
          <ButtonTextContainer>
            <Icon/>
            <ButtonText>Make Collaborative</ButtonText>
          </ButtonTextContainer>
        </GreyButton>
      </ButtonContainer> */}
                <ButtonContainer>
                    <CopyUrlLink
                        key={data.web.playlistById._id}
                        id={data.web.playlistById._id}
                        url={`${currentHost}/soundboard/${data.web.playlistById._id}`}
                        title={"Copy Link"}
                        analyticTitle={"COPY_SOUNDBOARD_WEB_URL"}
                        analyticUsing={"SOUNDBOARD_PAGE"}
                    />
                </ButtonContainer>
                <ButtonContainer>
                    <RedButton
                        hoverUrl={
                            "https://storage.googleapis.com/blerp_products/Web/Menus/delete%20red.svg"
                        }
                    >
                        <ButtonTextContainer>
                            <Icon url='https://storage.googleapis.com/blerp_products/Web/Menus/delete%20black.svg' />
                            <ButtonText style={{ whiteSpace: "nowrap" }}>
                                Delete Board
                            </ButtonText>
                        </ButtonTextContainer>
                    </RedButton>
                </ButtonContainer>
            </>
        );
    };

    const renderNotOwner = () => (
        <>
            {/* <ButtonContainer>
        <GreyButton
          onClick={() => handleFollowClicked(data.web.playlistById.followed)}
        >
          <ButtonTextContainer>
            <ButtonText>{data.web.playlistById.followed ? 'Un-follow Board' : 'Follow Board'}</ButtonText>
          </ButtonTextContainer>
        </GreyButton>
      </ButtonContainer> */}
            <ButtonContainer>
                <CopyUrlLink
                    key={data.web.playlistById._id}
                    id={data.web.playlistById._id}
                    url={`${currentHost}/soundboard/${data.web.playlistById._id}`}
                    title={"Copy Link"}
                    analyticTitle={"COPY_SOUNDBOARD_WEB_URL"}
                    analyticUsing={"SOUNDBOARD_PAGE"}
                />
            </ButtonContainer>
            <ButtonContainer>
                <RedButton
                    onClick={e => reportClicked(e)}
                    hoverUrl={
                        "https://storage.googleapis.com/blerp_products/Web/Menus/report%20red.svg"
                    }
                >
                    <ButtonTextContainer>
                        <Icon url='https://storage.googleapis.com/blerp_products/Web/Menus/report%20black.svg' />
                        <ButtonText>Report</ButtonText>
                    </ButtonTextContainer>
                </RedButton>
            </ButtonContainer>
        </>
    );

    const renderSignedOut = () => {
        return (
            <ButtonContainer>
                <GreyButton onClick={e => loginClicked(e)}>
                    <ButtonTextContainer>
                        <ButtonText>Login</ButtonText>
                    </ButtonTextContainer>
                </GreyButton>
            </ButtonContainer>
        );
    };

    const renderEditBoard = () => {
        return (
            <>
                <CenterContent>
                    <EditBlerp
                        type='board'
                        board={data.web.playlistById}
                        close={() => setShowBoardEdit(false)}
                    />
                </CenterContent>
            </>
        );
    };

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <>
            {showBoardEdit ? (
                <ModalContents>{renderEditBoard()}</ModalContents>
            ) : (
                <CenterContent>
                    {data.web.userSignedIn
                        ? renderSignedIn(
                              data.web.userSignedIn,
                              data.web.playlistById,
                          )
                        : renderSignedOut(data.web.userSignedIn)}
                    <BorderLine />
                    <NewSocialContainer
                        userSignedInId={
                            data.web.userSignedIn && data.web.userSignedIn._id
                        }
                        playlistId={data.web.playlistById._id}
                        mainTitle={"Share"}
                        id={data.web.playlistById._id}
                        itemTitle={data.web.playlistById.title}
                        onFocus={true}
                        analyticTitle={"SHARE_BOARD"}
                        analyticUsingTitle={"WEB_SHARE_BUTTON_SOCIAL_ITEM_MENU"}
                        type={"soundboard"}
                    />
                </CenterContent>
            )}
        </>
    );
};

export default BoardOptionsModal;
