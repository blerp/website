/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";
import {
    flyoutBackground,
    secondaryGray,
    bodyText,
    pandaPink,
    lightGray,
} from "../../styles/colors";

import { msToTime } from "../../lib/utils";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 140;

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const RowContainerLarge = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const RowContainerLargeWide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
`;
const MainContainerTransparentRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.96);
    height: 72px;
    -webkit-box-shadow: 10px 0px 7px -10px rgba(0, 0, 0, 0.35);
    -moz-box-shadow: 10px 0px 7px -10px rgba(0, 0, 0, 0.35);
    box-shadow: 10px 0px 7px -10px rgba(0, 0, 0, 0.35);
    min-height: 200px;
`;

const MainContainerTransparentLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.96);
    height: 72px;
    -webkit-box-shadow: -10px 0px 7px -10px rgba(0, 0, 0, 0.35);
    -moz-box-shadow: -10px 0px 7px -10px rgba(0, 0, 0, 0.35);
    box-shadow: -10px 0px 7px -10px rgba(0, 0, 0, 0.35);
    min-height: 200px;
`;

const INDICATOR_SPACE = 0;
const OVERLAY_HEIGHT = 46;

const StartTimeIndicator = styled.div`
    cursor: w-resize;
    background-color: ${props => props.theme.seafoam};
    position: absolute;
    width: 4px;
    height: ${CANVAS_HEIGHT - (20 + INDICATOR_SPACE)}px;
    top: ${INDICATOR_SPACE}px;
    left: ${props => (props.currentSpot ? props.currentSpot - 4 : -4)}px;
    z-index: 100;
    user-select: none;
`;

const EndTimeIndicator = styled.div`
    cursor: e-resize;
    background-color: #fe295c;
    position: absolute;
    width: 4px;
    height: ${CANVAS_HEIGHT - (20 + INDICATOR_SPACE)}px;
    top: ${INDICATOR_SPACE}px;
    left: ${props => (props.currentSpot ? props.currentSpot : 0)}px;
    z-index: 100;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
`;

const CurrentTimeIndicator = styled.div`
    background-color: ${props => props.theme.starling};
    position: absolute;
    width: 3px;
    height: ${CANVAS_HEIGHT - (OVERLAY_HEIGHT + INDICATOR_SPACE)}px;
    top: ${INDICATOR_SPACE}px;
    left: ${props => (props.currentSpot ? props.currentSpot : 0)}px;
    z-index: 1000;
`;

const StartDragCircle = styled.div`
    position: absolute;
    width: 32px;
    height: 32px;
    background-color: ${props => props.theme.seafoam};
    border: solid ${props => props.theme.seafoam} 4px;
    bottom: 0;
    left: ${props => (props.currentSpot ? props.currentSpot - 22 : -22)}px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    z-index: ${props => (props.isSelected ? 1050 : 1000)};
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    border-radius: 80% 0 55% 50% / 55% 0 80% 50%;
    transform: rotate(-45deg);
`; //80% 0 55% 50% / 55% 0 80% 50%

const EndDragCircle = styled.div`
    position: absolute;
    width: 32px;
    height: 32px;
    background-color: #fe295c;
    border: solid #fe295c 4px;
    bottom: 0;
    left: ${props => (props.currentSpot ? props.currentSpot - 18 : -18)}px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    z-index: ${props => (props.isSelected ? 1050 : 1000)};
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    border-radius: 80% 0 55% 50% / 55% 0 80% 50%;
    transform: rotate(-45deg);
`;

const TimeOverlay = styled.div`
    cursor: move;
    border-radius: 0;
    background-color: ${props => props.color};
    position: absolute;
    width: ${props => props.width}px;
    height: ${CANVAS_HEIGHT - OVERLAY_HEIGHT}px;
    top: 0;
    left: ${props => (props.currentSpot ? props.currentSpot : 0)}px;
    opacity: 0.6;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
`;

const StartEndContainer = styled.div`
    pointer-events: auto;
`;

const StyledCanvasContainer = styled.div`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: #fff;
    border: 4px;
    solid: #404040;
    position: relative;
    margin: 4px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
