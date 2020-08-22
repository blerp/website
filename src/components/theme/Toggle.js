import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Slider = styled.div`
     {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 34px;
    }

    &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
    }
`;

const ToggleInput = styled.input`
    &:checked + ${Slider} {
        background-color: #2196f3;
    }
    ut:focus + ${Slider} {
        box-shadow: 0 0 1px #2196f3;
    }

    &:checked + ${Slider}:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`;

const Switch = styled.div`
     {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    & ${ToggleInput} {
        opacity: 0;
        width: 0;
        height: 0;
    }
`;

export const Toggle = props => {
    const [checked, setChecked] = useState(false);

    return (
        <Switch
            onClick={() => {
                props.handleClick(!checked);
                setChecked(!checked);
            }}
        >
            <ToggleInput checked={checked} type='checkbox' />
            <Slider></Slider>
        </Switch>
    );
};
