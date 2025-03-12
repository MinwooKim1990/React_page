import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';
import ReactGA from 'react-ga4';

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
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // 사용자 인터랙션 이후 오디오 요소 초기화
  const initializeAudio = () => {
    if (playlist.length > 0 && !audioRef.current && !audioInitialized) {
      console.log('오디오 요소 생성');
      const audio = new Audio();
      audio.preload = 'auto';
      // iOS에서 인라인 재생을 위한 속성 추가
      audio.setAttribute('playsinline', '');
      audio.setAttribute('webkit-playsinline', '');
      audio.src = playlist[currentTrack];
      audio.volume = 0.5; // 초기 볼륨 설정
      
      // 오류 처리
      audio.onerror = (e) => {
        console.error('오디오 로드 실패:', e);
        console.error('오류 코드:', (audio as any).error?.code);
        console.error('오류 메시지:', (audio as any).error?.message);
        console.error('오류 URL:', audio.src);
      };
      
      // 트랙 종료 시 다음 트랙으로 이동
      audio.onended = () => {
        console.log('트랙 종료, 다음 트랙으로 이동');
        const nextTrack = (currentTrack + 1) % playlist.length;
        setCurrentTrack(nextTrack);
      };
      
      // 로드 완료 이벤트
      audio.onloadeddata = () => {
        console.log('오디오 데이터 로드 완료:', audio.src);
        setIsInitialized(true);
      };
      
      audioRef.current = audio;
      setAudioElement(audio);
      setAudioInitialized(true);
    }
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        console.log('오디오 정리');
        audioRef.current.pause();
        audioRef.current = null;
        setAudioElement(null);
      }
    };
  }, []);

  // 트랙 변경 시 처리
  useEffect(() => {
    if (audioRef.current && isInitialized) {
      console.log('트랙 변경:', playlist[currentTrack]);
      audioRef.current.src = playlist[currentTrack];
      audioRef.current.load();
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('트랙 변경 후 재생 실패:', error);
            setIsPlaying(false);
          });
        }
      }
    }
  }, [currentTrack, playlist, isInitialized]);

  // 페이지 가시성 변경 시 처리 (탭 전환 등)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && isPlaying) {
        audioRef.current.pause();
      } else if (!document.hidden && audioRef.current && isPlaying) {
        audioRef.current.play().catch(err => console.log('탭 복귀 후 재생 실패:', err));
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    console.log('재생 토글 시도');
    
    // 첫 클릭 시 오디오 초기화
    if (!audioInitialized) {
      initializeAudio();
      // 초기화 후 바로 재생 시도하지 않고 상태만 변경
      setIsInitialized(true);
      return;
    }
    
    if (!audioRef.current || !isInitialized) {
      console.log('오디오가 초기화되지 않음');
      return;
    }

    try {
      if (!isPlaying) {
        console.log('재생 시도');
        // iOS Safari에서는 사용자 제스처 이벤트 핸들러 내에서만 재생 가능
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log('재생 성공');
          setIsPlaying(true);
          
          // 음악 재생 이벤트 추적
          ReactGA.event({
            category: 'User Interaction',
            action: 'Music Control',
            label: 'Play Music',
            value: currentTrack + 1
          });
        }
      } else {
        console.log('일시정지');
        audioRef.current.pause();
        setIsPlaying(false);
        
        // 음악 중지 이벤트 추적
        ReactGA.event({
          category: 'User Interaction',
          action: 'Music Control',
          label: 'Pause Music',
          value: currentTrack + 1
        });
      }
    } catch (error) {
      console.error('재생/정지 실패:', error);
      alert('음악 재생에 실패했습니다. 브라우저 설정을 확인해주세요.');
      setIsPlaying(false);
      
      // 음악 재생 실패 이벤트 추적
      ReactGA.event({
        category: 'Error',
        action: 'Music Play Error',
        label: String(error)
      });
    }
  };

  return (
    <MusicControl 
      onClick={togglePlay} 
      title={isPlaying ? '음악 끄기' : '음악 켜기'}
      disabled={!isInitialized && !audioInitialized}
    >
      {isPlaying ? <FaMusic /> : <FaVolumeMute />}
    </MusicControl>
  );
}; 