`;

const AudioBackground = styled.img`
    position: absolute;
    top: 20px;
    left: -200px;
    height: ${CANVAS_HEIGHT / 2}px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
`;

const BackgroundLine = styled.div`
    position: absolute;
    top: ${CANVAS_HEIGHT / 2 + 20}px;
    height: 4px;
    background-color: #47463f;
    width: ${CANVAS_WIDTH + 60}px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    z-index: 10;
    right: -20px;
`;

const DefaultProps = {
    audioDuration: 0,
    defaultViewerWindowInterval: 30000, // The default size of the viewing window in ms
    onMoving: ({ startTime, endTime }) => {},
    onMoveComplete: ({ startTime, endTime }) => {},
};

// All values are in millseconds for now
// interface Props {
//   audioDuration?: number;
//   endTime?: number;
//   startTime?: number;
//   onMoving?: any;
//   onMoveComplete?: any;
//   showCurrentTime?: boolean;
//   currentTime?: number;
// }

const MoveTimeframeButton = styled.button`
    z-index: 10;
    border: none;
    height: 48px;
    width: 48px;
    margin: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 100px;
    opacity: 1;
    cursor: pointer;
    border: 2px solid ${props => props.theme.secondarySubtitleText};

    &:hover {
        background-color: ${lightGray};
        border: none;
    }

    &:focus {
        opacity: 0.8;
        border: 2px solid ${pandaPink};
    }
`;

const Label = styled.label`
    font-weight: bold;
    margin: 4px;
    font-size: 14px;
    padding: 4px 0;
    color: ${props => (props.isColored ? "#FE295C" : "#210000")};
`;

const LabelLight = styled.label`
    font-weight: light;
    margin: 4px;
    font-size: 14px;
    padding: 4px 0;
    color: ${props => (props.isColored ? "#FE295C" : "#210000")};
`;

const IncrementButton = styled.button`
    z-index: 10;
    border: none;
    font-size: 12px;
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: 100px;
    opacity: 1;
    margin: 4px;
    cursor: pointer;
    font-weight: lighter;
    border: 2px solid ${props => props.theme.secondarySubtitleText};

    &:active {
        border: 2px solid ${secondaryGray};
    }

    &:hover {
        background-color: ${lightGray};
        border: none;
    }

    &:focus {
        border: 2px solid ${secondaryGray};
    }

    @media (max-width: 600px) {
    }
`;

const IncrementIcon = styled.div`
    position: relative;
    width: 20px;
    height: 20px;
    padding: 4px;
    margin: 4px;
    opacity: 1;
    cursor: pointer;
    background: url(${props => props.imageSrc}) center no-repeat;

    &:hover {
        opacity: 0.8;
        background: url(${props => props.hoverSrc}) center no-repeat;
    }
