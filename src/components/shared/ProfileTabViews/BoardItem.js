import React, { useState, useRef } from "react";
import {
    BoardSquareContainer,
    BoardFavoriteIcon,
    BoardSquareContainerOverlay,
    BoardSquareText,
} from "./ProfileStyledComponents";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import Router from "next/router";
import withData from "../../../lib/withData";
import withRouter from "next/dist/client/with-router";
import { FavoriteIcon } from "../../theme/Icon";
import colors from "../../theme/colors";

const userFollowBoard = gql`
    mutation websiteUserFollowBoard($playlistId: MongoID!, $data: JSON) {
        web {
            followSoundboard(
                record: { playlistId: $playlistId }
                analytics: { data: $data }
            ) {
                followed
                playlist {
                    _id
                    followed
                }
                user {
                    _id
                    followSoundboardPagination(page: 1, perPage: 200) {
                        items {
                            _id
                            title
                            followed
                            __typename
                        }
                        __typename
                    }
                }
                __typename
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
                playlist {
                    _id
                    followed
                }
                user {
                    _id
                    followSoundboardPagination(page: 1, perPage: 200) {
                        items {
                            _id
                            title
                            followed
                            __typename
                        }
                        __typename
                    }
                }
                __typename
            }
        }
    }
`;

const BoardItem = props => {
    // const { loading, error, data } = useQuery(fetchUserProfileFavorites, { variables: { userId: props.signedInUserId, page: 1 }});
    const [followed, setFollowed] = useState(props.item.followed);
    const [followBoard] = useMutation(userFollowBoard);
    const [unFollowBoard] = useMutation(userUnfollowBoard);
    const buttonRef = useRef();

    const onMenuClick = event => {
        const bounds = buttonRef.current.getBoundingClientRect();
        props.setPosY(
            Math.round(bounds.y + bounds.height / 2 + window.scrollY),
        );
    };

    const {
        item,
        setShowBlerpsCard,
        setShowingBlerps,
        setShowingBoard,
        setUserCreated,
    } = props;

    const handleFollowClicked = (followed, id) => {
        if (!props.signedInUserId) {
            const redirect = `user/${props.router.query.username}`;
            Router.push(`/login?returnTo=${redirect}`);
        }
        if (followed) {
            unFollowBoard({
                variables: {
                    playlistId: id,
                },
            });
            setFollowed(false);
        } else {
            followBoard({
                variables: {
                    playlistId: id,
                    data: {
                        url: history.url,
                        searchQuery: props.query,
                    },
                },
            });
            setFollowed(true);
        }
    };

    // if(loading) return 'loadin'
    // if(error) return 'error'

    // if(data) {
    return (
        <BoardSquareContainer
            id={`${item._id}-${item.title}`}
            key={`${item._id}-${item.title}`}
            url={item.image.original.url}
        >
            <FavoriteIcon
                style={{
                    position: "absolute",
                    top: "-5px",
                    left: "-5px",
                    border: `4px solid ${colors.waxing}`,
                }}
                onClick={() => {
                    handleFollowClicked(
                        props.forceFollow || followed,
                        item._id,
                    );
                    setShowBlerpsCard(false);
                }}
                active={props.forceFollow || followed}
                url='https://storage.googleapis.com/blerp_products/Web/Account/White%20heart.svg'
            />
            <BoardSquareContainerOverlay
                ref={buttonRef}
                onClick={e => {
                    setShowBlerpsCard(true);
                    setShowingBlerps(item.bitesPagination.items);
                    setShowingBoard(item);
                    setUserCreated(item.ownerObject);
                    onMenuClick(e);
                    document
                        .getElementById(`${item._id}-${item.title}`)
                        .focus();
                }}
            >
                <BoardSquareText>{item.title}</BoardSquareText>
            </BoardSquareContainerOverlay>
        </BoardSquareContainer>
    );
};

export default withRouter(BoardItem);
