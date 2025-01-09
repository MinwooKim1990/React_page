import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaChevronDown } from 'react-icons/fa';

const HeaderContainer = styled.header`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 32, 96, 0.8) 0%, rgba(0, 64, 128, 0.8) 100%);
  color: white;
  z-index: 1;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
`;

const HeaderContent = styled.div`
  text-align: center;
  z-index: 2;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    opacity: 0;
    animation: fadeInDown 1s forwards;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0;
    animation: fadeInUp 1s forwards;
    animation-delay: 0.5s;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 2rem;
  opacity: 0;
  animation: fadeIn 1s forwards;
  animation-delay: 1s;
  justify-content: center;
  width: 100%;

  a {
    color: white;
    font-size: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const AsteroidField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

interface AsteroidProps {
  delay: number;
  duration: number;
  size: number;
  left: number;
}

const Asteroid = styled.div<AsteroidProps>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  left: ${props => props.left}%;
  animation: fall ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;

  @keyframes fall {
    from {
      transform: translateY(-100px) rotate(0deg);
    }
    to {
      transform: translateY(100vh) rotate(360deg);
    }
  }
`;

export const Header = () => {
  const asteroids = Array.from({ length: 50 }, (_, i) => ({
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 7,
    size: 1 + Math.random() * 3,
    left: Math.random() * 100,
  }));

  const scrollToProjects = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <HeaderContainer>
      <AsteroidField>
        {asteroids.map((asteroid, index) => (
          <Asteroid key={index} {...asteroid} />
        ))}
      </AsteroidField>
      
      <HeaderContent>
        <h1>Minwoo (Michael) Kim</h1>
        <p>AI Researcher & Machine Learning Scientist</p>
        <SocialLinks>
          <a href="https://github.com/MinwooKim1990/" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/minwoo-michael-kim/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </SocialLinks>
      </HeaderContent>

      <ScrollIndicator
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToProjects}
      >
        <FaChevronDown />
      </ScrollIndicator>
    </HeaderContainer>
  );
};
