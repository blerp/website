/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

import * as React from "react";
import styled from "styled-components";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 200;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
`;

const INDICATOR_SPACE = 0;

const StartTimeIndicator = styled.div`
    cursor: w-resize;
    background-color: #21cfa7;
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
    background-color: #ff785b;
    position: absolute;
    width: 2px;
    height: ${CANVAS_HEIGHT - (40 + INDICATOR_SPACE)}px;
    top: ${INDICATOR_SPACE}px;
    left: ${props => (props.currentSpot ? props.currentSpot : 0)}px;
    z-index: 1000;
`;

const StartDragCircle = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: #21cfa7;
    border: solid #21cfa7 4px;
    bottom: 0;
    left: ${props => (props.currentSpot ? props.currentSpot - 26 : -26)}px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    z-index: ${props => (props.isSelected ? 1050 : 1000)};
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
`;

const EndDragCircle = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #fe295c;
    border-radius: 40px;
    border: solid #fe295c 4px;
    bottom: 0;
    left: ${props => (props.currentSpot ? props.currentSpot - 22 : -22)}px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    z-index: ${props => (props.isSelected ? 1050 : 1000)};
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
`;

const TimeOverlay = styled.div`
    cursor: move;
    border-radius: 0;
    background-color: ${props => props.color};
    position: absolute;
    width: ${props => props.width}px;
    height: ${CANVAS_HEIGHT - 40}px;
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
    margin: 20px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
`;

const Label = styled.label`
    font-weight: bold;
    padding: 4px 0;
`;

const AudioBackground = styled.img`
    position: absolute;
    top: 12px;
    width: ${CANVAS_WIDTH}px;
    height: ${CANVAS_HEIGHT / 2}px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
`;

const BackgroundLine = styled.div`
    position: absolute;
    top: ${CANVAS_HEIGHT / 2 + 12}px;
    height: 4px;
    background-color: #47463f;
    width: ${CANVAS_WIDTH}px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    z-index: 10;
`;

const DefaultProps = {
    audioDuration: 0,
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

export default class AudioViewer extends React.Component {
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
            lastDraggedStart: true,
            lastDraggedEnd: false,
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.startTime || !newProps.endTime) {
            return;
        } else if (
            newProps.startTime !== this.props.startTime ||
            newProps.endTime !== this.props.endTime
        ) {
            this.setState({
                startTime: newProps.startTime,
                endTime: newProps.endTime,
            });
        }
    }

    setCanvasRef = can => {
        this.canvas = can;
    };

    transformTimeToPosition(time) {
        const position = (time * CANVAS_WIDTH) / this.props.audioDuration;
        return position;
    }

    getTimeAndPosition = event => {
        const rect = this.canvas.getBoundingClientRect();
        const position = event.clientX - rect.left;
        const time = (position / CANVAS_WIDTH) * this.props.audioDuration;
        if (time < 0) {
            return { position: 0, time: 0 };
        } else if (time > this.props.audioDuration) {
            return { position: CANVAS_WIDTH, time: this.props.audioDuration };
        } else {
            return { position, time };
        }
    };

    placeEvent(event, complete) {
        if (!this.state.draggingStart && !this.state.draggingEnd) {
            return;
        }
        let { position, time } = this.getTimeAndPosition(event);
        const MIN_START_TIME = this.state.endTime - this.MAXIMUM_TIME_THRESHOLD;
        const MAX_END_TIME = this.state.startTime + this.MAXIMUM_TIME_THRESHOLD;

        if (this.state.draggingStart && this.state.draggingEnd) {
            const positionDifference = this.firstTime - time;
            const newStart = this.firstStartTime - positionDifference;
            const newEnd = this.firstEndTime - positionDifference;
            if (newEnd > this.props.audioDuration || newStart < 0) {
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
        let { position, time } = this.getTimeAndPosition(event);
        const MIN_START_TIME = this.state.endTime - this.MAXIMUM_TIME_THRESHOLD;
        const MAX_END_TIME = this.state.startTime + this.MAXIMUM_TIME_THRESHOLD;

        if (this.state.draggingStart && this.state.draggingEnd) {
            const positionDifference = this.firstTime - time;
            const newStart = this.firstStartTime - positionDifference;
            const newEnd = this.firstEndTime - positionDifference;

            if (newEnd > this.props.audioDuration || newStart < 0) {
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
            endTime > this.props.audioDuration
                ? this.props.audioDuration
                : endTime;

        const newStartTime = startTime < 0 ? 0 : startTime;

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
        let { position, time } = this.getTimeAndPosition(event);

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
        let { position, time } = this.getTimeAndPosition(event);

        const CLICK_BUFFER = 4;

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
        let { position, time } = this.getTimeAndPosition(event);

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
            currentTime: 0,
            endTime: 0,
            startTime: 0,
        });
        this.props.onMoveComplete({ startTime: 0, endTime: 0 });
    };

    withinThreshold(startTime, endTime) {
        const currentThreshold = Math.abs(startTime - endTime);
        return (
            currentThreshold >= this.MINIMUM_TIME_THRESHOLD &&
            currentThreshold <= this.MAXIMUM_TIME_THRESHOLD
        );
    }

    renderStartEndIndicators() {
        if (true) {
            const overlayWidth = Math.abs(
                this.transformTimeToPosition(
                    this.state.endTime - this.state.startTime,
                ) || 0,
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
                                ? "#27AAFF"
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
    }

    render() {
        return (
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
        );
    }
}
