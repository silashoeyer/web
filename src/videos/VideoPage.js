import React, { useState, useEffect, useCallback } from "react";
import YouTube from "react-youtube";
import { Container, Captions, VideoWrapper, CaptionsWrapper, IconWrapper, IconItem, Icon, Hr, Title, Author } from "./VideoPage.sc";
import { fetchVideoInfo } from "./FetchVideoInfo";

const VideoPage = () => {
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState("");
  const [player, setPlayer] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [channelName, setChannelName] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const subtitleFile = "/captions/captions.vtt";
  const videoId = "EWnStY9O4CA";

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

  useEffect(() => {
    const getVideoDetails = async () => {
      const { videoTitle, channelName, videoDuration } = await fetchVideoInfo(videoId);
      setVideoTitle(videoTitle);
      setChannelName(channelName);
      setVideoDuration(videoDuration);
    };

    getVideoDetails();
  }, [videoId]);

  const opts = {
    playerVars: {
      rel: 0,
      color: "white",
    },
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  return (
    <Container>
      <Title>{videoTitle}</Title>
      <Author>{channelName}</Author>
      <IconWrapper>
        <IconItem>
          <Icon src="/static/icons/B1-level-icon.png" alt="diffculty icon" /> <span>B1</span>
        </IconItem>
        <IconItem>
          <Icon src="/static/icons/read-time-icon.png" alt="read time icon" /> <span>{videoDuration}</span>
        </IconItem>
      </IconWrapper>
      <Hr />
      <VideoWrapper>
        <YouTube videoId={videoId} opts={opts} onReady={onReady} />
      </VideoWrapper>
      <CaptionsWrapper>
        <Captions>{currentCaption}</Captions>
      </CaptionsWrapper>
    </Container>
  );
};

export default VideoPage;