`;

export default class MobileAudioSelector extends React.Component {
    static defaultProps = DefaultProps;
    props;
    state;
    audioElement;
    canvas;
    firstTime;
    firstStartTime;
    firstEndTime;
    MINIMUM_TIME_THRESHOLD = 100;
    MAXIMUM_TIME_THRESHOLD = 10000;
    AUDIOWAVE_COLOR = "#A1A1A1";
    AUDIO_BACKGROUND_COLOR = "1";

    constructor(props) {
        super(props);

        this.state = {
            draggingEnd: false,
            draggingStart: false,
            endTime: props.endTime,
            startTime: props.startTime || 0,
            startWindowTime: 0,
            endWindowTime:
                props.audioDuration < props.defaultViewerWindowInterval
                    ? props.audioDuration
                    : props.defaultViewerWindowInterval,
            lastDraggedStart: true,
            lastDraggedEnd: false,
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.audioDuration !== this.props.audioDuration) {
            if (newProps.audioDuration < newProps.defaultViewerWindowInterval) {
                this.setState({ endWindowTime: newProps.audioDuration });
            } else {
                this.setState({
                    endWindowTime: newProps.defaultViewerWindowInterval,
                });
            }
        }

        if (!newProps.startTime || !newProps.endTime) {
            return;
        } else if (
            newProps.startTime !== this.props.startTime ||
            newProps.endTime !== this.props.endTime
        ) {
            if (
                newProps.startTime < newProps.startWindowTime ||
                newProps.endTime > newProps.endWindowTime
            ) {
                this.setState({
                    startTime: newProps.startTime,
                    endTime: newProps.endTime,
                    startWindowTime: newProps.startTime,
                    endWindowTime:
                        newProps.startTime +
                        newProps.defaultViewerWindowInterval,
                });
            } else {
                this.setState({
                    startTime: newProps.startTime,
                    endTime: newProps.endTime,
                });
            }
        }
    }

    onMoveViewingWindowLeft = windowIntervalDelta => () => {
        if (this.props.defaultViewerWindowInterval > this.props.audioDuration) {
            return;
        }
        const defaultAudioDuration = 2000;
        const newViewerWindowStart =
            this.state.startWindowTime - windowIntervalDelta;
        if (newViewerWindowStart < 0) {
            this.setState({
                startWindowTime: 0,
                endWindowTime: this.props.defaultViewerWindowInterval,
            });
            this.placeStartEndTime(0, defaultAudioDuration, true);
        } else {
            const newWindowEndTime =
                newViewerWindowStart + this.props.defaultViewerWindowInterval;
            this.setState({
                startWindowTime: newViewerWindowStart,
                endWindowTime: newWindowEndTime,
            });
            this.placeStartEndTime(
                newViewerWindowStart,
                newViewerWindowStart + defaultAudioDuration,
                true,
            );
        }
    };

    onMoveViewingWindowRight = windowIntervalDelta => () => {
        if (this.props.defaultViewerWindowInterval > this.props.audioDuration) {
            return;
        }
        const defaultAudioDuration = 2000;
        const newViewerWindowEnd =
            this.state.endWindowTime + windowIntervalDelta;
        if (newViewerWindowEnd > this.props.audioDuration) {
            const newWindowStartTime =
                this.props.audioDuration -
                this.props.defaultViewerWindowInterval;
            this.setState({
                startWindowTime: newWindowStartTime,
                endWindowTime: this.props.audioDuration,
            });
            this.placeStartEndTime(
                newWindowStartTime,
                newWindowStartTime + defaultAudioDuration,
                true,
            );
        } else {
            const newWindowStartTime =
                newViewerWindowEnd - this.props.defaultViewerWindowInterval;
            this.setState({
                startWindowTime: newWindowStartTime,
                endWindowTime: newViewerWindowEnd,
            });
            this.placeStartEndTime(
                newWindowStartTime,
                newWindowStartTime + defaultAudioDuration,
                true,
            );
        }
    };

    setCanvasRef = can => {
        this.canvas = can;
    };

    transformTimeToPosition(time) {
        const position =
            ((time - this.state.startWindowTime) /
                (this.state.endWindowTime - this.state.startWindowTime)) *
            CANVAS_WIDTH;
        return position;
    }

    getTimeFromEvent = event => {
        const rect = this.canvas.getBoundingClientRect();
        const position = event.clientX - rect.left;
        const time =
            (position / CANVAS_WIDTH) *
                (this.state.endWindowTime - this.state.startWindowTime) +
            this.state.startWindowTime;

        if (time < this.state.startWindowTime) {
            return { time: this.state.startWindowTime };
        } else if (time > this.state.endWindowTime) {
            return { time: this.state.endWindowTime };
        } else {
            return { time };
        }
    };

    placeEvent(event, complete) {
        if (!this.state.draggingStart && !this.state.draggingEnd) {
            return;
        }
        let { time } = this.getTimeFromEvent(event);
        const MIN_START_TIME = this.state.endTime - this.MAXIMUM_TIME_THRESHOLD;
        const MAX_END_TIME = this.state.startTime + this.MAXIMUM_TIME_THRESHOLD;

        if (this.state.draggingStart && this.state.draggingEnd) {
            const positionDifference = this.firstTime - time;
            const newStart = this.firstStartTime - positionDifference;
            const newEnd = this.firstEndTime - positionDifference;
            if (newEnd > this.state.endWindowTime || newStart < 0) {
                return;
            }
            this.placeEndSpot(newStart, newEnd, complete);
            this.firstTime = null;
        } else if (this.state.draggingStart) {
            if (time <= MIN_START_TIME) {
                time = MIN_START_TIME;
            }
            this.placeEndSpot(this.state.endTime, time, complete);
        } else {
            if (time >= MAX_END_TIME) {
                time = MAX_END_TIME;
            }
            this.placeEndSpot(time, this.state.startTime, complete);
        }
        this.setState({
            draggingEnd: false,
            draggingStart: false,
        });
    }

    mouseMoveCanvas = event => {
        if (!this.state.draggingStart && !this.state.draggingEnd) {
            return;
        }
        let { time } = this.getTimeFromEvent(event);
        const MIN_START_TIME = this.state.endTime - this.MAXIMUM_TIME_THRESHOLD;
        const MAX_END_TIME = this.state.startTime + this.MAXIMUM_TIME_THRESHOLD;

        if (this.state.draggingStart && this.state.draggingEnd) {
            const positionDifference = this.firstTime - time;
            const newStart = this.firstStartTime - positionDifference;
            const newEnd = this.firstEndTime - positionDifference;

            if (
                newEnd > this.state.endWindowTime ||
                newEnd > this.props.audioDuration ||
                newStart < 0 ||
                newStart < this.state.startWindowTime
            ) {
                return;
            }

            this.setState({
                startTime: newStart,
                endTime: newEnd,
            });
            this.props.onMoving({ startTime: newStart, endTime: newEnd });
        } else if (this.state.draggingStart) {
            if (time <= MIN_START_TIME) {
                time = MIN_START_TIME;
            }
            this.setState({
                startTime: time,
            });
            this.props.onMoving({
                startTime: time,
                endTime: this.state.endTime,
            });
        } else if (this.state.draggingEnd) {
            if (time >= MAX_END_TIME) {
                time = MAX_END_TIME;
            }
            this.setState({
                endTime: time,
            });
            this.props.onMoving({
                startTime: this.state.startTime,
                endTime: time,
            });
        }
    };

    mouseExitCanvas = event => {
        this.placeEvent(event, true);
    };

    mouseUpCanvas = event => {
        this.placeEvent(event, true);
    };

    placeEndSpot(endTime, startTime, complete) {
        const newEndTime =
            endTime > this.state.endWindowTime
                ? this.state.endWindowTime
                : endTime;

        const newStartTime =
            startTime < this.state.startWindowTime
                ? this.state.startWindowTime
                : startTime;

        if (this.withinThreshold(newEndTime, newStartTime)) {
            if (newEndTime < newStartTime) {
                this.placeStartEndTime(newEndTime, newStartTime, complete);
            } else {
                this.placeStartEndTime(newStartTime, newEndTime, complete);
            }
        } else {
            if (newEndTime < newStartTime) {
                if (this.state.draggingStart) {
                    this.placeStartEndTime(
                        newStartTime - 100,
                        newStartTime,
                        complete,
                    );
                } else {
                    this.placeStartEndTime(
                        newEndTime,
                        newEndTime + 100,
                        complete,
                    );
                }
            } else {
                if (this.state.draggingStart) {
                    this.placeStartEndTime(
                        newStartTime,
                        newStartTime + 100,
                        complete,
                    );
                } else {
                    this.placeStartEndTime(
                        newEndTime - 100,
                        newEndTime,
                        complete,
                    );
                }
            }
        }
    }

    placeStartEndTime = (startTime, endTime, complete) => {
        this.setState({
            startTime,
            endTime,
            draggingEnd: false,
            draggingStart: false,
        });
        if (complete) {
            this.props.onMoveComplete({
                startTime,
                endTime,
            });
        } else {
            this.props.onMoving({ startTime, endTime });
        }
    };

    mouseDownStart = event => {
        event.stopPropagation();
        if (this.state.draggingStart || this.state.draggingEnd) {
            return;
        }
        let { time } = this.getTimeFromEvent(event);

        const MIN_START_TIME = this.state.endTime - this.MAXIMUM_TIME_THRESHOLD;

        if (time <= MIN_START_TIME) {
            time = MIN_START_TIME;
        }

        this.setState({
            currentTime: time,
            startTime: time,
            draggingStart: true,
            lastDraggedStart: true,
            lastDraggedEnd: false,
        });

        this.props.onMoving({ startTime: time, endTime: this.state.endTime });
    };

    mouseDownEnd = event => {
        event.stopPropagation();
        if (this.state.draggingStart || this.state.draggingEnd) {
            return;
        }
        let { time } = this.getTimeFromEvent(event);

        const MAX_END_TIME = this.state.startTime + this.MAXIMUM_TIME_THRESHOLD;

        // Click anywhere before the start time then its dragging the start
        if (time >= MAX_END_TIME) {
            time = MAX_END_TIME;
        }

        this.setState({
            endTime: time,
            draggingEnd: true,
            lastDraggedStart: false,
            lastDraggedEnd: true,
        });

        this.props.onMoving({ startTime: this.state.startTime, endTime: time });
    };

    mouseDownCanvas = event => {
        if (this.state.draggingStart || this.state.draggingEnd) {
            return;
        }
        let { time } = this.getTimeFromEvent(event);

        const CLICK_BUFFER = 12;

        const MIN_START_TIME = this.state.endTime - this.MAXIMUM_TIME_THRESHOLD;
        const MAX_END_TIME = this.state.startTime + this.MAXIMUM_TIME_THRESHOLD;

        // Click anywhere before the start time then its dragging the start
        if (time <= this.state.startTime + CLICK_BUFFER) {
            if (time <= MIN_START_TIME) {
                time = MIN_START_TIME;
            }
            this.setState({
                currentTime: time,
                startTime: time,
                draggingStart: true,
            });
            this.props.onMoving({
                startTime: time,
                endTime: this.state.endTime,
            });
            // Click anywhere after the end time then its dragging the start
        } else if (time >= this.state.endTime - CLICK_BUFFER) {
            if (time >= MAX_END_TIME) {
                time = MAX_END_TIME;
            }
            this.setState({
                endTime: time,
                draggingEnd: true,
            });
            this.props.onMoving({
                startTime: this.state.startTime,
                endTime: time,
            });
        } else {
            this.firstTime = time;
            this.firstStartTime = this.state.startTime;
            this.firstEndTime = this.state.endTime;
            this.setState({
                endTime: this.firstEndTime,
                startTime: this.firstStartTime,
                draggingStart: true,
                draggingEnd: true,
            });
            this.props.onMoving({
                startTime: this.firstStartTime,
                endTime: this.firstEndTime,
            });
        }
    };

    resetStartEndPlacements = () => {
        this.setState({
            currentTime: this.state.startWindowTime,
            endTime: this.state.startWindowTime,
            startTime: this.state.startWindowTime,
        });
        this.props.onMoveComplete({
            startTime: this.state.startWindowTime,
            endTime: this.state.startWindowTime,
        });
    };

    withinThreshold(startTime, endTime) {
        const currentThreshold = Math.abs(startTime - endTime) - 100;
        return (
            currentThreshold >= this.MINIMUM_TIME_THRESHOLD &&
            currentThreshold <= this.MAXIMUM_TIME_THRESHOLD
        );
    }

    renderStartEndIndicators() {
        const overlayWidth = Math.abs(
            this.transformTimeToPosition(this.state.endTime) -
                this.transformTimeToPosition(this.state.startTime),
        );

        return (
            <StartEndContainer>
                <StartTimeIndicator
                    currentSpot={this.transformTimeToPosition(
                        this.state.startTime,
                    )}
                />
                <StartDragCircle
                    onMouseDown={this.mouseDownStart}
                    currentSpot={this.transformTimeToPosition(
                        this.state.startTime,
                    )}
                    isSelected={this.state.lastDraggedStart}
                />
                <TimeOverlay
                    color={
                        this.withinThreshold(
                            this.state.endTime,
                            this.state.startTime,
                        )
                            ? "#0FEBC5"
                            : "#eb8354"
                    }
                    currentSpot={this.transformTimeToPosition(
                        Math.min(this.state.startTime, this.state.endTime),
                    )}
                    width={overlayWidth}
                />
                {this.props.showCurrentTime && (
                    <CurrentTimeIndicator
                        currentSpot={this.transformTimeToPosition(
                            this.props.currentTime,
                        )}
                    />
                )}
                <EndTimeIndicator
                    currentSpot={this.transformTimeToPosition(
                        this.state.endTime,
                    )}
                />
                <EndDragCircle
                    currentSpot={this.transformTimeToPosition(
                        this.state.endTime,
                    )}
                    onMouseDown={this.mouseDownEnd}
                    isSelected={this.state.lastDraggedEnd}
                />
            </StartEndContainer>
        );
    }

    render() {
        return (
            <React.Fragment>
                {/* <RowContainerLarge>
          <MainContainer>
            <LabelLight>Adjust Time Window</LabelLight>
            <Label>{msToTime(this.state.startWindowTime)}</Label>
          </MainContainer>
          <MainContainer>
            <LabelLight>Adjust Time Window</LabelLight>
            <Label>{msToTime(this.state.endWindowTime)}</Label>
          </MainContainer>
        </RowContainerLarge> */}
                <RowContainer>
                    <MainContainerTransparentRight>
                        <RowContainer>
                            <IncrementButton
                                onClick={this.onMoveViewingWindowLeft(30000)}
                            >
                                <IncrementIcon
                                    imageSrc='https://storage.googleapis.com/blerp-public-images/interaction/backward.svg'
                                    hoverSrc='https://storage.googleapis.com/blerp-public-images/interaction/backward.svg'
                                />
                                -30
                            </IncrementButton>
                            <MoveTimeframeButton
                                onClick={this.onMoveViewingWindowLeft(1000)}
                            >
                                {" "}
                                <IncrementIcon
                                    imageSrc='https://storage.googleapis.com/blerp-public-images/interaction/backward.svg'
                                    hoverSrc='https://storage.googleapis.com/blerp-public-images/interaction/backward.svg'
                                />
                            </MoveTimeframeButton>
                        </RowContainer>
                    </MainContainerTransparentRight>
                    <MainContainer>
                        <StyledCanvasContainer
                            width={CANVAS_WIDTH}
                            height={CANVAS_HEIGHT}
                            onMouseLeave={this.mouseExitCanvas}
                            onMouseUp={this.mouseUpCanvas}
                            onMouseDown={this.mouseDownCanvas}
                            onMouseMove={this.mouseMoveCanvas}
                        >
                            <AudioBackground src='https://storage.googleapis.com/blerp-public-images/backgrounds/audio_background_drag.svg' />
                            <BackgroundLine />
                            <canvas
                                width={CANVAS_WIDTH}
                                height={CANVAS_HEIGHT}
                                ref={this.setCanvasRef}
                                style={{
                                    cursor: "pointer",
                                }}
                            />
                            {this.renderStartEndIndicators()}
                        </StyledCanvasContainer>
                    </MainContainer>

                    <MainContainerTransparentLeft>
                        <RowContainer>
                            <MoveTimeframeButton
                                onClick={this.onMoveViewingWindowRight(1000)}
                            >
                                {" "}
                                <IncrementIcon
                                    imageSrc='https://storage.googleapis.com/blerp-public-images/interaction/foward.svg'
                                    hoverSrc='https://storage.googleapis.com/blerp-public-images/interaction/foward.svg'
                                />
                            </MoveTimeframeButton>
                            <IncrementButton
                                onClick={this.onMoveViewingWindowRight(30000)}
                            >
                                +30
                                <IncrementIcon
                                    imageSrc='https://storage.googleapis.com/blerp-public-images/interaction/foward.svg'
                                    hoverSrc='https://storage.googleapis.com/blerp-public-images/interaction/foward.svg'
                                />
                            </IncrementButton>
                        </RowContainer>
                    </MainContainerTransparentLeft>
                </RowContainer>
            </React.Fragment>
        );
    }
}
