import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    background-color: none;
    padding: 8px;
    border-radius: 8px;
`;

const StyledInput = styled.input`
    background-color: transparent;
    height: 24px;
    font-size: 14px;
    font-weight: 300;
    color: ${props => props.theme.grey4};
    border: none;
    border-radius: 0px;
    border-bottom: none;
    flex: 1;

    &:focus {
        border-radius: 0px;
        border: none !important;
    }
`;

const AddButton = styled.button`
    background-color: transparent;
    border: none !important;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.grey5};
    }

    &:focus {
        border: none !important;
    }
`;

const InputOutputContainer = styled.div`
    background-color: none;
    border: 2px solid ${props => props.theme.grey3};
    border-radius: 4px;
    padding: 10px;
    max-height: 200px;
    overflow-y: scroll;
`;

const InputContainer = styled.div`
    border-bottom: 1px solid ${props => props.theme.lightGray};
    display: flex;
`;

const ListItem = styled.button`
    position: relative;
    background-color: ${props =>
        props.light ? props.theme.flyoutBackground : props.theme.lightGray};
    ${props => (props.light ? "box-shadow: 0px 3px 6px #00000029;" : "")}
    border: none !important;
    border-radius: 8px;
    padding: 8px;
    margin: 10px 5px;
    font-weight: lighter;
    cursor: pointer;
    font-size: 14px;
    color: ${props =>
        props.light ? props.theme.darkText : props.theme.flyoutBackground};
`;

const CircleX = styled.div`
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: ${props => props.theme.darkText};
    border: ${props => props.theme.whiteText} 2px solid;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    line-height: 16px;
    color: ${props => props.theme.whiteText};
`;

const DisplayList = styled.div`
    max-height: 300px;
    overflow: hidden;
`;

const RecommendedList = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: no-wrap;
`;

const Label = styled.div`
    font-size: 12px;
    margin-bottom: 10px;
    color: ${props => props.theme.secondarySubtitleText};
`;

const InputList = props => {
    const [textInput, setTextInput] = useState(props.isTag ? "" : "");
    const [recommendedList, setRecommendedList] = useState(
        props.recommendedList || [],
    );
    const [list, setList] = useState(props.list || []);

    const deleteFromList = clickedItem => {
        if (props.recommendedList) {
            props.recommendedList.map(item => {
                if (item === clickedItem) {
                    setRecommendedList([...recommendedList, clickedItem]);
                }
            });
        }

        setList(
            list.filter(item => {
                return item !== clickedItem;
            }),
        );

        props.setInfo(
            list.filter(item => {
                return item !== clickedItem;
            }),
        );
    };

    return (
        <Container darkBackground={props.darkBackground}>
            {props.recommendedList ? (
                <>
                    <Label>Recommended</Label>
                    <RecommendedList>
                        {recommendedList.map(item => (
                            <ListItem
                                key={item}
                                light
                                value={item}
                                onClick={e => {
                                    setList([...list, e.target.value]);
                                    setRecommendedList(
                                        recommendedList.filter(item => {
                                            return item !== e.target.value;
                                        }),
                                    );
                                    props.setInfo([...list, e.target.value]);
                                }}
                            >
                                {item}
                            </ListItem>
                        ))}
                    </RecommendedList>
                </>
            ) : (
                <></>
            )}
            <InputOutputContainer>
                <InputContainer>
                    <StyledInput
                        placeholder={props.placeholder}
                        value={textInput}
                        onChange={e => setTextInput(e.target.value)}
                    />
                    <AddButton
                        onClick={() => {
                            setList([textInput, ...list]);
                            setTextInput("");
                            props.setInfo([...list, textInput]);
                        }}
                    >
                        +Add
                    </AddButton>
                </InputContainer>
                <DisplayList>
                    {list.map(item => (
                        <ListItem
                            key={item}
                            light={props.light}
                            value={item}
                            onClick={e => deleteFromList(e.target.value)}
                        >
                            <CircleX>x</CircleX>
                            {props.isTag ? `#${item}` : item}
                        </ListItem>
                    ))}
                </DisplayList>
            </InputOutputContainer>
        </Container>
    );
};

export default InputList;
