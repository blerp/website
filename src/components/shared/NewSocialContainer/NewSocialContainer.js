import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Mutation } from "@apollo/client/react/components";
import { useMutation } from "@apollo/client";

import gql from "graphql-tag";
import withData from "../../../lib/withData";

import { bodyText } from "../../../styles/colors";
import { withRouter } from "next/router";

const MainTitle = styled.div`
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    color: ${bodyText};
    margin: 8px;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-content: space-around;
    width: 190px;
    height: ${props => (props.showIcons === true ? "100%" : "0px")};
    transition: 0.5s;
`;

const GridItem = styled.div`
    width: 60px;
    height: auto;
    align-self: center;
    opacity: ${props => (props.showIcons === true ? "1" : "0")};
    visibility: ${props => (props.showIcons === true ? "visible" : "hidden")};
    transition: 0.2s;
    transition-delay: ${props => (props.showIcons === true ? ".3s" : ".1s")};
    transition-property: opacity, visiblity;
`;

const StyleLink = styled.a``;

const SocialLogo = styled.div`
    height: 50px;
    padding: 4px;
    opacity: 1;
    cursor: pointer;
    background: url(${props => props.imageSrc}) center no-repeat;

    &:hover {
        background: url(${props => props.hoverSrc}) center no-repeat;
    }
`;

const Icon = styled.div`
    background-image: url(${props => props.iconUrl});
    background-repeat: no-repeat;
    background-size: contain;
    align-self: center;
    height: 15px;
    width: 15px;
    margin: 0 0 0 15px;
`;

const ButtonTextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonText = styled.div`
    text-align: center;
    cursor: pointer;
`;

const LOG_ACTION = gql`
    mutation logAction($action: String!, $data: JSON) {
        web {
            logAction(action: $action, data: $data) {
                success
            }
        }
    }
`;

const CREATE_SHARE = gql`
    mutation createShare(
        $_id: MongoID!
        $playlistId: MongoID
        $biteId: MongoID
        $searchQuery: String
        $pageUrl: String
    ) {
        web {
            share(
                _id: $_id
                playlistId: $playlistId
                biteId: $biteId
                searchQuery: $searchQuery
                pageUrl: $pageUrl
            ) {
                _id
                userId
                searchQuery
                pageUrl
                bite {
                    _id
                    title
                    image {
                        original {
                            url
                        }
                    }
                }
                playlist {
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
    }
`;

function getQueryStringValue(key) {
    return decodeURIComponent(
        window.location.search.replace(
            new RegExp(
                "^(?:.*[&\\?]" +
                    encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") +
                    "(?:\\=([^&]*))?)?.*$",
                "i",
            ),
            "$1",
        ),
    );
}

