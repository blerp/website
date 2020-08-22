/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import { default as Router, withRouter } from "next/router";
import * as React from "react";
import * as ReactDOM from "react-dom";

import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";
import { graphql } from "@apollo/client/react/hoc";

import TriangleIcon from "../../icons/triangle-icon";

import styled from "styled-components";

import { randomBlerpColor } from "../../../lib/helperFunctions";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    defaultBackground,
    disabledText,
    iconsActive,
    bodyText,
    lightGray,
} from "../../../styles/colors";

import NewSocialContainer from "../NewSocialContainer/NewSocialContainer";
import FavoriteMenuItem from "./favorite-menu-item";
import CopyUrlLink from "../CopyUrlLink/modal";
import AddBoardScreen from "../AddBoardScreen/AddBoardScreen";
import PinkButton from "../../buttons/pink-button";
import DeleteBiteScreen from "../OpenBiteMenu/DeleteBiteScreen";
import LoadingFullScreen from "../../loading/loading-full-screen";
import BiteUpdateWrapper from "../../../components/admin/bite-update-wrapper";
import SuccessOverlay from "../FullScreenOverlays/SuccessOverlay";
import EditBlerp from "./EditBlerp";
import ReportScreen from "./ReportScreen";

const StyledTriangleIcon = styled(TriangleIcon)`
    width: 100%;
    height: 40px;
    padding: 0;
    margin: 0px 0px -11px 0px;
`;

const ModalContainer = styled.div`
    position: absolute;
    background-color: transparent;
    padding: 12px;
    z-index: 5000;
    width: auto;
    top: ${props => props.posY}px;
    left: ${props => props.posX - 160}px;

    @media (max-width: 600px) {
        left: 50%;
        transform: translateX(-50%);
    }
`;

const CloseButtonHeader = styled.div`
    display: flex;
    width: 100%;
    border: none;
    text-decoration: none;
    justify-content: flex-end;
`;

const CloseXButton = styled.button`
    color: #aaa;
    width: 20%;
    padding: 4px;
    font-size: 28px;
    font-weight: bold;
    border: none;
    background: transparent;

    &:hover {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
`;
const BorderLine = styled.div`
    border-top: 1px solid ${lightGray};
    margin: 8px;
    width: 80%;
`;

const ModalSquare = styled.div`
    background-color: #fff;
    z-index: 4000;
    width: ${props => (props.addingToBoard ? "304px" : "auto")};
    height: 100%;
    border-radius: 6px;
    padding-bottom: 20px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: 0.2s;
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

const LoadingContainer = styled.div`
    position: relative;
    font-weight: 300;
    width: 100%;
    height: 70%;

    @media (max-width: 600px) {
        padding: 0;
        margin: 0;
    }
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

const biteQuery = gql`
    query websiteGetBitePage($id: MongoID!) {
        web {
            biteById(_id: $id) {
                ...bitePageFrag2
            }
        }
    }

    fragment bitePageFrag2 on Bite {
        _id
        title
        userKeywords
        keywords
        color
        image {
            original {
                url
            }
        }
        userCategory
        description
        author
        ownerObject {
            _id
            username
            picture
        }
        transcription
        favorited
        playCount
        visibility
        audienceRating
        ownerId
        giphy {
            mp4
            gif
        }
        audio {
            mp3 {
                url
            }
        }
    }
`;

class BiteOptionsModal extends React.Component {
    static defaultProps = {};
    modalRoot;
    el;
    closeButton;

    constructor(props) {
        super(props);
        this.modalRoot =
            props.rootNode || document.getElementById("blerp-modal-root");
        this.el = document.createElement("div");
        this.state = {
            showBoardCreate: false,
            addToNewBoard: false,
            deleteBlerpClicked: false,
            editBlerpClicked: false,
            showSuccessOverlay: false,
            showReport: false,
        };
        this.modalContainer = document.getElementsByClassName(
            "blerp-modal-container",
        );
    }

    componentDidMount() {
        this.modalRoot.appendChild(this.el);
        document.addEventListener("mousedown", this.closeModalOutsideClick);
        // this.closeButton.focus();
        setTimeout(() => {
            if (this.modalContainer[0]) {
                this.modalContainer[0].scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            }
        }, 250);
    }

    componentWillUnmount() {
        this.modalRoot.removeChild(this.el);
        document.removeEventListener("mousedown", this.closeModalOutsideClick);
    }

    closeModal = () => {
        this.props.onModalClose();
    };

