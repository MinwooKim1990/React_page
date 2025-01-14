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

  useEffect(() => {
    // 컴포넌트 마운트 시 오디오 초기화
    if (playlist.length > 0) {
      console.log('오디오 초기화 시작');
      audioRef.current = new Audio();
      audioRef.current.src = `${window.location.origin}${playlist[currentTrack]}`;
      console.log('현재 오디오 소스:', audioRef.current.src);
      
      audioRef.current.onloadeddata = () => {
        console.log('오디오 데이터 로드 완료');
        setIsInitialized(true);
      };

      audioRef.current.onerror = (e) => {
        console.error('오디오 로드 실패:', e);
      };

      // 트랙이 끝나면 다음 트랙 재생
      audioRef.current.onended = () => {
        console.log('현재 트랙 종료, 다음 트랙으로 이동');
        const nextTrack = (currentTrack + 1) % playlist.length;
        setCurrentTrack(nextTrack);
      };
    }

    return () => {
      if (audioRef.current) {
        console.log('오디오 정리');
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 트랙이 변경될 때마다 새 트랙 로드
  useEffect(() => {
    if (audioRef.current && isInitialized) {
      console.log('트랙 변경:', playlist[currentTrack]);
      audioRef.current.src = `${window.location.origin}${playlist[currentTrack]}`;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('트랙 변경 후 재생 실패:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack, playlist, isInitialized]);

  const togglePlay = async () => {
    try {
      console.log('재생 토글 시도');
      
      if (!audioRef.current || !isInitialized) {
        console.log('오디오가 초기화되지 않음');
        return;
      }

      if (!isPlaying) {
        console.log('재생 시도');
        await audioRef.current.play();
        console.log('재생 성공');
        setIsPlaying(true);
      } else {
        console.log('일시정지');
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('재생/정지 실패:', error);
      setIsPlaying(false);
    }
  };

  return (
    <MusicControl 
      onClick={togglePlay} 
      title={isPlaying ? '음악 끄기' : '음악 켜기'}
      disabled={!isInitialized}
    >
      {isPlaying ? <FaMusic /> : <FaVolumeMute />}
    </MusicControl>
  );
}; 