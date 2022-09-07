import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
    isPlaying,
    audioRef,
    songs,
    setCurrentSong,
    setSongs,
    libraryStatus,
}) => {
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song, index) => (
                    <LibrarySong
                        audioRef={audioRef}
                        setCurrentSong={setCurrentSong}
                        song={song}
                        isPlaying={isPlaying}
                        key={index}
                        songs={songs}
                        id={song.id}
                        setSongs={setSongs}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;
