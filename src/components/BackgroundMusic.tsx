import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';

const MusicControl = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.primary};
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

interface BackgroundMusicProps {
  playlist: string[];
  autoPlay?: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ playlist, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(playlist[currentTrack]);
    audioRef.current.loop = false;
    
    if (autoPlay) {
      setIsPlaying(true);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('음악 재생 실패:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // 현재 트랙이 끝나면 다음 트랙으로 넘어가기
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        const nextTrack = (currentTrack + 1) % playlist.length;
        setCurrentTrack(nextTrack);
        audioRef.current = new Audio(playlist[nextTrack]);
        if (isPlaying) {
          audioRef.current.play().catch(console.error);
        }
      };
    }
  }, [currentTrack, playlist, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <MusicControl onClick={togglePlay} title={isPlaying ? '음악 끄기' : '음악 켜기'}>
      {isPlaying ? <FaMusic /> : <FaVolumeMute />}
    </MusicControl>
  );
}; 