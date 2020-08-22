import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Row } from "../shared/ProfileTabViews/ProfileStyledComponents";
import InputList from "../shared/InputList/InputList";
import Dropdown from "../shared/Dropdown/Dropdown";
import {
    Button,
    Grid,
    Column,
    Input,
    Text,
    Modal,
    InputArea,
} from "../theme/Theme";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import ImageUpdateScreen from "../shared/OpenBoardMenu/ImageUpdateScreen";
import ImageUploadModal from "../shared/ProfileTabViews/ImageUploadModal";
import Dropzone from "react-dropzone";
import ImageUploadSimple from "../shared/ProfileTabViews/ImageUploadSimple";
import colors from "../theme/colors";
import SuccessToast from "../theme/SuccessToast";
import { ToastContext } from "../theme/ToastProvider";

const BOARD_UPDATE_MUTATION = gql`
    mutation websiteOwnerBoardUpdate($record: UpdateByIdPlaylistInput!) {
        web {
            playlistUpdateById(record: $record) {
                record {
                    _id
                    title
                    ownerId
                    audienceRating
                    description
                    visibility
                    userKeywords
                    favorites
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
    }
`;

const Container = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${props => props.theme.grey2};
    height: ${props => (props.soundboardPage ? "900px" : "750px")};
    @media (max-width: 900px) {
        width: 85%;
        border-radius: 0px 0px 16px 16px;
        overflow: hidden;
    }
    @media (max-width: 600px) {
        width: 100%;
        border-radius: 0px;
        overflow: hidden;
    }
`;

const GradOverlay = styled.div`
    width: 100%;
    height: 40px;
    position: absolute;
    top: -40px;
    background: linear-gradient(
        ${props => `${props.theme.grey2}00`},
        ${props => `${props.theme.grey2}`}
    );
`;

const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const ImageContainer = styled.div`
    flex: 2;

    @media (max-width: 1100px) {
        flex: 3;
    }
`;

const DropdownContainer = styled.div`
    flex: 1;
    padding: 0px 30px;

    @media (max-width: 1100px) {
        flex: 1;
        padding: 0px 0px;
        padding-left: 10px;
    }

    @media (max-width: 900px) {
        flex: 0.7;
        padding: 0px 60px;
    }
`;

const ScrollableContainer = styled.div`
    position: relative;
    overflow: scroll;
    flex: 7;
`;

const BottomActionContainer = styled.div`
    position: relative;
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    bottom: 0px;
    padding: 10px 0px;
    background-color: ${props => props.theme.grey2};
