/*
 * BLERP LLC ("BLERP") CONFIDENTIAL
 * Copyright (c) 2018 Blerp LLC All Rights Reserved.
 * This file is subject to the terms and conditions defined in the file 'LICENSE',
 *   which is at the root directory of this source code repository.
 */
class GlobalAudioPlayer {
    state;
    currentPlayer;
    biteId;
    currentFinishedCallback;
    audioElement;

    constructor() {
        this.currentPlayer = 0;
    }

    setupAudioElement = ({
        sources,
        onDurationChange,
        handleStopClick,
        onTimeUpdate,
        isRepeat,
        isPreload,
    }) => {
        this.audioElement = document.getElementById("global-audio-player");
        this.audioElement.innerHTML = "";
        this.audioElement.ondurationchange = onDurationChange;
        this.audioElement.onended = handleStopClick;
        this.audioElement.ontimeupdate = onTimeUpdate;

        sources.forEach((src, index) => {
            const source = document.createElement("source");
            source.src = src;
            this.audioElement.appendChild(source);
        });
        this.audioElement.preload = isPreload ? "auto" : "none";
        this.audioElement.loop = isRepeat;
        this.audioElement.load();
        return this.audioElement;
    };

    getCurrentAudioPlayer = () => {
        return this.audioElement;
    };

    stopAllClicks = () => {
        const sounds = document.getElementsByTagName("audio");
        for (let i = 0; i < sounds.length; i++) {
            if (sounds[i]) {
                sounds[i].pause();
                sounds[i].currentTime = 0;
            }
        }
    };

    incrementPlayer() {
        switch (this.currentPlayer) {
            case 0:
                this.currentPlayer = 1;
                break;
            case 1:
                this.currentPlayer = 2;
                break;
            default:
                this.currentPlayer = 0;
                break;
        }
    }
}

export default new GlobalAudioPlayer();
