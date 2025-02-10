import React from 'react';
import YouTube from 'react-youtube';

const VideoPage = () => {
    const opts = {
        height: "315",
        width: "560",
        playerVars: {
            autoplay: 0,
            cc_load_policy: 1,
            cc_lang_pref: "dk",
        },
    };


    return (
        <div>
            <h1>Videos</h1>
            <YouTube videoId="EWnStY9O4CA" opts={opts} />
        </div>
    );
};

export default VideoPage;