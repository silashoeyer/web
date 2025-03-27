import * as s from "./VideoPageNew.sc";
import YouTube from "react-youtube";
import { getStaticPath } from "../utils/misc/staticPath";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

export default function VideoPageNew() {
  const { videoId } = useParams();
  console.log("Video ID from URL:", videoId);
  const [player, setPlayer] = useState(null);
  const [currentCaption, setCurrentCaption] = useState("");
  const [captions, setCaptions] = useState([]);
  const subtitleFile = "/captions/captions.vtt";
  const cefr_level = "C1";
  const title = "5 SMÅ Naturperler du aldrig har hørt om // Dansk natur";
  document.title = title;

  const parseVTT = useCallback((vttText) => {
    const captions = [];
    const lines = vttText.split("\n");
    let currentCaption = null;

    lines.forEach((line) => {
      const timeMatch = line.match(
        /(\d{2}):(\d{2}):(\d{2})\.(\d{3}) --> (\d{2}):(\d{2}):(\d{2})\.(\d{3})/,
      );
      if (timeMatch) {
        if (currentCaption) {
          captions.push(currentCaption);
        }

        currentCaption = {
          start: parseTime(
            timeMatch[1],
            timeMatch[2],
            timeMatch[3],
            timeMatch[4],
          ),
          end: parseTime(
            timeMatch[5],
            timeMatch[6],
            timeMatch[7],
            timeMatch[8],
          ),
          text: "",
        };
      } else if (currentCaption && line.trim()) {
        currentCaption.text += line + "\n";
      }
    });

    if (currentCaption) {
      captions.push(currentCaption);
    }

    return captions;
  }, []);

  const parseTime = (h, m, s, ms) => {
    return (
      parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000
    );
  };

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const response = await fetch(subtitleFile);
        const vttText = await response.text();
        const parsedCaptions = parseVTT(vttText);
        setCaptions(parsedCaptions);
      } catch (error) {
        console.error("Error loading subtitles: ", error);
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

  const onReady = (event) => {
    setPlayer(event.target);
  };

  // Add event listener for spacebar (to play/pause the video)
  useEffect(() => {
    const handleSpacePressed = (event) => {
      if (
        event.code === "Space" &&
        player &&
        document.activeElement.tagName !== "IFRAME"
      ) {
        event.preventDefault();
        const playerState = player.getPlayerState();
        if (playerState === 1) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
      }
    };

    window.addEventListener("keydown", handleSpacePressed);
    return () => {
      window.removeEventListener("keydown", handleSpacePressed);
    };
  }, [player]);

  // Update caption based on video time
  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        const currentTime = player.getCurrentTime();
        const activeCaption = captions.find(
          (caption) =>
            currentTime >= caption.start && currentTime <= caption.end,
        );
        setCurrentCaption(activeCaption ? activeCaption.text : "");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [captions, player]);

  return (
    <>
      <s.VideoContainer>
        <YouTube videoId={videoId} opts={opts} onReady={onReady} />
      </s.VideoContainer>

      <h1>{title}</h1>
      <s.StatContainer>
        <s.IconContainer>
          <img
            src={getStaticPath("icons", "youtube.png")}
            alt="Uploaded by icon"
          ></img>
          <span>Naturen I Danmark</span>
        </s.IconContainer>
        <s.IconContainer>
          <img
            src={getStaticPath("icons", cefr_level + "-level-icon.png")}
            alt="difficulty icon"
          ></img>
          <span>{cefr_level}</span>
        </s.IconContainer>
        <s.IconContainer>
          <img
            src={getStaticPath("icons", "duration.png")}
            alt="duration icon"
          ></img>
          <span>~ 10 minutes</span>
        </s.IconContainer>
      </s.StatContainer>

      <s.Caption>
        {!currentCaption && (
          <p style={{ fontStyle: "italic", color: "gray" }}>
            Start the video to see captions.
          </p>
        )}
        <p>{currentCaption}</p>
      </s.Caption>
    </>
  );
}
