/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import { graphql } from "@apollo/react-hoc";
import { Query, Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";

import { randomBlerpColor } from "../../../lib/helperFunctions";
import HorizontalList from "../../lists/HorizontalList";

import { bodyText, pandaPink } from "../../../styles/colors";

const MegaContainer = styled.div`
    display: flex;
    padding: 12px;
    flex-flow: column;
    align-content: center;
    justify-content: center;
    visibility: visible;
    bottom: 0;
    left: 0;
    max-width: 100%;
`;

const MainTitle = styled.div`
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    color: ${bodyText};
    margin: 8px;
`;

const StyleLink = styled.a``;

const SocialLogo = styled.div`
    width: 40px;
    height: 40px;
    padding: 4px;
    margin: 0 8px;
    opacity: 1;
    background: url(${props => props.imageSrc}) center no-repeat;

    &:hover {
        opacity: 0.7;
        background: url(${props => props.hoverSrc}) center no-repeat;
    }
`;

const SocialLogoImage = styled.img`
    width: 40px;
    height: 40px;
    padding: 4px;
    margin: 0 8px;
    opacity: 1;

    &:hover {
        opacity: 0.7;
    }
`;

const SocialText = styled.p`
    color: ${bodyText};

    &:hover {
        opacity: 0.7;
        color: ${pandaPink};
    }
`;

// interface Props {
//   id?: string;
//   downloadUrl?: string;
//   className?: any;
//   mainTitle?: string;
//   itemTitle?: string;
//   analyticTitle: string;
//   analyticUsingTitle?: string;
//   onFocus?: any;
//   socialItems?: {
//     name: string;
//     iconUrl: string;
//     pinkIconUrl: string;
//     createShareUrl: any;
//   }[];
// }

const DefaultSocialMediaBiteItems = [
    {
        name: "Tumblr",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Tumbler.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/TumblerSelected.svg",
        createShareUrl: id => {
            return `http://tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(
                `https://blerp.com/soundbites/${id}`,
            )}`;
        },
    },
    {
        name: "Pinterest",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Pinterest.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/PinterestSelected.svg",
        createShareUrl: id => {
            return `http://www.pinterest.com/pin/create/link/?url=${encodeURIComponent(
                `https://blerp.com/soundbites/${id}`,
            )}`;
        },
    },
    {
        name: "Facebook",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Facebook.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/FacebookSelected.svg",
        createShareUrl: id => {
            return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                `https://blerp.com/soundbites/${id}`,
            )}`;
        },
    },
    {
        name: "Reddit",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Reddit.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/RedditSelected.svg",
        createShareUrl: id => {
            return `http://www.reddit.com/submit?url=${encodeURIComponent(
                `https://blerp.com/soundbites/${id}`,
            )}`;
        },
    },
    {
        name: "Twitter",
        iconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/Twitter.svg",
        pinkIconUrl:
            "https://storage.googleapis.com/blerp-public-images/social/TwitteSelected.svg",
        createShareUrl: id => {
            return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                `https://blerp.com/soundbites/${id}`,
            )}&via=blerpapp`;
        },
    },
];

const LOG_ACTION = gql`
    mutation logAction($action: String!, $data: JSON) {
        web {
            logAction(action: $action, data: $data) {
                success
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

export default class NewSocialContainer extends React.Component {
    static defaultProps = {
        socialItems: DefaultSocialMediaBiteItems,
    };
    backgroundColor;
    firstSocialLinkRef;
    constructor(props) {
        super(props);
        this.backgroundColor = randomBlerpColor();
    }

    componentDidMount() {
        if (this.props.onFocus) {
            this.firstSocialLinkRef.focus();
        }
    }

    getLinkRef = el => {
        this.firstSocialLinkRef = el;
    };

    onShareClick = (url, socialName, logActionMutation) => () => {
        window.open(url);

        const data = {
            id: this.props.id,
            title: this.props.itemTitle ? this.props.itemTitle : "UNKNOWN",
            shareTo: socialName ? socialName.toUpperCase() : "",
            shareUsing: this.props.analyticUsingTitle
                ? this.props.analyticUsingTitle
                : "WEB_SOCIAL_ITEM_MENU",
            searchQuery: getQueryStringValue("q"),
        };

        logActionMutation({
            fetchPolicy: "no-cache",
            ssr: false,
            variables: {
                action: this.props.analyticTitle,
                data,
            },
        });
    };

    renderSocialItems = (socialItemSpecific, LOG_ACTION_MUTATION) => (
        index,
        key,
    ) => {
        const socialItem = socialItemSpecific[index];
        if (socialItem && socialItem.text) {
            return (
                <StyleLink
                    key={key}
                    target='external'
                    onClick={this.onShareClick(
                        socialItem.createShareUrl(this.props.id),
                        socialItem.name,
                        LOG_ACTION_MUTATION,
                    )}
                    ref={this.getLinkRef}
                >
                    <SocialText aria-label={`Share to ${socialItem.name}`}>
                        {socialItem.text}
                    </SocialText>
                </StyleLink>
            );
        } else if (index === 0) {
            return (
                <StyleLink
                    key={key}
                    target='external'
                    onClick={this.onShareClick(
                        socialItem.createShareUrl(this.props.id),
                        socialItem.name,
                        LOG_ACTION_MUTATION,
                    )}
                    ref={this.getLinkRef}
                >
                    <SocialLogo
                        imageSrc={socialItem.iconUrl}
                        hoverSrc={socialItem.pinkIconUrl}
                        aria-label={`Share to ${socialItem.name}`}
                    />
                </StyleLink>
            );
        } else if (socialItemSpecific.length === index) {
            return (
                <StyleLink
                    key={key}
                    target='external'
                    href={this.props.downloadUrl}
                    download={`${
                        this.props.itemTitle
                            ? this.props.itemTitle.replace(/\s/g, "-")
                            : "blerp-sound-file"
                    }.mp3`}
                >
                    <SocialLogoImage
                        src='https://storage.googleapis.com/blerp-web-images/static/social/download-small.svg'
                        alt='Download Sound Bite'
                    />
                </StyleLink>
            );
        } else if (socialItem) {
            return (
                <StyleLink
                    key={key}
                    target='external'
                    onClick={this.onShareClick(
                        socialItem.createShareUrl(this.props.id),
                        socialItem.name,
                        LOG_ACTION_MUTATION,
                    )}
                >
                    <SocialLogo
                        imageSrc={socialItem.iconUrl}
                        hoverSrc={socialItem.pinkIconUrl}
                        aria-label={`Share to ${socialItem.name}`}
                    />
                </StyleLink>
            );
        }
    };

    render() {
        return (
            <MegaContainer>
                {this.props.mainTitle && (
                    <MainTitle>{this.props.mainTitle}</MainTitle>
                )}
                <Mutation mutation={LOG_ACTION}>
                    {LOG_ACTION_MUTATION => (
                        <React.Fragment>
                            <HorizontalList
                                length={
                                    this.props.downloadUrl
                                        ? this.props.socialItems.length + 1
                                        : this.props.socialItems.length
                                }
                                renderListItems={this.renderSocialItems(
                                    this.props.socialItems,
                                    LOG_ACTION_MUTATION,
                                )}
                                showArrows={true}
                            />
                        </React.Fragment>
                    )}
                </Mutation>
            </MegaContainer>
        );
    }
}
