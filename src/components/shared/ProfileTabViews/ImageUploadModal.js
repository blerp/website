import React, {
    useEffect,
    useState,
    useRef,
    useContext,
    createRef,
} from "react";
import { BaseModal, ModalTitle, GreyButton } from "../Modal/BaseModal";
import styled from "styled-components";
import * as ReactDOM from "react-dom";
import ImageUpdateScreen from "../../mod/ImageUpdateScreen";
import PinkButton from "../../buttons/pink-button";
import UnderlineButton from "../Modal/UnderlineButton";
import CenteredContent from "../Modal/CenteredContent";
import {
    canUseDOM,
    ImageDropzone,
    NewImageDropzone,
} from "../../upload/dropzones";
import { useMutation } from "@apollo/client";
import withData from "../../../lib/withData";
import gql from "graphql-tag";
import { flyoutBackground, defaultBackground } from "../../../styles/colors";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import { Row } from "./ProfileStyledComponents";
import { Grid, Column } from "../../theme/Grid";
import { ToastContext } from "../../theme/ToastProvider";

const Slider = styled.input`
    -webkit-appearance: none;
    align-self: center;
    width: 80%;
    height: 5px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;

    &:focus {
        border: 0px !important;
    }

    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: ${props => props.theme.pandaPink};
        border: 2px solid ${props => props.theme.flyoutBackground};
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: ${props => props.theme.pandaPink};
        border: 2px solid ${props => props.theme.flyoutBackground};
        cursor: pointer;
    }
`;

const CloseButton = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Twitch/Assets/Close_Black.svg?folder=true&organizationId=true);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
`;

const TheBlur = styled.div`
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(2px);
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const ModalCard = styled.div`
    background: ${props => props.theme.flyoutBackground};
    box-shadow: 0px 0px 20px #0000001a;
    border-radius: 8px;
    width: 363px;
    height: auto;
    align-self: center;
`;

const ZoomIcon = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Web/Account/zoom%20icon.svg?folder=true&organizationId=true);
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
    width: 20px;
    height: 20px;
`;

const HolePunch = styled.div`
    position: absolute;
    width: 88%;
    height: 300px;
    background: -moz-radial-gradient(
        transparent 100px,
        rgba(0, 0, 0, 0.2) 100px
    );
    background: -webkit-radial-gradient(
        transparent 120px,
        rgba(191, 191, 191, 0.2) 120px
    );
    background: -ms-radial-gradient(
        transparent 100px,
        rgba(0, 0, 0, 0.2) 100px
    );
    background: -o-radial-gradient(transparent 100px, rgba(0, 0, 0, 0.2) 100px);
    pointer-events: none; /* send mouse events beneath this layer */
`;

const InfoText = styled.p`
    color: ${props => props.theme.secondaryGray};
    margin: 0 20px;
`;

const UPDATE_PROFILE_PICTURE = gql`
    mutation webUpdateProfilePictureMutation(
        $record: UserProfileImageUpdateInput!
    ) {
        web {
            updateProfileImage(record: $record) {
                _id
                profileImage {
                    updatedAt
                    original {
                        url
                    }
                }
            }
        }
    }
`;

const UPDATE_PROFILE_HEADER = gql`
    mutation webUpdateProfileHeaderMutation(
        $record: UserHeaderImageUpdateInput!
    ) {
        web {
            updateHeaderImage(record: $record) {
                _id
                headerImage {
                    updatedAt
                    original {
                        url
                    }
                }
            }
        }
    }
`;

const MUTATION_UPDATE_PLAYLIST = gql`
    mutation websiteAddNewBiteToPlaylist($id: MongoID!, $biteId: MongoID!) {
        web {
            playlistAddBiteById(_id: $id, biteId: $biteId) {
                title
            }
        }
    }
