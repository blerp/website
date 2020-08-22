import gql from "graphql-tag";
import * as React from "react";
import { graphql } from "@apollo/react-hoc";
import styled, { keyframes } from "styled-components";

import Link from "next/link";

const fadeIn = keyframes`
  0% {
    width: 0;
    opacity: 0;
  }

  25% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    width: 100px;
    opacity: 1;
  }
`;

const Container = styled.div`
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    margin: 0 8px;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const OuterContentContainer = styled.div`
    max-width: 800px;
    margin: 8px;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 800px) {
        max-width: 400px;
        margin: 2px;
    }
`;

const StyledNavLinkWrapper = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    width: 100px;
    text-align: center;
    padding: 4px 12px 16px;
    justify-content: center;
    animation: ${fadeIn} 0.4s 1;
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

const defaultProps = {
    prefetch: false,
};

class NavCategories extends React.Component {
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
                <StyledNavLink href={`/`}>{""}</StyledNavLink>
            </StyledNavLinkWrapper>
        );
    }

    renderCategories() {
        if (this.props.data.loading) {
            return null; // renderLoading()
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
                <Container>
                    {/* <StyledNavLinkWrapper>
            {!this.props.data.loading && (
              <Link
                prefetch={true}
                href={{ pathname: "/popular" }}
                as={`/popular`}
              >
                <StyledNavLink href={`/popular`}>{"POPULAR"}</StyledNavLink>
              </Link>
            )}
          </StyledNavLinkWrapper>
          <StyledNavLinkWrapper>
            {!this.props.data.loading && (
              <Link
                prefetch={true}
                href={{ pathname: "/discover" }}
                as={`/discover`}
              >
                <StyledNavLink href={`/discover`}>{"DISCOVER"}</StyledNavLink>
              </Link>
            )}
          </StyledNavLinkWrapper>*/}
                    {this.renderCategories()}
                </Container>
            </OuterContentContainer>
        );
    }
}

export default NavCategories;