    closeModalOutsideClick = event => {
        const domNode = ReactDOM.findDOMNode(this);

        // Detects if there was an outside click
        if (!domNode || !domNode.contains(event.target)) {
            this.closeModal();
        }
    };

    getCloseButton = el => {
        this.closeButton = el;
    };

    notLoggedInClick = event => {
        if (window) {
            const redirect = `bite/${this.props.biteId}`;
            window.location.href = `/login?returnTo=${redirect}`;
        }
    };

    reportClick = event => {
        if (window) {
            window.location.href = `/contact`;
        }
    };

    changeToBoardScreen = type => {
        this.setState({ showBoardCreate: true });
        if (type === "New") {
            this.setState({ addToNewBoard: true });
        }
    };

    closeBoardScreen = status => {
        this.setState({ addToNewBoard: false });
        this.setState({ showBoardCreate: false });
        if (status !== "cancel") {
            this.setState({ showSuccessOverlay: true });
            setTimeout(() => {
                this.setState({ showSuccessOverlay: false });
            }, 3000);
        }
    };

    handleDeleteBlerpClicked = () => {
        this.setState({ deleteBlerpClicked: !this.state.deleteBlerpClicked });
    };

    handleEditBlerpClicked = () => {
        this.setState({ editBlerpClicked: !this.state.editBlerpClicked });
    };

    isOwnerOrAdmin(userData, biteData) {
        return (
            (userData &&
                userData.web &&
                userData.web.userSignedIn &&
                userData.web.userSignedIn.roles &&
                userData.web.userSignedIn.roles.indexOf("ADMIN") > -1) ||
            (biteData &&
                biteData.web &&
                biteData.web.biteById &&
                biteData.web.biteById.ownerId) ===
                (userData &&
                    userData.web &&
                    userData.web.userSignedIn &&
                    userData.web.userSignedIn._id)
        );
    }

    isStrictlyAdmin(userData) {
        return (
            userData &&
            userData.web &&
            userData.web.userSignedIn &&
            userData.web.userSignedIn.roles &&
            userData.web.userSignedIn.roles.indexOf("ADMIN") > -1
        );
    }

