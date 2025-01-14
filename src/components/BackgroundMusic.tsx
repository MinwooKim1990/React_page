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
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ playlist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initializeAudio = () => {
    if (!isInitialized && playlist.length > 0) {
      audioRef.current = new Audio();
      audioRef.current.src = playlist[currentTrack];
      audioRef.current.load();
      
      // 트랙이 끝나면 다음 트랙 재생
      audioRef.current.onended = () => {
        const nextTrack = (currentTrack + 1) % playlist.length;
        setCurrentTrack(nextTrack);
      };

      setIsInitialized(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 트랙이 변경될 때마다 새 트랙 로드
  useEffect(() => {
    if (audioRef.current && isInitialized) {
      audioRef.current.src = playlist[currentTrack];
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('음악 재생 실패:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack, playlist, isInitialized]);

  const togglePlay = async () => {
    try {
      if (!isInitialized) {
        initializeAudio();
      }

      if (audioRef.current) {
        if (!isPlaying) {
          await audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    } catch (error) {
      console.error('음악 재생/정지 실패:', error);
      setIsPlaying(false);
    }
  };

  return (
    <MusicControl onClick={togglePlay} title={isPlaying ? '음악 끄기' : '음악 켜기'}>
      {isPlaying ? <FaMusic /> : <FaVolumeMute />}
    </MusicControl>
  );
}; 