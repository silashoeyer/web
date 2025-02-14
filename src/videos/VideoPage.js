import React, { useState, useEffect, useCallback } from "react";
import YouTube from "react-youtube";

const VideoPage = () => {
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState("");
  const [player, setPlayer] = useState(null);
  const subtitleFile = "/captions/captions.vtt";

  const parseVTT = useCallback((vttText) => {
    const captions = [];
    const lines = vttText.split("\n");
    let currentCaption = null;
  
    lines.forEach((line) => {
      const timeMatch = line.match(/(\d{2}):(\d{2}):(\d{2})\.(\d{3}) --> (\d{2}):(\d{2}):(\d{2})\.(\d{3})/);
      if (timeMatch) {
        if (currentCaption) {
          captions.push(currentCaption);
        }
  
        currentCaption = {
          start: parseTime(timeMatch[1], timeMatch[2], timeMatch[3], timeMatch[4]),
          end: parseTime(timeMatch[5], timeMatch[6], timeMatch[7], timeMatch[8]),
          text: "",
        };
      } else if (currentCaption && line.trim()) {
        currentCaption.text += line + "\n";
      }
    });
  
    if (currentCaption) {
      captions.push(currentCaption); // Push last caption
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        const currentTime = player.getCurrentTime();
        const activeCaption = captions.find(
          (caption) => currentTime >= caption.start && currentTime <= caption.end
        );
        setCurrentCaption(activeCaption ? activeCaption.text : "");
      }
    }, 100);

    return () => clearInterval(interval);
  }, [captions, player]);

  const opts = {
    height: "315",
    width: "560",
    playerVars: {
      autoplay: 0,
      cc_load_policy: 0,
      cc_lang_pref: "en",
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  return (
    <div>
      <h1>Video with Captions</h1>
      <YouTube
        videoId="EWnStY9O4CA"
        opts={opts}
        onReady={onReady}
      />

      <h2>Transcript</h2>
      <div style={{ whiteSpace: "pre-wrap" }}>
        <p>{currentCaption}</p>
      </div>
    </div>
  );
};

export default VideoPage;