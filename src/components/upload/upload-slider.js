/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

import AudioSelector from "./mobile-audio-selector";
import {
    flyoutBackground,
    bodyText,
    pandaPink,
    lightGray,
} from "../../styles/colors";

import {
    msToTime,
    transformTimeStampToMS,
    isValidTimeStamp,
} from "../../lib/utils";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
`;

const TimeSelectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
`;

const TimeSelectionContainerColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Label = styled.label`
    font-weight: lighter;
    margin: 4px;
    font-size: 18px;
    padding: 4px 0;
    color: ${props => (props.isColored ? "#FE295C" : "#210000")};
`;

const LargeLabel = styled.div`
    font-weight: lighter;
    font-size: 20px;
    color: ${props => (props.isColored ? "#FE295C" : "#210000")};
    cursor: pointer;
`;

const TimeInput = styled.input`
    background-color: ${props => props.theme.defaultBackground};
    border: none;
    height: 32px;
    color: ${bodyText};
    font-size: inherit;
    width: 100px;
    padding-left: 5px;
    padding-right: 5px;
    border: none;
    padding: 4px 12px;
    outline: 3px solid
        ${props =>
            props.error ? "rgba(200, 20, 20, 1)" : "rgba(200, 20, 20, 0)"};

    &:placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #bfbfba;
    }

    &:focus {
        border-radius: 16px;
    }
`;

const IncrementButton = styled.button`
    z-index: 10;
    border: none;
    height: 36px;
    width: 36px;
    margin: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${flyoutBackground};
    border-radius: 100px;
    opacity: 1;
    cursor: pointer;

    &:hover {
        background-color: ${lightGray};
        border: none;
    }

    &:focus {
        opacity: 0.8;
        border: 2px solid ${pandaPink};
    }
`;

const IncrementIcon = styled.div`
    position: relative;
    width: 24px;
    height: 24px;
    padding: 4px;
    margin: 4px;
    opacity: 1;
    background: url(${props => props.imageSrc}) center no-repeat;

    &:hover {
        opacity: 0.8;
        background: url(${props => props.hoverSrc}) center no-repeat;
    }
`;

const DefaultProps = {
    audioDuration: 2000, // In milliseconds
    defaultRangeValues: [0, 2000], // In milliseconds
    onMoveAll: values => {},
    onMoveEnd: end => {},
    onMoveStart: start => {},
};

const InteractButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    height: 60px;
    width: 60px;
    padding: 8px;
    float: right;
    font-size: 16px;
    border-radius: 40px;
    border: 3px solid ${props => props.theme.iconsInActive};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

const InteractButtonTiny = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    height: 40px;
    width: 40px;
    padding: 8px;
    float: right;
    font-size: 16px;
    border-radius: 40px;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

const ButtonImage = styled.img`
    width: 32px;
    height: 32px;
`;