`;

const BoardUpdateBox = props => {
    const [titleInput, setTitleInput] = useState(props.board.title);
    const [descriptionInput, setDiscriptionInput] = useState(
        props.board.description,
    );
    const [visibility, setVisibility] = useState(props.board.visibility);
    const [rating, setRating] = useState(props.board.audienceRating);
    const [tags, setTags] = useState(
        props.board.userKeywords
            ? props.board.userKeywords.slice().reverse()
            : [],
    );
    const [updateBoard] = useMutation(BOARD_UPDATE_MUTATION);
    const [image, setImage] = useState(props.board.image.original.url);
    const [saved, setSaved] = useState(false);

    const handleImageDrop = acceptedFiles => {
        setImage(acceptedFiles[0]);
    };

    const { useToast } = useContext(ToastContext);

    const handleUpdateBoard = () => {
        props.user.roles.includes("MODERATOR") ||
        props.user.roles.includes("ADMIN")
            ? updateBoard({
                  variables: {
                      record: {
                          _id: props.board._id,
                          title: titleInput,
                          description: descriptionInput,
                          userKeywords: tags,
                          audienceRating: rating.toUpperCase(),
                          visibility: visibility.toUpperCase(),
                      },
                  },
              })
                  .then(res => useToast("Saved!", "success"))
                  .catch(err => useToast("Error!", "error"))
            : updateBoard({
                  variables: {
                      record: {
                          _id: props.board._id,
                          title: titleInput,
                          description: descriptionInput,
                          userKeywords: tags,
                          visibility: visibility.toUpperCase(),
                      },
                  },
              })
                  .then(res => useToast("Saved!", "success"))
                  .catch(err => useToast("Error!", "error"));
    };

    return (
        <Container>
            <ScrollableContainer>
                <Grid
                    style={{
                        height: "100%",
                    }}
                    padding='0px 15px 15px 15px'
                    gridBackgroundColor='#f3f3f3'
                    gridColumns={"auto auto"}
                >
                    <Column
                        centerText
                        width={2}
                        style={{ paddingTop: "13px", paddingBottom: "11px" }}
                    >
                        <Text fontColor='dark170D11' fontSize='21px'>
                            Owner Update
                        </Text>
                    </Column>
                    <Column style={{ gridColumn: "1/3" }}>
                        <FlexContainer
                            style={{
                                paddingBottom: "11px",
                            }}
                        >
                            <ImageContainer
                                style={{ flex: props.mobile ? 1 : 1.3 }}
                            >
                                <ImageUploadSimple
                                    image={props.board.image.original.url}
                                    board={props.board}
                                    type='board'
                                    mobile={props.mobile}
                                />
                            </ImageContainer>
                            <DropdownContainer>
                                <Text fontColor='dark170D11' fontSize='14px'>
                                    Visibility
                                </Text>
                                <Dropdown
                                    currentSelection={"Public"}
                                    icon='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Down.svg'
                                    onSelect={option => setVisibility(option)}
                                    options={["Public", "Private"]}
                                />
                                {props.user &&
                                (props.user.roles.includes("MODERATOR") ||
                                    props.user.roles.includes("ADMIN")) ? (
                                    <>
                                        <Text
                                            fontColor='dark170D11'
                                            fontSize='14px'
                                            style={{
                                                marginLeft: "0x",
                                                marginTop: "40px",
                                            }}
                                        >
                                            Rating
                                        </Text>
                                        <Dropdown
                                            currentSelection={
                                                props.board.audienceRating ||
                                                "UR"
                                            }
                                            icon='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Down.svg'
                                            onSelect={option =>
                                                setRating(option)
                                            }
                                            options={[
                                                "G",
                                                "PG",
                                                "PG-13",
                                                "R",
                                                "UR",
                                            ]}
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </DropdownContainer>
                        </FlexContainer>
                    </Column>
                    <Column width={2} style={{ marginBottom: "10px" }}>
                        <Text fontColor='dark170D11' fontSize='16px'>
                            Board Title (30 character max)
                        </Text>
                        <Text fontSize='16px' fontColor='#6f6f6f'>
                            This is a
                            <Input
                                color='white'
                                fontSize='small'
                                style={{
                                    width: "40%",
                                    backgroundColor: "#FFFFFF",
                                    border: "none",
                                    fontWeight: "100",
                                    margin: "5px 5px 0px 5px",
                                    padding: "5px",
                                }}
                                value={titleInput}
                                placeholder='Board Title'
                                onChange={e => setTitleInput(e.target.value)}
                            />
                            Soundboard
                        </Text>
                    </Column>
                    <Column width={2} style={{ marginBottom: "14px" }}>
                        <Text fontColor='dark170D11' fontSize='16px'>
                            Description
                        </Text>
                        <InputArea
                            fluid
                            color='white'
                            value={descriptionInput}
                            placeholder='Soundboard Description...'
                            onChange={e => setDiscriptionInput(e.target.value)}
                            fontSize='small'
                            style={{
                                resize: "none",
                                minHeight: "100px",
                                backgroundColor: "#FFFFFF",
                                border: "none",
                                fontWeight: "200",
                                width: "95%",
                                margin: "auto",
                            }}
                        />
                    </Column>
                    <Column
                        centerText
                        width={2}
                        style={{ marginBottom: "14px", position: "relative" }}
                    >
                        <Text
                            fontColor='dark170D11'
                            fontSize='16px'
                            style={{ marginBottom: "0px" }}
                        >
                            Tags
                        </Text>
                        <InputList
                            setInfo={list => setTags(list)}
                            isTag
                            light
                            list={tags.reverse()}
                            placeholder='Add a Tag'
                        />
                    </Column>
                </Grid>
            </ScrollableContainer>
            <BottomActionContainer>
                <GradOverlay />
                <Column centerText width={2}>
                    <Button
                        style={{
                            margin: "5px auto",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "82px",
                            height: "32px",
                        }}
                        center
                        onClick={() => {
                            handleUpdateBoard();
                            setTimeout(() => {
                                props.onClose();
                            }, 1000);
                        }}
                    >
                        Save
                    </Button>
                </Column>
                <Column centerText width={2}>
                    <Button
                        style={{
                            margin: "5px auto",
                            justifyContent: "center",
                            width: "82px",
                            height: "32px",
                        }}
                        buttonType='secondary'
                        center
                        onClick={() => {
                            props.onClose();
                        }}
                    >
                        Cancel
                    </Button>
                </Column>
            </BottomActionContainer>
        </Container>
    );
};

export default BoardUpdateBox;
