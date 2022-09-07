import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleRight,
    faAngleLeft,
    faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
    setSongInfo,
    songInfo,
    audioRef,
    currentSong,
    isPlaying,
    setIsPlaying,
    songs,
    setCurrentSong,
    setSongs,
}) => {
    function playSongHandler() {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
        console.log(e.target.value);
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const skipTrackHandler = async (direction) => {
        const currentIndex = songs.findIndex(
            (song) => song.id == currentSong.id
        );

        if (direction === "skip-forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeSongHandler(songs[(currentIndex + 1) % songs.length]);
        } else if (direction === "skip-backward") {
            if ((currentIndex - 1) % songs.length == -1) {
                await setCurrentSong(songs[songs.length - 1]);
                activeSongHandler(songs[songs.length - 1]);

                if (isPlaying) audioRef.current.play();

                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeSongHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) audioRef.current.play();
    };

    const activeSongHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        console.log("useEffect currentSOng");
        setSongs(newSongs);
    };
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    };
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    style={{
                        background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
                    }}
                    className="track"
                >
                    <input
                        min="0"
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        type="range"
                        onChange={dragHandler}
                        name=""
                        id=""
                    />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-backward")}
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler("skip-forward")}
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                />
            </div>
        </div>
    );
};

export default Player;
