import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import LoadingTinyScreen from "../../loading/loading-tiny-screen";
import {
    lightGray,
    darkText,
    ligherBackground,
    secondaryText,
    darkBackground,
    flyoutBackground,
} from "../../../styles/colors";
import PinkButton from "../../buttons/pink-button";
import withData from "../../../lib/withData";
import SuccessOverlay from "../FullScreenOverlays/SuccessOverlay";
import UnderlineButton from "../Modal/UnderlineButton";

const Container = styled.div`
    width: 264px;
    height: 380px;
    padding: 0 20px;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${ligherBackground};
`;

const BoardGrid = styled.div`
    width: 270px;
    padding: 0px;
    height: 272px;
    display: grid;
    margin-top: 20px;
    grid-template-columns: auto auto;
    grid-column-gap: 15px;
    grid-row-gap: 30px;
    overflow-y: scroll;
    overflow-x: hidden;
    align-self: center;
    justify-items: center;

    &&::-webkit-scrollbar {
        display: none;
    }
`;

const Overlay = styled.div`
    display: flex;
    justify-content: center;
    ${props =>
        props.isAdded
            ? `
      background: #FE295C 0% 0% no-repeat padding-box;
      border-radius: 4px;
      opacity: 0.75;
    `
            : `
      background-color: rgba(0,0,0,0.2);
    `}
    width: 100%;
    height: 100%;
    border-radius: 8px;
    transition: 0.2s;
    color: white;
`;

const BoardGridItem = styled.div`
    width: 124px;
    height: 88px;
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: 200px 200px;
    background-position: center;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;

    &:hover ${Overlay} {
        background-color: rgba(0, 0, 0, 0.7);
    }
`;

const BoardGridItemText = styled.div`
    padding-top: 22%;
    color: white;
    height: 20px;
    text-align: center;
`;

const StyledInput = styled.input`
    font-weight: 10;
    border-radius: 5px;
    height: 32px;
    width: 255px;
    margin-top: 5px;
    padding: 5px;
    border: none;
    background-color: white;
    color: ${darkText};
    align-self: center;
`;