    render() {
        if (this.props.data.error) {
            console.log(this.props.data.error.message);
        }
        return ReactDOM.createPortal(
            <Query
                query={biteQuery}
                ssr={true}
                variables={{ id: this.props.biteId }}
            >
                {({ error, data, networkStatus, fetchMore, refetch }) => {
                    if (networkStatus === 1 || networkStatus === 2) {
                        return (
                            <LoadingContainer>
                                <LoadingFullScreen />
                            </LoadingContainer>
                        );
                    } else if (!data.web || !data.web.biteById || error) {
                        return this.renderNoBlerpFound();
                    }
                    return (
                        <>
                            {this.state.showSuccessOverlay ? (
                                <SuccessOverlay
                                    header='Awesome!'
                                    paragraph='Blerp saved'
                                    close={() =>
                                        this.setState({
                                            showSuccessOverlay: false,
                                        })
                                    }
                                />
                            ) : (
                                <></>
                            )}
                            <ModalContainer
                                posX={this.props.posX - 10}
                                posY={this.props.posY - 10}
                                className='blerp-modal-container'
                            >
                                {/* <StyledTriangleIcon /> */}
                                <ModalSquare
                                    addingToBoard={this.state.showBoardCreate}
                                >
                                    {!this.state.showBoardCreate &&
                                    !this.state.showReport ? (
                                        <ModalContents>
                                            {this.state.editBlerpClicked ===
                                            true ? (
                                                <ButtonContainer>
                                                    <EditBlerp
                                                        type='blerp'
                                                        blerp={
                                                            data.web.biteById
                                                        }
                                                        close={() =>
                                                            this.setState({
                                                                editBlerpClicked: false,
                                                            })
                                                        }
                                                    />
                                                </ButtonContainer>
                                            ) : (
                                                <>
                                                    {this.props.data.web &&
                                                    this.props.data.web
                                                        .userSignedIn &&
                                                    this.props.data.web
                                                        .userSignedIn._id ? (
                                                        <ButtonContainer
                                                            style={{
                                                                marginTop:
                                                                    "30px",
                                                            }}
                                                        >
                                                            <PinkButton
                                                                style={{
                                                                    fontSize:
                                                                        "16px",
                                                                }}
                                                                key={
                                                                    this.props
                                                                        .biteId
                                                                }
                                                                onClick={() =>
                                                                    this.changeToBoardScreen(
                                                                        "Add",
                                                                    )
                                                                }
                                                            >
                                                                {"Add to Board"}
                                                            </PinkButton>
                                                        </ButtonContainer>
                                                    ) : (
                                                        <ButtonContainer>
                                                            <GreyButton
                                                                style={{
                                                                    marginTop:
                                                                        "10px",
                                                                }}
                                                                onClick={() =>
                                                                    this.notLoggedInClick()
                                                                }
                                                            >
                                                                Login
                                                            </GreyButton>
                                                        </ButtonContainer>
                                                    )}
                                                    {this.props.data.web &&
                                                    this.props.data.web
                                                        .userSignedIn &&
                                                    this.props.data.web
                                                        .userSignedIn._id ? (
                                                        <ButtonContainer>
                                                            <GreyButton
                                                                key={
                                                                    this.props
                                                                        .biteId
                                                                }
                                                                onClick={() =>
                                                                    this.changeToBoardScreen(
                                                                        "New",
                                                                    )
                                                                }
                                                                hoverUrl={
                                                                    "https://storage.googleapis.com/blerp_products/Web/Menus/White%20plus.svg"
                                                                }
                                                            >
                                                                <ButtonTextContainer>
                                                                    <Icon url='https://storage.googleapis.com/blerp_products/Web/Menus/Black%20plus.svg' />
                                                                    <ButtonText>
                                                                        New
                                                                        Board
                                                                    </ButtonText>
                                                                </ButtonTextContainer>
                                                            </GreyButton>
                                                        </ButtonContainer>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <ButtonContainer>
                                                        <CopyUrlLink
                                                            id={
                                                                this.props
                                                                    .biteId
                                                            }
                                                            url={`https://blerp.com/soundbites/${this.props.biteId}`}
                                                            title={"Copy Link"}
                                                            analyticTitle={
                                                                "COPY_BLERP_WEB_URL"
                                                            }
                                                            analyticUsing={
                                                                "BLERP_MODAL"
                                                            }
                                                        />
                                                    </ButtonContainer>
                                                    <ButtonContainer>
                                                        {this.props.data.web &&
                                                        this.props.data.web
                                                            .userSignedIn &&
                                                        this.isOwnerOrAdmin(
                                                            this.props.data,
                                                            data,
                                                        ) &&
                                                        this.props.data.web
                                                            .userSignedIn
                                                            ._id ? (
                                                            this.state
                                                                .deleteBlerpClicked ===
                                                            false ? (
                                                                <RedButton
                                                                    key={
                                                                        this
                                                                            .props
                                                                            .biteId
                                                                    }
                                                                    onClick={() =>
                                                                        this.handleDeleteBlerpClicked()
                                                                    }
                                                                    hoverUrl={
                                                                        "https://storage.googleapis.com/blerp_products/Web/Menus/delete%20red.svg"
                                                                    }
                                                                >
                                                                    <ButtonTextContainer>
                                                                        <Icon url='https://storage.googleapis.com/blerp_products/Web/Menus/delete%20black.svg' />
                                                                        <ButtonText>
                                                                            Delete
                                                                            Blerp
                                                                        </ButtonText>
                                                                    </ButtonTextContainer>
                                                                </RedButton>
                                                            ) : (
                                                                <DeleteBiteScreen
                                                                    biteId={
                                                                        this
                                                                            .props
                                                                            .biteId
                                                                    }
                                                                    handleCancelClick={
                                                                        this
                                                                            .handleDeleteBlerpClicked
                                                                    }
                                                                    handleDeleteFinished={
                                                                        this
                                                                            .handleDeleteBlerpClicked
                                                                    }
                                                                />
                                                            )
                                                        ) : (
                                                            <RedButton
                                                                key={
                                                                    this.props
                                                                        .biteId
                                                                }
                                                                onClick={() =>
                                                                    this.setState(
                                                                        {
                                                                            showReport: true,
                                                                        },
                                                                    )
                                                                }
                                                                hoverUrl={
                                                                    "https://storage.googleapis.com/blerp_products/Web/Menus/report%20red.svg"
                                                                }
                                                            >
                                                                <ButtonTextContainer>
                                                                    <Icon url='https://storage.googleapis.com/blerp_products/Web/Menus/report%20black.svg' />
                                                                    <ButtonText>
                                                                        Report
                                                                    </ButtonText>
                                                                </ButtonTextContainer>
                                                            </RedButton>
                                                        )}
                                                    </ButtonContainer>
                                                    <ButtonContainer>
                                                        {this.props.data.web &&
                                                        this.props.data.web
                                                            .userSignedIn &&
                                                        this.isOwnerOrAdmin(
                                                            this.props.data,
                                                            data,
                                                        ) === true &&
                                                        this.props.data.web
                                                            .userSignedIn
                                                            ._id ? (
                                                            this.state
                                                                .editBlerpClicked ===
                                                            false ? (
                                                                <GreyButton
                                                                    key={
                                                                        this
                                                                            .props
                                                                            .biteId
                                                                    }
                                                                    onClick={() =>
                                                                        this.handleEditBlerpClicked()
                                                                    }
                                                                >
                                                                    {
                                                                        "Edit Blerp"
                                                                    }
                                                                </GreyButton>
                                                            ) : (
                                                                <></>
                                                            )
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </ButtonContainer>
                                                    {this.props.children && (
                                                        <BorderLine />
                                                    )}
                                                    {this.props.children &&
                                                        this.props
                                                            .favoriteCallback &&
                                                        this.props.data.web &&
                                                        (this.props.data.web
                                                            .userSignedIn &&
                                                        this.props.data.web
                                                            .userSignedIn
                                                            ._id ? (
                                                            <FavoriteMenuItem
                                                                biteId={
                                                                    this.props
                                                                        .biteId
                                                                }
                                                                loggedIn={true}
                                                                favorited={
                                                                    this.props
                                                                        .favorited
                                                                }
                                                                favoriteCallback={
                                                                    this.props
                                                                        .favoriteCallback
                                                                }
                                                            />
                                                        ) : (
                                                            <FavoriteMenuItem
                                                                biteId={
                                                                    this.props
                                                                        .biteId
                                                                }
                                                                loggedIn={false}
                                                                favorited={
                                                                    this.props
                                                                        .favorited
                                                                }
                                                                favoriteCallback={
                                                                    this.props
                                                                        .favoriteCallback
                                                                }
                                                            />
                                                        ))}
                                                    {this.props.children}
                                                    <BorderLine
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                    />
                                                    <NewSocialContainer
                                                        userSignedInId={
                                                            this.props
                                                                .userSignedInId
                                                        }
                                                        biteId={
                                                            this.props.biteId
                                                        }
                                                        mainTitle={"Share"}
                                                        id={this.props.biteId}
                                                        itemTitle={
                                                            this.props.biteTitle
                                                        }
                                                        downloadUrl={
                                                            this.props
                                                                .biteAudioUrl
                                                        }
                                                        onFocus={true}
                                                        analyticTitle={
                                                            "SHARE_BLERP"
                                                        }
                                                        analyticUsingTitle={
                                                            "WEB_SHARE_BUTTON_SOCIAL_ITEM_MENU"
                                                        }
                                                        type={"soundbites"}
                                                    />
                                                </>
                                            )}
                                        </ModalContents>
                                    ) : (
                                        <>
                                            {this.state.showBoardCreate ===
                                            true ? (
                                                <ModalContents>
                                                    <AddBoardScreen
                                                        biteIds={[
                                                            this.props.biteId,
                                                        ]}
                                                        userId={
                                                            this.props.data &&
                                                            this.props.data
                                                                .web &&
                                                            this.props.data.web
                                                                .userSignedIn &&
                                                            this.props.data.web
                                                                .userSignedIn
                                                                ._id
                                                        }
                                                        onFinishAddBite={status =>
                                                            this.closeBoardScreen(
                                                                status,
                                                            )
                                                        }
                                                        createNewBoard={
                                                            this.state
                                                                .addToNewBoard
                                                        }
                                                        onClose={() =>
                                                            this.setState({
                                                                showBoardCreate: false,
                                                            })
                                                        }
                                                    />
                                                </ModalContents>
                                            ) : (
                                                <></>
                                            )}
                                            {this.state.showReport === true ? (
                                                <ModalContents>
                                                    <ReportScreen
                                                        type='Blerp'
                                                        bite={this.props.biteId}
                                                        onClose={() =>
                                                            this.setState({
                                                                showReport: false,
                                                            })
                                                        }
                                                    />
                                                </ModalContents>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    )}
                                </ModalSquare>
                            </ModalContainer>
                        </>
                    );
                }}
            </Query>,
            this.el,
        );
    }
}

const userQuery = gql`
    query biteMenuClickedQuery {
        web {
            userSignedIn {
                _id
                username
                roles
            }
        }
    }
`;

export default graphql(userQuery, {
    options: { fetchPolicy: "network-only", ssr: true },
})(withRouter(BiteOptionsModal));