const NewSocialConatiner = props => {
    const [showIcons, setShowIcons] = useState(true);
    const [images, setImages] = useState([]);

    const [newShare] = useMutation(CREATE_SHARE);

    useEffect(() => {
        const pictures = [
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/Download%20grey.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/Download%20hover.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/FB%20grey.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/FB%20hover.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/Pinterest%20Grey.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/Pinterest%20hover.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/reddit%20grey.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/reddit%20hover.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/twitter%20grey.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/twitter%20hover.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/tumbler%20grey.svg",
            "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/tubmbler%20hover.svg",
            "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Down.svg",
            "https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Right.svg",
        ];

        setImages(
            pictures.map(picture => {
                const img = new Image();
                img.src = picture;
                return img;
            }),
        );
    }, []);

    const DefaultSocialMediaBiteItems = [
        {
            name: "Download",
            iconUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/Download%20grey.svg",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/Download%20hover.svg",
            createShareUrl: id => {
                return `http://tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
                    `https://blerp.com/${props.type}/${id}`,
                )}`;
            },
        },
        // {
        //   name: "Email",
        //   iconUrl:
        //     "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/email%20grey.svg",
        //   hoverUrl:
        //     "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/email%20hover.svg",
        //   createShareUrl: id => {
        //     return `http://tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
        //       `https://blerp.com/soundbites/${id}`
        //     )}`;
        //   }
        // },
        // {
        //   name: "Messenger",
        //   iconUrl:
        //     "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/messenger%20grey.svg",
        //   hoverUrl:
        //     "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/messenger%20hover.svg",
        //   createShareUrl: id => {
        //     return `http://tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
        //       `https://blerp.com/soundbites/${id}`
        //     )}`;
        //   }
        // },
        {
            name: "Facebook",
            iconUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/FB%20grey.svg",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/FB%20hover.svg",
            createShareUrl: id => {
                return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://blerp.com/${props.type}/${id}`,
                )}`;
            },
        },
        {
            name: "Pinterest",
            iconUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/Pinterest%20Grey.svg",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/Pinterest%20hover.svg",
            createShareUrl: id => {
                return `http://www.pinterest.com/pin/create/link/?url=${encodeURIComponent(
                    `https://blerp.com/${props.type}/${id}`,
                )}`;
            },
        },
        {
            name: "Reddit",
            iconUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/reddit%20grey.svg",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/reddit%20hover.svg",
            createShareUrl: id => {
                return `http://www.reddit.com/submit?url=${encodeURIComponent(
                    `https://blerp.com/${props.type}/${id}`,
                )}`;
            },
        },
        {
            name: "Twitter",
            iconUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/twitter%20grey.svg",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/twitter%20hover.svg",
            createShareUrl: id => {
                return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    `https://blerp.com/${props.type}/${id}`,
                )}&via=blerpapp`;
            },
        },
        {
            name: "Tumbler",
            iconUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/tumbler%20grey.svg",
            hoverUrl:
                "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/tubmbler%20hover.svg",
            createShareUrl: id => {
                return `http://tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
                    `https://blerp.com/${props.type}/${id}`,
                )}`;
            },
        },
        // {
        //   name: "Whatsapp",
        //   iconUrl:
        //     "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/WA%20grey.svg",
        //   hoverUrl:
        //     "https://storage.googleapis.com/blerp_products/Web/Menus/Social%20share%20icons/WA%20hover.svg",
        //   createShareUrl: id => {
        //     return `http://tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
        //       `https://blerp.com/soundbites/${id}`
        //     )}`;
        //   }
        // },
    ];

    let firstSocialLinkRef;

    const getLinkRef = el => {
        firstSocialLinkRef = el;
    };

    const onShareClick = (url, socialName, logActionMutation) => () => {
        window.open(url);

        const data = {
            id: props.id,
            title: props.itemTitle ? props.itemTitle : "UNKNOWN",
            shareTo: socialName ? socialName.toUpperCase() : "",
            shareUsing: props.analyticUsingTitle
                ? props.analyticUsingTitle
                : "WEB_SOCIAL_ITEM_MENU",
            searchQuery: getQueryStringValue("q"),
        };

        logActionMutation({
            fetchPolicy: "no-cache",
            ssr: false,
            variables: {
                action: props.analyticTitle,
                data,
            },
        });

        newShare({
            variables: {
                _id: props.userSignedInId,
                biteId: props.biteId,
                playlistId: props.playlistId,
                searchQuery: getQueryStringValue("q"),
                pageUrl: props.router.asPath,
            },
        });
    };

    return (
        <>
            {props.mainTitle && (
                <>
                    <MainTitle
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowIcons(!showIcons)}
                    >
                        <ButtonTextContainer>
                            <ButtonText>{props.mainTitle}</ButtonText>
                            {showIcons === true ? (
                                <Icon
                                    style={{ width: "20px" }}
                                    iconUrl='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Down.svg'
                                />
                            ) : (
                                <Icon
                                    style={{ height: "20px" }}
                                    iconUrl='https://storage.googleapis.com/blerp_products/Twitch/Assets/Arrows/Chevron_DarkGrey_Right.svg'
                                />
                            )}
                        </ButtonTextContainer>
                    </MainTitle>
                </>
            )}
            <GridContainer showIcons={showIcons}>
                <Mutation mutation={LOG_ACTION}>
                    {LOG_ACTION_MUTATION => (
                        <>
                            {DefaultSocialMediaBiteItems.map(
                                (socialItem, index) => {
                                    return (
                                        <>
                                            {socialItem.name === "Download" ? (
                                                props.type !== "soundboard" ? (
                                                    <GridItem
                                                        showIcons={showIcons}
                                                    >
                                                        <StyleLink
                                                            key={index}
                                                            target='external'
                                                            href={
                                                                props.downloadUrl
                                                            }
                                                            download={`${
                                                                props.itemTitle
                                                                    ? props.itemTitle.replace(
                                                                          /\s/g,
                                                                          "-",
                                                                      )
                                                                    : "blerp-sound-file"
                                                            }.mp3`}
                                                        >
                                                            <SocialLogo
                                                                imageSrc={
                                                                    socialItem.iconUrl
                                                                }
                                                                hoverSrc={
                                                                    socialItem.hoverUrl
                                                                }
                                                                aria-label={`Share to ${socialItem.name}`}
                                                            />
                                                        </StyleLink>
                                                    </GridItem>
                                                ) : (
                                                    <></>
                                                )
                                            ) : (
                                                <GridItem showIcons={showIcons}>
                                                    <StyleLink
                                                        key={index}
                                                        target='external'
                                                        onClick={onShareClick(
                                                            socialItem.createShareUrl(
                                                                props.id,
                                                            ),
                                                            socialItem.name,
                                                            LOG_ACTION_MUTATION,
                                                        )}
                                                    >
                                                        <SocialLogo
                                                            imageSrc={
                                                                socialItem.iconUrl
                                                            }
                                                            hoverSrc={
                                                                socialItem.hoverUrl
                                                            }
                                                            aria-label={`Share to ${socialItem.name}`}
                                                        />
                                                    </StyleLink>
                                                </GridItem>
                                            )}
                                        </>
                                    );
                                },
                            )}
                        </>
                    )}
                </Mutation>
            </GridContainer>
        </>
    );
};

export default withRouter(NewSocialConatiner);
