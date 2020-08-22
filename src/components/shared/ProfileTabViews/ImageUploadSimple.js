import React, { useEffect, useState, useRef, createRef } from "react";
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
import Text from "../../theme/Text";

const Overlay = styled.div`
    position: relative;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }
`;

export const ImagePreview = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    margin: 10px;
    flex: 0 0 auto;
    position: relative;
    padding: 0;
    border: 0px !important;
    transition: 0.5s;

    &:focus {
        border: 0px !important;
        margin-bottom: 10px;
        transform: translate(0, -10px);

        &::after {
            content: "blerblerblerblerblerblerblerblerberlberlberlberlberblerblerb";
            font-size: 6px;
            color: ${props => props.theme.pandaPink};
            width: 200px;
            height: 6px;
            background-color: ${props => props.theme.pandaPink};
            border-radius: 10px;
            margin: 0 auto;
        }
    }
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

const UPDATE_PLAYLIST_IMAGE = gql`
    mutation websiteAddNewBiteToPlaylist($record: PlaylistImageUpdateInput!) {
        web {
            playlistUpdateImageById(record: $record) {
                _id
                title
                image {
                    original {
                        url
                    }
                }
            }
        }
    }
`;

const ImageUploadSimple = props => {
    const [image, setImage] = useState(props.image);
    const [zoom, setZoom] = useState(50);
    const [loading, setLoading] = useState(false);
    const [updateProfilePicture] = useMutation(UPDATE_PROFILE_PICTURE);
    const [updateProfileHeader] = useMutation(UPDATE_PROFILE_HEADER);
    const [updatePlaylistImage] = useMutation(UPDATE_PLAYLIST_IMAGE);

    const imageEditorRef = createRef();

    if (props.img != null) {
        console.log("image is not null");
    }
    const handleImageDrop = acceptedFiles => {
        setImage(acceptedFiles[0]);
        handleUploadClick(acceptedFiles[0]);
    };

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
                .then(res => console.log(res))
                .catch(err => console.log(err));
        } else if (props.type === "header") {
            updateProfileHeader({
                variables: {
                    record: {
                        id: props.user._id,
                        image: image,
                    },
                },
            });
        }
    };

    const handleUploadClick = async acceptedFiles => {
        if (!image) {
            alert("You must upload a valid image");
            return;
        }

        if (image.size > 8842038) {
            alert("You must update with a valid image less then 7mb");
            return;
        }
        // console.log(image, imageEditorRef.current.getImage())

        if (props.type === "profile") {
            updateProfilePicture({
                variables: {
                    record: {
                        id: props.user._id,
                        image: acceptedFiles,
                    },
                },
            })
                .then(res => null)
                .catch(err => null);
        } else if (props.type === "header") {
            updateProfileHeader({
                variables: {
                    record: {
                        id: props.user._id,
                        image: image,
                    },
                },
            });
        } else if (props.type === "blerp") {
            // updateBlerpPicture({
            //   variables: {
            //     recor
            //   }
            // })
        } else if (props.type === "board") {
            updatePlaylistImage({
                variables: {
                    record: {
                        id: props.board._id,
                        image: acceptedFiles,
                    },
                },
            });
        }
    };

    return (
        <CenteredContent
            style={{
                position: "relative",
                height: props.mobile ? "200px" : "150px",
                maxWidth: props.mobile ? "285px" : "235px",
            }}
        >
            <Dropzone
                onDrop={acceptedFiles => handleImageDrop(acceptedFiles)}
                style={{ position: "relative", width: "100%", height: "100%" }}
            >
                <ImagePreview
                    url={image.preview ? image.preview : image}
                    style={{ margin: "0px" }}
                >
                    <Overlay>
                        <Text
                            style={{
                                alignSelf: "center",
                                justifySelf: "center",
                            }}
                            fontWeight='light'
                            fontSize='14px'
                            fontColor='white'
                        >
                            Change image
                        </Text>
                    </Overlay>
                </ImagePreview>
            </Dropzone>
        </CenteredContent>
    );
};

export default withData(ImageUploadSimple);
