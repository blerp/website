import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import PinkButton from "../../buttons/pink-button";
import { lightGray, ligherBackground, bodyText } from "../../../styles/colors";
import SuccessOverlay from "../FullScreenOverlays/SuccessOverlay";

const Title = styled.div`
    font-size: 26px;
    text-align: center;
    margin: 10px;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledInput = styled.input`
    font-weight: 10;
    border-radius: 5px;
    height: 32px;
    width: 80%;
    margin: 10px 0;
    padding: 5px;
    border: none;
    background-color: ${ligherBackground};
    color: ${bodyText};
    align-self: center;
`;

const BOARD_UPDATE_MUTATION = gql`
    mutation websiteOwnerBoardUpdate($board: UpdateByIdPlaylistInput!) {
        web {
            playlistUpdateById(record: $board) {
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

const BLERP_UPDATE_MUTATION = gql`
    mutation websiteOwnerBiteUpdate($bite: UpdateByIdBiteInput!) {
        web {
            biteUpdateById(record: $bite) {
                record {
                    _id
                    title
                    description
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
                    isCurated
                    transcription
                    favorited
                    playCount
                    userKeywords
                    userEmotion
                    userCategory
                    author
                    audienceRating
                    visibility
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

const VisibilityOptions = [
    { text: "Public", value: "PUBLIC" },
    { text: "Unlisted", value: "UNLISTED" },
];

const EditBlerp = props => {
    const [blerp, setBlerp] = useState();
    const [board, setBoard] = useState();
    const [titleInput, setTitleInput] = useState();
    const [descriptionInput, setDescriptionInput] = useState();
    const [authorInput, setAuthorInput] = useState();
    const [visibility, setVisibility] = useState();
    const [showSuccessOverlay, setSuccessOverlay] = useState(false);

    const [updateBlerp] = useMutation(BLERP_UPDATE_MUTATION);
    const [updateBoard] = useMutation(BOARD_UPDATE_MUTATION);

    useEffect(() => {
        if (props.type === "blerp" && props.blerp) {
            setBlerp(props.blerp);
            setTitleInput(props.blerp.title);
            setDescriptionInput(props.blerp.description);
            setAuthorInput(props.blerp.author);
            setVisibility(props.blerp.visibility);
        } else if (props.type === "board" && props.board) {
            setBoard(props.board);
            setTitleInput(props.board.title);
            setDescriptionInput(props.board.description);
            setVisibility(props.board.visibility);
        }
    }, []);

    const handleUpdate = () => {
        if (props.type === "blerp") {
            updateBlerp({
                variables: {
                    bite: {
                        _id: props.blerp._id,
                        title: titleInput,
                        description: descriptionInput,
                        author: authorInput,
                        visibility: visibility,
                    },
                },
            });
        } else if (props.type === "board") {
            updateBoard({
                variables: {
                    board: {
                        _id: props.board._id,
                        title: titleInput,
                        description: descriptionInput,
                        visibility: visibility,
                    },
                },
            });
        }
        setSuccessOverlay(true);
        setTimeout(() => {
            setSuccessOverlay(false);
            props.close();
        }, 3000);
    };

    return (
        <>
            {showSuccessOverlay ? (
                <SuccessOverlay
                    header='Awesome!'
                    paragraph={
                        props.type === "blerp" ? "Blerp saved" : "Board saved"
                    }
                    close={() => props.close()}
                />
            ) : (
                <></>
            )}
            <Container>
                <Title>
                    {props.type === "blerp" ? "Edit Blerp" : "Edit Board"}
                </Title>
                <StyledInput
                    placeholder='Title...'
                    value={titleInput}
                    onChange={e => setTitleInput(e.target.value)}
                />
                <StyledInput
                    placeholder='Description...'
                    value={descriptionInput}
                    onChange={e => setDescriptionInput(e.target.value)}
                />
                {props.type === "blerp" ? (
                    <StyledInput
                        placeholder='Author...'
                        value={authorInput}
                        onChange={e => setAuthorInput(e.target.value)}
                    />
                ) : (
                    <></>
                )}
                <select
                    style={{ margin: "10px" }}
                    value={visibility}
                    onChange={e => setVisibility(e.target.value)}
                >
                    {VisibilityOptions.map(visi => {
                        return (
                            <option key={visi.value} value={visi.value}>
                                {visi.text}
                            </option>
                        );
                    })}
                </select>
                <PinkButton
                    style={{ width: "80%", margin: "0 auto" }}
                    onClick={() => handleUpdate()}
                >
                    Update
                </PinkButton>
                <div
                    style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        margin: "10px",
                        textAlign: "center",
                    }}
                    onClick={() => props.close()}
                >
                    Cancel
                </div>
            </Container>
        </>
    );
};

export default EditBlerp;
