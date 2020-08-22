import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { Row } from "../shared/ProfileTabViews/ProfileStyledComponents";
import { Icon, Text } from "./Theme";
import { useWindowSize } from "../../lib/ScreenSizeHook";

const StyledText = styled(Text)``;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 120%;
    padding-left: 30px;
    align-self: center;
`;

const ScrollItem = styled.div`
    width: 550px;
    height: auto;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    @media (max-width: 600px) {
        justify-content: center;
        width: 300px;
    }

    & ${TextContainer} {
        @media (max-width: 600px) {
            width: 50%;
        }
    }

    & ${Icon} {
        @media (max-width: 600px) {
            width: 80px !important;
            height: 80px !important;
            background-size: 80px 80px !important;
            margin-right: 10px !important;
        }
    }
`;

const SideScrollContent = styled.div`
    display: flex;
    height: 100%;
    width: 2200px;
    transform: translate3d(0, 0, 0);
    transition: 0.2s;

    --webkit-scrollbar {
        display: none;
    }
`;

const SideScrollContainer = styled.div`
    display: flex;
    width: ${props => props.moveSize};
    height: auto;
    overflow: hidden;
    margin: 0;

    @media (max-width: 600px) {
        margin: 0 auto;
        height: 200px;
    }
`;

const StepItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;

    @media (max-width: 600px) {
        width: 80%;
        margin: 60px 0;
    }

    & ${StyledText} {
        @media (max-width: 600px) {
            line-height: 30px;
        }
    }
`;

const StepContainer = styled(Row)`
    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center !important;
    }
`;

export const Dot = styled.div`
    width: 8px;
    height: 8px;
    background-color: ${props =>
        props.active ? props.theme.colors.ibisRed : props.theme.colors.grey3};
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
`;

const Slider = props => {
    const size = useWindowSize();
    const [activeDot, setActiveDot] = useState("dot1");
    const [moveTo, setMoveTo] = useState(0);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        document.getElementById(
            "scroll-me",
        ).style.transform = `translate3d(-${moveTo}px, 0px, 0)`;
    }, [moveTo]);

    const moveSlider = (value, dot) => {
        if (value) {
            let num;
            try {
                num = parseInt(value.split("p")[0]);
            } catch {
                null;
            }
            setMoveTo(moveTo + num);
            setActiveDot(dot);
        }
    };

    const renderDots = () => {
        let arr = [];
        for (let i = 1; i <= props.dots; i++) {
            arr.push(
                <Dot
                    key={`dot${i}`}
                    onClick={() => {
                        setActiveDot(`dot${i}`);
                        setMoveTo(props.moveSize.split("p")[0] * (i - 1));
                    }}
                    active={activeDot === `dot${i}`}
                />,
            );
        }
        return arr;
    };

    return (
        <>
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <SideScrollContainer
                    size={size}
                    moveSize={props.moveSize}
                    style={props.style}
                >
                    <SideScrollContent id='scroll-me'>
                        {props.children({ moveSlider })}
                    </SideScrollContent>
                </SideScrollContainer>

                <Row
                    style={{
                        justifyContent: "center",
                        position: "absolute",
                        bottom: "-10px",
                        width: "41%",
                    }}
                >
                    {renderDots()}
                </Row>
            </div>
        </>
    );
};

export default Slider;
