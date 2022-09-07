// import "./styles/app.scss";
import "./styles/app.scss";
import Song from "./components/Song";
import Player from "./components/Player";
import Nav from "./components/Nav";

import data from "./data";
import { useState, useRef } from "react";
import Library from "./components/Library";

function App() {
    const audioRef = useRef(null);
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [libraryStatus, setLibraryStatus] = useState(false);

    const myStyle = {
        position: "absolute",
        height: "100vh",
        background: `url(${currentSong.cover}) no-repeat center center/cover`,
        zIndex: "-1",
        opacity: ".1",
        top: "0",
        left: "0",
        width: "100%",
        transition: "all .5s ease",
    };

    const timeUpdateHandler = (e) => {
        let current = e.target.currentTime;
        let duration = e.target.duration;
        //Calculate Percentage
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100);
        // console.log(current, duration);
        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration,
            animationPercentage: animation,
        });
        // console.log(animation);

        // console.log(current, duration);
    };

    const songEndHandler = async () => {
        const currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        if (isPlaying) audioRef.current.play();
    };
    let appStyle;
    if (libraryStatus) {
        appStyle = {
            paddingLeft: "10rem",
            transition: "all 1s ease",
        };
    } else {
        appStyle = {
            paddingLeft: "0rem",
            transition: "all 1s ease",
        };
    }

    return (
        <div style={appStyle} className="App">
            <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            ></Nav>
            <Song isPlaying={isPlaying} currentSong={currentSong} />
            <Player
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                audioRef={audioRef}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                currentSong={currentSong}
                songs={songs}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
            />
            <Library
                audioRef={audioRef}
                setCurrentSong={setCurrentSong}
                songs={songs}
                isPlaying={isPlaying}
                setSongs={setSongs}
                libraryStatus={libraryStatus}
            />
            <audio
                src={currentSong.audio}
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                onEnded={songEndHandler}
            ></audio>
            <div style={myStyle} className="coverImg"></div>
        </div>
    );
}

export default App;
