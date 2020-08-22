/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled, { keyframes } from "styled-components";
import gql from "graphql-tag";
import { Query, Mutation } from "@apollo/client/react/components";
import SecondaryButton from "../../buttons/SecondaryButton";
import {
    canUseDOM,
    ImageDropzone,
    NewImageDropzone,
} from "../../upload/dropzones";

import {
    actionBackground,
    primaryText,
    flyoutBackground,
    pandaPink,
    iconsInActive,
    pandaTeal,
    secondaryGray,
    defaultBackground,
    darkBackground,
} from "../../../styles/colors";

const MUTATION_ITEM = gql`
    mutation updateBiteImageOnWeb($id: MongoID!, $image: Upload!) {
        web {
            updateImageByBiteId(record: { id: $id, image: $image }) {
                _id
                image {
                    updatedAt
                    original {
                        url
                    }
                }
            }
        }
    }
`;

const ImageUploadContainer = styled.div`
    overflow-y: scroll;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const DefaultProps = {};

const MenuTitle = styled.div`
    margin: 4px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: ${props => (props.selected ? pandaPink : secondaryGray)};
`;

export class ImageUpdateScreen extends React.Component {
    static defaultProps = DefaultProps;
    state = {
        searchQuery: this.props.searchQuery || "",
        image: undefined,
        loading: false,
    };

    handleImageDrop = acceptedFiles => {
        this.setState({ image: acceptedFiles[0] });
    };

    handleUploadClick = mutationCall => async () => {
        if (!this.state.image) {
            alert("You must update with a valid image less then 7mb");
            return;
        }

        if (this.state.image.size > 8842038) {
            alert("You must update with a valid image less then 7mb");
            return;
        }

        this.setState({ loading: true });

        await mutationCall({
            variables: {
                id: this.props.biteId,
                image: this.state.image,
            },
        });

        this.props.handleImageUploadFinished();
    };

    render() {
        if (this.state.loading) {
            return (
                <ImageUploadContainer>
                    <MenuTitle>{"Loading"}</MenuTitle>
                </ImageUploadContainer>
            );
        }
        return (
            <React.Fragment>
                <Mutation mutation={MUTATION_ITEM}>
                    {uploadImageMutation => {
                        return (
                            <ImageUploadContainer>
                                <MenuTitle>
                                    {"Click Box or Drag Image"}
                                </MenuTitle>
                                {canUseDOM() && (
                                    <NewImageDropzone
                                        multiple={false}
                                        accept='image/*'
                                        color={darkBackground}
                                        imageURL={
                                            this.state.image &&
                                            URL.createObjectURL(
                                                this.state.image,
                                            )
                                        }
                                        onDrop={this.handleImageDrop}
                                    />
                                )}
                                <SecondaryButton
                                    onClick={this.handleUploadClick(
                                        uploadImageMutation,
                                    )}
                                >
                                    Update
                                </SecondaryButton>
                            </ImageUploadContainer>
                        );
                    }}
                </Mutation>
            </React.Fragment>
        );
    }
}

export default ImageUpdateScreen;