const GreyButton = styled.button`
    font-size: 16px;
    background-color: transparent;
    border-radius: 100px;
    height: 32px;
    color: ${secondaryText};
    border: 2px solid ${secondaryText};
    min-width: 106px;
    z-index: 2;
    padding: 0 24px;
    margin: 10px 0;
    cursor: pointer;
    align-self: center;

    &:focus {
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        color: white;
        background-color: grey;
        border-color: grey;
        transition: all 0.2s ease 0s;
    }

    &:active {
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

const Centered = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ShowMoreScrim = styled.div`
    position: absolute;
    bottom: ${props => (props.addedOne ? "117px" : "70px")};
    left: 12px;
    width: 304px;
    height: 75px;
    background: transparent linear-gradient(180deg, #f3f3f300 0%, #f3f3f3 100%)
        0% 0% no-repeat padding-box;
    display: flex;
    justify-content: center;
`;

const DownIcon = styled.div`
    background-image: url(https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Down.svg?folder=true&organizationId=true);
    background-repeat: no-repeat;
    background-size: 12px 8px;
    width: 12px;
    height: 8px;
    align-self: center;
`;

const USER_BOARD_QUERY = gql`
    query websiteAddToUserBoardModal($id: MongoID!, $playlistPage: Int!) {
        web {
            userSignedIn {
                _id
                username
                roles
            }
            userById(_id: $id) {
                _id
                playlistPagination(page: $playlistPage, perPage: 200) {
                    pageInfo {
                        perPage
                        currentPage
                        hasNextPage
                    }
                    items {
                        _id
                        title
                        description
                        biteIds
                        image {
                            original {
                                url
                            }
                        }
                        giphy {
                            gif
                        }
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

const MUTATION_CREATE_PLAYLIST = gql`
    mutation websiteCreateNewPlaylist($record: CreateOnePlaylistInput!) {
        web {
            playlistCreate(record: $record, analytics: {}) {
                record {
                    _id
                    title
                }
            }
        }
    }
`;

function isValidUrl(string) {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }

    return true;
}

const AddBoardScreen = props => {
    const [searchInput, setSearchInput] = useState("");
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [createNewBoard, setCreateNewBoard] = useState(props.createNewBoard);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [newUrlPlaylist, setPlaylistUrl] = useState("");
    const [showBoardSuccess, setShowBoardSuccess] = useState(false);

    const { loading, error, data, refetch } = useQuery(USER_BOARD_QUERY, {
        variables: { id: props.userId, playlistPage: 1 },
    });
    const [addBiteToPlaylist] = useMutation(MUTATION_UPDATE_PLAYLIST);
    const [createNewPlaylist] = useMutation(MUTATION_CREATE_PLAYLIST);

    useEffect(() => {
        const getData = async () => {
            const data = await (await refetch()).data;
            setFilteredPlaylists(data.web.userById.playlistPagination.items);
        };

        getData();
    }, []);

    const handleChange = value => {
        let list;
        if (value === "") {
            setFilteredPlaylists(data.web.userById.playlistPagination.items);
        } else {
            list = data.web.userById.playlistPagination.items.filter(d =>
                d.title.toLowerCase().includes(value.toLocaleLowerCase()),
            );
            setFilteredPlaylists(list);
        }
        setSearchInput(value);
    };

    const handleClickOnPlaylist = (event, playlist) => {
        const overlay = document.getElementById(`playlist-${playlist._id}`);
        const checkDiv = document.getElementById(`check-div`);
        const titleDiv = document.getElementById("title-div");
        const titleClone = titleDiv.cloneNode(true);
        titleClone.firstChild.replaceWith(`${playlist.title}`);
        let clone = checkDiv.cloneNode(true);
        if (selectedPlaylists.length === 0) {
            overlay.style.background = "#FE295C 0% 0% no-repeat padding-box";
            clone.style.display = "block";
            overlay.firstChild.replaceWith(clone);
            setSelectedPlaylists([...selectedPlaylists, playlist]);
        } else {
            let playlistInSelected = false;
            selectedPlaylists.map(alreadySelected => {
                if (alreadySelected.title === playlist.title) {
                    return (playlistInSelected = true);
                }
            });
            if (playlistInSelected) {
                let filtered = selectedPlaylists.filter(
                    item => item.title !== playlist.title,
                );
                overlay.style.backgroundColor = "rgba(0,0,0,0.2)";
                overlay.firstChild.replaceWith(titleClone);
                setSelectedPlaylists(filtered);
            } else {
                overlay.style.background =
                    "#FE295C 0% 0% no-repeat padding-box";
                clone.style.display = "block";
                overlay.firstChild.replaceWith(clone);
                setSelectedPlaylists([...selectedPlaylists, playlist]);
            }
        }
    };

    const handleCreateNewBoard = () => {
        createNewPlaylist({
            variables: {
                record: {
                    title: newPlaylistName,
                    biteIds: props.biteIds,
                    audienceRating: "UR",
                    visibility: "PUBLIC" || this.props.visibility,
                },
            },
        });
        setShowBoardSuccess(true);
        setTimeout(async () => {
            setShowBoardSuccess(false);
            setCreateNewBoard(false);
            const data = await refetch().data;
            setFilteredPlaylists(data.web.userById.playlistPagination.items);
        }, 1000);
    };

    const handleSubmitUrl = () => {
        if (isValidUrl(newUrlPlaylist)) {
            const playlistId = newUrlPlaylist.split("/").pop();
            addBiteToPlaylist({
                variables: { id: playlistId, biteId: props.biteIds[0] },
            });
            props.onFinishAddBite();
            return;
        }
    };

    const handleSubmit = () => {
        selectedPlaylists.map(playlist => {
            addBiteToPlaylist({
                variables: { id: playlist._id, biteId: props.biteIds[0] },
            });
        });
        props.onFinishAddBite();
    };

    if (loading) return <LoadingTinyScreen />;
    if (error) return <>{error.message}</>;

    return (
        <>
            {createNewBoard ? (
                <Centered>
                    {showBoardSuccess ? (
                        <SuccessOverlay
                            header='Awesome!'
                            paragraph='Board saved'
                            close={() =>
                                this.setState({ showSuccessOverlay: false })
                            }
                        />
                    ) : (
                        <></>
                    )}
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "24px",
                            margin: "10px",
                        }}
                    >
                        Add to board
                    </div>
                    <StyledInput
                        style={{ backgroundColor: `${ligherBackground}` }}
                        placeholder='New board name...'
                        value={newPlaylistName}
                        onChange={e => setNewPlaylistName(e.target.value)}
                    />
                    {newPlaylistName === "" ? (
                        <></>
                    ) : (
                        <GreyButton onClick={() => handleCreateNewBoard()}>
                            Create Board
                        </GreyButton>
                    )}
                    <div
                        style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                            alignSelf: "center",
                            marginTop: "20px",
                        }}
                        onClick={() => props.onFinishAddBite("cancel")}
                    >
                        Cancel
                    </div>
                </Centered>
            ) : (
                <>
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "24px",
                            margin: "10px",
                        }}
                    >
                        Add to board
                    </div>
                    <Container>
                        {(data &&
                            data.web &&
                            data.web.userSignedIn &&
                            data.web.userSignedIn.roles &&
                            data.web.userSignedIn.roles.indexOf("ADMIN") >
                                -1) ||
                        (data &&
                            data.web &&
                            data.web.userSignedIn &&
                            data.web.userSignedIn.roles &&
                            data.web.userSignedIn.roles.indexOf("MODERATOR") >
                                -1) ? (
                            <StyledInput
                                style={{
                                    backgroundColor: `${flyoutBackground}`,
                                }}
                                placeholder='Add to board by URL'
                                value={newUrlPlaylist}
                                onChange={e => setPlaylistUrl(e.target.value)}
                            />
                        ) : (
                            <></>
                        )}
                        {isValidUrl(newUrlPlaylist) ? (
                            <PinkButton
                                style={{
                                    margin: " 12px auto",
                                    fontSize: "16px",
                                    height: "40px",
                                    width: "120px",
                                }}
                                onClick={() => handleSubmitUrl()}
                            >
                                Add by URL
                            </PinkButton>
                        ) : (
                            <></>
                        )}
                        <GreyButton onClick={() => setCreateNewBoard(true)}>
                            New Board
                        </GreyButton>
                        <StyledInput
                            placeholder='Search your boards...'
                            value={searchInput}
                            onChange={e => handleChange(e.target.value)}
                        />
                        <BoardGrid>
                            {filteredPlaylists.map(playlist => {
                                return (
                                    <BoardGridItem
                                        key={playlist._id}
                                        url={playlist.image.original.url}
                                        onClick={e => {
                                            handleClickOnPlaylist(e, playlist);
                                        }}
                                    >
                                        <Overlay
                                            id={`playlist-${playlist._id}`}
                                        >
                                            <div
                                                id='title-div'
                                                style={{
                                                    alignSelf: "center",
                                                }}
                                            >
                                                {playlist.title}
                                            </div>
                                            <img
                                                style={{
                                                    alignSelf: "center",
                                                    display: "none",
                                                }}
                                                id='check-div'
                                                alt='checkmark'
                                                src='https://storage.googleapis.com/blerp_products/Twitch/Assets/checkmark.svg'
                                            />
                                        </Overlay>
                                    </BoardGridItem>
                                );
                            })}
                            <div
                                style={{ width: "100%", height: "40px" }}
                            ></div>
                        </BoardGrid>
                        <ShowMoreScrim
                            addedOne={selectedPlaylists.length !== 0}
                        >
                            <DownIcon />
                        </ShowMoreScrim>
                    </Container>
                    <Centered>
                        {selectedPlaylists.length !== 0 ? (
                            <PinkButton
                                style={{
                                    marginTop: "15px",
                                    fontSize: "16px",
                                    height: "32px",
                                    width: "40px",
                                }}
                                onClick={() => handleSubmit()}
                            >
                                Done
                            </PinkButton>
                        ) : (
                            <></>
                        )}
                        <div
                            style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginTop: "20px",
                            }}
                            onClick={() => props.onFinishAddBite("cancel")}
                        >
                            Cancel
                        </div>
                    </Centered>
                </>
            )}
        </>
    );
};

export default withData(AddBoardScreen);
