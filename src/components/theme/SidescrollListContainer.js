import React, { useState } from "react";
import styled from "styled-components";
import { Text, Icon } from "./Theme";
import { Row } from "../shared/ProfileTabViews/ProfileStyledComponents";

const Container = styled.div`
    ${props =>
        props.viewType === "list"
            ? `display: grid;`
            : `display: flex; flex-wrap: wrap; justify-content: center;`}
    padding: 0;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(auto-fill, min(160px, 1fr));
    grid-auto-flow: column;
    grid-auto-columns: min(160px, 1fr);
    row-gap: 50px;
    column-gap: 70px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    position: relative;
    place-items: center;

    &::-webkit-scrollbar {
        height: 10px;
    }

    &::-webkit-scrollbar-track {
        background: ${props => props.theme.colors.grey3};
        border-top: 4px solid
            ${props =>
                props.backgroundColor === "white"
                    ? props.theme.colors.white
                    : props.theme.colors.waxing};
        border-bottom: 4px solid
            ${props =>
                props.backgroundColor === "white"
                    ? props.theme.colors.white
                    : props.theme.colors.waxing};
    }

    &::-webkit-scrollbar-thumb {
        background: ${props => props.theme.colors.notBlack};
        border-top: 3px solid
            ${props =>
                props.backgroundColor === "white"
                    ? props.theme.colors.white
                    : props.theme.colors.waxing};
        border-bottom: 3px solid
            ${props =>
                props.backgroundColor === "white"
                    ? props.theme.colors.white
                    : props.theme.colors.waxing};
        border-radius: 8px;
        width: 200px;

        @media (max-width: 600px) {
            padding: 0px !important;
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const SidescollListContainer = props => {
    const [viewType, setViewType] = useState("list");

    const scrollToRight = () => {
        let container = document.getElementById(props.scrollId);
        let scrollRight = container.scrollLeft;
        scrollRight += 900;
        container.scrollLeft = scrollRight;
    };

    const scrollToLeft = () => {
        let container = document.getElementById(props.scrollId);
        let scrollRight = container.scrollLeft;
        scrollRight -= 900;
        container.scrollLeft = scrollRight;
    };

    return (
        <>
            <Wrapper>
                <Row
                    style={{
                        width: "100%",
                        marginBottom: "20px",
                    }}
                >
                    {props.title}
                    <div style={{ display: "flex" }}>
                        {props.hasGridView ? (
                            <>
                                <Icon
                                    hoverColor='lightGrey'
                                    onClick={() => setViewType("list")}
                                    hoverUrl='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/List%20view.svg'
                                    url={
                                        viewType === "list"
                                            ? "https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/List%20view.svg"
                                            : "https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/List%20view%20quiet.svg"
                                    }
                                />
                                <Icon
                                    style={{
                                        marginLeft: "20px",
                                        marginRight: "40px",
                                        backgroundPosition: "center",
                                    }}
                                    hoverColor='lightGrey'
                                    onClick={() => setViewType("grid")}
                                    hoverUrl='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/Grid%20view.svg'
                                    url={
                                        viewType === "grid"
                                            ? "https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/Grid%20view.svg"
                                            : "https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/Grid%20view%20quiet.svg"
                                    }
                                />
                            </>
                        ) : (
                            <></>
                        )}
                        <Icon
                            size='tiny'
                            hoverColor='lightGrey'
                            onClick={() => scrollToLeft()}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/left%20arrow.svg'
                        />
                        <Icon
                            style={{
                                marginLeft: "40px",
                                backgroundPosition: "center",
                            }}
                            size='tiny'
                            hoverColor='lightGrey'
                            onClick={() => scrollToRight()}
                            url='https://storage.googleapis.com/blerp_products/Web/Landing%20Pages/Streamers/right%20arrow.svg'
                        />
                    </div>
                </Row>
                <Container
                    viewType={viewType}
                    id={props.scrollId}
                    style={props.style}
                    backgroundColor={props.backgroundColor}
                >
                    {props.children}
                </Container>
            </Wrapper>
        </>
    );
};

export default SidescollListContainer;
