import styled from 'styled-components';

let Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    min-height: 100vh;
`;

let Title = styled.h1`
    width: 90%;
    max-width: 800px;
    text-align: left;
`;

let Author = styled.p`
    width: 90%;
    max-width: 800px;
    text-align: left;
    margin-top: 0;
`;

let IconWrapper = styled.div`
    width: 90%;
    max-width: 800px;
    display: flex;
    gap: 20px;
    justify-content: flex-start;
    height: auto;
    margin-bottom: 20px;
`;

let IconItem = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

let Icon = styled.img`
    width: 24px;
    height: 24px;
`;

let Hr = styled.hr`
    width: 90%;
    max-width: 800px;
    display: block;
    color: gray;
    border-top-color: rgb(246, 246, 246);
`;

let CaptionsWrapper = styled.div`
    width: 90%;
    max-width: 800px;
    margin-top: 15px;
`;

let Captions = styled.p`
    font-size: 1.2em;
    line-height: 2em;
    padding: 0.2em;
`;

let VideoWrapper = styled.div`
    width: 90%;
    max-width: 800px;
    position: relative;
    aspect-ratio: 16 / 9;

    iframe {
        width: 100%;
        height: 100%;
        position: absolute;
    }
`;

export { 
    Container,
    Captions,
    VideoWrapper,
    CaptionsWrapper,
    Title,
    Author,
    IconWrapper,
    IconItem,
    Icon,
    Hr
};