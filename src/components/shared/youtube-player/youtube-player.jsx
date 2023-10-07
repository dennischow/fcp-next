import { useEffect, useState } from "react";
import { FaFastBackward, FaFastForward, FaRandom, FaTimes } from "react-icons/fa";

import * as CONSTANTS from "../../../common/constants";

const YoutubePlayer = ({ closeYoutubePlayer }) => {
    const videoIds = CONSTANTS.VIDEO_IDS;
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlayerPending, setIsPlayerReady] = useState(true);

    const nextVideoHandler = () => {
        if (currentVideoIndex === videoIds.length - 1) {
            setCurrentVideoIndex(0);
        } else {
            setCurrentVideoIndex(currentVideoIndex + 1);
        }
    };

    const previousVideoHandler = () => {
        if (currentVideoIndex === 0) {
            setCurrentVideoIndex(videoIds.length - 1);
        } else {
            setCurrentVideoIndex(currentVideoIndex - 1);
        }
    };

    const randomVideoHandler = () => {
        setCurrentVideoIndex(Math.floor(Math.random() * videoIds.length));
    };

    useEffect(() => {
        setTimeout(() => setIsPlayerReady(false), 800);
    }, []);

    const currentVideoId = videoIds[currentVideoIndex];

    return (
        <div className={`youtube-player ${isPlayerPending ? "youtube-player--pending" : ""}`}>
            <div className="youtube-player__inner">
                <div className="youtube-player__embed-media youtube-player__embed-media--aspect-16by9">
                    <iframe
                        className="youtube-player__media-item"
                        width="640"
                        height="390"
                        src={`https://www.youtube.com/embed/${currentVideoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        autoPlay="1"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                </div>

                <div className="youtube-player__control">
                    <p className="youtube-player__number">{`${currentVideoIndex + 1}/${videoIds.length}`}</p>
                    <div className="youtube-player__button-container">
                        <button
                            className="youtube-player__button youtube-player__button--previous"
                            type="button"
                            onClick={previousVideoHandler}>
                            <FaFastBackward />
                        </button>
                        <button
                            className="youtube-player__button youtube-player__button--next"
                            type="button"
                            onClick={nextVideoHandler}>
                            <FaFastForward />
                        </button>
                        <button
                            className="youtube-player__button youtube-player__button--random"
                            type="button"
                            onClick={randomVideoHandler}>
                            <FaRandom />
                        </button>
                    </div>
                    <button
                        className="youtube-player__button youtube-player__button--close"
                        type="button"
                        onClick={closeYoutubePlayer}>
                        <FaTimes />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default YoutubePlayer;
