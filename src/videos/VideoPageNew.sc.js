import styled, { css } from "styled-components";
import { zeeguuOrange } from "../components/colors";

const PageBackground = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100dvh;
  height: 100%;
  background: ${zeeguuOrange};
  overflow-y: scroll;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  max-width: 90%;
  border-radius: 1em;
  width: 70rem;
  padding: 2rem 3rem;
  margin: 1rem;
  background-color: white;

  @media (max-width: 1200px) {
    padding: 2rem 2.5rem;
    margin: 0.5rem;
    max-width: 70rem;
    width: 90%;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 95%;
  }

  @media (max-width: 576px) {
    padding: 1.2rem;
    width: 98%;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 800px;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Caption = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  white-space: pre-wrap;
  font-size: 18px;
  text-align: center;
  color: #444;

  @media (max-width: 768px) {
    font-size: 16px;
    margin: 0.8em;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

const VideoInfo = styled.div`
  margin-top: 1rem;
  font-size: 16px;
  text-align: center;
  color: #777;

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

let Channel = styled.div`
  margin-top: 0.5em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

let StatContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  @media (max-width: 990px) {
    margin-left: 0;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  gap: 0.5em;
  margin-right: 2em;
  img {
    height: 1.5em;
  }
  span {
    font-weight: 450;
  }
`;

let ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

let Img = styled.img`
  width: 100%;
  border-radius: 1em;
  margin-bottom: 1em;
`;

export {
  PageBackground,
  PageContainer,
  Channel,
  StatContainer,
  IconContainer,
  ImgContainer,
  Img,
  Caption,
  VideoContainer,
  VideoInfo,
};
