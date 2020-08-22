import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as ReactDOM from "react-dom";
import {
    BaseModal,
    ModalTitle,
    ModalCard,
    TheBlur,
    Column,
} from "../Modal/BaseModal";
import CenteredContent from "../Modal/CenteredContent";
import PinkButton from "../../buttons/pink-button";
import { lightGray, seafoam } from "../../../styles/colors";
import UnderlineButton from "../Modal/UnderlineButton";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { DropdownWrapper } from "../Dropdown/DropDownStyledComponents";
import Dropdown from "../Dropdown/Dropdown";

const ProfileSettingsGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 33px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
`;

const ProfileSettingsGridItem = styled.div`
    width: 80%;
    padding-left: 34px;
`;

const StyledInput = styled.input`
    background-color: rgba(0, 0, 0, 0);
    width: 90%;
    height: 24px;
    font-size: 17px;
    font-weight: 6;
    color: ${props => props.theme.defaultText};
    border: none;
    border-radius: 0px;
    border-bottom: 2px solid
        ${props =>
            props.value.includes("https://" || "http://")
                ? props.theme.seafoam
                : props.theme.pandaPink};

    &:focus {
        border-radius: 0px;
        border: none !important;
        color: ${props => props.theme.darkText};
        border-bottom: 2px solid ${props => props.theme.darkText} !important;
    }

    &::-webkit-calendar-picker-indicator {
        color: ${props => props.theme.lightGray};
    }
`;

const InputLabel = styled.div`
    font-size: 16px;
`;

const UPDATE_PROFILE_MUTATION = gql`
    mutation webUpdateProfileSocial($record: UserSocialInput!) {
        web {
            updateUserSocial(record: $record) {
                _id
                socialLinks {
                    name
                    link
                }
            }
        }
    }
`;

const SocialModal = props => {
    const [twitchInput, setTwitchInput] = useState("");
    const [twitterInput, setTwitterInput] = useState("");
    const [youtubeInput, setYoutubeInput] = useState("");
    const [instagramInput, setInstagramInput] = useState("");
    const [pinterestInput, setPinterestInput] = useState("");
    const [facebookInput, setFacebookInput] = useState("");
    const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION);

    useEffect(() => {
        const modalRoot = document.getElementById("blerp-modal-root");
        // modalRoot.appendChild(this.el);
        document.addEventListener("mousedown", e =>
            handleOutsideModalClicked(e),
        );

        if (props.user.socialLinks) {
            props.user.socialLinks.map((socialItem, index) => {
                console.log(socialItem.name);
                switch (socialItem.name) {
                    case "twitch":
                        setTwitchInput(socialItem.link);
                        break;
                    case "twitter":
                        setTwitterInput(socialItem.link);
                        break;
                    case "youtube":
                        setYoutubeInput(socialItem.link);
                        break;
                    case "instagram":
                        setInstagramInput(socialItem.link);
                        break;
                    case "pinterest":
                        setPinterestInput(socialItem.link);
                        break;
                    case "facebook":
                        setFacebookInput(socialItem.link);
                        break;
                    default:
                        break;
                }
            });
        }
    }, []);

    const handleOutsideModalClicked = e => {
        const domNode = ReactDOM.findDOMNode(
            document.getElementById("settings-modal"),
        );

        // Detects if there was an outside click
        if (!domNode || !domNode.contains(e.target)) {
            props.onClose();
        }
    };

    const handleUpdateProfile = () => {
        let updatedArray = [];
        if (twitchInput) {
            updatedArray.push({ name: "twitch", link: twitchInput });
        }

        if (twitterInput) {
            updatedArray.push({ name: "twitter", link: twitterInput });
        }

        if (youtubeInput) {
            updatedArray.push({ name: "youtube", link: youtubeInput });
        }

        if (instagramInput) {
            updatedArray.push({ name: "instagram", link: instagramInput });
        }

        if (pinterestInput) {
            updatedArray.push({ name: "pinterest", link: pinterestInput });
        }

        if (facebookInput) {
            updatedArray.push({ name: "facebook", link: facebookInput });
        }

        console.log(updatedArray);

        updateProfile({
            variables: {
                record: {
                    id: props.user._id,
                    socialLinks: updatedArray,
                },
            },
        });

        props.onClose();
    };

    return (
        <>
            <BaseModal fullscreen>
                <TheBlur />
                <Column id='settings-modal'>
                    <ModalCard style={{ width: "560px", height: "auto" }}>
                        <form onSubmit={() => handleUpdateProfile()}>
                            <CenteredContent>
                                <ModalTitle style={{ fontSize: "28px" }}>
                                    Social Links
                                </ModalTitle>
                                <ProfileSettingsGrid>
                                    <ProfileSettingsGridItem>
                                        <InputLabel>Twitch</InputLabel>
                                        <StyledInput
                                            type='url'
                                            placeholder='Twitch URL...'
                                            value={twitchInput}
                                            onChange={e =>
                                                setTwitchInput(e.target.value)
                                            }
                                        />
                                    </ProfileSettingsGridItem>
                                    <ProfileSettingsGridItem>
                                        <InputLabel>Twitter</InputLabel>
                                        <StyledInput
                                            type='url'
                                            placeholder='Twitter URL...'
                                            value={twitterInput}
                                            onChange={e =>
                                                setTwitterInput(e.target.value)
                                            }
                                        />
                                    </ProfileSettingsGridItem>
                                    <ProfileSettingsGridItem>
                                        <InputLabel>Youtube</InputLabel>
                                        <StyledInput
                                            type='url'
                                            placeholder='Youtube URL...'
                                            value={youtubeInput}
                                            onChange={e =>
                                                setYoutubeInput(e.target.value)
                                            }
                                        />
                                    </ProfileSettingsGridItem>
                                    <ProfileSettingsGridItem>
                                        <InputLabel>Instagram</InputLabel>
                                        <StyledInput
                                            type='url'
                                            placeholder='Instagram URL...'
                                            value={instagramInput}
                                            onChange={e =>
                                                setInstagramInput(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </ProfileSettingsGridItem>
                                    <ProfileSettingsGridItem>
                                        <InputLabel>Pinterest</InputLabel>
                                        <StyledInput
                                            type='url'
                                            placeholder='Pinterest URL...'
                                            value={pinterestInput}
                                            onChange={e =>
                                                setPinterestInput(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </ProfileSettingsGridItem>
                                    <ProfileSettingsGridItem>
                                        <InputLabel>Facebook</InputLabel>
                                        <StyledInput
                                            type='url'
                                            placeholder='Facebook URL...'
                                            value={facebookInput}
                                            onChange={e =>
                                                setFacebookInput(e.target.value)
                                            }
                                        />
                                    </ProfileSettingsGridItem>
                                </ProfileSettingsGrid>
                                <PinkButton
                                    style={{
                                        marginTop: "45px",
                                        fontSize: "18px",
                                        width: "88px",
                                        height: "40px",
                                    }}
                                    type='submit'
                                >
                                    Done
                                </PinkButton>
                                <UnderlineButton
                                    style={{
                                        marginBottom: "10px",
                                        fontWeight: "5",
                                    }}
                                    onClick={() => props.onClose()}
                                >
                                    Cancel
                                </UnderlineButton>
                            </CenteredContent>
                        </form>
                    </ModalCard>
                </Column>
            </BaseModal>
        </>
    );
};

export default SocialModal;
