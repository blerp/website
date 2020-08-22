/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2016 - 2017 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */

// Takes an array and returns a string
export const convertTagsToString = tags => {
    return tags.reduce((a, cv) => {
        return a + "#" + cv + " ";
    }, "");
};

export const allBlerpColors = [
    "#FE295C",
    "#DD1243",
    "#B72044",
    "#FF9761",
    "#27AAFF",
    "#21CFA7",
    "#3580B1",
];

export const randomBlerpColor = () => {
    const colors = allBlerpColors;

    return colors[Math.floor(Math.random() * colors.length)];
};
