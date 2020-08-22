/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import { Query, Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
`;

const CopyLinkHidden = styled.input`
    opacity: 0;
    position: absolute;
    font-size: 16px;
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

// interface Props {
//   id?: string;
//   url?: string;
//   analyticTitle?: string;
//   analyticUsing?: string;
//   title?: string;
// }

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

const ButtonTextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ButtonText = styled.div`
    text-align: center;
`;

const Icon = styled.div`
    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    height: 19px;
    width: 24px;
`;

const GreyButton = styled.button`
    font-size: 18px;
    background-color: transparent;
    border-radius: 100px;
    height: 40px;
    color: #47463f;
    border: 2px solid #47463f;
    min-width: 106px;
    z-index: 2;
    padding: 0 24px;
    cursor: pointer;

    &:focus {
        outline: 3px solid rgba(59, 119, 255, 1);
    }

    &:hover {
        color: white;
        background-color: grey;
        border-color: grey;
        transition: all 0.2s ease 0s;
    }

    &:hover ${Icon} {
        background-image: url(${props => props.hoverUrl});
    }

    &:active {
        background-color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

export default class CopyUrlModalLink extends React.Component {
    copyInput;
    props;
    state;

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
        };
    }

    copyToClipboard = LOG_ACTION_MUTATION => () => {
        if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
            // save current contentEditable/readOnly status
            const editable = this.copyInput.contentEditable;
            const readOnly = this.copyInput.readOnly;

            // convert to editable with readonly to stop iOS keyboard opening
            this.copyInput.contentEditable = true;
            this.copyInput.readOnly = false;

            // create a selectable range
            const range = document.createRange();
            range.selectNodeContents(this.copyInput);

            // select the range
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            this.copyInput.setSelectionRange(0, 999999);

            // restore contentEditable/readOnly to original state
            this.copyInput.contentEditable = editable;
            this.copyInput.readOnly = readOnly;
        } else {
            this.copyInput.select();
        }

        document.execCommand("copy");
        this.setState({ title: "Copied!" });

        const data = {
            id: this.props.id,
            shareUsing: this.props.analyticUsing,
            searchQuery: getQueryStringValue("q"),
        };

        LOG_ACTION_MUTATION({
            fetchPolicy: "no-cache",
            ssr: false,
            variables: {
                action: this.props.analyticTitle,
                data,
            },
        });
    };

    getCopyInput = el => {
        this.copyInput = el;
    };

    render() {
        return (
            <Container>
                <CopyLinkHidden
                    id='blerpModalClipboard'
                    ref={this.getCopyInput}
                    defaultValue={this.props.url}
                    readOnly={false}
                    contentEditable={true}
                />
                <Mutation mutation={LOG_ACTION}>
                    {LOG_ACTION_MUTATION => (
                        <React.Fragment>
                            <GreyButton
                                onClick={this.copyToClipboard(
                                    LOG_ACTION_MUTATION,
                                )}
                                hoverUrl={
                                    "https://storage.googleapis.com/blerp_products/Web/Menus/copy%20white.svg"
                                }
                            >
                                <ButtonTextContainer>
                                    <Icon url='https://storage.googleapis.com/blerp_products/Web/Menus/copy%20black.svg' />
                                    <ButtonText>{this.state.title}</ButtonText>
                                </ButtonTextContainer>
                            </GreyButton>
                        </React.Fragment>
                    )}
                </Mutation>
            </Container>
        );
    }
}
