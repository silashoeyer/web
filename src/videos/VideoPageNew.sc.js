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
    padding: 2rem 2rem;
  }

  @media (max-width: 576px) {
    padding: 1.5rem;
    width: 95%;
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

let Caption = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  white-space: pre-wrap;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 95%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio in relation to the width of the container */
  margin: 0 auto;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
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
};
