import React, { useRef, useEffect } from 'react';

const BackgroundMusic = ({ soundOn }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true; // Loop the music
      audioRef.current.volume = 0.5; // Adjust volume
      soundOn ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [soundOn]);

  return (
    <audio ref={audioRef} src="/assets/zooSong.mp3" /> 
  );
};

export default BackgroundMusic;
