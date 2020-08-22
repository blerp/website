import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import styled from "styled-components";

import Link from "next/link";

const Container = styled.div`
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    margin: 0 24px;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const OuterContentContainer = styled.div`
    max-width: 100%;
`;

const StyledNavLinkWrapper = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    width: 100px;
    text-align: center;
    padding: 4px 12px 16px;
    justify-content: center;
`;

const StyledNavLink = styled.a`
    font-size: 16px;
    border: none;
    color: white;
    text-decoration: none;
    background-color: transparent;
    text-align: center;
    align-self: center;

    &:hover {
        color: rgba(200, 200, 200, 1);
        transition: all 0.2s ease 0s;
    }

    &:active {
        color: rgba(150, 150, 150, 1);
        transition: all 0.2s ease 0s;
    }
`;

// interface Props {
//   prefetch?: boolean;
// }

const defaultProps = {
    prefetch: false,
};

class ProfileSelection extends React.Component {
    static defaultProps = defaultProps;

    constructor(props) {
        super(props);
    }

    renderCategory(category, index) {
        if (this.props.prefetch) {
            return (
                <StyledNavLinkWrapper key={category.id}>
                    <Link
                        prefetch={true}
                        href={{
                            pathname: "/category",
                            query: { id: category.id },
                        }}
                        as={`/category/${category.id}`}
                    >
                        <StyledNavLink href={`/category/${category.id}`}>
                            {category.title.toUpperCase()}
                        </StyledNavLink>
                    </Link>
                </StyledNavLinkWrapper>
            );
        } else {
            return (
                <StyledNavLinkWrapper key={category.id}>
                    <StyledNavLink href={`/category/${category.id}`}>
                        {category.title.toUpperCase()}
                    </StyledNavLink>
                </StyledNavLinkWrapper>
            );
        }
    }

    renderLoading() {
        return (
            <StyledNavLinkWrapper>
                <StyledNavLink href={`/`}>{"LOADING..."}</StyledNavLink>
            </StyledNavLinkWrapper>
        );
    }

    renderCategories() {
        if (this.props.data.loading) {
            return this.renderLoading();
        } else if (this.props.data.error) {
            return;
        }

        return this.props.data.categories.map((category, index) => {
            return this.renderCategory(category, index);
        });
    }

    render() {
        return (
            <OuterContentContainer>
                <Container>{this.renderCategories()}</Container>
            </OuterContentContainer>
        );
    }
}

export default ProfileSelection;
