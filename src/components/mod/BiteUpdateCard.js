import React, { useState, useEffect } from "react";
import Bite from "../bite";
import { GreyButton, Icon, BaseModal } from "../shared/Modal/BaseModal";
import TagsInput from "../admin/tag-input";

import styled from "styled-components";
import Dropdown from "../shared/Dropdown/Dropdown";
import { doubleDarkBlue, yellow, focusState } from "../../styles/colors";
import countryList from "react-select-country-list";
import InputList from "../shared/InputList/InputList";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import PinkButton from "../buttons/pink-button";
import Button from "../theme/Button";
import CategoryHelpModal from "./CategoryHelpModal";

const BiteEditLabel = styled.div`
    font-size: 16px;
    margin-bottom: 10px;
    color: ${props => props.theme.darkText};
`;

const BiteEditStyledInput = styled.input`
    height: 40px;
    background: ${props =>
            props.disabled
                ? props.theme.flyoutBackground
                : props.theme.defaultBackground}
        0% 0% no-repeat padding-box;
    border-radius: 8px;
    border: 0px;
    width: 100%;
    padding: 0 0 0 15px;
`;

const CategoryButton = styled.button`
    background-color: ${props =>
        props.active ? props.activeColor : props.theme.flyoutBackground};
    border: 0px;
    height: 34px;
    padding: 5px 10px;
    width: auto;
    font-size: 16px;
    color: ${props =>
        props.active ? props.theme.flyoutBackground : props.theme.darkText};
    margin-right: 10px;

    &:focus {
        border: 0px !important;
    }

    &:hover {
        background-color: ${props => props.theme.lightGray};
    }
`;

const OptionItemText = styled.div`
    color: ${props => props.theme.lightGray};
    text-align: center;
    font-weight: 300;
`;

const OptionItemIcon = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 20px;
    height: 20px;
    margin: 0 auto;
`;

const OptionItem = styled.div`
    cursor: pointer;

    &:hover ${OptionItemIcon} {
        background-image: url(${props => props.hoverUrl});
    }

    &:hover ${OptionItemText} {
        color: ${props => props.theme.darkText};
    }
`;

const OptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const CategoryButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const InputContainer = styled.div`
    width: 100%;
    margin: 20px;
`;

const CenterContent = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    position: relative;
`;

const Card = styled.div`
    width: 90%;
    max-width: 1162px;
    height: auto;
    background: ${props => props.theme.flyoutBackground} 0% 0% no-repeat
        padding-box;
    border-radius: 8px;
    display: grid;
    grid-template-columns: 35% auto;
    column-gap: 20px;
    padding: 40px;
    margin-bottom: 60px;
    overflow-x: hidden;

    @media (max-width: 1160px) {
        width: 100%;
    }
`;

const CuratedCircle = styled.div`
    width: 26px;
    height: 24px;
    background-color: ${props =>
        props.isCurated ? props.theme.seafoam : props.theme.darkGray};
    border-radius: 50%;
    margin-left: 10px;
`;

const CuratedText = styled.div`
    font-size: 12px;
    width: auto;
    height: auto;
`;

const StyledOption = styled.option``;

const StyledSelect = styled.select`
    background-color: ${props => props.theme.defaultBackground};
    border: none;
    width: 100%;
    height: 35px;
    padding: 0 5px;
    border-radius: 4px;
    color: ${props => props.theme.secondaryGray};
    font-weight: 300;

    &:focus {
        border: none !important;
    }
`;

const ProfileImage = styled.div`
    background-image: url(${props =>
        props.url
            ? props.url
            : "https://storage.googleapis.com/blerp_products/Web/Account/My%20Blerps%20Selected.svg?folder=true&organizationId=true"});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    width: 30px;
    height: 30px;
`;

const ProfileContainer = styled.a`
    cursor: pointer;
    display: flex;
    justify-content: space-around;
`;

const StyledBite = styled(Bite)`
    margin: 0 auto;
`;

const UPDATE_BITE_INFO = gql`
    mutation updateBiteInfo($bite: UpdateByIdBiteInput!) {
        web {
            biteUpdateById(record: $bite) {
                record {
                    _id
                    title
                    color
                    description
                    isCurated
                    transcription
                    favorited
                    updatedAt
                    userAudioQuality
                    userLocale
                    playCount
                    userKeywords
                    userEmotion
                    userCategory
                    author
                    visibility
                    audienceRating
                    lastCurator {
                        _id
                        username
                        profileImage {
                            original {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`;