const ButtonImageTiny = styled.img`
    width: 20px;
    height: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// TODO: DE-TRACK A START LABEL AND START TIME -> was an idiot and did that once upon a time
export default class UploadSlider extends React.Component {
    static defaultProps = DefaultProps;
    MAX_WIDTH = 1200;
    MAX_HEIGHT = 200;
    MAX_MS_SECONDS = 10000;
    MIN_MS_SECONDS = 100;

    constructor(props) {
        super(props);

        const values = props.startTime
            ? [props.startTime, props.endTime]
            : props.defaultRangeValues; // In miliseconds!

        this.state = {
            startLabel: msToTime(values[0] || 0),
            endLabel: msToTime(values[1] || 0),
            values,
        };
    }

    resetTimeStamps = () => {
        this.setState({
            endLabel: msToTime(this.state.values[1]),
            startLabel: msToTime(this.state.values[0]),
            values: this.state.values,
        });
    };

    handleStartTimeType = event => {
        this.setState({
            startLabel: event.target.value,
        });
    };

    handleEndTimeType = event => {
        this.setState({
            endLabel: event.target.value,
        });
    };

    handleBlurStartTime = event => {
        this.handleStartTimeSet(event, true);
    };

    handleStartTimeSet = (event, onBlur) => {
        if (event.which === 13 || onBlur) {
            if (!isValidTimeStamp(event.target.value)) {
                this.resetTimeStamps();
                return;
            }

            const milliseconds = transformTimeStampToMS(event.target.value);
            const newTimeValues = [milliseconds, this.state.values[1]];

            if (this.canMoveValues(newTimeValues)) {
                this.setState({
                    endLabel: msToTime(this.state.values[1]),
                    startLabel: msToTime(milliseconds),
                    values: newTimeValues,
                });
                this.props.onMoveAll({ values: newTimeValues });
            } else {
                // Change to old values + 10 IF OUT OF RANGE
                const newTimeValues = [milliseconds, milliseconds + 10000];
                this.setState({
                    endLabel: msToTime(milliseconds + 10000),
                    startLabel: msToTime(milliseconds),
                    values: newTimeValues,
                });
            }
        }
    };

    handleEndTimeSet = (event, onBlur) => {
        if (event.which === 13 || onBlur) {
            if (!isValidTimeStamp(event.target.value)) {
                this.resetTimeStamps();
                return;
            }

            const milliseconds = transformTimeStampToMS(event.target.value);
            const newTimeValues = [this.state.values[0], milliseconds];
            if (this.canMoveValues(newTimeValues)) {
                this.setState({
                    startLabel: msToTime(this.state.values[0]),
                    endLabel: msToTime(milliseconds),
                    values: newTimeValues,
                });
                this.props.onMoveAll({ values: newTimeValues });
            } else {
                // Change to old values - 10 IF OUT OF RANGE
                const newTimeValues = [milliseconds - 10000, milliseconds];
                this.setState({
                    startLabel: msToTime(milliseconds - 10000),
                    endLabel: msToTime(milliseconds),
                    values: newTimeValues,
                });
            }
        }
    };

    handleBlurEndTime = event => {
        this.handleEndTimeSet(event, true);
    };

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.startTime !== this.props.startTime) {
            const values = newProps.startTime
                ? [newProps.startTime, newProps.endTime]
                : this.props.defaultRangeValues;
            this.setState({
                values,
                startLabel: msToTime(values[0] || 0),
                endLabel: msToTime(values[1] || 0),
            });
        }
    }

    canMoveValues = values => {
        const newValues = values.slice();
        if (values[0] < 0) {
            return false;
        } else if (
            Math.max(values[0], values[1]) - Math.min(values[0], values[1]) >
            this.MAX_MS_SECONDS
        ) {
            return false;
        } else if (
            Math.max(values[0], values[1]) - Math.min(values[0], values[1]) <
            this.MIN_MS_SECONDS
        ) {
            return false;
        } else if (values[0] >= values[1]) {
            // If the start time is past the end time or equals cant move
            return false;
        }
        return true;
    };

    onMoving = ({ startTime, endTime }) => {
        this.setState({
            values: [startTime, endTime],
            startLabel: msToTime(startTime),
            endLabel: msToTime(endTime),
        });
    };

    onMoveComplete = ({ startTime, endTime }) => {
        const newValues = [startTime, endTime];
        this.setState({
            values: newValues,
            startLabel: msToTime(startTime),
            endLabel: msToTime(endTime),
        });
        this.props.onMoveAll({ values: newValues });
    };

    decrementStart = () => {
        const newTimeValues = [
            this.state.values[0] - 100,
            this.state.values[1],
        ];
        if (newTimeValues[0] <= 0) {
            return;
        }
        if (this.canMoveValues(newTimeValues)) {
            this.setState({
                startLabel: msToTime(newTimeValues[0]),
                endLabel: msToTime(newTimeValues[1]),
                values: newTimeValues,
            });
            this.props.onMoveAll({ values: newTimeValues });
        } else {
            const newnewTimeValues = [
                this.state.values[0] - 100,
                this.state.values[1] - 100,
            ];
            this.setState({
                startLabel: msToTime(newnewTimeValues[0]),
                endLabel: msToTime(newnewTimeValues[1]),
                values: newnewTimeValues,
            });
            this.props.onMoveAll({ values: newnewTimeValues });
        }
    };

    incrementStart = () => {
        const newTimeValues = [
            this.state.values[0] + 100,
            this.state.values[1],
        ];
        if (this.canMoveValues(newTimeValues)) {
            this.setState({
                startLabel: msToTime(newTimeValues[0]),
                endLabel: msToTime(newTimeValues[1]),
                values: newTimeValues,
            });
            this.props.onMoveAll({ values: newTimeValues });
        } else {
            this.resetTimeStamps();
        }
    };

    decrementEnd = () => {
        const newTimeValues = [
            this.state.values[0],
            this.state.values[1] - 100,
        ];
        if (this.canMoveValues(newTimeValues)) {
            this.setState({
                startLabel: msToTime(newTimeValues[0]),
                endLabel: msToTime(newTimeValues[1]),
                values: newTimeValues,
            });
            this.props.onMoveAll({ values: newTimeValues });
        } else {
            this.resetTimeStamps();
        }
    };

    incrementEnd = () => {
        const newTimeValues = [
            this.state.values[0],
            this.state.values[1] + 100,
        ];
        if (newTimeValues[1] >= this.props.audioDuration) {
            return;
        }
        if (this.canMoveValues(newTimeValues)) {
            this.setState({
                startLabel: msToTime(newTimeValues[0]),
                endLabel: msToTime(newTimeValues[1]),
                values: newTimeValues,
            });
            this.props.onMoveAll({ values: newTimeValues });
        } else {
            const newnewTimeValues = [
                this.state.values[0] + 100,
                this.state.values[1] + 100,
            ];
            this.setState({
                startLabel: msToTime(newnewTimeValues[0]),
                endLabel: msToTime(newnewTimeValues[1]),
                values: newnewTimeValues,
            });
            this.props.onMoveAll({ values: newnewTimeValues });
        }
    };

    render() {
        return (
            <MainContainer>
                <Label
                    isColored={
                        Math.max(this.state.values[0], this.state.values[1]) -
                            Math.min(
                                this.state.values[0],
                                this.state.values[1],
                            ) >=
                        9900
                    }
                >{`${
                    Math.max(this.state.values[0], this.state.values[1]) -
                        Math.min(this.state.values[0], this.state.values[1]) >=
                    9900
                        ? "(10 Second Max)"
                        : ""
                }`}</Label>

                <AudioSelector
                    audioDuration={this.props.audioDuration}
                    onMoving={this.onMoving}
                    onMoveComplete={this.onMoveComplete}
                    startTime={this.props.startTime}
                    endTime={this.props.endTime}
                    currentTime={this.props.currentTime}
                    showCurrentTime={this.props.showCurrentTime}
                />

                {/* ${msToTime(
          Math.max(this.state.values[0], this.state.values[1]) -
            Math.min(this.state.values[0], this.state.values[1])
        )}  */}

                <TimeSelectionContainer>
                    <TimeSelectionContainer>
                        <TimeSelectionContainerColumn>
                            <TimeSelectionContainer>
                                <TimeSelectionContainerColumn>
                                    <IncrementButton
                                        onClick={this.decrementStart}
                                    >
                                        {/* <IncrementIcon
                      imageSrc="https://storage.googleapis.com/blerp-public-images/interaction/backward.svg"
                      hoverSrc="https://storage.googleapis.com/blerp-public-images/interaction/backward-pink.svg"
                    /> */}
                                        <LargeLabel isColored={false}>
                                            {"-"}
                                        </LargeLabel>
                                    </IncrementButton>
                                </TimeSelectionContainerColumn>

                                <TimeSelectionContainerColumn>
                                    <TimeInput
                                        type='text'
                                        onChange={this.handleStartTimeType}
                                        onKeyPress={this.handleStartTimeSet}
                                        onBlur={this.handleBlurStartTime}
                                        value={this.state.startLabel}
                                        error={false}
                                    />
                                </TimeSelectionContainerColumn>
                                <TimeSelectionContainerColumn>
                                    <IncrementButton
                                        onClick={this.incrementStart}
                                    >
                                        {/* <IncrementIcon
                      imageSrc="https://storage.googleapis.com/blerp-public-images/interaction/foward.svg"
                      hoverSrc="https://storage.googleapis.com/blerp-public-images/interaction/forward-pink.svg"
                    /> */}
                                        <LargeLabel isColored={false}>
                                            {"+"}
                                        </LargeLabel>
                                    </IncrementButton>
                                </TimeSelectionContainerColumn>
                            </TimeSelectionContainer>
                            <Label isColored={false}>{"Start point"}</Label>
                        </TimeSelectionContainerColumn>
                    </TimeSelectionContainer>

                    {this.props.renderPlayPauseButtons && (
                        <TimeSelectionContainer>
                            <ButtonContainer>
                                {this.props.isPlaying ? (
                                    <InteractButton
                                        onClick={this.props.pauseVideo}
                                        disabled={false}
                                    >
                                        <ButtonImage
                                            alt='Pause Video'
                                            src='https://storage.googleapis.com/blerp_products/Web/creation_page/Pause.svg'
                                        />
                                    </InteractButton>
                                ) : (
                                    <InteractButton
                                        onClick={
                                            this.props.playVideoCurrentTime
                                        }
                                        disabled={false}
                                    >
                                        <ButtonImage
                                            alt='Play Video'
                                            src='https://storage.googleapis.com/blerp_products/Web/creation_page/Play.svg'
                                        />
                                    </InteractButton>
                                )}

                                <InteractButtonTiny
                                    onClick={this.props.playVideo}
                                    disabled={false}
                                >
                                    {this.props.isPlaying ? (
                                        <ButtonImageTiny
                                            alt='Repeat Video'
                                            src='https://storage.googleapis.com/blerp_products/Web/creation_page/icon%20repeat.svg'
                                        />
                                    ) : (
                                        <ButtonImageTiny
                                            alt='Repeat Video'
                                            src='https://storage.googleapis.com/blerp_products/Web/creation_page/icon%20repeat.svg'
                                        />
                                    )}
                                    {/* <ButtonImageTiny
                      alt="Repeat Video"
                      src="https://storage.googleapis.com/blerp_products/Web/creation_page/icon%20repeat.svg"
                    /> */}
                                </InteractButtonTiny>
                            </ButtonContainer>
                        </TimeSelectionContainer>
                    )}

                    <TimeSelectionContainer>
                        <TimeSelectionContainerColumn>
                            <TimeSelectionContainer>
                                <TimeSelectionContainerColumn>
                                    <IncrementButton
                                        onClick={this.decrementEnd}
                                    >
                                        {/* <IncrementIcon
                      imageSrc="https://storage.googleapis.com/blerp-public-images/interaction/backward.svg"
                      hoverSrc="https://storage.googleapis.com/blerp-public-images/interaction/backward-pink.svg"
                    /> */}
                                        <LargeLabel isColored={false}>
                                            {"-"}
                                        </LargeLabel>
                                    </IncrementButton>
                                </TimeSelectionContainerColumn>
                                <TimeSelectionContainerColumn>
                                    <TimeInput
                                        type='text'
                                        onChange={this.handleEndTimeType}
                                        onKeyPress={this.handleEndTimeSet}
                                        onBlur={this.handleBlurEndTime}
                                        value={this.state.endLabel}
                                        error={false}
                                    />
                                </TimeSelectionContainerColumn>
                                <TimeSelectionContainerColumn>
                                    <IncrementButton
                                        onClick={this.incrementEnd}
                                    >
                                        {/* <IncrementIcon
                      imageSrc="https://storage.googleapis.com/blerp-public-images/interaction/foward.svg"
                      hoverSrc="https://storage.googleapis.com/blerp-public-images/interaction/forward-pink.svg"
                    /> */}
                                        <LargeLabel isColored={false}>
                                            {"+"}
                                        </LargeLabel>
                                    </IncrementButton>
                                </TimeSelectionContainerColumn>
                            </TimeSelectionContainer>
                            <Label isColored={false}>{"End point"}</Label>
                        </TimeSelectionContainerColumn>
                    </TimeSelectionContainer>
                </TimeSelectionContainer>
            </MainContainer>
        );
    }
}
