import React, { useState, useEffect } from "react";
import { Button, Icon } from "../../theme/Theme";
import styled from "styled-components";
import CopyUrlLink from "../CopyUrlLink/modal";
import FavoriteMenuItem from "./favorite-menu-item";
import NewSocialContainer from "../NewSocialContainer/NewSocialContainer";
import ReportScreen from "./ReportScreen";
import { Row } from "../ProfileTabViews/ProfileStyledComponents";
import { useQuery, readQuery, gql, useApolloClient } from "@apollo/client";
import LoadingTinyScreen from "../../loading/loading-tiny-screen";
import AddBoardScreen from "../AddBoardScreen/AddBoardScreen";
import { initApollo } from "next-with-apollo";
import { initializeApollo } from "../../../lib/nextApollo";

const biteQuery = gql`
    query websiteGetBitePage($id: MongoID!) {
        web {
            userSignedIn {
                _id
                username
                roles
            }
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
    border-top: 1px solid ${props => props.theme.colors.grey3};
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

const Container = styled.div``;

const BiteOptionsModal = props => {
    const apolloClient = initializeApollo();
    const data = apolloClient.readQuery({
        query: gql`
            query biteModal($id: MongoId!) {
                web {
                    userSignedIn {
                        _id
                        username
                        roles
                    }
                }
            }
        `,
    });
    const bite = apolloClient.readFragment({
        _id: props.biteId,
        fragment: gql`
            fragment bite2 on Bite {
                _id
                ownerId
            }
        `,
    });
    const [screen, setScreen] = useState("");

    useEffect(() => {
        return () => {
            setScreen("");
        };
    }, []);

    const isOwner = () => {
        // return false;
        return props.bite.ownerId === data.web.userSignedIn._id;
    };

    const isStrictlyAdmin = () => {
        return false;
        // data &&
        // data.web &&
        // props.userSigned &&
        // props.userSigned.roles &&
        // props.userSigned.roles.indexOf("ADMIN") > -1
    };

    const renderSwitch = () => {
        switch (screen) {
            case "":
                return renderLoggedIn();
            case "addToBoard":
                return (
                    <AddBoardScreen
                        userId={data.web.userSignedIn._id}
                        biteIds={[props.biteId]}
                        onFinishAddBite={() => setScreen("")}
                        createNewBoard={false}
                        onClose={() => setScreen("")}
                    />
                );
            case "addToNewBoard":
                return (
                    <AddBoardScreen
                        userId={data.web.userSignedIn._id}
                        biteIds={[props.biteId]}
                        onFinishAddBite={() => setScreen("")}
                        createNewBoard={true}
                        onClose={() => setScreen("")}
                    />
                );
            case "reporting":
                return (
                    <ReportScreen
                        type='Blerp'
                        bite={props.biteId}
                        onClose={() => setScreen("")}
                    />
                );
            default:
                return;
        }
    };

    const renderLoggedIn = () => {
        return (
            <>
                <Row
                    style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Button
                        style={{ margin: "10px", whiteSpace: "nowrap" }}
                        onClick={() => setScreen("addToBoard")}
                    >
                        {"Add to Board"}
                    </Button>

                    <Button
                        style={{ margin: "10px", whiteSpace: "nowrap" }}
                        buttonType='secondary'
                        onClick={() => setScreen("addToNewBoard")}
                    >
                        <Icon
                            size='tiny'
                            url='https://storage.googleapis.com/blerp_products/Web/Menus/Black%20plus.svg'
                        />
                        New Board
                    </Button>

                    <CopyUrlLink
                        id={props.biteId}
                        url={`https://blerp.com/soundbites/${props.biteId}`}
                        title={"Copy Link"}
                        analyticTitle={"COPY_BLERP_WEB_URL"}
                        analyticUsing={"BLERP_MODAL"}
                    />

                    {isOwner() ? (
                        <>
                            <Button
                                style={{ margin: "10px", whiteSpace: "nowrap" }}
                                buttonType='secondary'
                            >
                                <Icon url='https://storage.googleapis.com/blerp_products/Web/Menus/delete%20black.svg' />
                                Delete Blerp
                            </Button>
                            <Button
                                style={{ margin: "10px", whiteSpace: "nowrap" }}
                                buttonType='secondary'
                                key={props.biteId}
                                onClick={() => setScreen("editing")}
                            >
                                {"Edit Blerp"}
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}
                    {/* <DeleteBiteScreen
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
                    /> */}

                    <Button
                        style={{ margin: "10px", whiteSpace: "nowrap" }}
                        buttonType='secondary'
                        key={props.biteId}
                        onClick={() => setScreen("reporting")}
                    >
                        <Icon
                            size='tiny'
                            url='https://storage.googleapis.com/blerp_products/Web/Menus/report%20black.svg'
                        />
                        Report
                    </Button>
                </Row>

                {/* <FavoriteMenuItem
                    biteId={props.biteId}
                    loggedIn={true}
                    favorited={props.favorited}
                    favoriteCallback={props.favoriteCallback}
                /> */}
                <BorderLine
                    style={{
                        width: "100%",
                    }}
                />
                <NewSocialContainer
                    userSignedInId={props.userSignedInId}
                    biteId={props.biteId}
                    mainTitle={"Share"}
                    id={props.biteId}
                    itemTitle={props.biteTitle}
                    downloadUrl={props.biteAudioUrl}
                    onFocus={true}
                    analyticTitle={"SHARE_BLERP"}
                    analyticUsingTitle={"WEB_SHARE_BUTTON_SOCIAL_ITEM_MENU"}
                    type={"soundbites"}
                />
            </>
        );
    };

    // if (loading && !data) return <LoadingTinyScreen />;
    // if (error) return <>error</>;

    // if (data)
    return (
        <>
            <Container key={`modal-${props.biteId}-${Math.random(1, 1000)}`}>
                {renderSwitch()}
            </Container>
        </>
    );
};

export default BiteOptionsModal;