const BiteUpdateCard = ({ bite, prefetchLink, userSignedIn, type }) => {
    const [blerpVisibility, setBlerpVisibility] = useState(bite.visibility);
    const [blerpCountry, setBlerpCountry] = useState(
        bite.userLocale || "United States",
    );
    const [blerpTitle, setBlerpTitle] = useState(bite.title);
    const [blerpAuthor, setBlerpAuthor] = useState(bite.author);
    const [blerpDescription, setBlerpDescription] = useState(bite.description);
    const [blerpAudioTranscription, setBlerpAudioTranscription] = useState(
        bite.userTranscription,
    );
    const [blerpCategory, setBlerpCategory] = useState(bite.userCategory);
    const [blerpAudioQuality, setBlerpAudioQuality] = useState(
        bite.userAudioQuality,
    );
    const [blerpRating, setBlerpRating] = useState(bite.audienceRating);
    const [blerpEmotion, setBlerpEmotion] = useState(bite.userEmotion);
    const [blerpTags, setBlerpTags] = useState(bite.userKeywords);
    const [images, setImages] = useState();
    const [countryOptions, setCountryOptions] = useState(
        countryList().getData(),
    );

    const [showCategoryHelpModal, setShowCategoryHelpModal] = useState(false);

    const [updateBiteInfo] = useMutation(UPDATE_BITE_INFO);

    useEffect(() => {
        const imageList = [
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/1%20bad%20quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/1%20bad%20hover.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/1%20bad%20selected.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/2%20decent%20quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/2%20decent%20hover.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/2%20decent%20selected.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/3%20ok%20quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/3%20ok%20hover.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/3%20ok%20selected.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/4%20good%20quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/4%20good%20hover.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/4%20good%20selected.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/5%20great%20quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/5%20great%20hover.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/5%20great%20selected.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20quite.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20hover.svg?folder=true&organizationId=true",
            "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20selected.svg?folder=true&organizationId=true",
        ];
        setImages(
            imageList.map(image => {
                const img = new Image();
                img.src = image;
                return img;
            }),
        );
    }, []);

    const audioQualityOptions = [
        {
            value: 1,
            url:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/1%20bad%20quite.svg?folder=true&organizationId=true",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/1%20bad%20hover.svg?folder=true&organizationId=true",
            selectedUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/1%20bad%20selected.svg?folder=true&organizationId=true",
        },
        {
            value: 2,
            url:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/2%20decent%20quite.svg?folder=true&organizationId=true",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/2%20decent%20hover.svg?folder=true&organizationId=true",
            selectedUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/2%20decent%20selected.svg?folder=true&organizationId=true",
        },
        {
            value: 3,
            url:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/3%20ok%20quite.svg?folder=true&organizationId=true",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/3%20ok%20hover.svg?folder=true&organizationId=true",
            selectedUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/3%20ok%20selected.svg?folder=true&organizationId=true",
        },
        {
            value: 4,
            url:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/4%20good%20quite.svg?folder=true&organizationId=true",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/4%20good%20hover.svg?folder=true&organizationId=true",
            selectedUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/4%20good%20selected.svg?folder=true&organizationId=true",
        },
        {
            value: 5,
            url:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/5%20great%20quite.svg?folder=true&organizationId=true",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/5%20great%20hover.svg?folder=true&organizationId=true",
            selectedUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/5%20great%20selected.svg?folder=true&organizationId=true",
        },
    ];

    const ratingOptions = [
        {
            value: "G",
            url:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20quite.svg?folder=true&organizationId=true",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20hover.svg?folder=true&organizationId=true",
            selectedUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20selected.svg?folder=true&organizationId=true",
        },
        {
            value: "PG",
            url:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20quite.svg?folder=true&organizationId=true",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20hover.svg?folder=true&organizationId=true",
            selectedUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20selected.svg?folder=true&organizationId=true",
        },
        {
            value: "PG13",
            url:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20quite.svg?folder=true&organizationId=true",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20hover.svg?folder=true&organizationId=true",
            selectedUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20selected.svg?folder=true&organizationId=true",
        },
        {
            value: "R",
            url:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20quite.svg?folder=true&organizationId=true",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20hover.svg?folder=true&organizationId=true",
            selectedUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20selected.svg?folder=true&organizationId=true",
        },
        {
            value: "UR",
            url:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20quite.svg?folder=true&organizationId=true",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20hover.svg?folder=true&organizationId=true",
            selectedUrl:
                "https://storage.googleapis.com/blerp_products/Web/Moderation%20Dashboard/rating%20circle%20selected.svg?folder=true&organizationId=true",
        },
    ];

    const updateColor = () => {
        switch (blerpCategory) {
            case "sound effect":
                setActiveColor(doubleDarkBlue);
                break;
            case "song":
                setActiveColor(yellow);
                break;
            case "quote":
                setActiveColor(focusState);
                break;
            default:
                break;
        }
    };

    const updateBlerp = () => {
        updateBiteInfo({
            variables: {
                bite: {
                    _id: bite._id,
                    title: blerpTitle,
                    description: blerpDescription,
                    isCurated: true,
                    transcription: blerpAudioTranscription,
                    userAudioQuality: blerpAudioQuality,
                    userLocale: blerpCountry,
                    userKeywords: blerpTags,
                    userEmotion: blerpEmotion,
                    userCategory: blerpCategory,
                    author: blerpAuthor,
                    visibility: blerpVisibility,
                    audienceRating: blerpRating,
                    lastCuratorId: userSignedIn._id,
                },
            },
        });
    };

    return (
        <Card>
            <Column>
                <CenterContent>
                    <StyledBite
                        key={bite._id}
                        id={bite._id}
                        title={bite.title}
                        audioSourceUrls={[
                            bite.audio && bite.audio.mp3.url,
                            bite.audio && bite.audio.original.url,
                        ]}
                        color={bite.color}
                        image={
                            (bite.image && bite.image.original.url) ||
                            (bite.giphy && bite.giphy.gif)
                        }
                        favorited={bite.favorited}
                        playCount={bite.playCount}
                        prefetchLink={prefetchLink}
                        preload={true}
                        isCurated={bite.isCurated}
                        bite={bite}
                    />
                    {type === "SCRAPED" ? (
                        <GreyButton>Update Image</GreyButton>
                    ) : (
                        <></>
                    )}
                </CenterContent>
                <Row>
                    <InputContainer>
                        <BiteEditLabel>Tags</BiteEditLabel>
                        <InputList
                            setInfo={list => setBlerpTags(list)}
                            isTag
                            light
                            list={blerpTags}
                            placeholder='Add a Tag'
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <BiteEditLabel>Blerp Language/Country</BiteEditLabel>
                        <StyledSelect
                            value={blerpCountry}
                            onChange={e => setBlerpCountry(e.target.value)}
                        >
                            {countryOptions.map(country => {
                                return (
                                    <StyledOption
                                        selected={
                                            country.label === blerpCountry
                                        }
                                        key={country.value}
                                        value={country.label}
                                    >
                                        {country.label}
                                    </StyledOption>
                                );
                            })}
                        </StyledSelect>
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <BiteEditLabel>Visibility</BiteEditLabel>
                        <Dropdown
                            currentSelection={blerpVisibility}
                            icon='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Down.svg'
                            onSelect={option => setBlerpVisibility(option)}
                            options={["Public", "Private"]}
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <BiteEditLabel style={{ textAlign: "center" }}>
                            Created By
                        </BiteEditLabel>
                        <ProfileContainer
                            style={{
                                alignContent: "center",
                                textDecoration: "none",
                                width: "60%",
                                margin: "0 auto",
                            }}
                            href={`/user/${bite.ownerObject._id}`}
                        >
                            <ProfileImage
                                url={
                                    bite.ownerObject.profileImage &&
                                    bite.ownerObject.profileImage.original.url
                                }
                            />
                            <BiteEditLabel style={{ fontSize: "20px" }}>
                                {bite.ownerObject.username}
                            </BiteEditLabel>
                        </ProfileContainer>
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <BiteEditLabel style={{ textAlign: "center" }}>
                            Created At {bite.createdAt.split("T")[0]}
                        </BiteEditLabel>
                    </InputContainer>
                </Row>
            </Column>
            <Column>
                <Row
                    style={{
                        position: "absolute",
                        top: "-35px",
                        right: "0px",
                        width: "auto",
                        alignItems: "center",
                    }}
                >
                    {bite.isCurated ? (
                        <ProfileContainer
                            style={{
                                alignContent: "center",
                                textDecoration: "none",
                                margin: "0",
                            }}
                            href={`/user/${
                                bite.lastCurator ? bite.lastCurator._id : ""
                            }`}
                        >
                            <ProfileImage
                                url={
                                    bite.lastCurator &&
                                    bite.lastCurator.profileImage &&
                                    bite.lastCurator.profileImage.original.url
                                }
                            />
                            <BiteEditLabel style={{ fontSize: "20px" }}>
                                {bite.lastCurator && bite.lastCurator.username}
                            </BiteEditLabel>
                            <CuratedCircle isCurated={bite.isCurated} />
                        </ProfileContainer>
                    ) : (
                        <>
                            <CuratedText>Not Yet Curated</CuratedText>
                            <CuratedCircle isCurated={bite.isCurated} />
                        </>
                    )}
                </Row>
                <Row>
                    <InputContainer>
                        <BiteEditLabel>Blerp Title</BiteEditLabel>
                        <BiteEditStyledInput
                            disabled={type !== "SCRAPED"}
                            value={blerpTitle}
                            onChange={e => setBlerpTitle(e.target.value)}
                        />
                    </InputContainer>
                    <InputContainer>
                        <BiteEditLabel>Original Source</BiteEditLabel>
                        <BiteEditStyledInput
                            value={blerpAuthor}
                            onChange={e => setBlerpAuthor(e.target.value)}
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <BiteEditLabel>Description</BiteEditLabel>
                        <BiteEditStyledInput
                            // disabled={type !== "SCRAPED"}
                            value={blerpDescription}
                            onChange={e => setBlerpDescription(e.target.value)}
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <BiteEditLabel>Audio Transcription</BiteEditLabel>
                        <BiteEditStyledInput
                            value={blerpAudioTranscription}
                            onChange={e =>
                                setBlerpAudioTranscription(e.target.value)
                            }
                        />
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        {showCategoryHelpModal ? (
                            <CategoryHelpModal
                                show={showCategoryHelpModal}
                                onClose={() => setShowCategoryHelpModal(false)}
                            />
                        ) : (
                            <></>
                        )}
                        <BiteEditLabel>
                            Category
                            <div
                                style={{
                                    cursor: "pointer",
                                    display: "inline",
                                    fontSize: "12px",
                                    marginLeft: "5px",
                                    border: "1px solid black",
                                    borderRadius: "15px",
                                    padding: "1px 4px",
                                }}
                                onClick={() => setShowCategoryHelpModal(true)}
                            >
                                ?
                            </div>
                        </BiteEditLabel>
                        <CategoryButtons>
                            <Button
                                buttonType={
                                    blerpCategory &&
                                    blerpCategory.toLowerCase() ===
                                        "sound effect"
                                        ? "primary"
                                        : "secondary"
                                }
                                color='invisible'
                                activeColor='yellow'
                                active={blerpCategory === "sound effect"}
                                onClick={() => setBlerpCategory("sound effect")}
                            >
                                Sound effect
                            </Button>
                            <Button
                                buttonType={
                                    blerpCategory &&
                                    blerpCategory.toLowerCase() === "song"
                                        ? "primary"
                                        : "secondary"
                                }
                                color='invisible'
                                activeColor='seafoam'
                                active={blerpCategory === "song"}
                                onClick={() => setBlerpCategory("song")}
                            >
                                Song
                            </Button>
                            <Button
                                buttonType={
                                    blerpCategory &&
                                    blerpCategory.toLowerCase() === "quote"
                                        ? "primary"
                                        : "secondary"
                                }
                                color='invisible'
                                activeColor='lightBlue'
                                onClick={() => setBlerpCategory("quote")}
                            >
                                Quote
                            </Button>
                        </CategoryButtons>
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <BiteEditLabel>Audio Quality</BiteEditLabel>
                        <OptionContainer>
                            {audioQualityOptions.map((item, index) => (
                                <OptionItem
                                    key={`option-item-${item.value}`}
                                    onClick={() =>
                                        setBlerpAudioQuality(item.value)
                                    }
                                    hoverUrl={item.hoverUrl}
                                >
                                    <OptionItemIcon
                                        url={
                                            blerpAudioQuality === item.value
                                                ? item.selectedUrl
                                                : item.url
                                        }
                                    />
                                    <OptionItemText>
                                        {item.value}
                                    </OptionItemText>
                                </OptionItem>
                            ))}
                        </OptionContainer>
                    </InputContainer>
                    <InputContainer>
                        <BiteEditLabel>Rating</BiteEditLabel>
                        <OptionContainer>
                            {ratingOptions.map((item, index) => (
                                <OptionItem
                                    key={`option-item-${item.value}`}
                                    onClick={() => setBlerpRating(item.value)}
                                    hoverUrl={item.hoverUrl}
                                >
                                    <OptionItemIcon
                                        url={
                                            blerpRating === item.value
                                                ? item.selectedUrl
                                                : item.url
                                        }
                                    />
                                    <OptionItemText>
                                        {item.value}
                                    </OptionItemText>
                                </OptionItem>
                            ))}
                        </OptionContainer>
                    </InputContainer>
                </Row>
                <Row>
                    <InputContainer>
                        <BiteEditLabel>Emotion</BiteEditLabel>
                        <InputList
                            setInfo={list => setBlerpEmotion(list)}
                            darkBackground
                            isTag={false}
                            light
                            list={blerpEmotion}
                            recommendedList={[
                                "Anger",
                                "Happiness",
                                "Sadness",
                                "Surprise",
                                "Disgust",
                                "Fear",
                            ]}
                            placeholder='Add a new emotion to describe what this Blerp is.'
                        />
                    </InputContainer>
                </Row>
            </Column>
            <Row style={{ gridColumn: "span 2", placeContent: "center" }}>
                <PinkButton onClick={() => updateBlerp()}>
                    Update Blerp
                </PinkButton>
            </Row>
        </Card>
    );
};

export default BiteUpdateCard;