`;

const ImageUploadModal = props => {
    const [image, setImage] = useState(props.image);
    const [zoom, setZoom] = useState(50);
    const [loading, setLoading] = useState(false);
    const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE);
    const [updateProfileHeader] = useMutation(UPDATE_PROFILE_HEADER);

    const imageEditorRef = createRef();

    const handleImageDrop = acceptedFiles => {
        setImage(acceptedFiles[0]);
    };

    const { useToast } = useContext(ToastContext);

    const handleGifUpload = async () => {
        if (props.type === "profile") {
            updateProfilePicture({
                variables: {
                    record: {
                        id: props.user._id,
                        image: image,
                    },
                },
            })
                .then(res => {
                    console.log(res);
                    useToast("Uploaded!", "success");
                })
                .catch(err => {
                    console.log(err);
                    useToast("Error", "error");
                });
        } else if (props.type === "header") {
            updateProfileHeader({
                variables: {
                    record: {
                        id: props.user._id,
                        image: image,
                    },
                },
            })
                .then(res => useToast("Uploaded!", "success"))
                .catch(err => useToast("Error", "error"));
        }

        props.onClose();
    };

    const handleUploadClick = async () => {
        if (!image) {
            alert("You must upload a valid image");
            return;
        }

        if (image.size > 8842038) {
            alert("You must update with a valid image less then 7mb");
            return;
        }
        // console.log(image, imageEditorRef.current.getImage())
        const canvas = imageEditorRef.current.getImage().toDataURL();
        let imageURL;
        let file;
        await fetch(canvas)
            .then(res => res.blob())
            .then(blob => {
                imageURL = window.URL.createObjectURL(blob);
                file = new File([blob], image.name, { type: image.type });
            });

        if (props.type === "profile") {
            updateProfilePicture({
                variables: {
                    record: {
                        id: props.user._id,
                        image: file,
                    },
                },
            })
                .then(res => useToast("Uploaded!", "success"))
                .catch(err => useToast("Error", "error"));
        } else if (props.type === "header") {
            updateProfileHeader({
                variables: {
                    record: {
                        id: props.user._id,
                        image: file,
                    },
                },
            })
                .then(res => useToast("Uploaded!", "success"))
                .catch(err => useToast("Error", "error"));
        } else if (props.type === "blerp") {
            // updateBlerpPicture({
            //   variables: {
            //     recor
            //   }
            // })
        }

        props.onClose();
    };

    return (
        <Grid style={{ backgroundColor: "transparent" }} gridColumns='auto'>
            <Column id='settings-modal'>
                <CenteredContent style={{ position: "relative" }}>
                    <CloseButton onClick={() => props.onClose()} />
                    <ModalTitle style={{ magrin: "10px" }}>
                        {props.title}
                    </ModalTitle>
                    <InfoText style={{ marginBottom: "20px" }}>
                        Adjust your image below.
                    </InfoText>
                    <InfoText>{props.sizeInfo}</InfoText>
                </CenteredContent>
                <CenteredContent
                    style={{
                        position: "relative",
                        backgroundColor: defaultBackground,
                    }}
                >
                    {image ? (
                        image.type !== "image/gif" ? (
                            props.type === "header" ? (
                                <>
                                    <AvatarEditor
                                        style={{ borderRadius: "4px" }}
                                        ref={imageEditorRef}
                                        width={800}
                                        height={225}
                                        image={image}
                                        scale={zoom / 50}
                                        crossorigin='anonymous'
                                    />
                                </>
                            ) : (
                                <>
                                    <AvatarEditor
                                        style={{ borderRadius: "4px" }}
                                        ref={imageEditorRef}
                                        width={250}
                                        height={250}
                                        borderRadius={125}
                                        image={image}
                                        scale={zoom / 50}
                                        crossOrigin='anonymous'
                                    />
                                </>
                            )
                        ) : (
                            <img
                                src={image.preview}
                                width={"100%"}
                                height={"50%"}
                            />
                        )
                    ) : (
                        <Dropzone
                            onDrop={acceptedFiles =>
                                handleImageDrop(acceptedFiles)
                            }
                            style={{ width: "100%", height: "250px" }}
                        >
                            <CenteredContent
                                style={{
                                    alignSelf: "center",
                                    height: "100%",
                                }}
                            >
                                Click or drop image here to upload.
                            </CenteredContent>
                        </Dropzone>
                    )}
                </CenteredContent>
                <CenteredContent>
                    {image && image.type !== "image/gif" ? (
                        <Row
                            style={{
                                justifyContent: "space-around",
                                marginTop: "20px",
                            }}
                        >
                            <ZoomIcon />
                            <Slider
                                type='range'
                                min='35'
                                max='100'
                                value={zoom}
                                onChange={e => setZoom(e.target.value)}
                            />
                        </Row>
                    ) : (
                        <></>
                    )}
                    <UnderlineButton
                        style={{ margin: "10px", textDecoration: "none" }}
                        onClick={() => setImage(null)}
                    >
                        Delete
                    </UnderlineButton>
                    <PinkButton
                        disabled={!image}
                        style={{ marginBottom: "20px" }}
                        onClick={() => {
                            image.type === "image/gif"
                                ? handleGifUpload()
                                : handleUploadClick();
                        }}
                    >
                        Save
                    </PinkButton>
                </CenteredContent>
            </Column>
        </Grid>
    );
};

export default withData(ImageUploadModal);
