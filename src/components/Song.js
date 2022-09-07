import React from "react";

const Song = ({ isPlaying, currentSong }) => {
    let coverImg;
    if (isPlaying) {
        coverImg = (
            <img
                className="cover"
                src={currentSong.cover}
                alt={currentSong.name}
            />
        );
    } else {
        coverImg = (
            <img
                className="cover rotate"
                src={currentSong.cover}
                alt={currentSong.name}
            />
        );
    }
    return (
        <div className="song-container">
            {coverImg}
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    );
};

export default Song;
