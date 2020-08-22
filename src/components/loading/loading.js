/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 *
 * @flow
 */

import * as React from "react";
import styled from "styled-components";
import { allBlerpColors } from "../../lib/helperFunctions";

const Loader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Wave = styled.div`
    position: relative;
`;

const Dot = styled.div`
    width: 16px;
    height: 16px;
    background: #9276d6;
    position: absolute;
    border-radius: 6px;
`;

const colors = allBlerpColors;

// interface State {
//   top: number;
//   ys: number[];
//   intervalId: any;
// }

// interface Props {
//   height?: number;
//   period?: number;
//   amplitude?: number;
//   isMobile?: boolean;
// }

const defaultProps = {
    amplitude: 80,
    height: 280,
    period: 16,
    isMobile: false,
};

export default class Loading extends React.Component {
    static defaultProps = defaultProps;
    x = 1;
    state = {
        intervalId: null,
        top: this.props.height / 2,
        ys: [],
    };

    componentDidMount() {
        const period = this.props.isMobile
            ? this.props.period / 1.2
            : this.props.period;
        const count = period * 3;
        const dx = (2 * Math.PI) / period;
        const amplitude = this.props.isMobile
            ? this.props.amplitude / 2
            : this.props.amplitude;
        const intervalId = setInterval(() => {
            this.setState({ ys: this.calc(dx, amplitude, count) });
        }, 55);
        this.setState({ intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    calc(dx, amplitude, count) {
        const ys = [];
        for (let i = 0; i <= count; i++) {
            ys.push(Math.sin(this.x) * amplitude);
            this.x += dx;
        }
        return ys;
    }

    render() {
        return (
            <Loader>
                {this.state.ys.map((y, index) => (
                    <Wave key={index}>
                        <Dot
                            style={{
                                background:
                                    colors[
                                        Math.floor(
                                            Math.random() * colors.length,
                                        )
                                    ],
                                top: `${y + this.state.top}px`,
                            }}
                        />
                    </Wave>
                ))}
            </Loader>
        );
    }
}
