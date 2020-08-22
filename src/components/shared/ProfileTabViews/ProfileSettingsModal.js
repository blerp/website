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
import Button from "../../buttons/button";
import UnderlineButton from "../Modal/UnderlineButton";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Dropdown from "../Dropdown/Dropdown";
import Link from "next/link";

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

const ProfileSettingsColumn = styled(Column)`
    @media (max-width: 490px) {
        padding: 0px;
    }
`;

const ProfileSettingsModalCard = styled(ModalCard)`
    position: relative;
    @media (max-width: 490px) {
        position: absolute;
        overflow: scroll;
        height: 100%;
    }
`;

const ProfileSettingsGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    row-gap: 33px;
    margin: auto;
    justify-content: center;

    @media (max-width: 490px) {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
    }
`;

const ProfileSettingsGridItem = styled.div`
    padding: 0px 30px;
    @media (max-width: 490px) {
        padding: 0px 30px;
    }
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
    border-bottom: 2px solid ${props => props.theme.lightGray};

    &:focus {
        border-radius: 4px;
        border: none;
    }

    &::-webkit-calendar-picker-indicator {
        color: ${props => props.theme.lightGray};
    }
`;

const InputLabel = styled.div`
    font-size: 16px;
`;

const UPDATE_PROFILE_MUTATION = gql`
    mutation webUpdateProfileInfo($record: UserInfoInput!) {
        web {
            updateUserInfo(record: $record) {
                _id
                firstName
                lastName
                email
                username
                birthday
                gender
                profileType
            }
        }
    }
`;

const ProfileSettingsModal = props => {
    const [yearInput, setYearInput] = useState(props.user.birthday);
    const [firstNameInput, setFirstNameInput] = useState(props.user.firstName);
    const [lastNameInput, setLastNameInput] = useState(props.user.lastName);
    const [userNameInput, setUserNameInput] = useState(props.user.username);
    const [birthdayInput, setBirthdayInput] = useState(props.user.birthday);
    const [profileType, setProfileType] = useState(props.user.profileType);
    const [today, setToday] = useState(new Date());
    const [gender, setGender] = useState(props.user.gender);
    const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION);

    useEffect(() => {
        const formatDate = date => {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
        };

        const modalRoot = document.getElementById("blerp-modal-root");
        // modalRoot.appendChild(this.el);
        document.addEventListener("mousedown", e =>
            handleOutsideModalClicked(e),
        );
        // this.closeButton.focus();
        setToday(formatDate(new Date()));
        if (props.user) {
            setYearInput(props.user.birthday);
            setFirstNameInput(props.user.firstName);
            setLastNameInput(props.user.lastName);
            setUserNameInput(props.user.username);
            setBirthdayInput(
                (props.user.birthday && props.user.birthday.split("T")[0]) ||
                    formatDate(new Date()),
            );
            setProfileType(props.user.profileType);
            setGender(props.user.gender);
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
        updateProfile({
            variables: {
                record: {
                    id: props.user._id,
                    profileType: profileType,
                    birthday: birthdayInput,
                    firstName: firstNameInput,
                    lastName: lastNameInput,
                    userName: userNameInput,
                    gender: gender,
                },
            },
        });

        props.onClose();
    };

    return (
        <>
            <BaseModal fullscreen>
                <TheBlur style={{ left: "0px", top: "0px" }} />
                <ProfileSettingsColumn id='settings-modal'>
                    <ProfileSettingsModalCard>
                        <CenteredContent
                            style={{
                                position: "relative",
                            }}
                        >
                            <CloseButton onClick={() => props.onClose()} />
                            <ModalTitle style={{ fontSize: "28px" }}>
                                Profile Settings
                            </ModalTitle>

                            <ProfileSettingsGrid>
                                <ProfileSettingsGridItem>
                                    <InputLabel>Profile Type</InputLabel>
                                    <Dropdown
                                        currentSelection={profileType}
                                        icon='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Down.svg'
                                        onSelect={option =>
                                            setProfileType(option)
                                        }
                                        options={["Normal", "Private"]}
                                    />
                                </ProfileSettingsGridItem>
                                <ProfileSettingsGridItem>
                                    <InputLabel>Birthday</InputLabel>
                                    <StyledInput
                                        placeholder='Year born...'
                                        type='date'
                                        min='1940-01-01'
                                        max={today}
                                        value={birthdayInput}
                                        onChange={e =>
                                            setBirthdayInput(e.target.value)
                                        }
                                    />
                                </ProfileSettingsGridItem>
                                <ProfileSettingsGridItem>
                                    <InputLabel>First Name</InputLabel>
                                    <StyledInput
                                        placeholder='First name...'
                                        value={firstNameInput}
                                        onChange={e =>
                                            setFirstNameInput(e.target.value)
                                        }
                                    />
                                </ProfileSettingsGridItem>
                                <ProfileSettingsGridItem>
                                    <InputLabel>Last Name</InputLabel>
                                    <StyledInput
                                        placeholder='Last name'
                                        value={lastNameInput}
                                        onChange={e =>
                                            setLastNameInput(e.target.value)
                                        }
                                    />
                                </ProfileSettingsGridItem>
                                <ProfileSettingsGridItem>
                                    <InputLabel>User Name</InputLabel>
                                    <StyledInput
                                        placeholder='User name...'
                                        value={userNameInput}
                                        onChange={e =>
                                            setUserNameInput(e.target.value)
                                        }
                                    />
                                </ProfileSettingsGridItem>
                                <ProfileSettingsGridItem>
                                    <InputLabel>Gender</InputLabel>
                                    <Dropdown
                                        currentSelection={gender}
                                        icon='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Down.svg'
                                        onSelect={option => setGender(option)}
                                        options={[
                                            "Male",
                                            "Female",
                                            "Other",
                                            "Prefer Not To Say",
                                        ]}
                                    />
                                </ProfileSettingsGridItem>
                                <ProfileSettingsGridItem
                                    style={{ gridColumn: "span 2" }}
                                >
                                    <InputLabel>Email</InputLabel>
                                    <StyledInput
                                        value={props.user.email}
                                        disabled
                                    />
                                </ProfileSettingsGridItem>
                            </ProfileSettingsGrid>
                            <Link href='/logout'>
                                <Button
                                    style={{
                                        marginTop: "15px",
                                        fontSize: "18px",
                                        borderRadius: "100px",
                                        height: "40px",
                                        cursor: "pointer",
                                        fontWeight: "5",
                                    }}
                                >
                                    Logout
                                </Button>
                            </Link>
                            <PinkButton
                                style={{
                                    marginTop: "10px",
                                    marginBottom: "0px",
                                    fontSize: "18px",
                                    width: "88px",
                                    height: "40px",
                                }}
                                onClick={() => handleUpdateProfile()}
                            >
                                Done
                            </PinkButton>
                            <UnderlineButton
                                style={{
                                    marginTop: "15px",
                                    marginBottom: "10px",
                                    fontWeight: "5",
                                    height: "40px",
                                }}
                                onClick={() => props.onClose()}
                            >
                                Cancel
                            </UnderlineButton>
                        </CenteredContent>
                    </ProfileSettingsModalCard>
                </ProfileSettingsColumn>
            </BaseModal>
        </>
    );
};

export default ProfileSettingsModal;
