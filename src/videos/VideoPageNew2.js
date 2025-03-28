import React, { useState, useEffect, useCallback, useRef } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";

const FullscreenButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  transform: none;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  z-index: 10;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    right: 10px;
    bottom: 10px;
    padding: 6px 12px;
    font-size: 14px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 70vh;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  &:hover ${FullscreenButton} {
    opacity: 1;
  }

  @media (max-width: 768px) {
    max-width: 95vw;
    height: 60vh;
  }
`;

const CaptionContainer = styled.div`
  margin-top: 1em;
  margin-bottom: 0.5em;
  padding: 1em;
  white-space: pre-wrap;
  font-size: 18px;
  text-align: center;
  color: #444;
  background: #f5f5f5;
  border-radius: 8px;
  min-height: 20vh;
  max-height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;

  @media (max-width: 768px) {
    font-size: 16px;
    min-height: 15vh;
    max-height: 15vh;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }
`;

const InfoContainer = styled.div`
  margin-top: 0.5em;
  margin-bottom: 2em;
  padding: 1em;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  gap: 2em;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    gap: 1em;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: #444;
  font-size: 16px;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};

  &:hover {
    ${(props) => props.clickable && "opacity: 0.8;"}
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const MainContainer = styled.div`
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    padding: 0;
    z-index: 9999;

    ${VideoContainer} {
      max-width: 100vw;
      border-radius: 0;
      height: 80vh;
    }

    ${CaptionContainer} {
      margin: 0;
      border-radius: 0;
      background: #000;
      color: white;
      height: 20vh;
      min-height: 20vh;
      max-height: 20vh;
    }

    ${InfoContainer} {
      background: #000;
      color: white;
      margin: 0;
      border-radius: 0;
    }

    ${InfoItem} {
      color: white;
    }
  }
`;

const VideoPageNew2 = () => {
  const { videoId } = useParams();
  const history = useHistory();
  const [player, setPlayer] = useState(null);
  const [currentCaption, setCurrentCaption] = useState("");
  const [captions, setCaptions] = useState([]);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const subtitleFile = "/captions/captions.vtt";

  // Video Data (Could be dynamically fetched later)
  const videoData = {
    cefr_level: "C1",
    title: "5 SMÅ Naturperler du aldrig har hørt om // Dansk natur",
    uploader: "Naturen I Danmark",
    duration: "~ 10 minutes",
  };

  const parseVTT = useCallback((vttText) => {
    const parseTime = (h, m, s, ms) =>
      parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000;

    const captions = [];
    const lines = vttText.split("\n");
    let currentCaption = null;

    lines.forEach((line) => {
      const timeMatch = line.match(
        /(\d{2}):(\d{2}):(\d{2})\.(\d{3}) --> (\d{2}):(\d{2}):(\d{2})\.(\d{3})/,
      );
      if (timeMatch) {
        if (currentCaption) captions.push(currentCaption);
        currentCaption = {
          start: parseTime(...timeMatch.slice(1, 5)),
          end: parseTime(...timeMatch.slice(5, 9)),
          text: "",
        };
      } else if (currentCaption && line.trim()) {
        currentCaption.text += line + "\n";
      }
    });

    if (currentCaption) captions.push(currentCaption);
    return captions;
  }, []);

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const response = await fetch(subtitleFile);
        const vttText = await response.text();
        setCaptions(parseVTT(vttText));
      } catch (error) {
        console.error("Error loading subtitles:", error);
      }
    };

    fetchCaptions();
  }, [subtitleFile, parseVTT]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      cc_load_policy: 0,
      cc_lang_pref: "en",
      fs: 0,
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
    // Add event listener for state changes
    event.target.addEventListener("onStateChange", (e) => {
      if (e.data === 1) {
        // 1 is the state for playing
        setHasStartedPlaying(true);
      }
    });
  };

  // Update Caption Based on Video Time
  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        const currentTime = player.getCurrentTime();
        const activeCaption = captions.find(
          (caption) =>
            currentTime >= caption.start && currentTime <= caption.end,
        );
        setCurrentCaption(activeCaption?.text || "");
      }
    }, 250);

    return () => clearInterval(interval);
  }, [captions, player]);

  // Spacebar Play/Pause Event
  useEffect(() => {
    const handleSpacePressed = (event) => {
      if (
        event.code === "Space" &&
        player &&
        document.activeElement.tagName !== "IFRAME"
      ) {
        event.preventDefault();
        const playerState = player.getPlayerState();
        playerState === 1 ? player.pauseVideo() : player.playVideo();
      }
    };

    window.addEventListener("keydown", handleSpacePressed);
    return () => window.removeEventListener("keydown", handleSpacePressed);
  }, [player]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (!videoId) {
    return <div>No video ID provided</div>;
  }

  return (
    <MainContainer
      ref={containerRef}
      className={isFullscreen ? "fullscreen" : ""}
    >
      <VideoContainer>
        <YouTube videoId={videoId} opts={opts} onReady={onReady} />
        <FullscreenButton onClick={toggleFullscreen}>
          {isFullscreen ? (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zM16 5v5h5V8h-3V5h-2z" />
              </svg>
              Exit Fullscreen
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
              Fullscreen
            </>
          )}
        </FullscreenButton>
      </VideoContainer>

      <CaptionContainer>
        {!hasStartedPlaying ? (
          <p style={{ fontStyle: "italic", color: "gray" }}>
            Start the video to see captions.
          </p>
        ) : currentCaption ? (
          <p>{currentCaption}</p>
        ) : null}
      </CaptionContainer>

      <InfoContainer>
        <InfoItem clickable onClick={() => history.push("/")}>
          <img src="static/icons/go-back.png" alt="Go back icon" />
          <span>Return to Home</span>
        </InfoItem>
        <InfoItem>
          <img src="static/icons/youtube.png" alt="Uploader icon" />
          <span>{videoData.uploader}</span>
        </InfoItem>
        <InfoItem>
          <img
            src={`static/icons/${videoData.cefr_level}-level-icon.png`}
            alt="Difficulty icon"
          />
          <span>{videoData.cefr_level}</span>
        </InfoItem>
        <InfoItem>
          <img src="static/icons/duration.png" alt="Duration icon" />
          <span>{videoData.duration}</span>
        </InfoItem>
      </InfoContainer>
    </MainContainer>
  );
};

export default VideoPageNew2;
