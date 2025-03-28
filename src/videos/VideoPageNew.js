import * as s from "./VideoPageNew.sc";
import YouTube from "react-youtube";
import { getStaticPath } from "../utils/misc/staticPath";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function VideoPageNew() {
  const { videoId } = useParams();
  const [player, setPlayer] = useState(null);
  const [currentCaption, setCurrentCaption] = useState("");
  const [captions, setCaptions] = useState([]);
  const subtitleFile = "/captions/captions.vtt";

  // Video Data (Could be dynamically fetched later)
  const videoData = {
    cefr_level: "C1",
    title: "5 SMÅ Naturperler du aldrig har hørt om // Dansk natur",
    uploader: "Naturen I Danmark",
    duration: "~ 10 minutes",
  };

  document.title = videoData.title;

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
    },
  };

  const onReady = (event) => setPlayer(event.target);

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
    }, 250); // Adjusted interval for performance

    return () => clearInterval(interval);
  }, [captions, player]);

  return (
    <s.PageContainer>
      <s.VideoContainer>
        <YouTube videoId={videoId} opts={opts} onReady={onReady} />
      </s.VideoContainer>

      <h1>{videoData.title}</h1>

      <s.StatContainer>
        <s.IconContainer>
          <img
            src={getStaticPath("icons", "youtube.png")}
            alt="Uploader icon"
          />
          <span>{videoData.uploader}</span>
        </s.IconContainer>
        <s.IconContainer>
          <img
            src={getStaticPath(
              "icons",
              `${videoData.cefr_level}-level-icon.png`,
            )}
            alt="Difficulty icon"
          />
          <span>{videoData.cefr_level}</span>
        </s.IconContainer>
        <s.IconContainer>
          <img
            src={getStaticPath("icons", "duration.png")}
            alt="Duration icon"
          />
          <span>{videoData.duration}</span>
        </s.IconContainer>
      </s.StatContainer>

      <s.Caption>
        {currentCaption ? (
          <p>{currentCaption}</p>
        ) : (
          <p style={{ fontStyle: "italic", color: "gray" }}>
            Start the video to see captions.
          </p>
        )}
      </s.Caption>
    </s.PageContainer>
  );
}
